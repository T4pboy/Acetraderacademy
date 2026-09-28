import { NextResponse } from "next/server";

const ICLOSED_BASE_URL = "https://public.api.iclosed.io/v1";

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  // iClosed requires both names; single-word entries reuse the first name as the last.
  const lastName = parts.slice(1).join(" ") || firstName;
  return { firstName, lastName };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.dateTime !== "string" ||
    typeof body.timeZone !== "string" ||
    typeof body.fullName !== "string" ||
    typeof body.email !== "string" ||
    typeof body.phone !== "string"
  ) {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const apiKey = process.env.ICLOSED_API_KEY;
  const linkPrefix = process.env.ICLOSED_LINK_PREFIX;
  if (!apiKey || !linkPrefix) {
    console.error("ICLOSED_API_KEY or ICLOSED_LINK_PREFIX is not set");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  const { firstName, lastName } = splitName(body.fullName);

  try {
    const res = await fetch(`${ICLOSED_BASE_URL}/eventCalls`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        linkPrefix,
        dateTime: body.dateTime,
        timeZone: body.timeZone,
        firstName,
        lastName,
        email: body.email,
        phoneNumber: body.phone,
        secondaryQuestionsAnswer: [],
      }),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      console.error("iClosed booking rejected", res.status, json);
      // TEMPORARY diagnostic field (remove once the booking failure is diagnosed).
      // Never include any part of the API key here, even for debugging.
      return NextResponse.json(
        { ok: false, error: "Booking was rejected", debug: { upstreamStatus: res.status, upstreamBody: json } },
        { status: 502 },
      );
    }

    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const zapierRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "call_booked",
            fullName: body.fullName,
            email: body.email,
            phone: body.phone,
            dateTime: body.dateTime,
            timeZone: body.timeZone,
            eventCallId: json?.data?.eventCall?.data?.id ?? null,
            previewId: json?.data?.previewId ?? null,
            source: "ace-academy-apply-form",
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!zapierRes.ok) {
          console.error("Zapier rejected the booking notification", zapierRes.status);
        }
      } catch (err) {
        console.error("Failed to notify Zapier of booking", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to book iClosed call", err);
    return NextResponse.json({ ok: false, error: "Booking service unreachable" }, { status: 502 });
  }
}
