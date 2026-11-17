import { NextResponse, type NextRequest } from "next/server";
import { sendEmail, upsertContact, verifyConfirmation, welcomeEmail } from "@/lib/newsletter";

/** Step 2 of double opt-in: the signed link from the confirmation email lands here. */
export async function GET(req: NextRequest) {
  const payload = verifyConfirmation(req.nextUrl.searchParams.get("t"));
  const to = (status: string) => {
    const res = NextResponse.redirect(new URL(`/newsletter?status=${status}`, req.url));
    res.headers.set("Referrer-Policy", "no-referrer");
    return res;
  };
  if (!payload) return to("expired");

  try {
    await upsertContact(payload.e);
  } catch (e) {
    console.error("[subscribe/confirm]", e instanceof Error ? e.message : e);
    return to("error");
  }

  try {
    const mail = welcomeEmail();
    // Idempotent per address, so clicking the confirmation link twice doesn't send two welcomes.
    await sendEmail(payload.e, mail.subject, mail.html, mail.text, `welcome-${payload.e}`);
  } catch (e) {
    // Subscription succeeded even if the welcome email didn't; don't fail the confirmation.
    console.error("[subscribe/confirm] welcome email", e instanceof Error ? e.message : e);
  }
  return to("confirmed");
}
