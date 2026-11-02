/** Single source of truth for the live masterclass. Placeholders are marked TODO. */

export const SPEAKER_NAME = "Kyrien";

/**
 * The one date setting. Every countdown, date line and calendar file reads from here.
 * Starts 7:00 PM Eastern.
 * 8 Nov 2026 falls after the US clocks go back, so Eastern is EST (UTC-5).
 */
export const WEBINAR_START_ISO = "2026-11-08T19:00:00-05:00";
/** Calendar event length in minutes. */
export const WEBINAR_DURATION_MIN = 120;

export const WEBINAR_DATE_LABEL = "Sunday, November 8";
export const WEBINAR_DATE_LABEL_FULL = "Sunday, November 8, 2026";
export const WEBINAR_TIME_LABEL = "7:00 PM";
export const WEBINAR_SHORT_LABEL = `Nov 8, 2026 · ${WEBINAR_TIME_LABEL} EST`;

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

// Placeholders from Mubarak and Kyrien. Anything in [BRACKETS] renders as-is until replaced.
export const SEAT_CAP = "100";
export const VISION_LINE = "Stuck between almost funded and actually paid? This is for you.";

/** Discord or WhatsApp invite. Empty string hides the button and the popup. */
export const GROUP_LINK = "";
/** Welcome video from Kyrien (Wistia ID). */
export const WELCOME_VIDEO_ID = "WISTIA_ID_WELCOME";
/** "Why traders lose funded accounts right after passing" (Wistia ID). */
export const FUNDED_VIDEO_ID = "WISTIA_ID_FUNDED";
/** Student interview video (Wistia ID). */
export const INTERVIEW_VIDEO_ID = "WISTIA_ID_INTERVIEW";

export const NEW_STUDENT = {
  name: "Jorge",
  accountSize: "two $50K accounts",
};

export const KIT = {
  price: 21,
  anchorPrice: "$494",
  /** Whop plan ID for the $21 kit (plan_xxx). Placeholder shows a dashed box instead of the embed. */
  whopPlanId: "WHOP_PLAN_ID",
  /** Whop product page. Used as the checkout link until whopPlanId is set for the embedded checkout. */
  checkoutUrl: "https://whop.com/fortheculturefx/a-c-e-pre-class-kit",
  mockupSrc: "/kit-mockup.jpeg",
  blueprintDifference: "The Blueprint ($200 value, free) explains the method. The Kit gives you the tools to run it: the checklist, the journal, and the funded-account rules.",
  guarantee: "All sales are final. There are no refunds on the Pre-Class Kit.",
};

export const RISK_DISCLAIMER =
  "Trading involves substantial risk and is not suitable for everyone. Results shown are from individual students and are not typical. This masterclass is education only, not financial advice.";

export function isPlaceholderValue(v: string) {
  return !v || /^\[.*\]$/.test(v) || /^(WISTIA_ID_|WHOP_PLAN_ID|YOUTUBE_ID_)/.test(v);
}
