import { prisma } from "@/lib/prisma";

// ─────────────────────────────────────────────────────────────────────────────
// Site search. The app had 2,500+ questions and 59 explainers and NO way to find
// any of it — the single biggest discovery gap in the audit. This is a plain
// case-insensitive substring search across the taxonomy and content titles,
// grouped by type. It's not full-text ranked; for this corpus size that's fine,
// and it can be upgraded to Postgres FTS or embeddings later without changing
// the call sites.
// ─────────────────────────────────────────────────────────────────────────────

export type SearchGroup = {
  kind: "explainer" | "chapter" | "subject" | "exam" | "test";
  label: string;
  results: { title: string; sub: string | null; href: string }[];
};

const PER_GROUP = 8;

export async function searchSite(raw: string): Promise<SearchGroup[]> {
  const q = raw.trim();
  if (q.length < 2) return [];

  const like = { contains: q, mode: "insensitive" as const };

  const [exams, subjects, chapters, explainers, tests] = await Promise.all([
    prisma.exam.findMany({
      where: { status: "LIVE", name: like },
      select: { slug: true, name: true, shortName: true },
      take: PER_GROUP,
    }),
    prisma.subject.findMany({
      where: { name: like, exam: { status: "LIVE" }, chapters: { some: { questions: { some: {} } } } },
      select: { slug: true, name: true, exam: { select: { slug: true, shortName: true } } },
      take: PER_GROUP,
    }),
    prisma.chapter.findMany({
      where: { name: like, exam: { status: "LIVE" }, questions: { some: {} } },
      select: {
        slug: true,
        name: true,
        subject: { select: { slug: true, name: true } },
        exam: { select: { slug: true, shortName: true } },
      },
      take: PER_GROUP,
    }),
    prisma.explainer.findMany({
      where: { status: "PUBLISHED", OR: [{ title: like }, { summary: like }] },
      select: { slug: true, title: true, summary: true },
      take: PER_GROUP,
    }),
    prisma.mockTest.findMany({
      where: { title: like, exam: { status: "LIVE" } },
      select: { id: true, title: true, exam: { select: { shortName: true } }, _count: { select: { questions: true } } },
      take: PER_GROUP,
    }),
  ]);

  const groups: SearchGroup[] = [];

  if (explainers.length)
    groups.push({
      kind: "explainer",
      label: "Explainers",
      results: explainers.map((e) => ({ title: e.title, sub: e.summary, href: `/study/${e.slug}` })),
    });

  if (chapters.length)
    groups.push({
      kind: "chapter",
      label: "Chapters",
      results: chapters.map((c) => ({
        title: c.name,
        sub: `${c.exam.shortName} · ${c.subject.name}`,
        href: `/exams/${c.exam.slug}/${c.subject.slug}/${c.slug}`,
      })),
    });

  if (tests.length)
    groups.push({
      kind: "test",
      label: "Tests",
      results: tests.map((t) => ({
        title: t.title,
        sub: `${t.exam.shortName} · ${t._count.questions} questions`,
        href: `/test/${t.id}`,
      })),
    });

  if (subjects.length)
    groups.push({
      kind: "subject",
      label: "Subjects",
      results: subjects.map((s) => ({
        title: s.name,
        sub: s.exam.shortName,
        href: `/exams/${s.exam.slug}/${s.slug}`,
      })),
    });

  if (exams.length)
    groups.push({
      kind: "exam",
      label: "Exams",
      results: exams.map((e) => ({ title: e.name, sub: null, href: `/exams/${e.slug}` })),
    });

  return groups;
}
