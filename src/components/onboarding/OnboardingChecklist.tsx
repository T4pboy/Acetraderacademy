"use client";

import { useEffect, useState } from "react";
import WistiaVideo from "@/components/WistiaVideo";
import TallyEmbed from "@/components/TallyEmbed";
import OnboardingStep from "./OnboardingStep";
import StepCtaButton from "./StepCtaButton";
import { CalendarIcon, DiscordIcon, LibraryIcon } from "./icons";

const STORAGE_KEY = "ace-onboarding-progress";
const TOTAL_STEPS = 5;

/**
 * The 5-step checklist itself. Client component because it tracks which
 * steps are marked complete (persisted to localStorage, per-viewer only —
 * same "lightweight per-viewer convenience" tier as any other local UI
 * state, not a source of truth anyone else reads).
 */
export default function OnboardingChecklist() {
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCompleted(JSON.parse(raw));
    } catch {
      // localStorage unavailable (private window, blocked site data) — start blank.
    }
    setHydrated(true);
  }, []);

  const toggle = (step: number) => {
    setCompleted((prev) => {
      const next = prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore — progress just won't persist across reloads for this viewer
      }
      return next;
    });
  };

  const doneCount = hydrated ? completed.length : 0;
  const isDone = (step: number) => completed.includes(step);

  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-[680px]">
        <div className="mb-12">
          <div className="mb-2 flex items-center justify-between font-display text-[11px] font-bold uppercase tracking-[.14em] text-text-muted">
            <span>Onboarding Progress</span>
            <span className={doneCount === TOTAL_STEPS ? "text-gold-bright" : undefined}>
              {doneCount}/{TOTAL_STEPS} Complete
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-gold-bright transition-all duration-500"
              style={{ width: `${(doneCount / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        <OnboardingStep
          number={1}
          eyebrow="Start Here"
          title="Watch your welcome video"
          description="This walks you through everything below, watch it before you touch anything else, it'll save you time."
          completed={isDone(1)}
          onToggle={() => toggle(1)}
        >
          <WistiaVideo mediaId="j8vba4sd5y" />
        </OnboardingStep>

        <OnboardingStep
          number={2}
          eyebrow="Do This Next"
          title="Book your onboarding call"
          description={
            <>
              A <strong className="text-text-primary">1-on-1 call</strong> to
              map your first 30 days inside the Academy: your goals, your
              timeline, your target prop firm. Slots fill up fast, lock yours
              in before you do anything else.
            </>
          }
          completed={isDone(2)}
          onToggle={() => toggle(2)}
        >
          <StepCtaButton
            href="https://calendly.com/kyrien-fortheculturefx/a-c-e-method-launch-call-with-kyrien"
            icon={<CalendarIcon className="h-4 w-4" />}
          >
            Book Your Onboarding Call
          </StepCtaButton>
        </OnboardingStep>

        <OnboardingStep
          number={3}
          eyebrow="Get Connected"
          title="Join the Discord community"
          description="This is where the wins, the feedback, and the day-to-day support happen. Get in and introduce yourself to the desk."
          completed={isDone(3)}
          onToggle={() => toggle(3)}
        >
          <StepCtaButton href="https://discord.gg/T66ytAyjz" icon={<DiscordIcon className="h-4 w-4" />}>
            Join The Discord Community
          </StepCtaButton>
        </OnboardingStep>

        <OnboardingStep
          number={4}
          eyebrow="Bonus"
          title="Access the trading library"
          description={
            <>
              Every past class, breakdown, and case study lives here. Start
              with the <strong className="text-text-primary">first video</strong>,
              it sets up everything else inside the library.
            </>
          }
          completed={isDone(4)}
          onToggle={() => toggle(4)}
        >
          {/* Placeholder link — swap for the real library URL when ready. */}
          <StepCtaButton href="#" icon={<LibraryIcon className="h-4 w-4" />}>
            Access The Library
          </StepCtaButton>
        </OnboardingStep>

        <OnboardingStep
          number={5}
          eyebrow="Final Step"
          title="Tell us how we can improve"
          description="A 2-minute survey on your onboarding so far. The more honest you are, the better we can make your first week."
          isLast
          completed={isDone(5)}
          onToggle={() => toggle(5)}
        >
          <TallyEmbed
            formId="MepW9M"
            title="A.C.E Trader Academy Onboarding Survey"
            height={400}
            loadingLabel="Loading the survey…"
            fallbackLabel="Open the survey in a new tab"
          />
        </OnboardingStep>
      </div>
    </section>
  );
}
