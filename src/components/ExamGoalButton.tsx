"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setExamGoal } from "@/lib/enroll-actions";

export default function ExamGoalButton({
  examSlug,
  isCurrentGoal,
}: {
  examSlug: string;
  isCurrentGoal: boolean;
}) {
  const [isGoal, setIsGoal] = useState(isCurrentGoal);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  if (isGoal) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
        ⭐ Your exam
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await setExamGoal(examSlug);
          setIsGoal(true);
          router.refresh();
        })
      }
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-brand-400 hover:text-brand-700 disabled:opacity-60"
    >
      {pending ? "Setting…" : "☆ Set as my exam"}
    </button>
  );
}
