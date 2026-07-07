import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { getTestRanking } from "@/lib/ranking";
import ShareResult from "@/components/ShareResult";
import { buildFeedback } from "@/lib/feedback";

type Props = { params: Promise<{ id: string; attemptId: string }> };

export const metadata: Metadata = { title: "Your Result", robots: { index: false } };

const fmt = (n: number) => Number(n.toFixed(2)).toString();
const mmss = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`;

export default async function ResultPage({ params }: Props) {
  const { id, attemptId } = await params;

  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: {
      answers: true,
      mockTest: {
        include: {
          exam: true,
          questions: {
            orderBy: { order: "asc" },
            include: { question: { include: { options: { orderBy: { order: "asc" } } } } },
          },
        },
      },
    },
  });

  if (!attempt || attempt.mockTestId !== id) notFound();

  const user = await getSessionUser();
  const { mockTest } = attempt;
  const answersByQ = new Map(attempt.answers.map((a) => [a.questionId, a]));
  const score = attempt.score ?? 0;
  const pct = Math.max(0, Math.min(100, mockTest.totalMarks > 0 ? (score / mockTest.totalMarks) * 100 : 0));
  const accuracy =
    attempt.correctCount + attempt.wrongCount > 0
      ? Math.round((attempt.correctCount / (attempt.correctCount + attempt.wrongCount)) * 100)
      : 0;
  const ranking = await getTestRanking(mockTest.id, score);

  // Per-question time analysis (only when dwell times were captured).
  const timed = attempt.answers.filter((a) => a.timeSpentSec != null);
  const avgOf = (arr: number[]) => (arr.length ? Math.round(arr.reduce((s, x) => s + x, 0) / arr.length) : null);
  const avgCorrect = avgOf(timed.filter((a) => a.isCorrect).map((a) => a.timeSpentSec as number));
  const avgWrong = avgOf(timed.filter((a) => a.isCorrect === false).map((a) => a.timeSpentSec as number));
  const slowestSec = timed.length ? Math.max(...timed.map((a) => a.timeSpentSec as number)) : null;
  const hasTimeData = timed.length > 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Score hero */}
      <div className="rounded-3xl border border-border bg-gradient-to-b from-brand-50 to-background p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Your Score</p>
        <div className="mt-2 font-display text-5xl font-extrabold text-foreground">
          {fmt(score)}
          <span className="text-2xl text-muted"> / {fmt(mockTest.totalMarks)}</span>
        </div>
        <p className="mt-1 text-sm text-muted">{mockTest.title}</p>

        <div className="mx-auto mt-5 h-2.5 max-w-xs overflow-hidden rounded-full bg-surface">
          <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
        </div>

        {/* All-India Rank + percentile */}
        {ranking.total > 1 ? (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-brand-600 px-3.5 py-1.5 text-xs font-bold text-white">
              🏆 Rank {ranking.rank} of {ranking.total.toLocaleString("en-IN")}
            </span>
            {ranking.percentile != null && (
              <span className="rounded-full bg-amber-100 px-3.5 py-1.5 text-xs font-bold text-amber-700">
                You beat {ranking.percentile}% of test-takers
              </span>
            )}
          </div>
        ) : (
          <div className="mt-5">
            <span className="rounded-full bg-emerald-100 px-3.5 py-1.5 text-xs font-bold text-emerald-700">
              🥇 You&apos;re one of the first to take this test!
            </span>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={attempt.correctCount} label="Correct" tone="green" />
          <Stat value={attempt.wrongCount} label="Wrong" tone="red" />
          <Stat value={attempt.unattemptedCount} label="Skipped" tone="gray" />
          <Stat value={`${accuracy}%`} label="Accuracy" tone="blue" />
        </div>
        {attempt.timeTakenSec != null && (
          <p className="mt-4 text-xs text-muted">⏱️ Time taken: {mmss(attempt.timeTakenSec)}</p>
        )}

        <ShareResult
          testId={mockTest.id}
          testTitle={mockTest.title}
          score={fmt(score)}
          total={fmt(mockTest.totalMarks)}
          pct={Math.round(pct)}
          rank={ranking.total > 1 ? ranking.rank : null}
        />
      </div>

      {/* Smart feedback */}
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4">
        <span className="text-2xl">🧠</span>
        <div>
          <p className="text-sm font-semibold text-brand-900">Smart feedback</p>
          <p className="mt-0.5 text-sm leading-relaxed text-brand-800">
            {buildFeedback({
              pct: Math.round(pct),
              accuracy,
              wrong: attempt.wrongCount,
              unattempted: attempt.unattemptedCount,
            })}
          </p>
        </div>
      </div>

      {/* Save-your-score → login (or confirmation when already signed in) */}
      {user ? (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <span className="text-2xl">✅</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-900">Saved to your account</p>
            <p className="text-xs text-emerald-700">This attempt is in your history now. Keep practising to climb!</p>
          </div>
        </div>
      ) : (
        <Link
          href={`/login?next=${encodeURIComponent(`/test/${id}/result/${attemptId}`)}`}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 transition-colors hover:bg-amber-100"
        >
          <span className="text-2xl">💾</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900">Save your score &amp; track your progress →</p>
            <p className="text-xs text-amber-700">
              Create a free account in 1 tap to save this score and resume anytime. No spam, no calls.
            </p>
          </div>
        </Link>
      )}

      {/* Time analysis */}
      {hasTimeData && (
        <div className="mt-4 rounded-2xl border border-border bg-background p-5">
          <p className="font-display text-sm font-bold text-foreground">⏱️ Time analysis</p>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-emerald-50 py-3 text-center">
              <div className="font-display text-lg font-bold text-emerald-700">{avgCorrect ?? "—"}{avgCorrect != null ? "s" : ""}</div>
              <div className="text-xs text-emerald-600">Avg on correct</div>
            </div>
            <div className="rounded-xl bg-rose-50 py-3 text-center">
              <div className="font-display text-lg font-bold text-rose-700">{avgWrong ?? "—"}{avgWrong != null ? "s" : ""}</div>
              <div className="text-xs text-rose-600">Avg on wrong</div>
            </div>
            <div className="rounded-xl bg-amber-50 py-3 text-center">
              <div className="font-display text-lg font-bold text-amber-700">{slowestSec ?? "—"}{slowestSec != null ? "s" : ""}</div>
              <div className="text-xs text-amber-600">Slowest question</div>
            </div>
          </div>
          {avgCorrect != null && avgWrong != null && avgWrong > avgCorrect && (
            <p className="mt-3 text-xs text-muted">
              💡 You spent longer on questions you got wrong — when unsure, mark for review and move on to save time.
            </p>
          )}
        </div>
      )}

      {/* Review */}
      <h2 className="mt-10 font-display text-lg font-bold text-foreground">Solutions &amp; review</h2>
      <div className="mt-4 space-y-4">
        {mockTest.questions.map((tq, i) => {
          const q = tq.question;
          const ans = answersByQ.get(q.id);
          const selectedId = ans?.selectedOptionId ?? null;
          const status = selectedId == null ? "skipped" : ans?.isCorrect ? "correct" : "wrong";

          return (
            <div key={q.id} className="rounded-2xl border border-border bg-background p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold text-muted">
                  Question {i + 1}
                  {ans?.timeSpentSec != null ? ` · ⏱️ ${ans.timeSpentSec}s` : ""}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    status === "correct"
                      ? "bg-emerald-100 text-emerald-700"
                      : status === "wrong"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {status === "correct" ? "✓ Correct" : status === "wrong" ? "✗ Wrong" : "— Skipped"}
                </span>
              </div>

              <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">{q.text}</p>

              <div className="mt-3 space-y-2">
                {q.options.map((o, oi) => {
                  const isCorrect = o.isCorrect;
                  const isPicked = o.id === selectedId;
                  let cls = "border-border bg-background text-foreground";
                  if (isCorrect) cls = "border-emerald-300 bg-emerald-50 text-emerald-900";
                  else if (isPicked) cls = "border-rose-300 bg-rose-50 text-rose-900";
                  return (
                    <div key={o.id} className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${cls}`}>
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-xs font-bold">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1 font-medium">{o.text}</span>
                      {isCorrect && <span className="text-xs font-bold text-emerald-700">Correct</span>}
                      {isPicked && !isCorrect && <span className="text-xs font-bold text-rose-700">Your answer</span>}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <div className="mt-3 rounded-xl bg-brand-50 p-3.5">
                  <p className="text-xs font-semibold text-brand-700">💡 Solution</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-900">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/test/${mockTest.id}`}
          className="flex-1 rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700"
        >
          Retake test
        </Link>
        <Link
          href={`/exams/${mockTest.exam.slug}`}
          className="flex-1 rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-surface"
        >
          More {mockTest.exam.shortName} tests
        </Link>
      </div>
    </div>
  );
}

function Stat({ value, label, tone }: { value: number | string; label: string; tone: "green" | "red" | "gray" | "blue" }) {
  const tones = {
    green: "text-emerald-700",
    red: "text-rose-700",
    gray: "text-slate-600",
    blue: "text-brand-700",
  };
  return (
    <div className="rounded-xl border border-border bg-background py-3">
      <div className={`font-display text-xl font-extrabold ${tones[tone]}`}>{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}
