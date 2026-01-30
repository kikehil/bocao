"use client";

import { CheckCircle2, ArrowRight, Utensils, QrCode, Settings } from "lucide-react";
import Link from "next/link";

export default function WelcomeOnboarding() {
  const steps = [
    {
      icon: Settings,
      title: "Configura tu restaurante",
      description: "Completa la información básica de tu negocio",
      link: "/dashboard/settings",
      completed: false,
    },
    {
      icon: Utensils,
      title: "Agrega tu primer producto",
      description: "Crea tu menú para empezar a recibir pedidos",
      link: "/dashboard/menu",
      completed: false,
    },
    {
      icon: QrCode,
      title: "Comparte tu código QR",
      description: "Descarga y promociona tu menú digital",
      link: "/dashboard/qr",
      completed: false,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl border-2 border-orange-200 p-8 mb-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-3xl">🎉</span>
          <h2 className="text-2xl font-bold text-slate-900">
            ¡Bienvenido a Bocao!
          </h2>
        </div>
        <p className="text-slate-600">
          Tu dashboard está listo. Completa estos pasos para comenzar a recibir pedidos:
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <Link
            key={index}
            href={step.link}
            className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-primary transition-all group"
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
              <step.icon className="w-6 h-6 text-primary group-hover:text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 mb-1">
                {index + 1}. {step.title}
              </h3>
              <p className="text-sm text-slate-600">{step.description}</p>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-sm">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">
              Estás en modo prueba Premium (7 días)
            </h4>
            <p className="text-sm text-slate-700">
              Tienes acceso completo a todas las funciones de Bocao sin costo.
              Al finalizar, activa tu plan para seguir recibiendo pedidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


