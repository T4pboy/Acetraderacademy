import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1120px]">
        <div className="animate-ambient-glow relative mx-auto max-w-[880px] rounded-[28px] border border-brand-blue/35 bg-[radial-gradient(ellipse_600px_300px_at_50%_0%,rgba(59,130,246,0.16),transparent_70%)] bg-gradient-to-b from-surface-elevated via-surface to-[#060a16] px-7 pb-14 pt-16 text-center shadow-[0_0_60px_rgba(59,130,246,0.4),0_0_140px_rgba(59,130,246,0.18),0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:px-14">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4.5 py-2 font-display text-[11px] font-bold uppercase tracking-[.16em] text-gold-bright">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[13px] w-[13px]">
              <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
            </svg>
            Last Opportunity
          </span>

          <h2 className="mb-[22px] text-[2.1rem] font-extrabold leading-[1.08] tracking-tight sm:text-[2.8rem] md:text-[3.4rem]">
            Still <span className="grad-text">Blowing Accounts?</span>
          </h2>

          <p className="mx-auto mb-10 max-w-[560px] text-base leading-relaxed text-text-secondary sm:text-lg">
            Stop guessing your entries. Stop trading on feel. Apply now and
            let&rsquo;s find out if the A.C.E. Method is the right fit for
            where you&rsquo;re stuck.
          </p>

          <Link
            href="#apply"
            className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-gold to-gold-bright px-9 py-[19px] font-display text-[14.5px] font-extrabold uppercase tracking-wide text-[#04101f] shadow-[0_0_30px_rgba(255,193,56,0.35),0_10px_25px_-8px_rgba(255,193,56,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_45px_rgba(255,212,116,0.55),0_14px_30px_-8px_rgba(255,212,116,0.8)] sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
              <path d="m5 12 5 5L20 7" />
            </svg>
            Apply For Your Discovery Call
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          <div className="mt-9 flex flex-wrap justify-center gap-7 border-t border-border pt-7">
            {["No Hype", "Real Strategy", "Direct Feedback"].map((label) => (
              <span key={label} className="flex items-center gap-2 font-display text-[11.5px] font-semibold uppercase tracking-wide text-text-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-[15px] w-[15px] text-gold-bright">
                  <path d="m5 12 5 5L20 7" />
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
