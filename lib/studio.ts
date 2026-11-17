/**
 * Parenting Plan Studio — data model, schedule templates and plain-language rendering.
 * Everything here runs in the browser. Plan contents are never sent to the server.
 */

export type Who = "A" | "B";

export type ScheduleTemplate = {
  id: string;
  name: string;
  summary: string;
  /** 14 days starting Monday. */
  pattern: Who[];
};

const p = (s: string) => s.split("") as Who[];

export const scheduleTemplates: ScheduleTemplate[] = [
  { id: "week-on-week-off", name: "Week on / week off", summary: "Each parent has the children for alternating full weeks.", pattern: p("AAAAAAABBBBBBB") },
  { id: "2-2-3", name: "2-2-3 rotation", summary: "Two days, two days, three days — alternating each week.", pattern: p("AABBAAABBAABBB") },
  { id: "2-2-5-5", name: "2-2-5-5 rotation", summary: "Set weekdays with each parent; alternating weekends.", pattern: p("AABBAAAAABBBBB") },
  { id: "3-4-4-3", name: "3-4-4-3 rotation", summary: "Three and four-day blocks that alternate weekly.", pattern: p("AAABBBBAAAABBB") },
  { id: "alt-weekends", name: "Alternating weekends", summary: "Weekdays with one parent; every other weekend with the other.", pattern: p("AAAAABBAAAAAAA") },
  { id: "weekday-weekend", name: "Weekdays / every weekend", summary: "Weekdays with one parent; every weekend with the other.", pattern: p("AAAAABBAAAAABB") },
  { id: "custom", name: "Custom", summary: "Set each day yourself.", pattern: p("AAAAAAABBBBBBB") },
];

export const holidayList = [
  "Christmas Eve & Christmas Day",
  "New Year's Eve & Day",
  "March Break",
  "Easter / spring long weekend",
  "Thanksgiving weekend",
  "Summer vacation",
  "Children's birthdays",
  "Mother's Day",
  "Father's Day",
  "Other cultural or religious holidays",
] as const;

export const holidayOptions = [
  { id: "alternate", label: "Alternate each year" },
  { id: "split", label: "Split equally" },
  { id: "A", label: "Always with Parent A" },
  { id: "B", label: "Always with Parent B" },
  { id: "regular", label: "Follow the regular schedule" },
  { id: "tbd", label: "To be discussed" },
] as const;

export const decisionAreas = [
  { id: "health", label: "Health care" },
  { id: "education", label: "Education" },
  { id: "culture", label: "Culture, language, religion and spirituality" },
  { id: "activities", label: "Significant extracurricular activities" },
] as const;

export const decisionOptions = [
  { id: "joint", label: "Joint — both parents decide together" },
  { id: "A", label: "Parent A, after consulting Parent B" },
  { id: "B", label: "Parent B, after consulting Parent A" },
  { id: "tbd", label: "To be discussed" },
] as const;

export type Plan = {
  version: 1;
  parentA: string;
  parentB: string;
  children: string;
  templateId: string;
  pattern: Who[];
  exchangeTime: string;
  exchangeLocation: string;
  transport: "receiving" | "dropping" | "alternate" | "tbd";
  holidays: Record<string, string>;
  holidayNotes: string;
  decisions: Record<string, string>;
  dayToDay: boolean;
  commMethod: "app" | "email" | "text" | "mixed";
  responseHours: number;
  infoSharing: boolean;
  noDisparaging: boolean;
  travelNoticeDays: number;
  passportsWith: "A" | "B" | "alternate" | "tbd";
  relocationNotice: boolean;
  disputeSteps: string[];
  reviewMonths: number;
  extraNotes: string;
};

export const disputeOptions = [
  "Discuss directly in writing first",
  "Use a parenting coordinator",
  "Attend mediation before going to court",
  "Consult a parenting professional for child-focused input",
];

export function defaultPlan(): Plan {
  const t = scheduleTemplates[0];
  return {
    version: 1,
    parentA: "Parent A",
    parentB: "Parent B",
    children: "",
    templateId: t.id,
    pattern: [...t.pattern],
    exchangeTime: "after school, or 5:00 p.m. on non-school days",
    exchangeLocation: "school, or the receiving parent's home",
    transport: "receiving",
    holidays: Object.fromEntries(holidayList.map((h) => [h, h === "Summer vacation" ? "split" : "alternate"])),
    holidayNotes: "",
    decisions: Object.fromEntries(decisionAreas.map((d) => [d.id, "joint"])),
    dayToDay: true,
    commMethod: "app",
    responseHours: 48,
    infoSharing: true,
    noDisparaging: true,
    travelNoticeDays: 30,
    passportsWith: "tbd",
    relocationNotice: true,
    disputeSteps: ["Discuss directly in writing first", "Attend mediation before going to court"],
    reviewMonths: 12,
    extraNotes: "",
  };
}

export function share(pattern: Who[]) {
  const a = pattern.filter((d) => d === "A").length;
  return { a, b: pattern.length - a, pctA: Math.round((a / pattern.length) * 100), pctB: Math.round(((pattern.length - a) / pattern.length) * 100) };
}

export const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const name = (plan: Plan, who: Who | string) => (who === "A" ? plan.parentA || "Parent A" : who === "B" ? plan.parentB || "Parent B" : who);

/** Turns a 14-day pattern into readable lines, e.g. "Week 1: Mon–Tue with Sam; Wed–Thu with Alex; …". */
export function describePattern(plan: Plan): string[] {
  const lines: string[] = [];
  for (let w = 0; w < 2; w++) {
    const days = plan.pattern.slice(w * 7, w * 7 + 7);
    const runs: string[] = [];
    let start = 0;
    for (let i = 1; i <= 7; i++) {
      if (i === 7 || days[i] !== days[start]) {
        const range = i - 1 === start ? dayNames[start] : `${dayNames[start]}–${dayNames[i - 1]}`;
        runs.push(`${range} with ${name(plan, days[start])}`);
        start = i;
      }
    }
    lines.push(`Week ${w + 1}: ${runs.join("; ")}.`);
  }
  return lines;
}

export const STORAGE_KEY = "na-studio-plan-v1";
