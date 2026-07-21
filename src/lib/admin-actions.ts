"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";

// Mark a contact/report message handled (or not). Used directly as a <form>
// action, so it returns void. Re-checks admin on the server — a server action is
// a public endpoint, so the page gate alone is not enough; a non-admin call is a
// silent no-op rather than an error.
export async function setMessageHandled(id: string, handled: boolean): Promise<void> {
  if (!(await isAdmin())) return;
  await prisma.contactMessage.update({ where: { id }, data: { handled } });
  revalidatePath("/admin/messages");
}
