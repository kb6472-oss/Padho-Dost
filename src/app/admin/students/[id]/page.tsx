import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getAdminStudent } from "@/lib/admin-stats";
import { AdminNav, AttemptList, Stat, istDate, timeAgo } from "@/components/admin/AdminUi";

export const metadata: Metadata = { title: "Student · Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function AdminStudentPage({ params }: Props) {
  if (!(await isAdmin())) notFound();
  const { id } = await params;
  const data = await getAdminStudent(id);
  if (!data) notFound();
  const { user, attempts, studyDays } = data;

  const finished = attempts.filter((a) => a.status === "SUBMITTED" && a.totalMarks > 0 && a.score != null);
  const avg = finished.length
    ? Math.round((finished.reduce((s, a) => s + (a.score as number) / a.totalMarks, 0) / finished.length) * 100)
    : null;
  const qAnswered = studyDays.reduce((s, d) => s + d.questionsAnswered, 0);
  const minutes = Math.round(studyDays.reduce((s, d) => s + d.secondsStudied, 0) / 60);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <AdminNav active="students" />
      <Link href="/admin/students" className="mt-6 inline-block text-caption font-semibold text-brand-600 hover:text-brand-700">
        ← All students
      </Link>
      <h1 className="mt-2 font-display text-h1 font-extrabold tracking-tight text-foreground">{user.name || user.email}</h1>
      <p className="mt-1 text-body text-muted">
        {user.email}
        {user.phone ? ` · ${user.phone}` : ""} · joined {istDate(user.createdAt)} · last active {timeAgo(user.lastActiveAt)}
      </p>
      <p className="mt-1 text-caption text-muted">
        Goal: {user.targetExamSlug ?? "not set"}
        {user.examYear ? ` (${user.examYear})` : ""}
        {user.classLevel ? ` · Class ${user.classLevel}` : ""}
        {user.board ? ` · ${user.board}` : ""}
      </p>

      <section className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Tests finished" value={finished.length} sub={`${attempts.length} started`} />
        <Stat label="Average score" value={avg == null ? "—" : `${avg}%`} />
        <Stat label="Streak" value={`${user.currentStreak}d`} sub={`best ${user.longestStreak}d`} />
        <Stat label="Last 30 days" value={`${qAnswered} Q`} sub={`${studyDays.length} study days · ${minutes} min`} />
      </section>

      <p className="mt-3 text-caption text-muted">
        {user._count.chapterProgress} chapters practised · {user._count.explainerProgress} lessons read · {user._count.bookmarks} bookmarks
        {user.enrollments.length > 0 &&
          ` · enrolled: ${user.enrollments.map((e) => `${e.exam.shortName} (${e.chaptersDone}/${e.totalChapters} chapters)`).join(", ")}`}
      </p>

      <h2 className="mt-8 font-display text-body-lg font-bold text-foreground">Test history</h2>
      <div className="mt-3">
        <AttemptList attempts={attempts} showWho={false} />
      </div>
    </div>
  );
}
