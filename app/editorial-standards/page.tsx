import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EditorialStandards } from "@/components/EditorialStandards";
import { SourceList } from "@/components/SourceList";
import { resolveSources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description: "How Never After researches, writes, reviews and corrects its educational content on Ontario family law.",
  alternates: { canonical: "/editorial-standards" },
};

const process = [
  { title: "Research", text: "We start from legislation, regulations, court rules and official government and court resources." },
  { title: "Write", text: "Plain English. The jurisdiction is always stated, and careful language is used where outcomes depend on facts." },
  { title: "Editorial review", text: "Every article is checked for clarity, neutrality, tone and sourcing, and dated." },
  { title: "Legal review", text: "Articles are labelled 'Editorial draft' until reviewed by a qualified Ontario family-law professional." },
  { title: "Update and correct", text: "We revisit content as laws change, and note substantive corrections on the page." },
];

export default function EditorialStandardsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Editorial Standards" }]}
        label="Editorial standards"
        title="How we research, write and correct"
        intro={<p>Family law affects people at vulnerable moments. These are the standards we hold ourselves to.</p>}
      />
      <section className="py-14 sm:py-16">
        <div className="container-x">
          <EditorialStandards />
        </div>
      </section>
      <section aria-labelledby="process" className="border-y border-line bg-ivory py-14 sm:py-16">
        <div className="container-x">
          <h2 id="process" className="hd-2">
            Our process
          </h2>
          <ol className="mt-8 grid gap-x-8 md:grid-cols-5">
            {process.map((p, i) => (
              <li key={p.title} className="border-t-2 border-navy py-4">
                <p className="font-semibold text-navy">
                  <span className="mr-2 text-champagne-ink">{i + 1}.</span>
                  {p.title}
                </p>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-charcoal/80">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="py-14 sm:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="max-w-[680px] space-y-8">
            <div>
              <h2 className="hd-3">Information vs. advice</h2>
              <p className="mt-2 leading-relaxed text-charcoal/85">
                Legal information explains what the law is and how processes work. Legal advice applies the law to a
                particular person&apos;s facts and recommends a course of action. We provide the first, never the second.
              </p>
            </div>
            <div>
              <h2 className="hd-3">Language we use — and avoid</h2>
              <p className="mt-2 leading-relaxed text-charcoal/85">
                We say &ldquo;may be relevant&rdquo;, &ldquo;depends on the circumstances&rdquo; and &ldquo;courts may
                consider&rdquo; because they are accurate. We avoid language that frames children as prizes, separations
                as battles, or courts as places to defeat the other parent.
              </p>
            </div>
            <div>
              <h2 className="hd-3">What we never invent</h2>
              <p className="mt-2 leading-relaxed text-charcoal/85">
                Legal citations, court decisions, statistics, testimonials, endorsements or professional credentials.
                Where something hasn&apos;t been verified, we say so.
              </p>
            </div>
          </div>
          <SourceList
            heading="Sources we prioritize"
            sources={resolveSources(["eLaws", "divorceAct", "dojFamilyLaw", "ontarioFamilyLaw", "scjFamily", "familyLawRules", "stepsToJustice"])}
          />
        </div>
      </section>
    </>
  );
}
