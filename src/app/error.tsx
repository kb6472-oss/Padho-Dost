"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <div className="text-5xl">😵</div>
      <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-foreground">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-muted">
        A hiccup on our side — your progress is safe. Try again in a moment.
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Try again
        </button>
        <Link
          href="/exams"
          className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
        >
          Browse exams
        </Link>
      </div>
    </div>
  );
}
