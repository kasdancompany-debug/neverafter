import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { getTopic } from "@/lib/topics";

const topic = getTopic("support");

export const metadata: Metadata = {
  title: topic.metaTitle,
  description: topic.metaDescription,
  alternates: { canonical: topic.href },
  openGraph: { title: topic.metaTitle, description: topic.metaDescription, url: topic.href },
};

export default function Page() {
  return <TopicPage topic={topic} crumbLabel="Child & Spousal Support" />;
}
