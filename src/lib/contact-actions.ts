"use server";

import { prisma } from "@/lib/prisma";

const KINDS = ["general", "report", "request"];

export async function submitContact(input: {
  kind?: string;
  name?: string;
  email?: string;
  message: string;
  ref?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const message = (input.message ?? "").trim();
  if (message.length < 5) return { ok: false, error: "Please write a little more so we can help." };
  if (message.length > 4000) return { ok: false, error: "That message is too long — please shorten it." };

  const email = (input.email ?? "").trim();
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const kind = KINDS.includes(input.kind ?? "") ? (input.kind as string) : "general";

  await prisma.contactMessage.create({
    data: {
      kind,
      name: input.name?.trim().slice(0, 120) || null,
      email: email.slice(0, 200) || null,
      message: message.slice(0, 4000),
      ref: input.ref?.trim().slice(0, 300) || null,
    },
  });

  return { ok: true };
}
