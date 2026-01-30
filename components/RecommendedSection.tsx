"use client";

import { recommendedProducts } from "@/data/restaurants";

export default function RecommendedSection() {
  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-lg font-bold text-slate-900">Recomendado para ti</h2>
        <button className="text-sm text-primary font-medium">Ver todo</button>
      </div>
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-4 px-4">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-40 bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-32">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-slate-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mb-2">{product.restaurant}</p>
                <p className="text-base font-bold text-slate-900">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}








