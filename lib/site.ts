export const site = {
  name: "Never After",
  wordmark: "NEVER AFTER",
  tagline: "The fairytale ends. Life doesn't.",
  secondaryTagline: "Less conflict. More clarity.",
  descriptor: "Divorce, Separation & Family Law — Explained.",
  description:
    "Plain-English education on Ontario family law, divorce, separation, parenting time, decision-making responsibility, support and the family court process.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.neverafter.ca").replace(/\/$/, ""),
  locale: "en_CA",
  jurisdiction: "Ontario, Canada",
  contactEmail: "hello@neverafter.ca", // Placeholder inbox — confirm before launch.
  disclaimer:
    "Never After provides general legal information and educational resources. It is not a law firm and does not provide legal advice or representation.",
} as const;

export type NavItem = { label: string; href: string; description?: string };

export const mainNav: NavItem[] = [
  { label: "Start Here", href: "/start-here", description: "A guided way into the right topics." },
  { label: "Family Law", href: "/family-law", description: "How Ontario family law fits together." },
  { label: "Parenting & Custody", href: "/parenting", description: "Parenting time and decision-making." },
  { label: "High-Conflict Separation", href: "/high-conflict", description: "Communication, boundaries, process." },
  { label: "Resources", href: "/resources", description: "Guides and toolkits." },
  { label: "Articles", href: "/articles", description: "The full library." },
  { label: "About", href: "/about", description: "Mission and standards." },
];

export const footerNav: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Learn",
    links: [
      { label: "Start Here", href: "/start-here" },
      { label: "Family Law", href: "/family-law" },
      { label: "Parenting & Decision-Making", href: "/parenting" },
      { label: "High-Conflict Separation", href: "/high-conflict" },
      { label: "Child & Spousal Support", href: "/support" },
      { label: "Family Court Process", href: "/family-court" },
      { label: "Evidence & Documentation", href: "/evidence" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Parenting Plan Studio", href: "/parenting-plan-studio" },
      { label: "Find Your Starting Point", href: "/start-here" },
      { label: "Relevant or Not?", href: "/relevant-or-not" },
      { label: "Articles", href: "/articles" },
      { label: "Resources", href: "/resources" },
      { label: "Pricing", href: "/pricing" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    heading: "Never After",
    links: [
      { label: "About Never After", href: "/about" },
      { label: "Editorial Standards", href: "/editorial-standards" },
      { label: "For Professionals", href: "/partners" },
      { label: "Your Access", href: "/access" },
      { label: "Contact", href: "/contact" },
      { label: "Legal Disclaimer", href: "/legal-disclaimer" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
];

/**
 * Official and authoritative sources referenced across the site.
 * Keep this list as the single source of truth so link checks are easy.
 * URLs checked November 17, 2026 (lso.ca blocks automated checks; verify manually) — re-verify before launch and periodically.
 */
export const officialSources = {
  ontarioFamilyLaw: {
    label: "Family law services",
    publisher: "Government of Ontario",
    url: "https://www.ontario.ca/page/family-law-services",
  },
  ocl: {
    label: "Office of the Children's Lawyer",
    publisher: "Government of Ontario",
    url: "https://www.ontario.ca/page/office-childrens-lawyer",
  },
  fro: {
    label: "Child and spousal support (including the Family Responsibility Office)",
    publisher: "Government of Ontario",
    url: "https://www.ontario.ca/page/child-and-spousal-support",
  },
  eLaws: {
    label: "Ontario e-Laws (statutes and regulations)",
    publisher: "Government of Ontario",
    url: "https://www.ontario.ca/laws",
  },
  clra: {
    label: "Children's Law Reform Act, R.S.O. 1990, c. C.12",
    publisher: "Ontario e-Laws",
    url: "https://www.ontario.ca/laws/statute/90c12",
  },
  fla: {
    label: "Family Law Act, R.S.O. 1990, c. F.3",
    publisher: "Ontario e-Laws",
    url: "https://www.ontario.ca/laws/statute/90f03",
  },
  familyLawRules: {
    label: "Family Law Rules, O. Reg. 114/99",
    publisher: "Ontario e-Laws",
    url: "https://www.ontario.ca/laws/regulation/990114",
  },
  ontarioCsg: {
    label: "Child Support Guidelines, O. Reg. 391/97",
    publisher: "Ontario e-Laws",
    url: "https://www.ontario.ca/laws/regulation/970391",
  },
  divorceAct: {
    label: "Divorce Act, R.S.C. 1985, c. 3 (2nd Supp.)",
    publisher: "Justice Laws Website (Canada)",
    url: "https://laws-lois.justice.gc.ca/eng/acts/d-3.4/",
  },
  federalCsg: {
    label: "Federal Child Support Guidelines, SOR/97-175",
    publisher: "Justice Laws Website (Canada)",
    url: "https://laws-lois.justice.gc.ca/eng/regulations/SOR-97-175/",
  },
  dojFamilyLaw: {
    label: "Family law",
    publisher: "Department of Justice Canada",
    url: "https://www.justice.gc.ca/eng/fl-df/",
  },
  ontarioCourtForms: {
    label: "Family Law Rules forms",
    publisher: "Ontario Court Forms",
    url: "https://ontariocourtforms.on.ca/en/family-law-rules-forms/",
  },
  scjFamily: {
    label: "Superior Court of Justice — Family",
    publisher: "Ontario Courts",
    url: "https://www.ontariocourts.ca/scj/family/",
  },
  legalAid: {
    label: "Legal Aid Ontario",
    publisher: "Legal Aid Ontario",
    url: "https://www.legalaid.on.ca/",
  },
  lso: {
    label: "Finding a lawyer or paralegal",
    publisher: "Law Society of Ontario",
    url: "https://lso.ca/public-resources/finding-a-lawyer-or-paralegal",
  },
  stepsToJustice: {
    label: "Steps to Justice — Family law",
    publisher: "CLEO (Community Legal Education Ontario)",
    url: "https://stepstojustice.ca/legal-topic/family-law/",
  },
} as const;

export type SourceKey = keyof typeof officialSources;
export type Source = { label: string; publisher: string; url: string };
