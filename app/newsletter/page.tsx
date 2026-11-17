import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { SignupForm } from "@/components/SignupForm";
import { GuideDownload } from "@/components/GuideDownload";

export const metadata: Metadata = {
  title: "The Never After Brief — Ontario Family Law Newsletter",
  description:
    "A free weekly email with clear explanations of Ontario family law, separation and parenting — plus new guides and tools. No spam; unsubscribe anytime.",
  alternates: { canonical: "/newsletter" },
};

type Props = { searchParams: Promise<{ status?: string }> };

const notices: Record<string, { tone: "ok" | "warn"; title: string; text: string }> = {
  confirmed: {
    tone: "ok",
    title: "You're subscribed.",
    text: "Thank you for confirming. A welcome email with the free Starter Guide is on its way.",
  },
  expired: {
    tone: "warn",
    title: "That confirmation link has expired or isn't valid.",
    text: "Please sign up again below and we'll send a fresh link.",
  },
  error: {
    tone: "warn",
    title: "We couldn't complete your subscription.",
    text: "Something went wrong on our side. Please try again in a few minutes.",
  },
};

const included = [
  "One clear explainer each week on an Ontario family-law question people actually ask",
  "New articles, guides and tools as they're published",
  "Changes to the law and court process, in plain English",
  "Never sales-heavy, never fear-based — and never your data sold",
];

export default async function NewsletterPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const notice = status ? notices[status] : undefined;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Newsletter" }]}
        label="Newsletter"
        title="The Never After Brief"
        intro={<p>Clear explanations. Useful resources. Less noise. A free weekly email about separation, parenting and Ontario family law.</p>}
      />
      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            {notice && (
              <div
                role="status"
                className={`mb-8 border-l-2 px-4 py-3 ${notice.tone === "ok" ? "border-sage-ink bg-ivory" : "border-[#9b3b2a] bg-ivory"}`}
              >
                <p className="font-semibold text-navy">{notice.title}</p>
                <p className="mt-1 text-[0.92rem] text-charcoal/85">{notice.text}</p>
                {status === "confirmed" && <GuideDownload className="mt-4" />}
              </div>
            )}
            <h2 className="hd-3">What you&apos;ll get</h2>
            <ul className="mt-4 space-y-3">
              {included.map((x) => (
                <li key={x} className="flex gap-3 leading-relaxed text-charcoal/85">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-sage-ink" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.92rem] leading-relaxed text-charcoal/80">
              New subscribers also get the free <strong className="font-semibold text-navy">Ontario Separation Starter Guide</strong>{" "}
              in their welcome email. Prefer not to subscribe?{" "}
              <a href="/guides/ontario-separation-starter-guide.pdf" className="text-link font-medium" download>
                Download it directly
              </a>
              .
            </p>
          </div>
          <div className="border-t-2 border-navy pt-5 lg:self-start">
            <h2 className="font-semibold text-navy">Subscribe — it&apos;s free</h2>
            <p className="mt-1 mb-5 text-[0.88rem] text-muted">We&apos;ll email you a link to confirm. Unsubscribe anytime in one click.</p>
            <SignupForm list="newsletter" cta="Subscribe" />
            <p className="mt-6 text-[0.8rem] leading-relaxed text-muted">
              We only store your email address and your consent. See our{" "}
              <Link href="/privacy" className="underline underline-offset-2">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
