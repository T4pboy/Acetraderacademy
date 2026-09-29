import type { Metadata } from "next";
import VidalyticsPlayer from "@/components/VidalyticsPlayer";
import Footer from "@/components/Footer";
import Image from "next/image";
import { RegisterButton, RegisterProvider } from "@/components/webinar/RegisterModal";
import WebinarProof from "@/components/webinar/WebinarProof";
import WebinarLogo from "@/components/webinar/WebinarLogo";
import WebinarCountdown from "@/components/webinar/WebinarCountdown";
import { SPEAKER_NAME, WEBINAR_SHORT_LABEL } from "@/data/webinar";

export const metadata: Metadata = {
  title: "Free Live Masterclass | For The Culture FX",
  description:
    "Learn the exact 3-step A.C.E. method stuck traders are using to scale to six figure funding. Free live masterclass for VIP members.",
};

const TAKEAWAYS = [
  "Why switching strategies keeps you stuck, and the real reason you keep giving back gains.",
  `The 3 checks every trade must pass before ${SPEAKER_NAME} takes it, including when NOT to trade.`,
  "How he rebuilt to $1M+ in funding in ~3 months, after his prop firm collapsed.",
  "Why traders lose funded accounts right after passing, and the one rule that stops it.",
  "Live-only bonus: stay to the end for indicator access and a shot at 2 free accounts.",
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
            <span className="mb-4 block font-display text-[13px] font-bold uppercase tracking-[.16em] text-gold-bright">
              Free Live Masterclass
            </span>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4.5 py-2 font-display text-[11px] font-bold uppercase tracking-[.14em] text-gold-bright">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-live-dot absolute inline-flex h-full w-full rounded-full bg-gold" />
              </span>
              Live Masterclass · {WEBINAR_SHORT_LABEL}
            </span>
            <p className="mb-5 text-[13px] font-semibold uppercase tracking-wide text-slate-300">
              For VIP members only · 100% free
            </p>

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
      </main>
      <Footer />
    </RegisterProvider>
  );
}
