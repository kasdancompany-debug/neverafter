import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function LegalNote({ className = "" }: { className?: string }) {
  return (
    <aside className={`border-l-2 border-champagne bg-ivory px-5 py-4 text-[0.9rem] leading-relaxed text-charcoal/85 ${className}`}>
      <strong className="font-semibold text-navy">General information, not legal advice.</strong> {site.disclaimer} For
      advice about your circumstances, consult a lawyer licensed in Ontario.
    </aside>
  );
}

export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <p className="border border-dashed border-line-strong px-4 py-3 text-[0.8rem] leading-relaxed text-charcoal/80">
      <strong className="mr-1.5 font-semibold text-champagne-ink">Editorial draft.</strong>
      {children}
    </p>
  );
}
