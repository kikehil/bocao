"use client";

import MobileLayout from "@/components/MobileLayout";
import { Receipt } from "lucide-react";
import Link from "next/link";

export default function MyOrdersPage() {
  return (
    <MobileLayout>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Mis Pedidos</h1>
          <p className="text-slate-600">Historial de tus pedidos</p>
        </div>

        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            No hay pedidos aún
          </h2>
          <p className="text-slate-500 mb-6">
            Tus pedidos aparecerán aquí una vez que realices tu primera orden
          </p>
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium"
          >
            Explorar Restaurantes
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
}






