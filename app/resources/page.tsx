import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { ProductCover } from "@/components/ProductCover";
import { SignupForm } from "@/components/SignupForm";
import { SourceList } from "@/components/SourceList";
import { NewsletterBand } from "@/components/NewsletterBand";
import { formatCad, products } from "@/lib/products";
import { resolveSources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources — Guides & Toolkits for Ontario Separation",
  description:
    "Educational guides and toolkits on Ontario separation, parenting arrangements, family court and high-conflict communication — plus free official resources.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Resources" }]}
        label="Resources"
        title="Guides and toolkits"
        intro={
          <p>
            Structured educational resources to help you understand, organize and prepare. Never a substitute for legal
            advice, and never a promise about outcomes.
          </p>
        }
      >
        <p className="mt-6 inline-block border border-dashed border-line-strong px-3 py-2 text-[0.82rem] text-charcoal/85">
          <strong className="font-semibold text-champagne-ink">In development.</strong> These are proposed resources and
          are not yet available to buy.
        </p>
      </PageHeader>

      <section aria-labelledby="shop" className="py-14 sm:py-16">
        <div className="container-x">
          <h2 id="shop" className="sr-only">
            All resources
          </h2>
          <ul className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/resources/${p.slug}`} className="group block">
                  <div className="flex justify-center bg-ivory px-10 py-10 transition-colors group-hover:bg-[#eee8dc]">
                    <ProductCover product={p} className="w-full max-w-[210px] transition-transform duration-300 group-hover:-translate-y-1" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="hd-3 group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">{p.title}</h3>
                    <span className="shrink-0 text-[0.9rem] font-semibold text-navy">{formatCad(p.priceCad)}</span>
                  </div>
                  <p className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/75">{p.tagline}</p>
                  <p className="mt-2 text-[0.78rem] text-muted">{p.format} · Coming soon</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="free" className="border-t border-line bg-ivory py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label">Free</p>
            <h2 id="free" className="hd-2 mt-2">
              Ontario Separation Starter Guide — free edition
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/80">
              The essentials: separation vs. divorce, federal vs. Ontario law, the four core issues, and questions to bring
              to a first consultation.
            </p>
          </div>
          <SignupForm list="starter-guide" cta="Send me the guide" />
        </div>
      </section>

      <section aria-label="Official resources" className="py-14 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <h2 className="hd-2">Official resources, always free</h2>
            <p className="mt-3 leading-relaxed text-charcoal/80">
              Government, court and public legal-education resources are the foundation of everything we publish.
            </p>
          </div>
          <SourceList
            heading="Official & public resources"
            sources={resolveSources(["ontarioFamilyLaw", "dojFamilyLaw", "ontarioCourtForms", "scjFamily", "ocl", "fro", "legalAid", "lso", "stepsToJustice"])}
          />
        </div>
      </section>

      <NewsletterBand />
    </>
  );
}
