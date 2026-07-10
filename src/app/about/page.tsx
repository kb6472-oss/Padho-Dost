import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Why PadhoDost exists — free, no-spam exam prep for every Indian student.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
        About PadhoDost
      </h1>
      <p className="mt-3 text-lg text-muted">Padho, Dost! — Study, friend. 📚</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground">
        <p>
          PadhoDost is a 100% free exam-preparation platform for Indian students. Whether
          you&rsquo;re sitting for CBSE Class 10 boards, SSC CGL, JEE, or NEET, you get real
          mock tests, chapter-wise practice, and visual explainers — without paying a rupee.
        </p>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Why we built this</h2>
          <p className="mt-2 text-muted">
            Good preparation shouldn&rsquo;t be locked behind expensive courses or buried under
            spam calls and pushy sales messages. Millions of students can&rsquo;t afford paid
            coaching. PadhoDost exists to give every one of them a serious, modern place to
            practise — free, forever.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">What you get</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
            <li>Timed mock tests with a real exam interface and negative marking</li>
            <li>Instant results with All-India rank, percentile, and solutions</li>
            <li>Full-length mock exams that mirror the actual paper pattern</li>
            <li>Chapter-wise practice, a daily challenge, streaks, and progress tracking</li>
            <li>Clean visual explainers that teach the concept, not just the answer</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">How it stays free</h2>
          <p className="mt-2 text-muted">
            PadhoDost is funded by advertising, not fees. That means no paywalls, no
            &ldquo;premium&rdquo; tiers, and no spam. Our promise: your data is yours, and the
            core study tools will always be free. You can read more in our{" "}
            <Link href="/privacy" className="font-medium text-brand-600 hover:underline">
              privacy policy
            </Link>
            .
          </p>
        </section>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="font-display font-semibold text-foreground">Ready to start?</p>
          <p className="mt-1 text-muted">
            Pick your exam and take your first free mock test — no sign-up needed.
          </p>
          <Link
            href="/exams"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Browse exams
          </Link>
        </div>
      </div>
    </div>
  );
}
