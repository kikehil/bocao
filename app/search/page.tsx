"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/MobileLayout";
import { Search, Star, Clock } from "lucide-react";
import { restaurants } from "@/data/restaurants";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  // Search logic
  const searchResults = useMemo(() => {
    if (!query.trim()) return { restaurants: [], products: [] };

    const searchLower = query.toLowerCase().trim();
    const matchedRestaurants: typeof restaurants = [];
    const matchedProducts: Array<{
      id: number;
      name: string;
      price: number;
      image: string;
      restaurant: string;
      restaurantSlug: string;
    }> = [];

    restaurants.forEach((restaurant) => {
      // Search in restaurant name, cuisine
      const nameMatch = restaurant.name.toLowerCase().includes(searchLower);
      const cuisineMatch = restaurant.cuisine?.toLowerCase().includes(searchLower);
      
      if (nameMatch || cuisineMatch) {
        matchedRestaurants.push(restaurant);
      }

      // Search in products
      if (restaurant.menu?.categories) {
        restaurant.menu.categories.forEach((category) => {
          category.products.forEach((product) => {
            const productNameMatch = product.name.toLowerCase().includes(searchLower);
            const productDescMatch = product.description?.toLowerCase().includes(searchLower);
            
            if (productNameMatch || productDescMatch) {
              matchedProducts.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                restaurant: restaurant.name,
                restaurantSlug: restaurant.slug || "",
              });
            }
          });
        });
      }
    });

    return { restaurants: matchedRestaurants, products: matchedProducts };
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <MobileLayout>
      <div className="px-4 py-6">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="¿Qué se te antoja hoy?"
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </form>

        {!query ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Busca restaurantes y productos
            </h2>
            <p className="text-slate-500">
              Escribe en la barra de búsqueda para comenzar
            </p>
          </div>
        ) : searchResults.restaurants.length === 0 && searchResults.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No se encontraron resultados
            </h2>
            <p className="text-slate-500">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Restaurants Results */}
            {searchResults.restaurants.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Restaurantes ({searchResults.restaurants.length})
                </h2>
                <div className="space-y-4">
                  {searchResults.restaurants.map((restaurant) => (
                    <Link
                      key={restaurant.id}
                      href={`/${restaurant.slug}`}
                      className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4 p-4">
                        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={restaurant.coverImage}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">
                            {restaurant.name}
                          </h3>
                          <p className="text-sm text-slate-500 mb-2">
                            {restaurant.cuisine}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-slate-900">
                                {restaurant.rating}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500">
                              <Clock className="w-4 h-4" />
                              <span>{restaurant.deliveryTime}</span>
                            </div>
                            {restaurant.isFreeDelivery && (
                              <span className="text-green-600 font-medium text-xs">
                                Envío Gratis
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Products Results */}
            {searchResults.products.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Productos ({searchResults.products.length})
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {searchResults.products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/${product.restaurantSlug}`}
                      className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
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
                        <p className="text-xs text-slate-500 mb-2">
                          {product.restaurant}
                        </p>
                        <p className="text-base font-bold text-slate-900">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

