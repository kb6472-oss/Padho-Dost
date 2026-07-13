import type { Metadata } from "next";
import { getExams } from "@/lib/data";
import { getChip, type Exam } from "@/lib/exams";
import { getExamGoal } from "@/lib/enroll";
import ExamCard from "@/components/ExamCard";
import OnboardingPrompt from "@/components/OnboardingPrompt";

export const metadata: Metadata = {
  title: "All Exams",
  description:
    "Pick your exam — SSC CGL, Banking, Class 10 & 12 boards, JEE, NEET, UPSC and more. Free mock tests and visual explainers.",
  alternates: { canonical: "/exams" },
};

export default async function ExamsPage() {
  const exams = await getExams();
  const goal = await getExamGoal();

  const cards: Exam[] = exams.map((e) => ({
    slug: e.slug,
    name: e.name,
    short: e.shortName,
    emoji: e.emoji ?? "📘",
    blurb: e.description ?? "",
    status: e.status === "LIVE" ? "live" : "soon",
    chip: getChip(e.slug),
  }));

  const liveChips = exams
    .filter((e) => e.status === "LIVE")
    .map((e) => ({ slug: e.slug, name: e.name, emoji: e.emoji ?? "📘" }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {!goal && <OnboardingPrompt exams={liveChips} />}

      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
          Choose your exam
        </h1>
        <p className="mt-2 text-sm text-muted">
          Free mock tests and visual explainers. We&apos;re starting with SSC CGL and Class 10 —
          new exams are added every month.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((exam) => (
          <ExamCard key={exam.slug} exam={exam} />
        ))}
      </div>
    </div>
  );
}
