import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatMatters } from "@/components/WhatMatters";
import { TopicGrid } from "@/components/TopicCard";
import { ArticleCard, ArticleRow } from "@/components/ArticleCard";
import { GuideDownload } from "@/components/GuideDownload";
import { NewsletterBand } from "@/components/NewsletterBand";
import { ProductCover } from "@/components/ProductCover";
import { EditorialStandards } from "@/components/EditorialStandards";
import { StudioPromo } from "@/components/StudioPromo";
import { topics } from "@/lib/topics";
import { pathways } from "@/lib/tools";
import { getAllArticles, getFeaturedArticles, toSummary } from "@/lib/content";
import { getProduct } from "@/lib/products";

const pillars = [
  {
    title: "Understand the law",
    text: "How Ontario family law works — parenting time, decision-making responsibility, support and property division.",
    href: "/family-law",
    cta: "Family law in Ontario",
  },
  {
    title: "Cut through the conflict",
    text: "The difference between situations that are emotionally difficult and issues that are legally relevant.",
    href: "/relevant-or-not",
    cta: "Relevant or not?",
  },
  {
    title: "Make informed decisions",
    text: "Resources to help you prepare questions, organize information and understand your options.",
    href: "/resources",
    cta: "Resources",
  },
];

export default function HomePage() {
  const featured = getFeaturedArticles().map(toSummary);
  const [lead, second, ...rest] = featured;
  const counts: Record<string, number> = {};
  for (const a of getAllArticles()) counts[a.category] = (counts[a.category] ?? 0) + 1;
  const starter = getProduct("ontario-separation-starter-guide")!;

  return (
    <>
      {/* HERO — headline on the left, a working entry point on the right */}
      <section aria-labelledby="hero-heading" className="border-b border-line">
        <div className="container-x grid gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:pb-20 lg:pt-20">
          <div className="flex flex-col">
            <p className="label">Divorce, separation & family law — explained</p>
            <h1 id="hero-heading" className="mt-5 font-serif text-[3rem] font-medium leading-[1.02] tracking-[-0.025em] text-navy sm:text-[4rem] lg:text-[4.1rem] xl:text-[4.6rem]">
              The fairytale ends.
              <br />
              Life doesn&apos;t.
            </h1>
            <p className="lede mt-7 max-w-xl">
              Divorce and separation can be complicated. Understanding what matters shouldn&apos;t be. Never After makes
              Ontario family law, parenting disputes and high-conflict separation easier to understand — one clear
              explanation at a time.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/start-here" className="btn-primary">
                Start here <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="#guides" className="btn-secondary">
                Explore the guides
              </Link>
            </div>
            <p className="mt-auto pt-10 text-[0.8rem] text-muted">
              General legal information for Ontario. Not a law firm. Not legal advice.
            </p>
          </div>

          <nav aria-labelledby="quick-start" className="border border-line bg-white/60 lg:self-end">
            <div className="border-b border-line px-5 py-4">
              <h2 id="quick-start" className="font-semibold text-navy">
                What are you trying to understand?
              </h2>
              <p className="mt-0.5 text-[0.82rem] text-muted">Get a short reading path. No personal details needed.</p>
            </div>
            <ul>
              {pathways.map((p) => (
                <li key={p.id} className="border-b border-line last:border-b-0">
                  <Link href={`/start-here?path=${p.id}`} className="group flex items-center justify-between gap-4 px-5 py-3.5 text-[0.95rem] text-charcoal transition-colors hover:bg-ivory hover:text-navy">
                    {p.label}
                    <ArrowRight className="h-4 w-4 shrink-0 text-navy/30 transition group-hover:translate-x-0.5 group-hover:text-navy" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* PILLARS */}
      <section aria-labelledby="pillars-heading" className="py-16 sm:py-20">
        <div className="container-x">
          <h2 id="pillars-heading" className="hd-1 max-w-2xl">
            Separation is complicated. Information shouldn&apos;t be.
          </h2>
          <div className="mt-10 grid gap-x-10 sm:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="border-t-2 border-navy pt-5 pb-6">
                <h3 className="hd-3">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/80">{p.text}</p>
                <Link href={p.href} className="text-link mt-4 inline-block text-[0.88rem]">
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT ACTUALLY MATTERS */}
      <section aria-labelledby="matters-heading" className="border-y border-line bg-ivory py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <h2 id="matters-heading" className="hd-1">
              What actually matters?
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-charcoal/80">
              Some things feel enormous in a separation and carry little legal weight. Others seem minor and turn out to
              be central. Open any item to see why — and the nuance that goes with it.
            </p>
          </div>
          <div className="mt-8">
            <WhatMatters />
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section aria-labelledby="featured-heading" className="py-16 sm:py-20">
        <div className="container-x">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="featured-heading" className="hd-1">
              Featured explainers
            </h2>
            <Link href="/articles" className="text-link shrink-0 text-[0.9rem]">
              All articles
            </Link>
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="grid gap-10">
              {lead && <ArticleCard article={lead} size="lg" />}
              {second && <ArticleCard article={second} />}
            </div>
            <div>
              <p className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">More questions people ask</p>
              <ul className="mt-3 border-b border-line">
                {rest.map((a) => (
                  <li key={a.slug}>
                    <ArticleRow article={a} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" aria-labelledby="guides-heading" className="scroll-mt-20 border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <h2 id="guides-heading" className="hd-1">
              Explore by topic
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-charcoal/80">
              Each guide covers the key terms, which law applies, the questions people ask most, and links to official
              Ontario and federal sources.
            </p>
          </div>
          <div className="mt-10">
            <TopicGrid items={topics} counts={counts} />
          </div>
        </div>
      </section>

      {/* STUDIO */}
      <section aria-label="Parenting Plan Studio" className="border-t border-line bg-ivory py-16 sm:py-20">
        <div className="container-x">
          <StudioPromo />
        </div>
      </section>

      {/* PRINCIPLE */}
      <section aria-label="Our approach" className="bg-navy py-16 text-paper sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-end">
          <p className="font-serif text-[1.8rem] leading-[1.25] tracking-[-0.01em] sm:text-[2.4rem]">
            You cannot control every part of separation. But you can better understand the process, the evidence, and the
            decisions ahead.
          </p>
          <div className="on-dark lg:justify-self-end">
            <Link href="/relevant-or-not" className="btn-light">
              Try Relevant or not? <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* FREE RESOURCE */}
      <section id="starter-guide" aria-labelledby="free-heading" className="scroll-mt-20 py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
          <div className="mx-auto w-full max-w-[260px] lg:max-w-[300px]">
            <ProductCover product={starter} />
          </div>
          <div className="max-w-xl">
            <p className="label">Free resource</p>
            <h2 id="free-heading" className="hd-1 mt-3">
              A clearer way forward starts here.
            </h2>
            <p className="mt-4 leading-relaxed text-charcoal/80">
              <strong className="font-semibold text-navy">The Ontario Separation Starter Guide</strong> — 16 printable pages
              on what to understand first.
            </p>
            <ul className="mt-4 grid gap-x-6 gap-y-1.5 text-[0.93rem] text-charcoal/85 sm:grid-cols-2">
              {[
                "Which law applies to you — a one-page map",
                "The four core questions, explained",
                "A first-30-days checklist",
                "Documents-to-gather worksheet",
                "Questions for a first consultation",
                "Affordable legal help, glossary, official sources",
              ].map((x) => (
                <li key={x} className="flex gap-2.5">
                  <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-champagne-ink" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
            <GuideDownload className="mt-7" />
          </div>
        </div>
      </section>

      {/* STANDARDS */}
      <section aria-labelledby="standards-heading" className="border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="standards-heading" className="hd-2">
              How we work
            </h2>
            <Link href="/editorial-standards" className="text-link shrink-0 text-[0.9rem]">
              Editorial standards
            </Link>
          </div>
          <div className="mt-6">
            <EditorialStandards limit={4} />
          </div>
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
