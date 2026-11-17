import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LISTS = new Set(["newsletter", "starter-guide"]);

/**
 * Email signup endpoint.
 * Integration point: set NEWSLETTER_WEBHOOK_URL to forward signups to your email provider
 * (directly, or via an automation tool). Until then this responds in explicit demo mode and
 * nothing is stored, logged or forwarded.
 */
export async function POST(req: Request) {
  let body: { email?: unknown; list?: unknown; consent?: unknown; consentText?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const list = typeof body.list === "string" ? body.list : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 422 });
  }
  if (!LISTS.has(list)) return NextResponse.json({ message: "Unknown list." }, { status: 422 });
  if (body.consent !== true) {
    return NextResponse.json({ message: "Consent is required to subscribe." }, { status: 422 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        demo: true,
        message:
          list === "starter-guide"
            ? "Our email service isn't connected yet, so the Starter Guide can't be sent and your address was not stored."
            : "Our email service isn't connected yet, so your address was not stored or sent anywhere.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        list,
        consent: true,
        consentText: typeof body.consentText === "string" ? body.consentText.slice(0, 300) : "",
        timestamp: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(`Provider responded ${res.status}`);
  } catch {
    return NextResponse.json({ message: "We couldn't complete your signup. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({
    message:
      list === "starter-guide"
        ? "Almost there — check your inbox to confirm, and we'll send the Starter Guide."
        : "Almost there — check your inbox to confirm your subscription.",
  });
}
