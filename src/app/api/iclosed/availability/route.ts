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

  try {
    const res = await fetch(`${ICLOSED_BASE_URL}/events/eventDates`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        linkPrefix,
        timeZone: body.timeZone,
        currentDate: body.currentDate,
      }),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.data?.availabilities) {
      console.error("iClosed availability request failed", res.status, json);
      return NextResponse.json({ ok: false, error: "Could not load availability" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, availabilities: json.data.availabilities });
  } catch (err) {
    console.error("Failed to fetch iClosed availability", err);
    return NextResponse.json({ ok: false, error: "Availability service unreachable" }, { status: 502 });
  }
}
