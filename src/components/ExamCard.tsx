import Link from "next/link";
import { ArrowRight, FileText, ListChecks, BookOpen } from "lucide-react";
import type { Exam } from "@/lib/exams";
import Badge from "@/components/ui/Badge";

export type ExamCounts = { tests: number; questions: number; explainers: number };

/**
 * Counts are the single most important thing on this card. A student comparing
 * against Testbook's "120 Tests | 4500 Questions" sees a card with no numbers
 * and concludes the site is empty — which is exactly backwards here, where
 * there are 2,500+ questions sitting behind it.
 */
export default function ExamCard({ exam, counts }: { exam: Exam; counts?: ExamCounts }) {
  const isLive = exam.status === "live";
  const hasCounts = isLive && counts && counts.questions > 0;

  const inner = (
    <div className="group flex h-full flex-col p-5">
      <div className="flex items-center justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${exam.chip}`}>
          {exam.emoji}
        </span>
        {isLive ? (
          <Badge tone="positive">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Live
          </Badge>
        ) : (
          <Badge tone="neutral">Coming soon</Badge>
        )}
      </div>

      <h3 className="mt-4 font-display text-h3 font-bold text-foreground">{exam.name}</h3>
      <p className="mt-1 flex-1 text-body text-muted">{exam.blurb}</p>

      {hasCounts && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-caption text-muted">
          <span className="inline-flex items-center gap-1.5">
            <ListChecks className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {counts.tests} tests
          </span>
          <span className="inline-flex items-center gap-1.5">
            <FileText className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {counts.questions.toLocaleString("en-IN")} questions
          </span>
          {counts.explainers > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              {counts.explainers} explainers
            </span>
          )}
        </div>
      )}

      <span
        className={`mt-4 inline-flex items-center gap-1.5 text-body font-semibold transition-all ${
          isLive ? "text-brand-600 group-hover:gap-2.5" : "text-muted"
        }`}
      >
        {isLive ? "Start free" : "Coming soon"}
        {isLive && <ArrowRight className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />}
      </span>
    </div>
  );

  if (isLive) {
    return (
      <Link href={`/exams/${exam.slug}`} className="surface-3 surface-3-interactive block h-full">
        {inner}
      </Link>
    );
  }
  return <div className="surface-2 h-full cursor-default opacity-80">{inner}</div>;
}
