import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { AccessActions } from "@/components/AccessActions";
import { RestoreLink } from "@/components/RestoreLink";
import { activeEntitlements, readAccess, signToken } from "@/lib/access";
import { catalog } from "@/lib/catalog";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Your access", robots: { index: false } };

type Props = { searchParams: Promise<{ restore?: string }> };

function label(ent: string) {
  if (ent === "studio") return "Parenting Plan Studio (lifetime)";
  if (ent === "plus") return "Never After Plus";
  const item = catalog.find((c) => c.entitlements.includes(ent as never));
  return item?.name ?? ent;
}

export default async function AccessPage({ searchParams }: Props) {
  const { restore } = await searchParams;
  const access = await readAccess();
  const ent = activeEntitlements(access);
  const plusLapsed = Boolean(access?.ent.includes("plus") && !ent.includes("plus"));
  const renews = access?.exp ? new Date((access.exp - 3 * 86400) * 1000).toLocaleDateString("en-CA", { dateStyle: "long" }) : null;

  return (
    <>
      <PageHeader crumbs={[{ label: "Your access" }]} title="Your access" intro={<p>What&apos;s unlocked in this browser, and how to manage it.</p>} />
      <section className="py-12 sm:py-14">
        <div className="container-x max-w-3xl">
          {restore === "ok" && <p className="mb-6 border-l-2 border-sage-ink px-4 py-3 text-[0.9rem]">Access restored on this device.</p>}
          {restore === "invalid" && (
            <p className="mb-6 border-l-2 border-[#9b3b2a] px-4 py-3 text-[0.9rem]">That restore link isn&apos;t valid. Please check it and try again.</p>
          )}

          {ent.length || plusLapsed ? (
            <>
              <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">Unlocked</h2>
              <ul className="mt-3 border-t border-line">
                {ent.map((e) => (
                  <li key={e} className="flex items-center justify-between gap-4 border-b border-line py-3">
                    <span className="text-navy">{label(e)}</span>
                    {e === "plus" && renews && <span className="text-[0.82rem] text-muted">Paid through {renews}</span>}
                  </li>
                ))}
                {plusLapsed && (
                  <li className="flex items-center justify-between gap-4 border-b border-line py-3">
                    <span className="text-muted">Never After Plus — period ended</span>
                  </li>
                )}
              </ul>
              <AccessActions hasBilling={Boolean(access?.cus)} hasSubscription={Boolean(access?.sub)} />
              <div className="mt-12 border-t-2 border-navy pt-5">
                <h2 className="font-semibold text-navy">Private restore link</h2>
                <p className="mt-1.5 text-[0.9rem] text-charcoal/80">Open this on another device to unlock it. Keep it private.</p>
                <RestoreLink url={`${site.url}/api/access/restore?t=${signToken(access!)}`} />
              </div>
            </>
          ) : (
            <div className="border border-dashed border-line-strong p-8">
              <p className="hd-3">Nothing is unlocked in this browser.</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                If you&apos;ve already purchased, open the private restore link from your confirmation page. Can&apos;t
                find it? <Link href="/contact" className="underline underline-offset-2">Contact us</Link> with the email on
                your Stripe receipt.
              </p>
              <Link href="/pricing" className="btn-primary mt-6">
                See pricing
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
