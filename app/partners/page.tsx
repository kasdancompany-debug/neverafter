import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "For Professionals & Organizations",
  description:
    "Partner with Never After: professional directory listings, sponsored educational resources, and content licensing for organizations serving separating families in Ontario.",
  alternates: { canonical: "/partners" },
};

const offers = [
  {
    title: "Professional directory listing",
    price: "Flat annual fee",
    text: "Family lawyers, mediators, parenting coordinators, financial professionals and counsellors can be listed in a clearly labelled directory. Listings are advertising, not endorsements.",
  },
  {
    title: "Sponsored educational resources",
    price: "Per resource",
    text: "Fund a free guide or explainer that stays fully independent. Sponsors are disclosed on the page and have no editorial control.",
  },
  {
    title: "Content licensing",
    price: "Annual licence",
    text: "Use Never After explainers and tools in your practice, clinic, employee-assistance program or community organization, with your branding alongside ours.",
  },
  {
    title: "Workshops and webinars",
    price: "Per session",
    text: "Plain-language sessions on the family court process, parenting arrangements and child-focused communication, for your clients or staff.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "For Professionals" }]}
        label="Partnerships"
        title="For professionals and organizations"
        intro={<p>Reach people at the moment they&apos;re looking for clear, reliable information — without compromising our independence.</p>}
      />
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {offers.map((o) => (
              <li key={o.title} className="border-t-2 border-navy py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="hd-3">{o.title}</h2>
                  <span className="shrink-0 text-[0.8rem] text-muted">{o.price}</span>
                </div>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/85">{o.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="hd-2">Our independence rules</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-charcoal/85 marker:text-champagne">
                <li>We don&apos;t accept referral fees or any payment per client or lead.</li>
                <li>Paid placements are always labelled. Editorial content is never for sale.</li>
                <li>We don&apos;t rank, rate or recommend professionals.</li>
                <li>Partners have no access to reader data.</li>
              </ul>
            </div>
            <div className="bg-ivory p-7">
              <h2 className="hd-3">Get in touch</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-charcoal/85">
                Tell us about your organization and what you have in mind. We&apos;ll send our current rates and audience
                information.
              </p>
              <Link href="/contact?topic=partnership" className="btn-primary mt-5">
                Partnership enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
