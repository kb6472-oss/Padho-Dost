import { prisma } from "@/lib/prisma";

// Top students ranked by total correct answers across submitted tests.
export async function getLeaderboard(limit = 25) {
  const users = await prisma.user.findMany({
    where: { role: "STUDENT" },
    select: {
      name: true,
      email: true,
      image: true,
      attempts: { where: { status: "SUBMITTED" }, select: { correctCount: true, wrongCount: true } },
    },
  });

  return users
    .map((u) => {
      const tests = u.attempts.length;
      const correct = u.attempts.reduce((a, x) => a + x.correctCount, 0);
      const answered = u.attempts.reduce((a, x) => a + x.correctCount + x.wrongCount, 0);
      const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
      return { name: u.name || u.email?.split("@")[0] || "Student", image: u.image, tests, correct, accuracy };
    })
    .filter((u) => u.tests > 0)
    .sort((a, b) => b.correct - a.correct || b.accuracy - a.accuracy)
    .slice(0, limit);
}
