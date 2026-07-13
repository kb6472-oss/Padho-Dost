import { redirect } from "next/navigation";
import { getLatestCADate } from "@/lib/current-affairs";
import { istToday } from "@/lib/daily";

export default async function CurrentAffairsIndex() {
  const latest = await getLatestCADate();
  redirect(`/current-affairs/${latest ?? istToday()}`);
}
