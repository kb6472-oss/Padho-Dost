import sscCgl from "@/content/exam-info/ssc-cgl.json";
import wbcs from "@/content/exam-info/wbcs.json";

// Exam-information pages (syllabus, pattern, eligibility, dates, cut-offs, salary)
// and the score calculator. Data lives in src/content/exam-info/<slug>.json and is
// researched from OFFICIAL notifications only (each exam lists its sources); a
// field that isn't officially published is left empty rather than estimated.

export type InfoKind = "syllabus" | "exam-pattern" | "eligibility" | "important-dates" | "cut-off" | "salary";

export type ExamInfo = {
  slug: string;
  examName: string; // e.g. "SSC CGL 2026"
  conductingBody: string;
  cycle: string;
  lastChecked: string; // YYYY-MM-DD
  overview: string;
  officialWebsite: string;
  notificationUrl: string | null;
  sources: { label: string; url: string }[];
  dates: { event: string; date: string; status: "done" | "upcoming" | "tentative" }[];
  vacancies: { total: number | null; note: string };
  pattern: {
    stage: string;
    mode: string;
    duration: string;
    sections: { name: string; questions: number | null; marks: number | null }[];
    totalQuestions: number | null;
    totalMarks: number | null;
    marking: string;
    notes: string[];
  }[];
  syllabus: { stage: string; sections: { name: string; topics: string[] }[] }[];
  eligibility: {
    nationality: string;
    age: { summary: string; relaxations: { category: string; relaxation: string }[] };
    education: { posts: string; requirement: string }[];
    other: string[];
  };
  cutoffs: { year: string; stage: string; note: string; rows: { category: string; marks: string }[] }[];
  salary: { posts: string; payLevel: string; pay: string }[];
  salaryNote: string;
  faqs: { q: string; a: string }[];
  calculator: {
    stage: string;
    sections: { name: string; questions: number; correctMarks: number; wrongMarks: number }[];
    note: string;
  } | null;
};

const ALL: Record<string, ExamInfo> = {
  "ssc-cgl": sscCgl as ExamInfo,
  wbcs: wbcs as ExamInfo,
};

export const INFO_KINDS: { kind: InfoKind; label: string; title: string }[] = [
  { kind: "important-dates", label: "Dates & vacancies", title: "Exam Date, Notification & Vacancies" },
  { kind: "syllabus", label: "Syllabus", title: "Syllabus" },
  { kind: "exam-pattern", label: "Exam pattern", title: "Exam Pattern & Marking Scheme" },
  { kind: "eligibility", label: "Eligibility", title: "Eligibility: Age Limit & Qualification" },
  { kind: "cut-off", label: "Cut-offs", title: "Previous Year Cut-offs" },
  { kind: "salary", label: "Salary", title: "Salary & Pay Scale" },
];

export function getExamInfo(slug: string): ExamInfo | null {
  const info = ALL[slug];
  // A placeholder file (no researched content yet) means "no pages for this exam".
  return info && info.examName ? info : null;
}

export function examInfoSlugs(): string[] {
  return Object.keys(ALL).filter((s) => getExamInfo(s));
}
