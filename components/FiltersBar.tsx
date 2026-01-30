"use client";

import { useState } from "react";
import { Star, Truck, Clock, Tag } from "lucide-react";

const filters = [
  { id: "rating", label: "Calificación 4.5+", icon: Star },
  { id: "freeDelivery", label: "Envío Gratis", icon: Truck },
  { id: "fastDelivery", label: "Menos de 30 min", icon: Clock },
  { id: "offers", label: "Ofertas", icon: Tag },
];

export default function FiltersBar() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="sticky top-[73px] z-40 bg-gray-50 py-3 mb-4 -mx-4 px-4">
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilters.includes(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white text-slate-700 shadow-sm"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <span>{filter.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}








