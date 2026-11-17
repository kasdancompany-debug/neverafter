import type { Metadata } from "next";
import { TopicPage } from "@/components/TopicPage";
import { WhatMatters } from "@/components/WhatMatters";
import { getTopic } from "@/lib/topics";

const topic = getTopic("high-conflict");

export const metadata: Metadata = {
  title: topic.metaTitle,
  description: topic.metaDescription,
  alternates: { canonical: topic.href },
  openGraph: { title: topic.metaTitle, description: topic.metaDescription, url: topic.href },
};

const habits = [
  { title: "Pause before replying", text: "Unless it's urgent, read the message twice and identify what actually needs an answer." },
  { title: "Answer the logistics", text: "Respond to dates, times, places and the child's needs. Leave accusations and history unanswered." },
  { title: "Write for a third reader", text: "Assume a neutral professional may one day read the exchange. Would your message help them?" },
  { title: "Keep the child out of it", text: "No messages carried by children, no questions about the other household, no asking them to choose." },
];

export default function HighConflictPage() {
  return (
    <TopicPage
      topic={topic}
      title="High-conflict separation"
      crumbLabel="High-Conflict Separation"
      extraNav={{ id: "habits", label: "Four communication habits" }}
      extra={
        <>
          <section id="habits" aria-labelledby="habits-h" className="scroll-mt-24">
            <h2 id="habits-h" className="hd-2">
              Four communication habits
            </h2>
            <ol className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {habits.map((h, i) => (
                <li key={h.title} className="border-t border-line py-5">
                  <p className="font-semibold text-navy">
                    <span className="mr-2 text-champagne-ink">{i + 1}.</span>
                    {h.title}
                  </p>
                  <p className="mt-1.5 text-[0.93rem] leading-relaxed text-charcoal/80">{h.text}</p>
                </li>
              ))}
            </ol>
          </section>
          <section aria-labelledby="hc-matters" className="scroll-mt-24">
            <h2 id="hc-matters" className="hd-2">
              What actually matters?
            </h2>
            <div className="mt-2">
              <WhatMatters />
            </div>
          </section>
        </>
      }
    />
  );
}
