"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getSessionUser, syncUser } from "@/lib/auth";
import { TARGET_EXAM_COOKIE } from "@/lib/enroll";

// Set the student's target exam. Always remembers it in a cookie (so guests get a
// personalised experience); for logged-in students it also creates an Enrollment
// and sets User.targetExamSlug so the dashboard "Your exams" section comes alive.
export async function setExamGoal(examSlug: string) {
  const jar = await cookies();
  jar.set(TARGET_EXAM_COOKIE, examSlug, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  const su = await getSessionUser();
  if (!su) return { ok: true, enrolled: false };

  const exam = await prisma.exam.findUnique({ where: { slug: examSlug }, select: { id: true } });
  if (!exam) return { ok: true, enrolled: false };

  await syncUser(su); // ensure the Prisma User row exists (FK safety)
  await prisma.user.update({ where: { id: su.id }, data: { targetExamSlug: examSlug } });

  const [totalChapters, chaptersDone] = await Promise.all([
    prisma.chapter.count({ where: { examId: exam.id } }),
    prisma.chapterProgress.count({ where: { userId: su.id, examId: exam.id, status: "DONE" } }),
  ]);
  await prisma.enrollment.upsert({
    where: { userId_examId: { userId: su.id, examId: exam.id } },
    update: { lastActiveAt: new Date(), totalChapters },
    create: { userId: su.id, examId: exam.id, totalChapters, chaptersDone },
  });

  revalidatePath("/dashboard");
  return { ok: true, enrolled: true };
}
