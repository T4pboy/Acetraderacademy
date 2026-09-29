import Image from "next/image";
import { testimonials } from "@/data/testimonials";
import { RegisterButton } from "./RegisterModal";

const IMAGE_SIZES: Record<string, [number, number]> = {
  roh: [1080, 619],
  isaac: [1080, 619],
  emmanuel: [1080, 840],
  zee: [672, 1080],
  "group-session": [1080, 612],
};

/**
 * "See what's possible" proof stack: one white, dotted-border sheet where each
 * testimonial is headline, screenshot, quote, then a seat button.
 */
export default function WebinarProof() {
  return (
    <div className="mx-auto max-w-[620px] rounded-[28px] border-[3px] border-dotted border-slate-300 bg-white px-5 py-12 text-center shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:px-10">
      <h2 className="mb-12 text-[1.5rem] font-extrabold leading-tight text-slate-900 sm:text-[1.9rem]">
        See What&rsquo;s Possible Once You <span className="border-b-[3px] border-gold pb-0.5">Show Up</span> For The
        Live Masterclass
      </h2>

      <div className="flex flex-col gap-12">
        {testimonials.map((t) => {
          if (!t.imageSrc) return null;
          const [w, h] = IMAGE_SIZES[t.id] ?? [1080, 700];
          return (
            <article key={t.id} className="flex flex-col items-center">
              <h3 className="mb-5 text-[1.15rem] font-extrabold uppercase leading-snug tracking-wide text-slate-900 sm:text-[1.3rem]">
                <span className="text-[#c98a00]">{t.metric}</span>
              </h3>
              <Image
                src={t.imageSrc}
                alt={`${t.name} testimonial`}
                width={w}
                height={h}
                sizes="(max-width: 640px) 90vw, 520px"
                className={`h-auto rounded-2xl border border-slate-200 shadow-md ${
                  h > w ? "w-full max-w-[300px]" : "w-full max-w-[480px]"
                }`}
              />
              <p className="mt-5 max-w-[440px] text-[15px] leading-relaxed text-slate-700">
                &ldquo;{t.caption}&rdquo;
              </p>
              {t.id !== "group-session" && (
                <p className="mt-2 text-[14px] font-semibold text-slate-500">&ndash; {t.name}</p>
              )}
            </article>
          );
        })}
      </div>

      <div className="mt-14 flex flex-col items-center">
        <RegisterButton />
        <p className="mt-3 text-[12.5px] text-slate-500">
          Show up LIVE to get the A.C.E. Blueprint sent to your inbox
        </p>
      </div>
    </div>
  );
}
