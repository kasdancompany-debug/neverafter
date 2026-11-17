import {
  type Plan,
  decisionAreas,
  decisionOptions,
  describePattern,
  holidayOptions,
  name,
  share,
} from "@/lib/studio";

const transportText: Record<Plan["transport"], string> = {
  receiving: "The parent receiving the children is responsible for pick-up.",
  dropping: "The parent whose time is ending is responsible for drop-off.",
  alternate: "Transportation responsibility alternates between the parents.",
  tbd: "Transportation arrangements are to be discussed.",
};

const commText: Record<Plan["commMethod"], string> = {
  app: "a co-parenting app agreed on by both parents",
  email: "email",
  text: "text message",
  mixed: "email for planning and text message for same-day logistics",
};

function H({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-7 border-b border-line pb-1.5 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-navy">{children}</h3>;
}

/** The plan as a readable document. Used for on-screen preview and for printing / Save as PDF. */
export function PlanDocument({ plan }: { plan: Plan }) {
  const s = share(plan.pattern);
  const A = name(plan, "A");
  const B = name(plan, "B");
  const kids = plan.children.trim() || "the children";
  const opt = (list: readonly { id: string; label: string }[], id: string) =>
    (list.find((o) => o.id === id)?.label ?? id).replace("Parent A", A).replace("Parent B", B);
  const today = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });

  return (
    <article className="plan-doc bg-white px-7 py-9 font-serif text-[0.98rem] leading-[1.6] text-charcoal sm:px-12 sm:py-12">
      <header className="border-b-2 border-navy pb-4">
        <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted">Draft proposal for discussion</p>
        <h2 className="mt-1 text-[1.9rem] font-medium leading-tight text-navy">Parenting Plan</h2>
        <p className="mt-1 font-sans text-[0.82rem] text-muted">
          {A} and {B} · Prepared {today}
        </p>
      </header>

      <H>1. Purpose</H>
      <p className="mt-2">
        This plan sets out a proposed arrangement for the care of {kids}. It is intended to support {kids}&apos;s
        stability and well-being and to reduce conflict between the parents. Decisions under this plan are to be made in{" "}
        {kids}&apos;s best interests.
      </p>

      <H>2. Regular parenting schedule</H>
      <p className="mt-2">The regular schedule repeats every two weeks, starting on a Monday:</p>
      <ul className="mt-2 list-disc pl-5">
        {describePattern(plan).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <p className="mt-2">
        Over the two-week cycle, {kids} would spend {s.a} days with {A} and {s.b} days with {B} ({s.pctA}% / {s.pctB}%),
        before holidays and special days are taken into account.
      </p>

      <H>3. Exchanges</H>
      <p className="mt-2">
        Exchanges take place {plan.exchangeTime || "at a time to be agreed"}, at {plan.exchangeLocation || "a location to be agreed"}.{" "}
        {transportText[plan.transport]} Exchanges should be calm, on time and child-focused.
      </p>

      <H>4. Holidays and special days</H>
      <table className="mt-3 w-full border-collapse font-sans text-[0.85rem]">
        <tbody>
          {Object.entries(plan.holidays).map(([h, v]) => (
            <tr key={h} className="border-b border-line">
              <td className="py-1.5 pr-4 align-top text-charcoal">{h}</td>
              <td className="py-1.5 text-right align-top text-navy">{opt(holidayOptions, v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2">Holiday and special-day arrangements take priority over the regular schedule.</p>
      {plan.holidayNotes.trim() && <p className="mt-2 whitespace-pre-line">{plan.holidayNotes}</p>}

      <H>5. Decision-making responsibility</H>
      <ul className="mt-2 list-disc pl-5">
        {decisionAreas.map((d) => (
          <li key={d.id}>
            <span className="font-medium">{d.label}:</span> {opt(decisionOptions, plan.decisions[d.id])}.
          </li>
        ))}
      </ul>
      {plan.dayToDay && <p className="mt-2">Each parent makes day-to-day decisions while {kids} are in their care.</p>}

      <H>6. Communication</H>
      <p className="mt-2">
        The parents will communicate about {kids} primarily through {commText[plan.commMethod]}, and will respond to
        non-urgent messages within {plan.responseHours} hours. Emergencies are communicated immediately by phone.
        {plan.infoSharing &&
          " Each parent may obtain information directly from schools, health-care providers and activity providers, and will share important information promptly."}
        {plan.noDisparaging && ` Neither parent will speak negatively about the other in front of ${kids}, or ask ${kids} to carry messages.`}
      </p>

      <H>7. Travel and relocation</H>
      <p className="mt-2">
        A parent planning travel with {kids} outside the province will give the other parent at least {plan.travelNoticeDays}{" "}
        days&apos; written notice, including an itinerary and contact information.{" "}
        {plan.passportsWith === "tbd"
          ? "Custody of passports is to be discussed."
          : plan.passportsWith === "alternate"
            ? "Passports are held by the travelling parent and returned after travel."
            : `Passports are held by ${name(plan, plan.passportsWith)} and provided for approved travel.`}
        {plan.relocationNotice &&
          " Any proposed relocation will follow the notice requirements of the applicable law, and the parents will seek legal advice before acting on a proposed move."}
      </p>

      <H>8. Resolving disagreements</H>
      {plan.disputeSteps.length ? (
        <ol className="mt-2 list-decimal pl-5">
          {plan.disputeSteps.map((d) => (
            <li key={d}>{d}.</li>
          ))}
        </ol>
      ) : (
        <p className="mt-2">To be discussed.</p>
      )}

      <H>9. Review</H>
      <p className="mt-2">
        The parents will review this plan every {plan.reviewMonths} months, or sooner if {kids}&apos;s needs change
        significantly.
      </p>

      {plan.extraNotes.trim() && (
        <>
          <H>10. Additional notes</H>
          <p className="mt-2 whitespace-pre-line">{plan.extraNotes}</p>
        </>
      )}

      <footer className="mt-10 border-t border-line pt-3 font-sans text-[0.72rem] leading-relaxed text-muted">
        Prepared with Never After Parenting Plan Studio — an educational planning tool. This draft is not legal advice and
        is not, by itself, a legally binding agreement or court order. Have it reviewed by a lawyer licensed in Ontario
        before signing or relying on it. If there are safety concerns, a standard plan may not be appropriate.
      </footer>
    </article>
  );
}
