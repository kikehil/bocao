"use client";

import { Save } from "lucide-react";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    restaurantName: "",
    phone: "",
    address: "",
    deliveryFee: "20",
    minOrder: "50",
    isOpen: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("bocao_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setSettings({
        restaurantName: userData.restaurantName || "",
        phone: userData.phone || "",
        address: userData.address || "",
        deliveryFee: userData.deliveryFee || "20",
        minOrder: userData.minOrder || "50",
        isOpen: userData.isOpen ?? true,
      });
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSave = () => {
    const storedUser = localStorage.getItem("bocao_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const updatedUser = { ...userData, ...settings };
      localStorage.setItem("bocao_user", JSON.stringify(updatedUser));
      if (userData.id) {
        localStorage.setItem(`bocao_user_${userData.id}`, JSON.stringify(updatedUser));
      }
      alert("✅ Configuración guardada exitosamente");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Configuración</h1>
        <p className="text-slate-600 mt-1">
          Administra la configuración de tu restaurante
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Restaurant Info */}
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Información del Restaurante
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nombre del Restaurante
              </label>
              <input
                type="text"
                name="restaurantName"
                value={settings.restaurantName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Dirección
              </label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none text-slate-900"
              />
            </div>
          </div>
        </section>

        {/* Delivery Settings */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Configuración de Entrega
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Costo de Envío ($)
              </label>
              <input
                type="number"
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pedido Mínimo ($)
              </label>
              <input
                type="number"
                name="minOrder"
                value={settings.minOrder}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-slate-900"
              />
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Estado</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isOpen"
              checked={settings.isOpen}
              onChange={handleInputChange}
              className="w-5 h-5 text-primary rounded focus:ring-primary"
            />
            <span className="text-slate-700">
              Restaurante abierto (los clientes pueden hacer pedidos)
            </span>
          </label>
        </section>

        {/* Save Button */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Save className="w-5 h-5" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}



