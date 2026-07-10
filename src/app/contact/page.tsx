import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the PadhoDost team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-foreground">
        Contact us
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        We&rsquo;d love to hear from you — whether you spotted a wrong answer, want a new exam
        or chapter added, or have a suggestion to make PadhoDost better for students.
      </p>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-foreground">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-foreground">Email</h2>
          <p className="mt-1 text-muted">
            Write to us at{" "}
            <a
              href="mailto:hello@padhodost.com"
              className="font-medium text-brand-600 hover:underline"
            >
              hello@padhodost.com
            </a>
            . We read every message and reply as quickly as we can.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-foreground">
            Found a mistake in a question?
          </h2>
          <p className="mt-1 text-muted">
            Accuracy matters to us. If a question or solution looks wrong, email us the test
            name and question — we&rsquo;ll review and fix it fast.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-lg font-bold text-foreground">
            Want a new exam or subject?
          </h2>
          <p className="mt-1 text-muted">
            Tell us what you&rsquo;re preparing for. We&rsquo;re adding new exams and chapters
            all the time, and student requests help us decide what&rsquo;s next.
          </p>
        </div>
      </div>
    </div>
  );
}
