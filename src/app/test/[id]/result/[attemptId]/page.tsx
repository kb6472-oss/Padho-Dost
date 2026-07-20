import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { ANON_COOKIE } from "@/lib/anon";
import { getTestRanking } from "@/lib/ranking";
import { BookOpen, Target } from "lucide-react";
import ShareResult from "@/components/ShareResult";
import TrackedLink from "@/components/TrackedLink";
import { AdSlot } from "@/components/Ads";
import { ButtonLink } from "@/components/ui/Button";
import ScoreDial from "@/components/ui/ScoreDial";
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
            include: {
              question: {
                include: {
                  options: { orderBy: { order: "asc" } },
                  // Needed for the topic breakdown — without the chapter we can only
                  // tell a student THAT they scored 40%, never on what.
                  chapter: { select: { id: true, name: true } },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!attempt || attempt.mockTestId !== id) notFound();

  const user = await getSessionUser();

  // Ownership gate — results are private. A viewer may see an attempt only if it is
  // their own (logged-in userId match) or their own guest attempt (anon cookie match).
  const cookieAnon = (await cookies()).get(ANON_COOKIE)?.value;
  const owns = attempt.userId
    ? attempt.userId === user?.id
    : !!attempt.anonId && attempt.anonId === cookieAnon;
  if (!owns) notFound();

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

  // ── Topic breakdown ────────────────────────────────────────────────────────
  // submitAttempt already computes this per chapter, but throws it away for
  // guests, so it is recomputed here from the answers the page has anyway.
  const byChapter = new Map<string, { name: string; attempted: number; correct: number }>();
  for (const tq of mockTest.questions) {
    const ch = tq.question.chapter;
    if (!ch) continue;
    const ans = answersByQ.get(tq.question.id);
    if (!ans || ans.selectedOptionId == null) continue; // skipped questions teach nothing
    const row = byChapter.get(ch.id) ?? { name: ch.name, attempted: 0, correct: 0 };
    row.attempted++;
    if (ans.isCorrect) row.correct++;
    byChapter.set(ch.id, row);
  }

  const topics = [...byChapter.entries()]
    .map(([chapterId, t]) => ({ chapterId, ...t, pct: Math.round((t.correct / t.attempted) * 100) }))
    .sort((a, b) => a.pct - b.pct || b.attempted - a.attempted);

  // Weakest topic drives the "what next" block. Require 2+ attempts so a single
  // unlucky question doesn't send a student off to re-read a chapter they know,
  // and require it to be genuinely shaky rather than merely not-perfect.
  const weakest = topics.find((t) => t.attempted >= 2 && t.pct < 70) ?? null;

  const [weakExplainer, nextTest] = weakest
    ? await Promise.all([
        prisma.explainer.findFirst({
          where: { chapterId: weakest.chapterId, status: "PUBLISHED" },
          select: { slug: true, title: true, readingMinutes: true },
        }),
        prisma.mockTest.findFirst({
          // MockTest has no chapter FK, so reach the chapter through its questions.
          where: {
            examId: mockTest.examId,
            id: { not: mockTest.id },
            questions: { some: { question: { chapterId: weakest.chapterId } } },
          },
          orderBy: { createdAt: "asc" },
          select: { id: true, title: true, _count: { select: { questions: true } } },
        }),
      ])
    : [null, null];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      {/* Score hero */}
      <div className="surface-3 bg-gradient-to-b from-brand-50 to-background p-8 text-center">
        <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">Your Score</p>

        <div className="mt-4">
          <ScoreDial pct={Math.round(pct)} score={fmt(score)} total={fmt(mockTest.totalMarks)} />
        </div>

        <p className="mt-3 text-body text-muted">{mockTest.title}</p>

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

      </div>

      {/* ── What to practise next ──────────────────────────────────────────────
          The single most valuable block on this page. Previously the only ways
          forward were "Retake test" (the identical paper) and "More tests" (a
          generic list), so a student who scored 40% was told nothing about what
          to do about it — while the homepage promised "exactly what to practise
          next". This turns the result into a route to the next thing.        */}
      {weakest && (weakExplainer || nextTest) && (
        <section className="mt-4 surface-3 border-brand-200 bg-brand-50 p-5">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-700">
            What to practise next
          </p>
          <h2 className="mt-1.5 font-display text-h3 font-bold text-brand-900">{weakest.name}</h2>
          <p className="mt-1 text-body text-brand-800">
            You got {weakest.correct} of {weakest.attempted} right here ({weakest.pct}%) — your weakest
            topic in this test.
          </p>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            {weakExplainer && (
              <ButtonLink href={`/study/${weakExplainer.slug}`} variant="primary" size="md" className="sm:flex-1">
                <BookOpen className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
                Read the explainer · {weakExplainer.readingMinutes} min
              </ButtonLink>
            )}
            {nextTest && (
              <ButtonLink href={`/test/${nextTest.id}`} variant="secondary" size="md" className="sm:flex-1">
                <Target className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
                Practise it · {nextTest._count.questions} Qs
              </ButtonLink>
            )}
          </div>
        </section>
      )}

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
        <TrackedLink
          href={`/login?next=${encodeURIComponent(`/test/${id}/result/${attemptId}`)}`}
          event="signup_prompt_click"
          props={{ test_id: id, source: "result_save_score", pct }}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 transition-colors hover:bg-amber-100"
        >
          <span className="text-2xl">💾</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900">Save your score &amp; track your progress →</p>
            <p className="text-xs text-amber-700">
              Create a free account in 1 tap to save this score and resume anytime. No spam, no calls.
            </p>
          </div>
        </TrackedLink>
      )}

      {/* Share sits AFTER the signup prompt on purpose: it used to be the loudest
          control on the page and it sends people off-site, so it was competing
          with account creation at the exact moment intent is highest. */}
      <div className="mt-4">
        <ShareResult
          testId={mockTest.id}
          testTitle={mockTest.title}
          score={fmt(score)}
          total={fmt(mockTest.totalMarks)}
          pct={Math.round(pct)}
          rank={ranking.total > 1 ? ranking.rank : null}
        />
      </div>

      {/* Full topic breakdown */}
      {topics.length > 1 && (
        <section className="mt-4 surface-2 p-5">
          <h2 className="font-display text-body-lg font-bold text-foreground">Accuracy by topic</h2>
          <p className="mt-0.5 text-caption text-muted">Weakest first — based on the questions you attempted.</p>
          <ul className="mt-4 space-y-3">
            {topics.map((t) => {
              const tone =
                t.pct >= 70 ? "bg-emerald-500" : t.pct >= 40 ? "bg-amber-500" : "bg-rose-500";
              return (
                <li key={t.chapterId}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-body font-medium text-foreground">{t.name}</span>
                    <span className="shrink-0 text-caption font-semibold text-muted">
                      {t.correct}/{t.attempted} · {t.pct}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface">
                    <div className={`h-full rounded-full ${tone}`} style={{ width: `${t.pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
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
      {/* Highest-dwell surface in the product — students scroll the full solutions list. */}
      <AdSlot slot="result-mid" className="mt-8" />

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

      {/* Actions. "Retake" is deliberately no longer the primary button — re-sitting
          the identical paper is the least valuable thing a student can do next, and
          it was the loudest control on the page. The primary action is the next
          piece of content; retake is demoted to a quiet tertiary link. */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {nextTest ? (
          <ButtonLink href={`/test/${nextTest.id}`} variant="primary" size="lg" className="sm:flex-1">
            Next: {nextTest.title}
          </ButtonLink>
        ) : (
          <ButtonLink href={`/exams/${mockTest.exam.slug}`} variant="primary" size="lg" className="sm:flex-1">
            More {mockTest.exam.shortName} tests
          </ButtonLink>
        )}
        <ButtonLink href={`/exams/${mockTest.exam.slug}`} variant="secondary" size="lg" className="sm:flex-1">
          All {mockTest.exam.shortName} tests
        </ButtonLink>
      </div>

      <p className="mt-4 text-center text-caption text-muted">
        <Link href={`/test/${mockTest.id}`} className="font-medium hover:text-foreground hover:underline">
          Retake this test
        </Link>
      </p>

      <p className="mt-6 text-center text-xs text-muted">
        Spotted a wrong answer?{" "}
        <Link
          href={`/contact?kind=report&ref=${encodeURIComponent(mockTest.title)}`}
          className="font-medium text-brand-600 hover:underline"
        >
          Report a mistake
        </Link>
      </p>
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
