"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-start gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <span className="text-xs sm:text-sm font-semibold text-white">
                Profesionalismo • Orden • Cero estrés tecnológico
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
              Dale a tu restaurante la tecnología de las grandes franquicias.
            </h1>

            <p className="text-sm sm:text-base text-slate-200 mb-8 max-w-2xl leading-relaxed">
              Deja de malabarear con pedidos por WhatsApp. Ten tu propia App profesional,
              recibe órdenes claras y cocina sin estrés. Modernízate hoy.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Unirme y Empezar a recibir pedidos
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#registro"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/40 hover:border-white text-white rounded-2xl font-semibold transition-all bg-white/10"
              >
                Ver cómo empezamos
              </Link>
            </div>

            <p className="text-xs text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Registro simple y acompañamiento desde el primer día
            </p>
          </div>

          <div className="w-full lg:w-5/12">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/business-hero.jpg"
                alt="Tablet con pedidos en cocina profesional"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

