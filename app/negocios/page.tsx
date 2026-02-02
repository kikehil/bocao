"use client";

import Navbar from "@/components/negocios/Navbar";
import HeroSection from "@/components/negocios/HeroSection";
import ChaosVsOrderSection from "@/components/negocios/ChaosVsOrderSection";
import OnboardingSection from "@/components/negocios/OnboardingSection";
import PricingSection from "@/components/negocios/PricingSection";
import FinalCTASection from "@/components/negocios/FinalCTASection";
import Footer from "@/components/negocios/Footer";
import StickyCTA from "@/components/negocios/StickyCTA";

export default function NegociosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ChaosVsOrderSection />
      <OnboardingSection />
      <PricingSection />
      <FinalCTASection />
      <Footer />
      <StickyCTA />
    </div>
  );
}

