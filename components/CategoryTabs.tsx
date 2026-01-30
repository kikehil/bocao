"use client";

import { useEffect, useRef, useState } from "react";

interface CategoryTabsProps {
  categories: Array<{ id: string; name: string }>;
  onCategoryClick: (categoryId: string) => void;
  activeCategory: string;
}

export default function CategoryTabs({
  categories,
  onCategoryClick,
  activeCategory,
}: CategoryTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={tabsRef}
      className={`bg-white border-b border-gray-200 transition-all ${
        isSticky ? "sticky top-[73px] z-40 shadow-sm" : "relative"
      }`}
    >
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-1 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${
                activeCategory === category.id
                  ? "text-primary"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {category.name}
              {activeCategory === category.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}






