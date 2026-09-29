"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { isPlaceholderId, OBJECTION_VIDEOS } from "@/data/webinar";

function embedUrl(id: string) {
  return `https://fast.wistia.net/embed/iframe/${id}?autoPlay=true&seo=false&videoFoam=true`;
}

export default function ObjectionVideos() {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  function open(index: number) {
    const video = OBJECTION_VIDEOS[index];
    if (isPlaceholderId(video.id)) {
      console.warn(`Objection video #${index + 1} still has a placeholder ID (${video.id}).`);
      window.alert("This video is coming soon.");
      return;
    }
    setActive(index);
  }

  const current = active === null ? null : OBJECTION_VIDEOS[active];

  return (
    <>
      <div className="mx-auto flex max-w-[760px] flex-col gap-4">
        {OBJECTION_VIDEOS.map((video, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onClick={() => open(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(i);
                }
              }}
              className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-border bg-surface p-3 transition-colors hover:border-brand-blue/50 hover:bg-surface-elevated sm:gap-5 sm:p-4"
            >
              <div className="relative aspect-video w-[120px] shrink-0 overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_50%_40%,rgba(59,130,246,0.25),transparent_70%),linear-gradient(160deg,#0c1730,#050a16_70%)] sm:w-[160px]">
                <span className="absolute left-1.5 top-1.5 rounded-md bg-bg-primary/80 px-1.5 py-0.5 font-display text-[10.5px] font-bold text-gold-bright">
                  {num}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-transform group-hover:scale-110">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-4 w-4 text-white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="min-w-0">
                <h3 className="mb-1 font-display text-[15px] font-bold leading-snug text-white sm:text-[17px]">
                  {video.title}
                </h3>
                {video.summary && <p className="mb-1 text-[13px] leading-snug text-text-secondary">{video.summary}</p>}
                <p className="text-[12px] text-text-muted">Video #{i + 1}</p>
              </div>
            </div>
          );
        })}
      </div>

      {mounted &&
        current &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            style={{ zIndex: 2147483500 }}
            className="fixed inset-0 flex items-center justify-center p-4 sm:p-8"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setActive(null)}
              aria-hidden="true"
            />
            <div className="relative w-full max-w-[960px]">
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close video"
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl leading-none text-white transition-colors hover:bg-white/20"
              >
                &times;
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-[var(--shadow-glow-lg)]">
                {/* Rendered only while open, so closing unmounts the iframe and stops playback. */}
                <iframe
                  key={current.id}
                  src={embedUrl(current.id)}
                  title={current.title}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
