import { NextResponse } from "next/server";

const ICLOSED_BASE_URL = "https://public.api.iclosed.io/v1";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.timeZone !== "string" || typeof body.currentDate !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const apiKey = process.env.ICLOSED_API_KEY;
  const linkPrefix = process.env.ICLOSED_LINK_PREFIX;
  if (!apiKey || !linkPrefix) {
    console.error("ICLOSED_API_KEY or ICLOSED_LINK_PREFIX is not set");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  // iClosed returns an empty result when asked from a day whose slots have all
  // passed (e.g. after the last slot of the day), even though later days are
  // open. So if the first response is empty, retry from each following day.
  const MAX_ATTEMPTS = 8;

  function addDays(dateStr: string, days: number) {
    const d = new Date(`${dateStr}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
  }

  try {
    let availabilities: Record<string, string[]> = {};

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const res = await fetch(`${ICLOSED_BASE_URL}/events/eventDates`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          linkPrefix,
          timeZone: body.timeZone,
          currentDate: addDays(body.currentDate, i),
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.data?.availabilities) {
        console.error("iClosed availability request failed", res.status, json);
        return NextResponse.json({ ok: false, error: "Could not load availability" }, { status: 502 });
      }

      availabilities = json.data.availabilities;
      if (Object.keys(availabilities).length > 0) break;
    }

    return NextResponse.json({ ok: true, availabilities });
  } catch (err) {
    console.error("Failed to fetch iClosed availability", err);
    return NextResponse.json({ ok: false, error: "Availability service unreachable" }, { status: 502 });
  }
}
