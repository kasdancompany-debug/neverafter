import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { site } from "@/lib/site";

/**
 * Creates a Stripe Checkout Session (no SDK dependency — uses Stripe's REST API).
 * Requires STRIPE_SECRET_KEY and a product with `available: true` in lib/products.ts.
 * Fulfilment (delivering the file after payment) needs a Stripe webhook handler — see README.
 */
export async function POST(req: Request) {
  let slug = "";
  try {
    const body = (await req.json()) as { slug?: unknown };
    slug = typeof body.slug === "string" ? body.slug : "";
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const product = getProduct(slug);
  if (!product) return NextResponse.json({ message: "Product not found." }, { status: 404 });

  if (!product.available) {
    return NextResponse.json(
      { message: "This resource is still in development and isn't available to purchase yet." },
      { status: 409 },
    );
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ message: "Checkout isn't configured yet (payment provider not connected)." }, { status: 503 });
  }

  const params = new URLSearchParams({
    mode: "payment",
    success_url: `${site.url}/resources/${product.slug}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site.url}/resources/${product.slug}?checkout=cancelled`,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "cad",
    "line_items[0][price_data][unit_amount]": String(product.priceCad * 100),
    "line_items[0][price_data][product_data][name]": product.title,
    "line_items[0][price_data][product_data][description]": product.tagline,
    "metadata[product_slug]": product.slug,
    "automatic_tax[enabled]": "true",
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const data = (await res.json()) as { url?: string; error?: { message?: string } };
  if (!res.ok || !data.url) {
    return NextResponse.json({ message: "We couldn't start checkout. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ url: data.url });
}
