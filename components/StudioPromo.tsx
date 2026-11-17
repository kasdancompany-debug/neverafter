import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STUDIO_PRICE } from "@/lib/catalog";
import { dayNames, scheduleTemplates } from "@/lib/studio";

/** Static illustration of the Studio's two-week calendar, using a real template. */
function MiniCalendar() {
  const pattern = scheduleTemplates.find((t) => t.id === "2-2-3")!.pattern;
  return (
    <div aria-hidden className="border border-line-strong bg-white p-4 shadow-[0_12px_32px_-18px_rgba(24,43,48,0.35)]">
      <div className="flex items-center justify-between text-[0.72rem] text-muted">
        <span className="font-semibold uppercase tracking-[0.08em] text-navy">2-2-3 rotation</span>
        <span>50% · 50%</span>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.65rem] text-muted">
        {dayNames.map((d) => (
          <span key={d}>{d}</span>
        ))}
        {pattern.map((w, i) => (
          <span key={i} className={`h-8 rounded-[2px] ${w === "A" ? "bg-navy" : "bg-champagne/70"}`} />
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-[0.72rem] text-charcoal/80">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-navy" /> Parent A
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 bg-champagne/70" /> Parent B
        </span>
      </div>
    </div>
  );
}

export function StudioPromo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid items-center gap-10 ${compact ? "lg:grid-cols-[1fr_300px]" : "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20"}`}>
      <div>
        <p className="label">New · Parenting Plan Studio</p>
        <h2 className={`${compact ? "hd-2" : "hd-1"} mt-3`}>Put a parenting proposal on paper — clearly.</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-charcoal/80">
          Choose a schedule, see it on a two-week calendar, then work through holidays, decision-making, communication and
          travel. Your plan stays private on your device. Build it free; export a clean PDF for ${STUDIO_PRICE} CAD.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/parenting-plan-studio" className="btn-primary">
            Start a plan free <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link href="/pricing" className="btn-secondary">
            Pricing
          </Link>
        </div>
      </div>
      <MiniCalendar />
    </div>
  );
}
