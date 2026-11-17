import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Studio } from "@/components/studio/Studio";
import { NewsletterBand } from "@/components/NewsletterBand";
import { activeEntitlements, accessConfigured, readAccess } from "@/lib/access";
import { hasAccess, STUDIO_PRICE } from "@/lib/catalog";
import { stripeConfigured } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Parenting Plan Studio — Build a Parenting Plan Draft (Ontario)",
  description:
    "Organize a clear parenting plan proposal: schedules, holidays, decision-making, communication and travel. Free to build; private to your device.",
  alternates: { canonical: "/parenting-plan-studio" },
};

export default async function StudioPage() {
  const ent = activeEntitlements(await readAccess());
  const unlocked = hasAccess(ent, "studio");
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Parenting Plan Studio" }]}
        label="Tool"
        title="Parenting Plan Studio"
        intro={
          <p>
            Organize a clear, child-focused parenting proposal — schedule, holidays, decisions, communication and travel —
            to bring to the other parent, a mediator or a lawyer. Free to build. Export for ${STUDIO_PRICE} CAD, once.
          </p>
        }
        aside={
          <dl className="grid grid-cols-3 gap-4 border-t-2 border-navy pt-4 text-[0.82rem] lg:grid-cols-1 lg:gap-3">
            <div>
              <dt className="font-semibold text-navy">Private</dt>
              <dd className="text-muted">Your plan stays in your browser.</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">No account</dt>
              <dd className="text-muted">Start right away.</dd>
            </div>
            <div>
              <dt className="font-semibold text-navy">Not legal advice</dt>
              <dd className="text-muted">A draft to discuss and review.</dd>
            </div>
          </dl>
        }
      />
      <section aria-label="Studio" className="py-10 sm:py-12">
        <div className="container-x">
          <Studio unlocked={unlocked} configured={stripeConfigured() && accessConfigured()} />
        </div>
      </section>
      <NewsletterBand />
    </>
  );
}
