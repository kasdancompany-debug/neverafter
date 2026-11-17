import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { StartingPoint } from "@/components/StartingPoint";
import { NewsletterBand } from "@/components/NewsletterBand";
import { getAllArticles, toSummary } from "@/lib/content";
import { topics } from "@/lib/topics";
import { officialSources } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Here — Find Your Starting Point",
  description:
    "Not sure where to start with separation or Ontario family law? Choose what you're trying to understand and get a curated educational reading path.",
  alternates: { canonical: "/start-here" },
};

const principles = [
  { title: "Separate the questions", text: "Parenting, child support, spousal support, property and process are related — but each has its own rules." },
  { title: "Know which law applies", text: "Married or not, divorcing or not: the answer changes which statutes, forms and courts are involved." },
  { title: "Focus on what's relevant", text: "Strong feelings are real. Decisions are made on the child's best interests and the evidence." },
  { title: "Get advice for your situation", text: "Education helps you ask better questions. A licensed Ontario lawyer can answer them." },
];

export default function StartHerePage() {
  const articleMap = Object.fromEntries(getAllArticles().map((a) => [a.slug, toSummary(a)]));
  const topicLabels = Object.fromEntries(topics.map((t) => [t.href, t.title]));

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Start Here" }]}
        label="Start here"
        title="Not sure where to start?"
        intro={<p>Tell us what you&apos;re trying to understand. We&apos;ll suggest a short, focused reading path.</p>}
      />

      <section id="starting-point" aria-label="Find your starting point" className="scroll-mt-20 py-12 sm:py-16">
        <div className="container-x">
          <StartingPoint articles={articleMap} topicLabels={topicLabels} />
        </div>
      </section>

      <section aria-labelledby="principles" className="border-t border-line bg-ivory py-14 sm:py-16">
        <div className="container-x">
          <h2 id="principles" className="hd-2">
            Four principles that make the rest easier
          </h2>
          <ol className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line-strong py-5">
                <p className="font-semibold text-navy">
                  <span className="mr-2 text-champagne-ink">{i + 1}.</span>
                  {p.title}
                </p>
                <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/80">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-label="Help and safety" className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="border-t-2 border-navy pt-5">
            <h2 className="hd-3">If safety is a concern</h2>
            <p className="mt-2 leading-relaxed text-charcoal/80">
              If you or a child are in immediate danger, call 911. Concerns about family violence change the picture
              significantly — seek legal advice and support as early as possible.
            </p>
            <a href={officialSources.legalAid.url} target="_blank" rel="noopener noreferrer" className="text-link mt-4 inline-block text-[0.9rem]">
              Legal Aid Ontario<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <div className="border-t-2 border-navy pt-5">
            <h2 className="hd-3">Finding a lawyer</h2>
            <p className="mt-2 leading-relaxed text-charcoal/80">
              Never After provides education, not advice. The Law Society of Ontario explains how to find a licensed
              lawyer or paralegal, and Legal Aid Ontario may help if you&apos;re eligible.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem]">
              <a href={officialSources.lso.url} target="_blank" rel="noopener noreferrer" className="text-link">
                Law Society of Ontario<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <Link href="/family-court" className="text-link">
                How the court process works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
