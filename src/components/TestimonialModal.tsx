"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";

type Props = {
  items: Testimonial[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (delta: 1 | -1) => void;
};

export default function TestimonialModal({ items, activeIndex, onClose, onNavigate }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen || activeIndex === null) return null;
  const testimonial = items[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Testimonial detail"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary/85 p-6 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[560px] overflow-hidden rounded-4xl border border-brand-blue/35 bg-surface-elevated shadow-[0_0_60px_rgba(59,130,246,0.4),0_0_140px_rgba(59,130,246,0.18),0_40px_90px_-30px_rgba(0,0,0,0.8)]">
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-primary/70 text-text-primary transition-colors duration-200 hover:border-gold/40 hover:text-gold-bright"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              aria-label="Previous"
              className="absolute left-3.5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-primary/60 text-text-primary transition-colors duration-200 hover:border-gold/40 hover:text-gold-bright"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              aria-label="Next"
              className="absolute right-3.5 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-bg-primary/60 text-text-primary transition-colors duration-200 hover:border-gold/40 hover:text-gold-bright"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <div className="relative aspect-[4/3] border-b border-border bg-gradient-to-br from-surface-elevated to-[#060a16]">
          {testimonial.imageSrc ? (
            <Image
              src={testimonial.imageSrc}
              alt={testimonial.caption}
              fill
              sizes="560px"
              className="object-contain"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2.5 text-text-muted">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-gold-bright">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="m3 15 5-5 4 4 5-6 4 5" />
              </svg>
              <span className="font-display text-xs uppercase tracking-[.08em]">[ Result Screenshot ]</span>
            </div>
          )}
        </div>
        <div className="px-7 pb-[30px] pt-[26px]">
          <p className="mb-3 leading-relaxed text-text-secondary">{testimonial.caption}</p>
          <div className="font-display text-sm font-bold">&mdash; {testimonial.name}</div>
          <span className="mt-3 inline-block rounded-full border border-gold/40 bg-gold/10 px-2.5 py-[3px] font-display text-[10.5px] font-bold tracking-wide text-gold-bright">
            {testimonial.metric}
          </span>
        </div>
      </div>
    </div>
  );
}
