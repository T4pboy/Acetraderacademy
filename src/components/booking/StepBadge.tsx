type Tone = "dark" | "light";

type Props = {
  step?: string;
  /** "dark" (default) for badges sitting on the page's navy background;
   * "light" for badges sitting on a white section — swaps the translucent
   * gold pill for a solid navy chip so it still has contrast. */
  tone?: Tone;
  children: React.ReactNode;
};

const TONE_CLASSES: Record<Tone, string> = {
  dark: "border border-gold/40 bg-gold/10 text-gold-bright",
  light: "bg-bg-primary text-gold-bright shadow-[0_2px_12px_rgba(2,8,23,0.25)]",
};

/**
 * Small pill label used to mark each numbered step on the booking
 * confirmation page ("STEP 1: Watch The Video Below In Full", etc.) —
 * styled after FinalCTA's "Last Opportunity" badge for consistency.
 */
export default function StepBadge({ step, tone = "dark", children }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4.5 py-2 font-display text-[11px] font-bold uppercase tracking-[.16em] ${TONE_CLASSES[tone]}`}
    >
      {step && <span className={tone === "light" ? "text-white/70" : "text-text-primary/90"}>{step}:</span>}
      {children}
    </span>
  );
}
