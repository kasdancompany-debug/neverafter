import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { site } from "./site";

/**
 * Newsletter via Resend (https://resend.com), with double opt-in:
 *   1. /api/subscribe validates the address and emails a signed confirmation link. Nothing is stored yet.
 *   2. /api/subscribe/confirm verifies the link, then adds the contact in Resend and sends a welcome email.
 * Unsubscribes are handled by Resend's built-in unsubscribe link in every Broadcast.
 */
const API = "https://api.resend.com";
const MAX_AGE_SECONDS = 7 * 24 * 3600;

export type List = "newsletter" | "starter-guide";

function secret() {
  const s = process.env.NEWSLETTER_SECRET || process.env.ACCESS_TOKEN_SECRET;
  return s && s.length >= 32 ? s : null;
}

export function newsletterConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NEWSLETTER_FROM && secret());
}

/* ------------------------------ signed links ------------------------------ */

type Payload = { e: string; l: List; t: number };

export function signConfirmation(email: string, list: List): string {
  const body = Buffer.from(JSON.stringify({ e: email, l: list, t: Math.floor(Date.now() / 1000) } satisfies Payload)).toString("base64url");
  const sig = createHmac("sha256", secret()!).update(`nl.${body}`).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyConfirmation(token: string | null): Payload | null {
  const key = secret();
  if (!key || !token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", key).update(`nl.${body}`).digest("base64url");
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString()) as Payload;
    if (Date.now() / 1000 - p.t > MAX_AGE_SECONDS) return null;
    return p;
  } catch {
    return null;
  }
}

/* --------------------------------- Resend --------------------------------- */

async function resend<T>(method: "POST" | "PATCH", path: string, body: unknown, idempotencyKey?: string): Promise<{ ok: boolean; status: number; data: T }> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, status: res.status, data };
}

export async function sendEmail(to: string, subject: string, html: string, text: string, idempotencyKey?: string) {
  const r = await resend<{ id?: string; message?: string }>(
    "POST",
    "/emails",
    { from: process.env.NEWSLETTER_FROM, to, subject, html, text, reply_to: process.env.NEWSLETTER_REPLY_TO || undefined },
    idempotencyKey,
  );
  if (!r.ok) throw new Error(`Resend email failed (${r.status}): ${r.data.message ?? ""}`);
}

/** Creates the contact, or re-subscribes it if it already exists (the person has just confirmed). */
export async function upsertContact(email: string) {
  const segment = process.env.RESEND_SEGMENT_ID;
  const created = await resend<{ message?: string }>("POST", "/contacts", {
    email,
    unsubscribed: false,
    ...(segment ? { segments: [segment] } : {}),
  });
  if (created.ok) return;
  const updated = await resend<{ message?: string }>("PATCH", `/contacts/${encodeURIComponent(email)}`, { unsubscribed: false });
  if (!updated.ok) throw new Error(`Resend contact failed (${created.status}/${updated.status}): ${created.data.message ?? ""}`);
}

/* -------------------------------- templates ------------------------------- */

const footer = () => {
  const address = process.env.NEWSLETTER_POSTAL_ADDRESS;
  return `<p style="margin:28px 0 0;font:12px/1.6 Arial,sans-serif;color:#5e6669">Never After · General legal information, not legal advice.${
    address ? `<br>${address}` : ""
  }<br>You're receiving this because this address was entered at ${site.url.replace(/^https?:\/\//, "")}.</p>`;
};

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f5f1e9;padding:32px 16px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center">
<table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#faf9f6;border:1px solid #e3ddd1">
<tr><td style="padding:28px 32px 0;font:600 12px Arial,sans-serif;letter-spacing:3px;color:#182b30">NEVER AFTER</td></tr>
<tr><td style="padding:20px 32px 32px">
<h1 style="margin:0 0 16px;font:500 26px/1.2 Georgia,serif;color:#182b30">${title}</h1>
${body}
${footer()}
</td></tr></table></td></tr></table></body></html>`;
}

const button = (href: string, label: string) =>
  `<p style="margin:24px 0"><a href="${href}" style="display:inline-block;background:#182b30;color:#faf9f6;padding:12px 20px;border-radius:3px;font:600 14px Arial,sans-serif;text-decoration:none">${label}</a></p>`;
const para = (t: string) => `<p style="margin:0 0 14px;font:16px/1.6 Georgia,serif;color:#252a2c">${t}</p>`;

export function confirmationEmail(link: string, list: List) {
  const what = list === "starter-guide" ? "the Starter Guide and The Never After Brief" : "The Never After Brief";
  return {
    subject: "Please confirm your subscription",
    html: layout(
      "One click to confirm",
      para(`Please confirm that you'd like to receive ${what} — clear explanations, useful resources, less noise.`) +
        button(link, "Confirm my subscription") +
        para(`If you didn't request this, you can ignore this email and nothing will happen. The link expires in 7 days.`),
    ),
    text: `Please confirm that you'd like to receive ${what}.\n\nConfirm: ${link}\n\nIf you didn't request this, ignore this email. The link expires in 7 days.`,
  };
}

export function welcomeEmail() {
  const guide = `${site.url}/guides/ontario-separation-starter-guide.pdf`;
  return {
    subject: "Welcome to The Never After Brief",
    html: layout(
      "You're subscribed",
      para("Thank you for joining The Never After Brief. Expect clear, calm explanations of Ontario family law — weekly, never spam.") +
        para("As promised, here's the free Ontario Separation Starter Guide: which law applies to you, the four core questions, a first-30-days checklist and worksheets.") +
        button(guide, "Download the Starter Guide (PDF)") +
        para(`A good next step: <a href="${site.url}/start-here" style="color:#182b30">find your starting point</a> for a short reading path.`) +
        para("If you or a child are ever in immediate danger, call 911."),
    ),
    text: `Thank you for joining The Never After Brief.\n\nYour free Ontario Separation Starter Guide: ${guide}\n\nFind your starting point: ${site.url}/start-here\n\nIf you or a child are in immediate danger, call 911.`,
  };
}
