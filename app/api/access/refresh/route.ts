import { NextResponse } from "next/server";
import { ACCESS_COOKIE, cookieOptions, mergeTokens, readAccess, signToken } from "@/lib/access";
import { periodEnd, stripe, stripeConfigured } from "@/lib/stripe";

/** Re-checks a Plus subscription with Stripe and extends access if it has renewed. */
export async function POST() {
  const access = await readAccess();
  if (!access?.sub || !stripeConfigured()) return NextResponse.json({ active: false }, { status: 404 });
  try {
    const sub = await stripe.retrieveSubscription(access.sub);
    const active = sub.status === "active" || sub.status === "trialing";
    const end = periodEnd(sub);
    const res = NextResponse.json({ active });
    if (active && end) {
      res.cookies.set(ACCESS_COOKIE, signToken(mergeTokens(access, { ent: ["plus"], exp: end + 3 * 86400 })), cookieOptions);
    }
    return res;
  } catch {
    return NextResponse.json({ message: "We couldn't check your subscription." }, { status: 502 });
  }
}
