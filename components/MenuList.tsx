"use client";

import { Plus } from "lucide-react";
import { useRef } from "react";

interface ModifierOption {
  label: string;
  price: number;
}

interface Modifier {
  name: string;
  type: "radio" | "checkbox";
  required: boolean;
  options: ModifierOption[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  modifiers?: Modifier[];
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface MenuListProps {
  categories: Category[];
  onProductClick: (product: Product) => void;
}

export default function MenuList({ categories, onProductClick }: MenuListProps) {
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div className="space-y-8 pb-6">
      {categories.map((category) => (
        <div
          key={category.id}
          id={`category-${category.id}`}
          ref={(el) => { categoryRefs.current[category.id] = el; }}
          className="scroll-mt-24"
        >
          <h2 className="text-xl font-bold text-slate-900 mb-4 px-4">
            {category.name}
          </h2>
          <div className="space-y-4">
            {category.products.map((product) => (
              <button
                key={product.id}
                onClick={() => onProductClick(product)}
                className="w-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow text-left"
              >
                <div className="flex gap-4 p-4">
                  {/* Text Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center">
                        <div className="opacity-0 hover:opacity-100 transition-opacity">
                          <Plus className="w-6 h-6 text-white bg-primary rounded-full p-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

