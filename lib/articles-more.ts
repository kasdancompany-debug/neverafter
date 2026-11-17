import type { Article } from "./articles";

const EDITORIAL = "Never After Editorial Team";

/**
 * Second batch of explainers, targeted at common Ontario family-law searches.
 * All are editorial drafts pending review by an Ontario family-law professional.
 */
export const moreArticles: Article[] = [
  /* ------------------------------------------------------------------ DIVORCE & SEPARATION */
  {
    slug: "how-to-get-a-divorce-in-ontario",
    title: "How to Get a Divorce in Ontario: A Step-by-Step Overview",
    summary:
      "Who can apply, the one-year rule, simple versus joint applications, and what happens after the order — the divorce process in plain English.",
    category: "divorce-separation",
    author: EDITORIAL,
    published: "2026-11-14",
    reviewed: "2026-11-14",
    legalReview: "pending",
    jurisdiction: "Canada (Divorce Act); Ontario Superior Court of Justice procedure",
    keywords: ["how to get a divorce in Ontario", "divorce Ontario steps", "joint divorce Ontario", "uncontested divorce Ontario"],
    takeaways: [
      "Only married spouses divorce, and a divorce is granted by the Superior Court of Justice.",
      "The most common ground is living separate and apart for at least one year.",
      "A divorce generally takes effect 31 days after the order, and the court looks at child-support arrangements first.",
    ],
    sections: [
      {
        id: "before-you-start",
        heading: "Before you start",
        blocks: [
          "A divorce ends a marriage. It doesn't, by itself, decide parenting, support or property — although those issues can be dealt with in the same court case, or resolved separately by agreement. Many people sort out the practical issues first and apply for the divorce afterward.",
          "To apply in Ontario, at least one spouse has generally needed to live in Ontario for at least one year immediately before the application. Check the current requirements on the Ontario court forms and court websites.",
        ],
      },
      {
        id: "grounds",
        heading: "The grounds for divorce",
        blocks: [
          "Under the federal Divorce Act, the only ground for divorce is the breakdown of the marriage. Breakdown can be shown by:",
          {
            type: "list",
            items: [
              "living separate and apart for at least one year (by far the most common);",
              "adultery; or",
              "physical or mental cruelty that makes continued cohabitation intolerable.",
            ],
          },
          "You can file the application before the year is up if you're relying on separation, but the divorce can't be granted until the spouses have been separated for a full year.",
        ],
      },
      {
        id: "simple-or-joint",
        heading: "Simple or joint application",
        blocks: [
          { type: "h3", text: "Simple application" },
          "One spouse applies, and the other is served with the documents. It's commonly used when the other spouse won't co-operate, can't be found easily, or when only the divorce itself is being asked for.",
          { type: "h3", text: "Joint application" },
          "Both spouses apply together. No service is needed because both are applicants. It's often used when everything has already been agreed.",
          "If there are other claims — parenting, support or property — the application becomes a contested family case and follows the full Family Law Rules process of conferences and, if necessary, trial.",
        ],
      },
      {
        id: "the-steps",
        heading: "The usual steps for an uncontested divorce",
        blocks: [
          {
            type: "list",
            items: [
              "Complete the divorce application form and gather your marriage certificate (or proof of marriage).",
              "File the application with the Superior Court of Justice and pay the court fees.",
              "For a simple application, serve the other spouse and file proof of service; they have a set time to respond.",
              "If there's no response (or it's a joint application), file the supporting affidavit and a draft divorce order.",
              "A judge reviews the file. If satisfied, the divorce order is signed — usually without anyone attending court.",
              "The divorce generally takes effect 31 days later. You can then request a certificate of divorce.",
            ],
          },
          {
            type: "callout",
            title: "Children and the divorce",
            text: "The court must be satisfied that reasonable arrangements have been made for the support of any children of the marriage. If they haven't, the divorce can be put on hold. Include clear information about child support in your materials.",
          },
        ],
      },
      {
        id: "remarriage",
        heading: "After the divorce",
        blocks: [
          "You can't remarry until the divorce has taken effect. Keep the certificate of divorce with your important documents. A divorce may affect wills, beneficiary designations and some benefits — review them with a lawyer.",
          "Remember that time limits for some property claims are measured from the date of divorce. If property hasn't been resolved, get legal advice before the divorce is granted.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does a divorce take in Ontario?",
        a: "An uncontested divorce can take a few months from filing, depending on court workload. The one-year separation requirement and the 31-day waiting period after the order also affect timing. Contested cases take much longer.",
      },
      {
        q: "Do I need a lawyer to get divorced in Ontario?",
        a: "No. Many people file uncontested divorces themselves using the official forms. If there are disputes about children, support or property, legal advice is strongly recommended.",
      },
    ],
    sources: ["divorceAct", "ontarioCourtForms", "scjFamily", "ontarioFamilyLaw"],
    related: ["separation-vs-divorce-in-ontario", "what-is-a-separation-agreement-in-ontario", "representing-yourself-in-ontario-family-court"],
  },
  {
    slug: "what-is-a-separation-agreement-in-ontario",
    title: "What Is a Separation Agreement in Ontario?",
    summary:
      "A separation agreement can settle parenting, support and property without court. Here's what makes one valid — and what can put it at risk.",
    category: "divorce-separation",
    author: EDITORIAL,
    published: "2026-11-12",
    reviewed: "2026-11-12",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Act)",
    keywords: ["separation agreement Ontario", "separation agreement requirements", "independent legal advice separation agreement"],
    takeaways: [
      "A separation agreement is a domestic contract under Ontario's Family Law Act.",
      "It must be in writing, signed by both people and witnessed to be enforceable.",
      "Courts can set aside or override parts of an agreement in some circumstances — especially terms about children.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What it is",
        blocks: [
          "A separation agreement is a written contract between two people who have separated — married or not. It typically covers parenting time and decision-making responsibility, child support, spousal support, and the division of property and debts.",
          "Most separating couples in Ontario who resolve things without a trial record their arrangements this way. A good agreement gives both people — and the children — certainty.",
        ],
      },
      {
        id: "formal-requirements",
        heading: "Formal requirements",
        blocks: [
          "Under Ontario's Family Law Act, a domestic contract is unenforceable unless it is made in writing, signed by the parties and witnessed. A handshake deal or an exchange of texts is generally not enough.",
          {
            type: "callout",
            title: "Independent legal advice",
            text: "Each person getting advice from their own lawyer before signing isn't a formal requirement for every agreement, but it is strongly recommended. It helps show that both people understood what they were signing, which makes the agreement much harder to challenge later.",
          },
        ],
      },
      {
        id: "when-it-can-be-challenged",
        heading: "When an agreement can be challenged",
        blocks: [
          "A court may set aside an agreement, or a part of it, in certain circumstances, including where:",
          {
            type: "list",
            items: [
              "a party failed to disclose significant assets or debts that existed when the agreement was made;",
              "a party didn't understand the nature or consequences of the agreement; or",
              "there are other grounds under the general law of contracts (such as duress).",
            ],
          },
          "Terms about children are treated differently. A court can disregard a term about parenting or child support that isn't in the child's best interests, or that falls below the child support guidelines without a good reason. Spousal support terms can also be reviewed in some circumstances.",
        ],
      },
      {
        id: "what-to-include",
        heading: "What a thorough agreement usually covers",
        blocks: [
          {
            type: "list",
            items: [
              "The date of separation.",
              "Parenting time, decision-making responsibility, holidays, travel and how disagreements will be resolved.",
              "Child support, including special or extraordinary expenses and annual income disclosure.",
              "Spousal support, or a clear release of it.",
              "Division of property and debts, including the matrimonial home and pensions.",
              "Life insurance to secure support, and changes to beneficiary designations.",
              "How and when the agreement will be reviewed.",
            ],
          },
        ],
      },
      {
        id: "enforcing-it",
        heading: "Making support terms enforceable",
        blocks: [
          "Support terms in a separation agreement can be filed with the court and enforced like an order, including through the Family Responsibility Office. A lawyer can explain whether, and how, to do this.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do we need to be divorced to sign a separation agreement?",
        a: "No. Separation agreements are made by separated spouses before any divorce, and by unmarried partners who will never divorce.",
      },
      {
        q: "Can we write our own separation agreement?",
        a: "You can, but agreements drafted without legal advice are more likely to be incomplete or challenged later. Many people negotiate the terms themselves or with a mediator, then have lawyers draft or review the final agreement.",
      },
    ],
    sources: ["fla", "ontarioFamilyLaw", "stepsToJustice", "lso"],
    related: ["how-to-get-a-divorce-in-ontario", "equalization-of-net-family-property-explained", "parenting-plans-in-ontario-what-to-include"],
  },
  {
    slug: "common-law-separation-in-ontario",
    title: "Common-Law Separation in Ontario: What Rights Do Unmarried Partners Have?",
    summary:
      "Unmarried couples in Ontario have the same parenting and child-support rules as married couples — but very different property rules. Here's the difference.",
    category: "divorce-separation",
    author: EDITORIAL,
    published: "2026-11-05",
    reviewed: "2026-11-05",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Act, Children's Law Reform Act)",
    keywords: ["common law separation Ontario", "common law rights Ontario", "unmarried couple property Ontario", "common law spousal support"],
    takeaways: [
      "Parenting and child support work the same way whether or not parents were married.",
      "Unmarried partners can be entitled to spousal support if they meet the Family Law Act definition of spouse.",
      "Ontario's property equalization and matrimonial-home rules do not apply to unmarried partners.",
    ],
    sections: [
      {
        id: "the-myth",
        heading: "The common-law myth",
        blocks: [
          "Many people believe that after living together for a few years, unmarried partners in Ontario have the same rights as married spouses. For property, that's not the case. For children and support, the picture is different again — which is why it's worth separating the issues.",
        ],
      },
      {
        id: "children",
        heading: "Children: the same rules",
        blocks: [
          "Parenting arrangements for children of unmarried parents are made under Ontario's Children's Law Reform Act, using the same best-interests test and the same language — parenting time and decision-making responsibility. Child support is calculated under Ontario's Child Support Guidelines, which closely mirror the federal guidelines used in divorces.",
        ],
      },
      {
        id: "spousal-support",
        heading: "Spousal support: sometimes",
        blocks: [
          "For spousal support, Ontario's Family Law Act uses a broader definition of \"spouse\" that includes some unmarried partners — for example, people who have lived together continuously for at least three years, or who were in a relationship of some permanence and are the natural or adoptive parents of a child.",
          "Meeting the definition only opens the door. Entitlement, amount and duration are then decided on the same principles as for married spouses.",
        ],
      },
      {
        id: "property",
        heading: "Property: the big difference",
        blocks: [
          "Equalization of net family property applies only to married spouses. So do the special rules giving both spouses an equal right to possession of the matrimonial home. For unmarried partners, the starting point is generally who owns what.",
          "That doesn't always mean a partner leaves with nothing. Where one partner contributed to property owned by the other — through money or work — courts may provide a remedy under general legal principles, such as unjust enrichment. These claims are fact-specific and can be complex.",
          {
            type: "callout",
            title: "Time limits apply",
            text: "Claims like unjust enrichment, and claims for spousal support, can be subject to limitation periods. If you were in a long relationship and contributed to property in your partner's name, get legal advice promptly.",
          },
        ],
      },
      {
        id: "protecting-yourself",
        heading: "Protecting yourself while living together",
        blocks: [
          "A cohabitation agreement — a domestic contract made while living together — can set out how property and support will be handled if the relationship ends. Like other domestic contracts, it must be in writing, signed and witnessed, and independent legal advice is strongly recommended.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long do you have to live together to be common-law in Ontario?",
        a: "For spousal support under the Family Law Act, one route is living together continuously for at least three years; another is a relationship of some permanence where you are parents of a child together. Other laws (such as tax laws) use different definitions.",
      },
      {
        q: "Does my common-law partner get half the house in Ontario?",
        a: "Not automatically. Equalization and matrimonial-home rules apply only to married spouses. A partner who contributed to a home owned by the other may have a claim under general legal principles — get legal advice.",
      },
    ],
    sources: ["fla", "clra", "ontarioCsg", "stepsToJustice"],
    related: ["separation-vs-divorce-in-ontario", "the-matrimonial-home-in-ontario", "spousal-support-in-ontario-explained"],
  },
  {
    slug: "the-matrimonial-home-in-ontario",
    title: "The Matrimonial Home in Ontario: Who Gets to Stay?",
    summary:
      "Married spouses have special rights to the family home, regardless of whose name is on title. Here's how those rules work after separation.",
    category: "divorce-separation",
    author: EDITORIAL,
    published: "2026-10-30",
    reviewed: "2026-10-30",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Act, Part II)",
    keywords: ["matrimonial home Ontario", "who gets the house in a divorce Ontario", "exclusive possession Ontario"],
    takeaways: [
      "Both married spouses generally have an equal right to possess the matrimonial home, regardless of who owns it.",
      "One spouse generally can't sell or mortgage it without the other's consent or a court order.",
      "These rules apply to married spouses only.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What counts as the matrimonial home",
        blocks: [
          "Under Ontario's Family Law Act, a matrimonial home is property in which a person has an interest and that is (or, if the spouses have separated, was at the time of separation) ordinarily occupied by the spouses as their family residence. A couple can have more than one — a cottage used as a family residence may qualify too.",
        ],
      },
      {
        id: "possession",
        heading: "Equal right to possession",
        blocks: [
          "Both married spouses generally have an equal right to possession of a matrimonial home, regardless of whose name is on title. Separation doesn't change that by itself. Neither spouse can simply change the locks and exclude the other without a court order or agreement.",
          "A court can grant one spouse exclusive possession of the home for a period of time, considering factors such as the best interests of any children, any violence committed against the spouse or children, the financial positions of both spouses, and the availability of other accommodation.",
        ],
      },
      {
        id: "selling",
        heading: "Selling or mortgaging the home",
        blocks: [
          "One spouse generally cannot sell, mortgage or otherwise deal with a matrimonial home without the other spouse's consent, a release, or a court order — even if the home is only in their name.",
        ],
      },
      {
        id: "value",
        heading: "The home and equalization",
        blocks: [
          "The matrimonial home also has a special place in the equalization calculation. Normally, a spouse can deduct the value of property they brought into the marriage. That deduction generally isn't available for a matrimonial home that the spouse still owns at separation. This rule surprises many people and can make a significant difference.",
          {
            type: "callout",
            title: "Get advice before moving out",
            text: "Leaving the home doesn't end your rights to it, but it can have practical consequences — particularly for children's arrangements. Get legal information or advice before making major changes.",
          },
        ],
      },
    ],
    sources: ["fla", "ontarioFamilyLaw", "stepsToJustice"],
    related: ["equalization-of-net-family-property-explained", "common-law-separation-in-ontario", "does-the-existing-parenting-schedule-matter"],
  },
  {
    slug: "equalization-of-net-family-property-explained",
    title: "Equalization of Net Family Property in Ontario, Explained",
    summary:
      "Ontario doesn't usually divide each item a married couple owns. It shares the growth in each spouse's net worth. A worked example shows how.",
    category: "divorce-separation",
    author: EDITORIAL,
    published: "2026-10-23",
    reviewed: "2026-10-23",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Act, Part I)",
    keywords: ["equalization payment Ontario", "net family property Ontario", "property division divorce Ontario", "excluded property Ontario"],
    takeaways: [
      "Equalization shares the growth in net worth during the marriage, not each asset.",
      "Some property — such as certain gifts and inheritances — can be excluded.",
      "Strict time limits apply to equalization claims.",
    ],
    sections: [
      {
        id: "the-idea",
        heading: "The basic idea",
        blocks: [
          "Ontario's Family Law Act treats marriage as an economic partnership. When married spouses separate, each calculates their net family property (NFP). The spouse with the higher NFP generally pays the other half the difference. That payment is the equalization payment.",
          "Title doesn't change automatically. Each spouse keeps what they own; the payment balances things out.",
        ],
      },
      {
        id: "calculating-nfp",
        heading: "Calculating net family property",
        blocks: [
          {
            type: "list",
            items: [
              "Start with the value of everything you own on the valuation date (usually the date of separation).",
              "Subtract your debts and liabilities on that date.",
              "Subtract the net value of property you owned on the date of marriage — except the matrimonial home if you still own it at separation.",
              "Leave out excluded property, such as certain gifts or inheritances received from third parties during the marriage, if they can be traced.",
            ],
          },
          "If the result is negative, it's generally treated as zero.",
        ],
      },
      {
        id: "worked-example",
        heading: "A simplified example",
        blocks: [
          "Alex and Sam separate. On separation, Alex's assets minus debts equal $300,000; Alex brought $40,000 into the marriage (not a home). Alex's NFP is $260,000. Sam's assets minus debts equal $120,000, with $20,000 brought into the marriage, so Sam's NFP is $100,000.",
          "The difference is $160,000. Half of that is $80,000, so Alex would generally owe Sam an equalization payment of about $80,000.",
          {
            type: "callout",
            title: "An illustration only",
            text: "Real cases involve valuing pensions, businesses, tax consequences, disposition costs and disputed exclusions. Small changes in values or dates can change the result significantly.",
          },
        ],
      },
      {
        id: "unequal",
        heading: "Can it be unequal?",
        blocks: [
          "Courts can award an amount other than half in limited circumstances where an equal split would be unconscionable. This is an exceptional remedy, not a routine adjustment.",
        ],
      },
      {
        id: "time-limits",
        heading: "Time limits",
        blocks: [
          "Equalization claims are subject to time limits under the Family Law Act, measured from the date of divorce and the date of separation (and from death, in some cases). Missing them can end the claim. Get legal advice promptly if property hasn't been resolved.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is an inheritance divided in an Ontario divorce?",
        a: "An inheritance received from a third party during the marriage can be excluded from net family property if it can be traced — but not if it was put into the matrimonial home, and income from it may be treated differently. Get advice on your specific situation.",
      },
    ],
    sources: ["fla", "ontarioFamilyLaw", "stepsToJustice"],
    related: ["the-matrimonial-home-in-ontario", "what-is-a-separation-agreement-in-ontario", "financial-statements-in-ontario-family-court"],
  },

  /* ------------------------------------------------------------------ PARENTING */
  {
    slug: "parenting-plans-in-ontario-what-to-include",
    title: "Parenting Plans in Ontario: What to Include",
    summary:
      "A good parenting plan prevents arguments before they start. Here's what a thorough plan usually covers, and how plans relate to agreements and court orders.",
    category: "parenting",
    author: EDITORIAL,
    published: "2026-11-16",
    reviewed: "2026-11-16",
    legalReview: "pending",
    jurisdiction: "Ontario (Children's Law Reform Act) and Canada (Divorce Act)",
    keywords: ["parenting plan Ontario", "parenting plan template", "co-parenting plan", "parenting schedule Ontario"],
    takeaways: [
      "A parenting plan sets out parenting time, decision-making, communication and how disagreements are resolved.",
      "Courts can include a parenting plan in an order, with any changes needed for the child's best interests.",
      "Specific, practical plans usually cause fewer disputes than vague ones.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What a parenting plan is",
        blocks: [
          "A parenting plan is a written document setting out how separated parents will care for their children. Under both the Divorce Act and Ontario's Children's Law Reform Act, a court can include a parenting plan agreed to by the parents in a parenting order — subject to any changes needed for the child's best interests.",
          "A plan can also be part of a separation agreement, or simply a working document parents use day to day.",
        ],
      },
      {
        id: "what-to-include",
        heading: "What to include",
        blocks: [
          { type: "h3", text: "Parenting time" },
          "A regular schedule (for example, week-on/week-off or a 2-2-3 rotation), exchange times and locations, and who handles transportation.",
          { type: "h3", text: "Holidays and special days" },
          "Winter break, March Break, summer, statutory holidays, birthdays and cultural or religious days — and whether they alternate, are shared, or follow the regular schedule.",
          { type: "h3", text: "Decision-making responsibility" },
          "Who makes significant decisions about health, education, culture, language, religion and spirituality, and significant extracurricular activities — together, or by one parent after consulting the other.",
          { type: "h3", text: "Communication" },
          "How parents will communicate, expected response times, how information from schools and doctors is shared, and ground rules such as not speaking negatively about the other parent in front of the children.",
          { type: "h3", text: "Travel and relocation" },
          "Notice for travel, consent letters, who holds passports, and a reminder that relocation has specific legal notice requirements.",
          { type: "h3", text: "Resolving disagreements and reviewing the plan" },
          "Steps to follow before going to court — such as written discussion, then mediation — and when the plan will be reviewed as children grow.",
        ],
      },
      {
        id: "making-it-work",
        heading: "Making it work",
        blocks: [
          {
            type: "list",
            items: [
              "Be specific. \"Reasonable parenting time\" invites disagreement; \"Fridays from 5 p.m.\" doesn't.",
              "Plan for change. Children's needs at 4 are different from their needs at 14.",
              "Keep the child at the centre. Choose arrangements around school, activities and relationships, not around fairness between adults.",
              "Get legal advice before signing — especially if the plan will be part of an agreement or order.",
            ],
          },
          {
            type: "callout",
            title: "Build a draft",
            text: "Never After's Parenting Plan Studio walks you through each of these sections and produces a clear draft to discuss with the other parent, a mediator or a lawyer. Your plan stays on your device.",
          },
        ],
      },
    ],
    sources: ["clra", "divorceAct", "dojFamilyLaw"],
    related: ["is-50-50-parenting-time-automatic-in-ontario", "moving-with-children-after-separation-ontario", "parallel-parenting-when-co-parenting-isnt-working"],
  },
  {
    slug: "moving-with-children-after-separation-ontario",
    title: "Moving With Children After Separation: Relocation Rules in Ontario",
    summary:
      "Since 2021, federal and Ontario law have set out specific rules for relocating with a child — including written notice and who has to prove what.",
    category: "parenting",
    author: EDITORIAL,
    published: "2026-11-09",
    reviewed: "2026-11-09",
    legalReview: "pending",
    jurisdiction: "Canada (Divorce Act) and Ontario (Children's Law Reform Act)",
    keywords: ["relocation with child Ontario", "moving with kids after separation Ontario", "mobility rights Ontario", "relocation notice Ontario"],
    takeaways: [
      "A relocation is a move likely to have a significant impact on the child's relationship with another important person.",
      "Written notice in a set form, given well in advance, is generally required.",
      "Who must prove what can depend on how parenting time has been shared.",
    ],
    sections: [
      {
        id: "move-vs-relocation",
        heading: "A move versus a relocation",
        blocks: [
          "The law distinguishes an ordinary change of residence from a relocation. A relocation is a change in residence that is likely to have a significant impact on the child's relationship with a person who has parenting time, decision-making responsibility or contact. Moving across town may not be a relocation; moving to another city often will be.",
        ],
      },
      {
        id: "notice",
        heading: "Notice requirements",
        blocks: [
          "Both the Divorce Act and Ontario's Children's Law Reform Act require a person planning a relocation to give written notice, in the required form, well in advance — generally at least 60 days before the proposed move. The notice sets out the proposed date, the new address and proposals for how parenting arrangements could change.",
          "A person who receives notice and objects generally has a limited time to do so, using the required form or by starting a court application. A court can change or waive notice requirements in some situations, such as where there is a risk of family violence.",
        ],
      },
      {
        id: "how-courts-decide",
        heading: "How courts decide",
        blocks: [
          "Courts decide relocation disputes based on the child's best interests, plus additional factors such as the reasons for the move, its impact on the child, whether notice was given, any existing orders or agreements, and how reasonable the proposal is for changing parenting arrangements.",
          "The legislation also sets out who bears the burden of proof in some situations. Broadly, where the child spends substantially equal time with each parent, the parent who wants to move generally must show the move is in the child's best interests. Where the child spends the vast majority of time with the parent who wants to move, the other parent generally must show it isn't. In other cases, both parties share the burden.",
          {
            type: "callout",
            title: "Don't move first and ask later",
            text: "Moving without notice or agreement can harm your position and, more importantly, the child. Relocation rules are detailed and time-sensitive — get legal advice before making plans final.",
          },
        ],
      },
    ],
    sources: ["divorceAct", "clra", "dojFamilyLaw", "ontarioCourtForms"],
    related: ["parenting-plans-in-ontario-what-to-include", "does-the-existing-parenting-schedule-matter", "is-50-50-parenting-time-automatic-in-ontario"],
  },
  {
    slug: "what-is-a-parenting-assessment-in-ontario",
    title: "What Is a Parenting Assessment in Ontario?",
    summary:
      "In some parenting disputes, a court can order an assessment by a mental-health professional. Here's what assessments involve and how they're used.",
    category: "parenting",
    author: EDITORIAL,
    published: "2026-10-16",
    reviewed: "2026-10-16",
    legalReview: "pending",
    jurisdiction: "Ontario (Children's Law Reform Act)",
    keywords: ["parenting assessment Ontario", "custody assessment Ontario", "section 30 assessment"],
    takeaways: [
      "Ontario's Children's Law Reform Act allows courts to order an assessment of a child's needs and the parents' ability to meet them.",
      "Assessments are done by qualified professionals and usually involve interviews and observations.",
      "An assessment report is evidence; the judge makes the decision.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What an assessment is",
        blocks: [
          "In a parenting case, a court can appoint a person with technical or professional skill — often a psychologist or social worker — to assess and report on the needs of the child and the ability and willingness of the parties to meet those needs. In Ontario this is often called a \"section 30 assessment\", after the section of the Children's Law Reform Act that provides for it.",
          "Assessments are different from Office of the Children's Lawyer involvement, although both can bring information about the child before the court.",
        ],
      },
      {
        id: "what-happens",
        heading: "What usually happens",
        blocks: [
          {
            type: "list",
            items: [
              "Interviews with each parent, and often with the children.",
              "Observations of each parent with the children.",
              "Contact with collateral sources, such as teachers or doctors.",
              "Review of relevant documents.",
              "A written report with observations and, often, recommendations.",
            ],
          },
          "Assessments can take months and are often expensive. Courts consider cost when deciding whether to order one and how it will be paid for.",
        ],
      },
      {
        id: "how-its-used",
        heading: "How the report is used",
        blocks: [
          "An assessment report is evidence. Judges often give it significant weight, but they're not bound by it. A party who disagrees can challenge the methodology or conclusions, sometimes with the help of another expert.",
          {
            type: "callout",
            title: "Approaching an assessment",
            text: "Be honest, focus on the children's needs, and avoid coaching children. Assessors are experienced at recognizing when a child has been prepared — and it rarely helps.",
          },
        ],
      },
    ],
    sources: ["clra", "ocl", "ontarioFamilyLaw"],
    related: ["what-does-the-office-of-the-childrens-lawyer-actually-do", "how-much-weight-does-a-childs-opinion-carry", "what-makes-evidence-relevant-in-family-court"],
  },

  /* ------------------------------------------------------------------ HIGH CONFLICT */
  {
    slug: "parallel-parenting-when-co-parenting-isnt-working",
    title: "Parallel Parenting: When Co-Parenting Isn't Working",
    summary:
      "When direct co-operation keeps breaking down, parallel parenting reduces contact between parents while keeping children connected to both.",
    category: "high-conflict",
    author: EDITORIAL,
    published: "2026-11-02",
    reviewed: "2026-11-02",
    legalReview: "pending",
    jurisdiction: "General; best-interests factors under the Divorce Act and Children's Law Reform Act",
    keywords: ["parallel parenting", "parallel parenting plan Ontario", "high conflict co-parenting"],
    takeaways: [
      "Parallel parenting minimizes direct contact and joint decision-making between parents.",
      "It usually relies on detailed schedules, written communication and decision-making divided by subject.",
      "It's an informal term — what matters is whether the arrangement serves the child.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What parallel parenting is",
        blocks: [
          "In co-parenting, parents communicate often and make decisions together. In parallel parenting, each parent cares for the children independently during their own time, and contact between the parents is kept to a minimum.",
          "It isn't a legal category in Ontario legislation. It describes a style of arrangement that courts and parents sometimes use when ongoing conflict is harming children.",
        ],
      },
      {
        id: "features",
        heading: "Common features",
        blocks: [
          {
            type: "list",
            items: [
              "A detailed schedule that leaves little to negotiate.",
              "Exchanges at school or a neutral location, so parents don't have to meet.",
              "Written communication only — often through a co-parenting app — limited to the children's needs.",
              "Decision-making responsibility divided by subject (for example, one parent for education, the other for health), sometimes with a duty to inform or consult.",
              "A clear process, such as a parenting coordinator or mediation, for resolving disagreements.",
            ],
          },
        ],
      },
      {
        id: "is-it-right",
        heading: "Is it the right fit?",
        blocks: [
          "Parallel parenting can lower the temperature and protect children from conflict. It can also be a stepping stone: as tension eases, some parents move toward more co-operation.",
          "It's not a solution for safety concerns. Where there is family violence or coercive control, different protections may be needed, and legal advice is important.",
        ],
      },
    ],
    sources: ["divorceAct", "clra", "legalAid"],
    related: ["child-focused-communication-in-high-conflict-separation", "what-is-a-parenting-coordinator", "keeping-a-co-parenting-journal"],
  },
  {
    slug: "what-is-a-parenting-coordinator",
    title: "What Is a Parenting Coordinator?",
    summary:
      "Parenting coordinators help high-conflict parents implement a parenting plan and resolve day-to-day disputes — without going back to court each time.",
    category: "high-conflict",
    author: EDITORIAL,
    published: "2026-10-09",
    reviewed: "2026-10-09",
    legalReview: "pending",
    jurisdiction: "Ontario (general practice; family arbitration rules may apply)",
    keywords: ["parenting coordinator Ontario", "parenting coordination", "high conflict parenting dispute resolution"],
    takeaways: [
      "A parenting coordinator helps parents follow an existing parenting plan or order.",
      "The role usually starts with mediation and may include decision-making power by agreement.",
      "Where a parenting coordinator makes binding decisions, Ontario's family arbitration requirements can apply.",
    ],
    sections: [
      {
        id: "the-role",
        heading: "The role",
        blocks: [
          "A parenting coordinator is a professional — often with a background in law, mental health or social work — who helps parents implement an existing parenting plan or order. Typical issues include schedule changes, holiday details, extracurricular activities and communication problems.",
          "Parenting coordination doesn't usually decide the big questions, such as a major change in the parenting schedule. Its purpose is to resolve the steady stream of smaller disputes that can otherwise end up in court.",
        ],
      },
      {
        id: "how-it-works",
        heading: "How it usually works",
        blocks: [
          "Parents generally retain a parenting coordinator by agreement, sometimes encouraged by a court. The process usually starts with trying to help the parents agree. If they can't, and if the parents have agreed to give the coordinator that power, the coordinator may make a decision.",
          {
            type: "callout",
            title: "Binding decisions",
            text: "In Ontario, when a parenting coordinator makes binding decisions, the process may be considered family arbitration — which carries specific legal requirements, including independent legal advice and screening for power imbalances and family violence. Get legal advice on the agreement before signing.",
          },
        ],
      },
      {
        id: "cost",
        heading: "Cost and fit",
        blocks: [
          "Parenting coordinators are paid privately, usually shared between the parents. For families with frequent disputes, the cost can be lower than repeated court appearances — and much less harmful to children.",
        ],
      },
    ],
    sources: ["fla", "clra", "ontarioFamilyLaw"],
    related: ["parallel-parenting-when-co-parenting-isnt-working", "child-focused-communication-in-high-conflict-separation", "parenting-plans-in-ontario-what-to-include"],
  },
  {
    slug: "keeping-a-co-parenting-journal",
    title: "Keeping a Co-Parenting Journal: What to Record (and What Not To)",
    summary:
      "A factual record can help you — or hurt your credibility. How to keep notes that are useful, proportionate and focused on your children.",
    category: "evidence",
    author: EDITORIAL,
    published: "2026-09-26",
    reviewed: "2026-09-26",
    legalReview: "pending",
    jurisdiction: "General; Ontario family court practice",
    keywords: ["co-parenting journal", "documenting co-parenting", "parenting log for court", "how to document for family court"],
    takeaways: [
      "Useful notes are dated, factual and made at the time.",
      "Record what affects the children — not every frustration with the other parent.",
      "Very large volumes of notes can obscure what matters and suggest conflict.",
    ],
    sections: [
      {
        id: "why-keep-one",
        heading: "Why keep a record at all",
        blocks: [
          "Memories fade and blur, especially under stress. Notes made at the time are generally more reliable than recollections months later. A simple record also helps you see patterns clearly — and can help a lawyer understand your situation quickly.",
        ],
      },
      {
        id: "what-to-record",
        heading: "What to record",
        blocks: [
          {
            type: "list",
            items: [
              "Exchange times: scheduled versus actual, and anything notable.",
              "Missed or cancelled parenting time, and any notice given.",
              "Children's health, school and activity issues, and how they were handled.",
              "Significant incidents, described factually: date, time, who was present, what was said or done.",
              "Your own involvement: appointments attended, homework help, activities.",
            ],
          },
        ],
      },
      {
        id: "how-to-write",
        heading: "How to write entries",
        blocks: [
          { type: "h3", text: "Instead of:" },
          "\"He was late AGAIN and obviously doesn't care about the kids.\"",
          { type: "h3", text: "Write:" },
          "\"Fri Nov 7. Exchange scheduled 5:00 p.m. at school. Arrived 6:15 p.m. No message received. Children waited in the office.\"",
          "Facts can speak for themselves. Characterizations and diagnoses of the other parent tend to undermine your credibility.",
        ],
      },
      {
        id: "what-not-to-do",
        heading: "What not to do",
        blocks: [
          {
            type: "list",
            items: [
              "Don't involve the children — no questioning them about the other home for your notes.",
              "Don't record every minor annoyance; proportion matters.",
              "Don't secretly record conversations without legal advice — courts have expressed concern about the practice in family cases.",
              "Don't edit or delete messages; keep complete, original threads.",
            ],
          },
        ],
      },
    ],
    sources: ["familyLawRules", "stepsToJustice"],
    related: ["what-makes-evidence-relevant-in-family-court", "child-focused-communication-in-high-conflict-separation", "how-to-write-an-affidavit-for-family-court"],
  },

  /* ------------------------------------------------------------------ SUPPORT */
  {
    slug: "section-7-expenses-explained",
    title: "Section 7 Expenses: What Counts as a Special or Extraordinary Expense?",
    summary:
      "Child care, braces, tutoring, hockey, university — which costs are shared on top of table child support, and how the sharing usually works.",
    category: "support",
    author: EDITORIAL,
    published: "2026-11-11",
    reviewed: "2026-11-11",
    legalReview: "pending",
    jurisdiction: "Federal and Ontario Child Support Guidelines",
    keywords: ["section 7 expenses Ontario", "special and extraordinary expenses", "extracurricular activities child support", "child care costs child support"],
    takeaways: [
      "Section 7 expenses are shared in addition to the table amount of child support.",
      "Only listed categories qualify, and the expense must generally be necessary and reasonable.",
      "Costs are usually shared in proportion to income, after taxes, subsidies and benefits.",
    ],
    sections: [
      {
        id: "what-they-are",
        heading: "What section 7 expenses are",
        blocks: [
          "The table amount of child support is meant to cover a child's ordinary expenses. Section 7 of the Child Support Guidelines allows certain additional expenses to be shared between parents. The federal and Ontario guidelines are very similar on this point.",
        ],
      },
      {
        id: "categories",
        heading: "The categories",
        blocks: [
          {
            type: "list",
            items: [
              "Child-care expenses incurred because of a parent's employment, illness, disability or education.",
              "The portion of medical and dental insurance premiums attributable to the child.",
              "Health-related expenses not covered by insurance, such as orthodontics, counselling, prescription drugs and eyeglasses (subject to thresholds in the guidelines).",
              "Extraordinary expenses for primary or secondary education, or for programs that meet the child's particular needs.",
              "Expenses for post-secondary education.",
              "Extraordinary expenses for extracurricular activities.",
            ],
          },
        ],
      },
      {
        id: "the-tests",
        heading: "Necessary, reasonable — and sometimes extraordinary",
        blocks: [
          "To be shared, an expense generally must be necessary in relation to the child's best interests and reasonable given the means of the parents and child and the family's spending pattern before separation.",
          "For educational and extracurricular expenses, there's an extra hurdle: the expense must be \"extraordinary\". The guidelines define this by reference to the receiving parent's income and the table amount, and list factors such as the nature and number of activities and the child's particular needs.",
        ],
      },
      {
        id: "sharing",
        heading: "How the cost is shared",
        blocks: [
          "The usual approach is to share the net cost in proportion to each parent's income. Net cost means after taking into account subsidies, benefits and tax deductions or credits — for example, the tax treatment of child-care costs.",
          {
            type: "callout",
            title: "Avoid surprises",
            text: "Many disputes arise when one parent enrols a child in an expensive activity and then asks for half. Good agreements say whether consent is needed in advance, set limits, and explain how receipts are shared.",
          },
        ],
      },
    ],
    sources: ["federalCsg", "ontarioCsg", "dojFamilyLaw"],
    related: ["how-child-support-is-calculated-in-ontario", "child-support-after-18-in-ontario", "what-happens-if-child-support-isnt-paid"],
  },
  {
    slug: "spousal-support-in-ontario-explained",
    title: "Spousal Support in Ontario: Entitlement, Amount and Duration",
    summary:
      "Spousal support isn't automatic. It starts with entitlement, then turns to amount and duration — often guided by the Spousal Support Advisory Guidelines.",
    category: "support",
    author: EDITORIAL,
    published: "2026-10-28",
    reviewed: "2026-10-28",
    legalReview: "pending",
    jurisdiction: "Canada (Divorce Act) and Ontario (Family Law Act)",
    keywords: ["spousal support Ontario", "spousal support calculator Ontario", "how long does spousal support last Ontario", "SSAG"],
    takeaways: [
      "Entitlement comes first: compensatory, non-compensatory (need-based) or contractual.",
      "The Spousal Support Advisory Guidelines are widely used to estimate ranges, but they are not law.",
      "Support can be time-limited or indefinite, and can be varied when circumstances change.",
    ],
    sections: [
      {
        id: "which-law",
        heading: "Which law applies",
        blocks: [
          "Married spouses seeking a divorce generally claim spousal support under the federal Divorce Act. Otherwise — including for unmarried partners who meet the definition of spouse — claims are made under Ontario's Family Law Act. The principles are similar.",
        ],
      },
      {
        id: "entitlement",
        heading: "Entitlement",
        blocks: [
          "There are three recognized bases for entitlement:",
          {
            type: "list",
            items: [
              "Compensatory — to recognize economic advantages or disadvantages arising from the relationship, such as one spouse stepping back from their career to care for children.",
              "Non-compensatory (need-based) — where a spouse has financial need after the relationship ends, considering the means and needs of both.",
              "Contractual — where the spouses agreed to support in a domestic contract.",
            ],
          },
          "Under the Divorce Act, a court doesn't consider misconduct by either spouse when making a spousal support order.",
        ],
      },
      {
        id: "amount-duration",
        heading: "Amount and duration",
        blocks: [
          "Once entitlement is established, the Spousal Support Advisory Guidelines (SSAG) are commonly used to calculate ranges for amount and duration. There are different formulas depending on whether there are dependent children. The ranges depend on factors such as each spouse's income, the length of the relationship, and the ages involved.",
          "The guidelines are advisory, but courts frequently refer to them, and departures generally need to be explained. Specialized software is often used to run the calculations.",
        ],
      },
      {
        id: "changes",
        heading: "Changes and ending support",
        blocks: [
          "Support orders and agreements can generally be varied if there's a material change in circumstances — for example, a significant change in income, retirement, or the recipient becoming self-sufficient. Some arrangements are time-limited; others have no fixed end date but are subject to review.",
        ],
      },
    ],
    sources: ["divorceAct", "fla", "dojFamilyLaw", "fro"],
    related: ["common-law-separation-in-ontario", "how-child-support-is-calculated-in-ontario", "what-is-a-separation-agreement-in-ontario"],
  },
  {
    slug: "child-support-after-18-in-ontario",
    title: "Does Child Support End at 18 in Ontario?",
    summary:
      "Not necessarily. Support can continue for adult children in full-time education or who can't become independent — but the rules and calculation can change.",
    category: "support",
    author: EDITORIAL,
    published: "2026-10-12",
    reviewed: "2026-10-12",
    legalReview: "pending",
    jurisdiction: "Canada (Divorce Act) and Ontario (Family Law Act)",
    keywords: ["child support after 18 Ontario", "child support university Ontario", "does child support end at 18"],
    takeaways: [
      "The age of majority in Ontario is 18, but child support can continue beyond it.",
      "Common reasons include full-time education, illness or disability.",
      "For adult children, courts may adjust the usual table amount and consider the child's own contribution.",
    ],
    sections: [
      {
        id: "the-rule",
        heading: "The general rule",
        blocks: [
          "Child support doesn't automatically end on a child's 18th birthday. Under Ontario's Family Law Act, support can continue for an unmarried child who is enrolled in a full-time program of education. Under the Divorce Act, a \"child of the marriage\" includes an adult child who remains under the parents' charge and can't withdraw from that charge because of illness, disability or other cause — which often includes full-time studies.",
        ],
      },
      {
        id: "calculation",
        heading: "How the calculation can change",
        blocks: [
          "For a child at or over the age of majority, the guidelines allow a court to depart from the usual approach if it would be inappropriate — for example, when a child lives away at university for most of the year. Courts may consider the child's own means, such as part-time income, savings, scholarships or RESPs.",
          "Post-secondary costs are often handled as a section 7 expense, shared in proportion to income after the child's reasonable contribution.",
        ],
      },
      {
        id: "practical",
        heading: "Practical points",
        blocks: [
          {
            type: "list",
            items: [
              "Read your order or agreement — many set out exactly when and how support ends.",
              "Don't simply stop paying. If you believe support should end, get the order changed or an agreement in writing; FRO will keep enforcing an existing order.",
              "Share information: enrolment confirmations, tuition and the child's income often matter.",
            ],
          },
        ],
      },
    ],
    sources: ["fla", "divorceAct", "ontarioCsg", "federalCsg", "fro"],
    related: ["section-7-expenses-explained", "how-child-support-is-calculated-in-ontario", "what-happens-if-child-support-isnt-paid"],
  },
  {
    slug: "what-happens-if-child-support-isnt-paid",
    title: "What Happens If Child Support Isn't Paid in Ontario?",
    summary:
      "The Family Responsibility Office has significant enforcement powers. Here's how enforcement works — and why parenting time and support stay separate.",
    category: "support",
    author: EDITORIAL,
    published: "2026-09-29",
    reviewed: "2026-09-29",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Responsibility Office)",
    keywords: ["child support not paid Ontario", "FRO enforcement", "Family Responsibility Office", "support arrears Ontario"],
    takeaways: [
      "In Ontario, support orders are generally filed with the Family Responsibility Office (FRO) for enforcement.",
      "FRO can use a range of tools, including wage deductions and licence suspensions.",
      "Missed support doesn't justify withholding parenting time — and vice versa.",
    ],
    sections: [
      {
        id: "fro",
        heading: "The Family Responsibility Office",
        blocks: [
          "The Family Responsibility Office (FRO) is the Ontario government office that enforces child and spousal support orders. Support orders made by Ontario courts are generally filed with FRO automatically, and support terms in domestic contracts can be filed too. In some cases, parties can withdraw from FRO enforcement by agreement.",
        ],
      },
      {
        id: "tools",
        heading: "How FRO enforces support",
        blocks: [
          "FRO generally receives payments and passes them on. When payments are missed, it can use enforcement tools such as:",
          {
            type: "list",
            items: [
              "deducting support directly from wages or other income;",
              "intercepting certain federal payments, such as tax refunds;",
              "suspending a driver's licence, and in some cases taking steps affecting a passport;",
              "reporting to credit bureaus;",
              "registering against property; and",
              "court proceedings for default.",
            ],
          },
          "Check FRO's official information for current tools and processes.",
        ],
      },
      {
        id: "if-you-cant-pay",
        heading: "If you can't pay",
        blocks: [
          "If your income has genuinely changed, the right step is to seek a change to the order (a variation) or agreement — not to stop paying. Arrears generally keep accumulating until the order is changed, and courts can be reluctant to reduce arrears retroactively.",
        ],
      },
      {
        id: "parenting-time",
        heading: "Support and parenting time are separate",
        blocks: [
          "A parent who isn't receiving support shouldn't withhold parenting time, and a parent who is being denied parenting time shouldn't stop paying support. Each problem has its own remedy. Mixing them tends to harm children and can damage a parent's credibility in court.",
        ],
      },
    ],
    sources: ["fro", "ontarioCsg", "ontarioFamilyLaw"],
    related: ["how-child-support-is-calculated-in-ontario", "child-support-after-18-in-ontario", "section-7-expenses-explained"],
  },

  /* ------------------------------------------------------------------ FAMILY COURT */
  {
    slug: "representing-yourself-in-ontario-family-court",
    title: "Representing Yourself in Ontario Family Court: Practical Tips",
    summary:
      "Many people go to family court without a lawyer. These practical tips can help you prepare, stay organized and present your case clearly.",
    category: "family-court",
    author: EDITORIAL,
    published: "2026-11-15",
    reviewed: "2026-11-15",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Rules)",
    keywords: ["self represented family court Ontario", "representing yourself family court Ontario", "family court without a lawyer Ontario"],
    takeaways: [
      "You can represent yourself in Ontario family court; many people do.",
      "Organization, deadlines and complete disclosure matter as much as argument.",
      "Limited-scope legal help can make a big difference at key moments.",
    ],
    sections: [
      {
        id: "get-help-anyway",
        heading: "Use the help that exists",
        blocks: [
          "Representing yourself doesn't mean doing it alone. Family Law Information Centres (FLICs) at many courthouses provide information; duty counsel may be available to eligible people on court days; and many lawyers offer limited-scope services — help with a specific step, such as preparing for a settlement conference or reviewing an affidavit.",
        ],
      },
      {
        id: "get-organized",
        heading: "Get organized from day one",
        blocks: [
          {
            type: "list",
            items: [
              "Keep one binder (or folder) with tabs: court documents, financial disclosure, correspondence, your notes and a timeline.",
              "Keep a calendar of every deadline and court date. Missing a deadline can have serious consequences.",
              "Keep copies of everything you file and serve, with proof of service.",
              "Write a one-page timeline of key events and dates.",
            ],
          },
        ],
      },
      {
        id: "forms-and-rules",
        heading: "Forms, rules and service",
        blocks: [
          "Family cases follow the Family Law Rules. Use the current forms from Ontario Court Forms, read the instructions carefully, and check whether documents must be served on the other party — and how — before they're filed. Courts may also have local practice directions; ask the court office or FLIC.",
        ],
      },
      {
        id: "writing",
        heading: "Writing for the court",
        blocks: [
          "Judges read a lot. Clear, short, factual documents are more persuasive than long ones. In affidavits, stick to facts you know first-hand, use dates, attach key documents as exhibits, and avoid insults or speculation about the other party's motives.",
        ],
      },
      {
        id: "in-the-courtroom",
        heading: "In the courtroom or conference",
        blocks: [
          {
            type: "list",
            items: [
              "Arrive early, dress neutrally, and turn off your phone.",
              "Address the judge as \"Your Honour\" (or as directed). Stand when speaking if others do.",
              "Don't interrupt. Make notes and respond when it's your turn.",
              "Start with what you're asking for, then the key reasons — briefly.",
              "Focus on the children's needs and the evidence, not on winning arguments.",
              "Bring copies of your documents for yourself, the judge and the other party.",
            ],
          },
          "Many hearings and conferences now take place virtually. Test your technology in advance, choose a quiet private space, and make sure children can't overhear.",
        ],
      },
      {
        id: "settlement",
        heading: "Keep settlement in view",
        blocks: [
          "Most family cases settle. Formal offers to settle can affect legal costs later, so consider making realistic offers in writing. A judge's view at a settlement conference can be valuable information, even when it isn't what you hoped to hear.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I get a lawyer for just part of my case?",
        a: "Yes. Many Ontario lawyers offer limited-scope (unbundled) services for specific steps. The Law Society of Ontario's referral service can help you find a lawyer for an initial free consultation.",
      },
    ],
    sources: ["familyLawRules", "ontarioCourtForms", "scjFamily", "legalAid", "lso", "stepsToJustice"],
    related: ["what-happens-at-a-case-conference", "how-to-write-an-affidavit-for-family-court", "what-happens-at-a-settlement-conference"],
  },
  {
    slug: "what-happens-at-a-case-conference",
    title: "What Happens at a Case Conference in Ontario Family Court?",
    summary:
      "The case conference is usually your first meeting with a judge. Here's what it's for, how to prepare, and what you can expect.",
    category: "family-court",
    author: EDITORIAL,
    published: "2026-11-07",
    reviewed: "2026-11-07",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Rules)",
    keywords: ["case conference Ontario", "case conference brief", "first court date family court Ontario"],
    takeaways: [
      "A case conference is usually the first time parties meet with a judge in a family case.",
      "Its purpose is to explore settlement, identify issues, organize disclosure and plan next steps.",
      "Parties file case conference briefs beforehand, within deadlines set by the rules.",
    ],
    sections: [
      {
        id: "purpose",
        heading: "What it's for",
        blocks: [
          "Under the Family Law Rules, a case conference is a meeting with a judge whose purposes include exploring the chances of settling, identifying the issues that are and aren't in dispute, making sure there is disclosure of relevant evidence, and setting a timetable and next steps. The judge can also make some orders, including procedural orders and, in some cases, temporary orders on consent.",
        ],
      },
      {
        id: "before",
        heading: "Before the conference",
        blocks: [
          {
            type: "list",
            items: [
              "Each party serves and files a case conference brief, using the required form, by the deadlines in the rules.",
              "Where support or property is in issue, financial statements and disclosure must be provided.",
              "In many cases, parties must have attended the Mandatory Information Program.",
              "Think about what you want from the conference: agreements on some issues, a disclosure list, a timetable, or a referral to mediation or the Office of the Children's Lawyer.",
            ],
          },
          "Generally, a party can't bring a motion before a case conference has been held — except in urgent situations or cases of hardship.",
        ],
      },
      {
        id: "on-the-day",
        heading: "On the day",
        blocks: [
          "Conferences are usually informal compared with a trial. The judge has read the briefs and will discuss the issues with both parties. You won't usually give evidence, but you'll be asked to explain your position. Be concise and focus on what matters most.",
          {
            type: "callout",
            title: "Leave with a plan",
            text: "Make sure you understand what was agreed, what disclosure is due and when, and what the next step is. Write it down before you leave.",
          },
        ],
      },
    ],
    sources: ["familyLawRules", "ontarioCourtForms", "scjFamily"],
    related: ["what-happens-at-a-settlement-conference", "representing-yourself-in-ontario-family-court", "what-is-the-mandatory-information-program"],
  },
  {
    slug: "what-is-the-mandatory-information-program",
    title: "What Is the Mandatory Information Program (MIP)?",
    summary:
      "Most people in Ontario family cases must attend the MIP early on. What it covers, who has to go, and why it's more useful than it sounds.",
    category: "family-court",
    author: EDITORIAL,
    published: "2026-09-19",
    reviewed: "2026-09-19",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Rules)",
    keywords: ["mandatory information program Ontario", "MIP family court", "MIP certificate"],
    takeaways: [
      "The MIP is an information session that parties in many Ontario family cases must attend.",
      "It covers the effects of separation, the court process and alternatives to court.",
      "Attendance is usually required before the first case conference.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What the MIP is",
        blocks: [
          "The Mandatory Information Program (MIP) is a session for parties in many Ontario family cases. It explains the impact of separation on adults and children, options for resolving issues outside court, and how the family court process works. Each party attends separately.",
          "Some cases are exempt — for example, uncontested divorces and some cases where only certain claims are made. Check the current rules or ask the court office.",
        ],
      },
      {
        id: "when",
        heading: "When to attend",
        blocks: [
          "The applicant generally attends within a set period after starting the case, and the respondent within a set period after being served. You'll usually need proof of attendance before your first case conference. Sessions are commonly available online.",
        ],
      },
      {
        id: "why-it-helps",
        heading: "Why it's worth paying attention",
        blocks: [
          "The MIP can feel like a formality, but it's a useful map of the process, the community resources available, and alternatives such as mediation. Many people find it changes their sense of what's realistic.",
        ],
      },
    ],
    sources: ["familyLawRules", "ontarioFamilyLaw", "scjFamily"],
    related: ["what-happens-at-a-case-conference", "representing-yourself-in-ontario-family-court", "how-to-get-a-divorce-in-ontario"],
  },
  {
    slug: "how-to-bring-a-motion-in-ontario-family-court",
    title: "Bringing a Motion in Ontario Family Court: An Overview",
    summary:
      "Motions ask the court for an order on a specific issue before the case ends. When they're used, what's needed, and how to keep them focused.",
    category: "family-court",
    author: EDITORIAL,
    published: "2026-10-02",
    reviewed: "2026-10-02",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Rules)",
    keywords: ["motion family court Ontario", "temporary order Ontario family court", "urgent motion family court Ontario"],
    takeaways: [
      "A motion asks for an order on a specific issue, often a temporary one, while the case continues.",
      "Generally, a case conference must be held first, unless the matter is urgent or involves hardship.",
      "Evidence on motions is usually given by affidavit.",
    ],
    sections: [
      {
        id: "what-a-motion-is",
        heading: "What a motion is",
        blocks: [
          "A motion is a request to the court for an order on a particular issue during a case. Common examples are temporary parenting schedules, temporary child or spousal support, financial disclosure orders and procedural orders.",
          "Temporary orders can shape the rest of a case. That's one reason courts encourage parties to resolve issues by agreement where possible.",
        ],
      },
      {
        id: "timing",
        heading: "Timing and urgency",
        blocks: [
          "Under the Family Law Rules, a party generally can't bring a motion until a case conference has been held on the main issues, unless the court finds the situation urgent, there is hardship, or a conference isn't required for another reason. Urgency usually means something that can't wait — for example, a risk to a child's safety or a child being removed from the province.",
        ],
      },
      {
        id: "the-materials",
        heading: "The materials",
        blocks: [
          "Motions generally involve a notice of motion (setting out what you're asking for), a supporting affidavit with your evidence, and any required forms such as financial statements. The other party can respond with their own affidavit. Use the current court forms and follow service and filing deadlines carefully.",
          {
            type: "callout",
            title: "Keep it focused",
            text: "Ask for specific orders. Put the most important facts first. Attach key documents as exhibits. Judges hearing motions often have limited time — clarity is persuasive.",
          },
        ],
      },
      {
        id: "costs",
        heading: "Costs",
        blocks: [
          "Courts can order the unsuccessful party on a motion to pay some of the other party's legal costs. Reasonable behaviour, and any offers to settle that were made, can affect costs decisions.",
        ],
      },
    ],
    sources: ["familyLawRules", "ontarioCourtForms", "scjFamily"],
    related: ["how-to-write-an-affidavit-for-family-court", "what-happens-at-a-case-conference", "does-the-existing-parenting-schedule-matter"],
  },

  /* ------------------------------------------------------------------ EVIDENCE */
  {
    slug: "financial-statements-in-ontario-family-court",
    title: "Financial Statements in Ontario Family Court: Form 13 vs. Form 13.1",
    summary:
      "If support or property is in issue, you'll need a sworn financial statement and supporting documents. Which form, what to include and why completeness matters.",
    category: "evidence",
    author: EDITORIAL,
    published: "2026-11-03",
    reviewed: "2026-11-03",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Rules)",
    keywords: ["Form 13 Ontario", "Form 13.1 financial statement", "financial disclosure family court Ontario"],
    takeaways: [
      "Form 13 is generally used when support is claimed without property claims; Form 13.1 when property is also in issue.",
      "Financial statements are sworn — they are evidence, and must be accurate and complete.",
      "Supporting documents, such as tax returns and notices of assessment, are usually required too.",
    ],
    sections: [
      {
        id: "which-form",
        heading: "Which form?",
        blocks: [
          "Under the Family Law Rules, a party in a case involving support or property generally must serve and file a sworn financial statement. Form 13 is generally used where a claim involves support but not property; Form 13.1 is used where there are property claims (with or without support), because it includes the information needed for equalization. Check the current rules and form instructions to confirm which applies.",
        ],
      },
      {
        id: "whats-in-it",
        heading: "What's in a financial statement",
        blocks: [
          {
            type: "list",
            items: [
              "Income from all sources.",
              "Monthly expenses.",
              "Assets and debts — and, on Form 13.1, values on the date of marriage and the valuation date.",
              "Property you say is excluded from equalization.",
            ],
          },
        ],
      },
      {
        id: "supporting-documents",
        heading: "Supporting documents",
        blocks: [
          "The rules also require supporting documents, commonly including income tax returns and notices of assessment for the past three years, recent pay information, and, where relevant, statements for accounts, pensions and debts, and business records. Property claims usually require documents showing values on the relevant dates.",
          {
            type: "callout",
            title: "Disclosure is not optional",
            text: "Incomplete or late disclosure is one of the most common reasons family cases are delayed, and it can lead to costs and other consequences. It also undermines your credibility. Start gathering documents early.",
          },
        ],
      },
      {
        id: "updating",
        heading: "Keeping it current",
        blocks: [
          "Financial statements generally need to be updated before conferences and trial if information has changed or a certain amount of time has passed. Check the rules for the timing that applies to each step.",
        ],
      },
    ],
    sources: ["familyLawRules", "ontarioCourtForms", "scjFamily"],
    related: ["equalization-of-net-family-property-explained", "how-child-support-is-calculated-in-ontario", "what-happens-at-a-case-conference"],
  },
  {
    slug: "how-to-write-an-affidavit-for-family-court",
    title: "How to Write an Affidavit for Ontario Family Court",
    summary:
      "Affidavits are how most family-court evidence reaches a judge. How to write one that's clear, factual and persuasive — and the mistakes to avoid.",
    category: "evidence",
    author: EDITORIAL,
    published: "2026-10-20",
    reviewed: "2026-10-20",
    legalReview: "pending",
    jurisdiction: "Ontario (Family Law Rules)",
    keywords: ["how to write an affidavit Ontario", "affidavit family court Ontario", "affidavit tips family law"],
    takeaways: [
      "An affidavit is sworn or affirmed evidence — accuracy matters.",
      "Stick to facts, in numbered paragraphs, in a logical order.",
      "Where you rely on what someone else told you, the rules generally require you to identify the source.",
    ],
    sections: [
      {
        id: "what-it-is",
        heading: "What an affidavit is",
        blocks: [
          "An affidavit is a written statement of facts that you swear or affirm is true before a person authorized to take affidavits, such as a lawyer or commissioner. In family court, affidavits are the main way evidence is presented on motions and in many other steps. Making a false statement in an affidavit is serious.",
        ],
      },
      {
        id: "structure",
        heading: "A clear structure",
        blocks: [
          {
            type: "list",
            items: [
              "Use the court's affidavit form and numbered paragraphs, one main point per paragraph.",
              "Start with who you are and your relationship to the case.",
              "Tell events in date order, using headings if it's long.",
              "Attach important documents as exhibits, referred to in the text (\"Attached as Exhibit A is…\").",
              "End with what you're asking the court to do, if appropriate.",
            ],
          },
        ],
      },
      {
        id: "facts-not-argument",
        heading: "Facts, not argument",
        blocks: [
          "Affidavits should set out facts you know. They are not the place for legal argument, insults, or guesses about the other party's motives. Compare:",
          { type: "h3", text: "Less effective" },
          "\"She is a selfish, unstable person who has never put the children first.\"",
          { type: "h3", text: "More effective" },
          "\"Between September 1 and October 31, 2026, the children missed school on eight days during the respondent's parenting time. Attached as Exhibit B is the school attendance record.\"",
        ],
      },
      {
        id: "information-and-belief",
        heading: "Information from others",
        blocks: [
          "Sometimes you'll want to include information someone else told you. The Family Law Rules generally allow this in some circumstances if you identify the source of the information and state that you believe it — but this evidence can carry less weight, and there are limits on its use. First-hand evidence from the person who saw or heard something is usually better.",
        ],
      },
      {
        id: "length",
        heading: "Length and tone",
        blocks: [
          "Shorter is usually stronger. Some courts have page limits for affidavits on motions. A calm, child-focused tone makes it easier for a judge to trust your account.",
        ],
      },
    ],
    sources: ["familyLawRules", "ontarioCourtForms", "stepsToJustice"],
    related: ["what-makes-evidence-relevant-in-family-court", "how-to-bring-a-motion-in-ontario-family-court", "keeping-a-co-parenting-journal"],
  },
];
