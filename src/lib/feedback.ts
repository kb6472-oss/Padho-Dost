// Rule-based "smart feedback" after a test — no external API needed.
export function buildFeedback(input: {
  pct: number;
  accuracy: number;
  wrong: number;
  unattempted: number;
}): string {
  const parts: string[] = [];

  if (input.pct >= 80) parts.push("Excellent — you've nearly mastered this. 🎉");
  else if (input.pct >= 50) parts.push("Solid attempt — you're on the right track.");
  else parts.push("Good start — a little more practice and this will click.");

  if (input.unattempted > 0) {
    parts.push(
      `You left ${input.unattempted} question${input.unattempted > 1 ? "s" : ""} unattempted — try to attempt more next time.`,
    );
  }

  if (input.wrong > 0 && input.accuracy < 60) {
    parts.push("Your accuracy needs work — slow down and read each option carefully before answering.");
  } else if (input.accuracy >= 80) {
    parts.push("Your accuracy is strong — now work on speed.");
  }

  parts.push("Read the solutions below, then retry to lock it in.");
  return parts.join(" ");
}
