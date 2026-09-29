/** Single source of truth for the live masterclass. Placeholders are marked TODO. */

export const SPEAKER_NAME = "Kyrien";

/** 4 Oct 2026, 7:00 PM US Eastern (EDT, UTC-4 on that date). */
export const WEBINAR_START_ISO = "2026-10-04T19:00:00-04:00";
export const WEBINAR_DATE_LABEL = "Sunday, October 4, 2026";
export const WEBINAR_TIME_LABEL = "7:00 PM EST";
export const WEBINAR_SHORT_LABEL = "Oct 4, 2026 · 7PM EST";

// TODO: replace with the real attendee join URL.
export const ZOOM_LINK = "https://zoom.us/j/REPLACE_WITH_REAL_MEETING_ID";

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

// TODO: replace with the 4 real YouTube video IDs.
export const YOUTUBE_IDS = ["YOUTUBE_ID_1", "YOUTUBE_ID_2", "YOUTUBE_ID_3", "YOUTUBE_ID_4"];

export function isPlaceholderId(id: string) {
  return /^(WISTIA_ID_|YOUTUBE_ID_)/.test(id);
}
