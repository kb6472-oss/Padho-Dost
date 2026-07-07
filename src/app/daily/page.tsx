import { redirect } from "next/navigation";
import { istToday } from "@/lib/daily";

export default function DailyPage() {
  redirect(`/daily/${istToday()}`);
}
