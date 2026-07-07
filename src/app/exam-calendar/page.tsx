import type { Metadata } from "next";
import Countdown from "@/components/Countdown";

export const metadata: Metadata = {
  title: "Exam Calendar & Countdown",
  description: "Upcoming exam dates and live countdowns for SSC CGL, NEET, JEE Main and CBSE Class 10 boards.",
};

const items = [
  { exam: "SSC CGL (Tier 1)", emoji: "🏦", date: "2026-09-15", note: "Usually September · notification around April" },
  { exam: "JEE Main (Session 1)", emoji: "⚗️", date: "2027-01-24", note: "Session 1 ~January · Session 2 ~April" },
  { exam: "CBSE Class 10 Boards", emoji: "📖", date: "2027-02-17", note: "Usually mid-February to March" },
  { exam: "NEET UG", emoji: "🩺", date: "2027-05-02", note: "Usually the first Sunday of May" },
];

const pretty = (d: string) =>
  new Date(d + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function ExamCalendarPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        🗓️ Exam Calendar
      </h1>
      <p className="mt-1 text-sm text-muted">Countdown to the exams you&apos;re preparing for.</p>

      <div className="mt-6 space-y-3">
        {items.map((it) => (
          <div key={it.exam} className="flex items-center gap-4 rounded-2xl border border-border bg-background p-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-surface text-2xl">
              {it.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-foreground">{it.exam}</p>
              <p className="text-xs text-muted">{it.note}</p>
            </div>
            <div className="flex-shrink-0 text-right">
              <Countdown date={it.date} />
              <p className="text-xs text-muted">{pretty(it.date)}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-xl bg-amber-50 p-3 text-center text-xs leading-relaxed text-amber-800">
        ⚠️ Dates are indicative (based on typical schedules). Always confirm exact dates on the official exam website.
      </p>
    </div>
  );
}
