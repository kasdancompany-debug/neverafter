import { articles, featuredArticleSlugs, type Article, type Block } from "./articles";
import { officialSources, type Source, type SourceKey } from "./site";
import { topics, type TopicSlug } from "./topics";

/**
 * Content access layer. Pages and components only call these functions,
 * so replacing the local data with a headless CMS is a change to this file alone.
 */

export function getAllArticles(): Article[] {
  return [...articles].sort((a, b) => b.published.localeCompare(a.published));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return featuredArticleSlugs.map((s) => getArticle(s)).filter((a): a is Article => Boolean(a));
}

export function getArticlesByCategory(category: TopicSlug): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticlesBySlugs(slugs: string[]): Article[] {
  return slugs.map((s) => getArticle(s)).filter((a): a is Article => Boolean(a));
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const explicit = getArticlesBySlugs(article.related ?? []);
  const fill = getAllArticles().filter(
    (a) => a.slug !== article.slug && a.category === article.category && !explicit.includes(a),
  );
  return [...explicit, ...fill].slice(0, limit);
}

export function categoryLabel(slug: TopicSlug): string {
  return topics.find((t) => t.slug === slug)?.title ?? slug;
}

export function categoryHref(slug: TopicSlug): string {
  return topics.find((t) => t.slug === slug)?.href ?? "/articles";
}

function blockText(b: Block): string {
  if (typeof b === "string") return b;
  if (b.type === "list") return b.items.join(" ");
  if (b.type === "callout") return `${b.title} ${b.text}`;
  return b.text;
}

export function readingTime(article: Article): number {
  const words = article.sections
    .flatMap((s) => [s.heading, ...s.blocks.map(blockText)])
    .join(" ")
    .split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function resolveSources(keys: readonly SourceKey[]): Source[] {
  return keys.map((k) => officialSources[k]);
}

/** Lightweight serialisable shape for client-side search. */
export type ArticleSummary = {
  slug: string;
  title: string;
  summary: string;
  category: TopicSlug;
  categoryLabel: string;
  published: string;
  publishedLabel: string;
  minutes: number;
  keywords: string[];
};

export function toSummary(a: Article): ArticleSummary {
  return {
    slug: a.slug,
    title: a.title,
    summary: a.summary,
    category: a.category,
    categoryLabel: categoryLabel(a.category),
    published: a.published,
    publishedLabel: formatDate(a.published),
    minutes: readingTime(a),
    keywords: a.keywords,
  };
}
