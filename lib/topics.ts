import type { SourceKey } from "./site";

export type TopicSlug =
  | "divorce-separation"
  | "parenting"
  | "high-conflict"
  | "support"
  | "family-court"
  | "evidence";

export type Topic = {
  slug: TopicSlug;
  href: string;
  title: string;
  cardSummary: string;
  eyebrow: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  jurisdictionNote: string;
  concepts: { term: string; definition: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  sources: SourceKey[];
};

export const topics: Topic[] = [
  {
    slug: "divorce-separation",
    href: "/family-law",
    title: "Divorce & Separation",
    cardSummary:
      "What separation and divorce mean legally in Ontario, which laws apply, and the decisions that usually come first.",
    eyebrow: "Family Law Hub",
    intro:
      "Family law can feel like one enormous problem. In practice it is a handful of separate questions — about children, money, property and process — each with its own rules. Understanding which question you are actually asking is the first step toward a clearer answer.",
    metaTitle: "Ontario Family Law Explained — Divorce & Separation",
    metaDescription:
      "A plain-English guide to Ontario family law: separation vs. divorce, the Divorce Act and Ontario statutes, parenting, support, property and the court process.",
    jurisdictionNote:
      "Married spouses who divorce are covered by the federal Divorce Act for parenting and support. Ontario's Children's Law Reform Act and Family Law Act apply in many other situations — including unmarried parents, and property division for married spouses. Which law applies can change the forms, the court and some of the rules.",
    concepts: [
      {
        term: "Separation",
        definition:
          "When spouses start living separate and apart with the intention of ending the relationship. There is no government form to 'file' a separation in Ontario; the date it happened can still matter legally.",
      },
      {
        term: "Divorce",
        definition:
          "The legal end of a marriage, granted by a court under the federal Divorce Act. Only married spouses divorce. The most common ground is living separate and apart for at least one year.",
      },
      {
        term: "Separation agreement",
        definition:
          "A written contract in which separated partners resolve issues such as parenting, support and property. Formal requirements apply, and independent legal advice is commonly recommended.",
      },
      {
        term: "Equalization",
        definition:
          "Ontario's framework for dividing the value of property between married spouses under the Family Law Act. It generally divides the growth in net worth during the marriage, not each asset itself. Strict time limits can apply.",
      },
    ],
    sections: [
      {
        heading: "Separation and divorce are not the same thing",
        paragraphs: [
          "Separation describes a change in the relationship. Divorce describes a legal status that only a court can grant, and only to married spouses. Many people resolve every practical issue — parenting, support and property — long before, or entirely without, a divorce order.",
          "Unmarried partners do not divorce, but they can still have legal rights and obligations to each other and to their children, including parenting arrangements, child support and, in some circumstances, spousal support.",
        ],
      },
      {
        heading: "Federal law, provincial law — why it matters",
        paragraphs: [
          "Canada's Divorce Act is federal. Ontario's Children's Law Reform Act and Family Law Act are provincial. When married spouses seek a divorce, parenting and support claims are usually made under the Divorce Act. Unmarried parents generally rely on the Children's Law Reform Act for parenting issues, and on the Family Law Act for support.",
          "Since March 1, 2021, both the federal and Ontario laws use the same modern parenting language — parenting time and decision-making responsibility — and both focus on the best interests of the child. The details are not always identical, which is why each Never After article states its jurisdiction.",
        ],
      },
      {
        heading: "The four questions most separations involve",
        paragraphs: [
          "Most family-law matters come down to four questions: How will the children be cared for? What support, if any, is payable? How will property and debts be divided? And how will those decisions be reached — by agreement, with help from mediation or other processes, or through court?",
          "Treating these as separate questions makes them easier to understand, even when they are connected in real life.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to be divorced to make a separation agreement?",
        a: "No. Separation agreements are commonly made by separated spouses who are not yet divorced, and by unmarried partners who never will be. A lawyer can explain the formal requirements and what independent legal advice involves.",
      },
      {
        q: "Is there a waiting period for divorce in Canada?",
        a: "The most common ground for divorce is that spouses have lived separate and apart for at least one year. The Divorce Act also recognizes adultery and cruelty as grounds. Courts generally also need to be satisfied that reasonable arrangements have been made for child support.",
      },
      {
        q: "Does who 'caused' the separation affect property division or support?",
        a: "In general, Canadian family law is designed to be largely 'no-fault' for property and support. The Divorce Act specifically directs courts not to consider spousal misconduct when making a spousal support order. Conduct can still be relevant in other ways — for example, family violence is a significant factor in parenting decisions.",
      },
    ],
    sources: ["ontarioFamilyLaw", "divorceAct", "fla", "clra", "dojFamilyLaw", "stepsToJustice"],
  },
  {
    slug: "parenting",
    href: "/parenting",
    title: "Parenting Time & Decision-Making",
    cardSummary:
      "The modern language that replaced 'custody and access', how the best-interests test works, and what courts may consider.",
    eyebrow: "Parenting & Custody",
    intro:
      "Parenting decisions after separation are made around one question: what arrangement is in this child's best interests? Understanding how that question is framed — and what it does not mean — makes the rest of the process easier to follow.",
    metaTitle: "Parenting Time & Decision-Making Responsibility in Ontario",
    metaDescription:
      "Child custody in Ontario explained: parenting time, decision-making responsibility, the best-interests-of-the-child test, children's views and parenting plans.",
    jurisdictionNote:
      "For married spouses in divorce proceedings, parenting orders are made under the federal Divorce Act. For unmarried parents and many other situations, Ontario's Children's Law Reform Act applies. Since March 1, 2021, both use 'parenting time' and 'decision-making responsibility' rather than 'custody' and 'access'.",
    concepts: [
      {
        term: "Parenting time",
        definition:
          "Time a child spends in the care of a parent, whether or not the child is physically with that parent the whole time (for example, while at school). This replaced the older idea of 'access' in most contexts.",
      },
      {
        term: "Decision-making responsibility",
        definition:
          "Responsibility for making significant decisions about a child's well-being — including health, education, culture, language, religion and significant extracurricular activities. It can be shared, divided by subject, or held by one parent.",
      },
      {
        term: "Best interests of the child",
        definition:
          "The only consideration when making a parenting order. Courts must give primary consideration to the child's physical, emotional and psychological safety, security and well-being, then consider a list of factors set out in the legislation.",
      },
      {
        term: "Contact",
        definition:
          "Under Ontario's Children's Law Reform Act, time a child spends with a non-parent — such as a grandparent — can be addressed through a contact order.",
      },
    ],
    sections: [
      {
        heading: "Why 'custody' isn't the right word anymore",
        paragraphs: [
          "Many people still search for 'child custody in Ontario', and that is completely understandable. But since March 1, 2021, both the Divorce Act and the Children's Law Reform Act describe parenting arrangements in terms of parenting time and decision-making responsibility.",
          "The change is more than vocabulary. The newer language moves away from the idea that one parent 'wins' the child and the other 'visits', and toward describing what each parent actually does.",
        ],
      },
      {
        heading: "How the best-interests test works",
        paragraphs: [
          "The legislation lists factors courts must consider. They include the child's needs given their age and stage of development; the nature and strength of the child's relationships with each parent and other important people; each parent's willingness to support the child's relationship with the other parent; the history of care; the child's views and preferences, given due weight according to age and maturity; the child's cultural, linguistic, religious and spiritual upbringing, including Indigenous heritage; any plans for the child's care; each person's ability and willingness to care for and meet the child's needs; the ability and willingness of each person to communicate and co-operate on matters affecting the child; any family violence and its impact; and any relevant civil or criminal proceedings, orders or measures.",
          "No single factor automatically decides the outcome. How much weight each factor carries depends on the particular child and family.",
        ],
      },
      {
        heading: "Equal time is a common goal — not a legal presumption",
        paragraphs: [
          "Both federal and Ontario law say a child should have as much time with each parent as is consistent with the child's best interests. That is different from a starting presumption of equal time. Some families arrive at equal or near-equal schedules; many do not. Our article on 50/50 parenting time explains the distinction in more detail.",
        ],
      },
    ],
    faqs: [
      {
        q: "At what age can a child decide where to live?",
        a: "There is no fixed age in Ontario at which a child decides. Courts consider a child's views and preferences and give them weight according to the child's age and maturity. Older children's views often carry significant weight, but they remain one factor within the best-interests analysis.",
      },
      {
        q: "Can one parent move with the child?",
        a: "Both federal and Ontario law now contain specific rules about relocation, including notice requirements and factors courts consider. Relocation questions are fact-specific and time-sensitive; independent legal advice is strongly recommended.",
      },
      {
        q: "What is a parenting plan?",
        a: "A parenting plan sets out how parents will share parenting time and decision-making responsibility, and how they will communicate and resolve disagreements. Courts can incorporate parenting plans into orders. Government resources include parenting plan templates and checklists.",
      },
    ],
    sources: ["clra", "divorceAct", "dojFamilyLaw", "ocl", "ontarioFamilyLaw"],
  },
  {
    slug: "high-conflict",
    href: "/high-conflict",
    title: "High-Conflict Co-Parenting",
    cardSummary:
      "How to keep communication child-focused, document calmly, and understand what conflict means — and doesn't mean — legally.",
    eyebrow: "High-Conflict Separation",
    intro:
      "Some separations stay difficult for a long time. This section is about understanding high-conflict dynamics, protecting children from being placed in the middle, and communicating in ways that are calmer, clearer and easier to stand behind later.",
    metaTitle: "High-Conflict Separation & Co-Parenting in Ontario",
    metaDescription:
      "Educational resources on high-conflict separation in Ontario: child-focused communication, documentation, boundaries, and what courts may consider.",
    jurisdictionNote:
      "The principles here are general and apply across Canada. Where we refer to how courts consider communication or co-operation, we refer to the best-interests factors under the federal Divorce Act and Ontario's Children's Law Reform Act.",
    concepts: [
      {
        term: "Child-focused communication",
        definition:
          "Messages limited to information the other parent needs to care for the child — schedules, health, school, logistics — written in a neutral tone and without commentary on the other parent.",
      },
      {
        term: "Family violence",
        definition:
          "Under the Divorce Act and Ontario's Children's Law Reform Act, family violence is defined broadly and can include coercive and controlling behaviour, not only physical harm. It is a significant factor in parenting decisions.",
      },
      {
        term: "Parallel parenting",
        definition:
          "An informal term for arrangements that minimize direct contact between parents, often with more detailed schedules and decision-making divided by subject. Whether it suits a family depends on the circumstances.",
      },
      {
        term: "Contemporaneous notes",
        definition:
          "Notes made at or near the time something happened. They tend to be more reliable than reconstructed memories — but only if they stay factual.",
      },
    ],
    sections: [
      {
        heading: "Conflict and legal relevance are different things",
        paragraphs: [
          "A situation can be deeply distressing and still not be the central legal issue. Equally, something that seems minor can turn out to matter. The question is usually: how does this affect the child, and is there reliable evidence of it?",
          "Courts may consider each parent's ability and willingness to communicate and co-operate on matters affecting the child, and each parent's willingness to support the child's relationship with the other parent. That is why the tone and content of communication can become relevant — not because one parent sent more messages, but because of what those messages show.",
        ],
      },
      {
        heading: "Keeping children out of the middle",
        paragraphs: [
          "Children generally benefit when adults do not ask them to carry messages, report on the other household, or choose sides. Where communication is difficult, many families use written-only communication, structured co-parenting apps, or exchanges at neutral locations.",
        ],
      },
      {
        heading: "When safety is the issue",
        paragraphs: [
          "If you or a child are in immediate danger, call 911. Concerns about family violence are treated seriously in Ontario family law, and there are specific supports available, including through Legal Aid Ontario and community organizations. Get legal advice early if safety is a concern.",
        ],
      },
    ],
    faqs: [
      {
        q: "Should I record every interaction with the other parent?",
        a: "Documentation can be useful, but more is not automatically better. Focused, factual notes about events that affect the child tend to be more helpful than exhaustive logs. Secretly recording people raises legal and evidentiary questions, and courts have expressed concern about the practice in family matters — get legal advice before doing so.",
      },
      {
        q: "Will a court punish the parent who causes the conflict?",
        a: "Family courts are not designed to punish. They focus on the child's best interests. A parent's conduct can be relevant where it affects the child — for example, behaviour that undermines the child's relationship with the other parent, or family violence.",
      },
    ],
    sources: ["divorceAct", "clra", "legalAid", "dojFamilyLaw", "stepsToJustice"],
  },
  {
    slug: "support",
    href: "/support",
    title: "Child Support & Spousal Support",
    cardSummary:
      "How child support guidelines work, why spousal support is different, and where official calculators and enforcement fit.",
    eyebrow: "Support & Finances",
    intro:
      "Child support and spousal support are often discussed together, but they work very differently. Child support is largely formula-driven and belongs to the child. Spousal support starts with a question of entitlement and involves much more discretion.",
    metaTitle: "Child Support & Spousal Support in Ontario, Explained",
    metaDescription:
      "Child support in Ontario explained: the Child Support Guidelines, table amounts, special expenses, shared parenting, spousal support entitlement and enforcement.",
    jurisdictionNote:
      "Child support is calculated under the Federal Child Support Guidelines for divorcing spouses and under Ontario's Child Support Guidelines in most other Ontario cases. The two are very similar. Spousal support is addressed under the Divorce Act for married spouses and Ontario's Family Law Act for others, including some unmarried partners.",
    concepts: [
      {
        term: "Table amount",
        definition:
          "The base monthly child support amount set out in the guidelines, based on the paying parent's annual income and the number of children.",
      },
      {
        term: "Special or extraordinary expenses",
        definition:
          "Certain additional expenses — such as some child care, health, educational and extracurricular costs — that may be shared between parents, generally in proportion to income.",
      },
      {
        term: "Shared parenting (40% rule)",
        definition:
          "Where each parent has the child at least 40% of the time over a year, a different calculation approach may apply. It is not a simple automatic reduction.",
      },
      {
        term: "Spousal Support Advisory Guidelines",
        definition:
          "Advisory ranges for spousal support amount and duration. They are not legislation, but are widely used once entitlement has been established.",
      },
    ],
    sections: [
      {
        heading: "Child support belongs to the child",
        paragraphs: [
          "The legal right to child support is generally treated as the child's right. That is why parents usually cannot simply agree to waive it, and why it is typically separate from parenting-time disputes: missed support does not, by itself, change parenting time, and denied parenting time does not justify stopping support.",
          "Income determination matters. The guidelines contain rules for calculating income, and parents are required to make financial disclosure.",
        ],
      },
      {
        heading: "Spousal support starts with entitlement",
        paragraphs: [
          "Not every separation results in spousal support. A spouse must first be entitled — for example, on a compensatory basis (because of roles taken on during the relationship), a non-compensatory basis (need), or by contract. Only then do amount and duration come into play.",
          "Under Ontario's Family Law Act, some unmarried partners can be 'spouses' for support purposes — for example, after living together for at least three years, or in a relationship of some permanence where they are the natural or adoptive parents of a child.",
        ],
      },
      {
        heading: "Enforcement",
        paragraphs: [
          "In Ontario, support orders are generally filed with the Family Responsibility Office (FRO), which can enforce payments. Parties can, in some circumstances, opt out of FRO enforcement by agreement.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is child support automatically reduced with 50/50 parenting time?",
        a: "Not automatically. When each parent has at least 40% of parenting time, the guidelines allow a different approach that considers the table amounts for each parent, the increased costs of shared arrangements, and the conditions, means, needs and other circumstances of each parent and child.",
      },
      {
        q: "Can I look up the table amount myself?",
        a: "Yes. The Department of Justice Canada publishes the federal tables and an online look-up tool. Remember that the correct income figure and any special expenses can significantly change the result.",
      },
    ],
    sources: ["federalCsg", "ontarioCsg", "fla", "divorceAct", "fro", "dojFamilyLaw"],
  },
  {
    slug: "family-court",
    href: "/family-court",
    title: "Family Court & Legal Process",
    cardSummary:
      "Case conferences, settlement conferences, motions and trials — what each step is for and what usually happens.",
    eyebrow: "Family Court Process",
    intro:
      "Ontario family court cases usually move through a series of conferences designed to narrow issues and encourage settlement before any trial. Knowing what each step is for helps people prepare better, spend less, and feel less overwhelmed.",
    metaTitle: "Ontario Family Court Process, Step by Step",
    metaDescription:
      "Family court in Ontario explained: the Mandatory Information Program, case conferences, settlement conferences, motions, trial management conferences and trials.",
    jurisdictionNote:
      "Family cases in Ontario are heard in the Ontario Court of Justice, the Superior Court of Justice, or — in some locations — the Family Court branch of the Superior Court of Justice. All are governed by the Family Law Rules, but some issues (including divorce and property division) can only be heard in the Superior Court.",
    concepts: [
      {
        term: "Mandatory Information Program (MIP)",
        definition:
          "A session that parties in many Ontario family cases are required to attend early in the process, explaining the impact of separation, the court process and alternatives to court.",
      },
      {
        term: "Case conference",
        definition:
          "Usually the first meeting with a judge. It is used to explore settlement, identify the issues in dispute, arrange disclosure, and set next steps.",
      },
      {
        term: "Settlement conference",
        definition:
          "A conference focused on resolving issues. The judge may give an opinion on the likely outcome to help parties settle. Discussions are generally confidential.",
      },
      {
        term: "Motion",
        definition:
          "A request for a court order on a specific issue before the case is finished — often a temporary order about parenting or support.",
      },
    ],
    sections: [
      {
        heading: "The typical path",
        paragraphs: [
          "While each case is different, a common sequence is: an application is issued and served; an answer is filed; parties attend the Mandatory Information Program; a case conference is held; there may be motions for temporary orders; a settlement conference follows; then a trial management conference and, if issues remain unresolved, a trial.",
          "Most family cases settle before trial. The conference structure exists, in part, to make that possible.",
        ],
      },
      {
        heading: "Disclosure is not optional",
        paragraphs: [
          "Where support or property is in issue, financial disclosure is required under the Family Law Rules, including a sworn financial statement and supporting documents. Incomplete disclosure is one of the most common reasons cases are delayed.",
        ],
      },
      {
        heading: "Help is available",
        paragraphs: [
          "Family Law Information Centres (FLICs) at many courthouses provide information about the process, and Legal Aid Ontario may assist eligible people. Many people also use mediation or other dispute-resolution processes, which can reduce cost and conflict when appropriate and safe.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will I have to testify?",
        a: "Only if the case goes to trial, or in some specific hearings. Most steps in a family case proceed through written materials (such as affidavits and briefs) and conferences with a judge.",
      },
      {
        q: "Can I go to family court without a lawyer?",
        a: "Yes. Many people in Ontario represent themselves in family court. Government and court resources, Family Law Information Centres, Legal Aid Ontario and limited-scope legal services can help. Getting at least some legal advice is strongly recommended.",
      },
    ],
    sources: ["familyLawRules", "scjFamily", "ontarioCourtForms", "ontarioFamilyLaw", "legalAid", "lso"],
  },
  {
    slug: "evidence",
    href: "/evidence",
    title: "Evidence, Documentation & Disclosure",
    cardSummary:
      "What makes evidence relevant and reliable, how to keep records that help, and why disclosure obligations matter.",
    eyebrow: "Evidence & Documentation",
    intro:
      "Family courts decide disputes based on evidence. That can feel cold when the situation is painful. But understanding what makes information relevant, reliable and useful can help you focus your energy on what is most likely to matter.",
    metaTitle: "Evidence, Documentation & Disclosure in Ontario Family Court",
    metaDescription:
      "What makes evidence relevant in Ontario family court: relevance, reliability, documentation habits, affidavits and financial disclosure — explained in plain English.",
    jurisdictionNote:
      "Evidence in Ontario family cases is governed by the Family Law Rules, Ontario's Evidence Act and general principles of the law of evidence. This page offers general information about those principles, not the detailed rules for any particular step.",
    concepts: [
      {
        term: "Relevance",
        definition:
          "Evidence is relevant if it tends to make a fact that matters to the decision more or less likely. In parenting cases, that usually means connecting it to the child's best interests.",
      },
      {
        term: "Reliability and weight",
        definition:
          "Even relevant evidence can be given more or less weight depending on how trustworthy it is — its source, timing, consistency and whether it is corroborated.",
      },
      {
        term: "Affidavit",
        definition:
          "A written statement of facts sworn or affirmed to be true. Much family-court evidence is given by affidavit, particularly on motions.",
      },
      {
        term: "Financial disclosure",
        definition:
          "Documents and sworn financial statements that the Family Law Rules require where support or property is in issue.",
      },
    ],
    sections: [
      {
        heading: "Relevance is about the question being decided",
        paragraphs: [
          "Something can be true, upsetting and still not be relevant to the specific issue in front of the court. Before gathering more material, it can help to ask: which decision does this relate to, and how?",
        ],
      },
      {
        heading: "Good documentation is boring — on purpose",
        paragraphs: [
          "Helpful records tend to be factual, dated, specific and free of commentary. 'Exchange scheduled for 5:00 p.m.; child dropped off at 6:40 p.m.; no message received' is more useful than paragraphs describing how frustrating the other parent is.",
          "Over-documenting can also backfire: very large volumes of material can obscure the important points and may be seen as a sign of conflict rather than concern.",
        ],
      },
      {
        heading: "Allegations and evidence",
        paragraphs: [
          "An allegation is a claim. Evidence is what supports or undermines it. Serious allegations — including family violence — can be highly relevant and are taken seriously. Their impact generally depends on the evidence available and how it relates to the child's safety and well-being.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are text messages and emails evidence?",
        a: "They can be. Their usefulness depends on their relevance, completeness (selective excerpts can be misleading), and whether their authenticity is disputed. Keep complete, unaltered originals.",
      },
      {
        q: "Can I use social media posts?",
        a: "Social media content may be relevant in some cases. How it was obtained, whether it is complete, and how it relates to the issues all matter. Get legal advice before relying on it — and assume your own posts may be read by a court.",
      },
    ],
    sources: ["familyLawRules", "eLaws", "scjFamily", "ontarioFamilyLaw", "stepsToJustice"],
  },
];

export function getTopic(slug: TopicSlug): Topic {
  const t = topics.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown topic: ${slug}`);
  return t;
}
