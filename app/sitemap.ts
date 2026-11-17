import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/content";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
  { path: "", priority: 1, freq: "weekly" },
  { path: "/start-here", priority: 0.9, freq: "monthly" },
  { path: "/family-law", priority: 0.9, freq: "monthly" },
  { path: "/parenting", priority: 0.9, freq: "monthly" },
  { path: "/high-conflict", priority: 0.8, freq: "monthly" },
  { path: "/support", priority: 0.8, freq: "monthly" },
  { path: "/family-court", priority: 0.8, freq: "monthly" },
  { path: "/evidence", priority: 0.8, freq: "monthly" },
  { path: "/relevant-or-not", priority: 0.7, freq: "monthly" },
  { path: "/parenting-plan-studio", priority: 0.9, freq: "monthly" },
  { path: "/pricing", priority: 0.6, freq: "monthly" },
  { path: "/partners", priority: 0.3, freq: "yearly" },
  { path: "/articles", priority: 0.8, freq: "weekly" },
  { path: "/resources", priority: 0.6, freq: "monthly" },
  { path: "/about", priority: 0.5, freq: "yearly" },
  { path: "/editorial-standards", priority: 0.4, freq: "yearly" },
  { path: "/contact", priority: 0.3, freq: "yearly" },
  { path: "/legal-disclaimer", priority: 0.2, freq: "yearly" },
  { path: "/privacy", priority: 0.2, freq: "yearly" },
  { path: "/terms", priority: 0.2, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((r) => ({ url: `${site.url}${r.path}`, changeFrequency: r.freq, priority: r.priority })),
    ...getAllArticles().map((a) => ({
      url: `${site.url}/articles/${a.slug}`,
      lastModified: new Date(a.reviewed),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({ url: `${site.url}/resources/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.4 })),
  ];
}
