"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle, Sparkles } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  restaurantName: string;
  onClose: () => void;
}

export default function WelcomeModal({
  isOpen,
  restaurantName,
  onClose,
}: WelcomeModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para la animación
      setTimeout(() => setShow(true), 100);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Header con gradiente */}
        <div className="bg-gradient-to-br from-primary via-orange-500 to-orange-600 px-8 pt-8 pb-6 text-center relative overflow-hidden">
          {/* Decoración de fondo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

          {/* Logo */}
          <div className="relative mb-4 flex justify-center">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <Image
                src="/logo.png"
                alt="Bocao"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </div>
          </div>

          {/* Icono de éxito */}
          <div className="relative mb-3 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-bounce">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="px-8 py-8 text-center">
          {/* Título */}
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center justify-center gap-2">
            <span>¡Bienvenido a Bocao!</span>
            <Sparkles className="w-6 h-6 text-primary" />
          </h2>

          {/* Mensaje personalizado */}
          <div className="mb-6">
            <p className="text-slate-600 mb-3">
              Tu cuenta ha sido creada exitosamente
            </p>
            <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-4">
              <p className="text-sm text-slate-500 mb-1">Restaurante</p>
              <p className="text-lg font-bold text-primary">{restaurantName}</p>
            </div>
          </div>

          {/* Beneficios rápidos */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-6 space-y-2">
            <div className="flex items-start gap-3 text-left">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Prueba Premium Activada
                </p>
                <p className="text-xs text-slate-600">
                  7 días gratis con todas las funciones
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  0% Comisiones
                </p>
                <p className="text-xs text-slate-600">
                  Mantén el 100% de tus ganancias
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-left">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Dashboard Listo
                </p>
                <p className="text-xs text-slate-600">
                  Configura tu menú y empieza a vender
                </p>
              </div>
            </div>
          </div>

          {/* Botón CTA */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 duration-200"
          >
            Ir a mi Dashboard →
          </button>

          <p className="text-xs text-slate-400 mt-4">
            Configura tu menú en menos de 5 minutos
          </p>
        </div>
      </div>
    </div>
  );
}


