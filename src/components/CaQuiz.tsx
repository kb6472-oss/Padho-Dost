"use client";

import { useState } from "react";

type Q = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

// Self-check quiz on the current-affairs digest. Answers are graded in the
// browser on purpose: this is practice, not a ranked test, so there is nothing
// to protect and instant feedback is worth more than hiding the key.
export default function CaQuiz({ questions }: { questions: Q[] }) {
  const [picked, setPicked] = useState<Record<string, number>>({});

  const answered = Object.keys(picked).length;
  const correct = questions.filter((q) => picked[q.id] === q.correctIndex).length;

  return (
    <section className="mt-10">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-foreground">Test yourself</h2>
        {answered > 0 && (
          <span className="text-sm font-semibold text-muted">
            {correct}/{answered} correct
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-muted">
        {questions.length} questions on today&apos;s update — tap an option to check your answer.
      </p>

      <ol className="mt-5 space-y-4">
        {questions.map((q, qi) => {
          const choice = picked[q.id];
          const done = choice !== undefined;
          return (
            <li key={q.id} className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm font-medium leading-relaxed text-foreground">
                <span className="mr-1.5 font-bold text-brand-600">Q{qi + 1}.</span>
                {q.text}
              </p>

              <div className="mt-4 space-y-2">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.correctIndex;
                  const isPicked = choice === oi;

                  let cls = "border-border bg-background hover:border-brand-300 hover:bg-surface";
                  if (done && isCorrect) cls = "border-emerald-300 bg-emerald-50 text-emerald-900";
                  else if (done && isPicked) cls = "border-rose-300 bg-rose-50 text-rose-900";
                  else if (done) cls = "border-border bg-background opacity-60";

                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={done}
                      onClick={() => setPicked((p) => ({ ...p, [q.id]: oi }))}
                      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors ${cls}`}
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface text-xs font-bold text-muted">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="font-medium">{opt}</span>
                      {done && isCorrect && <span className="ml-auto text-xs font-bold">✓</span>}
                    </button>
                  );
                })}
              </div>

              {done && q.explanation && (
                <p className="mt-3 rounded-xl bg-surface p-3 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-foreground">Why: </span>
                  {q.explanation}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
