import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import GoldButton from "@/components/webinar/GoldButton";
import WebinarLogo from "@/components/webinar/WebinarLogo";
import KitTicket from "@/components/webinar/KitTicket";
import { KIT, RISK_DISCLAIMER, WEBINAR_START_ISO, WEBINAR_TIME_LABEL } from "@/data/webinar";

export const metadata: Metadata = {
  title: "Your Pre-Class Kit | For The Culture FX",
  description: "Get the A.C.E. Pre-Class Kit before the live masterclass.",
  robots: { index: false },
};

const PROGRESS = [
  { label: "Registered", state: "done" },
  { label: "Upgrade", state: "active" },
  { label: "Your access", state: "todo" },
] as const;

const UNPREPARED = [
  "You take notes on Sunday, then don't know where to start.",
  "You go back to switching strategies.",
  'Your Q&A question is "where do I begin?"',
];
const PREPARED = [
  "You've already run the checklist on your own charts.",
  "Your checklist and journal are in one place.",
  "You bring real questions about your own trades.",
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Do I need the Kit to attend?",
    a: (
      <>
        No. <strong className="font-bold text-white">Your free seat is already saved.</strong> The Kit is for people who
        want to start running A.C.E. on their own charts before Sunday.
      </>
    ),
  },
  { q: "Is this a subscription?", a: `No, it's a one-time $${KIT.price} payment.` },
  { q: "Is this the same as the free Blueprint?", a: `No. ${KIT.blueprintDifference}` },
  { q: "When do I get access?", a: "Instantly, by email, right after checkout." },
  { q: "Refunds?", a: KIT.guarantee },
];

const FAQ_CHIPS = [
  { label: "Instant access by email", icon: "bolt" },
  { label: "Secure checkout on Whop", icon: "lock" },
  { label: "One-time payment, no subscription", icon: "tag" },
] as const;

function ChipIcon({ icon }: { icon: (typeof FAQ_CHIPS)[number]["icon"] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
      aria-hidden
    >
      {icon === "bolt" && <path d="M13 3 5 14h6l-1 7 8-11h-6z" />}
      {icon === "lock" && (
        <>
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </>
      )}
      {icon === "tag" && (
        <>
          <path d="M3 12V4h8l10 10-8 8z" />
          <circle cx="7.5" cy="8.5" r="1" />
        </>
      )}
    </svg>
  );
}

function formatName(raw: string | undefined) {
  const first = raw?.trim().split(/\s+/)[0];
  if (!first) return "";
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`mt-1 h-[16px] w-[16px] shrink-0 ${className}`}
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

function SkipLink({ href }: { href: string }) {
  return (
    <div className="mt-6">
      <a
        href={href}
        className="inline-block text-[14px] font-semibold text-text-secondary underline underline-offset-4 transition-colors hover:text-white"
      >
        Skip the Kit, go to my joining link &rarr;
      </a>
      <p className="mt-1.5 text-[12.5px] text-text-muted">
        Your free seat stays saved. The ${KIT.price} price ends when class goes live
      </p>
    </div>
  );
}

const SEAT_DATE = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  month: "short",
  day: "numeric",
}).format(new Date(WEBINAR_START_ISO));
const SEAT_TIME = `${WEBINAR_TIME_LABEL.replace(":00", "")} EST`;

export default async function WebinarKitPage({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name: rawName } = await searchParams;
  const name = formatName(rawName);
  const confirmedHref = `/webinar/confirmed${name ? `?name=${encodeURIComponent(name)}` : ""}`;

  return (
    <>
      <main>
        <div className="px-6 pt-8">
          <WebinarLogo />
        </div>

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
                    {step.label}
                  </span>
                </span>
                {i < PROGRESS.length - 1 && <span className="h-px w-5 bg-border sm:w-10" />}
              </li>
            ))}
          </ol>
        </section>

        <section className="px-6 pb-8 pt-10 text-center">
          <div className="mx-auto mb-6 inline-flex max-w-full flex-col items-center gap-2.5 rounded-2xl border border-gold/30 bg-gold/[0.06] px-5 py-3 sm:flex-row sm:gap-4 sm:rounded-full sm:py-2.5 sm:pl-6 sm:pr-3">
            <p className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
              <Check className="!mt-0 h-3.5 w-3.5 text-gold" />
              Your seat is saved &middot; {SEAT_DATE} &middot; {SEAT_TIME}
            </p>
            <a
              href={confirmedHref}
              className="rounded-full bg-gold/15 px-4 py-1.5 font-display text-[11.5px] font-bold uppercase tracking-wide text-gold-bright transition-colors hover:bg-gold/25"
            >
              Skip to joining link &rarr;
            </a>
          </div>
          <h1 className="mx-auto mb-6 max-w-[780px] text-[1.7rem] font-extrabold leading-[1.15] tracking-tight text-balance sm:text-[2.3rem]">
            Before we send your link... start using the <span className="grad-text">A.C.E. checklist</span> on your
            charts this week.
          </h1>
          <p className="mx-auto mb-8 max-w-[640px] text-[15px] leading-relaxed text-white sm:text-[17px]">
            On Sunday, I&rsquo;ll walk you through A.C.E. live. But I can&rsquo;t sit next to you while you trade. So I
            put together the Pre-Class Kit: the exact checklist I run before every trade, the journal I use to track
            it, and my rules for protecting a funded account. Start this week, and walk into the class with real
            questions about your own trades.
          </p>

          <div className="mx-auto mb-8 max-w-[420px]">
            {KIT.mockupSrc ? (
              <Image src={KIT.mockupSrc} alt="A.C.E. Pre-Class Kit" width={840} height={840} className="h-auto w-full rounded-2xl" />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-gold/50 bg-surface text-[12px] font-bold uppercase tracking-wide text-text-muted">
                [KIT MOCKUP]
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="font-display text-[1.1rem] font-extrabold">
              <span className="mr-2 text-text-muted line-through decoration-2">{KIT.anchorPrice}</span>
              <span className="text-gold-bright">${KIT.price} today, one-time</span>
            </p>
            <p className="mt-1.5 text-[13px] text-text-secondary">
              Only for people registered for Sunday&rsquo;s masterclass.
            </p>
          </div>

          <GoldButton href={KIT.checkoutUrl} external>Get My Kit For ${KIT.price}</GoldButton>
          <p className="mt-3 text-[12.5px] text-text-muted">Instant access &middot; One-time payment</p>
          <SkipLink href={confirmedHref} />
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto mb-10 max-w-[620px] text-center">
            <span className="mb-5 inline-block rounded-full border border-gold/40 px-4 py-1.5 font-display text-[10.5px] font-bold uppercase tracking-[.18em] text-gold-bright">
              Only for Sunday&rsquo;s registrants
            </span>
            <h2 className="text-[1.6rem] font-extrabold leading-tight text-balance sm:text-[2.2rem]">
              Your Pre-Class Kit <span className="grad-text">ticket</span>
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[15px] leading-relaxed text-text-secondary">
              Everything you need to start running A.C.E. on your own charts before Sunday, bundled for one price.
            </p>
          </div>
          <KitTicket />
          <div className="mt-10 text-center">
            <GoldButton href={KIT.checkoutUrl} external>Get My Kit For ${KIT.price}</GoldButton>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto mb-10 max-w-[620px] text-center">
            <p className="mb-3 font-display text-[11px] font-bold uppercase tracking-[.2em] text-gold-bright">
              Two ways to walk into Sunday
            </p>
            <h2 className="text-[1.5rem] font-extrabold leading-tight text-balance sm:text-[2rem]">
              Prepared vs <span className="grad-text">unprepared</span>
            </h2>
          </div>
          <div className="relative mx-auto grid max-w-[860px] gap-5 md:grid-cols-2 md:gap-7">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-bg-primary font-display text-[11px] font-extrabold uppercase tracking-wide text-gold-bright shadow-[0_0_20px_-4px_rgba(255,193,56,0.5)] md:flex"
            >
              vs
            </div>

            <div className="rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 opacity-90">
              <p className="mb-6 flex items-center gap-2.5 font-display text-[11.5px] font-bold uppercase tracking-[.18em] text-text-muted">
                <span className="h-px w-6 bg-text-muted/50" />
                Unprepared
              </p>
              <ul className="flex flex-col gap-5">
                {UNPREPARED.map((t) => (
                  <li key={t} className="flex items-start gap-3.5 text-[15px] leading-relaxed text-text-secondary">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-error/40 bg-error/10 text-[14px] leading-none text-error"
                    >
                      &times;
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-[24px] border border-gold/50 bg-gradient-to-b from-gold/[0.12] via-surface-elevated to-surface-elevated p-7 shadow-[0_0_50px_-12px_rgba(255,193,56,0.4)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold/20 blur-3xl"
              />
              <p className="relative mb-6 flex items-center gap-2.5 font-display text-[11.5px] font-bold uppercase tracking-[.18em] text-gold-bright">
                <span className="h-px w-6 bg-gold" />
                Prepared
              </p>
              <ul className="relative flex flex-col gap-5">
                {PREPARED.map((t) => (
                  <li key={t} className="flex items-start gap-3.5 text-[15px] font-medium leading-relaxed text-white">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-bright text-[#04101f]"
                    >
                      <Check className="mt-0 h-[13px] w-[13px]" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="px-6 py-14">
          <div className="mx-auto grid max-w-[980px] gap-10 md:grid-cols-[300px_1fr] md:gap-12">
            <div className="md:sticky md:top-8 md:self-start">
              <span className="mb-5 inline-block rounded-full border border-gold/40 px-4 py-1.5 font-display text-[10.5px] font-bold uppercase tracking-[.18em] text-gold-bright">
                Before you decide
              </span>
              <h2 className="text-[1.9rem] font-extrabold leading-tight sm:text-[2.3rem]">
                Got <span className="grad-text">questions?</span>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Here&rsquo;s everything people ask before grabbing the Kit. Your free seat for Sunday is saved either
                way.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {FAQ_CHIPS.map((c) => (
                  <li
                    key={c.label}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-[13px] font-semibold text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <ChipIcon icon={c.icon} />
                    </span>
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              {FAQ.map((item, i) => (
                <details
                  key={item.q}
                  className="group rounded-2xl border border-white/10 bg-gradient-to-b from-[#101c42] to-[#0a1230] transition-all duration-300 open:border-brand-blue/40 open:from-[#17275a] open:shadow-[0_20px_50px_-20px_rgba(59,130,246,0.45)] hover:border-brand-blue/30"
                >
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 sm:px-5 [&::-webkit-details-marker]:hidden">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] font-display text-[11px] font-bold tabular-nums text-gold-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15.5px] font-semibold leading-snug text-white">{item.q}</span>
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[18px] leading-none text-gold transition-all duration-300 group-open:rotate-45 group-open:bg-gradient-to-br group-open:from-gold group-open:to-gold-bright group-open:!text-[#04101f]"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pb-5 pl-[4.25rem] pr-6 text-[14.5px] leading-relaxed text-text-secondary sm:pl-[4.5rem]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 pt-4">
          <div className="relative mx-auto max-w-[980px] overflow-hidden rounded-[28px] border border-gold/40 bg-gradient-to-b from-[#12204a] to-[#0a1230] px-6 py-12 text-center shadow-[0_0_60px_-20px_rgba(255,193,56,0.35)] sm:px-10">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-40 w-[70%] -translate-x-1/2 rounded-full bg-gold/15 blur-3xl"
            />
            <h2 className="relative text-[1.6rem] font-extrabold leading-tight text-balance sm:text-[2.1rem]">
              Walk into Sunday <span className="grad-text">already prepared.</span>
            </h2>
            <p className="relative mx-auto mt-3 max-w-[440px] text-[15px] leading-relaxed text-text-secondary">
              Checklist, journal and funded-account rules. Start using them on your charts tonight.
            </p>
            <p className="relative mt-6 flex items-baseline justify-center gap-3 font-display">
              <span className="text-[1.3rem] font-bold text-text-muted line-through decoration-2 decoration-error/70">
                {KIT.anchorPrice}
              </span>
              <span className="text-[2.8rem] font-extrabold leading-none text-gold-bright">${KIT.price}</span>
              <span className="text-[11px] font-bold uppercase tracking-[.16em] text-text-muted">One-time</span>
            </p>
            <div className="relative mt-7">
              <GoldButton href={KIT.checkoutUrl} external>Get My Kit For ${KIT.price}</GoldButton>
            </div>
            <ul className="relative mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[12px] font-semibold text-text-secondary">
              {["Instant access", "No subscription", "One-time payment"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="!mt-0 h-3 w-3 text-gold" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="relative">
              <SkipLink href={confirmedHref} />
            </div>
          </div>
        </section>
      </main>
      <Footer disclaimer={RISK_DISCLAIMER} />
    </>
  );
}
