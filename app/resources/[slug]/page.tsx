import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductCover } from "@/components/ProductCover";
import { CheckoutButton } from "@/components/CheckoutButton";
import { LegalNote } from "@/components/LegalNote";
import { NewsletterBand } from "@/components/NewsletterBand";
import { formatCad, getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.title} — Educational Resource`,
    description: `${p.tagline} ${p.description}`.slice(0, 300),
    alternates: { canonical: `/resources/${p.slug}` },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = product.related.map((r) => getProduct(r)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <section className="border-b border-line">
        <div className="container-x pb-14 pt-8">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }, { label: product.shortTitle }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <div className="flex justify-center bg-ivory px-10 py-12 lg:self-start">
              <ProductCover product={product} className="w-full max-w-[300px]" />
            </div>
            <div>
              <p className="label">{product.available ? "Available" : "In development · not yet available"}</p>
              <h1 className="hd-1 mt-3">{product.title}</h1>
              <p className="lede mt-3">{product.tagline}</p>
              <p className="mt-5 max-w-xl leading-relaxed text-charcoal/85">{product.description}</p>
              <dl className="mt-6 grid max-w-md grid-cols-2 border-y border-line py-4 text-[0.88rem]">
                <div>
                  <dt className="text-muted">Proposed price</dt>
                  <dd className="mt-0.5 text-[1.15rem] font-semibold text-navy">{formatCad(product.priceCad)} CAD</dd>
                </div>
                <div>
                  <dt className="text-muted">Format</dt>
                  <dd className="mt-0.5 font-medium text-navy">{product.format}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <CheckoutButton item={product.slug} label={`Buy — ${formatCad(product.priceCad)} CAD`} title={product.title} />
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-2">
                <div>
                  <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">What you&apos;ll learn</h2>
                  <ul className="mt-3 space-y-2.5">
                    {product.objectives.map((o) => (
                      <li key={o} className="flex gap-2.5 text-[0.93rem] leading-relaxed text-charcoal/85">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-sage-ink" aria-hidden />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">Planned contents</h2>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[0.93rem] text-charcoal/85 marker:text-muted">
                    {product.contents.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <figure className="mt-12 border-l-2 border-navy pl-5">
                <figcaption className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">
                  Preview — {product.preview.heading}
                </figcaption>
                <blockquote className="mt-2 font-serif text-[1.35rem] leading-snug text-charcoal">{product.preview.text}</blockquote>
                <p className="mt-2 text-[0.78rem] text-muted">Draft excerpt, subject to editorial and legal review.</p>
              </figure>

              <div className="mt-12">
                <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-navy">This resource does not provide</h2>
                <ul className="mt-3 space-y-2">
                  {product.notFor.map((n) => (
                    <li key={n} className="flex gap-2.5 text-[0.93rem] text-charcoal/85">
                      <X className="mt-1 h-4 w-4 shrink-0 text-muted" aria-hidden />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
              <LegalNote className="mt-10" />
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-res" className="py-14">
          <div className="container-x">
            <h2 id="related-res" className="hd-2">
              Related resources
            </h2>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/resources/${r.slug}`} className="group flex items-center gap-5 border-t border-line pt-5">
                    <ProductCover product={r} compact className="w-14 shrink-0" />
                    <span>
                      <span className="block font-serif text-[1.2rem] font-medium leading-snug text-navy group-hover:underline group-hover:underline-offset-4">
                        {r.title}
                      </span>
                      <span className="text-[0.82rem] text-muted">{formatCad(r.priceCad)} CAD · proposed</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <NewsletterBand />
    </>
  );
}
