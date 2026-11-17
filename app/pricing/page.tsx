import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { CheckoutButton } from "@/components/CheckoutButton";
import { Faq } from "@/components/Faq";
import { NewsletterBand } from "@/components/NewsletterBand";
import { PLUS_MONTHLY, PLUS_YEARLY, STUDIO_PRICE } from "@/lib/catalog";
import { accessConfigured } from "@/lib/access";
import { stripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Pricing — Free, Parenting Plan Studio and Never After Plus",
  description: "Never After is free to read. Unlock Parenting Plan Studio export with a one-time payment, or join Never After Plus.",
  alternates: { canonical: "/pricing" },
};

const faqs = [
  {
    q: "How do payments work?",
    a: "Payments are processed by Stripe on a secure, Stripe-hosted page. Never After never sees or stores your card details. You'll get an email receipt from Stripe.",
  },
  {
    q: "Do I need an account?",
    a: "No. After payment, access is saved in this browser. You'll also get a private restore link on the confirmation page so you can unlock another device.",
  },
  {
    q: "Can I cancel Plus?",
    a: "Yes, anytime, from the “Your access” page. You keep access until the end of the period you've paid for.",
  },
  {
    q: "Is this legal advice?",
    a: "No. Never After is an educational publisher, not a law firm. Parenting Plan Studio helps you organize a proposal; it does not draft legal documents or advise you on your case. Have any plan reviewed by a lawyer licensed in Ontario.",
  },
  {
    q: "What about refunds?",
    a: "If something isn't right, contact us within 14 days of purchase and we'll make it right, including a refund where appropriate.",
  },
];

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[0.92rem] leading-relaxed text-charcoal/85">
      <Check className="mt-1 h-4 w-4 shrink-0 text-sage-ink" aria-hidden />
      {children}
    </li>
  );
}

export default function PricingPage() {
  const configured = stripeConfigured() && accessConfigured();
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Pricing" }]}
        label="Pricing"
        title="Free to learn. Pay only for tools."
        intro={<p>Every article, guide and interactive explainer is free. Paid tools help you organize and prepare.</p>}
      />

      <section aria-label="Plans" className="py-12 sm:py-16">
        <div className="container-x">
          <div className="grid border-l border-t border-line lg:grid-cols-3">
            <div className="flex flex-col border-b border-r border-line p-7">
              <h2 className="hd-3">Free</h2>
              <p className="mt-3 font-serif text-[2.4rem] leading-none text-navy">$0</p>
              <p className="mt-1 text-[0.82rem] text-muted">Always</p>
              <ul className="mt-6 space-y-2">
                <Feature>All articles and topic guides</Feature>
                <Feature>Find Your Starting Point and Relevant or not?</Feature>
                <Feature>Build and preview a parenting plan</Feature>
                <Feature>The Never After Brief newsletter</Feature>
              </ul>
              <div className="mt-auto pt-8">
                <Link href="/start-here" className="btn-secondary w-full">
                  Start here
                </Link>
              </div>
            </div>

            <div className="relative flex flex-col border-b border-r border-line bg-ivory p-7">
              <span className="absolute right-5 top-5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-champagne-ink">Most popular</span>
              <h2 className="hd-3">Parenting Plan Studio</h2>
              <p className="mt-3 font-serif text-[2.4rem] leading-none text-navy">${STUDIO_PRICE}</p>
              <p className="mt-1 text-[0.82rem] text-muted">CAD · one-time · lifetime access</p>
              <ul className="mt-6 space-y-2">
                <Feature>Print or save your plan as a PDF</Feature>
                <Feature>Unlimited drafts and revisions</Feature>
                <Feature>Draft files to continue on any device or share with your lawyer</Feature>
                <Feature>Stays private on your device</Feature>
              </ul>
              <div className="mt-auto pt-8">
                <CheckoutButton item="studio" label={`Buy Studio — $${STUDIO_PRICE}`} title="Parenting Plan Studio" configured={configured} full />
                <Link href="/parenting-plan-studio" className="text-link mt-3 inline-block text-[0.85rem]">
                  Try it free first
                </Link>
              </div>
            </div>

            <div className="flex flex-col border-b border-r border-line p-7">
              <h2 className="hd-3">Never After Plus</h2>
              <p className="mt-3 font-serif text-[2.4rem] leading-none text-navy">
                ${PLUS_MONTHLY}
                <span className="font-sans text-[0.9rem] text-muted"> / month</span>
              </p>
              <p className="mt-1 text-[0.82rem] text-muted">
                CAD · or ${PLUS_YEARLY}/year (save {Math.round((1 - PLUS_YEARLY / (PLUS_MONTHLY * 12)) * 100)}%)
              </p>
              <ul className="mt-6 space-y-2">
                <Feature>Everything in Parenting Plan Studio</Feature>
                <Feature>Every Never After guide and toolkit as it&apos;s released</Feature>
                <Feature>Cancel anytime</Feature>
              </ul>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-muted">
                Currently includes Parenting Plan Studio. Guides are added as they&apos;re published.
              </p>
              <div className="mt-auto grid gap-2 pt-8">
                <CheckoutButton item="plus-yearly" label={`Yearly — $${PLUS_YEARLY}`} title="Never After Plus" configured={configured} full />
                <CheckoutButton item="plus-monthly" label={`Monthly — $${PLUS_MONTHLY}`} title="Never After Plus" variant="secondary" configured={configured} full />
              </div>
            </div>
          </div>
          <p className="mt-4 text-[0.82rem] text-muted">
            Prices in Canadian dollars. Applicable taxes may be added at checkout. Already purchased?{" "}
            <Link href="/access" className="underline underline-offset-2">
              Restore access
            </Link>
            .
          </p>
        </div>
      </section>

      <section aria-labelledby="pricing-faq" className="border-t border-line py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2 id="pricing-faq" className="hd-2">
            Questions
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
