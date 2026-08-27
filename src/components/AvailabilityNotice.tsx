export default function AvailabilityNotice() {
  return (
    <div className="animate-urgent-glow mx-auto mt-14 max-w-[760px] rounded-3xl border border-warning/50 bg-gradient-to-r from-warning/[.12] via-surface to-surface px-7 py-7 sm:px-9">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-live-dot absolute inline-flex h-full w-full rounded-full bg-warning" />
        </span>
        <span className="font-display text-[12px] font-extrabold uppercase tracking-[.16em] text-warning">
          Limited Monthly Spots
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-warning/40 bg-warning/15">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-warning">
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <p className="text-[1.05rem] font-semibold leading-snug text-text-primary sm:text-lg">
          I only take a handful of traders each month
          <span className="block font-normal text-text-secondary sm:inline">
            {" "}
            to ensure maximum support and results.
          </span>
        </p>
      </div>
    </div>
  );
}
