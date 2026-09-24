type Props = {
  /** Passed through so the real embed can prefill fields once wired up. */
  email: string;
  fullName: string;
};

/**
 * Placeholder for the iClosed "Strategy Call" booking widget — the real
 * embed snippet hasn't been supplied yet. Mirrors VideoSlot's placeholder
 * frame/glow treatment so this slot doesn't look broken in the meantime.
 *
 * TODO(iClosed): once the embed snippet arrives, swap this component's
 * internals only. If it's a plain iframe src, wire it directly; if it's a
 * vendor <script> tag (like Vidalytics), follow the VidalyticsPlayer
 * pattern instead (static public/*.html + same-origin iframe + a
 * contentDocument readiness poll), since script-tag widgets aren't safe to
 * inject via a React effect. BookingStep and ApplyForm need zero changes
 * either way.
 */
export default function IClosedBooking({}: Props) {
  return (
    <div className="rounded-4xl border border-brand-blue/35 bg-gradient-to-b from-surface-elevated to-[#050a16] p-2.5 [box-shadow:var(--shadow-glow-md),0_30px_60px_-25px_rgba(0,0,0,0.7)]">
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-[calc(var(--radius-4xl)-6px)] bg-[radial-gradient(ellipse_500px_300px_at_50%_40%,rgba(59,130,246,0.18),transparent_70%),linear-gradient(160deg,#0c1730,#050a16_70%)] px-6 text-center">
        <span className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-text-secondary">
          Booking calendar loading
        </span>
        <p className="max-w-[360px] text-[13px] leading-relaxed text-text-muted">
          Pick a time for your free Strategy Call, this widget is being connected. Use the button below if it
          doesn&rsquo;t load.
        </p>
      </div>
    </div>
  );
}
