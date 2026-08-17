import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPyqTopicQuestions } from "@/lib/pyq";
import { ogImage } from "@/lib/og-meta";
import JsonLd from "@/components/JsonLd";

type Props = { params: Promise<{ slug: string; topic: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topic } = await params;
  const data = await getPyqTopicQuestions(slug, topic);
  if (!data) return { title: "Topic not found" };

  const span = data.years.length ? `${Math.min(...data.years)}–${Math.max(...data.years)}` : "";
  const title = `${data.exam.shortName} ${data.topic.label} — Previous Year Questions`;
  const description = `${data.questions.length} ${data.exam.name} ${data.topic.label} previous-year questions ${span ? `(${span}) ` : ""}with answers and full solutions. Free, no sign-up.`;
  const og = ogImage(`${data.topic.label} PYQs`, `${data.exam.shortName} · ${data.questions.length} solved`);
  return {
    title,
    description,
    alternates: { canonical: `/exams/${slug}/pyq/${topic}` },
    openGraph: { title, description, url: `/exams/${slug}/pyq/${topic}`, type: "website", images: [og] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export default async function PyqTopicPage({ params }: Props) {
  const { slug, topic } = await params;
  const data = await getPyqTopicQuestions(slug, topic);
  if (!data) notFound();

  const { exam, questions, years, siblings } = data;
  const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : "";

  // Group the questions by year for a paper-trail feel (newest first).
  const byYear = new Map<number | null, typeof questions>();
  for (const q of questions) {
    const arr = byYear.get(q.year) ?? [];
    arr.push(q);
    byYear.set(q.year, arr);
  }
  const yearGroups = [...byYear.entries()].sort((a, b) => (b[0] ?? 0) - (a[0] ?? 0));

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Exams", item: "https://padhodost.com/exams" },
      { "@type": "ListItem", position: 2, name: exam.name, item: `https://padhodost.com/exams/${slug}` },
      { "@type": "ListItem", position: 3, name: "PYQ by Topic", item: `https://padhodost.com/exams/${slug}/pyq` },
      { "@type": "ListItem", position: 4, name: data.topic.label, item: `https://padhodost.com/exams/${slug}/pyq/${topic}` },
    ],
  };

  // schema.org Quiz → eligible for Google's "Practice problems" rich result.
  const solved = questions.filter((q) => q.explanation && q.options.some((o) => o.isCorrect));
  const quizLd =
    solved.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: `${exam.shortName} ${data.topic.label} — Previous Year Questions`,
          about: { "@type": "Thing", name: `${data.topic.label} (${exam.shortName})` },
          hasPart: solved.slice(0, 50).map((q) => {
            const correct = q.options.find((o) => o.isCorrect)!;
            return {
              "@type": "Question",
              eduQuestionType: "Multiple choice",
              text: q.text,
              suggestedAnswer: q.options
                .filter((o) => !o.isCorrect)
                .map((o, i) => ({ "@type": "Answer", position: i, text: o.text })),
              acceptedAnswer: { "@type": "Answer", text: correct.text, comment: { "@type": "Comment", text: q.explanation } },
            };
          }),
        }
      : null;

  let counter = 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd data={breadcrumb} />
      {quizLd && <JsonLd data={quizLd} />}

      <nav aria-label="Breadcrumb" className="text-caption text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/exams" className="hover:text-brand-600">Exams</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/exams/${slug}`} className="hover:text-brand-600">{exam.shortName}</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href={`/exams/${slug}/pyq`} className="hover:text-brand-600">PYQ</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-foreground">{data.topic.label}</li>
        </ol>
      </nav>

      <header className="mt-4">
        <p className="text-body font-semibold text-muted">{exam.name} · Previous Year Questions</p>
        <h1 className="mt-1.5 font-display text-h1 font-extrabold tracking-tight text-foreground">
          {data.topic.label}
        </h1>
        <p className="mt-2 text-body text-muted">
          {questions.length} {exam.shortName} {data.topic.label} question{questions.length > 1 ? "s" : ""} from past
          papers{span ? ` (${span})` : ""}, each with the answer and a full solution. {data.topic.blurb}.
        </p>
      </header>

      {yearGroups.map(([year, qs]) => (
        <section key={year ?? "unknown"} className="mt-9">
          {year && (
            <h2 className="font-display text-h3 font-bold text-foreground">
              {exam.shortName} {year}
              <span className="ml-2 align-middle text-caption font-medium text-muted">
                {qs.length} question{qs.length > 1 ? "s" : ""}
              </span>
            </h2>
          )}
          <ol className="mt-4 space-y-4">
            {qs.map((q) => {
              counter += 1;
              const correctIdx = q.options.findIndex((o) => o.isCorrect);
              const correctLetter = correctIdx >= 0 ? String.fromCharCode(65 + correctIdx) : "";
              return (
                <li key={q.id} className="surface-1 p-5">
                  <span className="text-caption font-semibold text-muted">Q{counter}</span>
                  <p className="mt-2 text-body font-medium leading-relaxed text-foreground">{q.text}</p>
                  <ul className="mt-3 space-y-2">
                    {q.options.map((o, oi) => (
                      <li
                        key={oi}
                        className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-body"
                      >
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface text-caption font-bold text-muted">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <span className="flex-1">{o.text}</span>
                      </li>
                    ))}
                  </ul>
                  {correctIdx >= 0 && (
                    <details className="mt-3 rounded-xl bg-brand-50 p-3.5">
                      <summary className="cursor-pointer text-body font-semibold text-brand-700">
                        Show answer{q.explanation ? " & solution" : ""}
                      </summary>
                      <p className="mt-2 text-body font-semibold text-emerald-700">
                        Correct answer: ({correctLetter}) {q.options[correctIdx]?.text}
                      </p>
                      {q.explanation && (
                        <p className="mt-2 text-body leading-relaxed text-brand-900">{q.explanation}</p>
                      )}
                    </details>
                  )}
                </li>
              );
            })}
          </ol>
        </section>
      ))}

      {siblings.length > 0 && (
        <section className="mt-12 border-t border-border pt-6">
          <h2 className="font-display text-body-lg font-bold text-foreground">More {exam.shortName} PYQs by topic</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {siblings.map((t) => (
              <Link
                key={t.slug}
                href={`/exams/${slug}/pyq/${t.slug}`}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-caption font-medium text-muted transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {t.label} · {t.count}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link href={`/exams/${slug}/pyq`} className="text-body font-semibold text-brand-600 hover:text-brand-700">
          ← All {exam.shortName} PYQ topics
        </Link>
      </div>
    </div>
  );
}
