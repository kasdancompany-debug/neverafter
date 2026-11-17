import type { Metadata } from "next";
import Link from "next/link";
import { TopicPage } from "@/components/TopicPage";
import { scenarios } from "@/lib/tools";
import { getTopic } from "@/lib/topics";

const topic = getTopic("evidence");

export const metadata: Metadata = {
  title: topic.metaTitle,
  description: topic.metaDescription,
  alternates: { canonical: topic.href },
  openGraph: { title: topic.metaTitle, description: topic.metaDescription, url: topic.href },
};

export default function EvidencePage() {
  return (
    <TopicPage
      topic={topic}
      crumbLabel="Evidence & Documentation"
      extraNav={{ id: "scenarios", label: "Relevant or not?" }}
      extra={
        <section id="scenarios" aria-labelledby="scenarios-h" className="scroll-mt-24 bg-ivory p-6 sm:p-8">
          <h2 id="scenarios-h" className="hd-2">
            Relevant or not?
          </h2>
          <p className="mt-2 text-charcoal/80">
            Not everything that feels important carries the same legal significance. Explore common scenarios:
          </p>
          <ul className="mt-5 border-t border-line-strong">
            {scenarios.map((s) => (
              <li key={s.id} className="border-b border-line-strong">
                <Link href={`/relevant-or-not#${s.id}`} className="flex items-center justify-between gap-4 py-3 text-[0.95rem] text-navy hover:underline hover:underline-offset-4">
                  {s.title}
                  <span className="shrink-0 text-[0.78rem] text-muted">{s.theme}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      }
    />
  );
}
