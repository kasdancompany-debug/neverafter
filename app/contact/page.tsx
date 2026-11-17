import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { officialSources } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Never After with questions about the site, corrections, or media and partnership enquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        title="Contact us"
        intro={<p>Questions about the site, a correction, or a partnership enquiry.</p>}
      />
      <section className="py-12 sm:py-14">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div className="max-w-[640px]">
            <ContactForm />
          </div>
          <aside className="space-y-8">
            <div className="border-t-2 border-navy pt-4">
              <h2 className="font-semibold text-navy">We can&apos;t give legal advice</h2>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/80">
                Never After is an educational publication, not a law firm. We can&apos;t comment on individual situations.
              </p>
              <ul className="mt-3 space-y-1.5 text-[0.9rem]">
                {[officialSources.lso, officialSources.legalAid].map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-link font-medium">
                      {s.publisher}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-line pt-4">
              <h2 className="font-semibold text-navy">Corrections</h2>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/80">
                Choose &ldquo;Report an error&rdquo; and include the page address. We review every report.
              </p>
            </div>
            <div className="border-t border-line pt-4">
              <h2 className="font-semibold text-navy">In an emergency</h2>
              <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/80">
                If you or a child are in immediate danger, call 911. This form is not monitored for urgent matters.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
