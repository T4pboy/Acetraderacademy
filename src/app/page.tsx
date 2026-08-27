import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ApplicationSection from "@/components/ApplicationSection";
import TransformationSection from "@/components/TransformationSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function VSLPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ApplicationSection />
        <TransformationSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
