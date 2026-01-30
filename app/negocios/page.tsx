"use client";

import Navbar from "@/components/negocios/Navbar";
import HeroSection from "@/components/negocios/HeroSection";
import StatsGrid from "@/components/negocios/StatsGrid";
import EcosystemSection from "@/components/negocios/EcosystemSection";
import PricingSection from "@/components/negocios/PricingSection";
import Footer from "@/components/negocios/Footer";
import StickyCTA from "@/components/negocios/StickyCTA";

export default function NegociosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <StatsGrid />
      <EcosystemSection />
      <PricingSection />
      <Footer />
      <StickyCTA />
    </div>
  );
}

