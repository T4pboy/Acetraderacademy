type Size = "hero" | "featured" | "grid";
type Tone = "dark" | "light";

type Props = {
  size?: Size;
  /** Small caption rendered inside the placeholder poster. */
  label?: string;
  /** Optional caption rendered below the frame (used for FAQ questions). */
  title?: string;
  /** Color of the `title` caption below the frame — "dark" (default) for
   * sections on the page's navy background, "light" for white sections. */
  tone?: Tone;
};

const FRAME_BY_SIZE: Record<Size, string> = {
  hero: "mx-auto max-w-[700px]",
  featured: "mx-auto max-w-[620px]",
  grid: "w-full",
};

const PLAY_BUTTON_BY_SIZE: Record<Size, string> = {
  hero: "h-[76px] w-[76px]",
  featured: "h-16 w-16",
  grid: "h-[52px] w-[52px]",
};

/**
 * Placeholder video frame shared by the hero confirmation video, the A.C.E.
 * Method explainer, and the FAQ grid. Styled to match VSLPlayer's glow frame
 * and "before mount" poster so real embeds can drop in later (Vidalytics,
 * Loom, etc.) without changing the surrounding layout — none of this
 * page's video assets exist yet, so every slot renders as a static poster
 * for now.
 */
export default function VideoSlot({ size = "grid", label, title, tone = "dark" }: Props) {
  return (
    <div className={FRAME_BY_SIZE[size]}>
      <div className="rounded-4xl border border-brand-blue/35 bg-gradient-to-b from-surface-elevated to-[#050a16] p-2.5 [box-shadow:var(--shadow-glow-md),0_30px_60px_-25px_rgba(0,0,0,0.7)]">
        <div className="relative aspect-video overflow-hidden rounded-[calc(var(--radius-4xl)-6px)] bg-[radial-gradient(ellipse_500px_300px_at_50%_40%,rgba(59,130,246,0.18),transparent_70%),linear-gradient(160deg,#0c1730,#050a16_70%)]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
            <div
              aria-hidden="true"
              className={`flex items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-gold-bright),var(--color-gold)_70%)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_30px_rgba(255,193,56,0.35),0_10px_30px_-8px_rgba(0,0,0,0.6)] ${PLAY_BUTTON_BY_SIZE[size]}`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-1/2 w-1/2 text-[#04101f]">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            {label && (
              <span className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-text-secondary">
                {label}
              </span>
            )}
          </div>
        </div>
      </div>
      {title && (
        <p className={`mt-3 text-center text-[.9rem] leading-snug ${tone === "light" ? "text-slate-600" : "text-text-secondary"}`}>
          {title}
        </p>
      )}
    </div>
  );
}
