import type { Metadata } from "next";
import VidalyticsPlayer from "@/components/VidalyticsPlayer";
import Footer from "@/components/Footer";
import Image from "next/image";
import { RegisterButton, RegisterProvider } from "@/components/webinar/RegisterModal";
import WebinarProof from "@/components/webinar/WebinarProof";
import WebinarLogo from "@/components/webinar/WebinarLogo";
import WebinarCountdown from "@/components/webinar/WebinarCountdown";
import {
  CLASS_LENGTH,
  RISK_DISCLAIMER,
  SEAT_CAP,
  SPEAKER_NAME,
  VISION_LINE,
  WEBINAR_DATE_LABEL,
  WEBINAR_TIME_LABEL,
} from "@/data/webinar";

export const metadata: Metadata = {
  title: "Free Live Masterclass | For The Culture FX",
  description:
    "Learn the exact 3-step A.C.E. method stuck traders are using to scale to six figure funding. Free live masterclass, open to everyone.",
};

const TAKEAWAYS = [
  "Why switching strategies keeps you stuck, and the real reason you keep giving back gains.",
  `The 3 checks every trade must pass before ${SPEAKER_NAME} takes it, including when NOT to trade.`,
  "How he rebuilt to $1M+ in funding in ~3 months, after his prop firm collapsed.",
  "Why traders lose funded accounts right after passing, and the one rule that stops it.",
  "Live-only bonus: stay to the end for indicator access and a shot at 2 free accounts.",
];

const RECAP = [
  "The 3 checks every trade must pass, including when not to trade",
  "The one rule that stops you losing a funded account after you pass",
  "Live Q&A on your own trading",
  `${CLASS_LENGTH} minutes, completely free`,
  "The A.C.E. Blueprint for everyone who registers",
  "Live-only bonus: indicator access and a shot at 2 free accounts",
];

export default function WebinarPage() {
  return (
    <RegisterProvider>
      <main>
        <section className="px-6 pb-10 pt-8 sm:pt-10">
          <div className="mx-auto max-w-[860px] text-center">
            <div className="mb-8">
              <WebinarLogo />
            </div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4.5 py-2 font-display text-[11px] font-bold uppercase tracking-[.14em] text-gold-bright">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-live-dot absolute inline-flex h-full w-full rounded-full bg-gold" />
              </span>
              Free live masterclass · {WEBINAR_DATE_LABEL} · {WEBINAR_TIME_LABEL} EST
            </span>

            <h1 className="mx-auto mb-5 max-w-[800px] text-[1.7rem] font-extrabold leading-[1.15] tracking-tight text-balance sm:text-[2.2rem] md:text-[2.6rem]">
              Learn The Exact <span className="grad-text">3-Step Method</span> Stuck Traders Are Using To Scale To{" "}
              <span className="grad-text">Six Figure Funding</span> In The Next 90 Days
            </h1>

            <p className="mx-auto mb-8 max-w-[640px] text-[15px] leading-relaxed text-white sm:text-[17px]">
              Stuck at the same level no matter what you try? You&rsquo;re missing the step between spotting a setup
              and taking it. It&rsquo;s called A.C.E.: Anticipate, Confirm, Execute. One live session and you leave
              with the 3-check filter behind $1M+ in funding, twice.
            </p>

            <div className="mb-9">
              <WebinarCountdown />
              <p className="mt-4 text-[13px] font-semibold text-slate-200">
                {SEAT_CAP} seats &middot; Live Q&amp;A &middot; 100% free
              </p>
            </div>

            <RegisterButton />
            <p className="mt-4 text-[12.5px] text-slate-300">
              🎁 Registrants get the A.C.E. Blueprint sent straight to their inbox
            </p>
            <Image
              src="/kyrien.jpg"
              alt={SPEAKER_NAME}
              width={640}
              height={640}
              className="mx-auto mt-10 aspect-square w-full max-w-[200px] rounded-full border-2 border-gold/60 object-cover shadow-[var(--shadow-glow-md)] sm:max-w-[240px]"
            />
            <p className="mx-auto mt-6 max-w-[560px] text-[1.05rem] font-bold leading-snug text-gold-bright sm:text-[1.2rem]">
              {VISION_LINE}
            </p>
          </div>
        </section>

        <section className="px-6 pb-10 pt-4">
          <div className="mx-auto max-w-[680px]">
            <h2 className="mb-6 text-center text-[1.4rem] font-extrabold leading-tight text-balance sm:text-[1.8rem]">
              I&rsquo;m not going to pretend I figured this out overnight...
            </h2>
            <div className="flex flex-col gap-5 text-[15px] leading-relaxed text-slate-200 sm:text-[16.5px]">
              <p>
                I was supposed to go to the NFL. Instead, I dropped out of college, picked up Rich Dad Poor Dad, and
                started trading in 2020. I blew accounts. I switched strategies more times than I can count. My first
                payout didn&rsquo;t come until January 2022.
              </p>
              <p>
                Then I scaled to over $1M in funding, and my prop firm shut down. I rebuilt to $1M+ in about three
                months, using the same three checks I&rsquo;ll show you on Sunday.
              </p>
              <p>
                That&rsquo;s A.C.E. Anticipate, Confirm, Execute. It&rsquo;s the resource I wish I&rsquo;d had, and
                it&rsquo;s why I built For The Culture FX.
              </p>
            </div>
            <div className="mt-8 text-center">
              <RegisterButton label="Yes, Save My Seat" />
            </div>
          </div>
        </section>

        <section className="px-6 pb-10 pt-10">
          <div className="mx-auto max-w-[720px]">
            <div className="mb-8 text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-warning/40 bg-warning/10 px-4.5 py-2 font-display text-[11px] font-bold uppercase tracking-[.16em] text-warning">
                Important! Read this!
              </span>
              <h2 className="text-[1.4rem] font-extrabold leading-tight text-balance sm:text-[1.8rem]">
                You don&rsquo;t need another strategy. You need the one thing funded traders do that nobody teaches.
              </h2>
              <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-relaxed text-slate-200">
                You&rsquo;ve watched the strategy videos. You&rsquo;ve tried the indicators. Maybe you even passed an
                evaluation, then gave it all back in a week. It&rsquo;s not that you don&rsquo;t care. Nobody showed
                you the step between spotting a setup and taking it. That&rsquo;s what Sunday is for.
              </p>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-9">
              <p className="mb-5 font-display text-[12px] font-bold uppercase tracking-[.14em] text-slate-900">
                What you&rsquo;ll walk away with on this free live masterclass
              </p>
              <ul className="flex flex-col gap-4">
                {TAKEAWAYS.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 h-[16px] w-[16px] shrink-0 text-[#c98a00]"
                    >
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9 text-center">
              <RegisterButton />
            </div>
          </div>
        </section>
        <section className="px-6 pb-20 pt-6">
          <VidalyticsPlayer
            embedId="vidalytics_embed_7oNd8cPku8XiZTUq"
            htmlSrc="/vic-testimonial-embed.html"
            posterLabel="Watch Vic's Testimonial"
          />
        <div className="mt-16">
            <WebinarProof />
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-[620px] rounded-[28px] border border-gold/40 bg-surface-elevated p-6 shadow-[var(--shadow-glow-md)] sm:p-9">
            <p className="mb-5 text-center font-display text-[12px] font-bold uppercase tracking-[.14em] text-gold-bright">
              Quick recap: what you get
            </p>
            <ul className="flex flex-col gap-3.5">
              {RECAP.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-1 h-[16px] w-[16px] shrink-0 text-gold"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <RegisterButton label="I'm Ready, Save My Free Seat" />
            </div>
          </div>
        </section>
      </main>
      <Footer disclaimer={RISK_DISCLAIMER} />
    </RegisterProvider>
  );
}
