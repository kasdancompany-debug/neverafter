import { getAllArticles, readingTime, categoryLabel } from "./content";
import { topics } from "./topics";
import { products } from "./products";

export type SearchItem = {
  title: string;
  href: string;
  kind: "Article" | "Guide" | "Tool" | "Resource" | "Page";
  description: string;
  meta?: string;
  terms: string;
};

/** Small, static index built at render time and shipped to the client palette. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [
    ...topics.map((t) => ({
      title: t.title,
      href: t.href,
      kind: "Guide" as const,
      description: t.cardSummary,
      terms: [t.metaTitle, ...t.concepts.map((c) => c.term), ...t.faqs.map((f) => f.q)].join(" "),
    })),
    ...getAllArticles().map((a) => ({
      title: a.title,
      href: `/articles/${a.slug}`,
      kind: "Article" as const,
      description: a.summary,
      meta: `${categoryLabel(a.category)} · ${readingTime(a)} min`,
      terms: [...a.keywords, ...a.sections.map((s) => s.heading)].join(" "),
    })),
    {
      title: "Find your starting point",
      href: "/start-here",
      kind: "Tool",
      description: "Choose what you're trying to understand and get a reading path.",
      terms: "start begin guide pathway where to start",
    },
    {
      title: "Parenting Plan Studio",
      href: "/parenting-plan-studio",
      kind: "Tool",
      description: "Build a parenting plan draft: schedule, holidays, decisions, communication.",
      terms: "parenting plan schedule template 2-2-3 week on week off holidays custody calendar",
    },
    {
      title: "Relevant or not?",
      href: "/relevant-or-not",
      kind: "Tool",
      description: "Common scenarios and what courts may consider.",
      terms: "scenarios relevance evidence allegations preference equal time support payments",
    },
    ...products.map((p) => ({
      title: p.title,
      href: `/resources/${p.slug}`,
      kind: "Resource" as const,
      description: p.tagline,
      terms: p.objectives.join(" "),
    })),
    { title: "Free Ontario Separation Starter Guide (PDF)", href: "/guides/ontario-separation-starter-guide.pdf", kind: "Resource", description: "16-page printable guide: which law applies, the four core issues, checklists and worksheets.", terms: "free download pdf starter guide checklist worksheet first steps documents" },
    { title: "The Never After Brief (newsletter)", href: "/newsletter", kind: "Page", description: "Free weekly email about Ontario family law.", terms: "newsletter subscribe email mailing list updates" },
    { title: "Pricing", href: "/pricing", kind: "Page", description: "Free, Parenting Plan Studio and Never After Plus.", terms: "price cost buy plus subscription" },
    { title: "About Never After", href: "/about", kind: "Page", description: "Mission, philosophy and approach.", terms: "mission who we are" },
    { title: "Editorial standards", href: "/editorial-standards", kind: "Page", description: "How we research, review and correct.", terms: "sources corrections review" },
    { title: "Legal disclaimer", href: "/legal-disclaimer", kind: "Page", description: "Information, not advice.", terms: "disclaimer advice lawyer" },
    { title: "Contact", href: "/contact", kind: "Page", description: "Questions, corrections and enquiries.", terms: "email contact correction" },
  ];
  return items;
}
