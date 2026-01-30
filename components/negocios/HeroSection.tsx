"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-medium text-primary">
              Sin comisiones ocultas • Sin contratos
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Tu restaurante en línea,{" "}
            <span className="text-primary">0% comisiones</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 mb-6 max-w-2xl mx-auto leading-relaxed">
            Recupera la rentabilidad que las apps tradicionales te quitan. Gestiona pedidos directamente por WhatsApp y mantén el 100% de tus ganancias.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-3 max-w-md mx-auto">
            <Link
              href="/register"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white px-8 py-6 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Comenzar Ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#precios"
              className="w-full sm:flex-1 inline-flex items-center justify-center px-8 py-6 border-2 border-gray-300 hover:border-primary text-slate-700 hover:text-primary rounded-2xl font-semibold transition-all bg-white"
            >
              Ver Precios
            </Link>
          </div>

          {/* Credit Card Note */}
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            No se requiere tarjeta de crédito
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Configuración en minutos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Sin tarifas mensuales</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span>Soporte local en Pánuco</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

