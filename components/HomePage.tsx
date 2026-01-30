"use client";

import HeroCarousel from "./HeroCarousel";
import CategoriesRail from "./CategoriesRail";
import RecommendedSection from "./RecommendedSection";
import FiltersBar from "./FiltersBar";
import RestaurantFeed from "./RestaurantFeed";

export default function HomePage() {
  return (
    <div className="pb-6">
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








