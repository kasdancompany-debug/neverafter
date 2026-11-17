"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { matters, notDecisive, type MattersItem } from "@/lib/tools";

function Row({ item, id, open, onToggle }: { item: MattersItem; id: string; open: boolean; onToggle: () => void }) {
  return (
    <li className="border-b border-line">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="font-serif text-[1.2rem] font-medium leading-snug text-navy">{item.title}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-navy transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      </h4>
      <div id={id} hidden={!open} className="anim-fade-up pb-5 text-[0.95rem] leading-relaxed text-charcoal/85">
        <p>{item.why}</p>
        <p className="mt-3 text-charcoal/70">
          <span className="font-semibold text-navy">The nuance: </span>
          {item.nuance}
        </p>
      </div>
    </li>
  );
}

function Column({
  title,
  marker,
  items,
  prefix,
  open,
  toggle,
}: {
  title: string;
  marker: "solid" | "outline";
  items: MattersItem[];
  prefix: string;
  open: Set<string>;
  toggle: (id: string) => void;
}) {
  return (
    <section aria-labelledby={`${prefix}-h`}>
      <h3 id={`${prefix}-h`} className="flex items-center gap-2.5 border-b-2 border-navy pb-3 text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-navy">
        <span className={`h-2.5 w-2.5 ${marker === "solid" ? "bg-navy" : "border-[1.5px] border-navy"}`} aria-hidden />
        {title}
      </h3>
      <ul>
        {items.map((m, i) => {
          const id = `${prefix}-${i}`;
          return <Row key={id} id={id} item={m} open={open.has(id)} onToggle={() => toggle(id)} />;
        })}
      </ul>
    </section>
  );
}

export function WhatMatters() {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const total = matters.length + notDecisive.length;
  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  const allOpen = open.size === total;

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() =>
            setOpen(allOpen ? new Set() : new Set([...matters.map((_, i) => `wm-a-${i}`), ...notDecisive.map((_, i) => `wm-b-${i}`)]))
          }
          className="text-[0.85rem] font-semibold text-navy underline decoration-line-strong underline-offset-4 hover:decoration-navy"
        >
          {allOpen ? "Collapse all" : "Expand all explanations"}
        </button>
      </div>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Column title="Matters" marker="solid" items={matters} prefix="wm-a" open={open} toggle={toggle} />
        <Column title="Doesn't automatically decide the outcome" marker="outline" items={notDecisive} prefix="wm-b" open={open} toggle={toggle} />
      </div>
      <p className="mt-8 max-w-3xl text-[0.85rem] leading-relaxed text-muted">
        General principles, not rules that decide any case. How much a fact matters depends on the circumstances, the
        evidence and the applicable law.
      </p>
    </div>
  );
}
