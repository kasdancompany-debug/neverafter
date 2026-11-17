import { NextResponse } from "next/server";

const TOPICS = new Set([
  "General question about the site",
  "Report an error or suggest a correction",
  "Media or partnership enquiry",
  "Resource or newsletter question",
]);

/**
 * Contact endpoint. Integration point: CONTACT_WEBHOOK_URL (email service, helpdesk or automation hook).
 * Without it, responds in demo mode — the message is not stored, logged or sent.
 */
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
  const name = typeof b.name === "string" ? b.name.trim().slice(0, 120) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, 254) : "";
  const topic = typeof b.topic === "string" ? b.topic : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !TOPICS.has(topic) || message.length < 10 || message.length > 2000) {
    return NextResponse.json({ message: "Please check the form and try again." }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      {
        demo: true,
        message: "The contact service isn't connected yet, so your message was not stored or delivered.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, topic, message, timestamp: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return NextResponse.json({ message: "We couldn't send your message. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ message: "Thank you — your message was sent. We aim to reply within a few business days." });
}
