import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getAdminStudents } from "@/lib/admin-stats";
import { AdminNav, istDate, timeAgo } from "@/components/admin/AdminUi";

export const metadata: Metadata = { title: "Students · Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string }> };

export default async function AdminStudentsPage({ searchParams }: Props) {
  if (!(await isAdmin())) notFound();
  const { q } = await searchParams;
  const students = await getAdminStudents(q);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <AdminNav active="students" />
      <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-h1 font-extrabold tracking-tight text-foreground">Students</h1>
          <p className="mt-1 text-body text-muted">
            {students.length} signed-up student{students.length === 1 ? "" : "s"}
            {q ? ` matching “${q}”` : ""}, most recently active first.
          </p>
        </div>
        <form className="flex gap-2" action="/admin/students">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search name or email"
            className="w-56 rounded-full border border-border bg-background px-4 py-2 text-body"
          />
          <button className="rounded-full bg-brand-600 px-4 py-2 text-body font-semibold text-white hover:bg-brand-700">
            Search
          </button>
        </form>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] text-left text-body">
          <thead className="bg-surface text-caption text-muted">
            <tr>
              <th className="px-4 py-2.5 font-semibold">Student</th>
              <th className="px-4 py-2.5 font-semibold">Goal</th>
              <th className="px-4 py-2.5 font-semibold">Joined</th>
              <th className="px-4 py-2.5 font-semibold">Last active</th>
              <th className="px-4 py-2.5 text-right font-semibold">Tests</th>
              <th className="px-4 py-2.5 text-right font-semibold">Avg score</th>
              <th className="px-4 py-2.5 text-right font-semibold">Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-muted">No students found.</td>
              </tr>
            )}
            {students.map((s) => (
              <tr key={s.id} className="bg-background">
                <td className="px-4 py-2.5">
                  <Link href={`/admin/students/${s.id}`} className="font-semibold text-brand-700 hover:underline">
                    {s.name || s.email.split("@")[0]}
                  </Link>
                  <div className="text-caption text-muted">{s.email}</div>
                </td>
                <td className="px-4 py-2.5 text-caption text-muted">{s.targetExamSlug ?? "—"}</td>
                <td className="px-4 py-2.5 text-caption text-muted">{istDate(s.createdAt)}</td>
                <td className="px-4 py-2.5 text-caption text-muted">{timeAgo(s.lastActiveAt)}</td>
                <td className="px-4 py-2.5 text-right">
                  {s.finished}
                  <span className="text-caption text-muted"> / {s.attempts}</span>
                </td>
                <td className="px-4 py-2.5 text-right">{s.avgPct == null ? "—" : `${s.avgPct}%`}</td>
                <td className="px-4 py-2.5 text-right text-caption text-muted">
                  {s.currentStreak}d <span className="opacity-70">(best {s.longestStreak})</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-caption text-muted">Tests = finished / started.</p>
    </div>
  );
}
