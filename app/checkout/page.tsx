"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import MobileLayout from "@/components/MobileLayout";
import { ArrowLeft, CreditCard, DollarSign } from "lucide-react";

type PaymentMethod = "cash" | "transfer";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const subtotal = getTotalPrice();
  const deliveryFee = 20;
  const total = subtotal + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formatOrderMessage = () => {
    let message = `🍽️ *NUEVO PEDIDO*\n\n`;
    message += `👤 *Cliente:* ${formData.name}\n`;
    message += `📞 *Teléfono:* ${formData.phone}\n`;
    message += `📍 *Dirección:* ${formData.address}\n\n`;
    
    message += `📋 *PEDIDO:*\n`;
    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
      
      // Add modifiers if any
      if (item.modifiers && Object.keys(item.modifiers).length > 0) {
        Object.entries(item.modifiers).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            message += `  └─ ${key}: ${value.join(", ")}\n`;
          } else if (typeof value === "string" && value) {
            message += `  └─ ${key}: ${value}\n`;
          }
        });
      }
      
      // Add special instructions if any
      if (item.specialInstructions) {
        message += `  └─ Notas: ${item.specialInstructions}\n`;
      }
    });
    
    message += `\n💰 *RESUMEN:*\n`;
    message += `Subtotal: $${subtotal.toFixed(2)}\n`;
    message += `Envío: $${deliveryFee.toFixed(2)}\n`;
    message += `*Total: $${total.toFixed(2)}*\n\n`;
    
    message += `💳 *Método de Pago:* ${paymentMethod === "cash" ? "Efectivo" : "Transferencia Bancaria"}\n`;
    
    if (formData.notes) {
      message += `\n📝 *Notas para el repartidor:*\n${formData.notes}`;
    }
    
    return message;
  };

  const handlePlaceOrder = () => {
    // Validate form
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert("Por favor completa todos los campos requeridos");
      return;
    }

    // Format order message
    const orderMessage = formatOrderMessage();
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // WhatsApp number (dummy number - replace with actual restaurant number)
    const whatsappNumber = "5211234567890"; // Replace with actual number
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    
    // Clear cart
    clearCart();
    
    // Redirect to success page
    router.push("/order-success");
  };

  if (items.length === 0) {
    return (
      <MobileLayout>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Carrito vacío</h1>
          <p className="text-slate-500 mb-6">No hay productos en tu carrito</p>
          <button
            onClick={() => router.push("/")}
            className="bg-primary text-white px-6 py-3 rounded-xl font-medium"
          >
            Volver al inicio
          </button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="pb-6">
        {/* Header */}
        <div className="sticky top-[73px] z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Finalizar Pedido</h1>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Order Summary */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Resumen del Pedido</h2>
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-slate-900">
                        {item.quantity}x
                      </span>
                      <span className="text-sm font-medium text-slate-900">{item.name}</span>
                    </div>
                    {item.modifiers && Object.keys(item.modifiers).length > 0 && (
                      <div className="text-xs text-slate-500 ml-6">
                        {Object.entries(item.modifiers).map(([key, value]) => {
                          if (Array.isArray(value) && value.length > 0) {
                            return (
                              <div key={key}>
                                {key}: {value.join(", ")}
                              </div>
                            );
                          } else if (typeof value === "string" && value) {
                            return <div key={key}>{key}: {value}</div>;
                          }
                          return null;
                        })}
                      </div>
                    )}
                    {item.specialInstructions && (
                      <div className="text-xs text-slate-500 ml-6 italic">
                        Notas: {item.specialInstructions}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Bill Breakdown */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Desglose</h2>
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Envío</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </section>

          {/* Delivery Details Form */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Detalles de Entrega</h2>
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="1234567890"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Dirección de entrega *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Calle 10 #123, Colonia Centro"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-slate-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Notas para el repartidor
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Ej: Timbre dos veces, casa azul..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none text-slate-900"
                />
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-4">Método de Pago</h2>
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  paymentMethod === "cash"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "cash"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "cash" && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <DollarSign className="w-6 h-6 text-slate-700" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">Efectivo</div>
                    <div className="text-sm text-slate-500">Paga al recibir</div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("transfer")}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  paymentMethod === "transfer"
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === "transfer"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}
                  >
                    {paymentMethod === "transfer" && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <CreditCard className="w-6 h-6 text-slate-700" />
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">Transferencia Bancaria</div>
                    <div className="text-sm text-slate-500">Transfiere antes de recibir</div>
                  </div>
                </div>
              </button>
            </div>
          </section>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg"
          >
            Realizar Pedido - ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}






