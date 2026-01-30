"use client";

import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = {
  basico: {
    name: "Básico",
    price: 199,
    period: "mes",
    description: "Perfecto para empezar",
    features: [
      "Menú digital ilimitado",
      "Pedidos por WhatsApp",
      "App del cliente (PWA)",
      "Panel básico de gestión",
      "Código QR personalizado",
      "Soporte por email",
    ],
    cta: "Empezar Ahora",
    popular: false,
  },
  pro: {
    name: "Pro",
    price: 499,
    period: "mes",
    description: "Para restaurantes en crecimiento",
    features: [
      "Todo lo del plan Básico",
      "Estadísticas avanzadas",
      "Gestión de inventario",
      "Múltiples ubicaciones",
      "Soporte prioritario",
      "API integración",
    ],
    cta: "Comenzar Prueba",
    popular: true,
  },
};

export default function PricingSection() {
  return (
    <section id="precios" className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            Precios simples y transparentes
          </h2>
          <p className="text-slate-600">
            Elige el plan que mejor se adapte a tu restaurante
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Plan Básico */}
          <div className="bg-[#F9FAFB] rounded-2xl p-5 border border-gray-200">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">
                {plans.basico.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold text-primary">
                  ${plans.basico.price}
                </span>
                <span className="text-slate-500 text-sm">/{plans.basico.period}</span>
              </div>
              <p className="text-xs text-slate-600">{plans.basico.description}</p>
            </div>

            <ul className="space-y-2 mb-4">
              {plans.basico.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register?plan=basic"
              className="block w-full text-center py-2.5 px-4 border-2 border-gray-300 hover:border-primary text-slate-700 hover:text-primary rounded-xl font-semibold transition-all text-sm"
            >
              Elegir Plan Básico
            </Link>
          </div>

          {/* Plan Pro */}
          <div className="bg-white rounded-2xl p-5 border-2 border-primary relative">
            {plans.pro.popular && (
              <div className="absolute -top-3 right-4">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                  <span>😍</span> Más Popular
                </span>
              </div>
            )}

            <div className="mb-4 pt-2">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">
                {plans.pro.name}
              </h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-extrabold text-primary">
                  ${plans.pro.price}
                </span>
                <span className="text-slate-500 text-sm">/{plans.pro.period}</span>
              </div>
              <p className="text-xs text-slate-600">{plans.pro.description}</p>
            </div>

            <ul className="space-y-2 mb-4">
              {plans.pro.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register?plan=pro"
              className="block w-full text-center py-2.5 px-4 bg-primary hover:bg-orange-600 text-white rounded-xl font-semibold transition-all text-sm flex items-center justify-center gap-2"
            >
              {plans.pro.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-8 text-center">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">Garantía de satisfacción:</span>{" "}
            Si no estás contento, te devolvemos tu dinero. Sin preguntas.
          </p>
        </div>
      </div>
    </section>
  );
}

