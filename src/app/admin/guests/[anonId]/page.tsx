import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { getAdminGuest } from "@/lib/admin-stats";
import { AdminNav, AttemptList, guestLabel, istDateTime } from "@/components/admin/AdminUi";

export const metadata: Metadata = { title: "Guest · Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ anonId: string }> };

export default async function AdminGuestPage({ params }: Props) {
  if (!(await isAdmin())) notFound();
  const { anonId } = await params;
  const attempts = await getAdminGuest(decodeURIComponent(anonId));
  if (attempts.length === 0) notFound();
  const first = attempts[attempts.length - 1].startedAt;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <AdminNav active="overview" />
      <Link href="/admin" className="mt-6 inline-block text-caption font-semibold text-brand-600 hover:text-brand-700">
        ← Overview
      </Link>
      <h1 className="mt-2 font-display text-h1 font-extrabold tracking-tight text-foreground">{guestLabel(anonId)}</h1>
      <p className="mt-1 text-body text-muted">
        A visitor who practised without signing up (tracked by an anonymous browser id). First test {istDateTime(first)} ·{" "}
        {attempts.length} test{attempts.length === 1 ? "" : "s"}.
      </p>
      <div className="mt-6">
        <AttemptList attempts={attempts} showWho={false} />
      </div>
    </div>
  );
}
