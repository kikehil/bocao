"use client";

import Navbar from "@/components/negocios/Navbar";
import HeroSection from "@/components/negocios/HeroSection";
import StatsGrid from "@/components/negocios/StatsGrid";
import EcosystemSection from "@/components/negocios/EcosystemSection";
import PricingSection from "@/components/negocios/PricingSection";
import Footer from "@/components/negocios/Footer";
import StickyCTA from "@/components/negocios/StickyCTA";

/**
 * Landing Page Final para Bocao - Plataforma SaaS B2B para restaurantes
 * 
 * Características:
 * - Navbar con logo integrado (image_3.png)
 * - Hero con CTAs optimizados (py-6) y trust badges
 * - Stats Grid con 3 beneficios principales
 * - Ecosystem Section con mockups reales (image_11.png y image_10.png)
 * - Pricing Section con planes Básico ($199) y Pro ($499)
 * - Footer minimalista
 * - Sticky CTA en móvil (aparece al hacer scroll)
 * 
 * Optimizado para conversión móvil y desktop
 */
export default function NegociosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar sticky con logo */}
      <Navbar />
      
      {/* Hero Section - Primera impresión */}
      <HeroSection />
      
      {/* Stats Grid - 3 beneficios clave */}
      <StatsGrid />
      
      {/* Ecosystem - Mostrar el producto visualmente */}
      <EcosystemSection />
      
      {/* Pricing - Planes y precios claros */}
      <PricingSection />
      
      {/* Footer simple */}
      <Footer />
      
      {/* Sticky CTA - Solo móvil, aparece al scroll */}
      <StickyCTA />
    </div>
  );
}



