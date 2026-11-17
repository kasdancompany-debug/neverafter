import { ArrowUpRight } from "lucide-react";
import type { Source } from "@/lib/site";

export function SourceList({ sources, heading = "Official sources", note = true }: { sources: Source[]; heading?: string; note?: boolean }) {
  return (
    <div>
      <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">{heading}</h2>
      <ul className="mt-3 border-t border-line">
        {sources.map((s) => (
          <li key={s.url} className="border-b border-line">
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 py-3">
              <span className="flex-1">
                <span className="block text-[0.93rem] font-medium leading-snug text-navy group-hover:underline group-hover:underline-offset-4">
                  {s.label}
                </span>
                <span className="block text-[0.78rem] text-muted">{s.publisher}</span>
              </span>
              <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted group-hover:text-navy" aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      {note && <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">Laws change. Always check the current version at the source.</p>}
    </div>
  );
}
