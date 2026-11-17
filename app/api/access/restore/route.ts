import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, cookieOptions, mergeTokens, signToken, verifyToken } from "@/lib/access";

/** Private restore link (/api/access/restore?t=…) — lets a buyer unlock another device or browser. */
export async function GET(req: NextRequest) {
  const incoming = verifyToken(req.nextUrl.searchParams.get("t"));
  if (!incoming) return NextResponse.redirect(new URL("/access?restore=invalid", req.url));
  const prev = verifyToken(req.cookies.get(ACCESS_COOKIE)?.value);
  const res = NextResponse.redirect(new URL("/access?restore=ok", req.url));
  res.cookies.set(ACCESS_COOKIE, signToken(mergeTokens(prev, incoming)), cookieOptions);
  res.headers.set("Referrer-Policy", "no-referrer");
  return res;
}
