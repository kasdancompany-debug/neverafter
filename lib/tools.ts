import type { SourceKey } from "./site";

/* ------------------------------------------------------------------ */
/*  WHAT ACTUALLY MATTERS?                                             */
/* ------------------------------------------------------------------ */
export type MattersItem = { title: string; why: string; nuance: string };

export const matters: MattersItem[] = [
  {
    title: "Children's best interests",
    why: "It is the only consideration for parenting orders under both the Divorce Act and Ontario's Children's Law Reform Act. Every other factor is weighed through this lens.",
    nuance:
      "Courts must give primary consideration to the child's physical, emotional and psychological safety, security and well-being.",
  },
  {
    title: "Reliable and relevant evidence",
    why: "Decisions are made on evidence. Specific, dated, first-hand and corroborated information generally carries more weight than impressions or characterizations.",
    nuance: "Relevant evidence is connected to the question being decided. Volume is not the same as value.",
  },
  {
    title: "Safety and stability",
    why: "A child's safety — including the impact of any family violence — is central. Stability and continuity of care are also important for children.",
    nuance: "Stability doesn't mean nothing can change; it means change is considered in light of the child's needs.",
  },
  {
    title: "Parenting history",
    why: "The history of care for the child is a listed best-interests factor. Who has been meeting the child's day-to-day needs can be informative.",
    nuance: "History is one factor. It doesn't freeze arrangements forever, and both parents' future plans also matter.",
  },
  {
    title: "The applicable legal framework",
    why: "Whether the Divorce Act or Ontario legislation applies affects the forms, the court and some rules. Married or not, the date of separation and where the child lives can all matter.",
    nuance: "Many principles are shared, but details differ. Each Never After article states its jurisdiction.",
  },
];

export const notDecisive: MattersItem[] = [
  {
    title: "Which parent is angrier",
    why: "Strong emotion is understandable, but it isn't a legal test. Intensity of feeling doesn't, by itself, show what's best for a child.",
    nuance:
      "Behaviour driven by anger can become relevant if it affects the child — for example, conflict in front of the child or an inability to co-operate.",
  },
  {
    title: "Which parent sends more messages",
    why: "Message count doesn't decide anything. What matters is what communication shows about each parent's ability to co-operate and focus on the child.",
    nuance: "Communication behaviour can matter. Tone, content and responsiveness may be relevant to best-interests factors.",
  },
  {
    title: "Who believes they deserve equal time",
    why: "Parenting law is framed around the child's interests, not parental entitlement. There is no presumption of equal parenting time.",
    nuance: "A child should have as much time with each parent as is consistent with their best interests — which may or may not be equal.",
  },
  {
    title: "Unsupported accusations",
    why: "An allegation is a claim; evidence is what supports it. Unsupported allegations may carry little weight, and tactical allegations can backfire.",
    nuance:
      "Allegations — including of family violence — can be highly relevant when supported by evidence, and are taken seriously.",
  },
  {
    title: "Who wins an argument",
    why: "Family court is not a debate. Getting the last word in a dispute with the other parent rarely changes anything that matters to the decision.",
    nuance: "Choosing not to escalate can itself reflect the co-operation courts may consider.",
  },
];

/* ------------------------------------------------------------------ */
/*  RELEVANT OR NOT?                                                   */
/* ------------------------------------------------------------------ */
export type Scenario = {
  id: string;
  title: string;
  theme: "Parenting" | "Conduct" | "Process" | "Finances";
  issue: string;
  whyItMatters: string;
  evidence: string[];
  misunderstanding: string;
  sources: SourceKey[];
  article?: string;
};

export const scenarios: Scenario[] = [
  {
    id: "equal-time",
    title: "One parent wants equal parenting time.",
    theme: "Parenting",
    issue:
      "The issue is what parenting schedule is in the child's best interests. A request for equal time is a proposal to be assessed, not an entitlement.",
    whyItMatters:
      "Courts may consider the child's needs and stage of development, the history of care, practical logistics, and the parents' ability to communicate and co-operate. Both federal and Ontario law say a child should have as much time with each parent as is consistent with their best interests.",
    evidence: [
      "How care has been shared historically",
      "Distances between homes, school and work",
      "Work schedules and availability",
      "How the child has been doing under current arrangements",
    ],
    misunderstanding: "That 50/50 is the legal starting point. It is a common outcome, but not a presumption.",
    sources: ["clra", "divorceAct"],
    article: "is-50-50-parenting-time-automatic-in-ontario",
  },
  {
    id: "child-preference",
    title: "A child expresses a preference about where to live.",
    theme: "Parenting",
    issue: "The child's views and preferences are a best-interests factor, given due weight according to age and maturity.",
    whyItMatters:
      "A child's views may carry significant weight, particularly for older and more mature children. Weight may depend on how consistent and independent the views are, and on the reasons behind them.",
    evidence: [
      "Views gathered independently (for example, through the OCL or an assessment)",
      "Consistency of the child's views over time",
      "The child's reasons, in their own words where appropriate",
    ],
    misunderstanding: "That a child 'chooses' at a certain age. Ontario has no fixed age.",
    sources: ["clra", "ocl"],
    article: "how-much-weight-does-a-childs-opinion-carry",
  },
  {
    id: "primary-care",
    title: "One parent has historically provided most daily care.",
    theme: "Parenting",
    issue: "The history of care is a listed best-interests factor.",
    whyItMatters:
      "It can be informative about the child's attachments, routines and needs. Courts may also consider each parent's plans and abilities going forward, so history is not the only consideration.",
    evidence: [
      "Who handled school, medical appointments and routines",
      "Records such as school communications or calendars",
      "Information from neutral third parties where relevant",
    ],
    misunderstanding: "That the historical primary caregiver automatically keeps that role, or that history is irrelevant after separation.",
    sources: ["clra", "divorceAct"],
    article: "does-the-existing-parenting-schedule-matter",
  },
  {
    id: "unsupported-allegations",
    title: "A parent makes allegations without supporting evidence.",
    theme: "Conduct",
    issue:
      "The issue is whether the alleged facts are established and, if so, how they affect the child's best interests — particularly safety.",
    whyItMatters:
      "Serious allegations, including family violence, can be highly relevant and are taken seriously. Their impact generally depends on the evidence. Unsupported or tactical allegations may carry little weight and can affect how a court views the person making them.",
    evidence: [
      "First-hand accounts given under oath",
      "Contemporaneous records",
      "Records from third parties such as professionals, where available",
    ],
    misunderstanding:
      "Either that any allegation will be believed, or that allegations without documentary proof are meaningless. Credibility and the totality of the evidence matter.",
    sources: ["clra", "divorceAct", "familyLawRules"],
    article: "what-makes-evidence-relevant-in-family-court",
  },
  {
    id: "refuses-settlement",
    title: "A parent refuses a settlement proposal.",
    theme: "Process",
    issue: "Parties are not required to accept an offer. But the reasonableness of positions, and formal offers to settle, can matter.",
    whyItMatters:
      "Under the Family Law Rules, formal offers to settle can have consequences for costs later in the case. Courts may also consider a party's behaviour in the litigation when deciding costs.",
    evidence: ["Formal written offers to settle and their timing", "How the final result compares to offers made"],
    misunderstanding:
      "That refusing an offer is 'held against' someone in the parenting decision itself. Generally, its main relevance is to costs — but get advice on your situation.",
    sources: ["familyLawRules"],
    article: "what-happens-at-a-settlement-conference",
  },
  {
    id: "extracurricular",
    title: "Parents disagree about extracurricular activities.",
    theme: "Parenting",
    issue:
      "Depending on the activity, this may be a decision-making responsibility question (significant activities), a scheduling question, and/or a child-support question about sharing expenses.",
    whyItMatters:
      "Significant extracurricular activities are expressly listed as an area of decision-making responsibility. Whether a cost is shared as a special expense depends on factors like reasonableness, necessity and the parents' means.",
    evidence: [
      "The child's history of participation and interest",
      "Cost and how it compares to family means",
      "Impact on the parenting schedule",
    ],
    misunderstanding: "That the parent who enrolls the child can automatically require the other to pay half.",
    sources: ["clra", "ontarioCsg", "federalCsg"],
    article: "how-child-support-is-calculated-in-ontario",
  },
  {
    id: "missed-support",
    title: "A parent misses child support payments.",
    theme: "Finances",
    issue: "This is a support-enforcement issue. Child support and parenting time are legally separate.",
    whyItMatters:
      "Support orders in Ontario are generally enforced through the Family Responsibility Office. Missed payments generally do not justify withholding parenting time, and withheld parenting time generally does not justify stopping support.",
    evidence: ["The order or agreement", "Payment records", "FRO statements where applicable"],
    misunderstanding: "That a parent can stop parenting time to force payment — or stop paying to force parenting time.",
    sources: ["fro", "ontarioCsg"],
    article: "how-child-support-is-calculated-in-ontario",
  },
];

/* ------------------------------------------------------------------ */
/*  FIND YOUR STARTING POINT                                           */
/* ------------------------------------------------------------------ */
export type Pathway = {
  id: string;
  label: string;
  heading: string;
  intro: string;
  understand: string[];
  articles: string[];
  topics: string[]; // hrefs
  sources: SourceKey[];
};

export const pathways: Pathway[] = [
  {
    id: "thinking",
    label: "I'm thinking about separating.",
    heading: "Understanding before deciding",
    intro:
      "Learning how separation works doesn't commit you to anything. It can help you understand what questions may arise, and what information is worth organizing.",
    understand: [
      "The difference between separation and divorce",
      "Which laws may apply, depending on whether you're married",
      "The four core issue areas: parenting, child support, spousal support and property",
      "Why early legal advice can be valuable",
    ],
    articles: ["separation-vs-divorce-in-ontario", "is-50-50-parenting-time-automatic-in-ontario", "how-child-support-is-calculated-in-ontario"],
    topics: ["/family-law", "/support"],
    sources: ["ontarioFamilyLaw", "dojFamilyLaw", "lso", "stepsToJustice"],
  },
  {
    id: "recent",
    label: "I've recently separated.",
    heading: "The first months, one step at a time",
    intro:
      "Early decisions can shape what follows. This path focuses on understanding interim arrangements, financial disclosure, and how issues are typically resolved.",
    understand: [
      "Why the existing parenting arrangement can matter",
      "What financial information is typically disclosed",
      "Options for resolving issues: negotiation, mediation, court",
      "Time limits that can apply to some claims",
    ],
    articles: ["does-the-existing-parenting-schedule-matter", "separation-vs-divorce-in-ontario", "how-child-support-is-calculated-in-ontario"],
    topics: ["/family-law", "/parenting", "/support"],
    sources: ["ontarioFamilyLaw", "fla", "legalAid", "lso"],
  },
  {
    id: "parenting",
    label: "I'm trying to understand parenting arrangements.",
    heading: "How parenting decisions are framed",
    intro:
      "Parenting time and decision-making responsibility are decided around one question: the child's best interests. This path explains the language and the factors.",
    understand: [
      "Parenting time vs. decision-making responsibility",
      "The best-interests factors",
      "Why equal time is not automatic",
      "How children's views are heard",
    ],
    articles: [
      "is-50-50-parenting-time-automatic-in-ontario",
      "how-much-weight-does-a-childs-opinion-carry",
      "what-does-the-office-of-the-childrens-lawyer-actually-do",
    ],
    topics: ["/parenting"],
    sources: ["clra", "divorceAct", "ocl", "dojFamilyLaw"],
  },
  {
    id: "conflict",
    label: "I'm dealing with high-conflict communication.",
    heading: "Clarity in difficult communication",
    intro:
      "You can't control how someone else communicates. This path focuses on what you can control — and on understanding when communication becomes legally relevant.",
    understand: [
      "Why communication patterns may be considered",
      "Writing brief, factual, child-focused messages",
      "Documentation that helps rather than hurts",
      "When a communication issue is actually a safety issue",
    ],
    articles: [
      "child-focused-communication-in-high-conflict-separation",
      "what-makes-evidence-relevant-in-family-court",
      "does-the-existing-parenting-schedule-matter",
    ],
    topics: ["/high-conflict", "/evidence"],
    sources: ["divorceAct", "clra", "legalAid", "stepsToJustice"],
  },
  {
    id: "court",
    label: "I have an upcoming family court appearance.",
    heading: "Knowing what each step is for",
    intro:
      "Family court is a series of steps, each with a purpose. Understanding them can reduce anxiety and help you prepare clearly.",
    understand: [
      "Case conferences, settlement conferences and motions",
      "Disclosure and filing deadlines",
      "What makes evidence relevant and reliable",
      "Where to find official forms and court help",
    ],
    articles: [
      "what-happens-at-a-settlement-conference",
      "what-makes-evidence-relevant-in-family-court",
      "what-does-the-office-of-the-childrens-lawyer-actually-do",
    ],
    topics: ["/family-court", "/evidence"],
    sources: ["familyLawRules", "scjFamily", "ontarioCourtForms", "legalAid"],
  },
  {
    id: "money",
    label: "I'm trying to understand support or financial issues.",
    heading: "Support and finances, clearly",
    intro:
      "Child support is largely formula-based; spousal support starts with entitlement. Property division for married spouses follows its own framework.",
    understand: [
      "How child support table amounts work",
      "Special or extraordinary expenses",
      "Spousal support entitlement and the advisory guidelines",
      "How support is enforced in Ontario",
    ],
    articles: ["how-child-support-is-calculated-in-ontario", "separation-vs-divorce-in-ontario", "is-50-50-parenting-time-automatic-in-ontario"],
    topics: ["/support", "/family-law"],
    sources: ["federalCsg", "ontarioCsg", "fro", "dojFamilyLaw"],
  },
];
