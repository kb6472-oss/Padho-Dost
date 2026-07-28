"use client";

import { useState, useTransition } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { setQuestionBookmark } from "@/lib/bookmark-actions";

// Save-for-revision toggle on a question. Optimistic: flips immediately, reconciles
// with the server result, reverts if the action fails (e.g. session expired).
export default function BookmarkButton({
  questionId,
  initialBookmarked,
}: {
  questionId: string;
  initialBookmarked: boolean;
}) {
  const [saved, setSaved] = useState(initialBookmarked);
  const [pending, start] = useTransition();

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove bookmark" : "Bookmark this question"}
      disabled={pending}
      onClick={() => {
        const next = !saved;
        setSaved(next);
        start(async () => {
          // Send the DESIRED state so a stale seed can't invert intent.
          const res = await setQuestionBookmark(questionId, next);
          setSaved(res.ok ? res.bookmarked : !next);
        });
      }}
      className={`inline-flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors disabled:opacity-60 ${
        saved ? "bg-amber-100 text-amber-700" : "text-muted hover:bg-surface hover:text-foreground"
      }`}
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
      ) : (
        <Bookmark className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      )}
      {saved ? "Saved" : "Save"}
    </button>
  );
}
