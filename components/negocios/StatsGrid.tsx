"use client";

import { Percent, MessageCircle, Smartphone } from "lucide-react";

const stats = [
  {
    icon: Percent,
    title: "0% Comisiones",
    description: "Mantén el 100% de tus ganancias. Sin comisiones por pedido, sin tarifas ocultas.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: MessageCircle,
    title: "Pedidos por WhatsApp",
    description: "Recibe pedidos directamente en tu WhatsApp. Sin apps intermedias, comunicación directa con tus clientes.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Smartphone,
    title: "Tu propia PWA",
    description: "App progresiva que tus clientes pueden instalar. Funciona como app nativa, sin descargas obligatorias.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export default function StatsGrid() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 text-center"
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-2 mx-auto`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {stat.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

