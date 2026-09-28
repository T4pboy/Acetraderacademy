"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  email: string;
  fullName: string;
  phone: string;
};

type Availabilities = Record<string, string[]>;

function localDateString(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDateLabel(dateStr: string) {
  // Noon avoids the date rendering as the day before in timezones behind UTC.
  const d = new Date(`${dateStr}T12:00:00`);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function formatTimeLabel(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export default function IClosedBooking({ email, fullName, phone }: Props) {
  const router = useRouter();
  const [timeZone] = useState(() => Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [availabilities, setAvailabilities] = useState<Availabilities | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booking, setBooking] = useState<"idle" | "booking" | "error">("idle");

  useEffect(() => {
    let cancelled = false;
    async function loadAvailability() {
      try {
        const res = await fetch("/api/iclosed/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timeZone, currentDate: localDateString(new Date()) }),
        });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || !json.ok) {
          setLoadError(true);
          return;
        }
        setAvailabilities(json.availabilities);
        const firstDate = Object.keys(json.availabilities).sort()[0];
        if (firstDate) setSelectedDate(firstDate);
      } catch {
        if (!cancelled) setLoadError(true);
      }
    }
    loadAvailability();
    return () => {
      cancelled = true;
    };
  }, [timeZone]);

  async function confirmBooking() {
    if (!selectedDate || !selectedTime) return;
    setBooking("booking");
    try {
      // No timezone suffix here, so this parses as local time in the visitor's
      // own browser timezone, which is the same one sent as `timeZone` below.
      const dateTime = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();
      const res = await fetch("/api/iclosed/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateTime, timeZone, fullName, email, phone }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setBooking("error");
        return;
      }
      router.push(`/booking-confirmed?name=${encodeURIComponent(fullName)}`);
    } catch {
      setBooking("error");
    }
  }

  if (loadError) {
    return (
      <div className="w-full rounded-[28px] bg-white p-6 text-center shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
        <p className="text-[14px] text-slate-600">
          We couldn&rsquo;t load the calendar right now. We&rsquo;ve got your details and will reach out at{" "}
          <span className="font-semibold text-slate-900">{email}</span> to schedule your call.
        </p>
      </div>
    );
  }

  if (!availabilities) {
    return (
      <div className="flex min-h-[320px] w-full flex-col items-center justify-center gap-3 rounded-[28px] bg-white px-6 text-center shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
        <span className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-slate-500">
          Loading available times
        </span>
      </div>
    );
  }

  const dates = Object.keys(availabilities).sort();
  const times = selectedDate ? (availabilities[selectedDate] ?? []) : [];

  return (
    <div className="flex w-full flex-col gap-4 rounded-[28px] bg-white p-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)] sm:p-8">
      <div className="flex flex-wrap gap-2">
        {dates.map((date) => (
          <button
            key={date}
            type="button"
            onClick={() => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              date === selectedDate
                ? "border-gold bg-gold/10 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-gold/50 hover:bg-gold/5"
            }`}
          >
            {formatDateLabel(date)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {times.length === 0 && (
          <p className="col-span-full text-[13px] text-slate-500">No times available on this day.</p>
        )}
        {times.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => setSelectedTime(time)}
            className={`rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition-colors ${
              time === selectedTime
                ? "border-gold bg-gold/10 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-gold/50 hover:bg-gold/5"
            }`}
          >
            {formatTimeLabel(time)}
          </button>
        ))}
      </div>

      {booking === "error" && (
        <p className="text-[13px] text-error">
          That slot didn&rsquo;t go through. Pick a time and try again, we&rsquo;ll also follow up by email.
        </p>
      )}

      <button
        type="button"
        disabled={!selectedDate || !selectedTime || booking === "booking"}
        onClick={confirmBooking}
        className="inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-gold px-6 py-3 font-display text-[14px] font-bold uppercase tracking-wide text-[#04101f] shadow-[0_0_20px_rgba(255,193,56,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,212,116,0.55)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_20px_rgba(255,193,56,0.35)]"
      >
        {booking === "booking" ? "Booking..." : "Confirm Strategy Call"}
      </button>
    </div>
  );
}
