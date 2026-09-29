import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (
    !body ||
    typeof body.email !== "string" ||
    typeof body.fullName !== "string" ||
    !/^\S+@\S+\.\S+$/.test(body.email.trim()) ||
    body.fullName.trim().length < 2
  ) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const webhookUrl = process.env.ZAPIER_WEBINAR_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("ZAPIER_WEBINAR_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "webinar_registration",
        fullName: body.fullName.trim(),
        email: body.email.trim(),
        phone: typeof body.phone === "string" ? body.phone.trim() : "",
        source: "ace-academy-webinar",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error("Zapier rejected webinar registration", res.status);
      return NextResponse.json({ ok: false, error: "Webhook rejected" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to forward webinar registration to Zapier", err);
    return NextResponse.json({ ok: false, error: "Webhook unreachable" }, { status: 502 });
  }
}
