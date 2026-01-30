"use client";

import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import WelcomeOnboarding from "@/components/dashboard/WelcomeOnboarding";

const columns = [
  {
    id: "new",
    title: "Nuevos",
    color: "yellow",
    borderColor: "border-yellow-400",
    bgColor: "bg-yellow-50",
  },
  {
    id: "preparing",
    title: "Preparando",
    color: "blue",
    borderColor: "border-blue-400",
    bgColor: "bg-blue-50",
  },
  {
    id: "ready",
    title: "Listos/Enviados",
    color: "green",
    borderColor: "border-green-400",
    bgColor: "bg-green-50",
  },
];

export default function LiveOrdersPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const orders: any[] = [];

  useEffect(() => {
    // Check if user is new
    const storedUser = localStorage.getItem("bocao_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Si isNewUser es true o undefined, mostrar onboarding
      const userIsNew = userData.isNewUser !== false;
      setIsNewUser(userIsNew);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Welcome Onboarding (Only for new users) */}
      {isNewUser && <WelcomeOnboarding />}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Órdenes en Vivo</h1>
        <p className="text-slate-600 mt-1">
          Gestiona y rastrea los pedidos en tiempo real
        </p>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`bg-white rounded-xl shadow-sm border-2 ${column.borderColor} overflow-hidden`}
          >
            {/* Column Header */}
            <div className={`${column.bgColor} px-4 py-3 border-b-2 ${column.borderColor}`}>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">{column.title}</h2>
                <span className="text-sm text-slate-600 bg-white px-2 py-1 rounded-full">
                  {orders.filter((o) => o.status === column.id).length}
                </span>
              </div>
            </div>

            {/* Column Content */}
            <div className="p-4 min-h-[400px]">
              {orders.filter((o) => o.status === column.id).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className={`w-16 h-16 ${column.bgColor} rounded-full flex items-center justify-center mb-4`}>
                    {column.color === "yellow" && (
                      <ShoppingBag className="w-8 h-8 text-yellow-600" />
                    )}
                    {column.color === "blue" && (
                      <ShoppingBag className="w-8 h-8 text-blue-600" />
                    )}
                    {column.color === "green" && (
                      <ShoppingBag className="w-8 h-8 text-green-600" />
                    )}
                  </div>
                  <p className="text-slate-500 font-medium">No hay órdenes activas</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Las nuevas órdenes aparecerán aquí
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Order cards would go here */}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-slate-600">Total Órdenes</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">0</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-slate-600">Nuevas</div>
          <div className="text-2xl font-bold text-yellow-600 mt-1">0</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-slate-600">Preparando</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">0</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-slate-600">Completadas</div>
          <div className="text-2xl font-bold text-green-600 mt-1">0</div>
        </div>
      </div>
    </div>
  );
}
