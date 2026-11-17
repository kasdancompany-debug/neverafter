import { NextResponse } from "next/server";
import { getCatalogItem } from "@/lib/catalog";
import { accessConfigured } from "@/lib/access";
import { stripe, stripeConfigured } from "@/lib/stripe";
import { site } from "@/lib/site";

/**
 * Starts a Stripe-hosted Checkout Session for any catalog item (one-time or subscription).
 * Card details are entered on Stripe's page — never on this site.
 */
export async function POST(req: Request) {
  let id = "";
  try {
    const body = (await req.json()) as { item?: unknown; slug?: unknown };
    id = typeof body.item === "string" ? body.item : typeof body.slug === "string" ? body.slug : "";
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const item = getCatalogItem(id);
  if (!item) return NextResponse.json({ message: "Item not found." }, { status: 404 });
  if (!item.available) {
    return NextResponse.json({ message: "This resource is still in development and isn't available to purchase yet." }, { status: 409 });
  }
  if (!stripeConfigured() || !accessConfigured()) {
    return NextResponse.json({ message: "Checkout isn't configured yet (payment provider not connected)." }, { status: 503 });
  }

  const line = "line_items[0]";
  const params: Record<string, string | number | boolean> = {
    mode: item.mode,
    success_url: `${site.url}/api/checkout/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site.url}${item.returnTo}?checkout=cancelled`,
    [`${line}[quantity]`]: 1,
    [`${line}[price_data][currency]`]: "cad",
    [`${line}[price_data][unit_amount]`]: Math.round(item.priceCad * 100),
    [`${line}[price_data][product_data][name]`]: item.name,
    [`${line}[price_data][product_data][description]`]: item.description,
    "metadata[item]": item.id,
    allow_promotion_codes: true,
    billing_address_collection: "auto",
  };
  if (item.mode === "subscription") {
    params[`${line}[price_data][recurring][interval]`] = item.interval ?? "month";
    params["subscription_data[metadata][item]"] = item.id;
  } else {
    params.customer_creation = "always";
    params["payment_intent_data[metadata][item]"] = item.id;
  }
  if (process.env.STRIPE_AUTOMATIC_TAX === "true") params["automatic_tax[enabled]"] = true;

  try {
    const session = await stripe.createCheckoutSession(params);
    if (!session.url) throw new Error("No checkout URL returned");
    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("[checkout]", e instanceof Error ? e.message : e);
    return NextResponse.json({ message: "We couldn't start checkout. Please try again later." }, { status: 502 });
  }
}
