"use client";

import { useEffect, useState } from "react";

/** Sticky in-page navigation that highlights the section currently being read. */
export function OnThisPage({ items, title = "On this page" }: { items: { id: string; label: string }[]; title?: string }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={title}>
      <p className="mb-3 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">{title}</p>
      <ol className="border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-4 text-[0.88rem] leading-snug transition-colors ${
                active === i.id ? "border-navy font-medium text-navy" : "border-transparent text-muted hover:text-navy"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
