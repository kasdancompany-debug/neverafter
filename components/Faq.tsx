import { ChevronDown } from "lucide-react";

/** Native <details>: keyboard- and screen-reader-friendly with no client JS. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-[1.2rem] font-medium leading-snug text-navy">{f.q}</span>
            <ChevronDown className="mt-1 h-4 w-4 shrink-0 text-navy transition-transform duration-200 group-open:rotate-180" aria-hidden />
          </summary>
          <p className="max-w-[65ch] pb-6 leading-relaxed text-charcoal/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
