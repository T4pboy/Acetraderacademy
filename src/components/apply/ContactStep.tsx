import { ArrowRightIcon } from "./icons";
import type { ApplyFormData } from "@/data/applyFormConfig";
import { isPhoneWithCountryCode } from "./phone";

const INPUT_CLASSES =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]";
const INPUT_ERROR_CLASSES =
  "w-full rounded-2xl border border-error/60 bg-white px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-error focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]";

function isEmailValid(email: string) {
  return /^\S+@\S+\.\S+$/.test(email.trim());
}
function isNameValid(name: string) {
  return name.trim().length > 1;
}
function isPhoneValid(phone: string) {
  return isPhoneWithCountryCode(phone);
}
function phoneError(phone: string) {
  if (!phone.trim().startsWith("+")) return "Include your country code, starting with + (e.g. +1 555 123 4567).";
  return "Enter a complete phone number with country code.";
}

type Props = {
  data: ApplyFormData;
  onChange: <K extends keyof ApplyFormData>(key: K, value: ApplyFormData[K]) => void;
  attempted: boolean;
  onNext: () => void;
};

export default function ContactStep({ data, onChange, attempted, onNext }: Props) {
  const contactValid = isNameValid(data.fullName) && isEmailValid(data.email) && isPhoneValid(data.phone);
  // Show an error once a field has been touched (or Next was attempted).
  const showName = (attempted || data.fullName !== "") && !isNameValid(data.fullName);
  const showEmail = (attempted || data.email !== "") && !isEmailValid(data.email);
  const showPhone = (attempted || data.phone !== "") && !isPhoneValid(data.phone);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-600" htmlFor="apply-fullName">
          Full name
        </label>
        <input
          id="apply-fullName"
          type="text"
          autoComplete="name"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
          placeholder="Jane Trader"
          className={showName ? INPUT_ERROR_CLASSES : INPUT_CLASSES}
        />
        {showName && (
          <p className="mt-1.5 text-[12px] text-error">Enter your full name.</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-600" htmlFor="apply-email">
          Email
        </label>
        <input
          id="apply-email"
          type="email"
          autoComplete="email"
          value={data.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="jane@email.com"
          className={showEmail ? INPUT_ERROR_CLASSES : INPUT_CLASSES}
        />
        {showEmail && (
          <p className="mt-1.5 text-[12px] text-error">Enter a valid email address.</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-semibold text-slate-600" htmlFor="apply-phone">
          Phone
        </label>
        <input
          id="apply-phone"
          type="tel"
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+1 555 123 4567"
          className={showPhone ? INPUT_ERROR_CLASSES : INPUT_CLASSES}
        />
        {showPhone && (
          <p className="mt-1.5 text-[12px] text-error">{phoneError(data.phone)}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!contactValid}
        className="group mt-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:brightness-100 inline-flex min-h-12 items-center justify-center gap-2 self-start rounded-full bg-gold px-6 py-3 font-display text-[14px] font-bold uppercase tracking-wide text-[#04101f] shadow-[0_0_20px_rgba(255,193,56,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,212,116,0.55)]"
      >
        Next
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
