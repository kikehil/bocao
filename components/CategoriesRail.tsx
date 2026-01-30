"use client";

import { useState } from "react";
import { categories } from "@/data/restaurants";

export default function CategoriesRail() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  return (
    <section className="mb-6">
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`flex flex-col items-center gap-2 min-w-[80px] transition-all ${
                selectedCategory === category.id
                  ? "text-primary"
                  : "text-slate-700"
              }`}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
                  selectedCategory === category.id
                    ? "bg-primary/10 ring-2 ring-primary"
                    : "bg-white shadow-sm"
                }`}
              >
                {category.icon}
              </div>
              <span className="text-xs font-medium text-center">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}








