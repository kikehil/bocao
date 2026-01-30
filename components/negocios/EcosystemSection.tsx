"use client";

import Image from "next/image";
import { Smartphone, LayoutDashboard, Users, ShoppingCart, QrCode, BarChart3 } from "lucide-react";

const modules = [
  {
    title: "App del Cliente",
    description: "Experiencia móvil completa para tus clientes",
    icon: Smartphone,
    features: [
      "Menú digital interactivo",
      "Pedidos en tiempo real",
      "Seguimiento",
      "Historial",
      "QR personalizado",
    ],
    color: "primary",
  },
  {
    title: "Panel del Restaurante",
    description: "Control total sobre tu negocio",
    icon: LayoutDashboard,
    features: [
      "Gestión de menú en tiempo real",
      "Órdenes en vivo (Kanban)",
      "Estadísticas de ventas",
      "Configuración de precios",
    ],
    color: "blue",
  },
];

export default function EcosystemSection() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Un ecosistema completo para tu restaurante
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dos herramientas poderosas que trabajan juntas para hacer crecer tu negocio
          </p>
        </div>

        {/* Modules Grid */}
        <div className="space-y-8 mb-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            const isClientApp = module.color === "primary";
            
            return (
              <div
                key={index}
                className="bg-[#F9FAFB] rounded-2xl p-5 border border-gray-200"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  {/* Content */}
                  <div className={`flex-1 ${isClientApp ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isClientApp ? "bg-primary" : "bg-blue-500"
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {module.title}
                        </h3>
                        <p className="text-xs text-slate-600">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-2">
                      {module.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mockup Image */}
                  <div className={`flex-shrink-0 ${isClientApp ? 'lg:order-2' : 'lg:order-1'}`}>
                    {isClientApp ? (
                      // App Mockup
                      <div className="w-full max-w-[250px] mx-auto">
                        <img 
                          src="/image_11.png" 
                          alt="Mockup App del Cliente" 
                          className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                      </div>
                    ) : (
                      // Dashboard Mockup
                      <div className="w-full max-w-[350px] mx-auto">
                        <img 
                          src="/image_10.png" 
                          alt="Mockup Panel del Restaurante" 
                          className="w-full h-auto rounded-2xl shadow-2xl"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="bg-[#FFF7ED] rounded-2xl p-5 border border-primary/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Todo integrado, todo sincronizado
              </h3>
              <p className="text-sm text-slate-600">
                Cuando un cliente hace un pedido en la app, aparece instantáneamente en tu panel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

