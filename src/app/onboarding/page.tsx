import type { Metadata } from "next";
import OnboardingHero from "@/components/onboarding/OnboardingHero";
import OnboardingChecklist from "@/components/onboarding/OnboardingChecklist";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Welcome | A.C.E Trader Academy",
  description:
    "You're in — complete these 5 steps to get set up for your first week.",
};

export default function OnboardingPage() {
  return (
    <>
      <main>
        <OnboardingHero />
        <OnboardingChecklist />
      </main>
      <Footer />
    </>
  );
}
