"use client";

import { useRef, useState } from "react";
import { WEBINAR_DATE_LABEL, WEBINAR_TIME_LABEL, ZOOM_LINK } from "@/data/webinar";
import WebinarCountdown from "./WebinarCountdown";

async function copyText(text: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to legacy path
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function CopyLinkCard() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function onCopy() {
    const ok = await copyText(ZOOM_LINK);
    if (!ok) return;
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mx-auto max-w-[720px] rounded-[28px] border-2 border-dashed border-gold/60 bg-surface/70 px-6 py-9 text-center sm:px-10">
      <span className="mb-4 inline-flex rounded-full bg-gradient-to-br from-gold to-gold-bright px-4.5 py-2 font-display text-[11px] font-extrabold uppercase tracking-[.16em] text-[#04101f]">
        Step #1
      </span>
      <h2 className="grad-text mb-4 text-[1.7rem] font-extrabold leading-tight sm:text-[2.1rem]">Save These Details</h2>
      <p className="mb-4 font-display text-[13px] font-bold uppercase tracking-wide text-text-secondary">
        <span className="border-b-2 border-gold pb-0.5">Your Private Event Link:</span>
      </p>

      <div className="mx-auto mb-4 max-w-[520px] break-all rounded-2xl bg-white px-4 py-3.5 font-mono text-[13px] text-slate-800 sm:text-[14px]">
        {ZOOM_LINK}
      </div>

      <button
        type="button"
        onClick={onCopy}
        className="mb-5 inline-flex min-h-13 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright px-8 py-3.5 font-display text-[14px] font-extrabold uppercase tracking-wide text-[#04101f] shadow-[0_0_30px_rgba(255,193,56,0.35),0_10px_25px_-8px_rgba(255,193,56,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
      >
        {copied ? "Copied!" : "Copy Private Event Link"}
      </button>

      <p className="mb-8 text-[14.5px] text-text-secondary">
        Click it now &amp; bookmark it for{" "}
        <strong className="text-gold-bright">
          {WEBINAR_DATE_LABEL} at {WEBINAR_TIME_LABEL}
        </strong>
      </p>

      <WebinarCountdown />
    </div>
  );
}
