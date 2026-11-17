"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { ArticleSummary } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";

type Sort = "newest" | "shortest";

/** Search + topic filter + sort. State is mirrored to the URL (?q=&topic=) so results are shareable. */
export function ArticleLibrary({ articles, categories }: { articles: ArticleSummary[]; categories: { slug: string; label: string }[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>("newest");

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setQuery(p.get("q") ?? "");
    const t = p.get("topic");
    if (t && categories.some((c) => c.slug === t)) setCategory(t);
  }, [categories]);

  useEffect(() => {
    const url = new URL(location.href);
    query ? url.searchParams.set("q", query) : url.searchParams.delete("q");
    category !== "all" ? url.searchParams.set("topic", category) : url.searchParams.delete("topic");
    history.replaceState(null, "", url);
  }, [query, category]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = articles.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      const hay = `${a.title} ${a.summary} ${a.categoryLabel} ${a.keywords.join(" ")}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
    return [...filtered].sort((a, b) => (sort === "newest" ? b.published.localeCompare(a.published) : a.minutes - b.minutes));
  }, [articles, query, category, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: articles.length };
    for (const a of articles) c[a.category] = (c[a.category] ?? 0) + 1;
    return c;
  }, [articles]);

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
          <label htmlFor="article-search" className="sr-only">
            Search articles
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="article-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="field !pl-9 !pr-9 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-navy">
              <X className="h-4 w-4" aria-hidden />
            </button>
          )}
        </form>

        <nav aria-label="Filter by topic" className="mt-6">
          <p className="mb-2 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">Topics</p>
          <ul className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-0.5 lg:overflow-visible">
            {[{ slug: "all", label: "All topics" }, ...categories].map((c) => {
              const on = category === c.slug;
              return (
                <li key={c.slug} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setCategory(c.slug)}
                    className={`flex w-full items-center justify-between gap-3 whitespace-nowrap rounded-[3px] border px-3 py-1.5 text-left text-[0.88rem] transition-colors lg:border-0 lg:px-2 ${
                      on ? "border-navy bg-navy text-paper lg:bg-ivory lg:font-semibold lg:text-navy" : "border-line text-charcoal/80 hover:text-navy"
                    }`}
                  >
                    {c.label}
                    <span className={`text-[0.75rem] ${on ? "opacity-70" : "text-muted"}`}>{counts[c.slug] ?? 0}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
          <p className="text-[0.88rem] text-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "article" : "articles"}
            {category !== "all" && ` in ${categories.find((c) => c.slug === category)?.label}`}
            {query && ` matching “${query}”`}
          </p>
          <label className="flex items-center gap-2 text-[0.85rem] text-muted">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-[3px] border border-line bg-paper px-2 py-1 text-navy">
              <option value="newest">Newest</option>
              <option value="shortest">Shortest read</option>
            </select>
          </label>
        </div>

        {results.length ? (
          <ul className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {results.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 border border-dashed border-line-strong px-6 py-14 text-center">
            <p className="hd-3">No articles match that search.</p>
            <p className="mx-auto mt-2 max-w-sm text-[0.92rem] text-muted">Try a broader term or another topic. New explainers are added regularly.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="btn-secondary mt-5"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
