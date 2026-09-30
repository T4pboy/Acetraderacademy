/** Single source of truth for the live masterclass. Placeholders are marked TODO. */

export const SPEAKER_NAME = "Kyrien";

/** 4 Oct 2026, 7:00 PM US Eastern (EDT, UTC-4 on that date). */
export const WEBINAR_START_ISO = "2026-10-04T19:00:00-04:00";
export const WEBINAR_DATE_LABEL = "Sunday, October 4, 2026";
export const WEBINAR_TIME_LABEL = "7:00 PM EST";
export const WEBINAR_SHORT_LABEL = "Oct 4, 2026 · 7PM EST";

export const ZOOM_LINK = "https://us05web.zoom.us/j/83118066601?pwd=pb1Hmflo8IOSDK5aB4dTweOla5Ztis.1";

// TODO: replace with the address the reminder emails are actually sent from.
export const SENDER_EMAIL = "SENDER_EMAIL@yourdomain.com";

export type WebinarVideo = {
  /** Wistia hashed ID. Anything starting with WISTIA_ID_ is treated as a placeholder. */
  id: string;
  title: string;
  summary?: string;
};

// First four are the real FAQ videos already used on /booking-confirmed.
// TODO: replace 5-10 with the remaining objection questions and Wistia IDs.
export const OBJECTION_VIDEOS: WebinarVideo[] = [
  { id: "ahu3h3suf6", title: "How much time until results?" },
  {
    id: "41wmk89a73",
    title: "I've tried other courses and lost money. Why would this be different?",
  },
  { id: "tn7f1nuxxt", title: "What if I still don't get funded even after this?" },
  {
    id: "ybpudpc3rt",
    title: "I keep failing my prop firm eval. I don't think I can pass one.",
  },
  ...[5, 6, 7, 8, 9, 10].map((n) => ({
    id: `WISTIA_ID_${n}`,
    title: `Objection question ${n} (coming soon)`,
  })),
];

export const YOUTUBE_IDS = ["HRZSw020EYA", "dozblzSb7Gs", "tC96Lir3yg4", "IKWCSBS59zg"];

export function isPlaceholderId(id: string) {
  return /^(WISTIA_ID_|YOUTUBE_ID_)/.test(id);
}
