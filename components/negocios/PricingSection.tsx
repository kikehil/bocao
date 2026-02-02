"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section id="precios" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Empieza gratis. Crece a tu ritmo.
          </h2>
          <p className="text-slate-600 mt-2">
            Sin comisiones por pedido. Solo una suscripción fija para mantener tu tecnología.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-600">
                Prueba Piloto
              </h3>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Gratis 15 Días
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold text-slate-900">
                $0
              </span>
              <span className="text-slate-500 text-sm">MXN</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>Acceso total a la plataforma.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>Recepción de pedidos ilimitados.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                <span>Configuración inicial asistida.</span>
              </li>
            </ul>
            <Link
              href="/register?plan=pilot"
              className="mt-auto block w-full text-center py-3 px-4 border-2 border-slate-300 hover:border-primary text-slate-700 hover:text-primary rounded-xl font-semibold transition-all"
            >
              Iniciar Prueba Gratis
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-primary shadow-lg relative flex flex-col">
            <div className="absolute -top-3 right-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1">
                <span>🔥</span> El más popular
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">
                Socio Digital
              </h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-extrabold text-primary">
                  $499
                </span>
                <span className="text-slate-500 text-sm">/ mes</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>Menú digital siempre activo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>Panel de control de pedidos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>Pagos en efectivo y transferencia.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <span>Soporte técnico estándar.</span>
                </li>
              </ul>
            </div>
            <Link
              href="/register?plan=digital"
              className="mt-auto block w-full text-center py-3 px-4 bg-primary hover:bg-orange-600 text-white rounded-xl font-semibold transition-all"
            >
              Elegir Digital
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-600">
                Socio Impulso
              </h3>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                Para vender más
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold text-slate-900">
                $899
              </span>
              <span className="text-slate-500 text-sm">/ mes</span>
            </div>
            <ul className="space-y-3 text-sm text-slate-700 mb-6">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-500 mt-0.5" />
                <span>Todo lo del Plan Digital.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base">🚀</span>
                <span>Posicionamiento VIP (Aparece primero).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base">📢</span>
                <span>Mención mensual en redes de Bocao.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-base">⭐</span>
                <span>Insignia de "Restaurante Destacado".</span>
              </li>
            </ul>
            <Link
              href="/register?plan=impulso"
              className="mt-auto block w-full text-center py-3 px-4 border-2 border-slate-300 hover:border-primary text-slate-700 hover:text-primary rounded-xl font-semibold transition-all"
            >
              Quiero destacar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

