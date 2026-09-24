import { CheckIcon } from "@/components/onboarding/icons";
import type { ApplyOption } from "@/data/applyFormConfig";

type Props = {
  options: ApplyOption[];
  value: string;
  onSelect: (value: string) => void;
};

export default function SingleSelectStep({ options, value, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`w-full rounded-2xl border px-5 py-4 text-left text-[15px] font-semibold transition-colors duration-150 ${
              selected
                ? "border-gold bg-gold/10 text-text-primary"
                : "border-border bg-surface text-text-secondary hover:border-gold/40 hover:bg-gold/5 hover:text-text-primary"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              {opt.label}
              {selected && <CheckIcon className="h-4 w-4 shrink-0 text-gold-bright" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
