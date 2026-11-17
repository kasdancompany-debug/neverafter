import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { StudioPromo } from "@/components/StudioPromo";
import { getTopic } from "@/lib/topics";

const topic = getTopic("parenting");

export const metadata: Metadata = {
  title: topic.metaTitle,
  description: topic.metaDescription,
  alternates: { canonical: topic.href },
  openGraph: { title: topic.metaTitle, description: topic.metaDescription, url: topic.href },
};

export default function Page() {
  return (
    <TopicPage
      topic={topic}
      crumbLabel="Parenting & Custody"
      extraNav={{ id: "plan-studio", label: "Build a parenting plan" }}
      extra={
        <section id="plan-studio" className="scroll-mt-24 bg-ivory p-6 sm:p-8">
          <StudioPromo compact />
        </section>
      }
    />
  );
}
