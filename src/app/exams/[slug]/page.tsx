import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamWithTests } from "@/lib/data";
import { getSessionUser } from "@/lib/auth";
import { getFullMockUnlock, isGrandMock, isSectionTest, type UnlockState } from "@/lib/full-mock";

type Props = { params: Promise<{ slug: string }> };

type ExamTest = NonNullable<Awaited<ReturnType<typeof getExamWithTests>>>["mockTests"][number];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExamWithTests(slug);
  if (!exam) return { title: "Exam not found" };
  return {
    title: exam.name,
    description: exam.description ?? `Free mock tests for ${exam.name}.`,
  };
}

function Pills({ test }: { test: ExamTest }) {
  return (
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
  );
}

function TestCard({ test }: { test: ExamTest }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-display text-base font-semibold text-foreground">{test.title}</h3>
        {test.description && <p className="mt-1 text-sm text-muted">{test.description}</p>}
        <Pills test={test} />
      </div>
      <Link
        href={`/test/${test.id}`}
        className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Start test
      </Link>
    </div>
  );
}

function FullMockCard({ test, unlock }: { test: ExamTest; unlock: UnlockState }) {
  const locked = !unlock.unlocked;
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-2xl border-2 p-5 sm:flex-row sm:items-center sm:justify-between ${
        locked ? "border-border bg-surface" : "border-brand-200 bg-brand-50/40"
      }`}
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-brand-600 px-2.5 py-0.5 text-xs font-bold text-white">
            FULL MOCK
          </span>
          {locked && <span className="text-sm">🔒</span>}
        </div>
        <h3 className="mt-2 font-display text-base font-semibold text-foreground">{test.title}</h3>
        {test.description && <p className="mt-1 text-sm text-muted">{test.description}</p>}
        <Pills test={test} />
        {locked && (
          <p className="mt-3 text-sm font-medium text-brand-700">
            🔒 Clear {unlock.remaining} more chapter {unlock.remaining === 1 ? "test" : "tests"} to
            unlock this full mock.
          </p>
        )}
      </div>
      {locked ? (
        <Link
          href="#chapter-practice"
          className="inline-flex flex-shrink-0 items-center justify-center rounded-full border border-brand-300 bg-background px-6 py-2.5 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
        >
          Practice chapters
        </Link>
      ) : (
        <Link
          href={`/test/${test.id}`}
          className="inline-flex flex-shrink-0 items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Start full mock
        </Link>
      )}
    </div>
  );
}

export default async function ExamDetailPage({ params }: Props) {
  const { slug } = await params;
  const exam = await getExamWithTests(slug);
  if (!exam) notFound();

  const tests = exam.mockTests;
  const fullMocks = tests.filter((t) => isGrandMock(t.slug));
  const sectionTests = tests.filter((t) => isSectionTest(t.slug));
  const chapterTests = tests.filter((t) => !isGrandMock(t.slug) && !isSectionTest(t.slug));

  const su = fullMocks.length > 0 ? await getSessionUser() : null;
  const unlock = fullMocks.length > 0 ? await getFullMockUnlock(su?.id ?? null, exam.id) : null;

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

      {tests.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
          <div className="text-3xl">🛠️</div>
          <p className="mt-2 text-sm font-medium text-foreground">Tests are being added</p>
          <p className="mt-1 text-sm text-muted">
            We&apos;re preparing mock tests for {exam.name}. Check back very soon!
          </p>
        </div>
      ) : (
        <>
          {/* Full-length mock exams */}
          {fullMocks.length > 0 && unlock && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold text-foreground">🏆 Full-Length Mock Exams</h2>
              <p className="mt-1 text-sm text-muted">
                The real thing — every subject, exam pattern, All-India rank. Unlocks after you
                practise a few chapters.
              </p>
              <div className="mt-4 space-y-3">
                {fullMocks.map((test) => (
                  <FullMockCard key={test.id} test={test} unlock={unlock} />
                ))}
              </div>
            </section>
          )}

          {/* Full subject / section tests */}
          {sectionTests.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold text-foreground">📚 Full Subject Tests</h2>
              <p className="mt-1 text-sm text-muted">Every question from a subject in one timed test.</p>
              <div className="mt-4 space-y-3">
                {sectionTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </section>
          )}

          {/* Chapter-wise practice */}
          {chapterTests.length > 0 && (
            <section id="chapter-practice" className="mt-10 scroll-mt-20">
              <h2 className="font-display text-lg font-bold text-foreground">✏️ Chapter-wise Practice</h2>
              <p className="mt-1 text-sm text-muted">
                Master one chapter at a time. Clearing these unlocks the full mock.
              </p>
              <div className="mt-4 space-y-3">
                {chapterTests.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <p className="mt-6 text-xs text-muted">
        No sign-up needed to start. Your score is saved when you create a free account.
      </p>
    </div>
  );
}
