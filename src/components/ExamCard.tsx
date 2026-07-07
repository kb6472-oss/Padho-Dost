import Link from "next/link";
import type { Exam } from "@/lib/exams";

export default function ExamCard({ exam }: { exam: Exam }) {
  const isLive = exam.status === "live";

  const inner = (
    <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-background p-5 transition-all hover:border-brand-300 hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl ${exam.chip}`}>
          {exam.emoji}
        </span>
        {isLive ? (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            ● Live
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
            Coming soon
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-base font-semibold text-foreground">{exam.name}</h3>
      <p className="mt-1 flex-1 text-sm text-muted">{exam.blurb}</p>

      <span
        className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${
          isLive ? "text-brand-600 group-hover:gap-2" : "text-slate-400"
        } transition-all`}
      >
        {isLive ? "Start free" : "Notify me"}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  );

  if (isLive) {
    return (
      <Link href={`/exams/${exam.slug}`} className="block h-full">
        {inner}
      </Link>
    );
  }
  return <div className="h-full cursor-default opacity-90">{inner}</div>;
}
