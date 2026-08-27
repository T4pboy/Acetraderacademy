"use client";

import { useState } from "react";
import { testimonials } from "@/data/testimonials";
import TestimonialCarousel from "./TestimonialCarousel";
import TestimonialModal from "./TestimonialModal";
import AvailabilityNotice from "./AvailabilityNotice";

export default function TransformationSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="proof" className="bg-gradient-to-b from-transparent via-[#0a1122]/60 to-transparent px-6 py-16 md:py-22">
      <div className="mx-auto max-w-[1120px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <h2 className="mb-3.5 text-[1.7rem] font-extrabold leading-tight md:text-[2.1rem]">From Stuck to Funded</h2>
          <p className="text-text-muted">
            Real students, real payouts. Screenshots and results below are
            placeholders pending final assets from the client.
          </p>
        </div>

        <TestimonialCarousel items={testimonials} onOpen={setActiveIndex} />

        <AvailabilityNotice />
      </div>

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
