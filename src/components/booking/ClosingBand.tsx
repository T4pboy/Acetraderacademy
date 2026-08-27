export default function ClosingBand() {
  return (
    <section className="px-6 pb-24">
      <div className="animate-ambient-glow mx-auto max-w-[620px] rounded-[28px] border border-brand-blue/35 bg-gradient-to-b from-surface-elevated via-surface to-[#060a16] px-7 py-10 text-center shadow-[var(--shadow-glow-lg),0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:px-10">
        <h2 className="mb-3 text-[1.5rem] font-extrabold leading-tight sm:text-[1.7rem]">
          That&rsquo;s It. <span className="grad-text">Now Keep Your Phone Close.</span>
        </h2>
        <p className="mx-auto mb-7 max-w-[440px] text-[13.5px] leading-relaxed text-text-secondary sm:text-[15px]">
          Your coach will call to walk you through it. While you wait,
          rewatch the videos above so you show up ready.
        </p>
        <div className="flex flex-wrap justify-center gap-6 border-t border-border pt-6">
          {["Call Confirmed", "No Card Required"].map((label) => (
            <span
              key={label}
              className="flex items-center gap-2 font-display text-[11.5px] font-semibold uppercase tracking-wide text-text-muted"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[15px] w-[15px] text-gold-bright"
              >
                <path d="m5 12 5 5L20 7" />
              </svg>
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
