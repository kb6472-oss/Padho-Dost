import { redirect } from "next/navigation";
import { istToday } from "@/lib/daily";

// Dynamic so istToday() is evaluated per REQUEST. As a static route this baked the
// build-day date in, permanently redirecting /daily to whatever day we last deployed.
export const dynamic = "force-dynamic";

export default function DailyPage() {
  redirect(`/daily/${istToday()}`);
}
