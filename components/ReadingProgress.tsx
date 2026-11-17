"use client";

import { useEffect, useState } from "react";

/** Thin progress rule under the header, tracking how far through the article body the reader is. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setP(Math.min(1, Math.max(0, (-r.top + 80) / Math.max(total, 1))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div className="no-print fixed inset-x-0 top-16 z-40 h-[2px]" aria-hidden>
      <div className="h-full origin-left bg-champagne-ink" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
