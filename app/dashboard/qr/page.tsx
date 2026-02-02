"use client";

import { Download, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function QRCodePage() {
  const [restaurantSlug, setRestaurantSlug] = useState("mi-restaurante");
  const [restaurantName, setRestaurantName] = useState("Mi Menú");

  useEffect(() => {
    const storedUser = localStorage.getItem("bocao_user");
    if (!storedUser) return;
    const userData = JSON.parse(storedUser);
    const slug =
      userData.slug ||
      (userData.restaurantName ? slugify(userData.restaurantName) : null) ||
      userData.id ||
      "mi-restaurante";
    setRestaurantSlug(slug);
    setRestaurantName(userData.restaurantName || "Mi Menú");
  }, []);

  const menuUrl = useMemo(
    () => `https://bocao.app/${restaurantSlug}`,
    [restaurantSlug]
  );

  // Mock QR Code - In production, you would generate this using a library like qrcode.react
  const qrCodeImage = `data:image/svg+xml,${encodeURIComponent(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="300" fill="white"/>
      <rect x="20" y="20" width="60" height="60" fill="black"/>
      <rect x="100" y="20" width="40" height="40" fill="black"/>
      <rect x="160" y="20" width="60" height="60" fill="black"/>
      <rect x="20" y="100" width="40" height="40" fill="black"/>
      <rect x="80" y="100" width="20" height="20" fill="black"/>
      <rect x="120" y="100" width="20" height="20" fill="black"/>
      <rect x="160" y="100" width="60" height="40" fill="black"/>
      <rect x="240" y="100" width="40" height="40" fill="black"/>
      <rect x="20" y="160" width="60" height="60" fill="black"/>
      <rect x="100" y="180" width="40" height="20" fill="black"/>
      <rect x="160" y="160" width="60" height="60" fill="black"/>
      <rect x="240" y="180" width="40" height="20" fill="black"/>
      <rect x="100" y="240" width="20" height="20" fill="black"/>
      <rect x="140" y="240" width="20" height="20" fill="black"/>
      <rect x="180" y="240" width="40" height="20" fill="black"/>
      <rect x="240" y="240" width="40" height="20" fill="black"/>
    </svg>
  `)}`;

  const handleDownloadPDF = () => {
    // Mock PDF download - In production, generate actual PDF
    alert("Funcionalidad de descarga PDF próximamente");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mi Menú - ${restaurantName}`,
          text: "Escanea este código QR para ver nuestro menú",
          url: menuUrl,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(menuUrl);
      alert("URL copiada al portapapeles");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Mi Código QR</h1>
        <p className="text-slate-600 mt-1">
          Comparte tu menú digital con tus clientes
        </p>
      </div>

      {/* QR Code Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* QR Code */}
          <div className="flex-shrink-0">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-64 h-64"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Código QR del Menú
            </h2>
            <p className="text-slate-600 mb-6">
              Escanea este código para visitar tu menú:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <code className="text-sm text-slate-900 break-all">
                {menuUrl}
              </code>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Download className="w-5 h-5" />
                Descargar PDF
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-primary text-slate-700 hover:text-primary px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">
          💡 Cómo usar tu código QR
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Imprime el código QR y colócalo en tu restaurante</li>
          <li>• Los clientes pueden escanearlo con su teléfono</li>
          <li>• Serán dirigidos directamente a tu menú digital</li>
          <li>• Pueden hacer pedidos sin necesidad de descargar una app</li>
        </ul>
      </div>
    </div>
  );
}






