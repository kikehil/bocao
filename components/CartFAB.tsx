"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function CartFAB() {
  const router = useRouter();
  const { getTotalItems, getTotalPrice } = useCart();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (totalItems === 0) {
    return null;
  }

  const handleViewCart = () => {
    router.push("/checkout");
  };

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 px-4 pb-4 max-w-md mx-auto">
      <button
        onClick={handleViewCart}
        className="w-full bg-primary hover:bg-orange-600 text-white rounded-xl shadow-lg py-4 px-6 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <div className="text-left">
            <div className="text-sm font-medium">Ver Pedido</div>
            <div className="text-xs opacity-90">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</div>
          </div>
        </div>
        <div className="text-lg font-bold">${totalPrice.toFixed(2)}</div>
      </button>
    </div>
  );
}

