import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import BookmarkButton from "@/components/BookmarkButton";

export const metadata: Metadata = { title: "Your Bookmarks", robots: { index: false } };

export default async function BookmarksPage() {
  const su = await getSessionUser();
  if (!su) redirect("/login?next=/practice/bookmarks");

  const rows = await prisma.bookmark.findMany({
    where: { userId: su.id, questionId: { not: null } },
    orderBy: { createdAt: "desc" },
    include: {
      question: { include: { options: { orderBy: { order: "asc" } }, chapter: { select: { name: true } } } },
    },
  });
  const items = rows.filter((b) => b.question);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-brand-600">
        ← Dashboard
      </Link>
      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        Your bookmarks 🔖
      </h1>
      <p className="mt-1 text-sm text-muted">
        {items.length === 0
          ? `Nothing saved yet — tap "Save" on any question in a test's solutions to keep it here for revision.`
          : `${items.length} question${items.length > 1 ? "s" : ""} saved for revision.`}
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <div className="text-4xl">🔖</div>
          <p className="mt-3 text-sm font-medium text-foreground">No bookmarks yet</p>
          <Link
            href="/exams"
            className="mt-4 inline-block rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Take a test
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((b, i) => {
            const q = b.question!;
            return (
              <div key={b.id} className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-xs font-semibold text-muted">
                    Question {i + 1}
                    {q.chapter ? ` · ${q.chapter.name}` : ""}
                  </span>
                  <BookmarkButton questionId={q.id} initialBookmarked={true} />
                </div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">{q.text}</p>
                <div className="mt-3 space-y-2">
                  {q.options.map((o, oi) => (
                    <div
                      key={o.id}
                      className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${
                        o.isCorrect
                          ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                          : "border-border bg-background text-foreground"
                      }`}
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-xs font-bold">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1 font-medium">{o.text}</span>
                      {o.isCorrect && <span className="text-xs font-bold text-emerald-700">Correct</span>}
                    </div>
                  ))}
                </div>
                {q.explanation && (
                  <div className="mt-3 rounded-xl bg-brand-50 p-3.5">
                    <p className="text-xs font-semibold text-brand-700">💡 Solution</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-900">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
