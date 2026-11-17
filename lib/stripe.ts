import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal Stripe REST client — no SDK dependency.
 * Card data never touches this server: buyers pay on Stripe-hosted Checkout.
 */
const API = "https://api.stripe.com/v1";

export function stripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

type Params = Record<string, string | number | boolean | undefined>;

async function call<T>(method: "GET" | "POST", path: string, params?: Params): Promise<T> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  const body = new URLSearchParams();
  for (const [k, v] of Object.entries(params ?? {})) if (v !== undefined) body.append(k, String(v));
  const url = method === "GET" && params ? `${API}${path}?${body}` : `${API}${path}`;
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: method === "POST" ? body : undefined,
    cache: "no-store",
  });
  const data = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(data.error?.message ?? `Stripe error ${res.status}`);
  return data;
}

export type CheckoutSession = {
  id: string;
  url: string | null;
  status: "open" | "complete" | "expired";
  payment_status: "paid" | "unpaid" | "no_payment_required";
  mode: "payment" | "subscription";
  customer: string | null;
  customer_details?: { email?: string | null } | null;
  metadata: Record<string, string>;
  subscription: Subscription | string | null;
};

export type Subscription = {
  id: string;
  status: string;
  customer: string;
  current_period_end?: number;
  items?: { data: { current_period_end?: number }[] };
  metadata: Record<string, string>;
};

export const stripe = {
  createCheckoutSession: (params: Params) => call<CheckoutSession>("POST", "/checkout/sessions", params),
  retrieveCheckoutSession: (id: string) =>
    call<CheckoutSession>("GET", `/checkout/sessions/${encodeURIComponent(id)}`, { "expand[]": "subscription" }),
  retrieveSubscription: (id: string) => call<Subscription>("GET", `/subscriptions/${encodeURIComponent(id)}`),
  createPortalSession: (customer: string, returnUrl: string) =>
    call<{ url: string }>("POST", "/billing_portal/sessions", { customer, return_url: returnUrl }),
};

/** Period end moved from the subscription to its items in newer API versions; support both. */
export function periodEnd(sub: Subscription): number | undefined {
  return sub.items?.data?.[0]?.current_period_end ?? sub.current_period_end;
}

/** Verifies the `Stripe-Signature` header (HMAC-SHA256, 5-minute tolerance). */
export function verifyWebhook(rawBody: string, header: string | null, secret: string, toleranceSec = 300): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(
    header.split(",").map((p) => {
      const i = p.indexOf("=");
      return [p.slice(0, i), p.slice(i + 1)];
    }),
  );
  const t = Number(parts.t);
  const signatures = header
    .split(",")
    .filter((p) => p.startsWith("v1="))
    .map((p) => p.slice(3));
  if (!t || !signatures.length) return false;
  if (Math.abs(Date.now() / 1000 - t) > toleranceSec) return false;
  const expected = createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex");
  return signatures.some((s) => s.length === expected.length && timingSafeEqual(Buffer.from(s), Buffer.from(expected)));
}
