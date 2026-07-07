"use client";

import { useEffect, useState } from "react";

export default function Countdown({ date }: { date: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const target = Date.parse(date + "T00:00:00+05:30");
    const calc = () => setDays(Math.max(0, Math.ceil((target - Date.now()) / 86_400_000)));
    calc();
    const t = setInterval(calc, 60_000);
    return () => clearInterval(t);
  }, [date]);

  if (days === null) return <span className="text-muted">…</span>;
  return (
    <span className="font-bold text-brand-700">
      {days} day{days === 1 ? "" : "s"} to go
    </span>
  );
}
