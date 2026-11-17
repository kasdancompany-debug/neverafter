import { NextResponse, type NextRequest } from "next/server";
import { getCatalogItem } from "@/lib/catalog";
import { ACCESS_COOKIE, cookieOptions, mergeTokens, signToken, verifyToken } from "@/lib/access";
import { periodEnd, stripe, type Subscription } from "@/lib/stripe";

/**
 * Stripe redirects here after Checkout. The redirect alone is never trusted:
 * the session is fetched from Stripe and access is granted only if it is complete and paid.
 */
export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id") ?? "";
  const fail = (reason: string) => NextResponse.redirect(new URL(`/checkout/success?status=${reason}`, req.url));
  if (!/^cs_(test_|live_)?[A-Za-z0-9]+$/.test(sessionId)) return fail("invalid");

  try {
    const session = await stripe.retrieveCheckoutSession(sessionId);
    const item = getCatalogItem(session.metadata?.item ?? "");
    const paid =
      session.status === "complete" && (session.payment_status === "paid" || session.payment_status === "no_payment_required");
    if (!item || !paid) return fail("unpaid");

    const sub = session.subscription && typeof session.subscription === "object" ? (session.subscription as Subscription) : null;
    const end = sub ? periodEnd(sub) : undefined;
    const prev = verifyToken(req.cookies.get(ACCESS_COOKIE)?.value);
    const token = mergeTokens(prev, {
      ent: item.entitlements,
      cus: session.customer ?? undefined,
      sub: sub?.id,
      exp: end ? end + 3 * 86400 : undefined, // short grace period around renewals
    });

    const res = NextResponse.redirect(new URL(`/checkout/success?item=${encodeURIComponent(item.id)}`, req.url));
    res.cookies.set(ACCESS_COOKIE, signToken(token), cookieOptions);
    return res;
  } catch (e) {
    console.error("[checkout/complete]", e instanceof Error ? e.message : e);
    return fail("error");
  }
}
