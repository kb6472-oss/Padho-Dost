import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { setMessageHandled } from "@/lib/admin-actions";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = { title: "Messages", robots: { index: false, follow: false } };

const KIND_TONE = {
  report: "danger",
  request: "warning",
  general: "neutral",
} as const;

export default async function AdminMessagesPage() {
  // notFound (not redirect) so the page's existence isn't revealed to non-admins.
  if (!(await isAdmin())) notFound();

  const messages = await prisma.contactMessage.findMany({
    orderBy: [{ handled: "asc" }, { createdAt: "desc" }],
    take: 200,
  });
  const open = messages.filter((m) => !m.handled).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-h1 font-extrabold tracking-tight text-foreground">Messages</h1>
      <p className="mt-2 text-body text-muted">
        Contact form and “report a mistake” submissions. {open} open, {messages.length} total.
      </p>

      {messages.length === 0 ? (
        <div className="mt-8 surface-1 p-8 text-center text-body text-muted">No messages yet.</div>
      ) : (
        <ul className="mt-8 space-y-3">
          {messages.map((m) => {
            const tone = KIND_TONE[m.kind as keyof typeof KIND_TONE] ?? "neutral";
            return (
              <li key={m.id} className={`surface-2 p-5 ${m.handled ? "opacity-60" : ""}`}>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone={tone}>{m.kind}</Badge>
                  {m.handled && <Badge tone="positive">Handled</Badge>}
                  <span className="ml-auto text-caption text-muted">
                    {m.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-body leading-relaxed text-foreground">{m.message}</p>

                {m.ref && (
                  <p className="mt-2 text-caption text-muted">
                    Ref: <span className="font-medium text-foreground">{m.ref}</span>
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-caption text-muted">
                    {m.name || "Anonymous"}
                    {m.email && (
                      <>
                        {" · "}
                        <a href={`mailto:${m.email}`} className="text-brand-600 hover:underline">
                          {m.email}
                        </a>
                      </>
                    )}
                  </div>

                  {/* Server action re-checks admin, so this button is safe to render. */}
                  <form action={setMessageHandled.bind(null, m.id, !m.handled)}>
                    <button
                      type="submit"
                      className="rounded-full border border-border px-4 py-1.5 text-caption font-semibold text-foreground transition-colors hover:bg-surface"
                    >
                      {m.handled ? "Mark open" : "Mark handled"}
                    </button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
