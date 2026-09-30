"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, CalendarIcon } from "@/components/onboarding/icons";
import { ArrowLeftIcon, ArrowRightIcon, ClockIcon } from "./icons";

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

// Calls can't be booked sooner than this many days after the day the visitor applies.
const MIN_LEAD_DAYS = 3;

// Returns "YYYY-MM-DD" for "now" as seen in the given IANA timezone.
function todayInTimeZone(timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(new Date());
}

function addDays(dateStr: string, days: number) {
  const d = new Date(`${dateStr}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
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

const WEEKDAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Month keys are "YYYY-MM".
function monthKeyOf(dateStr: string) {
  return dateStr.slice(0, 7);
}

function shiftMonth(key: string, delta: number) {
  const [y, m] = key.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + delta, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function formatMonthLabel(key: string) {
  // Noon avoids the date rendering as the day before in timezones behind UTC.
  return new Date(`${key}-01T12:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// Leading nulls pad the first week so day 1 lands under the right weekday.
function buildMonthCells(key: string): (string | null)[] {
  const [y, m] = key.split("-").map(Number);
  const leading = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const cells: (string | null)[] = Array(leading).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(`${key}-${String(d).padStart(2, "0")}`);
  return cells;
}

function formatDateLabel(dateStr: string) {
  const d = new Date(`${dateStr}T12:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
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
  const [booking, setBooking] = useState<"idle" | "booking" | "error" | "taken">("idle");
  const [viewMonth, setViewMonth] = useState<string | null>(null);

  // Fetches the free slots, keeping only days at or after the minimum lead time.
  // Returns null if the request fails.
  async function fetchAvailability(): Promise<Availabilities | null> {
    const earliestBookableDate = addDays(todayInTimeZone(BOOKING_TIME_ZONE), MIN_LEAD_DAYS);
    try {
      const res = await fetch("/api/iclosed/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeZone: BOOKING_TIME_ZONE, currentDate: earliestBookableDate }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) return null;
      const allowed: Availabilities = {};
      for (const [date, slots] of Object.entries(json.availabilities as Availabilities)) {
        if (date >= earliestBookableDate && slots.length > 0) allowed[date] = slots;
      }
      return allowed;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    let cancelled = false;
    fetchAvailability().then((allowed) => {
      if (cancelled) return;
      if (!allowed) {
        setLoadError(true);
        return;
      }
      setAvailabilities(allowed);
      const firstDate = Object.keys(allowed).sort()[0];
      if (firstDate) {
        setSelectedDate(firstDate);
        setViewMonth(monthKeyOf(firstDate));
      }
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        await handleBookingFailure();
        return;
      }
      router.push(`/booking-confirmed?name=${encodeURIComponent(fullName)}`);
    } catch {
      await handleBookingFailure();
    }
  }

  // A failed booking usually means someone else just took the slot. Reload the
  // calendar so the taken time disappears, and tell the visitor to pick another.
  async function handleBookingFailure() {
    const fresh = await fetchAvailability();
    if (!fresh) {
      setBooking("error");
      return;
    }
    const stillOpen = selectedDate && selectedTime ? fresh[selectedDate]?.includes(selectedTime) : false;
    setAvailabilities(fresh);
    setSelectedTime(null);
    if (selectedDate && !fresh[selectedDate]) {
      const nextDate = Object.keys(fresh).sort()[0] ?? null;
      setSelectedDate(nextDate);
      if (nextDate) setViewMonth(monthKeyOf(nextDate));
    }
    setBooking(stillOpen ? "error" : "taken");
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

  const openDates = Object.keys(availabilities)
    .filter((d) => availabilities[d].length > 0)
    .sort();

  if (openDates.length === 0 || !viewMonth) {
    return (
      <div className="w-full text-center">
        <p className="text-[14px] text-slate-600">
          There are no open Strategy Call times right now. We&rsquo;ve got your details and will reach out at{" "}
          <span className="font-semibold text-slate-900">{email}</span> to schedule your call.
        </p>
      </div>
    );
  }

  const openSet = new Set(openDates);
  const firstMonth = monthKeyOf(openDates[0]);
  const lastMonth = monthKeyOf(openDates[openDates.length - 1]);
  const cells = buildMonthCells(viewMonth);
  const times = selectedDate ? toHourlySlots(availabilities[selectedDate] ?? []) : [];
  const groups = groupByPeriod(times);

  const navButton =
    "flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-gold/60 hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:bg-transparent";

  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
          <CalendarIcon className="h-3.5 w-3.5" />
          Pick a day
        </div>
        <div className="rounded-2xl border border-slate-200 p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              disabled={viewMonth <= firstMonth}
              onClick={() => setViewMonth(shiftMonth(viewMonth, -1))}
              className={navButton}
            >
              <ArrowLeftIcon className="h-3.5 w-3.5" />
            </button>
            <span className="font-display text-[14px] font-bold text-slate-900">{formatMonthLabel(viewMonth)}</span>
            <button
              type="button"
              aria-label="Next month"
              disabled={viewMonth >= lastMonth}
              onClick={() => setViewMonth(shiftMonth(viewMonth, 1))}
              className={navButton}
            >
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-bold uppercase tracking-wide text-slate-400">
            {WEEKDAY_HEADERS.map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <span key={`pad-${i}`} />;
              const dayNumber = Number(date.slice(8));
              const available = openSet.has(date);
              const selected = date === selectedDate;
              return (
                <button
                  key={date}
                  type="button"
                  disabled={!available}
                  aria-label={formatDateLabel(date)}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  className={`flex aspect-square items-center justify-center rounded-full text-[13px] font-semibold transition-colors ${
                    selected
                      ? "bg-gold text-[#04101f] shadow-[0_0_14px_rgba(255,193,56,0.45)]"
                      : available
                        ? "bg-gold/10 text-slate-900 hover:bg-gold/30"
                        : "cursor-not-allowed text-slate-300"
                  }`}
                >
                  {dayNumber}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-2 text-[12px] font-semibold text-slate-500">
          <span className="flex items-center gap-1.5">
            <ClockIcon className="h-3.5 w-3.5" />
            {selectedDate ? `Pick a time on ${formatDateLabel(selectedDate)}` : "Pick a time"}
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

      {booking === "taken" && (
        <p className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-[13px] font-semibold text-error">
          Sorry, that time was just booked by someone else. The calendar has been updated, so please pick another day
          or time.
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
