"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** The `id` of the embed container div inside the target HTML file. */
  embedId: string;
  /** Path to the static HTML file (under public/) holding the vendor snippet. */
  htmlSrc: string;
  /** Label shown on the fallback poster while the real player loads. */
  posterLabel?: string;
};

/**
 * Generic Vidalytics embed, extracted out of VSLPlayer so any number of
 * distinct Vidalytics videos (main VSL, a testimonial, etc.) can reuse the
 * same fix without re-deriving it.
 *
 * The vendor snippet is a plain "vanilla script tag" widget — it's written
 * to run once during normal HTML parsing, and isn't safe to inject via a
 * React effect: when it's added directly into the React tree, Vidalytics'
 * own loader gets stuck on its branded "loading" placeholder and never
 * actually mounts the player (reproduced with a minimal React component,
 * independent of anything else in this codebase — not a bug in our wrapper
 * logic, a limitation in how that script expects to run).
 *
 * The fix: run the vendor snippet in its own, completely React-free
 * document (a static file under public/), and mount that via a same-origin
 * iframe. That matches the environment the script actually works in, and
 * because the iframe is same-origin we can still poll its contentDocument
 * to know when the real player has mounted, so the styled fallback poster
 * below can hide itself.
 */
export default function VidalyticsPlayer({ embedId, htmlSrc, posterLabel = "Watch Video" }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playerMounted, setPlayerMounted] = useState(false);

  useEffect(() => {
    setPlayerMounted(false);
    let attempts = 0;
    const interval = setInterval(() => {
      const doc = iframeRef.current?.contentDocument;
      const el = doc?.getElementById(embedId);
      if (el && el.children.length > 0) {
        setPlayerMounted(true);
        clearInterval(interval);
        return;
      }
      attempts += 1;
      if (attempts > 60) clearInterval(interval);
    }, 250);

    return () => clearInterval(interval);
  }, [embedId, htmlSrc]);

  return (
    <div className="mx-auto max-w-[700px]">
      <div className="rounded-4xl border border-brand-blue/35 bg-gradient-to-b from-surface-elevated to-[#050a16] p-2.5 [box-shadow:var(--shadow-glow-lg),0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-4xl)-6px)] bg-[#04070f]">
          {!playerMounted && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_500px_300px_at_50%_40%,rgba(59,130,246,0.18),transparent_70%),linear-gradient(160deg,#0c1730,#050a16_70%)]">
              <div
                aria-hidden="true"
                className="group flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--color-gold-bright),var(--color-gold)_70%)] shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_30px_rgba(255,193,56,0.35),0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform duration-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-[26px] w-[26px] text-[#04101f]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="font-display text-[13px] font-bold uppercase tracking-[.1em] text-text-secondary">
                {posterLabel}
              </span>
            </div>
          )}
          <div style={{ width: "100%", position: "relative", paddingTop: "56.25%" }}>
            <iframe
              ref={iframeRef}
              src={htmlSrc}
              title={posterLabel}
              scrolling="no"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
