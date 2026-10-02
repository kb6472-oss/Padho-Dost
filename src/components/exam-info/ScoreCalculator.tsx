"use client";

import { useMemo, useState } from "react";
import type { ExamInfo } from "@/lib/exam-info";

type Calc = NonNullable<ExamInfo["calculator"]>;
type Cutoff = ExamInfo["cutoffs"][number];

const fmt = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(2).replace(/\.?0+$/, ""));

// Live score calculator: right/wrong per section → score with the official negative
// marking, compared with the latest official cut-off for the chosen category.
export default function ScoreCalculator({ calc, cutoff }: { calc: Calc; cutoff: Cutoff | null }) {
  const [vals, setVals] = useState(() => calc.sections.map(() => ({ right: "", wrong: "" })));
  const [category, setCategory] = useState(cutoff?.rows[0]?.category ?? "");

  const result = useMemo(() => {
    let score = 0, right = 0, wrong = 0, max = 0;
    const perSection = calc.sections.map((s, i) => {
      const r = Math.max(0, Math.min(s.questions, Number(vals[i].right) || 0));
      const w = Math.max(0, Math.min(s.questions - r, Number(vals[i].wrong) || 0));
      const sec = r * s.correctMarks + w * s.wrongMarks;
      score += sec; right += r; wrong += w; max += s.questions * s.correctMarks;
      return { r, w, sec, over: (Number(vals[i].right) || 0) + (Number(vals[i].wrong) || 0) > s.questions };
    });
    const totalQ = calc.sections.reduce((n, s) => n + s.questions, 0);
    return { score, right, wrong, max, perSection, unattempted: totalQ - right - wrong, accuracy: right + wrong ? Math.round((right / (right + wrong)) * 100) : null };
  }, [vals, calc]);

  const cutRow = cutoff?.rows.find((r) => r.category === category);
  const cutMarks = cutRow ? Number.parseFloat(cutRow.marks) : NaN;
  const touched = vals.some((v) => v.right !== "" || v.wrong !== "");

  return (
    <div className="mt-6">
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[460px] text-left text-body">
          <thead className="bg-surface text-caption text-muted">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Section</th>
              <th className="px-3 py-2.5 font-semibold">Right</th>
              <th className="px-3 py-2.5 font-semibold">Wrong</th>
              <th className="px-4 py-2.5 text-right font-semibold">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {calc.sections.map((s, i) => (
              <tr key={s.name} className="bg-background">
                <td className="px-4 py-2.5">
                  <div className="font-medium text-foreground">{s.name}</div>
                  <div className="text-caption text-muted">
                    {s.questions} Q · +{fmt(s.correctMarks)} / {fmt(s.wrongMarks)}
                  </div>
                </td>
                {(["right", "wrong"] as const).map((f) => (
                  <td key={f} className="px-3 py-2.5">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      max={s.questions}
                      aria-label={`${s.name} — ${f} answers`}
                      value={vals[i][f]}
                      onChange={(e) => setVals((v) => v.map((x, j) => (j === i ? { ...x, [f]: e.target.value } : x)))}
                      className={`h-11 w-20 rounded-xl border bg-background px-3 text-body ${result.perSection[i].over ? "border-rose-400" : "border-border"}`}
                    />
                  </td>
                ))}
                <td className="px-4 py-2.5 text-right font-semibold text-foreground">{fmt(result.perSection[i].sec)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {result.perSection.some((p) => p.over) && (
        <p className="mt-2 text-caption text-rose-600">Right + wrong can&apos;t exceed the questions in a section — extra values are ignored.</p>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="surface-3 border-brand-200 bg-brand-50 p-4 sm:col-span-2">
          <div className="text-caption font-medium text-brand-700">Your score</div>
          <div className="mt-1 font-display text-h1 font-extrabold text-brand-900">
            {fmt(result.score)} <span className="text-h3 font-bold text-brand-700">/ {fmt(result.max)}</span>
          </div>
        </div>
        <div className="surface-1 p-4">
          <div className="text-caption text-muted">Attempted</div>
          <div className="mt-1 font-display text-h3 font-bold">{result.right + result.wrong}</div>
          <div className="text-caption text-muted">{result.unattempted} left</div>
        </div>
        <div className="surface-1 p-4">
          <div className="text-caption text-muted">Accuracy</div>
          <div className="mt-1 font-display text-h3 font-bold">{result.accuracy == null ? "—" : `${result.accuracy}%`}</div>
        </div>
      </div>

      {cutoff && cutoff.rows.length > 0 && (
        <div className="mt-5 surface-1 p-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-body font-semibold text-foreground">Compare with the {cutoff.year} official cut-off ({cutoff.stage}):</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Category"
              className="h-10 rounded-xl border border-border bg-background px-3 text-body"
            >
              {cutoff.rows.map((r) => <option key={r.category} value={r.category}>{r.category}</option>)}
            </select>
          </div>
          {cutRow && (
            <p className="mt-3 text-body">
              Cut-off: <span className="font-semibold">{cutRow.marks}</span>
              {touched && !Number.isNaN(cutMarks) && (
                <span className={`ml-2 font-semibold ${result.score >= cutMarks ? "text-emerald-700" : "text-rose-700"}`}>
                  {result.score >= cutMarks
                    ? `You're ${fmt(result.score - cutMarks)} marks above it.`
                    : `You're ${fmt(cutMarks - result.score)} marks below it.`}
                </span>
              )}
            </p>
          )}
          <p className="mt-2 text-caption text-muted">
            Cut-offs change every year with difficulty and vacancies — treat last year&apos;s as a guide, not a promise. {cutoff.note}
          </p>
        </div>
      )}
      {calc.note && <p className="mt-4 text-caption text-muted">{calc.note}</p>}
    </div>
  );
}
