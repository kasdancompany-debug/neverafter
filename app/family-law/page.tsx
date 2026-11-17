import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { TopicGrid } from "@/components/TopicCard";
import { getTopic, topics } from "@/lib/topics";
import { getAllArticles } from "@/lib/content";

const topic = getTopic("divorce-separation");

export const metadata: Metadata = {
  title: topic.metaTitle,
  description: topic.metaDescription,
  alternates: { canonical: "/family-law" },
  openGraph: { title: topic.metaTitle, description: topic.metaDescription, url: "/family-law" },
};

export default function FamilyLawPage() {
  const counts: Record<string, number> = {};
  for (const a of getAllArticles()) counts[a.category] = (counts[a.category] ?? 0) + 1;
  return (
    <TopicPage
      topic={topic}
      title="Family law in Ontario"
      crumbLabel="Family Law"
      before={
        <section aria-labelledby="hub-map" className="border-b border-line bg-ivory py-14">
          <div className="container-x">
            <h2 id="hub-map" className="hd-2">
              Guides by topic
            </h2>
            <p className="mt-2 max-w-2xl text-charcoal/75">Most separations involve several of these. Start with the one you&apos;re facing now.</p>
            <div className="mt-8 bg-paper">
              <TopicGrid items={topics.filter((t) => t.slug !== "divorce-separation")} counts={counts} />
            </div>
          </div>
        </section>
      }
    />
  );
}
