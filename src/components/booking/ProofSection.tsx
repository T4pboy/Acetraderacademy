"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TestimonialModal from "@/components/TestimonialModal";
import StepBadge from "./StepBadge";
import WhiteContainer from "./WhiteContainer";
import VidalyticsPlayer from "@/components/VidalyticsPlayer";

/**
 * "Step 3: People Just Like You Who Followed The System" — reuses the main
 * page's testimonial carousel and modal as-is (per user request), just
 * dropped into this page's own step framing instead of TransformationSection's.
 */
export default function ProofSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-16 md:py-24">
      <WhiteContainer className="max-w-[1120px]">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <div className="mb-5 flex justify-center">
            <StepBadge step="Step 3" tone="light">People Just Like You</StepBadge>
          </div>
          <h2 className="mb-3 text-[1.5rem] font-extrabold leading-tight text-slate-900 sm:text-[1.8rem]">
            People Just Like You Who Followed The System
          </h2>
          <p className="text-slate-500">
            Real students, real payouts — the same system you&rsquo;re about
            to get walked through on your call.
          </p>
        </div>

        <div className="mb-16">
          <VidalyticsPlayer
            embedId="vidalytics_embed_7oNd8cPku8XiZTUq"
            htmlSrc="/vic-testimonial-embed.html"
            posterLabel="Watch Vic's Testimonial"
          />
        </div>

        <TestimonialCarousel items={testimonials} onOpen={setActiveIndex} />
      </WhiteContainer>

      <TestimonialModal
        items={testimonials}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(delta) =>
          setActiveIndex((current) => {
            if (current === null) return current;
            return (current + delta + testimonials.length) % testimonials.length;
          })
        }
      />
    </section>
  );
}
