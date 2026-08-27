import VidalyticsPlayer from "./VidalyticsPlayer";

const EMBED_ID = "vidalytics_embed__gqH2vfgV9j1MdMs";

/**
 * The main page's VSL. Thin wrapper around VidalyticsPlayer — see that
 * component for why this has to go through a same-origin iframe
 * (public/vsl-embed.html) rather than injecting the vendor script directly.
 */
export default function VSLPlayer() {
  return <VidalyticsPlayer embedId={EMBED_ID} htmlSrc="/vsl-embed.html" posterLabel="Watch Introduction" />;
}
