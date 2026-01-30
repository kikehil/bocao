"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroCarousel from "./HeroCarousel";
import CategoriesRail from "./CategoriesRail";
import RecommendedSection from "./RecommendedSection";
import FiltersBar from "./FiltersBar";
import RestaurantFeed from "./RestaurantFeed";
import { Check, X } from "lucide-react";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    // Check if user just registered
    const registered = searchParams.get("registered");
    if (registered === "true") {
      const customerData = localStorage.getItem("bocao_customer");
      if (customerData) {
        const customer = JSON.parse(customerData);
        setCustomerName(customer.name);
        setShowWelcomeBanner(true);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
          setShowWelcomeBanner(false);
        }, 5000);
      }
    }
  }, [searchParams]);

  return (
    <div className="pb-6">
      {/* Welcome Banner */}
      {showWelcomeBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4 animate-in slide-in-from-top duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-green-200 p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">
                ¡Bienvenido, {customerName}! 🎉
              </h3>
              <p className="text-sm text-slate-600">
                Tu cuenta ha sido creada exitosamente
              </p>
            </div>
            <button
              onClick={() => setShowWelcomeBanner(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      <HeroCarousel />
      <div className="px-4 space-y-6">
        <CategoriesRail />
        <RecommendedSection />
        <FiltersBar />
        <RestaurantFeed />
      </div>
    </div>
  );
}








