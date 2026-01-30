"use client";

import { Info, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface RestaurantHeaderProps {
  restaurant: {
    name: string;
    coverImage: string;
    logo: string;
    isOpen: boolean;
    deliveryTime: string;
    rating: number;
  };
}

export default function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const router = useRouter();

  return (
    <div className="relative w-full">
      {/* Cover Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Info Button */}
        <button
          onClick={() => {}}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          aria-label="Información del restaurante"
        >
          <Info className="w-5 h-5 text-slate-700" />
        </button>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end gap-3">
            {/* Logo */}
            <div className="relative">
              <img
                src={restaurant.logo}
                alt={`${restaurant.name} logo`}
                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-lg"
              />
            </div>
            
            {/* Name and Status */}
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                {/* Status Badge */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    restaurant.isOpen
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {restaurant.isOpen ? "Abierto" : "Cerrado"}
                </div>
                
                {/* Delivery Time */}
                <div className="flex items-center gap-1 text-white text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






