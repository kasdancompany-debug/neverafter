export type Product = {
  slug: string;
  title: string;
  shortTitle: string;
  priceCad: number;
  /** Products are proposed and in development. Checkout stays disabled until this is true. */
  available: boolean;
  format: string;
  tagline: string;
  description: string;
  objectives: string[];
  contents: string[];
  preview: { heading: string; text: string };
  notFor: string[];
  cover: { bg: string; fg: string; accent: string; motif: "paths" | "grid" | "arch" | "waves" | "rings" };
  related: string[];
};

export const products: Product[] = [
  {
    slug: "ontario-separation-starter-guide",
    title: "Ontario Separation Starter Guide",
    shortTitle: "Separation Starter Guide",
    priceCad: 29,
    available: false,
    format: "Digital guide (PDF) with printable worksheets",
    tagline: "The first things worth understanding — in the order you'll likely need them.",
    description:
      "A calm, structured introduction to separation in Ontario. It explains key terms, the main legal frameworks, and the practical information people commonly need to gather, so first conversations with a lawyer or mediator are more productive.",
    objectives: [
      "Distinguish separation from divorce and understand which laws may apply.",
      "Understand the four core issue areas: parenting, child support, spousal support and property.",
      "Organize financial and household information before seeking advice.",
      "Prepare focused questions for an initial legal consultation.",
    ],
    contents: [
      "Separation, divorce and the date that matters",
      "Federal vs. Ontario law: a one-page map",
      "Parenting time and decision-making, in plain English",
      "Support and property: what to understand first",
      "Worksheet: documents to gather",
      "Worksheet: questions for your first consultation",
    ],
    preview: {
      heading: "From the introduction",
      text: "You don't need to understand everything at once. Most separations involve four separate questions — about children, support, property and process. This guide takes them one at a time.",
    },
    notFor: ["Personalized legal advice", "Drafting a separation agreement", "Predicting the outcome of a case"],
    cover: { bg: "#182B30", fg: "#F5F1E9", accent: "#C4AC8A", motif: "paths" },
    related: ["ontario-parenting-arrangements-explained", "understanding-ontario-family-court"],
  },
  {
    slug: "parenting-communication-documentation-toolkit",
    title: "Parenting Communication & Documentation Toolkit",
    shortTitle: "Communication Toolkit",
    priceCad: 49,
    available: false,
    format: "Digital toolkit (PDF) with templates and logs",
    tagline: "Clear messages. Factual records. Fewer regrets.",
    description:
      "Practical templates and examples for child-focused co-parenting communication and factual record-keeping. Built around clarity and neutrality — not around building a case against anyone.",
    objectives: [
      "Write brief, factual, child-focused messages.",
      "Keep dated, objective records that stay useful over time.",
      "Recognize when documentation becomes counter-productive.",
      "Understand general principles of relevance and reliability.",
    ],
    contents: [
      "Message templates for common co-parenting situations",
      "Before-and-after rewrites",
      "Factual log templates (schedule, health, school)",
      "Guidance on volume, tone and completeness",
      "When to stop documenting and seek advice",
    ],
    preview: {
      heading: "From chapter two",
      text: "The most useful record is often the most boring one: a date, a time, what happened, and nothing else.",
    },
    notFor: ["Advice on recording other people", "Preparing court affidavits", "Case strategy"],
    cover: { bg: "#A8B9AE", fg: "#182B30", accent: "#F5F1E9", motif: "grid" },
    related: ["high-conflict-communication-education-workbook", "ontario-separation-starter-guide"],
  },
  {
    slug: "understanding-ontario-family-court",
    title: "Understanding Ontario Family Court",
    shortTitle: "Family Court Guide",
    priceCad: 79,
    available: false,
    format: "In-depth digital guide (PDF)",
    tagline: "Every step explained, from application to trial management.",
    description:
      "An educational walk-through of the Ontario family court process under the Family Law Rules: the purpose of each conference, what motions are for, disclosure obligations, and how to prepare information clearly.",
    objectives: [
      "Understand the purpose of case, settlement and trial management conferences.",
      "Recognize the role of motions and temporary orders.",
      "Understand financial disclosure obligations.",
      "Know where to find official forms and court resources.",
    ],
    contents: [
      "Which court? Ontario Court of Justice, Superior Court and Family Court",
      "Starting and responding to a case",
      "The Mandatory Information Program",
      "Conferences, step by step",
      "Motions and temporary orders",
      "Disclosure, briefs and offers to settle",
      "Glossary and official resource directory",
    ],
    preview: {
      heading: "From the overview",
      text: "Court is a process, not a single day. Most of that process is designed to help people settle, narrow issues, or prepare properly for a decision.",
    },
    notFor: ["Completing forms for you", "Representation", "Advice on your specific case"],
    cover: { bg: "#F5F1E9", fg: "#182B30", accent: "#C4AC8A", motif: "arch" },
    related: ["ontario-separation-starter-guide", "parenting-communication-documentation-toolkit"],
  },
  {
    slug: "high-conflict-communication-education-workbook",
    title: "High-Conflict Communication Education Workbook",
    shortTitle: "High-Conflict Workbook",
    priceCad: 39,
    available: false,
    format: "Guided workbook (PDF)",
    tagline: "Respond to the issue. Not the provocation.",
    description:
      "A self-paced educational workbook about high-conflict communication dynamics, with exercises on tone, boundaries and child-focused responses. Not a substitute for counselling, legal advice or safety planning.",
    objectives: [
      "Understand common patterns in high-conflict communication.",
      "Practise separating information from emotion in replies.",
      "Set and communicate reasonable boundaries.",
      "Recognize when a situation is a safety issue, not a communication issue.",
    ],
    contents: [
      "What 'high-conflict' does and doesn't mean",
      "Exercises: rewrite the reply",
      "Boundaries and response times",
      "Keeping children out of the middle",
      "Safety resources and when to seek help",
    ],
    preview: {
      heading: "Exercise one",
      text: "Read the message once. Identify the one piece of information that requires a response. Reply to that — and only that.",
    },
    notFor: ["Safety planning", "Therapy or counselling", "Legal advice"],
    cover: { bg: "#C4AC8A", fg: "#182B30", accent: "#FAF9F6", motif: "waves" },
    related: ["parenting-communication-documentation-toolkit", "ontario-parenting-arrangements-explained"],
  },
  {
    slug: "ontario-parenting-arrangements-explained",
    title: "Ontario Parenting Arrangements Explained",
    shortTitle: "Parenting Arrangements",
    priceCad: 59,
    available: false,
    format: "Digital guide (PDF) with sample schedules",
    tagline: "Parenting time, decision-making and the best-interests test — clearly.",
    description:
      "A detailed educational guide to how parenting arrangements are described and decided under the Divorce Act and Ontario's Children's Law Reform Act, with illustrative schedules and planning questions.",
    objectives: [
      "Understand parenting time, decision-making responsibility and contact.",
      "Learn the best-interests factors and how they are framed.",
      "Compare common schedule structures and their practical trade-offs.",
      "Understand relocation notice concepts at a general level.",
    ],
    contents: [
      "From 'custody and access' to modern language",
      "The best-interests factors, one by one",
      "Illustrative schedules (2-2-3, week-on/week-off and more)",
      "Holidays, summers and transitions",
      "Children's views and how they're heard",
      "Relocation: general concepts",
    ],
    preview: {
      heading: "From chapter one",
      text: "The newer language isn't just new vocabulary. It describes what each parent actually does, rather than who 'has' the child.",
    },
    notFor: ["Recommending a schedule for your family", "Drafting a parenting plan", "Predicting outcomes"],
    cover: { bg: "#252A2C", fg: "#F5F1E9", accent: "#A8B9AE", motif: "rings" },
    related: ["ontario-separation-starter-guide", "high-conflict-communication-education-workbook"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatCad(amount: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(amount);
}
