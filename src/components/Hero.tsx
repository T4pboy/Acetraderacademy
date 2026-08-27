import Link from "next/link";
import VSLPlayer from "./VSLPlayer";

export default function Hero() {
  return (
    <section id="top" className="px-6 pb-3 pt-4 sm:pt-5">
      <div className="mx-auto max-w-[1080px] text-center">
        <span className="mb-2 block font-display text-[15px] font-bold uppercase tracking-[.16em] text-gold-bright">
          The A.C.E. Method
        </span>

        <h1 className="mx-auto mb-2.5 max-w-[780px] text-[1.5rem] font-extrabold leading-[1.18] tracking-tight text-balance sm:text-[1.55rem] md:text-[1.8rem] lg:text-[2.05rem]">
          How struggling traders are getting their first{" "}
          <span className="grad-text">Prop Firm payout</span> in{" "}
          <span className="grad-text">under 90 days</span>, without blowing
          another account or revenge trading again.
        </h1>

        <p className="mx-auto mb-4 max-w-[540px] text-[13.5px] leading-relaxed text-text-secondary sm:text-[15px]">
          Even if you&rsquo;ve failed countless evals before, work a full-time
          job, or don&rsquo;t think you&rsquo;re disciplined enough.
        </p>

        <VSLPlayer />

        <Link
          href="#apply"
          className="group mt-4 inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-7 py-3 font-display text-[15.5px] font-bold uppercase tracking-wide text-[#04101f] shadow-[0_0_20px_rgba(255,193,56,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,212,116,0.55)]"
        >
          Start Application
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
