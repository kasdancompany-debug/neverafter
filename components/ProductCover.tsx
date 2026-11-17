import type { Product } from "@/lib/products";
import { LogoMark } from "./Logo";

/** Flat, typographic cover — the series look of a well-designed publisher. */
export function ProductCover({ product, className = "", compact = false }: { product: Product; className?: string; compact?: boolean }) {
  const { bg, fg, accent } = product.cover;
  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden rounded-[2px] shadow-[0_1px_2px_rgba(24,43,48,0.12),0_12px_28px_-14px_rgba(24,43,48,0.35)] ${className}`}
      style={{ backgroundColor: bg, color: fg }}
      role="img"
      aria-label={`Cover of ${product.title}`}
    >
      {!compact && (
        <div className="absolute inset-0 flex flex-col p-[10%]">
          <div className="flex items-center justify-between text-[0.55rem] font-semibold uppercase tracking-[0.18em] opacity-75">
            <span>Never After</span>
            <span>Ontario</span>
          </div>
          <div className="mt-[14%] h-px w-full" style={{ backgroundColor: fg, opacity: 0.25 }} />
          <p className="mt-[8%] font-serif text-[clamp(1.05rem,2.4vw,1.55rem)] font-medium leading-[1.1]">{product.title}</p>
          <div className="mt-auto flex items-end justify-between">
            <span className="text-[0.55rem] uppercase tracking-[0.16em] opacity-70">Educational guide</span>
            <span style={{ color: accent }}>
              <LogoMark className="h-7 w-7" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
