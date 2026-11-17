import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Account-free access. After Stripe confirms a payment, we issue a signed token listing what the buyer unlocked.
 * It lives in an httpOnly cookie, and the buyer gets a private restore link to use on other devices.
 * Nothing about the buyer's family is stored — only entitlements and Stripe IDs.
 */
export const ACCESS_COOKIE = "na_access";

export type AccessToken = {
  ent: string[]; // entitlements
  cus?: string; // Stripe customer (for the billing portal)
  sub?: string; // Stripe subscription (for Plus renewals)
  exp?: number; // unix seconds; set for subscriptions
  iat: number;
};

function secret() {
  const s = process.env.ACCESS_TOKEN_SECRET;
  if (!s || s.length < 32) return null;
  return s;
}

export function accessConfigured() {
  return secret() !== null;
}

export function signToken(t: AccessToken): string {
  const key = secret();
  if (!key) throw new Error("ACCESS_TOKEN_SECRET must be set (32+ characters)");
  const body = Buffer.from(JSON.stringify(t)).toString("base64url");
  const sig = createHmac("sha256", key).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyToken(token: string | undefined | null): AccessToken | null {
  const key = secret();
  if (!key || !token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = createHmac("sha256", key).update(body).digest("base64url");
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString()) as AccessToken;
  } catch {
    return null;
  }
}

/** Entitlements that are currently valid (subscription entitlements lapse at `exp`). */
export function activeEntitlements(t: AccessToken | null): string[] {
  if (!t) return [];
  if (t.exp && t.exp < Date.now() / 1000) return t.ent.filter((e) => e !== "plus");
  return t.ent;
}

export async function readAccess(): Promise<AccessToken | null> {
  return verifyToken((await cookies()).get(ACCESS_COOKIE)?.value);
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 365 * 5,
};

/** Merge newly purchased entitlements into whatever the visitor already holds. */
export function mergeTokens(prev: AccessToken | null, next: Omit<AccessToken, "iat">): AccessToken {
  return {
    ent: Array.from(new Set([...(prev?.ent ?? []), ...next.ent])),
    cus: next.cus ?? prev?.cus,
    sub: next.sub ?? prev?.sub,
    exp: next.exp ?? prev?.exp,
    iat: Math.floor(Date.now() / 1000),
  };
}
