import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getAdminOverview, getRecentAttempts } from "@/lib/admin-stats";
import { AdminNav, AttemptList, Stat } from "@/components/admin/AdminUi";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  // notFound (not redirect) so the page's existence isn't revealed to non-admins.
  if (!(await isAdmin())) notFound();

  const [o, recent] = await Promise.all([getAdminOverview(), getRecentAttempts(40)]);
  const max = Math.max(1, ...o.series.map((d) => d.started));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <AdminNav active="overview" />
      <h1 className="mt-6 font-display text-h1 font-extrabold tracking-tight text-foreground">Student activity</h1>
      <p className="mt-1 text-body text-muted">
        What visitors do once they start practising. Page views and traffic sources live in Google Analytics.
      </p>

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Tests started today" value={o.attempts.today} sub={`${o.attempts.started7} in 7 days`} />
        <Stat
          label="People practising (30d)"
          value={o.takers.d30.registered + o.takers.d30.guests}
          sub={`${o.takers.d30.guests} guests · ${o.takers.d30.registered} signed in`}
        />
        <Stat label="Tests taken (30d)" value={o.attempts.finished30} sub={`${o.attempts.finished7} in 7 days`} />
        <Stat label="Average score (30d)" value={o.avgScorePct30 == null ? "—" : `${o.avgScorePct30}%`} />
        <Stat label="Registered students" value={o.users.total} sub={`+${o.users.new30} in 30 days`} />
        <Stat label="New sign-ups (7d)" value={o.users.new7} />
        <Stat label="Active students (7d)" value={o.users.active7} sub="signed in & studied" />
        <Stat
          label="People practising (7d)"
          value={o.takers.d7.registered + o.takers.d7.guests}
          sub={`${o.takers.d7.guests} guests · ${o.takers.d7.registered} signed in`}
        />
      </section>

      <section className="mt-8 surface-1 p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-h3 font-bold text-foreground">Last 30 days</h2>
          <div className="flex gap-4 text-caption text-muted">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand-200" /> tests taken</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-brand-600" /> people</span>
          </div>
        </div>
        <div className="mt-4 flex h-40 items-end gap-1">
          {o.series.map((d) => (
            <div
              key={d.day}
              className="relative flex h-full flex-1 flex-col justify-end"
              title={`${d.day}: ${d.started} started, ${d.finished} finished, ${d.people} people, ${d.signups} sign-ups`}
            >
              <div className="w-full rounded-t bg-brand-200" style={{ height: `${(d.started / max) * 100}%` }}>
                <div className="absolute bottom-0 w-full rounded-t bg-brand-600" style={{ height: `${(d.people / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between text-caption text-muted">
          <span>{o.series[0].day.slice(5)}</span>
          <span>{o.series[14].day.slice(5)}</span>
          <span>today</span>
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="font-display text-body-lg font-bold text-foreground">Most-taken tests (30d)</h2>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {o.topTests.length === 0 && <li className="bg-background px-4 py-3 text-body text-muted">No tests yet.</li>}
            {o.topTests.map((t) => (
              <li key={t.id} className="flex items-center gap-3 bg-background px-4 py-2.5 text-body">
                <span className="min-w-0 flex-1 truncate">
                  {t.title} <span className="text-caption text-muted">{t.exam}</span>
                </span>
                <span className="shrink-0 text-caption text-muted">
                  <span className="font-semibold text-foreground">{t.started}</span> started · {t.finished} done
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-body-lg font-bold text-foreground">Exams by activity (30d)</h2>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border">
            {o.topExams.length === 0 && <li className="bg-background px-4 py-3 text-body text-muted">No activity yet.</li>}
            {o.topExams.map((e) => (
              <li key={e.exam} className="flex items-center justify-between bg-background px-4 py-2.5 text-body">
                <span>{e.exam}</span>
                <span className="text-caption text-muted">
                  <span className="font-semibold text-foreground">{e.people}</span> people · {e.started} tests
                </span>
              </li>
            ))}
          </ul>
          {o.goals.length > 0 && (
            <>
              <h3 className="mt-5 text-body font-semibold text-foreground">Students&apos; exam goals</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {o.goals.map((g) => (
                  <span key={g.exam} className="rounded-full bg-surface px-3 py-1 text-caption text-muted">
                    {g.exam} · <span className="font-semibold text-foreground">{g.count}</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      <section className="mt-8">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-body-lg font-bold text-foreground">Recent tests</h2>
          <Link href="/admin/students" className="text-caption font-semibold text-brand-600 hover:text-brand-700">
            All students →
          </Link>
        </div>
        <div className="mt-3">
          <AttemptList attempts={recent} />
        </div>
      </section>
    </div>
  );
}
