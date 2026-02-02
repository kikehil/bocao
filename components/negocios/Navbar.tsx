"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="Bocao Logo" 
              width={200}
              height={70}
              className="h-12 sm:h-14 w-auto"
              priority
            />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:border-primary hover:text-primary transition-all font-semibold"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

