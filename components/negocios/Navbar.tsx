"use client";

import Image from "next/image";
import { Menu, Search, Bell, Share2 } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menú"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>

          {/* Center: Logo */}
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Bocao Logo" 
              width={100}
              height={35}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Notificaciones"
            >
              <Bell className="w-5 h-5 text-slate-700" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Compartir"
            >
              <Share2 className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

