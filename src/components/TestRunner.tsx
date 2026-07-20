"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitAttempt } from "@/lib/test-actions";
import { startAttempt, saveProgress } from "@/lib/attempt-actions";
import { track } from "@/lib/analytics";

type Opt = { id: string; text: string };
type Q = { id: string; text: string; marks: number; negativeMarks: number; options: Opt[] };
export type RunnerTest = {
  id: string;
  title: string;
  durationMinutes: number;
  totalMarks: number;
  negativeMarking: boolean;
  questions: Q[];
};

function getAnonId(): string {
  let id = localStorage.getItem("pd_anon");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("pd_anon", id);
  }
  return id;
}

// Stable per-test submit id → makes a retried/duplicate submit idempotent server-side.
function getClientAttemptId(testId: string): string {
  const key = `pd_cattempt_${testId}`;
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export default function TestRunner({ test }: { test: RunnerTest }) {
  const router = useRouter();
  const storageKey = `pd_test_${test.id}`;
  const total = test.questions.length;
  const durationSec = test.durationMinutes * 60;

  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [startedAt, setStartedAt] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSec);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);
  // A fresh attempt shows a briefing first; the clock must not already be running
  // when a student first sees the paper. Resumed attempts skip straight back in.
  const [needsBriefing, setNeedsBriefing] = useState(false);

  // Per-question dwell-time tracking (uses refs to avoid re-render churn).
  const timeRef = useRef<Record<string, number>>({});
  const enterRef = useRef<number>(0);
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Cross-device resume state (logged-in only; guests keep localStorage-only resume).
  const cattemptRef = useRef<string>("");
  const serverManagedRef = useRef(false);
  const lastServerSaveRef = useRef(0);

  const commitCurrentTime = useCallback(() => {
    const now = Date.now();
    const qid = test.questions[indexRef.current]?.id;
    const elapsed = (now - enterRef.current) / 1000;
    if (qid && enterRef.current && elapsed > 0 && elapsed < 3600) {
      timeRef.current[qid] = (timeRef.current[qid] || 0) + elapsed;
    }
    enterRef.current = now;
  }, [test.questions]);

  // Hydrate: prefer local (same-device continue); if none, pull any server-side
  // in-progress attempt (logged-in cross-device); else start fresh. All server calls
  // are best-effort — the test always works from localStorage even if they fail.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let saved: {
        startedAt?: number;
        answers?: Record<string, string>;
        marked?: Record<string, boolean>;
        index?: number;
        times?: Record<string, number>;
      } | null = null;
      try {
        saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      } catch {
        saved = null;
      }

      const cid = getClientAttemptId(test.id);
      cattemptRef.current = cid;

      let server: Awaited<ReturnType<typeof startAttempt>> | null = null;
      try {
        server = await startAttempt(test.id, cid);
      } catch {
        server = null;
      }
      if (cancelled) return;
      if (server?.serverManaged) serverManagedRef.current = true;
      if (server?.clientAttemptId && server.clientAttemptId !== cid) {
        cattemptRef.current = server.clientAttemptId;
        localStorage.setItem(`pd_cattempt_${test.id}`, server.clientAttemptId);
      }

      let resumed = false;
      if (saved && saved.startedAt) {
        // Same-device: continue exactly where we were.
        resumed = true;
        setAnswers(saved.answers || {});
        setMarked(saved.marked || {});
        setIndex(Math.min(saved.index || 0, total - 1));
        setStartedAt(saved.startedAt);
        timeRef.current = saved.times || {};
      } else if (server?.resumed && server.progressJson) {
        // Cross-device pickup: rebuild state + timer from the server snapshot.
        let p: { answers?: Record<string, string>; marked?: Record<string, boolean> } = {};
        try {
          p = JSON.parse(server.progressJson);
        } catch {
          p = {};
        }
        resumed = true;
        const rem = server.remainingSec ?? durationSec;
        const start = Date.now() - (durationSec - rem) * 1000;
        setAnswers(p.answers || {});
        setMarked(p.marked || {});
        setIndex(Math.min(server.currentQuestionIndex || 0, total - 1));
        setStartedAt(start);
        localStorage.setItem(
          storageKey,
          JSON.stringify({ startedAt: start, answers: p.answers || {}, marked: p.marked || {}, index: server.currentQuestionIndex || 0 }),
        );
      } else {
        // Fresh attempt: hold the clock at zero and show the briefing. startedAt
        // is set by beginTest() when the student actually taps Start.
        setNeedsBriefing(true);
      }
      enterRef.current = Date.now();
      track("test_start", {
        test_id: test.id,
        test_title: test.title,
        questions: total,
        duration_min: test.durationMinutes,
        resumed,
      });
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [storageKey, total, test.id, test.title, test.durationMinutes, durationSec]);

  // Persist progress on every change (localStorage always; server every ~10s if logged in).
  useEffect(() => {
    if (!ready || !startedAt) return;
    localStorage.setItem(storageKey, JSON.stringify({ startedAt, answers, marked, index, times: timeRef.current }));
    if (serverManagedRef.current) {
      const now = Date.now();
      if (now - lastServerSaveRef.current > 10000) {
        lastServerSaveRef.current = now;
        const remaining = Math.max(0, durationSec - Math.floor((now - startedAt) / 1000));
        saveProgress(cattemptRef.current, {
          currentQuestionIndex: index,
          remainingSec: remaining,
          progressJson: JSON.stringify({ answers, marked }),
        }).catch(() => {});
      }
    }
  }, [ready, startedAt, answers, marked, index, storageKey, durationSec]);

  // Submit is guarded by a REF, not the `submitting` state. Using state here
  // caused a fatal loop: a failed submit called setSubmitting(false) → doSubmit
  // was reminted → the timer effect (which depended on doSubmit) re-ran → its
  // immediate tick() saw timeLeft still 0 → auto-submitted again → blocking
  // alert() forever, destroying a 60-minute attempt on a flaky connection.
  const submittingRef = useRef(false);
  const autoSubmittedRef = useRef(false);

  const doSubmit = useCallback(
    async (auto = false) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      setSubmitting(true);
      setSubmitError(null);
      commitCurrentTime();

      const timeTakenSec = Math.min(durationSec, Math.max(0, Math.round((Date.now() - startedAt) / 1000)));
      const payload = Object.entries(answers).map(([questionId, selectedOptionId]) => ({ questionId, selectedOptionId }));
      const times = Object.entries(timeRef.current).map(([questionId, seconds]) => ({ questionId, seconds: Math.round(seconds) }));
      // Stable id → the server treats every retry below as the same attempt.
      const clientAttemptId = cattemptRef.current || getClientAttemptId(test.id);

      // Auto-submit gets more retries: the student's time is up and they cannot
      // act, so giving up on them is the one unacceptable outcome.
      const maxTries = auto ? 6 : 3;
      for (let attempt = 0; attempt < maxTries; attempt++) {
        try {
          const res = await submitAttempt({
            mockTestId: test.id,
            anonId: getAnonId(),
            clientAttemptId,
            timeTakenSec,
            answers: payload,
            times,
          });
          track("test_submit", {
            test_id: test.id,
            test_title: test.title,
            auto,
            answered: Object.keys(answers).length,
            total: test.questions.length,
            time_taken_sec: timeTakenSec,
          });
          localStorage.removeItem(storageKey);
          localStorage.removeItem(`pd_cattempt_${test.id}`);
          router.push(`/test/${test.id}/result/${res.attemptId}`);
          return;
        } catch {
          if (attempt < maxTries - 1) {
            // Exponential backoff, capped — 1s, 2s, 4s, 8s, 15s.
            const wait = Math.min(1000 * 2 ** attempt, 15000);
            await new Promise((r) => setTimeout(r, wait));
          }
        }
      }

      // Every retry failed. Release the guard so the student can retry manually,
      // and surface it inline rather than in a blocking native alert().
      submittingRef.current = false;
      setSubmitting(false);
      setSubmitError(
        auto
          ? "Time is up, but we could not reach the server. Your answers are safe on this device — tap Submit again when your connection returns."
          : "Could not submit — please check your connection. Your answers are saved on this device.",
      );
    },
    [durationSec, startedAt, answers, test.id, test.title, test.questions.length, storageKey, router, commitCurrentTime],
  );

  // Keep the timer effect independent of doSubmit (which changes on every
  // answer) by reaching it through a ref. The effect below must depend only on
  // the clock, or we recreate the interval on every keystroke.
  const doSubmitRef = useRef(doSubmit);
  useEffect(() => {
    doSubmitRef.current = doSubmit;
  }, [doSubmit]);

  // Countdown timer (computed from startedAt so it survives refresh).
  useEffect(() => {
    if (!ready || !startedAt) return;
    const tick = () => {
      const left = Math.max(0, durationSec - Math.floor((Date.now() - startedAt) / 1000));
      setTimeLeft(left);
      // Latch: auto-submit fires exactly once for the lifetime of this attempt.
      if (left <= 0 && !autoSubmittedRef.current) {
        autoSubmittedRef.current = true;
        void doSubmitRef.current(true);
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [ready, startedAt, durationSec]);

  function beginTest() {
    const now = Date.now();
    setStartedAt(now);
    enterRef.current = now;
    localStorage.setItem(storageKey, JSON.stringify({ startedAt: now, answers: {}, marked: {}, index: 0 }));
    setNeedsBriefing(false);
  }

  if (!ready) {
    return <div className="py-24 text-center text-body text-muted">Loading test…</div>;
  }

  // ── Briefing gate ──────────────────────────────────────────────────────────
  // The timer used to start the instant the page mounted, so a student who
  // opened a link to "see what this is" was already losing marks. Nothing about
  // the paper (marks, negative marking, duration) was stated up front either.
  if (needsBriefing) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
        <div className="surface-3 p-6 text-center sm:p-8">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand-600">Ready when you are</p>
          <h1 className="mt-2 font-display text-h2 font-extrabold tracking-tight text-foreground">{test.title}</h1>

          <dl className="mt-6 grid grid-cols-2 gap-3 text-left">
            <div className="surface-1 p-3.5">
              <dt className="text-caption text-muted">Questions</dt>
              <dd className="mt-0.5 font-display text-h3 font-bold text-foreground">{total}</dd>
            </div>
            <div className="surface-1 p-3.5">
              <dt className="text-caption text-muted">Time limit</dt>
              <dd className="mt-0.5 font-display text-h3 font-bold text-foreground">{test.durationMinutes} min</dd>
            </div>
            <div className="surface-1 p-3.5">
              <dt className="text-caption text-muted">Total marks</dt>
              <dd className="mt-0.5 font-display text-h3 font-bold text-foreground">{test.totalMarks}</dd>
            </div>
            <div className="surface-1 p-3.5">
              <dt className="text-caption text-muted">Negative marking</dt>
              <dd className="mt-0.5 font-display text-h3 font-bold text-foreground">
                {test.negativeMarking ? "Yes" : "No"}
              </dd>
            </div>
          </dl>

          <ul className="mt-5 space-y-1.5 text-left text-body text-muted">
            <li>• The timer starts when you tap Start — not before.</li>
            <li>• Your answers save on this device, so you can close and come back.</li>
            <li>• You&apos;ll get full solutions and your All-India rank at the end.</li>
          </ul>

          <button
            type="button"
            onClick={beginTest}
            className="mt-6 inline-flex h-13 w-full items-center justify-center rounded-full bg-brand-600 px-8 text-body-lg font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Start test
          </button>
          <p className="mt-3 text-caption text-muted">No sign-up needed.</p>
        </div>
      </div>
    );
  }

  const q = test.questions[index];
  const selected = answers[q.id];
  const answeredCount = Object.keys(answers).length;
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const lowTime = timeLeft <= 60;

  // Warn at 10 / 5 / 1 minutes. Derived from timeLeft rather than stored in
  // state, so it survives refresh and can't drift out of sync with the clock.
  const timeWarning =
    timeLeft <= 60
      ? "Less than 1 minute left — the test submits automatically at 00:00."
      : timeLeft <= 300 && timeLeft > 294
        ? "5 minutes left."
        : timeLeft <= 600 && timeLeft > 594
          ? "10 minutes left."
          : null;

  const selectOption = (oid: string) => setAnswers((a) => ({ ...a, [q.id]: oid }));
  const clearAnswer = () =>
    setAnswers((a) => {
      const n = { ...a };
      delete n[q.id];
      return n;
    });
  const toggleMark = () => setMarked((m) => ({ ...m, [q.id]: !m[q.id] }));
  const goTo = (target: number) => {
    commitCurrentTime();
    setIndex(target);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      {/* Top bar */}
      {/* top-0, not top-16: the global navbar is not rendered on /test (see
          SiteChrome), so this bar owns the top of the viewport instead of
          stacking under 64px of chrome a student can't use mid-exam. */}
      <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="mb-1.5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setExitOpen(true)}
            className="text-caption font-medium text-muted transition-colors hover:text-rose-600"
          >
            ← Exit
          </button>
          <span className="text-xs text-muted">💾 Progress auto-saves on this device</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-sm font-semibold text-foreground">{test.title}</div>
            <div className="text-xs text-muted">
              Question {index + 1} of {total} · {answeredCount} answered
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold tabular-nums ${
              lowTime ? "bg-rose-50 text-rose-600" : "bg-surface text-foreground"
            }`}
          >
            ⏱️ {mm}:{ss}
          </div>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
          <div
            className="h-full rounded-full bg-brand-600 transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Staged time warnings. The paper used to auto-submit with no warning at
          all — the first signal was the results page. role="status" so it is
          announced rather than only seen. */}
      {timeWarning && (
        <div
          role="status"
          className={`mb-4 rounded-2xl border p-3.5 text-body font-medium ${
            timeLeft <= 60
              ? "border-rose-200 bg-rose-50 text-rose-800"
              : "border-amber-200 bg-amber-50 text-amber-800"
          }`}
        >
          {timeWarning}
        </div>
      )}

      {/* Question */}
      <div className="rounded-2xl border border-border bg-background p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            +{q.marks}{test.negativeMarking ? ` / −${q.negativeMarks}` : ""}
          </span>
          <button
            type="button"
            onClick={toggleMark}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              marked[q.id] ? "bg-amber-100 text-amber-700" : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            {marked[q.id] ? "★ Marked" : "☆ Mark for review"}
          </button>
        </div>

        <p className="mt-4 text-body-lg font-medium leading-relaxed text-foreground">{q.text}</p>

        {/* Options are a radiogroup, not a pile of buttons. Previously a screen
            reader announced four unrelated buttons with no indication that they
            were mutually exclusive or which one was chosen, on the one screen
            where getting it right matters most. */}
        <div className="mt-5 space-y-2.5" role="radiogroup" aria-label={`Options for question ${index + 1}`}>
          {q.options.map((o, i) => {
            const active = selected === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => selectOption(o.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-body-lg transition-colors ${
                  active
                    ? "border-brand-600 bg-brand-50 text-brand-900"
                    : "border-border bg-background hover:border-brand-300 hover:bg-surface"
                }`}
              >
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                    active ? "bg-brand-600 text-white" : "bg-surface text-muted"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1 font-medium">{o.text}</span>
                {/* Selection is not signalled by colour alone. */}
                {active && (
                  <span aria-hidden="true" className="shrink-0 text-body font-bold text-brand-600">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selected && (
          <button
            type="button"
            onClick={clearAnswer}
            className="mt-3 text-xs font-medium text-muted hover:text-rose-600"
          >
            Clear response
          </button>
        )}
      </div>

      {/* Submit failure — recoverable, and never blocks the page */}
      {submitError && (
        <div
          role="alert"
          className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
        >
          <p className="font-semibold">Submit failed</p>
          <p className="mt-1 leading-relaxed">{submitError}</p>
          <button
            type="button"
            onClick={() => void doSubmit()}
            disabled={submitting}
            className="mt-3 rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
          >
            {submitting ? "Retrying…" : "Try submitting again"}
          </button>
        </div>
      )}

      {/* Controls — fixed to the bottom of the viewport on mobile.
          Answering used to be two taps in two different thumb zones with a scroll
          between them: options mid-screen, Prev/Next below the fold. Now the
          options are where the eye is and the controls are under the thumb.
          44px targets; the spacer below reserves their height. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 px-4 py-3 backdrop-blur sm:static sm:mt-4 sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
        <div
          className="mx-auto flex max-w-3xl items-center justify-between gap-3"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <button
            type="button"
            onClick={() => goTo(Math.max(0, index - 1))}
            disabled={index === 0}
            className="h-11 rounded-full border border-border px-5 text-body font-semibold text-foreground disabled:opacity-40"
          >
            ← Prev
          </button>
          {index < total - 1 ? (
            <button
              type="button"
              onClick={() => goTo(Math.min(total - 1, index + 1))}
              className="h-11 rounded-full bg-brand-600 px-8 text-body font-semibold text-white hover:bg-brand-700"
            >
              Next →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="h-11 rounded-full bg-emerald-600 px-8 text-body font-semibold text-white hover:bg-emerald-700"
            >
              Submit test
            </button>
          )}
        </div>
      </div>
      {/* Reserves the fixed control bar's height so the palette below is never
          hidden underneath it. Mobile only — the bar is static from sm up. */}
      <div aria-hidden="true" className="h-[4.75rem] sm:hidden" />

      {/* Navigator */}
      <div className="mt-6 rounded-2xl border border-border bg-surface p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">Question palette</span>
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            Submit test
          </button>
        </div>
        {/* 5 columns, not 8: at 8 the cells were ~30x36px on a 360px Android,
            under half Google's 48px minimum. Capped height so a 100-question
            grand mock scrolls the palette instead of shrinking the targets. */}
        <div className="grid max-h-64 grid-cols-5 gap-2.5 overflow-y-auto sm:max-h-none sm:grid-cols-10">
          {test.questions.map((tq, i) => {
            const isAnswered = !!answers[tq.id];
            const isMarked = !!marked[tq.id];
            const isCurrent = i === index;
            let cls = "bg-background text-muted border-border";
            if (isAnswered) cls = "bg-emerald-100 text-emerald-700 border-emerald-200";
            if (isMarked) cls = "bg-amber-100 text-amber-700 border-amber-200";
            return (
              <button
                key={tq.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Question ${i + 1}${isAnswered ? ", answered" : ""}${isMarked ? ", marked for review" : ""}`}
                aria-current={isCurrent ? "true" : undefined}
                className={`h-11 w-full rounded-lg border text-caption font-semibold ${cls} ${
                  isCurrent ? "ring-2 ring-brand-600 ring-offset-1" : ""
                }`}
              >
                {i + 1}
                {/* Non-colour state cue — the palette was colour-only, which is
                    ambiguous for the ~8% of male students with CVD. */}
                {isMarked ? " ★" : isAnswered ? " ✓" : ""}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-emerald-100" /> Answered</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-amber-100" /> Marked</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded border border-border bg-background" /> Not visited</span>
        </div>
      </div>

      {/* Exit confirmation. Replaces window.confirm(), which renders as a jarring
          browser-chrome dialog on mobile and cannot say anything reassuring about
          the answers being saved. */}
      {exitOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setExitOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pd-exit-title"
            className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="pd-exit-title" className="font-display text-h3 font-bold text-foreground">
              Leave this test?
            </h3>
            <p className="mt-1.5 text-body text-muted">
              Your {answeredCount} answer{answeredCount === 1 ? "" : "s"} stay saved on this device — you
              can come back and pick up where you left off.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setExitOpen(false)}
                className="h-11 flex-1 rounded-full bg-brand-600 text-body font-semibold text-white hover:bg-brand-700"
              >
                Keep solving
              </button>
              <button
                type="button"
                onClick={() => {
                  track("test_abandon", {
                    test_id: test.id,
                    test_title: test.title,
                    answered: answeredCount,
                    total,
                    at_question: index + 1,
                    seconds_elapsed: durationSec - timeLeft,
                  });
                  router.push("/exams");
                }}
                className="h-11 flex-1 rounded-full border border-border text-body font-semibold text-foreground hover:bg-surface"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit confirmation */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setConfirmOpen(false)}>
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg font-bold text-foreground">Submit test?</h3>
            <p className="mt-1 text-sm text-muted">You can&apos;t change answers after submitting.</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-emerald-50 py-2">
                <div className="text-lg font-bold text-emerald-700">{answeredCount}</div>
                <div className="text-xs text-emerald-600">Answered</div>
              </div>
              <div className="rounded-xl bg-amber-50 py-2">
                <div className="text-lg font-bold text-amber-700">{Object.values(marked).filter(Boolean).length}</div>
                <div className="text-xs text-amber-600">Marked</div>
              </div>
              <div className="rounded-xl bg-surface py-2">
                <div className="text-lg font-bold text-foreground">{total - answeredCount}</div>
                <div className="text-xs text-muted">Left</div>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground"
              >
                Keep solving
              </button>
              <button
                type="button"
                onClick={() => void doSubmit()}
                disabled={submitting}
                className="flex-1 rounded-full bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
