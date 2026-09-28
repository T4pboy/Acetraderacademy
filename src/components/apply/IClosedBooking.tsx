"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, CalendarIcon } from "@/components/onboarding/icons";
import { ClockIcon } from "./icons";

type Props = {
  email: string;
  fullName: string;
  phone: string;
};

type Availabilities = Record<string, string[]>;

// The team runs calls on US Eastern time — fixed rather than the visitor's own
// browser timezone, so the calendar always reflects the team's real hours
// (and doesn't collapse into an all-PM list for visitors east of the US).
const BOOKING_TIME_ZONE = "America/New_York";

function minutesOfDay(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

// iClosed returns slots in fixed intervals (commonly every 15 min); condense
// that down to roughly hourly options so the grid isn't overwhelming.
function toHourlySlots(times: string[]): string[] {
  if (times.length <= 1) return times;
  const step = minutesOfDay(times[1]) - minutesOfDay(times[0]);
  if (step <= 0) return times;
  const everyN = Math.max(1, Math.round(60 / step));
  return times.filter((_, i) => i % everyN === 0);
}

function groupByPeriod(times: string[]) {
  const groups = [
    { label: "Morning", items: [] as string[] },
    { label: "Afternoon", items: [] as string[] },
    { label: "Evening", items: [] as string[] },
  ];
  for (const t of times) {
    const hour = minutesOfDay(t) / 60;
    if (hour < 12) groups[0].items.push(t);
    else if (hour < 17) groups[1].items.push(t);
    else groups[2].items.push(t);
  }
  return groups.filter((g) => g.items.length > 0);
}

// Returns "YYYY-MM-DD" for "now" as seen in the given IANA timezone.
function todayInTimeZone(timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

// Converts a wall-clock date+time in `timeZone` to a UTC ISO string, handling
// DST correctly for that specific date (no date library needed).
function zonedDateTimeToUtcISOString(dateStr: string, timeStr: string, timeZone: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  const naiveUtcGuess = Date.UTC(year, month - 1, day, hour, minute);

  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(new Date(naiveUtcGuess)).reduce<Record<string, string>>((acc, p) => {
    acc[p.type] = p.value;
    return acc;
  }, {});
  const wallTimeAsUtc = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
  );
  const offsetMs = wallTimeAsUtc - naiveUtcGuess;
  return new Date(naiveUtcGuess - offsetMs).toISOString();
}

function formatDateParts(dateStr: string) {
  // Noon avoids the date rendering as the day before in timezones behind UTC.
  const d = new Date(`${dateStr}T12:00:00`);
  return {
    weekday: d.toLocaleDateString(undefined, { weekday: "short" }),
    day: d.toLocaleDateString(undefined, { day: "numeric" }),
    month: d.toLocaleDateString(undefined, { month: "short" }),
  };
}

function formatDateLabel(dateStr: string) {
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
          body: JSON.stringify({ timeZone: BOOKING_TIME_ZONE, currentDate: todayInTimeZone(BOOKING_TIME_ZONE) }),
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
  }, []);

  async function confirmBooking() {
    if (!selectedDate || !selectedTime) return;
    setBooking("booking");
    try {
      const dateTime = zonedDateTimeToUtcISOString(selectedDate, selectedTime, BOOKING_TIME_ZONE);
      const res = await fetch("/api/iclosed/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dateTime, timeZone: BOOKING_TIME_ZONE, fullName, email, phone }),
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
      <div className="w-full text-center">
        <p className="text-[14px] text-slate-600">
          We couldn&rsquo;t load the calendar right now. We&rsquo;ve got your details and will reach out at{" "}
          <span className="font-semibold text-slate-900">{email}</span> to schedule your call.
        </p>
      </div>
    );
  }

  if (!availabilities) {
    return (
      <div className="flex min-h-[220px] w-full flex-col items-center justify-center gap-3 text-center">
        <span className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-slate-500">
          Loading available times
        </span>
      </div>
    );
  }

  const dates = Object.keys(availabilities).sort();
  const times = selectedDate ? toHourlySlots(availabilities[selectedDate] ?? []) : [];
  const groups = groupByPeriod(times);

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
          <CalendarIcon className="h-3.5 w-3.5" />
          Pick a day
        </div>
        <div className="flex flex-wrap gap-2">
          {dates.map((date) => {
            const { weekday, day, month } = formatDateParts(date);
            const selected = date === selectedDate;
            return (
              <button
                key={date}
                type="button"
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={`flex min-w-[74px] flex-col items-center gap-0.5 rounded-2xl border px-4 py-2.5 transition-colors ${
                  selected
                    ? "border-gold bg-gold/10 text-slate-900"
                    : "border-slate-200 bg-white text-slate-600 hover:border-gold/50 hover:bg-gold/5"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wide opacity-70">{weekday}</span>
                <span className="text-[18px] font-extrabold leading-tight">{day}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wide opacity-70">{month}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-2 text-[12px] font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            Pick a time
          </span>
          <span className="text-[11px] font-medium normal-case text-slate-400">Eastern Time (ET)</span>
        </div>

        {groups.length === 0 && <p className="text-[13px] text-slate-500">No times available on this day.</p>}

        <div className="flex flex-col gap-3">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">{group.label}</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {group.items.map((time) => {
                  const selected = time === selectedTime;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-[13px] font-semibold transition-colors ${
                        selected
                          ? "border-gold bg-gold/10 text-slate-900"
                          : "border-slate-200 bg-white text-slate-600 hover:border-gold/50 hover:bg-gold/5"
                      }`}
                    >
                      {selected && <CheckIcon className="h-3.5 w-3.5 text-gold" />}
                      {formatTimeLabel(time)}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDate && selectedTime && (
        <p className="text-[13px] font-semibold text-slate-700">
          You&rsquo;re booking: {formatDateLabel(selectedDate)} at {formatTimeLabel(selectedTime)} ET
        </p>
      )}

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
