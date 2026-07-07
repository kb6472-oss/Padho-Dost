import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Review Your Mistakes", robots: { index: false } };

export default async function MistakesPage() {
  const su = await getSessionUser();
  if (!su) redirect("/login?next=/practice/mistakes");

  const wrong = await prisma.answer.findMany({
    where: { attempt: { userId: su.id, status: "SUBMITTED" }, isCorrect: false, selectedOptionId: { not: null } },
    orderBy: { updatedAt: "desc" },
    include: {
      question: {
        include: { options: { orderBy: { order: "asc" } }, chapter: { select: { name: true } } },
      },
    },
  });

  // one card per question (most recent wrong attempt)
  const seen = new Set<string>();
  const items = wrong.filter((a) => (seen.has(a.questionId) ? false : (seen.add(a.questionId), true)));

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link href="/dashboard" className="text-sm font-medium text-muted hover:text-brand-600">
        ← Dashboard
      </Link>
      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        Review your mistakes 🎯
      </h1>
      <p className="mt-1 text-sm text-muted">
        {items.length === 0
          ? "No mistakes yet — keep taking tests and we'll collect the tricky ones here."
          : `${items.length} question${items.length > 1 ? "s" : ""} you got wrong. Revisiting mistakes is the fastest way to improve.`}
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
          <div className="text-4xl">✅</div>
          <p className="mt-3 text-sm font-medium text-foreground">Nothing to review</p>
          <Link href="/exams" className="mt-4 inline-block rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            Take a test
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((a, i) => (
            <div key={a.id} className="rounded-2xl border border-border bg-background p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted">
                  Question {i + 1}
                  {a.question.chapter ? ` · ${a.question.chapter.name}` : ""}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">{a.question.text}</p>
              <div className="mt-3 space-y-2">
                {a.question.options.map((o, oi) => {
                  const isCorrect = o.isCorrect;
                  const isPicked = o.id === a.selectedOptionId;
                  let cls = "border-border bg-background text-foreground";
                  if (isCorrect) cls = "border-emerald-300 bg-emerald-50 text-emerald-900";
                  else if (isPicked) cls = "border-rose-300 bg-rose-50 text-rose-900";
                  return (
                    <div key={o.id} className={`flex items-center gap-3 rounded-xl border p-3 text-sm ${cls}`}>
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-xs font-bold">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1 font-medium">{o.text}</span>
                      {isCorrect && <span className="text-xs font-bold text-emerald-700">Correct</span>}
                      {isPicked && !isCorrect && <span className="text-xs font-bold text-rose-700">You chose</span>}
                    </div>
                  );
                })}
              </div>
              {a.question.explanation && (
                <div className="mt-3 rounded-xl bg-brand-50 p-3.5">
                  <p className="text-xs font-semibold text-brand-700">💡 Solution</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-900">{a.question.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
