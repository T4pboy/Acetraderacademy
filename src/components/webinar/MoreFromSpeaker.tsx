import { isPlaceholderId, SPEAKER_NAME, YOUTUBE_IDS } from "@/data/webinar";

export default function MoreFromSpeaker() {
  return (
    <div className="mx-auto max-w-[960px] rounded-[28px] border border-brand-blue/35 bg-gradient-to-b from-surface-elevated to-surface px-5 py-10 shadow-[var(--shadow-glow-md)] sm:px-10">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-[1.5rem] font-extrabold leading-tight sm:text-[1.9rem]">
          More From <span className="grad-text">{SPEAKER_NAME}</span>
        </h2>
        <p className="mx-auto max-w-[520px] text-[14.5px] leading-relaxed text-text-secondary">
          While you wait for the live session, these are the videos my students tell me changed how they trade. Start
          with whichever one hits closest to home.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {YOUTUBE_IDS.map((id, i) => (
          <div key={i} className="aspect-video overflow-hidden rounded-2xl border border-border bg-black">
            {isPlaceholderId(id) ? (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,#0c1730,#050a16_70%)] text-center">
                <span className="font-display text-[11px] font-bold uppercase tracking-[.1em] text-text-secondary">
                  Video coming soon
                </span>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={`${SPEAKER_NAME} video ${i + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
