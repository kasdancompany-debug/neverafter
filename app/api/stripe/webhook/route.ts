import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/stripe";

/**
 * Stripe webhook endpoint. Register https://<your-domain>/api/stripe/webhook in the Stripe Dashboard
 * and set STRIPE_WEBHOOK_SECRET. Access is granted on the checkout redirect (verified with Stripe),
 * so this handler is where fulfilment side-effects go: welcome/download emails, analytics, or a
 * database sync if accounts are added later.
 */
export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ message: "Webhook not configured." }, { status: 503 });

  const raw = await req.text();
  if (!verifyWebhook(raw, req.headers.get("stripe-signature"), secret)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 400 });
  }

  const event = JSON.parse(raw) as { type: string; data: { object: { id?: string; metadata?: Record<string, string> } } };
  const obj = event.data.object;
  switch (event.type) {
    case "checkout.session.completed":
      console.info("[stripe] checkout completed", obj.id, obj.metadata?.item);
      // Integration point: send a welcome / download email through your email provider.
      break;
    case "customer.subscription.deleted":
      console.info("[stripe] subscription ended", obj.id);
      // Access tokens carry an expiry, so Plus lapses on its own at the end of the paid period.
      break;
    case "invoice.payment_failed":
      console.info("[stripe] invoice payment failed", obj.id);
      break;
  }
  return NextResponse.json({ received: true });
}
