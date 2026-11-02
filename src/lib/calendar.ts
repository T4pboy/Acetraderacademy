import { WEBINAR_DURATION_MIN, WEBINAR_START_ISO, ZOOM_LINK } from "@/data/webinar";

const TITLE = "A.C.E. Live Masterclass with Kyrien";
const DETAILS = `Join the live masterclass on Zoom: ${ZOOM_LINK}\n\nBring your charts and your questions.`;

/** 20261108T000000Z */
function utc(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function range() {
  const start = new Date(WEBINAR_START_ISO);
  const end = new Date(start.getTime() + WEBINAR_DURATION_MIN * 60_000);
  return { start, end };
}

export function googleCalendarUrl() {
  const { start, end } = range();
  const q = new URLSearchParams({
    action: "TEMPLATE",
    text: TITLE,
    dates: `${utc(start)}/${utc(end)}`,
    details: DETAILS,
    location: ZOOM_LINK,
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}

function esc(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/[,;]/g, (c) => `\\${c}`);
}

export function buildIcs() {
  const { start, end } = range();
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//For The Culture FX//ACE Masterclass//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:ace-masterclass-${utc(start)}@fortheculturefx`,
    `DTSTAMP:${utc(new Date())}`,
    `DTSTART:${utc(start)}`,
    `DTEND:${utc(end)}`,
    `SUMMARY:${esc(TITLE)}`,
    `DESCRIPTION:${esc(DETAILS)}`,
    `LOCATION:${esc(ZOOM_LINK)}`,
    `URL:${ZOOM_LINK}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:A.C.E. masterclass starts in 1 hour",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
