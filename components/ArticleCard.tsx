import Link from "next/link";
import type { ArticleSummary } from "@/lib/content";

function Meta({ a }: { a: ArticleSummary }) {
  return (
    <p className="text-[0.8rem] text-muted">
      <time dateTime={a.published}>{a.publishedLabel}</time>
      <span aria-hidden> · </span>
      {a.minutes} min read
    </p>
  );
}

/** Editorial list item: rule above, category, headline, standfirst, meta. No boxes. */
export function ArticleCard({ article, size = "md" }: { article: ArticleSummary; size?: "md" | "lg" }) {
  return (
    <article className="group relative h-full border-t border-navy pt-4">
      <p className="label">{article.categoryLabel}</p>
      <h3
        className={`mt-2 font-serif font-medium leading-[1.15] tracking-[-0.01em] text-navy ${
          size === "lg" ? "text-[1.9rem] sm:text-[2.4rem]" : "text-[1.35rem]"
        }`}
      >
        <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-line-strong group-hover:decoration-1 group-hover:underline-offset-[5px]">
          {article.title}
        </Link>
      </h3>
      <p className={`mt-2 text-charcoal/75 ${size === "lg" ? "text-[1.05rem] leading-relaxed" : "line-clamp-3 text-[0.93rem] leading-relaxed"}`}>
        {article.summary}
      </p>
      <div className="mt-3">
        <Meta a={article} />
      </div>
    </article>
  );
}

/** Compact row for lists. */
export function ArticleRow({ article }: { article: ArticleSummary }) {
  return (
    <article className="group relative grid gap-1 border-t border-line py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
      <div>
        <p className="text-[0.75rem] font-medium text-champagne-ink">{article.categoryLabel}</p>
        <h3 className="mt-1 font-serif text-[1.2rem] font-medium leading-snug text-navy">
          <Link href={`/articles/${article.slug}`} className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
            {article.title}
          </Link>
        </h3>
      </div>
      <p className="text-[0.8rem] text-muted sm:pt-6">{article.minutes} min</p>
    </article>
  );
}
