import { redirect } from "next/navigation";
import { istToday } from "@/lib/daily";

// Dynamic so istToday() is evaluated per REQUEST (a static route baked the build-day
// date in, so /gk kept redirecting to the day we last deployed).
export const dynamic = "force-dynamic";

export default function GkIndex() {
  redirect(`/gk/${istToday()}`);
}
