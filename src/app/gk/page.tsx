import { redirect } from "next/navigation";
import { istToday } from "@/lib/daily";

export default function GkIndex() {
  redirect(`/gk/${istToday()}`);
}
