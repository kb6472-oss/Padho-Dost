import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, syncUser, toDisplayUser } from "@/lib/auth";
import { getDashboardData } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

const pct = (score: number | null, total: number) => (total > 0 ? Math.round(((score ?? 0) / total) * 100) : 0);
const fmtDate = (d: Date | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "";

export default async function DashboardPage() {
  const su = await getSessionUser();
  if (!su) redirect("/login?next=/dashboard");
  await syncUser(su); // ensure the DB row exists
  const display = toDisplayUser(su);
  const firstName = (display?.name || display?.email || "there").split(" ")[0].split("@")[0];

  const { attempts, weakAreas, stats, streak, enrollments, reading, mistakesCount, badges } = await getDashboardData(su.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        Hi, {firstName}! 👋
      </h1>
      <p className="mt-1 text-sm text-muted">Your progress at a glance.</p>

      <Link
        href="/daily"
        className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 transition-colors hover:border-amber-300"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📅</span>
          <div>
            <p className="text-sm font-semibold text-foreground">Today&apos;s Daily Challenge</p>
            <p className="text-xs text-muted">One question a day keeps your 🔥 streak alive</p>
          </div>
        </div>
        <span className="font-semibold text-amber-600">Play →</span>
      </Link>

      {reading.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-lg font-bold text-foreground">Continue reading</h2>
          <div className="mt-3 space-y-2.5">
            {reading.map((r) => (
              <Link
                key={r.id}
                href={`/study/${r.explainer.slug}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-brand-300"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">📖 {r.explainer.title}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-brand-600" style={{ width: `${r.scrollPct}%` }} />
                  </div>
                </div>
                <span className="flex-shrink-0 text-sm font-semibold text-brand-600">{r.scrollPct}%</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {attempts.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <div className="text-4xl">📝</div>
          <p className="mt-3 font-display text-lg font-semibold text-foreground">No tests yet</p>
          <p className="mt-1 text-sm text-muted">Take your first free mock test — your scores will show up here.</p>
          <Link
            href="/exams"
            className="mt-5 inline-block rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Browse exams
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat value={stats.testsTaken} label="Tests taken" tone="blue" />
            <Stat value={`${stats.avg}%`} label="Avg. score" tone="amber" />
            <Stat value={`${stats.best}%`} label="Best score" tone="green" />
            <Stat value={streak.current} label="Day streak 🔥" tone="rose" />
          </div>

          {mistakesCount > 0 && (
            <Link
              href="/practice/mistakes"
              className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 transition-colors hover:bg-rose-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-sm font-semibold text-rose-900">Review your mistakes</p>
                  <p className="text-xs text-rose-700">
                    {mistakesCount} question{mistakesCount > 1 ? "s" : ""} you got wrong — revise to improve fast
                  </p>
                </div>
              </div>
              <span className="font-semibold text-rose-600">→</span>
            </Link>
          )}

          {enrollments.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg font-bold text-foreground">Your exams</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {enrollments.map((e) => {
                  const doneP = Math.min(100, Math.round((e.chaptersDone / (e.totalChapters || 1)) * 100));
                  return (
                    <Link
                      key={e.examId}
                      href={`/exams/${e.exam.slug}`}
                      className="rounded-2xl border border-border bg-background p-4 transition-colors hover:border-brand-300"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <span className="text-lg">{e.exam.emoji ?? "📘"}</span> {e.exam.name}
                        </span>
                        <span className="text-xs text-muted">
                          {e.chaptersDone}/{e.totalChapters} chapters
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface">
                        <div className="h-full rounded-full bg-brand-600" style={{ width: `${doneP}%` }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="font-display text-lg font-bold text-foreground">Badges</h2>
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-7">
              {badges.map((b) => (
                <div
                  key={b.id}
                  title={b.hint}
                  className={`flex flex-col items-center rounded-2xl border p-3 text-center ${
                    b.earned ? "border-amber-200 bg-amber-50" : "border-border bg-surface opacity-50"
                  }`}
                >
                  <span className={`text-2xl ${b.earned ? "" : "grayscale"}`}>{b.emoji}</span>
                  <span className="mt-1 text-[10px] font-semibold leading-tight text-foreground">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            {/* Recent tests */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-lg font-bold text-foreground">Recent tests</h2>
              <div className="mt-3 space-y-2.5">
                {attempts.slice(0, 10).map((a) => (
                  <Link
                    key={a.id}
                    href={`/test/${a.mockTestId}/result/${a.id}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4 transition-colors hover:border-brand-300"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{a.mockTest.title}</p>
                      <p className="text-xs text-muted">
                        {a.mockTest.exam.shortName} · {fmtDate(a.submittedAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-display text-base font-bold text-brand-700">
                          {pct(a.score, a.totalMarks)}%
                        </div>
                        <div className="text-xs text-muted">
                          {Number((a.score ?? 0).toFixed(2))}/{Number(a.totalMarks.toFixed(2))}
                        </div>
                      </div>
                      <span className="text-brand-600">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Focus areas */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-lg font-bold text-foreground">Focus areas</h2>
              {weakAreas.length === 0 ? (
                <p className="mt-3 text-sm text-muted">Take a few more tests to see your weak topics.</p>
              ) : (
                <div className="mt-3 space-y-3 rounded-2xl border border-border bg-background p-4">
                  {weakAreas.slice(0, 6).map((w) => {
                    const color =
                      w.accuracy < 50 ? "bg-rose-500" : w.accuracy < 70 ? "bg-amber-500" : "bg-emerald-500";
                    return (
                      <div key={w.name}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground">{w.name}</span>
                          <span className="text-muted">{w.accuracy}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface">
                          <div className={`h-full rounded-full ${color}`} style={{ width: `${w.accuracy}%` }} />
                        </div>
                      </div>
                    );
                  })}
                  <p className="pt-1 text-xs text-muted">Lowest-scoring topics first — practise these next.</p>
                </div>
              )}
              <Link
                href="/exams"
                className="mt-4 inline-block rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface"
              >
                Practise more →
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({ value, label, tone }: { value: number | string; label: string; tone: "blue" | "amber" | "green" | "rose" }) {
  const tones = { blue: "text-brand-700", amber: "text-amber-600", green: "text-emerald-700", rose: "text-rose-600" };
  return (
    <div className="rounded-2xl border border-border bg-background py-4 text-center">
      <div className={`font-display text-2xl font-extrabold ${tones[tone]}`}>{value}</div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}
