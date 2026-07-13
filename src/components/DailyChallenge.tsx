"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { submitDaily } from "@/lib/daily-actions";

type Opt = { id: string; text: string };

type Result = { correctOptionId: string | null; isCorrect: boolean; explanation: string | null };

export default function DailyChallenge({
  date,
  question,
}: {
  date: string;
  question: {
    text: string;
    options: Opt[];
    examShort: string;
    chapter: string | null;
  };
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [pending, startTransition] = useTransition();
  const done = result !== null;

  function choose(optionId: string) {
    if (done || pending) return;
    setPicked(optionId);
    startTransition(async () => {
      const r = await submitDaily(date, optionId);
      setResult(r);
    });
  }

  const prettyDate = new Date(date + "T00:00:00Z").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">📅 Question of the Day</p>
        <h1 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Daily Challenge
        </h1>
        <p className="mt-1 text-sm text-muted">{prettyDate}</p>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-background p-5">
        <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-muted">
          {question.examShort}
          {question.chapter ? ` · ${question.chapter}` : ""}
        </span>
        <p className="mt-4 text-base font-medium leading-relaxed text-foreground">{question.text}</p>

        <div className="mt-5 space-y-2.5">
          {question.options.map((o, i) => {
            const isCorrect = done && result?.correctOptionId === o.id;
            const isWrongPick = done && o.id === picked && !isCorrect;
            let cls = "border-border bg-background hover:border-brand-300 hover:bg-surface";
            if (isCorrect) cls = "border-emerald-300 bg-emerald-50 text-emerald-900";
            else if (isWrongPick) cls = "border-rose-300 bg-rose-50 text-rose-900";
            return (
              <button
                key={o.id}
                type="button"
                disabled={done || pending}
                onClick={() => choose(o.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-colors ${cls} ${pending && o.id === picked ? "opacity-70" : ""}`}
              >
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-surface text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="font-medium">{o.text}</span>
                {isCorrect && <span className="ml-auto text-xs font-bold text-emerald-700">Correct</span>}
              </button>
            );
          })}
        </div>

        {done && (
          <div className="mt-4 rounded-xl bg-brand-50 p-4">
            <p className="text-sm font-bold text-brand-900">
              {result?.isCorrect
                ? "🎉 Correct! Streak kept alive 🔥"
                : "❌ Not quite — but you showed up, so your streak is safe 🔥"}
            </p>
            {result?.explanation && (
              <p className="mt-1.5 text-sm leading-relaxed text-brand-900">{result.explanation}</p>
            )}
          </div>
        )}
      </div>

      {done && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/exams"
            className="flex-1 rounded-full bg-brand-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-brand-700"
          >
            Take a full test →
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-foreground hover:bg-surface"
          >
            My dashboard
          </Link>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted">
        Come back every day for a new question — and keep your 🔥 streak alive.
      </p>
    </div>
  );
}
