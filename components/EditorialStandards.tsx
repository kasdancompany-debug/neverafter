export const standards = [
  { title: "Official sources first", text: "Legislation, regulations and government and court resources come before commentary." },
  { title: "Information, not advice", text: "We explain how the system works. We don't tell anyone what to do in their case." },
  { title: "Jurisdiction, always", text: "Every article states whether federal law, Ontario law, or both apply." },
  { title: "Reviewed and dated", text: "We review content as laws change and show when each page was last reviewed." },
  { title: "Transparent corrections", text: "When we get something wrong, we fix it and say so on the page." },
  { title: "No sensationalism", text: "No fear-based headlines, no villains, no promises to 'win your case'." },
  { title: "Children first", text: "We protect children's well-being and privacy, and never frame children as prizes." },
  { title: "No promised outcomes", text: "Family law is fact-specific. Careful language is the accurate language." },
];

export function EditorialStandards({ limit }: { limit?: number }) {
  const items = limit ? standards.slice(0, limit) : standards;
  return (
    <dl className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <div key={s.title} className="border-t border-line py-5">
          <dt className="font-semibold text-navy">{s.title}</dt>
          <dd className="mt-1.5 text-[0.92rem] leading-relaxed text-charcoal/75">{s.text}</dd>
        </div>
      ))}
    </dl>
  );
}
