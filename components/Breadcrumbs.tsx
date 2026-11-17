import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[0.8rem]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.label} className="flex items-center gap-2">
                {c.href && !last ? (
                  <Link href={c.href} className="hover:text-navy hover:underline hover:underline-offset-4">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className="line-clamp-1 text-charcoal">
                    {c.label}
                  </span>
                )}
                {!last && <span aria-hidden className="text-line-strong">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: `${site.url}${c.href}` } : {}),
          })),
        }}
      />
    </>
  );
}
