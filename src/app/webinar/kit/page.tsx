import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import GoldButton from "@/components/webinar/GoldButton";
import WebinarLogo from "@/components/webinar/WebinarLogo";
import WhopCheckout from "@/components/webinar/WhopCheckout";
import { KIT, RISK_DISCLAIMER } from "@/data/webinar";

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

const INSIDE = [
  { title: "The A.C.E. Pre-Trade Checklist", body: "The 3 checks every trade must pass, as a printable one-pager." },
  { title: "The A.C.E. Trading Journal", body: "A template to log every trade against the checklist." },
  {
    title: "Funded Account Protection Rules",
    body: "What to do differently the day you pass, so you don't give it back.",
  },
  { title: "After the class", body: KIT.afterClassBonus },
];

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

const FAQ = [
  { q: "Do I need this to attend?", a: "No. Your free seat is already saved." },
  { q: "Is this a subscription?", a: "No, it's a one-time $21 payment." },
  { q: "Is this the same as the free Blueprint?", a: `No. ${KIT.blueprintDifference}` },
  { q: "When do I get access?", a: "Instantly, by email, right after checkout." },
  { q: "Refunds?", a: KIT.guarantee },
];

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

function NoThanks({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="mt-5 inline-block text-[13.5px] text-text-muted underline underline-offset-4 transition-colors hover:text-text-secondary"
    >
      {children}
    </a>
  );
}

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
          <p className="mb-4 text-[15px] font-semibold text-brand-blue-pale">
            You&rsquo;re in{name ? `, ${name}` : ""}. Your joining link is on the next page.
          </p>
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

          <GoldButton href="#checkout">Get My Kit For ${KIT.price}</GoldButton>
          <p className="mt-3 text-[12.5px] text-text-muted">Instant access &middot; One-time payment</p>
          <NoThanks href={confirmedHref}>No thanks, I&rsquo;ll start from scratch after the class</NoThanks>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto max-w-[720px] rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-9">
            <p className="mb-5 font-display text-[12px] font-bold uppercase tracking-[.14em] text-slate-900">
              What&rsquo;s inside
            </p>
            <ul className="flex flex-col gap-4">
              {INSIDE.map((item) => (
                <li key={item.title} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                  <Check className="text-[#c98a00]" />
                  <span>
                    <strong className="text-slate-900">{item.title}:</strong> {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-10">
          <h2 className="mb-8 text-center text-[1.4rem] font-extrabold sm:text-[1.8rem]">
            Prepared vs <span className="grad-text">unprepared</span>
          </h2>
          <div className="mx-auto grid max-w-[820px] gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-error/30 bg-surface p-6">
              <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[.14em] text-error">Unprepared</p>
              <ul className="flex flex-col gap-3.5">
                {UNPREPARED.map((t) => (
                  <li key={t} className="flex gap-3 text-[14.5px] leading-relaxed text-text-secondary">
                    <span aria-hidden className="mt-0.5 text-error">
                      &times;
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-success/40 bg-surface-elevated p-6 shadow-[var(--shadow-glow-sm)]">
              <p className="mb-4 font-display text-[12px] font-bold uppercase tracking-[.14em] text-success">Prepared</p>
              <ul className="flex flex-col gap-3.5">
                {PREPARED.map((t) => (
                  <li key={t} className="flex gap-3 text-[14.5px] leading-relaxed text-text-primary">
                    <Check className="text-success" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="checkout" className="scroll-mt-6 px-6 py-10">
          <div className="mx-auto max-w-[620px] rounded-[28px] bg-white p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8">
            <h2 className="mb-5 text-center text-[1.2rem] font-extrabold text-slate-900">
              A.C.E. Pre-Class Kit &middot; ${KIT.price}
            </h2>
            <WhopCheckout returnPath={confirmedHref} />
          </div>
        </section>

        <section className="px-6 py-10">
          <h2 className="mb-6 text-center text-[1.4rem] font-extrabold sm:text-[1.8rem]">Questions</h2>
          <div className="mx-auto flex max-w-[680px] flex-col gap-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-border bg-surface px-5 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold">
                  {item.q}
                  <span aria-hidden className="text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-text-secondary">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="px-6 pb-20 pt-6 text-center">
          <GoldButton href="#checkout">Get My Kit For ${KIT.price}</GoldButton>
          <div>
            <NoThanks href={confirmedHref}>No thanks, take me to my joining link</NoThanks>
          </div>
        </section>
      </main>
      <Footer disclaimer={RISK_DISCLAIMER} />
    </>
  );
}
