import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { SourceList } from "@/components/SourceList";
import { LegalNote } from "@/components/LegalNote";
import { NewsletterBand } from "@/components/NewsletterBand";
import { JsonLd } from "@/components/JsonLd";
import { OnThisPage } from "@/components/OnThisPage";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleTools } from "@/components/ArticleTools";
import { Faq } from "@/components/Faq";
import type { Block } from "@/lib/articles";
import {
  categoryHref,
  categoryLabel,
  formatDate,
  getAllArticles,
  getArticle,
  getRelatedArticles,
  readingTime,
  resolveSources,
  toSummary,
} from "@/lib/content";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    keywords: a.keywords,
    alternates: { canonical: `/articles/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      url: `/articles/${a.slug}`,
      publishedTime: a.published,
      modifiedTime: a.reviewed,
      section: categoryLabel(a.category),
    },
  };
}

function renderBlock(b: Block, i: number) {
  if (typeof b === "string") return <p key={i}>{b}</p>;
  switch (b.type) {
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "list":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside key={i} className="my-8 border-l-2 border-champagne bg-ivory px-5 py-4 font-sans">
          <p className="!my-0 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">{b.title}</p>
          <p className="!mb-0 !mt-1.5 text-[0.98rem] leading-relaxed text-charcoal/85">{b.text}</p>
        </aside>
      );
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const minutes = readingTime(article);
  const related = getRelatedArticles(article).map(toSummary);
  const catLabel = categoryLabel(article.category);
  const catHref = categoryHref(article.category);
  const toc = [
    { id: "key-takeaways", label: "Key takeaways" },
    ...article.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(article.faqs?.length ? [{ id: "quick-answers", label: "Quick answers" }] : []),
    { id: "sources", label: "Sources" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.summary,
          datePublished: article.published,
          dateModified: article.reviewed,
          inLanguage: "en-CA",
          author: { "@type": "Organization", name: article.author },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          mainEntityOfPage: `${site.url}/articles/${article.slug}`,
          articleSection: catLabel,
          keywords: article.keywords.join(", "),
          isAccessibleForFree: true,
        }}
      />
      {article.faqs?.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      ) : null}
      <ReadingProgress targetId="article-body" />

      <article>
        <header className="border-b border-line">
          <div className="container-x pb-10 pt-8 sm:pb-12">
            <Breadcrumbs items={[{ label: "Articles", href: "/articles" }, { label: catLabel, href: catHref }]} />
            <div className="mt-10 max-w-[820px]">
              <Link href={catHref} className="label hover:underline hover:underline-offset-4">
                {catLabel}
              </Link>
              <h1 className="mt-3 font-serif text-[2.4rem] font-medium leading-[1.06] tracking-[-0.02em] text-navy sm:text-[3.2rem] lg:text-[3.6rem]">
                {article.title}
              </h1>
              <p className="mt-5 font-serif text-[1.3rem] leading-[1.5] text-charcoal/80">{article.summary}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
              <p className="text-[0.85rem] text-muted">
                <span className="font-medium text-charcoal">{article.author}</span>
                <span aria-hidden> · </span>
                Published <time dateTime={article.published}>{formatDate(article.published)}</time>
                <span aria-hidden> · </span>
                Reviewed <time dateTime={article.reviewed}>{formatDate(article.reviewed)}</time>
                <span aria-hidden> · </span>
                {minutes} min read
              </p>
              <ArticleTools title={article.title} />
            </div>
          </div>
        </header>

        <div className="container-x grid gap-12 py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:py-14">
          <aside className="no-print hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <OnThisPage items={toc} title="In this article" />
          </aside>

          <div id="article-body" className="min-w-0 max-w-[700px]">
            <dl className="mb-8 grid gap-x-8 gap-y-3 border-y border-line py-4 text-[0.85rem] sm:grid-cols-2">
              <div>
                <dt className="text-muted">Jurisdiction</dt>
                <dd className="font-medium text-navy">{article.jurisdiction}</dd>
              </div>
              <div>
                <dt className="text-muted">Review status</dt>
                <dd className="font-medium text-navy">
                  {article.legalReview === "pending" ? "Editorial draft — legal review pending" : "Reviewed by an Ontario family-law professional"}
                </dd>
              </div>
            </dl>

            <section id="key-takeaways" aria-labelledby="key-takeaways-h" className="scroll-mt-24 border-t-2 border-navy pt-4">
              <h2 id="key-takeaways-h" className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">
                Key takeaways
              </h2>
              <ul className="mt-3 space-y-2.5">
                {article.takeaways.map((t) => (
                  <li key={t} className="flex gap-3 text-[1rem] leading-relaxed text-charcoal">
                    <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-champagne-ink" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            <div className="prose-na mt-4">
              {article.sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id}>
                  <h2 id={s.id} className="scroll-mt-24">
                    {s.heading}
                  </h2>
                  {s.blocks.map(renderBlock)}
                </section>
              ))}
            </div>

            {article.faqs?.length ? (
              <section id="quick-answers" aria-labelledby="quick-answers-h" className="mt-14 scroll-mt-24">
                <h2 id="quick-answers-h" className="hd-2">
                  Quick answers
                </h2>
                <div className="mt-5">
                  <Faq items={article.faqs} />
                </div>
              </section>
            ) : null}

            <LegalNote className="mt-12" />

            <section id="sources" className="mt-12 scroll-mt-24">
              <SourceList sources={resolveSources(article.sources)} heading="Sources & official information" />
            </section>

            <p className="mt-8 text-[0.85rem] leading-relaxed text-muted">
              Spotted an error or an outdated link?{" "}
              <Link href="/contact" className="text-link font-medium">
                Tell us
              </Link>
              . We correct mistakes transparently — see our{" "}
              <Link href="/editorial-standards" className="text-link font-medium">
                editorial standards
              </Link>
              .
            </p>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line py-14 sm:py-16">
          <div className="container-x">
            <h2 id="related" className="hd-2">
              Related reading
            </h2>
            <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <NewsletterBand />
    </>
  );
}
