"use client";

import Link from "next/link";
import { Home, Search, Receipt, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Inicio", path: "/" },
    { icon: Search, label: "Buscar", path: "/search" },
    { icon: Receipt, label: "Pedidos", path: "/my-orders" },
    { icon: User, label: "Perfil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            // Check if current path matches the nav item path
            const isActive = pathname === item.path || 
              (item.path === "/my-orders" && pathname?.startsWith("/my-orders")) ||
              (item.path === "/search" && pathname?.startsWith("/search"));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                  isActive ? "text-orange-600" : "text-gray-400"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-orange-600" : "text-gray-400"}`} />
                <span className={`text-xs font-medium ${isActive ? "text-orange-600" : "text-gray-400"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

