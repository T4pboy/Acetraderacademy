import Link from "next/link";
import IClosedBooking from "./IClosedBooking";

type Props = {
  fullName: string;
  email: string;
};

export default function BookingStep({ fullName, email }: Props) {
  const confirmedHref = `/booking-confirmed?name=${encodeURIComponent(fullName)}`;

  return (
    <div className="flex flex-col items-center gap-6">
      <IClosedBooking email={email} fullName={fullName} />
      <div className="text-center">
        <Link
          href={confirmedHref}
          className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-gold px-6 py-3 font-display text-[13px] font-bold uppercase tracking-wide text-[#04101f] shadow-[0_0_20px_rgba(255,193,56,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
        >
          I&rsquo;ve booked my call, continue
        </Link>
        {/* iClosed's own dashboard may support a redirect-on-booking setting
            that can point here automatically, the same way Tally's
            post-submit redirect is configured entirely in Tally's own
            dashboard today (no code in this repo constructs it). */}
        <p className="mt-3 text-[12px] text-text-muted">
          You&rsquo;ll be redirected here automatically once booking is fully connected.
        </p>
      </div>
    </div>
  );
}
