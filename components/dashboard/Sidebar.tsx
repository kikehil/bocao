"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Edit3,
  QrCode,
  Settings,
  Menu,
  LogOut,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Live Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Menu Editor", href: "/dashboard/menu", icon: Edit3 },
  { name: "My QR Code", href: "/dashboard/qr", icon: QrCode },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userName, setUserName] = useState("Usuario");

  useEffect(() => {
    // Cargar nombre del usuario desde localStorage
    const storedUser = localStorage.getItem("bocao_user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserName(userData.restaurantName || userData.ownerName || "Usuario");
      } catch (e) {
        console.error("Error loading user data:", e);
        setUserName("Usuario");
      }
    }
  }, []);

  const handleLogout = () => {
    if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
      localStorage.removeItem("bocao_user");
      router.push("/login");
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <Menu className="w-6 h-6 text-slate-700" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200 transition-transform lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
              {/* Logo/Brand */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="Bocao"
                    width={120}
                    height={42}
                    className="h-10 w-auto"
                    priority
                  />
                  <p className="text-xs text-slate-500 font-medium">Business Dashboard</p>
                </div>
              </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-slate-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer - User Info & Logout */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {userName}
                </p>
                <p className="text-xs text-slate-500">Plan Premium</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>

            {/* Version */}
            <div className="text-xs text-center text-slate-400">
              Versión 1.0.0
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
