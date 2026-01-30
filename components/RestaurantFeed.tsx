"use client";

import { restaurants } from "@/data/restaurants";
import { Star, Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RestaurantFeed() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleRestaurantClick = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900 mb-4">Restaurantes cerca de ti</h2>
      <div className="space-y-4">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => restaurant.slug && handleRestaurantClick(restaurant.slug)}
            className="bg-white rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            {/* Cover Image */}
            <div className="relative h-40">
              <img
                src={restaurant.coverImage}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              {/* Favorite Button */}
              <button
                onClick={(e) => toggleFavorite(restaurant.id, e)}
                className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors z-10"
                aria-label="Agregar a favoritos"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites.has(restaurant.id)
                      ? "fill-primary text-primary"
                      : "text-slate-700"
                  }`}
                />
              </button>
              {/* Rating Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-white/90 rounded-full">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-slate-900">
                  {restaurant.rating}
                </span>
              </div>
              {/* Promotion Badge */}
              {restaurant.promotion && (
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                  {restaurant.promotion}
                </div>
              )}
            </div>

            {/* Restaurant Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">{restaurant.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-slate-900">
                    {restaurant.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
                <span>•</span>
                <span>{restaurant.deliveryTime}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {restaurant.isFreeDelivery ? (
                    <span className="text-sm font-medium text-green-600">Envío Gratis</span>
                  ) : (
                    <span className="text-sm text-slate-500">
                      Envío: {restaurant.deliveryFee}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



