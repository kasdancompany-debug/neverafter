"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Download, Eye, Lock, Printer, RotateCcw, Upload } from "lucide-react";
import {
  type Plan,
  type Who,
  STORAGE_KEY,
  dayNames,
  decisionAreas,
  decisionOptions,
  defaultPlan,
  disputeOptions,
  holidayList,
  holidayOptions,
  name,
  scheduleTemplates,
  share,
} from "@/lib/studio";
import { CheckoutButton } from "../CheckoutButton";
import { PlanDocument } from "./PlanDocument";

const steps = [
  "About this plan",
  "Regular schedule",
  "Exchanges",
  "Holidays",
  "Decision-making",
  "Communication",
  "Travel & relocation",
  "Disagreements & review",
  "Preview & export",
] as const;

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[0.88rem] font-semibold text-navy">{label}</span>
      {hint && <span className="mt-0.5 block text-[0.8rem] text-muted">{hint}</span>}
      <span className="mt-1.5 block">{children}</span>
    </label>
  );
}

function Choice<T extends string>({
  value,
  options,
  onChange,
  name: groupName,
}: {
  value: T;
  options: readonly { id: T; label: string }[];
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" className="grid gap-2 sm:grid-cols-2">
      {options.map((o) => (
        <label
          key={o.id}
          className={`flex cursor-pointer items-center gap-2.5 rounded-[3px] border px-3 py-2.5 text-[0.9rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-navy ${
            value === o.id ? "border-navy bg-ivory text-navy" : "border-line text-charcoal/85 hover:border-line-strong"
          }`}
        >
          <input type="radio" name={groupName} className="sr-only" checked={value === o.id} onChange={() => onChange(o.id)} />
          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${value === o.id ? "border-navy bg-navy" : "border-line-strong"}`}>
            {value === o.id && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
          </span>
          {o.label}
        </label>
      ))}
    </div>
  );
}

export function Studio({ unlocked, configured }: { unlocked: boolean; configured: boolean }) {
  const [plan, setPlan] = useState<Plan>(defaultPlan);
  const [step, setStep] = useState(0);
  const [remember, setRemember] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Restore a saved draft (this device only).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === "off") setRemember(false);
      else if (raw) setPlan({ ...defaultPlan(), ...(JSON.parse(raw) as Partial<Plan>) });
    } catch {
      /* storage unavailable */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, remember ? JSON.stringify(plan) : "off");
    } catch {
      /* storage unavailable */
    }
  }, [plan, remember, loaded]);

  const set = <K extends keyof Plan>(k: K, v: Plan[K]) => setPlan((p) => ({ ...p, [k]: v }));
  const A = name(plan, "A");
  const B = name(plan, "B");
  const s = share(plan.pattern);

  function go(i: number) {
    setStep(Math.max(0, Math.min(steps.length - 1, i)));
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: "start", behavior: "smooth" }));
  }

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(null), 2500);
  }

  function printPlan() {
    if (!unlocked) return;
    document.body.classList.add("printing-plan");
    window.print();
    setTimeout(() => document.body.classList.remove("printing-plan"), 500);
  }

  function downloadBackup() {
    if (!unlocked) return;
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "parenting-plan-draft.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function importBackup(file: File) {
    try {
      const data = JSON.parse(await file.text()) as Partial<Plan>;
      if (data.version !== 1 || !Array.isArray(data.pattern) || data.pattern.length !== 14) throw new Error();
      setPlan({ ...defaultPlan(), ...data });
      flash("Draft imported.");
    } catch {
      flash("That file isn't a Parenting Plan Studio draft.");
    }
  }

  function reset() {
    if (!confirm("Clear this draft and start again? This can't be undone.")) return;
    setPlan(defaultPlan());
    go(0);
  }

  const Lockable = ({ children }: { children: React.ReactNode }) => (unlocked ? <>{children}</> : null);

  return (
    <div className={`grid gap-10 lg:grid-cols-[230px_minmax(0,1fr)] lg:gap-14 ${unlocked ? "" : "studio-locked"}`}>
      {/* Stepper */}
      <nav aria-label="Plan sections" className="no-print lg:sticky lg:top-24 lg:self-start">
        <ol className="flex gap-1.5 overflow-x-auto pb-2 lg:block lg:space-y-0.5 lg:overflow-visible lg:border-l lg:border-line lg:pb-0">
          {steps.map((label, i) => (
            <li key={label} className="shrink-0">
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={step === i ? "step" : undefined}
                className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-[3px] border px-3 py-1.5 text-left text-[0.86rem] transition-colors lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:py-2 ${
                  step === i
                    ? "border-navy bg-navy text-paper lg:border-navy lg:bg-transparent lg:font-semibold lg:text-navy"
                    : "border-line text-muted hover:text-navy lg:border-transparent"
                }`}
              >
                <span className="tabular-nums text-[0.75rem] opacity-70">{i + 1}</span>
                {label}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-6 hidden space-y-3 border-t border-line pt-5 text-[0.8rem] text-muted lg:block">
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mt-0.5 accent-[#182B30]" />
            <span>Save this draft on this device</span>
          </label>
          <p className="leading-relaxed">Your plan never leaves your browser. We don&apos;t see or store it.</p>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 hover:text-navy">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Start over
          </button>
        </div>
      </nav>

      <div ref={panelRef} className="min-w-0 scroll-mt-24">
        <div className="no-print mb-6 flex items-center justify-between gap-4 border-b border-line pb-3">
          <p className="text-[0.82rem] text-muted">
            Step {step + 1} of {steps.length}
          </p>
          {step < steps.length - 1 && (
            <button type="button" onClick={() => go(steps.length - 1)} className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-navy hover:underline hover:underline-offset-4">
              <Eye className="h-4 w-4" aria-hidden /> Preview document
            </button>
          )}
        </div>

        <h2 className="hd-2 no-print">{steps[step]}</h2>

        <div key={step} className="anim-fade-up no-print mt-6 max-w-[720px] space-y-7">
          {step === 0 && (
            <>
              <p className="leading-relaxed text-charcoal/85">
                This studio helps you organize a parenting proposal clearly — to discuss with the other parent, a mediator
                or a lawyer. You can use labels instead of names. Nothing you type is sent to us.
              </p>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="First parent" hint="A first name, or keep “Parent A”">
                  <input className="field" value={plan.parentA} onChange={(e) => set("parentA", e.target.value)} maxLength={40} />
                </Field>
                <Field label="Second parent" hint="A first name, or keep “Parent B”">
                  <input className="field" value={plan.parentB} onChange={(e) => set("parentB", e.target.value)} maxLength={40} />
                </Field>
              </div>
              <Field label="How should the children be referred to?" hint="Optional — e.g. first names, initials, or leave blank for “the children”">
                <input className="field" value={plan.children} onChange={(e) => set("children", e.target.value)} maxLength={80} placeholder="the children" />
              </Field>
              <p className="border-l-2 border-champagne bg-ivory px-4 py-3 text-[0.88rem] leading-relaxed">
                <strong className="font-semibold text-navy">If there are safety concerns</strong> — including family
                violence — a standard parenting plan may not be appropriate. Please get legal advice. In an emergency, call
                911.
              </p>
            </>
          )}

          {step === 1 && (
            <>
              <Field label="Start from a common schedule">
                <div className="grid gap-2 sm:grid-cols-2">
                  {scheduleTemplates.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={plan.templateId === t.id}
                      onClick={() => setPlan((p) => ({ ...p, templateId: t.id, pattern: t.id === "custom" ? p.pattern : [...t.pattern] }))}
                      className={`rounded-[3px] border px-3 py-2.5 text-left transition-colors ${
                        plan.templateId === t.id ? "border-navy bg-ivory" : "border-line hover:border-line-strong"
                      }`}
                    >
                      <span className="block text-[0.92rem] font-semibold text-navy">{t.name}</span>
                      <span className="block text-[0.8rem] text-muted">{t.summary}</span>
                    </button>
                  ))}
                </div>
              </Field>

              <div>
                <p className="text-[0.88rem] font-semibold text-navy">Two-week calendar</p>
                <p className="mt-0.5 text-[0.8rem] text-muted">Select any day to switch it between parents.</p>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full min-w-[480px] border-collapse text-center text-[0.8rem]">
                    <thead>
                      <tr>
                        <th className="w-16" />
                        {dayNames.map((d) => (
                          <th key={d} className="pb-1.5 font-medium text-muted">
                            {d}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[0, 1].map((w) => (
                        <tr key={w}>
                          <th className="pr-2 text-left font-medium text-muted">Week {w + 1}</th>
                          {plan.pattern.slice(w * 7, w * 7 + 7).map((who, d) => {
                            const i = w * 7 + d;
                            return (
                              <td key={i} className="p-0.5">
                                <button
                                  type="button"
                                  aria-label={`Week ${w + 1} ${dayNames[d]}: ${name(plan, who)}. Switch parent.`}
                                  onClick={() =>
                                    setPlan((p) => {
                                      const pattern = [...p.pattern];
                                      pattern[i] = pattern[i] === "A" ? "B" : "A";
                                      return { ...p, pattern, templateId: "custom" };
                                    })
                                  }
                                  className={`h-12 w-full rounded-[3px] text-[0.78rem] font-semibold transition-colors ${
                                    who === "A" ? "bg-navy text-paper hover:bg-navy-soft" : "bg-champagne/70 text-navy hover:bg-champagne"
                                  }`}
                                >
                                  {(who === "A" ? A : B).slice(0, 8)}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4" aria-live="polite">
                  <div className="flex h-2 overflow-hidden rounded-[2px]" aria-hidden>
                    <div className="bg-navy" style={{ width: `${s.pctA}%` }} />
                    <div className="bg-champagne/70" style={{ width: `${s.pctB}%` }} />
                  </div>
                  <p className="mt-2 text-[0.85rem] text-charcoal/85">
                    {A}: {s.a} days ({s.pctA}%) · {B}: {s.b} days ({s.pctB}%) over two weeks
                  </p>
                  {Math.min(s.pctA, s.pctB) >= 40 && (
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">
                      Each parent has at least 40% of the regular schedule. For child support, a 40% threshold (measured over
                      a year, including holidays) can change how support is calculated —{" "}
                      <Link href="/articles/how-child-support-is-calculated-in-ontario" className="underline underline-offset-2">
                        see our explainer
                      </Link>
                      .
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Field label="When do exchanges happen?">
                <input className="field" value={plan.exchangeTime} onChange={(e) => set("exchangeTime", e.target.value)} />
              </Field>
              <Field label="Where do exchanges happen?" hint="Schools and neutral public places can reduce direct contact when communication is difficult.">
                <input className="field" value={plan.exchangeLocation} onChange={(e) => set("exchangeLocation", e.target.value)} />
              </Field>
              <Field label="Who is responsible for transportation?">
                <Choice
                  name="transport"
                  value={plan.transport}
                  onChange={(v) => set("transport", v)}
                  options={[
                    { id: "receiving", label: "The receiving parent picks up" },
                    { id: "dropping", label: "The parent ending their time drops off" },
                    { id: "alternate", label: "Alternate" },
                    { id: "tbd", label: "To be discussed" },
                  ]}
                />
              </Field>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-[0.9rem] leading-relaxed text-charcoal/80">Holidays and special days usually take priority over the regular schedule.</p>
              <div className="border-t border-line">
                {holidayList.map((h) => (
                  <div key={h} className="grid gap-2 border-b border-line py-3 sm:grid-cols-[1fr_260px] sm:items-center">
                    <label htmlFor={`h-${h}`} className="text-[0.92rem] text-navy">
                      {h}
                    </label>
                    <select
                      id={`h-${h}`}
                      className="field !h-10"
                      value={plan.holidays[h]}
                      onChange={(e) => set("holidays", { ...plan.holidays, [h]: e.target.value })}
                    >
                      {holidayOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          {o.label.replace("Parent A", A).replace("Parent B", B)}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              <Field label="Holiday details" hint="Optional — e.g. which years, start and end times, how summer weeks are chosen">
                <textarea className="field !h-auto py-3" rows={4} value={plan.holidayNotes} onChange={(e) => set("holidayNotes", e.target.value)} />
              </Field>
            </>
          )}

          {step === 4 && (
            <>
              <p className="text-[0.9rem] leading-relaxed text-charcoal/80">
                Decision-making responsibility covers significant decisions about a child&apos;s well-being.{" "}
                <Link href="/parenting" className="underline underline-offset-2">
                  Learn how it works
                </Link>
                .
              </p>
              {decisionAreas.map((d) => (
                <Field key={d.id} label={d.label}>
                  <Choice
                    name={`dec-${d.id}`}
                    value={plan.decisions[d.id]}
                    onChange={(v) => set("decisions", { ...plan.decisions, [d.id]: v })}
                    options={decisionOptions.map((o) => ({ id: o.id, label: o.label.replace("Parent A", A).replace("Parent B", B) }))}
                  />
                </Field>
              ))}
              <label className="flex items-start gap-2.5 text-[0.92rem]">
                <input type="checkbox" checked={plan.dayToDay} onChange={(e) => set("dayToDay", e.target.checked)} className="mt-1 accent-[#182B30]" />
                Each parent makes day-to-day decisions during their own parenting time.
              </label>
            </>
          )}

          {step === 5 && (
            <>
              <Field label="Main way of communicating">
                <Choice
                  name="comm"
                  value={plan.commMethod}
                  onChange={(v) => set("commMethod", v)}
                  options={[
                    { id: "app", label: "Co-parenting app" },
                    { id: "email", label: "Email" },
                    { id: "text", label: "Text message" },
                    { id: "mixed", label: "Email for planning, text for logistics" },
                  ]}
                />
              </Field>
              <Field label="Reply to non-urgent messages within">
                <select className="field !h-10 max-w-[220px]" value={plan.responseHours} onChange={(e) => set("responseHours", Number(e.target.value))}>
                  {[24, 48, 72].map((h) => (
                    <option key={h} value={h}>
                      {h} hours
                    </option>
                  ))}
                </select>
              </Field>
              <label className="flex items-start gap-2.5 text-[0.92rem]">
                <input type="checkbox" checked={plan.infoSharing} onChange={(e) => set("infoSharing", e.target.checked)} className="mt-1 accent-[#182B30]" />
                Both parents can get information directly from schools and health-care providers, and share important information promptly.
              </label>
              <label className="flex items-start gap-2.5 text-[0.92rem]">
                <input type="checkbox" checked={plan.noDisparaging} onChange={(e) => set("noDisparaging", e.target.checked)} className="mt-1 accent-[#182B30]" />
                Neither parent speaks negatively about the other in front of the children or uses them to carry messages.
              </label>
              <p className="text-[0.85rem] text-muted">
                Communication is difficult?{" "}
                <Link href="/articles/child-focused-communication-in-high-conflict-separation" className="underline underline-offset-2">
                  Read our guide to child-focused messages
                </Link>
                .
              </p>
            </>
          )}

          {step === 6 && (
            <>
              <Field label="Notice for out-of-province travel">
                <select className="field !h-10 max-w-[220px]" value={plan.travelNoticeDays} onChange={(e) => set("travelNoticeDays", Number(e.target.value))}>
                  {[14, 30, 45, 60].map((d) => (
                    <option key={d} value={d}>
                      {d} days
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Who keeps the children's passports?">
                <Choice
                  name="passports"
                  value={plan.passportsWith}
                  onChange={(v) => set("passportsWith", v)}
                  options={[
                    { id: "A", label: A },
                    { id: "B", label: B },
                    { id: "alternate", label: "The travelling parent, returned after" },
                    { id: "tbd", label: "To be discussed" },
                  ]}
                />
              </Field>
              <label className="flex items-start gap-2.5 text-[0.92rem]">
                <input type="checkbox" checked={plan.relocationNotice} onChange={(e) => set("relocationNotice", e.target.checked)} className="mt-1 accent-[#182B30]" />
                Any proposed relocation follows the notice rules in the applicable law, with legal advice first.
              </label>
              <p className="text-[0.85rem] leading-relaxed text-muted">
                Federal and Ontario law include specific relocation notice requirements. They are time-sensitive — get legal
                advice before a move.
              </p>
            </>
          )}

          {step === 7 && (
            <>
              <fieldset>
                <legend className="text-[0.88rem] font-semibold text-navy">If you disagree, the steps are…</legend>
                <p className="mt-0.5 text-[0.8rem] text-muted">Select in the order you&apos;d use them.</p>
                <div className="mt-3 space-y-2">
                  {disputeOptions.map((d) => {
                    const idx = plan.disputeSteps.indexOf(d);
                    return (
                      <label key={d} className={`flex cursor-pointer items-center gap-3 rounded-[3px] border px-3 py-2.5 text-[0.92rem] ${idx >= 0 ? "border-navy bg-ivory" : "border-line"}`}>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={idx >= 0}
                          onChange={() =>
                            set("disputeSteps", idx >= 0 ? plan.disputeSteps.filter((x) => x !== d) : [...plan.disputeSteps, d])
                          }
                        />
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] text-[0.75rem] font-semibold ${idx >= 0 ? "bg-navy text-paper" : "border border-line-strong"}`}>
                          {idx >= 0 ? idx + 1 : ""}
                        </span>
                        {d}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <Field label="Review the plan every">
                <select className="field !h-10 max-w-[220px]" value={plan.reviewMonths} onChange={(e) => set("reviewMonths", Number(e.target.value))}>
                  {[6, 12, 24].map((m) => (
                    <option key={m} value={m}>
                      {m} months
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Anything else to include?" hint="Optional — e.g. school-age changes, phone/video contact, introducing new partners">
                <textarea className="field !h-auto py-3" rows={5} value={plan.extraNotes} onChange={(e) => set("extraNotes", e.target.value)} />
              </Field>
            </>
          )}
        </div>

        {step === steps.length - 1 && (
          <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div className="relative overflow-hidden border border-line-strong shadow-[0_12px_32px_-18px_rgba(24,43,48,0.35)]">
              {!unlocked && (
                <div aria-hidden className="no-print pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                  <span className="-rotate-12 select-none font-sans text-[5rem] font-semibold tracking-[0.2em] text-navy/[0.06]">PREVIEW</span>
                </div>
              )}
              <PlanDocument plan={plan} />
            </div>

            <aside className="no-print space-y-5 xl:sticky xl:top-24 xl:self-start">
              {unlocked ? (
                <div className="border-t-2 border-navy pt-4">
                  <p className="flex items-center gap-2 font-semibold text-navy">
                    <Check className="h-4 w-4 text-sage-ink" aria-hidden /> Export unlocked
                  </p>
                  <div className="mt-4 grid gap-2">
                    <button type="button" onClick={printPlan} className="btn-primary">
                      <Printer className="h-4 w-4" aria-hidden /> Print or save as PDF
                    </button>
                    <button type="button" onClick={downloadBackup} className="btn-secondary">
                      <Download className="h-4 w-4" aria-hidden /> Download draft file
                    </button>
                    <button type="button" onClick={() => fileRef.current?.click()} className="btn-secondary">
                      <Upload className="h-4 w-4" aria-hidden /> Import draft file
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="application/json,.json"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && importBackup(e.target.files[0])}
                    />
                  </div>
                  <p className="mt-3 text-[0.78rem] leading-relaxed text-muted">
                    Draft files let you continue on another device or share a draft with your lawyer or mediator.
                  </p>
                </div>
              ) : (
                <div className="border-t-2 border-navy pt-4">
                  <p className="flex items-center gap-2 font-semibold text-navy">
                    <Lock className="h-4 w-4" aria-hidden /> Export your plan
                  </p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-charcoal/85">
                    Building and previewing is free. Unlock printing, PDF export and draft files with a one-time payment.
                  </p>
                  <div className="mt-4">
                    <CheckoutButton item="studio" label="Unlock export" title="Parenting Plan Studio" configured={configured} />
                  </div>
                  <p className="mt-4 text-[0.82rem] text-muted">
                    Or get it with{" "}
                    <Link href="/pricing" className="underline underline-offset-2">
                      Never After Plus
                    </Link>
                    . Already purchased?{" "}
                    <Link href="/access" className="underline underline-offset-2">
                      Restore access
                    </Link>
                    .
                  </p>
                </div>
              )}
              <p className="border-l-2 border-champagne bg-ivory px-4 py-3 text-[0.8rem] leading-relaxed text-charcoal/85">
                This is a draft for discussion, not a legal document. To be binding it would generally need to form part of a
                properly executed agreement or a court order. Have it reviewed by an Ontario lawyer.
              </p>
            </aside>
          </div>
        )}

        <div className="no-print mt-10 flex items-center justify-between gap-4 border-t border-line pt-5">
          <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn-secondary disabled:opacity-40">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back
          </button>
          <span aria-live="polite" className="text-[0.82rem] text-muted">
            {notice ?? (remember ? "Saved on this device" : "Not saved")}
          </span>
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => go(step + 1)} className="btn-primary">
              Next <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <Lockable>
              <button type="button" onClick={printPlan} className="btn-primary">
                <Printer className="h-4 w-4" aria-hidden /> Print / PDF
              </button>
            </Lockable>
          )}
          {step === steps.length - 1 && !unlocked && <span />}
        </div>

        <div className="no-print mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem] text-muted lg:hidden">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-[#182B30]" />
            Save on this device
          </label>
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Start over
          </button>
        </div>
      </div>
    </div>
  );
}
