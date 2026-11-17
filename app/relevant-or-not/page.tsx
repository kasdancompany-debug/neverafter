import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RelevantOrNot } from "@/components/RelevantOrNot";
import { LegalNote } from "@/components/LegalNote";
import { NewsletterBand } from "@/components/NewsletterBand";

export const metadata: Metadata = {
  title: "Relevant or Not? Family Law Scenarios Explained",
  description:
    "Common Ontario family-law scenarios — equal parenting time, children's preferences, allegations, missed support — and what courts may consider. General information, not legal advice.",
  alternates: { canonical: "/relevant-or-not" },
};

export default function RelevantOrNotPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Relevant or Not?" }]}
        label="Interactive guide"
        title="Relevant or not?"
        intro={
          <p>
            Not everything that feels important carries the same legal significance. Choose a scenario to see the legal
            issue it may raise, why the circumstances matter, what evidence may be relevant and what people commonly
            misunderstand.
          </p>
        }
      />
      <section aria-label="Scenarios" className="py-12 sm:py-16">
        <div className="container-x">
          <RelevantOrNot />
          <LegalNote className="mt-14 max-w-3xl" />
        </div>
      </section>
      <NewsletterBand />
    </>
  );
}
