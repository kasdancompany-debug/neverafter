import { NextResponse } from "next/server";
import { confirmationEmail, newsletterConfigured, sendEmail, signConfirmation, type List } from "@/lib/newsletter";
import { site } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LISTS = new Set<List>(["newsletter", "starter-guide"]);

/**
 * Step 1 of double opt-in: validate, then email a signed confirmation link via Resend.
 * Nothing is stored until the person clicks that link (see ./confirm/route.ts).
 */
export async function POST(req: Request) {
  let body: { email?: unknown; list?: unknown; consent?: unknown; company?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "company" field.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ message: "Check your inbox to confirm your subscription." });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = (typeof body.list === "string" ? body.list : "newsletter") as List;
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 422 });
  }
  if (!LISTS.has(list)) return NextResponse.json({ message: "Unknown list." }, { status: 422 });
  if (body.consent !== true) return NextResponse.json({ message: "Consent is required to subscribe." }, { status: 422 });

  if (!newsletterConfigured()) {
    return NextResponse.json(
      { demo: true, message: "Our email service isn't connected yet, so your address was not stored or sent anywhere." },
      { status: 503 },
    );
  }

  try {
    const link = `${site.url}/api/subscribe/confirm?t=${signConfirmation(email, list)}`;
    const mail = confirmationEmail(link, list);
    // Idempotency key stops double-clicks from sending two confirmation emails.
    await sendEmail(email, mail.subject, mail.html, mail.text, `confirm-${list}-${email}-${new Date().toISOString().slice(0, 13)}`);
  } catch (e) {
    console.error("[subscribe]", e instanceof Error ? e.message : e);
    return NextResponse.json({ message: "We couldn't send the confirmation email. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ message: "Almost done — check your inbox and click the link to confirm your subscription." });
}
