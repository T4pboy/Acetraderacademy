import StepBadge from "./StepBadge";
import WistiaVideo from "@/components/WistiaVideo";

type Props = { name: string };

export default function BookingHero({ name }: Props) {
  return (
    <section className="px-6 pb-16 pt-14 sm:pt-16">
      <div className="mx-auto max-w-[780px] text-center">
        <h1 className="mb-3 text-[1.7rem] font-extrabold leading-[1.15] tracking-tight text-balance sm:text-[2.1rem] md:text-[2.4rem]">
          {name}, <span className="grad-text">Thank You For Booking.</span>
        </h1>

        <p className="mx-auto mb-2.5 max-w-[560px] text-[1.05rem] font-semibold leading-snug text-text-primary sm:text-[1.15rem]">
          You Are Going To Receive A Call From My Team Within 48 Hours.
        </p>

        <p className="mx-auto mb-8 max-w-[520px] text-[13.5px] leading-relaxed text-text-secondary sm:text-[15px]">
          We&rsquo;ve all blown an account before — follow these steps before
          your call.
        </p>

        <div className="mb-6 flex justify-center">
          <StepBadge step="Step 1">Watch The Video Below In Full</StepBadge>
        </div>

        <WistiaVideo mediaId="rwv8l7jh8i" />
      </div>
    </section>
  );
}
