import Image from "next/image";
import Link from "next/link";
import logoDark from "@/public/brand/never-after-logo.png";
import logoLight from "@/public/brand/never-after-logo-light.png";

/**
 * Emblem only (sun over a road meeting the horizon) — for small placements such as guide covers.
 * The sun stays gold; the horizon and road take the current text colour.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="4 18 56 38" className={className} aria-hidden fill="none">
      <path d="M17 35 A15 15 0 0 1 47 35" stroke="#C2953F" strokeWidth="3.6" strokeLinecap="round" />
      <path d="M5 39 Q20 35.2 30 35.6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M40 35.8 Q50 36.2 59 39" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M30 35.4 C 40 35.6, 44 38.5, 37 42 C 31 45, 22 47.5, 15 53 L 25 53 C 31 49, 41 46.5, 45.5 42.5 C 50 38.5, 44 35.6, 36 35.4 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

/** Full Never After logo. `light` is the version for dark backgrounds (footer). */
export function Logo({ tone = "dark", height = 46, priority = false }: { tone?: "dark" | "light"; height?: number; priority?: boolean }) {
  const src = tone === "dark" ? logoDark : logoLight;
  return (
    <Link href="/" aria-label="Never After — home" className="inline-flex shrink-0 items-center">
      <Image
        src={src}
        alt="Never After"
        height={height}
        style={{ height, width: "auto" }}
        priority={priority}
        sizes={`${Math.round((height * src.width) / src.height)}px`}
      />
    </Link>
  );
}
