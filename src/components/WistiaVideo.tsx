"use client";

import Script from "next/script";

type Props = {
  mediaId: string;
  /** width / height, e.g. 16/9. Defaults to 16:9. */
  aspect?: number;
};

/**
 * Wistia's modern embed is a custom element (`<wistia-player>`) that
 * upgrades itself once its per-video script defines it — unlike Vidalytics'
 * old-style loader (see VidalyticsPlayer.tsx), this is safe to drop directly
 * into the React tree. Next's <Script> dedupes by exact `src`, so the
 * shared player.js loader only ever loads once even with multiple
 * WistiaVideo instances on a page; each video's own embed/{id}.js is
 * distinct per mediaId and loads once per id.
 *
 * The blurred poster while the element is `:not(:defined)` is Wistia's own
 * recommended CSS, scoped to this mediaId so multiple instances don't clash.
 */
export default function WistiaVideo({ mediaId, aspect = 16 / 9 }: Props) {
  const paddingTop = `${(1 / aspect) * 100}%`;

  return (
    <div className="mx-auto max-w-[700px]">
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script src={`https://fast.wistia.com/embed/${mediaId}.js`} strategy="afterInteractive" type="module" />
      <style
        dangerouslySetInnerHTML={{
          __html: `wistia-player[media-id='${mediaId}']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch'); display: block; filter: blur(5px); padding-top: ${paddingTop}; }`,
        }}
      />
      <div className="rounded-4xl border border-brand-blue/35 bg-gradient-to-b from-surface-elevated to-[#050a16] p-2.5 [box-shadow:var(--shadow-glow-lg),0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="overflow-hidden rounded-[calc(var(--radius-4xl)-6px)]">
          <wistia-player media-id={mediaId} aspect={aspect} />
        </div>
      </div>
    </div>
  );
}
