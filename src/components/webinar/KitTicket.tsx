"use client";

import { useEffect, useState } from "react";
import { KIT, WEBINAR_START_ISO, WEBINAR_TIME_LABEL } from "@/data/webinar";

const target = new Date(WEBINAR_START_ISO).getTime();

type Badge = "free" | "included" | "bonus";
type Icon = "chart" | "list" | "book" | "shield" | "gift";

const ITEMS: { icon: Icon; title: string; body: string; value?: number; badge: Badge; tag?: string }[] = [
  {
    icon: "chart",
    title: "The A.C.E. Blueprint",
    tag: "Already yours",
    body: "The full method, mapped out. Sent free when you registered.",
    value: 200,
    badge: "free",
  },
  {
    icon: "list",
    title: "A.C.E. Pre-Trade Checklist",
    body: "The 3 checks every trade must pass, as a printable one-pager.",
    value: 97,
    badge: "included",
  },
  {
    icon: "book",
    title: "A.C.E. Trading Journal",
    body: "A template to log every trade against the checklist.",
    value: 100,
    badge: "included",
  },
  {
    icon: "shield",
    title: "Funded Account Protection Rules",
    body: "What to do differently the day you pass, so you don't give it back.",
    value: 97,
    badge: "included",
  },
  {
    icon: "gift",
    title: "Bonus prop account entry",
    body: "An extra entry into the 2 free prop account giveaway on Sunday.",
    badge: "bonus",
  },
];

const TOTAL_VALUE = ITEMS.reduce((sum, i) => sum + (i.value ?? 0), 0);
const PERCENT_OFF = Math.round((1 - KIT.price / TOTAL_VALUE) * 100);

const dateParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  month: "short",
  day: "numeric",
}).formatToParts(new Date(WEBINAR_START_ISO));
const part = (t: string) => dateParts.find((p) => p.type === t)?.value ?? "";
const STUB_DATE = `${part("weekday")} · ${part("month")} ${part("day")}`.toUpperCase();

const BARS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 1, 1, 3, 2, 1, 4, 1, 2, 3, 1, 1, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3, 1, 2, 2, 1, 3];

function Barcode() {
  let x = 0;
  const rects = BARS.map((w, i) => {
    const r = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={34} /> : null;
    x += w;
    return r;
  });
  return (
    <svg viewBox={`0 0 ${x} 34`} className="h-8 w-[150px] text-[#1a1305]" fill="currentColor" aria-hidden preserveAspectRatio="none">
      {rects}
    </svg>
  );
}

function ItemIcon({ icon }: { icon: Icon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-[26px] w-[26px]",
  };
  return (
    <span className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-[#14224a] to-[#0a1230] text-gold shadow-[0_6px_14px_-6px_rgba(10,18,48,0.7)] ring-1 ring-gold/25">
      {icon === "chart" && (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="m7 15 4-4 3 3 5-6" />
        </svg>
      )}
      {icon === "list" && (
        <svg {...common}>
          <path d="m4 6 1.5 1.5L8 5" />
          <path d="m4 12 1.5 1.5L8 11" />
          <path d="m4 18 1.5 1.5L8 17" />
          <path d="M12 6.5h8M12 12.5h8M12 18.5h8" />
        </svg>
      )}
      {icon === "book" && (
        <svg {...common}>
          <path d="M6 4h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6z" />
          <path d="M6 4v16" />
          <path d="M10 9h5M10 13h5" />
        </svg>
      )}
      {icon === "shield" && (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )}
      {icon === "gift" && (
        <svg {...common}>
          <rect x="4" y="9" width="16" height="11" rx="1" />
          <path d="M3 9h18v-0.5M12 9v11" />
          <path d="M12 9c-1.5-3.5-5-4-5-1.8C7 9 12 9 12 9Zm0 0c1.5-3.5 5-4 5-1.8C17 9 12 9 12 9Z" />
        </svg>
      )}
    </span>
  );
}

function ValueBadge({ badge }: { badge: Badge }) {
  const styles =
    badge === "free"
      ? "bg-[#dff5e6] text-[#1b7a3e]"
      : badge === "bonus"
        ? "bg-[#0d1738] text-gold-bright ring-1 ring-gold/40"
        : "bg-[#0d1738] text-gold-bright";
  const label = badge === "free" ? "Free" : badge === "bonus" ? "Bonus" : "Included";
  return (
    <span className={`rounded-md px-2.5 py-1 font-display text-[9.5px] font-extrabold uppercase tracking-[.14em] ${styles}`}>
      {label}
    </span>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function TicketCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? null : Math.max(0, target - now);
  const units: [string, number | null][] = [
    ["Days", diff === null ? null : Math.floor(diff / 86400000)],
    ["Hrs", diff === null ? null : Math.floor((diff / 3600000) % 24)],
    ["Min", diff === null ? null : Math.floor((diff / 60000) % 60)],
    ["Sec", diff === null ? null : Math.floor((diff / 1000) % 60)],
  ];
  return (
    <div className="flex justify-center gap-1.5">
      {units.map(([u, v]) => (
        <div key={u} className="min-w-[46px] rounded-lg bg-[#0d1738] px-1.5 py-2 text-center">
          <div className="font-display text-[1.1rem] font-extrabold leading-none tabular-nums text-gold-bright">
            {v === null ? "--" : pad(v)}
          </div>
          <div className="mt-1 text-[8px] font-bold uppercase tracking-wider text-slate-400">{u}</div>
        </div>
      ))}
    </div>
  );
}

/** Ticket-style breakdown of the kit: itemised value on the left, price stub on the right. */
export default function KitTicket() {
  return (
    <div className="mx-auto max-w-[900px] md:flex md:items-stretch">
      {/* Main body */}
      <div className="flex-1 rounded-t-[28px] bg-[#fffdf7] p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-7 md:rounded-l-[28px] md:rounded-tr-none">
        <div className="mb-5 flex items-start justify-between gap-4 border-b-2 border-[#efe6cf] pb-4">
          <div>
            <p className="font-display text-[14px] font-extrabold uppercase tracking-[.22em] text-[#0d1738]">Admit one</p>
            <p className="mt-1 font-display text-[9.5px] font-bold uppercase tracking-[.2em] text-slate-500">
              A.C.E. Pre-Class Kit
            </p>
          </div>
          <p className="text-right font-display text-[9.5px] font-bold uppercase leading-snug tracking-[.18em] text-slate-500">
            For The Culture FX
          </p>
        </div>

        <ul className="flex flex-col">
          {ITEMS.map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-3.5 border-b border-dashed border-[#e4dcc4] py-3.5 last:border-b-0"
            >
              <ItemIcon icon={item.icon} />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[14.5px] font-bold leading-snug text-[#0d1738]">
                  {item.title}
                  {item.tag && (
                    <span className="font-display text-[8.5px] font-extrabold uppercase tracking-[.14em] text-[#1b7a3e]">
                      {item.tag}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-slate-500">{item.body}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                {item.value !== undefined && (
                  <span className="text-[12px] font-semibold text-[#c25b5b] line-through decoration-2">${item.value}</span>
                )}
                <ValueBadge badge={item.badge} />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-2 flex items-end justify-between rounded-2xl bg-[#0d1738] px-5 py-4">
          <div>
            <p className="font-display text-[10px] font-bold uppercase tracking-[.2em] text-slate-300">Total value</p>
            <p className="mt-1 text-[1.15rem] font-extrabold text-slate-200 line-through decoration-2 decoration-[#c25b5b]">
              ${TOTAL_VALUE}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-[10px] font-bold uppercase tracking-[.2em] text-gold">Today only</p>
            <p className="mt-1 font-display text-[1.7rem] font-extrabold leading-none text-gold-bright">${KIT.price}</p>
          </div>
        </div>
      </div>

      {/* Stub */}
      <div className="relative rounded-b-[28px] border-t-2 border-dashed border-[#a8740b]/70 bg-gradient-to-b from-[#f7c548] to-[#e1a022] px-6 py-8 text-center text-[#1a1305] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] md:flex md:w-[260px] md:shrink-0 md:flex-col md:justify-center md:rounded-bl-none md:rounded-r-[28px] md:rounded-tl-none md:border-l-2 md:border-t-0">
        <span
          aria-hidden
          className="absolute -top-3 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-bg-primary"
        />
        <span
          aria-hidden
          className="absolute -top-3 right-0 h-6 w-6 translate-x-1/2 rounded-full bg-bg-primary md:-bottom-3 md:left-0 md:right-auto md:top-auto md:-translate-x-1/2 md:translate-x-0"
        />

        <p className="font-display text-[10px] font-extrabold uppercase tracking-[.2em]">Live masterclass</p>
        <p className="mt-1.5 font-display text-[1.5rem] font-extrabold leading-none tracking-tight">{STUB_DATE}</p>
        <p className="mt-1 font-display text-[11px] font-bold">{WEBINAR_TIME_LABEL} EST</p>

        <p className="mt-5 font-display text-[3.6rem] font-extrabold leading-none tracking-tight">
          <span className="align-top text-[1.6rem]">$</span>
          {KIT.price}
        </p>
        <span className="mx-auto mt-2 inline-block rounded-full bg-[#0d1738] px-3 py-1 font-display text-[9.5px] font-extrabold uppercase tracking-[.14em] text-gold-bright">
          {PERCENT_OFF}% off
        </span>

        <p className="mt-6 font-display text-[9.5px] font-extrabold uppercase leading-snug tracking-[.14em]">
          Kit price ends
          <br />
          when class goes live
        </p>
        <div className="mt-3">
          <TicketCountdown />
        </div>

        <div className="mt-6 flex flex-col items-center gap-1">
          <Barcode />
          <p className="font-display text-[8.5px] font-bold tracking-[.3em]">ACE · 1108 · {KIT.price}</p>
        </div>
      </div>
    </div>
  );
}
