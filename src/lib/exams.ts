// Central catalogue of exam segments PadhoDost serves.
// `live` segments are launch-ready; `soon` are on the roadmap.
// Card accent classes are written as full literals so Tailwind's scanner keeps them.

export type ExamStatus = "live" | "soon";

export type Exam = {
  slug: string;
  name: string;
  short: string;
  emoji: string;
  blurb: string;
  status: ExamStatus;
  // background + text classes for the card icon chip
  chip: string;
};

export const exams: Exam[] = [
  {
    slug: "ssc-cgl",
    name: "SSC CGL & Banking",
    short: "SSC / Banking",
    emoji: "🏦",
    blurb: "Quant, Reasoning, English & GA — with shortcuts and full mock tests.",
    status: "live",
    chip: "bg-emerald-100 text-emerald-700",
  },
  {
    slug: "class-10",
    name: "Class 10 (CBSE)",
    short: "Class 10",
    emoji: "📖",
    blurb: "Maths, Science & SST explained visually, chapter by chapter.",
    status: "live",
    chip: "bg-sky-100 text-sky-700",
  },
  {
    slug: "class-12",
    name: "Class 12 Boards",
    short: "Class 12",
    emoji: "🎓",
    blurb: "Science, Commerce & Arts — board prep with PYQs.",
    status: "soon",
    chip: "bg-violet-100 text-violet-700",
  },
  {
    slug: "jee",
    name: "JEE (Main + Adv)",
    short: "JEE",
    emoji: "⚗️",
    blurb: "Physics, Chemistry & Maths with concept-first explainers.",
    status: "live",
    chip: "bg-amber-100 text-amber-700",
  },
  {
    slug: "neet",
    name: "NEET (Medical)",
    short: "NEET",
    emoji: "🩺",
    blurb: "Biology, Physics & Chemistry — NCERT-focused practice.",
    status: "live",
    chip: "bg-rose-100 text-rose-700",
  },
  {
    slug: "upsc",
    name: "UPSC Civil Services",
    short: "UPSC",
    emoji: "🏛️",
    blurb: "Prelims, Mains & daily current affairs in one place.",
    status: "soon",
    chip: "bg-indigo-100 text-indigo-700",
  },
  {
    slug: "railways",
    name: "Railway Exams",
    short: "Railways",
    emoji: "🚂",
    blurb: "RRB NTPC, Group D & ALP — speed-focused practice.",
    status: "soon",
    chip: "bg-teal-100 text-teal-700",
  },
  {
    slug: "state-boards",
    name: "State Boards",
    short: "State Boards",
    emoji: "🗺️",
    blurb: "UP, Maharashtra, Bihar & more — in your language.",
    status: "soon",
    chip: "bg-fuchsia-100 text-fuchsia-700",
  },
];

export const liveExams = exams.filter((e) => e.status === "live");

// Card accent chip for an exam slug (UI niceness for DB-driven pages).
export function getChip(slug: string): string {
  return exams.find((e) => e.slug === slug)?.chip ?? "bg-slate-100 text-slate-700";
}
