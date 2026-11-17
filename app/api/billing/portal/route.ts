import { NextResponse } from "next/server";
import { readAccess } from "@/lib/access";
import { stripe, stripeConfigured } from "@/lib/stripe";
import { site } from "@/lib/site";

/** Opens Stripe's hosted billing portal (update card, download invoices, cancel Plus). */
export async function POST() {
  if (!stripeConfigured()) return NextResponse.json({ message: "Billing isn't configured yet." }, { status: 503 });
  const access = await readAccess();
  if (!access?.cus) return NextResponse.json({ message: "No billing account is linked to this browser." }, { status: 404 });
  try {
    const portal = await stripe.createPortalSession(access.cus, `${site.url}/access`);
    return NextResponse.json({ url: portal.url });
  } catch (e) {
    console.error("[billing/portal]", e instanceof Error ? e.message : e);
    return NextResponse.json({ message: "We couldn't open billing right now. Please try again." }, { status: 502 });
  }
}
