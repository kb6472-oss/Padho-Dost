import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamWithTests } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExamWithTests(slug);
  if (!exam) return { title: "Exam not found" };
  return {
    title: exam.name,
    description: exam.description ?? `Free mock tests for ${exam.name}.`,
  };
}

export default async function ExamDetailPage({ params }: Props) {
  const { slug } = await params;
  const exam = await getExamWithTests(slug);
  if (!exam) notFound();

  const tests = exam.mockTests;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Breadcrumb */}
      <Link href="/exams" className="text-sm font-medium text-muted hover:text-brand-600">
        ← All exams
      </Link>

      {/* Header */}
      <div className="mt-4 flex items-start gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-surface text-3xl">
          {exam.emoji ?? "📘"}
        </span>
        <div>
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {exam.name}
          </h1>
          {exam.description && <p className="mt-1 text-sm text-muted">{exam.description}</p>}
        </div>
      </div>

      {/* Mock tests */}
      <h2 className="mt-10 font-display text-lg font-bold text-foreground">Free mock tests</h2>

      {tests.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
          <div className="text-3xl">🛠️</div>
          <p className="mt-2 text-sm font-medium text-foreground">Tests are being added</p>
          <p className="mt-1 text-sm text-muted">
            We&apos;re preparing mock tests for {exam.name}. Check back very soon!
          </p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {tests.map((test) => (
            <div
              key={test.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="font-display text-base font-semibold text-foreground">{test.title}</h3>
                {test.description && (
                  <p className="mt-1 text-sm text-muted">{test.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                    📝 {test._count.questions} questions
                  </span>
                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                    ⏱️ {test.durationMinutes} min
                  </span>
                  <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                    🎯 {test.totalMarks} marks
                  </span>
                  {test.negativeMarking && (
                    <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-muted">
                      ➖ Negative marking
                    </span>
                  )}
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Free
                  </span>
                </div>
              </div>
              <Link
                href={`/test/${test.id}`}
                className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                Start test
              </Link>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-muted">
        No sign-up needed to start. Your score is saved when you create a free account.
      </p>
    </div>
  );
}
