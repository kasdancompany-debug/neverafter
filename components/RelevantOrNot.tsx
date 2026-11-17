"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Link2 } from "lucide-react";
import { scenarios, type Scenario } from "@/lib/tools";
import { officialSources } from "@/lib/site";

const themes = ["All", "Parenting", "Conduct", "Process", "Finances"] as const;
type Theme = (typeof themes)[number];

function Detail({ s, index, total, onStep }: { s: Scenario; index: number; total: number; onStep: (d: -1 | 1) => void }) {
  const [copied, setCopied] = useState(false);
  const rows: { title: string; body: React.ReactNode }[] = [
    { title: "The legal issue it may raise", body: <p>{s.issue}</p> },
    { title: "Why the circumstances matter", body: <p>{s.whyItMatters}</p> },
    {
      title: "Evidence that may be relevant",
      body: (
        <ul className="list-disc space-y-1 pl-5 marker:text-champagne">
          {s.evidence.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      ),
    },
    { title: "A common misunderstanding", body: <p>{s.misunderstanding}</p> },
    {
      title: "Authoritative sources",
      body: (
        <ul className="space-y-1.5">
          {s.sources.map((k) => {
            const src = officialSources[k];
            return (
              <li key={k}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-1 font-medium text-navy hover:underline hover:underline-offset-4">
                  {src.label}
                  <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span className="block text-[0.78rem] text-muted">{src.publisher}</span>
              </li>
            );
          })}
        </ul>
      ),
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${location.origin}${location.pathname}#${s.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the URL hash is still updated */
    }
  }

  return (
    <div key={s.id} className="anim-fade-up">
      <div className="flex items-center justify-between gap-4 text-[0.8rem] text-muted">
        <span>
          {s.theme} · Scenario {index + 1} of {total}
        </span>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 hover:text-navy">
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Link2 className="h-3.5 w-3.5" aria-hidden />}
          {copied ? "Link copied" : "Copy link"}
        </button>
      </div>
      <h3 className="hd-2 mt-3">{s.title}</h3>
      <dl className="mt-6 border-t border-line">
        {rows.map((r) => (
          <div key={r.title} className="grid gap-1.5 border-b border-line py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
            <dt className="text-[0.85rem] font-semibold text-navy">{r.title}</dt>
            <dd className="text-[0.95rem] leading-relaxed text-charcoal/85">{r.body}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        {s.article ? (
          <Link href={`/articles/${s.article}`} className="text-link text-[0.9rem]">
            Read the related explainer
          </Link>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <button type="button" onClick={() => onStep(-1)} disabled={index === 0} className="btn-secondary !h-9 !px-3 disabled:opacity-40" aria-label="Previous scenario">
            <ArrowLeft className="h-4 w-4" aria-hidden />
          </button>
          <button type="button" onClick={() => onStep(1)} disabled={index === total - 1} className="btn-secondary !h-9 !px-3 disabled:opacity-40" aria-label="Next scenario">
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Two-pane explorer. The list is a keyboard-operable listbox (↑/↓, Home/End);
 * the selected scenario is reflected in the URL hash so it can be shared or bookmarked.
 */
export function RelevantOrNot() {
  const [theme, setTheme] = useState<Theme>("All");
  const [selected, setSelected] = useState(scenarios[0].id);
  const listRef = useRef<HTMLUListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const list = theme === "All" ? scenarios : scenarios.filter((s) => s.theme === theme);
  const current = list.find((s) => s.id === selected) ?? list[0];
  const index = list.indexOf(current);

  useEffect(() => {
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (scenarios.some((s) => s.id === id)) {
        setTheme("All");
        setSelected(id);
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  function select(id: string, opts: { reveal?: boolean; focusOption?: boolean } = {}) {
    setSelected(id);
    history.replaceState(null, "", `#${id}`);
    if (opts.focusOption) listRef.current?.querySelector<HTMLElement>(`[data-id="${id}"]`)?.focus();
    if (opts.reveal && window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: "start" }));
    }
  }

  function onListKey(e: React.KeyboardEvent) {
    const keys: Record<string, number> = { ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: list.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = list[Math.max(0, Math.min(list.length - 1, keys[e.key]))];
    if (next) select(next.id, { focusOption: true });
  }

  return (
    <div>
      <div role="group" aria-label="Filter by theme" className="flex gap-6 overflow-x-auto border-b border-line">
        {themes.map((t) => {
          const count = t === "All" ? scenarios.length : scenarios.filter((s) => s.theme === t).length;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={theme === t}
              onClick={() => {
                setTheme(t);
                const first = (t === "All" ? scenarios : scenarios.filter((s) => s.theme === t))[0];
                if (first && !(t === "All" || current.theme === t)) select(first.id);
              }}
              className={`-mb-px shrink-0 border-b-2 pb-3 text-[0.9rem] font-medium transition-colors ${
                theme === t ? "border-navy text-navy" : "border-transparent text-muted hover:text-navy"
              }`}
            >
              {t} <span className="text-[0.78rem] text-muted">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:gap-14">
        <ul
          ref={listRef}
          role="listbox"
          aria-label="Scenarios"
          onKeyDown={onListKey}
          className="border-t border-line lg:self-start"
        >
          {list.map((s) => {
            const active = s.id === current.id;
            return (
              <li
                key={s.id}
                id={`opt-${s.id}`}
                data-id={s.id}
                role="option"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                onClick={() => select(s.id, { reveal: true })}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(s.id, { reveal: true });
                  }
                }}
                className={`relative cursor-pointer border-b border-line py-3.5 pl-4 pr-2 text-[0.98rem] leading-snug transition-colors ${
                  active ? "bg-ivory font-medium text-navy" : "text-charcoal/80 hover:bg-ivory/60 hover:text-navy"
                }`}
              >
                {active && <span className="absolute inset-y-0 left-0 w-[3px] bg-navy" aria-hidden />}
                {s.title}
              </li>
            );
          })}
        </ul>

        <div ref={panelRef} aria-live="polite" className="scroll-mt-20 lg:sticky lg:top-24 lg:self-start">
          {current && <Detail s={current} index={index} total={list.length} onStep={(d) => select(list[index + d].id)} />}
        </div>
      </div>
    </div>
  );
}
