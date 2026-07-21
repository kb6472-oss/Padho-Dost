import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getExamWithTests } from "@/lib/data";
import { getExamSubjects } from "@/lib/hubs";
import { getSessionUser } from "@/lib/auth";
import { getExamGoal } from "@/lib/enroll";
import { getFullMockUnlock, isGrandMock, isSectionTest, type UnlockState } from "@/lib/full-mock";
import { getExamIntro } from "@/content/exam-intros";
import ExamGoalButton from "@/components/ExamGoalButton";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string }> };

type ExamTest = NonNullable<Awaited<ReturnType<typeof getExamWithTests>>>["mockTests"][number];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = await getExamWithTests(slug);
  if (!exam) return { title: "Exam not found" };
  const description = exam.description ?? `Free mock tests and practice for ${exam.name}.`;
  return {
    title: exam.name,
    description,
    alternates: { canonical: `/exams/${slug}` },
    openGraph: { title: `${exam.name} — Free Mock Tests`, description, url: `/exams/${slug}`, type: "website" },
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
  const pyqTests = tests.filter((t) => t.type === "PYQ");
  const fullMocks = tests.filter((t) => t.type !== "PYQ" && isGrandMock(t.slug));
  const sectionTests = tests.filter((t) => t.type !== "PYQ" && isSectionTest(t.slug));
  const chapterTests = tests.filter(
    (t) => t.type !== "PYQ" && !isGrandMock(t.slug) && !isSectionTest(t.slug),
  );

  const su = fullMocks.length > 0 ? await getSessionUser() : null;
  const unlock = fullMocks.length > 0 ? await getFullMockUnlock(su?.id ?? null, exam.id) : null;
  const goal = await getExamGoal();
  const intro = getExamIntro(slug);
  const subjects = await getExamSubjects(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        name: `${exam.name} — Free Mock Tests & Practice`,
        description: exam.description ?? `Free mock tests and practice for ${exam.name}.`,
        provider: { "@type": "Organization", name: "PadhoDost", url: "https://padhodost.com" },
        url: `https://padhodost.com/exams/${slug}`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR", availability: "https://schema.org/InStock" },
        hasCourseInstance: { "@type": "CourseInstance", courseMode: "Online", courseWorkload: "PT2H" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://padhodost.com" },
          { "@type": "ListItem", position: 2, name: "Exams", item: "https://padhodost.com/exams" },
          { "@type": "ListItem", position: 3, name: exam.name, item: `https://padhodost.com/exams/${slug}` },
        ],
      },
      // FAQ rich-result eligibility — only when this exam has authored FAQs.
      ...(intro?.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: intro.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-brand-600">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/exams" className="hover:text-brand-600">Exams</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">{exam.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mt-4 flex items-start gap-4">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-surface text-3xl">
          {exam.emoji ?? "📘"}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {exam.name}
          </h1>
          {exam.description && <p className="mt-1 text-sm text-muted">{exam.description}</p>}
          <div className="mt-3">
            <ExamGoalButton examSlug={slug} isCurrentGoal={goal === slug} />
          </div>
        </div>
      </div>

      {/* Study by topic — the entry into the subject/chapter hub pages. Also the
          internal-link path that makes those ~240 pages crawlable. */}
      {subjects.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-bold text-foreground">Study by topic</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {subjects.map((s) => (
              <Link
                key={s.slug}
                href={`/exams/${slug}/${s.slug}`}
                className="surface-2 group flex items-center justify-between gap-3 p-4 transition-colors hover:border-brand-300"
              >
                <div>
                  <div className="font-display text-body-lg font-semibold text-foreground">{s.name}</div>
                  <div className="mt-0.5 text-caption text-muted">
                    {s.chapters} chapters · {s.questions.toLocaleString("en-IN")} questions
                  </div>
                </div>
                <span className="shrink-0 text-body font-semibold text-brand-600 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

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

          {/* Previous Year Papers (PYQ) — populated from real past papers */}
          {pyqTests.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold text-foreground">📄 Previous Year Papers</h2>
              <p className="mt-1 text-sm text-muted">
                Actual past-exam papers with full solutions — the closest thing to the real exam.
              </p>
              <div className="mt-4 space-y-3">
                {pyqTests.map((test) => (
                  <TestCard key={test.id} test={test} />
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

      {/* Evergreen exam overview (SEO + student guidance) */}
      {intro && (
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="font-display text-xl font-bold text-foreground">{intro.heading}</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
            {intro.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {intro.pattern.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-base font-semibold text-foreground">Exam pattern at a glance</h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {intro.pattern.map((f) => (
                  <div key={f.label} className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5 text-sm">
                    <span className="text-muted">{f.label}</span>
                    <span className="font-semibold text-foreground">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {intro.topics.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-base font-semibold text-foreground">Topics covered</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {intro.topics.map((t) => (
                  <span key={t} className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {intro.tips.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-base font-semibold text-foreground">Quick prep tips</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted">
                {intro.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          )}

          {intro.faqs.length > 0 && (
            <div className="mt-8">
              <h3 className="font-display text-base font-semibold text-foreground">Frequently asked questions</h3>
              <div className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
                {intro.faqs.map((f, i) => (
                  <details key={i} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-foreground [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-lg leading-none text-muted transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="px-4 pb-4 text-sm leading-relaxed text-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
