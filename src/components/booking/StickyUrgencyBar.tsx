type Props = { name: string };

/**
 * The "Constant Header" from the Miro board — a slim bar that stays glued
 * to the top of the page (this page has no nav Header, so it takes that
 * slot). Copy stays honest per the project's no-fake-scarcity stance: it
 * restates the real 48-hour call window instead of inventing a countdown
 * or an "expires" deadline.
 */
export default function StickyUrgencyBar({ name }: Props) {
  return (
    <div className="sticky top-0 z-50 border-b border-warning/40 bg-gradient-to-r from-warning/15 via-bg-secondary to-warning/15 px-4 py-2.5 text-center backdrop-blur-md">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-live-dot absolute inline-flex h-full w-full rounded-full bg-warning" />
        </span>
        <span className="font-display text-[12px] font-bold uppercase tracking-wide text-warning sm:text-[13px]">
          Wait {name} — your spot isn&rsquo;t locked in yet.
        </span>
        <span className="text-[12px] text-text-secondary sm:text-[13px]">
          Finish the steps below before your call.
        </span>
      </p>
    </div>
  );
}
