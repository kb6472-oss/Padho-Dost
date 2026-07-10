"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setExamGoal } from "@/lib/enroll-actions";

type ExamChip = { slug: string; name: string; emoji: string };

export default function OnboardingPrompt({ exams }: { exams: ExamChip[] }) {
  const [hidden, setHidden] = useState(false);
  const [pending, startTransition] = useTransition();
  const [picking, setPicking] = useState<string | null>(null);
  const router = useRouter();

  if (hidden || exams.length === 0) return null;

  function choose(slug: string) {
    setPicking(slug);
    startTransition(async () => {
      await setExamGoal(slug);
      router.push(`/exams/${slug}`);
    });
  }

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-brand-200 bg-brand-50/50 p-5 sm:p-6">
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setHidden(true)}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-muted transition-colors hover:bg-background hover:text-foreground"
      >
        ✕
      </button>
      <p className="font-display text-lg font-bold text-foreground">
        👋 What are you preparing for?
      </p>
      <p className="mt-1 text-sm text-muted">
        Pick your exam and we&apos;ll personalise your dashboard, track your progress, and
        unlock full mock tests as you practise.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {exams.map((e) => (
          <button
            key={e.slug}
            type="button"
            disabled={pending}
            onClick={() => choose(e.slug)}
            className="inline-flex items-center gap-2 rounded-full border border-brand-300 bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-500 hover:bg-brand-50 disabled:opacity-60"
          >
            <span>{e.emoji}</span>
            {picking === e.slug && pending ? "Setting…" : e.name}
          </button>
        ))}
      </div>
    </div>
  );
}
