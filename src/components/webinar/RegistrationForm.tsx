"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INPUT =
  "w-full rounded-2xl border bg-white px-4 py-3.5 text-[15px] text-slate-900 placeholder:text-slate-400 outline-none transition-colors focus:border-brand-blue focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]";

export default function RegistrationForm({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const nameOk = fullName.trim().length > 1;
  const emailOk = /^\S+@\S+\.\S+$/.test(email.trim());
  const phoneOk = phone.replace(/\D/g, "").length >= 7;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted(true);
    if (!nameOk || !emailOk || !phoneOk || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/webinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone }),
      });
      if (!res.ok) throw new Error("bad response");
      router.push(`/webinar/confirmed?name=${encodeURIComponent(fullName.trim())}`);
    } catch {
      setError("Something went wrong saving your seat. Please try again.");
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative mx-auto w-full max-w-[520px] rounded-[28px] bg-white p-6 text-left shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-8"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
        >
          &times;
        </button>
      )}
      <h2 className="mb-6 pr-8 text-[1.2rem] font-extrabold leading-snug text-slate-900 sm:text-[1.35rem]">
        Reserve your free VIP seat
      </h2>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="webinar-name" className="mb-1.5 block text-[13px] font-semibold text-slate-600">
            Full name
          </label>
          <input
            id="webinar-name"
            type="text"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Jane Trader"
            className={`${INPUT} ${attempted && !nameOk ? "border-error/60" : "border-slate-200"}`}
          />
          {attempted && !nameOk && <p className="mt-1.5 text-[12px] text-error">Enter your full name.</p>}
        </div>

        <div>
          <label htmlFor="webinar-email" className="mb-1.5 block text-[13px] font-semibold text-slate-600">
            Email
          </label>
          <input
            id="webinar-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@email.com"
            className={`${INPUT} ${attempted && !emailOk ? "border-error/60" : "border-slate-200"}`}
          />
          {attempted && !emailOk && <p className="mt-1.5 text-[12px] text-error">Enter a valid email address.</p>}
        </div>

        <div>
          <label htmlFor="webinar-phone" className="mb-1.5 block text-[13px] font-semibold text-slate-600">
            Phone number
          </label>
          <input
            id="webinar-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 123 4567"
            className={`${INPUT} ${attempted && !phoneOk ? "border-error/60" : "border-slate-200"}`}
          />
          {attempted && !phoneOk && <p className="mt-1.5 text-[12px] text-error">Enter a valid phone number.</p>}
        </div>

        <button
          type="submit"
          disabled={sending}
          className="mt-2 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright px-8 py-4 font-display text-[14.5px] font-extrabold uppercase tracking-wide text-[#04101f] shadow-[0_0_30px_rgba(255,193,56,0.35),0_10px_25px_-8px_rgba(255,193,56,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? "Saving your seat..." : "Save My Free Seat"}
        </button>
        {error && <p className="text-center text-[13px] text-error">{error}</p>}
        <p className="text-center text-[12.5px] text-slate-500">
          🎁 Registrants get the A.C.E. Blueprint sent straight to their inbox
        </p>
      </div>
    </form>
  );
}
