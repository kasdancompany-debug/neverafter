import type { SourceKey } from "./site";
import type { TopicSlug } from "./topics";
import { moreArticles } from "./articles-more";

/**
 * Article content model.
 *
 * Designed to map cleanly onto a headless CMS (Sanity, Contentful, Payload, etc.):
 * every field is plain serialisable data and the body is a portable array of blocks.
 * Swap the `articles` array for a CMS fetch inside lib/content.ts — pages only use those helpers.
 */
export type Block =
  | string
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "h3"; text: string };

export type ArticleSection = { id: string; heading: string; blocks: Block[] };

export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: TopicSlug;
  author: string;
  published: string; // ISO date
  reviewed: string; // last editorial review, ISO date
  legalReview: "pending" | "complete";
  jurisdiction: string;
  keywords: string[];
  takeaways: string[];
  sections: ArticleSection[];
  sources: SourceKey[];
  related?: string[];
  /** Short Q&A pairs rendered as "Quick answers" and as FAQPage structured data. */
  faqs?: { q: string; a: string }[];
};

const EDITORIAL = "Never After Editorial Team";

const coreArticles: Article[] = [
  {
    slug: "is-50-50-parenting-time-automatic-in-ontario",
    title: "Is 50/50 Parenting Time Automatic in Ontario?",
    summary:
      "Equal parenting time is common and often workable — but it is not a legal presumption. Here's what the law actually says, and why the distinction matters.",
    category: "parenting",
    author: EDITORIAL,
    published: "2026-11-10",
    reviewed: "2026-11-10",
    legalReview: "pending",
    jurisdiction: "Ontario (Children's Law Reform Act) and Canada (Divorce Act)",
    keywords: ["50/50 parenting Ontario", "equal parenting time", "joint custody Ontario", "parenting time"],
    takeaways: [
      "Neither the Divorce Act nor Ontario's Children's Law Reform Act creates a presumption of equal parenting time.",
      "Both laws say a child should have as much time with each parent as is consistent with the child's best interests.",
      "Equal schedules are made by agreement or ordered by courts in many families — based on the specific child's circumstances.",
    ],
    sections: [
      {
        id: "short-answer",
        heading: "The short answer",
        blocks: [
          "No. In Ontario, there is no rule that parenting time starts at 50/50 and must be justified downward. The only test for a parenting order is the best interests of the child.",
          "That said, equal or near-equal schedules are common, and many separated parents agree to them. The point is not that equal time is disfavoured — it's that it is not automatic.",
        ],
      },
      {
        id: "what-the-law-says",
        heading: "What the law actually says",
        blocks: [
          "Both the federal Divorce Act (for married spouses in divorce proceedings) and Ontario's Children's Law Reform Act (for most other parenting cases in Ontario) contain a principle that a child should have as much time with each parent as is consistent with the child's best interests.",
          "This is sometimes called the 'maximum parenting time' principle. It encourages meaningful time with both parents — but it is explicitly limited by the child's best interests. It does not set a number.",
          {
            type: "callout",
            title: "Terminology",
            text: "Since March 1, 2021, both laws use 'parenting time' and 'decision-making responsibility' instead of 'custody' and 'access'. You will still see the older words in everyday conversation and in older cases.",
          },
        ],
      },
      {
        id: "what-courts-may-consider",
        heading: "What courts may consider",
        blocks: [
          "When parents cannot agree, courts weigh the best-interests factors in the legislation. Those that often bear on scheduling include:",
          {
            type: "list",
            items: [
              "The child's age, stage of development and particular needs.",
              "The history of care — who has done what, and how the child has been doing.",
              "Practical realities, such as the distance between homes and school, and each parent's work schedule.",
              "Each parent's ability and willingness to communicate and co-operate about the child.",
              "The child's views and preferences, weighed according to age and maturity.",
              "Any family violence and its impact on the child and on the ability to co-parent safely.",
            ],
          },
          "None of these factors automatically decides a case. Their weight depends on the particular child and family.",
        ],
      },
      {
        id: "common-misunderstandings",
        heading: "Common misunderstandings",
        blocks: [
          { type: "h3", text: "'Equal rights means equal time.'" },
          "Parents may both have strong, legitimate relationships with their child. But parenting law is framed around the child's interests rather than parental entitlement.",
          { type: "h3", text: "'If I ask for 50/50, I'll look more reasonable.'" },
          "A proposal is more persuasive when it is clearly connected to the child's needs and to a realistic plan — school routes, work hours, transitions — than when it is chosen as a starting position.",
          { type: "h3", text: "'Child support disappears at 50/50.'" },
          "Shared parenting time (at least 40% each) can change how child support is calculated, but it does not automatically eliminate it. See our explainer on how child support is calculated.",
        ],
      },
      {
        id: "practical-questions",
        heading: "Questions worth thinking through",
        blocks: [
          {
            type: "list",
            items: [
              "What would a typical school week look like for the child under each proposed schedule?",
              "How many transitions between homes would the child have, and how would they happen?",
              "How would the parents communicate about homework, medical appointments and activities?",
              "What happens during holidays, summer and special occasions?",
            ],
          },
          "A licensed Ontario family lawyer can explain how these questions apply to your specific circumstances.",
        ],
      },
    ],
    sources: ["divorceAct", "clra", "dojFamilyLaw", "ontarioFamilyLaw"],
    related: [
      "does-the-existing-parenting-schedule-matter",
      "how-much-weight-does-a-childs-opinion-carry",
      "how-child-support-is-calculated-in-ontario",
    ],
  },
  {
    slug: "what-does-the-office-of-the-childrens-lawyer-actually-do",
    title: "What Does the Office of the Children's Lawyer Actually Do?",
    summary:
      "The OCL can give children a voice in Ontario parenting disputes. Here's how involvement is requested, what services it may provide, and what its role is not.",
    category: "parenting",
    author: EDITORIAL,
    published: "2026-11-03",
    reviewed: "2026-11-03",
    legalReview: "pending",
    jurisdiction: "Ontario",
    keywords: ["Office of the Children's Lawyer Ontario", "OCL", "children's lawyer", "OCL report"],
    takeaways: [
      "The Office of the Children's Lawyer (OCL) is part of Ontario's Ministry of the Attorney General.",
      "In parenting cases, a court can request OCL involvement; the OCL decides whether to accept.",
      "The OCL does not represent either parent. Its services focus on the child.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What the OCL is",
        blocks: [
          "The Office of the Children's Lawyer is an Ontario government office that, among other things, can represent children in certain court proceedings, including some family-law cases involving parenting time and decision-making responsibility.",
          "It is not a parent's lawyer, and it is not an advocate for one side. Its involvement is focused on the child.",
        ],
      },
      {
        id: "how-it-gets-involved",
        heading: "How the OCL becomes involved",
        blocks: [
          "In a family case, a judge can make an order requesting that the OCL become involved. Parties usually provide information to support the request. The OCL then reviews the case and decides whether to accept it — involvement is not automatic, and not every request is accepted.",
          {
            type: "callout",
            title: "Good to know",
            text: "Because the OCL has discretion, it's worth understanding the current intake process and timelines from the OCL's official page before relying on its involvement in your planning.",
          },
        ],
      },
      {
        id: "services",
        heading: "What it may provide",
        blocks: [
          "Depending on the case, OCL involvement may take different forms. In general terms:",
          {
            type: "list",
            items: [
              "Legal representation: a lawyer is assigned to represent the child in the proceeding. The child's lawyer is not the lawyer for either parent.",
              "A clinical investigation: a clinician (often a social worker) investigates and prepares a report for the court about the child's needs and the circumstances of the case.",
              "A combination: a lawyer assisted by a clinician.",
            ],
          },
          "In some cases, a more limited report focused on the child's views and preferences may be available. Check the OCL's official information for current services.",
        ],
      },
      {
        id: "what-it-is-not",
        heading: "What OCL involvement is not",
        blocks: [
          {
            type: "list",
            items: [
              "It is not a decision. A report is evidence the court considers alongside everything else; the judge decides.",
              "It is not a way to 'get the child on your side'. Attempting to influence what a child tells the OCL can seriously harm a child — and is likely to be noticed.",
              "It is not instant. Involvement can take time, which can affect the timing of a case.",
            ],
          },
          "Parties who disagree with a report generally have a limited opportunity to respond. A lawyer can explain the current process and deadlines.",
        ],
      },
    ],
    sources: ["ocl", "clra", "ontarioFamilyLaw"],
    related: [
      "how-much-weight-does-a-childs-opinion-carry",
      "is-50-50-parenting-time-automatic-in-ontario",
      "what-happens-at-a-settlement-conference",
    ],
  },
  {
    slug: "how-much-weight-does-a-childs-opinion-carry",
    title: "How Much Weight Does a Child's Opinion Carry?",
    summary:
      "Children's views matter in Ontario parenting decisions — but there is no magic age, and their views are one part of a wider best-interests analysis.",
    category: "parenting",
    author: EDITORIAL,
    published: "2026-10-27",
    reviewed: "2026-10-27",
    legalReview: "pending",
    jurisdiction: "Ontario (Children's Law Reform Act) and Canada (Divorce Act)",
    keywords: ["child's preference custody Ontario", "what age can a child choose", "child's views and preferences"],
    takeaways: [
      "There is no fixed age at which a child decides where to live in Ontario.",
      "Courts consider a child's views and preferences, giving due weight to age and maturity.",
      "How a child's views reach the court — and whether they are independent — affects their weight.",
    ],
    sections: [
      {
        id: "no-magic-age",
        heading: "There is no magic age",
        blocks: [
          "A persistent myth is that at 12 (or 14, or 16) a child 'gets to choose'. Ontario law does not set an age. Instead, both the Divorce Act and the Children's Law Reform Act list the child's views and preferences as a best-interests factor, giving due weight to the child's age and maturity, unless they cannot be ascertained.",
          "In practice, the views of older and more mature children often carry considerable weight, partly because arrangements that ignore a teenager's clear wishes can be difficult to make work. But they remain one factor among many.",
        ],
      },
      {
        id: "what-affects-weight",
        heading: "What can affect the weight given",
        blocks: [
          {
            type: "list",
            items: [
              "Maturity — whether the child understands the situation and the consequences.",
              "Consistency — whether the views are stable over time.",
              "Independence — whether the views appear to be the child's own, or shaped by pressure from an adult.",
              "Reasons — whether the child can explain their views, and whether the reasons relate to their well-being.",
              "Safety — a child's stated wishes don't override concerns about their physical, emotional or psychological safety.",
            ],
          },
        ],
      },
      {
        id: "how-views-reach-court",
        heading: "How a child's views reach the court",
        blocks: [
          "Children usually do not testify in family court. Their views may come before the court through, for example:",
          {
            type: "list",
            items: [
              "Involvement of the Office of the Children's Lawyer.",
              "A court-ordered assessment by a mental-health professional.",
              "In some cases, a judge meeting with the child.",
              "Evidence from parents or others — though a parent's account of what a child said can raise reliability and hearsay concerns.",
            ],
          },
        ],
      },
      {
        id: "protecting-children",
        heading: "Protecting children from the pressure",
        blocks: [
          "Many children find it distressing to be asked to choose between parents. Giving children a voice is different from giving them the burden of a decision.",
          {
            type: "callout",
            title: "A child-focused approach",
            text: "Children can be reassured that their feelings matter and will be heard, without being asked to pick a side or report on the other household.",
          },
        ],
      },
    ],
    sources: ["clra", "divorceAct", "ocl", "dojFamilyLaw"],
    related: [
      "what-does-the-office-of-the-childrens-lawyer-actually-do",
      "is-50-50-parenting-time-automatic-in-ontario",
      "what-makes-evidence-relevant-in-family-court",
    ],
  },
  {
    slug: "what-happens-at-a-settlement-conference",
    title: "What Happens at a Settlement Conference?",
    summary:
      "A settlement conference is not a trial. It is a structured opportunity — with a judge's input — to resolve issues. Here's how to understand it.",
    category: "family-court",
    author: EDITORIAL,
    published: "2026-10-20",
    reviewed: "2026-10-20",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Rules)",
    keywords: ["settlement conference Ontario", "family court Ontario", "settlement conference brief"],
    takeaways: [
      "Settlement conferences are designed to resolve issues — or narrow them — before trial.",
      "The judge may give an opinion about the likely outcome to help parties evaluate their positions.",
      "Preparation, including briefs and offers to settle, is required and has deadlines.",
    ],
    sections: [
      {
        id: "purpose",
        heading: "What it's for",
        blocks: [
          "Under Ontario's Family Law Rules, a settlement conference is a meeting with a judge whose purposes include exploring the chances of settling, settling or narrowing the issues, ensuring disclosure is complete, and planning for any trial.",
          "It usually comes after a case conference and before a trial management conference. It is not a hearing at which evidence is tested and a final decision imposed.",
        ],
      },
      {
        id: "what-happens",
        heading: "What usually happens",
        blocks: [
          "Each party files a settlement conference brief in advance, setting out the issues and their proposed resolution. Offers to settle are typically exchanged. At the conference, the judge reviews the materials and discusses the issues with the parties and their lawyers.",
          "A distinctive feature: the judge may provide a view about how the issues are likely to be decided if they go to trial. This is intended to help parties make informed decisions — it is not a ruling on the case.",
          {
            type: "callout",
            title: "Confidentiality",
            text: "Settlement discussions are generally confidential, and the judge who conducts a settlement conference generally does not hear the trial of those issues. Check the current Family Law Rules or ask a lawyer for the specifics.",
          },
        ],
      },
      {
        id: "preparing",
        heading: "Preparing well",
        blocks: [
          {
            type: "list",
            items: [
              "Know the deadlines for serving and filing your brief and confirmations — they are set by the Rules and may be affected by local practice.",
              "Make sure financial disclosure is complete and up to date where support or property is in issue.",
              "Write a realistic offer to settle. Offers can have cost consequences later.",
              "Identify the specific issues still in dispute, and what information would help resolve them.",
            ],
          },
        ],
      },
      {
        id: "mindset",
        heading: "A useful mindset",
        blocks: [
          "Settlement conferences tend to be most useful when parties approach them as a chance to evaluate options rather than to 'win' the conference. Hearing an independent judicial view can be uncomfortable, but it can also bring clarity and save significant time, money and stress.",
        ],
      },
    ],
    sources: ["familyLawRules", "scjFamily", "ontarioCourtForms", "ontarioFamilyLaw"],
    related: [
      "what-makes-evidence-relevant-in-family-court",
      "does-the-existing-parenting-schedule-matter",
      "separation-vs-divorce-in-ontario",
    ],
  },
  {
    slug: "does-the-existing-parenting-schedule-matter",
    title: "Does the Existing Parenting Schedule Matter?",
    summary:
      "The arrangement children have been living with can be important — especially for temporary orders. But how it came about, and how the child is doing, matter too.",
    category: "parenting",
    author: EDITORIAL,
    published: "2026-10-13",
    reviewed: "2026-10-13",
    legalReview: "pending",
    jurisdiction: "Ontario (Children's Law Reform Act) and Canada (Divorce Act)",
    keywords: ["status quo parenting Ontario", "temporary parenting order", "history of care"],
    takeaways: [
      "The history of care is a listed best-interests factor in both federal and Ontario law.",
      "Courts can be cautious about disrupting a stable arrangement on a temporary basis.",
      "An arrangement created unilaterally, or very recently, may be given less weight.",
    ],
    sections: [
      {
        id: "why-it-can-matter",
        heading: "Why the current arrangement can matter",
        blocks: [
          "Stability is important for children. The history of care for the child is one of the factors courts must consider under both the Divorce Act and the Children's Law Reform Act.",
          "On motions for temporary orders — which are decided before a full trial and often on written evidence — courts may be reluctant to make major changes to an arrangement that appears to be working for the child, unless there is a reason to do so.",
        ],
      },
      {
        id: "when-less-weight",
        heading: "When it may carry less weight",
        blocks: [
          "The existing arrangement is not decisive in itself. Its significance may be reduced where, for example:",
          {
            type: "list",
            items: [
              "One parent created it by unilaterally withholding the child from the other parent.",
              "It has only existed for a short time.",
              "It was understood by both parents to be temporary.",
              "There is evidence it is not meeting the child's needs.",
            ],
          },
          "These are general observations. How they apply depends heavily on the facts.",
        ],
      },
      {
        id: "practical-implication",
        heading: "A practical implication",
        blocks: [
          "Because early arrangements can influence what follows, it's sensible to get legal information or advice early — before agreeing to, or creating, an arrangement after separation.",
          {
            type: "callout",
            title: "Not a reason to escalate",
            text: "Understanding that the existing schedule can matter is not a reason to restrict a child's time with the other parent to gain an advantage. That approach can harm children, and courts may view it negatively.",
          },
        ],
      },
    ],
    sources: ["clra", "divorceAct", "familyLawRules"],
    related: [
      "is-50-50-parenting-time-automatic-in-ontario",
      "what-happens-at-a-settlement-conference",
      "child-focused-communication-in-high-conflict-separation",
    ],
  },
  {
    slug: "what-makes-evidence-relevant-in-family-court",
    title: "What Makes Evidence Relevant in Family Court?",
    summary:
      "Not everything that feels important carries the same legal significance. A plain-English look at relevance, reliability, and weight.",
    category: "evidence",
    author: EDITORIAL,
    published: "2026-10-06",
    reviewed: "2026-10-06",
    legalReview: "pending",
    jurisdiction: "Ontario",
    keywords: ["evidence family court Ontario", "affidavit family court", "relevant evidence"],
    takeaways: [
      "Relevant evidence tends to make a fact that matters to the decision more or less likely.",
      "Even relevant evidence is weighed according to how reliable it is.",
      "Focused, factual evidence is usually more useful than large volumes of material.",
    ],
    sections: [
      {
        id: "relevance",
        heading: "Relevance: connected to the question",
        blocks: [
          "In law, evidence is relevant when it has some tendency to prove or disprove a fact that matters to the issue being decided. In parenting cases, the central issue is the child's best interests. So the useful question is often: how does this information relate to the child?",
          "A former partner's rudeness toward you may be painful and real. It may become relevant if it affects the child — for example, if it happens in front of the child, or shows an inability to co-operate on the child's needs.",
        ],
      },
      {
        id: "reliability",
        heading: "Reliability and weight",
        blocks: [
          "Courts don't just ask whether evidence is relevant; they decide how much weight to give it. Weight may depend on:",
          {
            type: "list",
            items: [
              "Source — first-hand observation is generally stronger than second-hand reports.",
              "Timing — records made at the time are generally more reliable than recollections months later.",
              "Consistency — whether it fits with other evidence.",
              "Completeness — a full message thread is more reliable than a selected screenshot.",
              "Corroboration — whether independent sources support it.",
            ],
          },
        ],
      },
      {
        id: "affidavits",
        heading: "Affidavits: facts, not arguments",
        blocks: [
          "Much family-court evidence is presented in affidavits — sworn or affirmed written statements. Affidavits are generally meant to set out facts, not argument or opinion. Where a statement is based on information from someone else, the rules typically require identifying the source and stating that you believe it.",
          "Affidavits filled with characterizations ('he is a narcissist', 'she is a terrible mother') tend to be less persuasive than specific, dated facts.",
        ],
      },
      {
        id: "allegations",
        heading: "Allegations need support",
        blocks: [
          "Serious allegations, including family violence, can be highly relevant and are taken seriously. Their impact generally depends on the evidence supporting them. Unsupported allegations, or allegations that appear tactical, may carry little weight — and may affect the court's view of the person making them.",
          {
            type: "callout",
            title: "If you have safety concerns",
            text: "Don't wait to 'build a file' if you or a child are at risk. Contact emergency services where there is immediate danger, and seek legal advice.",
          },
        ],
      },
    ],
    sources: ["familyLawRules", "eLaws", "scjFamily", "stepsToJustice"],
    related: [
      "child-focused-communication-in-high-conflict-separation",
      "what-happens-at-a-settlement-conference",
      "how-much-weight-does-a-childs-opinion-carry",
    ],
  },
  {
    slug: "separation-vs-divorce-in-ontario",
    title: "Separation vs. Divorce in Ontario: What's the Difference?",
    summary:
      "Separation is a change in your relationship. Divorce is a court order. Understanding the difference helps clarify what needs to happen — and when.",
    category: "divorce-separation",
    author: EDITORIAL,
    published: "2026-09-29",
    reviewed: "2026-09-29",
    legalReview: "pending",
    jurisdiction: "Ontario and Canada (Divorce Act, Family Law Act)",
    keywords: ["divorce in Ontario", "separation Ontario", "how to get divorced in Ontario"],
    takeaways: [
      "There is no government registration of separation in Ontario, but the date of separation can matter legally.",
      "Only married spouses divorce, and a divorce is granted by a court.",
      "Property, support and parenting can be resolved before — or without — a divorce.",
    ],
    sections: [
      {
        id: "separation",
        heading: "Separation",
        blocks: [
          "Spouses are generally considered separated when they live separate and apart with no reasonable prospect of resuming cohabitation. In some circumstances, people can be separated while still living under the same roof.",
          "There is no form to file to become 'legally separated' in Ontario. The date of separation can nonetheless be important — for example, it is the valuation date for property division between married spouses under the Family Law Act.",
        ],
      },
      {
        id: "divorce",
        heading: "Divorce",
        blocks: [
          "A divorce ends a marriage. It is granted by the Superior Court of Justice under the federal Divorce Act. The most common ground is that the spouses have lived separate and apart for at least one year. A divorce application can be simple (one spouse applies) or joint.",
          "A divorce order generally takes effect 31 days after it is made. Courts also look at whether reasonable arrangements have been made for child support.",
        ],
      },
      {
        id: "unmarried",
        heading: "If you weren't married",
        blocks: [
          "Unmarried partners don't divorce. Their parenting issues are usually addressed under Ontario's Children's Law Reform Act, and support under the Family Law Act. Ontario's statutory property-equalization scheme applies to married spouses; unmarried partners may need to rely on other legal principles for property claims.",
        ],
      },
      {
        id: "time-limits",
        heading: "Time limits worth knowing about",
        blocks: [
          "Some family-law claims have limitation periods. For example, under the Family Law Act, a married spouse's claim for equalization of net family property is generally subject to time limits measured from the date of divorce or separation. These rules have exceptions and details that matter — get legal advice promptly rather than relying on a general summary.",
        ],
      },
    ],
    sources: ["divorceAct", "fla", "clra", "ontarioFamilyLaw", "dojFamilyLaw"],
    related: [
      "how-child-support-is-calculated-in-ontario",
      "what-happens-at-a-settlement-conference",
      "is-50-50-parenting-time-automatic-in-ontario",
    ],
  },
  {
    slug: "how-child-support-is-calculated-in-ontario",
    title: "How Child Support Is Calculated in Ontario",
    summary:
      "Table amounts, income, special expenses and shared parenting — a clear walk-through of the child support guidelines and where people often go wrong.",
    category: "support",
    author: EDITORIAL,
    published: "2026-09-22",
    reviewed: "2026-09-22",
    legalReview: "pending",
    jurisdiction: "Ontario Child Support Guidelines and Federal Child Support Guidelines",
    keywords: ["child support Ontario", "child support calculator Ontario", "section 7 expenses"],
    takeaways: [
      "The base 'table amount' depends on the paying parent's income and number of children.",
      "Special or extraordinary expenses may be shared in proportion to income.",
      "Shared parenting (40%+) can change the calculation but does not automatically eliminate support.",
    ],
    sections: [
      {
        id: "which-guidelines",
        heading: "Which guidelines apply",
        blocks: [
          "Divorcing spouses use the Federal Child Support Guidelines. Most other Ontario cases use Ontario's Child Support Guidelines. The two are closely aligned, and both rely on the same federal tables of amounts.",
        ],
      },
      {
        id: "table-amount",
        heading: "The table amount",
        blocks: [
          "In a typical arrangement where a child lives primarily with one parent, the other parent pays the table amount — a monthly figure based on their annual income, the number of children, and the province where the paying parent lives.",
          "Income is determined using rules in the guidelines, generally starting from the income reported on a tax return, with some adjustments. Courts can also impute income in certain circumstances, such as intentional under-employment.",
        ],
      },
      {
        id: "special-expenses",
        heading: "Special or extraordinary expenses",
        blocks: [
          "Some expenses may be added to the table amount and shared between parents, generally in proportion to their incomes. They can include:",
          {
            type: "list",
            items: [
              "Child-care expenses incurred because of a parent's employment, illness, disability or education.",
              "Certain health-related expenses not covered by insurance.",
              "Some extraordinary educational and extracurricular expenses.",
              "Post-secondary education expenses.",
            ],
          },
          "Whether an expense qualifies depends on factors such as necessity, reasonableness and the parents' means.",
        ],
      },
      {
        id: "shared-and-split",
        heading: "Shared and split parenting",
        blocks: [
          "Where each parent has a child at least 40% of the time over a year, the guidelines provide a different approach. It considers each parent's table amount, the increased costs of shared arrangements, and the circumstances of each parent and child. It's often more complicated than simply 'offsetting' two table amounts.",
          "Where each parent has one or more children living primarily with them, a 'split' calculation may apply.",
        ],
      },
      {
        id: "changes-and-enforcement",
        heading: "Changes, disclosure and enforcement",
        blocks: [
          "Support can be varied when circumstances change. Agreements and orders commonly require annual income disclosure. In Ontario, support orders are generally enforced through the Family Responsibility Office.",
          {
            type: "callout",
            title: "Official calculator",
            text: "The Department of Justice Canada provides an online look-up for table amounts. Treat it as a starting point: the right income figure and any special expenses can change the outcome.",
          },
        ],
      },
    ],
    sources: ["ontarioCsg", "federalCsg", "fro", "dojFamilyLaw"],
    related: [
      "is-50-50-parenting-time-automatic-in-ontario",
      "separation-vs-divorce-in-ontario",
      "what-happens-at-a-settlement-conference",
    ],
  },
  {
    slug: "child-focused-communication-in-high-conflict-separation",
    title: "Child-Focused Communication in a High-Conflict Separation",
    summary:
      "How to write messages that are brief, factual and easier to stand behind — and why communication patterns can matter in parenting decisions.",
    category: "high-conflict",
    author: EDITORIAL,
    published: "2026-09-15",
    reviewed: "2026-09-15",
    legalReview: "pending",
    jurisdiction: "General (Canada); best-interests factors under the Divorce Act and Children's Law Reform Act",
    keywords: ["high-conflict co-parenting", "co-parenting communication", "high-conflict separation Ontario"],
    takeaways: [
      "Courts may consider each parent's ability and willingness to communicate and co-operate about the child.",
      "The volume of messages matters less than what they show.",
      "Brief, factual, neutral messages are easier to send — and easier to stand behind later.",
    ],
    sections: [
      {
        id: "why-it-matters",
        heading: "Why communication can matter legally",
        blocks: [
          "Among the best-interests factors in both federal and Ontario law is each person's ability and willingness to communicate and co-operate on matters affecting the child. Another is each parent's willingness to support the child's relationship with the other parent.",
          "That doesn't mean the parent who sends more messages is 'winning' — or losing. It means the content and tone of communication can become evidence of how parents are able to work together for a child.",
        ],
      },
      {
        id: "principles",
        heading: "Principles for child-focused messages",
        blocks: [
          {
            type: "list",
            items: [
              "Brief — say what's needed and stop.",
              "Factual — dates, times, places, needs. Not characterizations.",
              "Neutral — no sarcasm, blame or history lessons.",
              "Child-centred — tie the message to the child's needs.",
              "Clear about what's needed — if you need an answer, say by when.",
            ],
          },
        ],
      },
      {
        id: "example",
        heading: "An example",
        blocks: [
          { type: "h3", text: "Instead of:" },
          "'Once again you've ignored the schedule. You never think about anyone but yourself. Maya was in tears because you forgot her recital AGAIN.'",
          { type: "h3", text: "Consider:" },
          "'Maya's recital is Thursday at 6:30 p.m. at the school gym. It falls during your time. Can you confirm by Tuesday whether you'll take her? If not, I can.'",
          "The second message gives the other parent the information they need, invites a response, and would be easy to stand behind if it were ever read by a third party.",
        ],
      },
      {
        id: "boundaries",
        heading: "Boundaries are allowed",
        blocks: [
          "You do not have to respond to every provocation, or immediately. Many parents set expectations such as communicating in writing only, using a co-parenting app, or responding within a set time except in emergencies.",
          {
            type: "callout",
            title: "When communication feels unsafe",
            text: "If communication involves threats, harassment or coercive control, this is no longer simply a communication-style issue. Seek legal advice and support, and contact emergency services if anyone is in immediate danger.",
          },
        ],
      },
    ],
    sources: ["divorceAct", "clra", "legalAid", "stepsToJustice"],
    related: [
      "what-makes-evidence-relevant-in-family-court",
      "does-the-existing-parenting-schedule-matter",
      "how-much-weight-does-a-childs-opinion-carry",
    ],
  },
];

export const articles: Article[] = [...coreArticles, ...moreArticles];

export const featuredArticleSlugs = [
  "is-50-50-parenting-time-automatic-in-ontario",
  "what-does-the-office-of-the-childrens-lawyer-actually-do",
  "how-much-weight-does-a-childs-opinion-carry",
  "what-happens-at-a-settlement-conference",
  "does-the-existing-parenting-schedule-matter",
  "what-makes-evidence-relevant-in-family-court",
];
