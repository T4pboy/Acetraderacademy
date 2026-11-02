import { buildIcs } from "@/lib/calendar";

export function GET() {
  return new Response(buildIcs(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="ace-masterclass.ics"',
      "Cache-Control": "no-store",
    },
  });
}
