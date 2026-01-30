"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Search, User, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [customerName, setCustomerName] = useState<string | null>(null);
  const cartItemsCount = getTotalItems();

  useEffect(() => {
    const customerData = localStorage.getItem("bocao_customer");
    if (customerData) {
      const customer = JSON.parse(customerData);
      setCustomerName(customer.name);
    }
  }, []);

  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLocationClick = () => {
    alert("Selección de dirección próximamente");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Bocao"
              width={80}
              height={28}
              className="h-7 w-auto"
              priority
            />
          </Link>

          {/* Location Selector */}
          <button
            onClick={handleLocationClick}
            className="flex items-center gap-1 text-sm font-medium text-slate-600 min-w-0 flex-shrink hover:text-primary transition-colors"
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="truncate">Elige tu ubicación</span>
            <svg
              className="w-4 h-4 text-slate-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              placeholder="¿Qué se te antoja hoy?"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/checkout"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-slate-700" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              )}
            </Link>
            
            {/* User Profile */}
            {customerName ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-white">
                    {customerName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block max-w-[100px] truncate">
                  {customerName.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <Link
                href="/profile"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5 text-slate-700" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}



