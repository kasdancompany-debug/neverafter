"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CornerDownLeft, FileText, Compass, BookOpen, Package, Search, X } from "lucide-react";
import type { SearchItem } from "@/lib/search";

const kindIcon = { Article: FileText, Guide: BookOpen, Tool: Compass, Resource: Package, Page: FileText } as const;
const suggestions = ["50/50 parenting", "child support", "settlement conference", "Children's Lawyer", "evidence"];

function score(item: SearchItem, terms: string[]) {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.description} ${item.terms}`.toLowerCase();
  let s = 0;
  for (const t of terms) {
    if (!hay.includes(t)) return 0;
    s += title.includes(t) ? 3 : 1;
    if (title.startsWith(t)) s += 2;
  }
  return s + (item.kind === "Guide" ? 0.5 : 0);
}

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 ? (
          <mark key={i} className="bg-[#efe3cf] text-inherit">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Site-wide search. Opens with ⌘K / Ctrl+K or "/". Fully keyboard-operable combobox. */
export function SearchPalette({ index, open, onClose }: { index: SearchItem[]; open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    if (!terms.length) return index.filter((i) => i.kind === "Guide" || i.kind === "Tool");
    return index
      .map((item) => ({ item, s: score(item, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, index]);

  useEffect(() => {
    if (!open) return;
    setQ("");
    setActive(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  function go(item: SearchItem | undefined) {
    if (!item) return;
    onClose();
    router.push(item.href);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    } else if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Tab") {
      e.preventDefault(); // keep focus in the dialog; arrows move through results
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[10vh]" role="presentation">
      <div className="anim-fade absolute inset-0 bg-navy/35 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search Never After"
        className="anim-scale relative w-full max-w-[640px] overflow-hidden rounded-[6px] border border-line-strong bg-paper shadow-[0_24px_80px_-20px_rgba(24,43,48,0.45)]"
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-4 w-4 shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search guides, articles and tools"
            className="h-14 flex-1 bg-transparent text-[1rem] outline-none placeholder:text-muted/70"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `sr-${active}` : undefined}
            aria-autocomplete="list"
          />
          <button type="button" onClick={onClose} className="rounded-[3px] p-1.5 text-muted hover:bg-ivory hover:text-navy" aria-label="Close search">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {!terms.length && (
          <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-3">
            <span className="text-xs text-muted">Try</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQ(s)}
                className="rounded-[3px] border border-line px-2 py-1 text-xs text-navy hover:border-navy"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <ul ref={listRef} id="search-results" role="listbox" aria-label="Results" className="max-h-[52vh] overflow-y-auto py-2">
          {!terms.length && <li className="px-4 pb-1 pt-2 text-xs font-semibold text-muted">Guides & tools</li>}
          {results.map((r, i) => {
            const Icon = kindIcon[r.kind];
            return (
              <li
                key={r.href}
                id={`sr-${i}`}
                data-i={i}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => go(r)}
                className={`mx-2 flex cursor-pointer items-start gap-3 rounded-[4px] px-3 py-2.5 ${i === active ? "bg-ivory" : ""}`}
              >
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-champagne-ink" aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.95rem] font-medium text-navy">
                    <Highlight text={r.title} terms={terms} />
                  </span>
                  <span className="block truncate text-[0.82rem] text-muted">{r.meta ?? r.description}</span>
                </span>
                <span className="shrink-0 pt-0.5 text-[0.7rem] font-medium text-muted">{r.kind}</span>
                {i === active && <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />}
              </li>
            );
          })}
          {terms.length > 0 && results.length === 0 && (
            <li className="px-5 py-10 text-center text-sm text-muted">
              No results for “{q}”. Try a broader term, such as “parenting” or “support”.
            </li>
          )}
        </ul>

        <div className="hidden items-center gap-4 border-t border-line bg-ivory/60 px-4 py-2.5 text-[0.72rem] text-muted sm:flex">
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-line-strong bg-paper px-1">↑</kbd>
            <kbd className="rounded border border-line-strong bg-paper px-1">↓</kbd> to navigate
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-line-strong bg-paper px-1">
              <CornerDownLeft className="inline h-3 w-3" aria-hidden />
            </kbd>{" "}
            to open
          </span>
          <span className="inline-flex items-center gap-1">
            <kbd className="rounded border border-line-strong bg-paper px-1">esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
