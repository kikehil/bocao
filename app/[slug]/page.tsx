"use client";

import { useParams, useRouter } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import RestaurantHeader from "@/components/RestaurantHeader";
import CategoryTabs from "@/components/CategoryTabs";
import MenuList from "@/components/MenuList";
import CartFAB from "@/components/CartFAB";
import ProductModal from "@/components/ProductModal";
import MobileLayout from "@/components/MobileLayout";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  modifiers?: Array<{
    name: string;
    type: "radio" | "checkbox";
    required: boolean;
    options: Array<{ label: string; price: number }>;
  }>;
}

export default function RestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const restaurant = restaurants.find((r) => r.slug === slug);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");

  useEffect(() => {
    if (restaurant?.menu?.categories && restaurant.menu.categories.length > 0) {
      setActiveCategory(restaurant.menu.categories[0].id);
    }
  }, [restaurant]);

  // Auto-detect active category on scroll
  useEffect(() => {
    if (!restaurant?.menu?.categories) return;

    const handleScroll = () => {
      const categories = restaurant.menu.categories;
      const scrollPosition = window.scrollY + 150; // Offset for sticky header

      for (let i = categories.length - 1; i >= 0; i--) {
        const element = document.getElementById(`category-${categories[i].id}`);
        if (element) {
          const elementTop = element.offsetTop;
          if (scrollPosition >= elementTop) {
            setActiveCategory(categories[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [restaurant]);

  if (!restaurant) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Restaurante no encontrado</h1>
          <button
            onClick={() => router.push("/")}
            className="text-primary font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </MobileLayout>
    );
  }

  if (!restaurant.menu) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Menú no disponible</h1>
          <p className="text-slate-500 mb-4">Este restaurante aún no tiene menú disponible.</p>
          <button
            onClick={() => router.push("/")}
            className="text-primary font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </MobileLayout>
    );
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleViewCart = () => {
    // TODO: Navigate to cart page
    console.log("View cart");
  };

  return (
    <MobileLayout>
      <div className="pb-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-20 left-4 z-30 p-2 bg-white/90 rounded-full hover:bg-white transition-colors shadow-sm"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5 text-slate-700" />
        </button>

        {/* Restaurant Header */}
        <RestaurantHeader restaurant={restaurant} />

        {/* Category Tabs */}
        <CategoryTabs
          categories={restaurant.menu.categories}
          onCategoryClick={handleCategoryClick}
          activeCategory={activeCategory}
        />

        {/* Menu List */}
        <div className="px-4 pt-6">
          <MenuList
            categories={restaurant.menu.categories as any}
            onProductClick={handleProductClick}
          />
        </div>

        {/* Cart FAB */}
        <CartFAB />

        {/* Product Modal */}
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </MobileLayout>
  );
}

