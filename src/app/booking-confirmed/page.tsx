import type { Metadata } from "next";
import StickyUrgencyBar from "@/components/booking/StickyUrgencyBar";
import BookingHero from "@/components/booking/BookingHero";
import FaqStepSection from "@/components/booking/FaqStepSection";
import ProofSection from "@/components/booking/ProofSection";
import ClosingBand from "@/components/booking/ClosingBand";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "You're Booked | For The Culture FX",
  description:
    "Your call is confirmed. Follow these steps before your coach calls.",
};

function formatName(raw: string | undefined) {
  const trimmed = raw?.trim();
  if (!trimmed) return "Trader";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export default async function BookingConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name: rawName } = await searchParams;
  const name = formatName(rawName);

  return (
    <>
      <StickyUrgencyBar name={name} />
      <main>
        <BookingHero name={name} />
        <ProofSection />
        <FaqStepSection />
        <ClosingBand />
      </main>
      <Footer />
    </>
  );
}
