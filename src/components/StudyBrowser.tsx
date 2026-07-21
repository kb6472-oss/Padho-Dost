"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export type StudyExam = { slug: string; label: string; emoji: string; count: number };

export type StudyExplainer = {
  slug: string;
  title: string;
  summary: string;
  minutes: number;
  examSlug: string;
  examLabel: string;
  examEmoji: string;
  subject: string;
  subjectOrder: number;
  pct: number | null;
  done: boolean;
  lastReadAt: number | null;
};

/**
 * The study index. Replaces a flat alphabetical A–Z dump of 59 explainers that
 * had no exam filter and no grouping — you couldn't answer "show me SSC quant".
 *
 * Filtering is client-side: the whole (small) corpus ships once and the chips
 * just narrow what's shown, so switching exams is instant with no round-trip.
 */
export default function StudyBrowser({
  explainers,
  exams,
  defaultExam,
  signedIn,
}: {
  explainers: StudyExplainer[];
  exams: StudyExam[];
  defaultExam: string;
  signedIn: boolean;
}) {
  const [active, setActive] = useState(defaultExam);

  const visible = useMemo(
    () => (active === "all" ? explainers : explainers.filter((e) => e.examSlug === active)),
    [active, explainers],
  );

  // Continue reading: started-but-not-finished, most recent first. Drawn from the
  // FULL set (not the active filter) so a student always sees where they left off.
  const continueReading = useMemo(
    () =>
      explainers
        .filter((e) => !e.done && e.pct != null && e.pct > 0)
        .sort((a, b) => (b.lastReadAt ?? 0) - (a.lastReadAt ?? 0))
        .slice(0, 3),
    [explainers],
  );

  // Group the visible set by exam then subject, preserving subject order.
  const groups = useMemo(() => {
    const byKey = new Map<string, { examLabel: string; examEmoji: string; subject: string; subjectOrder: number; items: StudyExplainer[] }>();
    for (const e of visible) {
      const key = `${e.examSlug}::${e.subject}`;
      const g = byKey.get(key);
      if (g) g.items.push(e);
      else byKey.set(key, { examLabel: e.examLabel, examEmoji: e.examEmoji, subject: e.subject, subjectOrder: e.subjectOrder, items: [e] });
    }
    return [...byKey.values()].sort(
      (a, b) => a.examLabel.localeCompare(b.examLabel) || a.subjectOrder - b.subjectOrder || a.subject.localeCompare(b.subject),
    );
  }, [visible]);

  const chip = (slug: string, label: string, count: number) => {
    const on = active === slug;
    return (
      <button
        key={slug}
        type="button"
        onClick={() => setActive(slug)}
        aria-pressed={on}
        className={`shrink-0 rounded-full px-4 py-2 text-body font-semibold transition-colors ${
          on ? "bg-brand-600 text-white" : "surface-2 text-muted hover:text-foreground"
        }`}
      >
        {label} <span className={on ? "text-brand-100" : "text-muted"}>· {count}</span>
      </button>
    );
  };

  return (
    <div className="mt-6">
      {/* Continue reading */}
      {signedIn && continueReading.length > 0 && (
        <section className="mb-8">
          <h2 className="text-caption font-semibold uppercase tracking-wide text-muted">Continue reading</h2>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {continueReading.map((e) => (
              <Link
                key={e.slug}
                href={`/study/${e.slug}`}
                className="surface-3 surface-3-interactive w-64 shrink-0 p-4"
              >
                <div className="text-caption text-muted">{e.examLabel} · {e.subject}</div>
                <div className="mt-1 line-clamp-2 font-display text-body font-semibold text-foreground">{e.title}</div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: `${e.pct ?? 0}%` }} />
                </div>
                <div className="mt-1.5 text-caption text-brand-600">{e.pct}% · resume →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Exam filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {chip("all", "All", explainers.length)}
        {exams.map((x) => chip(x.slug, `${x.emoji} ${x.label}`, x.count))}
      </div>

      {/* Grouped results */}
      <div className="mt-8 space-y-10">
        {groups.map((g) => (
          <section key={`${g.examLabel}::${g.subject}`}>
            <h2 className="font-display text-h3 font-bold text-foreground">
              {active === "all" && <span className="text-muted">{g.examEmoji} {g.examLabel} · </span>}
              {g.subject}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((e) => (
                <Link
                  key={e.slug}
                  href={`/study/${e.slug}`}
                  className="surface-2 group flex h-full flex-col p-5 transition-colors hover:border-brand-300"
                >
                  {e.done ? (
                    <span className="inline-flex items-center gap-1 text-caption font-semibold text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
                      Completed
                    </span>
                  ) : e.pct != null && e.pct > 0 ? (
                    <span className="text-caption font-semibold text-brand-600">{e.pct}% read</span>
                  ) : (
                    <span className="text-caption font-semibold text-muted">{e.minutes} min read</span>
                  )}

                  <h3 className="mt-2 font-display text-body-lg font-semibold text-foreground">{e.title}</h3>
                  <p className="mt-1 line-clamp-2 flex-1 text-body text-muted">{e.summary}</p>

                  {e.pct != null && e.pct > 0 && !e.done && (
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface">
                      <div className="h-full rounded-full bg-brand-600" style={{ width: `${e.pct}%` }} />
                    </div>
                  )}

                  <span className="mt-3 inline-flex items-center gap-1 text-body font-semibold text-brand-600 group-hover:gap-2">
                    {e.done ? "Read again" : e.pct ? "Resume" : "Read"}
                    <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
