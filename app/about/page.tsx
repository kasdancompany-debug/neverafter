import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { EditorialStandards } from "@/components/EditorialStandards";
import { NewsletterBand } from "@/components/NewsletterBand";

export const metadata: Metadata = {
  title: "About Never After — Mission & Philosophy",
  description:
    "Never After is a Canadian educational media brand helping people navigate divorce, separation and parenting disputes with clarity, confidence and reliable information.",
  alternates: { canonical: "/about" },
};

const philosophy = [
  ["Facts over feelings", "when evaluating legal questions."],
  ["Children's best interests over parental conflict.", ""],
  ["Evidence over unsupported allegations.", ""],
  ["Informed decisions over emotional reactions.", ""],
  ["Understanding the process", "before making important decisions."],
  ["Clarity", "instead of unnecessary complexity."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "About" }]}
        label="About"
        title="About Never After"
        intro={
          <p>
            Never After helps people navigate divorce, separation, child custody and high-conflict parenting disputes with
            clarity, confidence and reliable information.
          </p>
        }
      />

      <section aria-labelledby="mission" className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2 id="mission" className="hd-2">
            Our mission
          </h2>
          <div className="max-w-[680px] space-y-5 font-serif text-[1.2rem] leading-[1.7] text-charcoal">
            <p>
              People navigating family breakdown deserve better than confusing legal terminology, emotionally charged
              internet advice and endless misinformation.
            </p>
            <p>
              We help people distinguish between what actually matters and what doesn&apos;t. We explain how the system
              works — the legislation, the court process, the role of evidence — so the decisions ahead can be made with a
              clearer understanding.
            </p>
            <p>
              We are neutral. We do not advocate for mothers over fathers, fathers over mothers, or for either party in a
              separation. We don&apos;t promise anyone that they will win. Our starting point is the well-being of
              children.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="philosophy" className="border-y border-line bg-ivory py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2 id="philosophy" className="hd-2">
            Our philosophy
          </h2>
          <ol className="max-w-[680px] border-t border-line-strong">
            {philosophy.map(([lead, rest], i) => (
              <li key={lead} className="flex gap-5 border-b border-line-strong py-4 font-serif text-[1.25rem] leading-snug">
                <span className="w-5 shrink-0 font-sans text-[0.85rem] text-champagne-ink">{i + 1}</span>
                <span>
                  <span className="font-medium text-navy">{lead}</span> <span className="text-charcoal/80">{rest}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="are" className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2 id="are" className="hd-2">
            What we are — and aren&apos;t
          </h2>
          <div className="grid max-w-[680px] gap-10 sm:grid-cols-2">
            <div className="border-t-2 border-navy pt-4">
              <h3 className="font-semibold text-navy">We are</h3>
              <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-charcoal/85">
                <li>A Canadian educational media publication</li>
                <li>Focused on Ontario, expanding across Canada</li>
                <li>Neutral, inclusive, evidence-based and child-focused</li>
                <li>Committed to official sources and open corrections</li>
              </ul>
            </div>
            <div className="border-t-2 border-line-strong pt-4">
              <h3 className="font-semibold text-navy">We are not</h3>
              <ul className="mt-3 space-y-2 text-[0.95rem] leading-relaxed text-charcoal/85">
                <li>A law firm, or a substitute for a lawyer</li>
                <li>A source of personalized advice or case strategy</li>
                <li>An advocate for any side in a separation</li>
                <li>A place that promises outcomes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="standards" className="border-t border-line py-14 sm:py-16">
        <div className="container-x">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="standards" className="hd-2">
              How we work
            </h2>
            <Link href="/editorial-standards" className="text-link shrink-0 text-[0.9rem]">
              Editorial standards
            </Link>
          </div>
          <div className="mt-6">
            <EditorialStandards />
          </div>
        </div>
      </section>

      <section aria-labelledby="contributors" className="border-t border-line py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <h2 id="contributors" className="hd-2">
            Contributors and reviewers
          </h2>
          <div className="max-w-[680px]">
            <p className="leading-relaxed text-charcoal/85">
              We are inviting Ontario family-law professionals and child-development specialists to review our content.
              A contributor&apos;s name and credentials will only appear here after they have agreed and their credentials
              have been verified. Until then, articles are attributed to the Never After Editorial Team and clearly
              labelled while legal review is pending.
            </p>
            <table className="mt-6 w-full border-t border-line text-left text-[0.92rem]">
              <caption className="sr-only">Open review roles</caption>
              <thead className="sr-only">
                <tr>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {["Legal reviewer (Ontario family law)", "Family-law contributor", "Child-development advisor"].map((r) => (
                  <tr key={r} className="border-b border-line">
                    <td className="py-3 text-navy">{r}</td>
                    <td className="py-3 text-right text-muted">Open</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link href="/contact" className="text-link mt-5 inline-block text-[0.9rem]">
              Interested in contributing? Get in touch
            </Link>
          </div>
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
