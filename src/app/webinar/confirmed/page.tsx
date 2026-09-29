import type { Metadata } from "next";
import Footer from "@/components/Footer";
import VideoSlot from "@/components/booking/VideoSlot";
import CopyLinkCard from "@/components/webinar/CopyLinkCard";
import MoreFromSpeaker from "@/components/webinar/MoreFromSpeaker";
import ObjectionVideos from "@/components/webinar/ObjectionVideos";
import WebinarLogo from "@/components/webinar/WebinarLogo";
import SenderGraphic from "@/components/webinar/SenderGraphic";
import { SENDER_EMAIL, SPEAKER_NAME } from "@/data/webinar";

export const metadata: Metadata = {
  title: "You're Registered | For The Culture FX",
  description: "Your free seat is reserved. Follow these steps to confirm your ticket.",
};

const PROGRESS = [
  { label: "Register", state: "done" },
  { label: "Confirm", state: "active" },
  { label: "Show Up", state: "todo" },
] as const;

function formatName(raw: string | undefined) {
  const trimmed = raw?.trim();
  if (!trimmed) return "";
  return trimmed
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function WebinarConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name: rawName } = await searchParams;
  const name = formatName(rawName);

  return (
    <>
      <div className="border-b border-brand-blue/40 bg-gradient-to-r from-brand-blue/25 via-bg-secondary to-brand-blue/25 px-4 py-3 text-center">
        <p className="text-[12px] font-bold uppercase leading-snug tracking-wide sm:text-[13px]">
          <span className="text-gold-bright">Important:</span>{" "}
          <span className="text-gold-bright">Do not close this window or click the back button.</span>{" "}
          <span className="text-text-primary">Follow the instructions below to confirm your free ticket.</span>
        </p>
      </div>

      <main>
        <div className="px-6 pt-8">
          <WebinarLogo />
        </div>

        {/* Progress */}
        <section className="px-6 pt-8">
          <ol className="mx-auto flex max-w-[560px] items-center justify-center gap-2 sm:gap-4">
            {PROGRESS.map((step, i) => (
              <li key={step.label} className="flex items-center gap-2 sm:gap-4">
                <span className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rounded-full border-2 ${
                      step.state === "active"
                        ? "border-gold bg-gold shadow-[0_0_10px_rgba(255,193,56,0.7)]"
                        : step.state === "done"
                          ? "border-brand-blue bg-brand-blue"
                          : "border-border bg-transparent"
                    }`}
                  />
                  <span
                    className={`font-display text-[11px] font-bold uppercase tracking-wide sm:text-[12px] ${
                      step.state === "active" ? "text-gold-bright" : "text-text-muted"
                    }`}
                  >
                    Step {i + 1} · {step.label}
                  </span>
                </span>
                {i < PROGRESS.length - 1 && <span className="h-px w-5 bg-border sm:w-10" />}
              </li>
            ))}
          </ol>
        </section>

        {/* Hero */}
        <section className="px-6 pb-8 pt-10 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-blue/40 bg-brand-blue/10 px-4.5 py-2 font-display text-[11px] font-bold uppercase tracking-[.14em] text-brand-blue-bright">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <path d="m5 12 5 5L20 7" />
            </svg>
            You&rsquo;re Registered
          </span>
          <h1 className="mx-auto mb-4 max-w-[760px] text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.8rem]">
            Thank You For <span className="grad-text">Signing Up{name ? `, ${name}` : ""}!</span>
          </h1>
          <p className="mx-auto max-w-[600px] text-[15px] leading-relaxed text-text-secondary sm:text-[17px]">
            Your seat isn&rsquo;t fully locked in until you finish the two steps below. Watch the video first, then
            save your link and check your inbox so you don&rsquo;t miss the A.C.E. masterclass.
          </p>
        </section>

        {/* VSL */}
        <section className="px-6 pb-10">
          <div className="mx-auto mb-4 max-w-[700px] rounded-full bg-gradient-to-r from-brand-blue to-brand-blue-bright px-5 py-2.5 text-center font-display text-[12px] font-bold uppercase tracking-wide text-white">
            ▶ Play the video to turn the sound on
          </div>
          {/* TODO: replace VideoSlot with the real confirmation VSL embed (Wistia / Vidalytics). */}
          <VideoSlot size="hero" label="VSL Placeholder · Video coming soon" />
          <div className="mx-auto mt-6 max-w-[700px] rounded-2xl border border-warning/40 bg-warning/10 px-5 py-4 text-center text-[14px] leading-relaxed text-text-secondary">
            <strong className="mr-1 font-display uppercase tracking-wide text-warning">Do this first:</strong>
            Please watch this important video in full right now. Your next steps will appear in your email inbox at
            the end of your video.
          </div>
        </section>

        {/* Step 1 */}
        <section className="px-6 py-6">
          <CopyLinkCard />
        </section>

        {/* Step 2 */}
        <section className="px-6 py-6">
          <div className="mx-auto max-w-[720px] rounded-[28px] border-2 border-dashed border-gold/60 bg-surface/70 px-6 py-9 text-center sm:px-10">
            <span className="mb-4 inline-flex rounded-full bg-gradient-to-br from-gold to-gold-bright px-4.5 py-2 font-display text-[11px] font-extrabold uppercase tracking-[.16em] text-[#04101f]">
              Step #2
            </span>
            <h2 className="grad-text mb-5 text-[1.7rem] font-extrabold leading-tight sm:text-[2.1rem]">
              Check Your Email Inbox
            </h2>
            <p className="mb-2 text-[15px] text-text-secondary">
              You&rsquo;ll receive an email from <strong className="text-gold-bright">{SPEAKER_NAME}</strong>
            </p>
            <p className="text-[15px] text-text-secondary">
              from the address{" "}
              <code className="break-all rounded-md bg-brand-blue/15 px-2 py-1 font-mono text-[13.5px] text-brand-blue-pale">
                {SENDER_EMAIL}
              </code>
            </p>
            <SenderGraphic />
          </div>
        </section>

        {/* Objection videos */}
        <section className="px-6 py-14">
          <div className="mx-auto mb-9 max-w-[640px] text-center">
            <h2 className="mb-3 text-[1.5rem] font-extrabold leading-tight sm:text-[1.9rem]">
              Got Questions? <span className="grad-text">Watch These While You Wait</span>
            </h2>
            <p className="text-[14.5px] leading-relaxed text-text-secondary">
              The 10 things traders ask us most before they commit. Tap any card to watch.
            </p>
          </div>
          <ObjectionVideos />
        </section>

        <section className="px-6 pb-20">
          <MoreFromSpeaker />
        </section>
      </main>
      <Footer />
    </>
  );
}
