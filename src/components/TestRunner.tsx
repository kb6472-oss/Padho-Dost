"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitAttempt } from "@/lib/test-actions";

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
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Per-question dwell-time tracking (uses refs to avoid re-render churn).
  const timeRef = useRef<Record<string, number>>({});
  const enterRef = useRef<number>(0);
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const commitCurrentTime = useCallback(() => {
    const now = Date.now();
    const qid = test.questions[indexRef.current]?.id;
    const elapsed = (now - enterRef.current) / 1000;
    if (qid && enterRef.current && elapsed > 0 && elapsed < 3600) {
      timeRef.current[qid] = (timeRef.current[qid] || 0) + elapsed;
    }
    enterRef.current = now;
  }, [test.questions]);

  // Hydrate from localStorage (same-device, offline-safe resume).
  useEffect(() => {
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
    if (saved && saved.startedAt) {
      setAnswers(saved.answers || {});
      setMarked(saved.marked || {});
      setIndex(Math.min(saved.index || 0, total - 1));
      setStartedAt(saved.startedAt);
      timeRef.current = saved.times || {};
    } else {
      const now = Date.now();
      setStartedAt(now);
      localStorage.setItem(storageKey, JSON.stringify({ startedAt: now, answers: {}, marked: {}, index: 0 }));
    }
    enterRef.current = Date.now();
    setReady(true);
  }, [storageKey, total]);

  // Persist progress on every change.
  useEffect(() => {
    if (!ready || !startedAt) return;
    localStorage.setItem(storageKey, JSON.stringify({ startedAt, answers, marked, index, times: timeRef.current }));
  }, [ready, startedAt, answers, marked, index, storageKey]);

  const doSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    commitCurrentTime();
    const timeTakenSec = Math.min(durationSec, Math.max(0, Math.round((Date.now() - startedAt) / 1000)));
    const payload = Object.entries(answers).map(([questionId, selectedOptionId]) => ({ questionId, selectedOptionId }));
    const times = Object.entries(timeRef.current).map(([questionId, seconds]) => ({ questionId, seconds: Math.round(seconds) }));
    try {
      const res = await submitAttempt({ mockTestId: test.id, anonId: getAnonId(), timeTakenSec, answers: payload, times });
      localStorage.removeItem(storageKey);
      router.push(`/test/${test.id}/result/${res.attemptId}`);
    } catch {
      setSubmitting(false);
      alert("Could not submit — please check your connection and try again. Your answers are saved on this device.");
    }
  }, [submitting, durationSec, startedAt, answers, test.id, storageKey, router, commitCurrentTime]);

  // Countdown timer (computed from startedAt so it survives refresh).
  useEffect(() => {
    if (!ready || !startedAt) return;
    const tick = () => {
      const left = Math.max(0, durationSec - Math.floor((Date.now() - startedAt) / 1000));
      setTimeLeft(left);
      if (left <= 0) doSubmit();
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [ready, startedAt, durationSec, doSubmit]);

  if (!ready) {
    return <div className="py-24 text-center text-sm text-muted">Loading test…</div>;
  }

  const q = test.questions[index];
  const selected = answers[q.id];
  const answeredCount = Object.keys(answers).length;
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  const lowTime = timeLeft <= 60;

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
      <div className="sticky top-16 z-10 -mx-4 mb-4 border-b border-border bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
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

        <p className="mt-4 text-base font-medium leading-relaxed text-foreground">{q.text}</p>

        <div className="mt-5 space-y-2.5">
          {q.options.map((o, i) => {
            const active = selected === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => selectOption(o.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors ${
                  active
                    ? "border-brand-600 bg-brand-50 text-brand-900"
                    : "border-border bg-background hover:border-brand-300 hover:bg-surface"
                }`}
              >
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    active ? "bg-brand-600 text-white" : "bg-surface text-muted"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-medium">{o.text}</span>
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

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goTo(Math.max(0, index - 1))}
          disabled={index === 0}
          className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground disabled:opacity-40"
        >
          ← Prev
        </button>
        {index < total - 1 ? (
          <button
            type="button"
            onClick={() => goTo(Math.min(total - 1, index + 1))}
            className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Submit test
          </button>
        )}
      </div>

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
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-10">
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
                className={`h-9 rounded-lg border text-xs font-semibold ${cls} ${
                  isCurrent ? "ring-2 ring-brand-600 ring-offset-1" : ""
                }`}
              >
                {i + 1}
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
                onClick={doSubmit}
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
