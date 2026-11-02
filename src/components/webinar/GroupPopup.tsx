"use client";

import { useEffect, useState } from "react";
import { GROUP_LINK } from "@/data/webinar";

/** "Wait! Join the group chat" popup, 10 seconds after landing. Hidden until GROUP_LINK is set. */
export default function GroupPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GROUP_LINK) return;
    const id = setTimeout(() => setOpen(true), 10_000);
    return () => clearTimeout(id);
  }, []);

  if (!open) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Join the group chat" className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg-primary/70 backdrop-blur-md" onClick={() => setOpen(false)} aria-hidden="true" />
      <div className="relative w-full max-w-[420px] rounded-[28px] bg-white p-7 text-center shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <h2 className="mb-2 text-[1.4rem] font-extrabold text-slate-900">Wait! Join the group chat</h2>
        <p className="mb-6 text-[14.5px] leading-relaxed text-slate-600">
          Reminders, your link, and a few charts before Sunday.
        </p>
        <a
          href={GROUP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright px-8 py-3.5 font-display text-[14px] font-extrabold uppercase tracking-wide text-[#04101f]"
        >
          Join the group
        </a>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-4 text-[13px] text-slate-500 underline underline-offset-4"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
