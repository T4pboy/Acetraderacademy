import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import GoldButton from "@/components/webinar/GoldButton";
import GroupPopup from "@/components/webinar/GroupPopup";
import SlotVideo from "@/components/webinar/SlotVideo";
import WebinarCountdown from "@/components/webinar/WebinarCountdown";
import WebinarLogo from "@/components/webinar/WebinarLogo";
import WebinarProof from "@/components/webinar/WebinarProof";
import {
  FUNDED_VIDEO_ID,
  GROUP_LINK,
  RISK_DISCLAIMER,
  SPEAKER_NAME,
  WEBINAR_DATE_LABEL,
  WEBINAR_TIME_LABEL,
  WELCOME_VIDEO_ID,
} from "@/data/webinar";
import { googleCalendarUrl } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "You're In | For The Culture FX",
  description: "Your free seat is saved. Complete the 3 quick steps below.",
  robots: { index: false },
};

function formatName(raw: string | undefined) {
  const first = raw?.trim().split(/\s+/)[0];
  if (!first) return "";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function StepCard({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-[720px] rounded-[28px] border-2 border-dashed border-gold/60 bg-surface/70 px-6 py-9 text-center sm:px-10">
        <span className="mb-4 inline-flex rounded-full bg-gradient-to-br from-gold to-gold-bright px-4.5 py-2 font-display text-[11px] font-extrabold uppercase tracking-[.16em] text-[#04101f]">
          Step {n}
        </span>
        <h2 className="grad-text mb-6 text-[1.7rem] font-extrabold leading-tight sm:text-[2.1rem]">{title}</h2>
        {children}
      </div>
    </section>
  );
}

const CAL_BUTTON =
  "inline-flex min-h-13 items-center justify-center rounded-full border border-gold/60 bg-surface-elevated px-6 py-3 font-display text-[13px] font-extrabold uppercase tracking-wide text-gold-bright transition-all hover:-translate-y-0.5 hover:border-gold";

export default async function WebinarConfirmedPage({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name: rawName } = await searchParams;
  const name = formatName(rawName);

  return (
    <>
      <main>
        <div className="border-b border-brand-blue/40 bg-gradient-to-r from-brand-blue/25 via-bg-secondary to-brand-blue/25 px-4 py-3 text-center">
          <p className="text-[12px] font-bold uppercase leading-snug tracking-wide text-gold-bright sm:text-[13px]">
            Save the date &middot; {WEBINAR_DATE_LABEL} &middot; {WEBINAR_TIME_LABEL} EST &middot; Live on Zoom
          </p>
        </div>

        <div className="px-6 pt-8">
          <WebinarLogo />
        </div>

        <section className="px-6 pb-4 pt-10 text-center">
          <h1 className="mx-auto mb-4 max-w-[760px] text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.8rem]">
            You&rsquo;re <span className="grad-text">in{name ? `, ${name}` : ""}!</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-[15px] leading-relaxed text-text-secondary sm:text-[17px]">
            Complete the 3 quick steps below. Takes 2 minutes.
          </p>
        </section>

        <StepCard n={1} title="Watch this first">
          <SlotVideo id={WELCOME_VIDEO_ID} label="Welcome video from Kyrien coming soon" autoplay />
          <div className="mt-8">
            <WebinarCountdown />
          </div>
          <p className="mt-6 text-[14.5px] text-text-secondary">
            Your private link is on its way to your inbox. We&rsquo;ll also text it to you.
          </p>
        </StepCard>

        <StepCard n={2} title="Add it to your calendar">
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href="/webinar/calendar" className={CAL_BUTTON}>
              Apple Calendar
            </a>
            <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className={CAL_BUTTON}>
              Google Calendar
            </a>
            <a href="/webinar/calendar" className={CAL_BUTTON}>
              Outlook
            </a>
          </div>
        </StepCard>

        <StepCard n={3} title="Join the group">
          <p className="mb-6 text-[15px] text-text-secondary">Reminders, your link, and a few charts before Sunday.</p>
          {GROUP_LINK ? (
            <GoldButton href={GROUP_LINK} external>
              Join the group
            </GoldButton>
          ) : (
            <p className="text-[12px] font-bold uppercase tracking-wide text-gold-bright">[DISCORD OR WHATSAPP LINK]</p>
          )}
        </StepCard>

        {/* Front Row Pass */}
        <section className="px-6 py-6">
          <div className="mx-auto max-w-[520px]">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold to-gold-bright p-6 text-[#04101f] shadow-[0_0_40px_rgba(255,193,56,0.3)]">
              <span aria-hidden className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-bg-primary" />
              <span aria-hidden className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-bg-primary" />
              <p className="font-display text-[11px] font-extrabold uppercase tracking-[.2em] opacity-70">Front Row Pass</p>
              <p className="mt-2 font-display text-[1.25rem] font-extrabold leading-tight">A.C.E. Live Masterclass</p>
              <div className="mt-4 border-t border-dashed border-[#04101f]/40 pt-4 text-[14px] font-semibold leading-relaxed">
                <p>
                  {WEBINAR_DATE_LABEL} &middot; {WEBINAR_TIME_LABEL} EST
                </p>
                <p>Seat: Front Row</p>
              </div>
            </div>
            <p className="mt-4 text-center text-[14px] text-text-secondary">
              To claim it, reply <strong className="text-gold-bright">I&rsquo;M IN</strong> to my email.
            </p>
          </div>
        </section>

        <section className="px-6 py-8">
          <h2 className="mb-6 text-center text-[1.4rem] font-extrabold leading-tight text-balance sm:text-[1.8rem]">
            Why traders lose funded accounts right after passing
          </h2>
          <SlotVideo id={FUNDED_VIDEO_ID} label="Video coming soon" />
        </section>

        <section className="px-6 py-8">
          <div className="mx-auto flex max-w-[620px] flex-col items-center gap-5 text-center">
            <h2 className="text-[1.4rem] font-extrabold sm:text-[1.8rem]">
              Who you&rsquo;re <span className="grad-text">learning from</span>
            </h2>
            <Image
              src="/kyrien.jpg"
              alt={SPEAKER_NAME}
              width={640}
              height={640}
              className="aspect-square w-full max-w-[200px] rounded-full border-2 border-gold/60 object-cover shadow-[var(--shadow-glow-md)]"
            />
            <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-text-secondary">
              <p>
                {SPEAKER_NAME} dropped out of college and started trading in 2020. He blew accounts, switched
                strategies, and took his first payout in January 2022.
              </p>
              <p>He scaled past $1M in funding, rebuilt to $1M+ in about three months after his prop firm shut down.</p>
              <p>He now teaches the three checks behind it at For The Culture FX.</p>
              <p className="font-semibold text-white">See you on Sunday. Bring your charts and your questions.</p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 pt-6">
          <WebinarProof showCta={false} />
        </section>
      </main>
      <Footer disclaimer={RISK_DISCLAIMER} />
      <GroupPopup />
    </>
  );
}
