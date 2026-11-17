import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ArticleLibrary } from "@/components/ArticleLibrary";
import { NewsletterBand } from "@/components/NewsletterBand";
import { getAllArticles, toSummary } from "@/lib/content";
import { topics } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Articles — Ontario Family Law, Explained",
  description:
    "Searchable library of plain-English explainers on Ontario family law: parenting time, the Office of the Children's Lawyer, child support, settlement conferences and evidence.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const articles = getAllArticles().map(toSummary);
  const categories = topics.map((t) => ({ slug: t.slug, label: t.title }));
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Articles" }]}
        label="Library"
        title="Articles"
        intro={<p>Plain-English explainers. Each one states its jurisdiction, links to official sources and shows when it was last reviewed.</p>}
      />
      <section aria-label="Article library" className="py-12 sm:py-14">
        <div className="container-x">
          <ArticleLibrary articles={articles} categories={categories} />
        </div>
      </section>
      <NewsletterBand />
    </>
  );
}
