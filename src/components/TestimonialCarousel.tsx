"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";

type Props = {
  items: Testimonial[];
  onOpen: (index: number) => void;
};

const AUTOPLAY_MS = 2500;
const RESUME_AFTER_MS = 6000;

export default function TestimonialCarousel({ items, onOpen }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const pausedRef = useRef(false);
  const dragState = useRef({ startX: 0, startScroll: 0, isDown: false });
  const reduceMotionRef = useRef(false);
  const count = items.length;
  // Render the set twice back-to-back so there's always more track ahead to
  // scroll into — autoplay (and dragging) just keeps moving forward, and once
  // we've scrolled a full set's width we silently snap back by that same
  // width (instant, no animation) into the identical-looking first copy.
  // That's what makes it loop continuously instead of stopping dead at the
  // last card or doing an obvious backwards jump-cut to the start.
  const loopItems = [...items, ...items];

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const cardStep = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const firstCard = track.querySelector<HTMLElement>("[data-card]");
    if (!firstCard) return 0;
    return firstCard.offsetWidth + 20; // gap-5
  };

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * cardStep(), behavior: reduceMotionRef.current ? "auto" : "smooth" });
  };

  const markInteracted = () => {
    pausedRef.current = true;
    window.setTimeout(() => {
      pausedRef.current = false;
    }, RESUME_AFTER_MS);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      window.requestAnimationFrame(() => {
        const step = cardStep();
        if (!step) return;
        const setWidth = step * count;
        // once we've drifted a full set into the duplicated copy, snap back
        // by one set width — same visual position, no animation, no jump.
        if (track.scrollLeft >= setWidth - 1) {
          track.scrollLeft -= setWidth;
        }
        setActiveIndex(((Math.round(track.scrollLeft / step) % count) + count) % count);
      });
    };
    track.addEventListener("scroll", onScroll);
    return () => track.removeEventListener("scroll", onScroll);
    // `items` is a static, module-level array in this app — its length never
    // legitimately changes during the component's lifetime, so it's read via
    // closure rather than listed here. That keeps this effect's dependency
    // array a constant `[]` across every render, avoiding a class of
    // Fast-Refresh dev-mode false positives ("changed size") that a
    // sometimes-`[]`-sometimes-`[count]` array can trigger on hot reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reduceMotionRef.current) return;
    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      const track = trackRef.current;
      if (!track) return;
      const step = cardStep();
      if (!step) return;
      track.scrollBy({ left: step, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { startX: e.clientX, startScroll: track.scrollLeft, isDown: true };
    setDragging(true);
    markInteracted();
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDown || !trackRef.current) return;
    trackRef.current.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
  };
  const endDrag = () => {
    dragState.current.isDown = false;
    setDragging(false);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={`no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-5 pt-2 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={() => {
          endDrag();
          window.setTimeout(() => {
            pausedRef.current = false;
          }, 1200);
        }}
        onPointerEnter={() => {
          pausedRef.current = true;
        }}
        onTouchStart={markInteracted}
      >
        {loopItems.map((t, i) => (
          <button
            key={`${t.id}-${i < count ? "a" : "b"}`}
            data-card
            type="button"
            aria-label={`View larger: ${t.name} — ${t.caption}`}
            aria-hidden={i >= count}
            tabIndex={i >= count ? -1 : 0}
            onClick={() => onOpen(i % count)}
            className="group w-[240px] flex-none snap-start rounded-2xl border border-border bg-surface text-left transition-all duration-200 hover:-translate-y-1 hover:border-brand-blue/35 hover:shadow-[0_0_15px_rgba(59,130,246,0.22)] sm:w-[280px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden border-b border-border bg-gradient-to-br from-surface-elevated to-[#060a16]">
              {t.imageSrc ? (
                <Image
                  src={t.imageSrc}
                  alt={t.caption}
                  fill
                  sizes="(max-width: 640px) 240px, 280px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-text-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 text-gold-bright">
                    <rect x="3" y="4" width="18" height="14" rx="2" />
                    <path d="m3 15 5-5 4 4 5-6 4 5" />
                  </svg>
                  <span className="font-display text-[10.5px] uppercase tracking-[.08em]">[ Result Screenshot ]</span>
                </div>
              )}
            </div>
            <div className="px-5 pb-[22px] pt-[18px]">
              <p className="mb-3.5 text-[.88rem] leading-relaxed text-text-secondary">{t.caption}</p>
              <div className="font-display text-[.82rem] font-bold text-text-primary">&mdash; {t.name}</div>
              <span className="mt-2 inline-block rounded-full border border-gold/40 bg-gold/10 px-2.5 py-[3px] font-display text-[10.5px] font-bold tracking-wide text-gold-bright">
                {t.metric}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-5">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => {
            markInteracted();
            scrollToIndex((activeIndex - 1 + count) % count);
          }}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-gold/40 hover:text-gold-bright hover:shadow-[0_0_15px_rgba(255,193,56,0.25)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[17px] w-[17px]">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                markInteracted();
                scrollToIndex(i);
              }}
              className={`h-[7px] w-[7px] rounded-full transition-all duration-200 ${i === activeIndex ? "scale-125 bg-gold-bright" : "bg-border"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => {
            markInteracted();
            scrollToIndex((activeIndex + 1) % count);
          }}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-colors duration-200 hover:border-gold/40 hover:text-gold-bright hover:shadow-[0_0_15px_rgba(255,193,56,0.25)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[17px] w-[17px]">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
