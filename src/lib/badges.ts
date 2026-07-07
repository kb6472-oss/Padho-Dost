export type Badge = { id: string; label: string; emoji: string; hint: string; earned: boolean };

// Achievement badges computed from the student's own activity.
export function getBadges(d: {
  testsTaken: number;
  bestPct: number;
  streak: number;
  totalAnswered: number;
  explainersRead: number;
}): Badge[] {
  return [
    { id: "first", emoji: "🎯", label: "First Test", hint: "Take your first test", earned: d.testsTaken >= 1 },
    { id: "five", emoji: "🖐️", label: "High Five", hint: "Take 5 tests", earned: d.testsTaken >= 5 },
    { id: "century", emoji: "💯", label: "Centurion", hint: "Answer 100 questions", earned: d.totalAnswered >= 100 },
    { id: "sharp", emoji: "🎖️", label: "Sharpshooter", hint: "Score 90%+ on a test", earned: d.bestPct >= 90 },
    { id: "fire", emoji: "🔥", label: "On Fire", hint: "Reach a 3-day streak", earned: d.streak >= 3 },
    { id: "unstoppable", emoji: "⚡", label: "Unstoppable", hint: "Reach a 7-day streak", earned: d.streak >= 7 },
    { id: "reader", emoji: "📖", label: "Bookworm", hint: "Read an explainer", earned: d.explainersRead >= 1 },
  ];
}
