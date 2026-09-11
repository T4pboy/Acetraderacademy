/**
 * Small stroke icons for the onboarding checklist — kept in one file since
 * each is only used once (one per step) and matches the stroke weight/style
 * already used elsewhere on the site (ClosingBand's check, Hero's arrow).
 */

type IconProps = { className?: string };

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function DiscordIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.3 5.4A17.6 17.6 0 0 0 15.9 4c-.2.4-.5.9-.6 1.3a16.3 16.3 0 0 0-4.6 0A8.8 8.8 0 0 0 10 4a17.5 17.5 0 0 0-4.4 1.4C2.9 9.3 2.2 13 2.5 16.7a17.7 17.7 0 0 0 5.4 2.7c.4-.6.8-1.2 1.1-1.9-.6-.2-1.2-.5-1.7-.9l.4-.3a12.6 12.6 0 0 0 10.6 0l.4.3c-.5.4-1.1.7-1.7.9.3.7.7 1.3 1.1 1.9a17.6 17.6 0 0 0 5.4-2.7c.4-4.3-.7-8-2.7-11.3ZM9.7 14.3c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Zm5.1 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8Z" />
    </svg>
  );
}

export function LibraryIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="7" height="16" rx="1.5" />
      <rect x="13" y="7" width="7" height="13" rx="1.5" />
      <path d="M6.5 9v.01M16.5 11v.01" />
    </svg>
  );
}

export function SurveyIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 3h6l1 2h2a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2Z" />
      <path d="M9 12h6M9 16h4" />
    </svg>
  );
}
