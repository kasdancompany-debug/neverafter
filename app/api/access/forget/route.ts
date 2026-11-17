import { NextResponse } from "next/server";
import { ACCESS_COOKIE } from "@/lib/access";

/** Removes access from this browser (e.g. a shared computer). Purchases stay restorable via the private link. */
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(ACCESS_COOKIE);
  return res;
}
