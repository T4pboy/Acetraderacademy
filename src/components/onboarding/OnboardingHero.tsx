import { CheckIcon } from "./icons";

/**
 * Top of the onboarding page — shown right after someone joins the Academy.
 * No nav Header here (same call as booking-confirmed): this is a private
 * "you're in" screen, not a marketing page a first-time visitor lands on.
 */
export default function OnboardingHero() {
  return (
    <section className="px-6 pb-8 pt-16 sm:pt-20">
      <div className="mx-auto max-w-[620px] text-center">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 font-display text-[11px] font-bold uppercase tracking-[.16em] text-gold-bright">
          <CheckIcon className="h-3 w-3" />
          You&rsquo;re In
        </span>

        <h1 className="mb-4 text-[1.9rem] font-extrabold leading-[1.15] tracking-tight text-balance sm:text-[2.3rem] md:text-[2.6rem]">
          Welcome To <span className="grad-text">A.C.E Trader Academy</span>
        </h1>

        <p className="mx-auto max-w-[500px] text-[14px] leading-relaxed text-text-secondary sm:text-[15.5px]">
          You&rsquo;re officially in. Five quick steps below — knock them out
          in the next 10 minutes and you&rsquo;re set up for your first week.
          The path to $1M funded starts here.
        </p>
      </div>
    </section>
  );
}
