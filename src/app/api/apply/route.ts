import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.email !== "string" || typeof body.fullName !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 400 });
  }

  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("ZAPIER_WEBHOOK_URL is not set");
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }

  try {
    const zapierRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        source: "ace-academy-apply-form",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!zapierRes.ok) {
      return NextResponse.json({ ok: false, error: "Webhook rejected" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to forward lead to Zapier", err);
    return NextResponse.json({ ok: false, error: "Webhook unreachable" }, { status: 502 });
  }
}
