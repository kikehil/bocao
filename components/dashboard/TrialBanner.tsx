"use client";

import { useState } from "react";
import { Clock, X, ArrowRight, CreditCard, MessageCircle } from "lucide-react";

export default function TrialBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Simular días restantes (esto vendría de tu backend/contexto)
  const daysLeft: number = 6;
  const trialDays: number = 7;

  if (!isVisible) return null;

  const handleActivatePlan = () => {
    setShowModal(true);
  };

  const handleWhatsAppContact = () => {
    const phone = "5211234567890"; // Reemplaza con tu número
    const message = encodeURIComponent(
      "Hola, quiero activar mi plan Bocao y comenzar a recibir pedidos. 🍔"
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <>
      {/* Banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Message */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-amber-900">
                  🚀 Estás disfrutando de tu prueba Premium de {trialDays} días.{" "}
                  <span className="font-bold">
                    (Te quedan {daysLeft} día{daysLeft !== 1 ? "s" : ""})
                  </span>
                </p>
                <p className="text-xs text-amber-700 hidden sm:block mt-0.5">
                  Activa tu plan para seguir recibiendo pedidos sin interrupciones
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleActivatePlan}
                className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Activar Plan Ahora
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 hover:bg-amber-200 rounded-lg transition-colors text-amber-700"
                aria-label="Cerrar banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 w-full bg-amber-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${((trialDays - daysLeft) / trialDays) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Activation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Activa tu Plan Premium
              </h2>
              <p className="text-slate-600">
                Continúa recibiendo pedidos sin interrupciones
              </p>
            </div>

            {/* Plan Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">Plan Seleccionado:</span>
                <span className="text-lg font-bold text-primary">Plan Pro</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">Costo mensual:</span>
                <span className="text-2xl font-bold text-slate-900">$499</span>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-slate-600 leading-relaxed">
                  ✓ Sin comisiones por pedido<br />
                  ✓ Gestión completa de menú<br />
                  ✓ Órdenes ilimitadas<br />
                  ✓ Soporte prioritario
                </p>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 mb-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                Métodos de Pago:
              </h3>

              {/* Bank Transfer */}
              <div className="border-2 border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 mb-2">Transferencia Bancaria</h4>
                <div className="space-y-1 text-sm text-slate-600">
                  <p><strong>Banco:</strong> BBVA Bancomer</p>
                  <p><strong>Cuenta:</strong> 1234567890</p>
                  <p><strong>CLABE:</strong> 012180001234567890</p>
                  <p><strong>Titular:</strong> Bocao S.A. de C.V.</p>
                </div>
                <p className="text-xs text-amber-700 mt-3 bg-amber-50 p-2 rounded">
                  💡 Envía tu comprobante a hola@bocao.app
                </p>
              </div>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar por WhatsApp
            </button>

            <p className="text-xs text-center text-slate-500 mt-4">
              Te responderemos lo antes posible para activar tu plan
            </p>
          </div>
        </div>
      )}
    </>
  );
}



