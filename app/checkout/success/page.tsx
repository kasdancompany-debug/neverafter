import type { Metadata } from "next";
import Link from "next/link";
import { getCatalogItem } from "@/lib/catalog";
import { activeEntitlements, readAccess, signToken } from "@/lib/access";
import { site } from "@/lib/site";
import { RestoreLink } from "@/components/RestoreLink";

export const metadata: Metadata = { title: "Purchase confirmation", robots: { index: false } };

type Props = { searchParams: Promise<{ item?: string; status?: string }> };

export default async function SuccessPage({ searchParams }: Props) {
  const { item: itemId, status } = await searchParams;
  const access = await readAccess();
  const item = itemId ? getCatalogItem(itemId) : undefined;
  // Only confirm when the signed access cookie actually contains what was bought (set after Stripe verification).
  const confirmed = Boolean(item && access && item.entitlements.every((e) => activeEntitlements(access).includes(e)));

  if (!confirmed) {
    const msg =
      status === "unpaid"
        ? "Stripe hasn't confirmed this payment yet, so nothing has been unlocked. If you were charged, please contact us and we'll sort it out."
        : "We couldn't confirm a purchase from this link. No access was granted.";
    return (
      <section className="container-x py-20 sm:py-28">
        <p className="label">Checkout</p>
        <h1 className="h-display mt-3 max-w-2xl">We couldn&apos;t confirm your payment</h1>
        <p className="lede mt-5 max-w-xl">{msg}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/pricing" className="btn-primary">
            Back to pricing
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact us
          </Link>
        </div>
      </section>
    );
  }

  const restoreUrl = `${site.url}/api/access/restore?t=${signToken(access!)}`;
  return (
    <section className="container-x py-20 sm:py-28">
      <p className="label">Payment confirmed</p>
      <h1 className="h-display mt-3 max-w-3xl">Thank you. You&apos;re all set.</h1>
      <p className="lede mt-5 max-w-xl">
        <strong className="font-semibold text-navy">{item!.name}</strong> is now unlocked in this browser. Stripe has emailed
        your receipt.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={item!.returnTo === "/access" ? "/parenting-plan-studio" : item!.returnTo} className="btn-primary">
          {item!.id === "studio" || item!.id.startsWith("plus") ? "Open Parenting Plan Studio" : "Continue"}
        </Link>
        <Link href="/access" className="btn-secondary">
          Your access
        </Link>
      </div>
      <div className="mt-14 max-w-2xl border-t-2 border-navy pt-5">
        <h2 className="font-semibold text-navy">Save your private restore link</h2>
        <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/80">
          Use it to unlock your purchase on another device or browser. Keep it private — anyone with the link gets the same
          access.
        </p>
        <RestoreLink url={restoreUrl} />
      </div>
    </section>
  );
}
