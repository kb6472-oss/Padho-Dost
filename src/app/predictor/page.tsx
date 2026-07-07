"use client";

import { useState } from "react";

function jeeEstimate(marks: number) {
  let percentile: number, colleges: string;
  if (marks >= 250) { percentile = 99.6; colleges = "Top NITs/IIITs · JEE Advanced eligible (IIT-bound)"; }
  else if (marks >= 200) { percentile = 99.0; colleges = "Good NITs & IIITs (popular branches possible)"; }
  else if (marks >= 150) { percentile = 96.5; colleges = "NITs/IIITs (mid branches), GFTIs"; }
  else if (marks >= 100) { percentile = 88; colleges = "Lower NITs & state government colleges"; }
  else if (marks >= 60) { percentile = 70; colleges = "State & private engineering colleges"; }
  else { percentile = 45; colleges = "Private colleges · consider an improvement attempt"; }
  const rank = Math.max(1, Math.round((1 - percentile / 100) * 1_100_000));
  return { line1: `~${percentile} percentile`, line2: `Estimated AIR ≈ ${rank.toLocaleString("en-IN")}`, colleges };
}

function neetEstimate(marks: number) {
  let rank: number, colleges: string;
  if (marks >= 650) { rank = 4000; colleges = "Top government MBBS (AIIMS / top state colleges) likely"; }
  else if (marks >= 600) { rank = 18000; colleges = "Government MBBS in many states"; }
  else if (marks >= 550) { rank = 45000; colleges = "Govt MBBS (some states) / good private MBBS"; }
  else if (marks >= 480) { rank = 95000; colleges = "Private MBBS / BDS / deemed universities"; }
  else if (marks >= 400) { rank = 200000; colleges = "BDS / AYUSH / private (varies by category & state)"; }
  else { rank = 400000; colleges = "AYUSH / private · consider a retake"; }
  return { line1: `Estimated AIR ≈ ${rank.toLocaleString("en-IN")}`, line2: "", colleges };
}

export default function PredictorPage() {
  const [exam, setExam] = useState<"jee" | "neet">("jee");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState<{ line1: string; line2: string; colleges: string } | null>(null);

  const max = exam === "jee" ? 300 : 720;

  function predict(e: React.FormEvent) {
    e.preventDefault();
    const m = Math.max(0, Math.min(max, Number(marks) || 0));
    setResult(exam === "jee" ? jeeEstimate(m) : neetEstimate(m));
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          🎯 Rank & College Predictor
        </h1>
        <p className="mt-1 text-sm text-muted">Enter your expected marks to see an estimated rank and college range.</p>
      </div>

      <div className="mt-6 flex rounded-full border border-border bg-surface p-1">
        {(["jee", "neet"] as const).map((x) => (
          <button
            key={x}
            type="button"
            onClick={() => { setExam(x); setResult(null); setMarks(""); }}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              exam === x ? "bg-brand-600 text-white" : "text-muted hover:text-foreground"
            }`}
          >
            {x === "jee" ? "⚗️ JEE Main" : "🩺 NEET UG"}
          </button>
        ))}
      </div>

      <form onSubmit={predict} className="mt-4 space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Expected marks (out of {max})
          <input
            type="number"
            min={0}
            max={max}
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
            placeholder={exam === "jee" ? "e.g. 180" : "e.g. 600"}
            className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand-500"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Predict my rank
        </button>
      </form>

      {result && (
        <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Estimated result</p>
          <p className="mt-2 font-display text-2xl font-extrabold text-foreground">{result.line1}</p>
          {result.line2 && <p className="text-sm font-semibold text-muted">{result.line2}</p>}
          <p className="mt-3 text-sm text-brand-900">🎓 {result.colleges}</p>
        </div>
      )}

      <p className="mt-6 rounded-xl bg-amber-50 p-3 text-center text-xs leading-relaxed text-amber-800">
        ⚠️ This is a rough estimate for guidance only. Actual rank &amp; admissions depend on category, state quota,
        seat availability and the year&apos;s difficulty. Always check official counselling data.
      </p>
    </div>
  );
}
