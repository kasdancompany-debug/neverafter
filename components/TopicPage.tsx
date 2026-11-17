import Link from "next/link";
import type { ReactNode } from "react";
import type { Topic } from "@/lib/topics";
import { getArticlesByCategory, resolveSources, toSummary } from "@/lib/content";
import { site } from "@/lib/site";
import { PageHeader } from "./PageHeader";
import { ArticleCard } from "./ArticleCard";
import { SourceList } from "./SourceList";
import { Faq } from "./Faq";
import { LegalNote } from "./LegalNote";
import { NewsletterBand } from "./NewsletterBand";
import { JsonLd } from "./JsonLd";
import { OnThisPage } from "./OnThisPage";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Guide layout: documentation-style. A sticky "On this page" rail tracks the reader,
 * the main column holds terms, explainer sections, extra modules, questions and sources.
 */
export function TopicPage({
  topic,
  crumbLabel,
  title,
  extra,
  extraNav,
  before,
}: {
  topic: Topic;
  crumbLabel: string;
  title?: string;
  extra?: ReactNode;
  extraNav?: { id: string; label: string };
  before?: ReactNode;
}) {
  const related = getArticlesByCategory(topic.slug).map(toSummary);
  const nav = [
    { id: "key-terms", label: "Key terms" },
    ...topic.sections.map((s) => ({ id: slug(s.heading), label: s.heading })),
    ...(extraNav ? [extraNav] : []),
    ...(related.length ? [{ id: "read-further", label: "Read further" }] : []),
    { id: "questions", label: "Common questions" },
    { id: "sources", label: "Official sources" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: topic.metaTitle,
          description: topic.metaDescription,
          url: `${site.url}${topic.href}`,
          inLanguage: "en-CA",
          isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
        }}
      />
      <PageHeader
        crumbs={[{ label: crumbLabel }]}
        label={topic.eyebrow}
        title={title ?? topic.title}
        intro={<p>{topic.intro}</p>}
        aside={
          <div className="border-t-2 border-navy pt-4">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">Which law applies?</p>
            <p className="mt-2 text-[0.9rem] leading-relaxed text-charcoal/80">{topic.jurisdictionNote}</p>
          </div>
        }
      />

      {before}

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
          <OnThisPage items={nav} />
          <Link href="/start-here" className="text-link mt-8 inline-block text-[0.88rem]">
            Find your starting point
          </Link>
        </aside>

        <div className="min-w-0 max-w-[760px] space-y-16">
          <section id="key-terms" aria-labelledby="key-terms-h" className="scroll-mt-24">
            <h2 id="key-terms-h" className="hd-2">
              Key terms
            </h2>
            <dl className="mt-6 border-t border-line">
              {topic.concepts.map((c) => (
                <div key={c.term} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="font-semibold text-navy">{c.term}</dt>
                  <dd className="text-[0.95rem] leading-relaxed text-charcoal/80">{c.definition}</dd>
                </div>
              ))}
            </dl>
          </section>

          {topic.sections.map((s) => (
            <section key={s.heading} id={slug(s.heading)} className="scroll-mt-24">
              <h2 className="hd-2">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-4 font-serif text-[1.15rem] leading-[1.7] text-charcoal">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <LegalNote />

          {extra}

          {related.length > 0 && (
            <section id="read-further" aria-labelledby="read-further-h" className="scroll-mt-24">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="read-further-h" className="hd-2">
                  Read further
                </h2>
                <Link href={`/articles?topic=${topic.slug}`} className="text-link shrink-0 text-[0.88rem]">
                  All {topic.title.toLowerCase()} articles
                </Link>
              </div>
              <ul className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {related.map((a) => (
                  <li key={a.slug}>
                    <ArticleCard article={a} />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section id="questions" aria-labelledby="questions-h" className="scroll-mt-24">
            <h2 id="questions-h" className="hd-2">
              Common questions
            </h2>
            <div className="mt-6">
              <Faq items={topic.faqs} />
            </div>
          </section>

          <section id="sources" className="scroll-mt-24">
            <SourceList sources={resolveSources(topic.sources)} />
          </section>
        </div>
      </div>

      <NewsletterBand />
    </>
  );
}
