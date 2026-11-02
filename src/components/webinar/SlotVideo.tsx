import WistiaVideo from "@/components/WistiaVideo";
import { isPlaceholderValue } from "@/data/webinar";

/** Wistia video when the ID is real, otherwise a labelled placeholder frame. */
export default function SlotVideo({ id, label, aspect = 16 / 9, autoplay }: { id: string; label: string; aspect?: number; autoplay?: boolean }) {
  if (!isPlaceholderValue(id)) return <WistiaVideo mediaId={id} aspect={aspect} autoplay={autoplay} />;
  return (
    <div
      className="mx-auto flex max-w-[700px] items-center justify-center rounded-2xl border border-dashed border-gold/50 bg-[linear-gradient(160deg,#0c1730,#050a16_70%)] p-6 text-center"
      style={{ aspectRatio: aspect }}
    >
      <span className="font-display text-[12px] font-bold uppercase tracking-[.1em] text-text-secondary">{label}</span>
    </div>
  );
}
