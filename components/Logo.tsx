import Link from "next/link";

/** Mark: one line that divides into two and keeps going. */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 18 H 10 C 13 18, 14 10, 21 7" stroke="currentColor" />
      <path d="M10 18 C 13 18, 15 15, 21 15" stroke="#C4AC8A" />
    </svg>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label="Never After — home"
      className={`inline-flex items-center gap-2 whitespace-nowrap ${tone === "dark" ? "text-navy" : "text-paper"}`}
    >
      <LogoMark className="h-6 w-6" />
      <span className="text-[0.95rem] font-semibold tracking-[0.16em]">NEVER AFTER</span>
    </Link>
  );
}
