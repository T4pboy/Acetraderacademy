import { CheckIcon } from "./icons";

type Props = {
  number: number;
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  /** Last step skips the connector line and the bottom spacing. */
  isLast?: boolean;
  completed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

/**
 * One numbered card in the onboarding checklist — a gold timeline node on
 * the left (connected to the next step by a vertical line) plus a glow-bordered
 * dark card on the right, matching the frame/shadow language already used by
 * WhiteContainer/ClosingBand/VideoSlot elsewhere on the site.
 */
export default function OnboardingStep({
  number,
  eyebrow,
  title,
  description,
  isLast = false,
  completed,
  onToggle,
  children,
}: Props) {
  return (
    <div className={`relative ${isLast ? "" : "pb-10 sm:pb-14"}`}>
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-5 top-10 w-px bg-gradient-to-b from-gold/40 to-border"
        />
      )}

      <div className="relative flex gap-5 sm:gap-7">
        <div
          className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-extrabold transition-colors ${
            completed
              ? "bg-[radial-gradient(circle_at_35%_30%,var(--color-gold-bright),var(--color-gold)_70%)] text-[#04101f] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_20px_rgba(255,193,56,0.35)]"
              : "border border-gold/40 bg-surface-elevated text-gold-bright"
          }`}
        >
          {completed ? <CheckIcon className="h-4 w-4" /> : number}
        </div>

        <div className="flex-1 rounded-[28px] border border-brand-blue/25 bg-gradient-to-b from-surface-elevated to-[#050a16] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:p-8">
          <span className="mb-2 block font-display text-[11px] font-bold uppercase tracking-[.16em] text-gold-bright">
            {eyebrow}
          </span>
          <h3 className="mb-2.5 text-[1.2rem] font-extrabold leading-snug sm:text-[1.35rem]">
            {title}
          </h3>
          <p className="mb-6 max-w-[560px] text-[13.5px] leading-relaxed text-text-secondary sm:text-[14.5px]">
            {description}
          </p>

          {children}

          <div className="mt-7 flex justify-end border-t border-border pt-5">
            <button
              type="button"
              onClick={onToggle}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-[11px] font-bold uppercase tracking-wide transition-colors ${
                completed
                  ? "border border-gold/40 bg-gold/15 text-gold-bright"
                  : "border border-border text-text-muted hover:border-gold/40 hover:text-gold-bright"
              }`}
            >
              <CheckIcon className="h-3.5 w-3.5" />
              {completed ? "Completed" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
