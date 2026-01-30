"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/MobileLayout";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  const router = useRouter();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsAnimated(true);
  }, []);

  return (
    <MobileLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full text-center">
          {/* Animated Checkmark */}
          <div className="flex justify-center mb-6">
            <div
              className={`relative transition-all duration-500 ${
                isAnimated ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <CheckCircle2
                className={`w-24 h-24 text-green-500 transition-all duration-700 ${
                  isAnimated ? "scale-100 rotate-0" : "scale-0 rotate-180"
                }`}
                strokeWidth={2}
              />
              {/* Pulse effect */}
              {isAnimated && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-green-500 rounded-full animate-ping opacity-20"></div>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            ¡Pedido Enviado!
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 mb-8">
            El restaurante ha recibido tu pedido vía WhatsApp.
          </p>

          {/* Additional Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 space-y-3">
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Tu pedido está siendo procesado</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Recibirás una confirmación pronto</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Tiempo estimado: 20-30 minutos</span>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => router.push("/")}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}






