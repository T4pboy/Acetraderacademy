"use client";

import { useEffect, useState } from "react";
import { WEBINAR_START_ISO } from "@/data/webinar";

const target = new Date(WEBINAR_START_ISO).getTime();

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Props = { label?: string };

export default function WebinarCountdown({ label = "Live Event Starts In" }: Props) {
  // null until mounted, so server and first client render match.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = now === null ? null : Math.max(0, target - now);
  const live = diff === 0;
  const units: [string, number | null][] = [
    ["Days", diff === null ? null : Math.floor(diff / 86400000)],
    ["Hours", diff === null ? null : Math.floor((diff / 3600000) % 24)],
    ["Minutes", diff === null ? null : Math.floor((diff / 60000) % 60)],
    ["Seconds", diff === null ? null : Math.floor((diff / 1000) % 60)],
  ];

  return (
    <div className="text-center">
      <p className="mb-3 font-display text-[11px] font-bold uppercase tracking-[.16em] text-slate-300">
        {live ? "The masterclass is live now" : label}
      </p>
      <div className="flex justify-center gap-2.5 sm:gap-3">
        {units.map(([unit, value]) => (
          <div
            key={unit}
            className="min-w-[68px] rounded-2xl border border-brand-blue/35 bg-surface-elevated px-3 py-3 shadow-[var(--shadow-glow-sm)] sm:min-w-[80px]"
          >
            <div className="font-display text-[1.6rem] font-extrabold leading-none text-brand-blue-bright sm:text-[2rem]">
              {value === null ? "--" : pad(value)}
            </div>
            <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
