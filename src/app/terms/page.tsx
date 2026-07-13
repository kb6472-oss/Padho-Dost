import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using PadhoDost's free study tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated: 10 July 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-foreground">
        <p>
          Welcome to PadhoDost. By using padhodost.com you agree to these simple terms. If you
          don&rsquo;t agree, please don&rsquo;t use the site.
        </p>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">The service</h2>
          <p className="mt-2 text-muted">
            PadhoDost provides free mock tests, practice questions, and study explainers for
            Indian exams. Everything is free to use and funded by advertising. We may add,
            change, or remove features and content at any time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Educational content</h2>
          <p className="mt-2 text-muted">
            Our questions, solutions, rank predictions, and exam dates are provided for study
            and practice purposes only. We work hard to keep them accurate, but we cannot
            guarantee they are error-free or that they reflect the latest official exam
            pattern. Always confirm important details (syllabus, dates, cut-offs) with the
            official exam authority. PadhoDost is not affiliated with any exam board or
            government body.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Your account</h2>
          <p className="mt-2 text-muted">
            You are responsible for activity under your account. Please use PadhoDost fairly:
            do not attempt to disrupt the service, scrape content at scale, or misuse it in
            ways that harm other students or the platform.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Content ownership</h2>
          <p className="mt-2 text-muted">
            The content on PadhoDost is provided for your personal study. You may not
            republish or sell it as your own. Third-party names and trademarks (exam names,
            boards) belong to their respective owners and are used only to describe the exams
            we help you prepare for.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">
            No warranty &amp; liability
          </h2>
          <p className="mt-2 text-muted">
            PadhoDost is provided &ldquo;as is&rdquo;, without warranties of any kind. To the
            extent permitted by law, we are not liable for any loss arising from your use of
            the site or reliance on its content.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-foreground">Contact</h2>
          <p className="mt-2 text-muted">
            Questions about these terms? Visit our{" "}
            <a href="/contact" className="font-medium text-brand-600 hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
