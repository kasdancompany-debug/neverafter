"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Link2, Printer, RotateCcw } from "lucide-react";
import { pathways } from "@/lib/tools";
import { officialSources } from "@/lib/site";
import type { ArticleSummary } from "@/lib/content";

/**
 * Guided educational pathway. Asks for one general category only — no names, ages, allegations or court details.
 * The choice lives in component state and the URL (?path=…) so it can be bookmarked; nothing is sent anywhere.
 */
export function StartingPoint({ articles, topicLabels }: { articles: Record<string, ArticleSummary>; topicLabels: Record<string, string> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const path = pathways.find((p) => p.id === selected);

  useEffect(() => {
    const id = new URLSearchParams(location.search).get("path");
    if (id && pathways.some((p) => p.id === id)) setSelected(id);
  }, []);

  function choose(id: string | null) {
    setSelected(id);
    const url = new URL(location.href);
    if (id) url.searchParams.set("path", id);
    else url.searchParams.delete("path");
    history.replaceState(null, "", url);
    if (id && window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: "start" }));
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <fieldset className="lg:sticky lg:top-24 lg:self-start">
        <legend className="mb-3 text-[0.85rem] font-semibold text-navy">I&apos;m trying to understand…</legend>
        <div className="border-t border-line">
          {pathways.map((p) => {
            const active = p.id === selected;
            return (
              <label
                key={p.id}
                className={`relative flex cursor-pointer items-center gap-3 border-b border-line py-3.5 pl-4 pr-3 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-navy ${
                  active ? "bg-ivory text-navy" : "text-charcoal/85 hover:bg-ivory/60"
                }`}
              >
                {active && <span className="absolute inset-y-0 left-0 w-[3px] bg-navy" aria-hidden />}
                <input type="radio" name="starting-point" value={p.id} checked={active} onChange={() => choose(p.id)} className="sr-only" />
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${active ? "border-navy bg-navy" : "border-line-strong"}`}
                  aria-hidden
                >
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
                </span>
                <span className={`text-[0.98rem] leading-snug ${active ? "font-medium" : ""}`}>{p.label}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">
          We don&apos;t ask for — or store — any personal details. Your choice stays in your browser.
        </p>
      </fieldset>

      <div ref={resultRef} aria-live="polite" className="scroll-mt-20">
        {path ? (
          <section key={path.id} aria-label={`Your reading path: ${path.heading}`} className="anim-fade-up">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[0.8rem] text-muted">
              <span>Your reading path</span>
              <span className="no-print flex gap-4">
                <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 hover:text-navy">
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Link2 className="h-3.5 w-3.5" aria-hidden />}
                  {copied ? "Link copied" : "Copy link"}
                </button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 hover:text-navy">
                  <Printer className="h-3.5 w-3.5" aria-hidden /> Print
                </button>
                <button type="button" onClick={() => choose(null)} className="inline-flex items-center gap-1.5 hover:text-navy">
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Reset
                </button>
              </span>
            </div>
            <h3 className="hd-1 mt-3">{path.heading}</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/80">{path.intro}</p>

            <ol className="mt-8 border-t border-line">
              <li className="grid gap-3 border-b border-line py-6 sm:grid-cols-[150px_1fr] sm:gap-6">
                <h4 className="text-[0.85rem] font-semibold text-navy">
                  <span className="mr-2 text-champagne-ink">1</span>Understand first
                </h4>
                <ul className="space-y-2 text-[0.95rem] text-charcoal/85">
                  {path.understand.map((u) => (
                    <li key={u} className="flex gap-2.5">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-champagne-ink" aria-hidden />
                      {u}
                    </li>
                  ))}
                </ul>
              </li>
              <li className="grid gap-3 border-b border-line py-6 sm:grid-cols-[150px_1fr] sm:gap-6">
                <h4 className="text-[0.85rem] font-semibold text-navy">
                  <span className="mr-2 text-champagne-ink">2</span>Read
                </h4>
                <ul className="-mt-2">
                  {path.articles.map((slug) => {
                    const a = articles[slug];
                    if (!a) return null;
                    return (
                      <li key={slug}>
                        <Link href={`/articles/${slug}`} className="group flex items-start justify-between gap-4 py-2">
                          <span>
                            <span className="block font-serif text-[1.15rem] font-medium leading-snug text-navy group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
                              {a.title}
                            </span>
                            <span className="text-[0.78rem] text-muted">
                              {a.categoryLabel} · {a.minutes} min read
                            </span>
                          </span>
                          <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-navy/40 group-hover:text-navy" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className="grid gap-3 border-b border-line py-6 sm:grid-cols-[150px_1fr] sm:gap-6">
                <h4 className="text-[0.85rem] font-semibold text-navy">
                  <span className="mr-2 text-champagne-ink">3</span>Go deeper
                </h4>
                <div className="flex flex-wrap gap-2">
                  {path.topics.map((href) => (
                    <Link key={href} href={href} className="btn-secondary !h-9 !px-3.5 !text-[0.85rem]">
                      {topicLabels[href] ?? href}
                    </Link>
                  ))}
                </div>
              </li>
              <li className="grid gap-3 border-b border-line py-6 sm:grid-cols-[150px_1fr] sm:gap-6">
                <h4 className="text-[0.85rem] font-semibold text-navy">
                  <span className="mr-2 text-champagne-ink">4</span>Official sources
                </h4>
                <ul className="space-y-2">
                  {path.sources.map((k) => {
                    const s = officialSources[k];
                    return (
                      <li key={k}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 text-[0.93rem] font-medium text-navy hover:underline hover:underline-offset-4">
                          {s.label}
                          <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <span className="block text-[0.78rem] text-muted">{s.publisher}</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ol>

            <p className="mt-6 border-l-2 border-champagne bg-ivory px-4 py-3 text-[0.88rem] leading-relaxed text-charcoal/85">
              This is general educational information. It isn&apos;t legal advice, doesn&apos;t predict outcomes and
              doesn&apos;t recommend a strategy. For advice about your circumstances, speak with a lawyer licensed in
              Ontario.
            </p>
          </section>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col justify-center border border-dashed border-line-strong p-8 sm:p-10">
            <p className="hd-3">Choose the option closest to your situation.</p>
            <p className="mt-2 max-w-md text-[0.95rem] leading-relaxed text-muted">
              You&apos;ll get a short reading path: the concepts worth understanding first, three explainers, the relevant
              guide and links to official Ontario and federal information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
