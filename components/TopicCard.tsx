import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Topic } from "@/lib/topics";

/** Topics as a ruled grid of links — reads like a table of contents, not a set of tiles. */
export function TopicGrid({ items, counts }: { items: Topic[]; counts?: Record<string, number> }) {
  return (
    <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t) => (
        <li key={t.slug} className="border-b border-r border-line">
          <Link href={t.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-ivory sm:p-7">
            <span className="flex items-start justify-between gap-4">
              <span className="font-serif text-[1.4rem] font-medium leading-tight text-navy">{t.title}</span>
              <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-navy/40 transition group-hover:translate-x-0.5 group-hover:text-navy" aria-hidden />
            </span>
            <span className="mt-2 text-[0.92rem] leading-relaxed text-charcoal/75">{t.cardSummary}</span>
            {counts && (
              <span className="mt-auto pt-5 text-[0.78rem] text-muted">
                {counts[t.slug] ?? 0} {counts[t.slug] === 1 ? "article" : "articles"} · {t.faqs.length} common questions
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
