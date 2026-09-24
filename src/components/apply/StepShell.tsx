import { ArrowLeftIcon } from "./icons";

type Props = {
  step: number;
  totalSteps: number;
  title: string;
  onBack?: () => void;
  children: React.ReactNode;
};

export default function StepShell({ step, totalSteps, title, onBack, children }: Props) {
  return (
    <div>
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between font-display text-[11px] font-bold uppercase tracking-[.14em] text-text-muted">
          <span>
            Step {step} of {totalSteps}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="rounded-[28px] border border-brand-blue/25 bg-gradient-to-b from-surface-elevated to-[#050a16] p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:p-8">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-wide text-text-muted transition-colors hover:border-gold/40 hover:text-gold-bright"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back
          </button>
        )}
        <h3 className="mb-6 text-[1.2rem] font-extrabold leading-snug sm:text-[1.35rem]">{title}</h3>
        {children}
      </div>
    </div>
  );
}
