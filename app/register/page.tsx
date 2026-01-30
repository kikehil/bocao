"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import WelcomeModal from "@/components/WelcomeModal";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Form state
  const [formData, setFormData] = useState({
    restaurantName: "",
    ownerName: "",
    whatsapp: "",
    email: "",
    password: "",
    plan: "basic",
  });

  // Modal state
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Get plan from URL query param
  useEffect(() => {
    const planParam = searchParams.get("plan");
    if (planParam === "pro" || planParam === "basic") {
      setFormData((prev) => ({ ...prev, plan: planParam }));
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar si el email ya está registrado
    const existingUsers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("bocao_user_")) {
        const userData = JSON.parse(localStorage.getItem(key) || "{}");
        existingUsers.push(userData);
      }
    }
    
    const emailExists = existingUsers.some((u) => u.email === formData.email);
    
    if (emailExists) {
      alert("❌ Este correo ya está registrado. Por favor usa otro o inicia sesión.");
      return;
    }
    
    // Guardar datos del usuario en localStorage
    const userData = {
      restaurantName: formData.restaurantName,
      ownerName: formData.ownerName,
      whatsapp: formData.whatsapp,
      email: formData.email,
      password: formData.password, // En producción NUNCA guardes passwords en plain text
      plan: formData.plan as "basic" | "pro",
      isNewUser: true,
      createdAt: new Date().toISOString(),
      id: Date.now().toString(), // ID único
    };
    
    // Guardar en múltiples claves para simular una base de datos
    localStorage.setItem(`bocao_user_${userData.id}`, JSON.stringify(userData));
    localStorage.setItem("bocao_user", JSON.stringify(userData)); // Sesión activa
    
    // ========== ADMIN ALERT ==========
    // Console log para el admin
    console.log(`
╔════════════════════════════════════════════════════════════╗
║              🚨 ADMIN ALERT - NEW BUSINESS REGISTERED      ║
╠════════════════════════════════════════════════════════════╣
║  Business Name: ${userData.restaurantName}
║  Owner: ${userData.ownerName}
║  Phone: ${userData.whatsapp}
║  Email: ${userData.email}
║  Plan: ${userData.plan.toUpperCase()}
║  Registered: ${new Date().toLocaleString()}
╚════════════════════════════════════════════════════════════╝
    `);
    
    // Guardar en lista de negocios pendientes para el admin
    const pendingBusinesses = JSON.parse(localStorage.getItem("bocao_admin_pending") || "[]");
    pendingBusinesses.push({
      ...userData,
      status: "pending", // pending, active, suspended
      notificationSent: false,
    });
    localStorage.setItem("bocao_admin_pending", JSON.stringify(pendingBusinesses));
    
    // Incrementar contador de alertas del admin
    const adminAlerts = parseInt(localStorage.getItem("bocao_admin_alerts") || "0");
    localStorage.setItem("bocao_admin_alerts", (adminAlerts + 1).toString());
    
    // Mostrar modal de bienvenida
    setShowWelcomeModal(true);
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    // Redirigir al dashboard después de cerrar el modal
    router.push("/dashboard/orders");
  };

  return (
    <>
      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        restaurantName={formData.restaurantName}
        onClose={handleWelcomeModalClose}
      />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/negocios" className="inline-block">
            <Image
              src="/logo.png"
              alt="Bocao"
              width={140}
              height={50}
              className="h-12 w-auto mx-auto"
              priority
            />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mt-4">
            Crea tu cuenta
          </h1>
          <p className="text-slate-600 mt-2">
            Comienza a gestionar tu restaurante sin comisiones
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Restaurant Name */}
            <div>
              <label
                htmlFor="restaurantName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nombre del Restaurante
              </label>
              <input
                type="text"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                required
                placeholder="Ej: Tacos El Rey"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Owner Name */}
            <div>
              <label
                htmlFor="ownerName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nombre del Dueño
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                required
                placeholder="Tu nombre completo"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                WhatsApp
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                required
                placeholder="+52 123 456 7890"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Selecciona tu Plan
              </label>
              <div className="space-y-3">
                {/* Plan Básico */}
                <label
                  className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.plan === "basic"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="basic"
                    checked={formData.plan === "basic"}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">
                        Plan Básico
                      </span>
                      <span className="text-lg font-bold text-slate-900">
                        $199<span className="text-sm font-normal text-slate-500">/mes</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Perfecto para empezar
                    </p>
                  </div>
                </label>

                {/* Plan Pro */}
                <label
                  className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.plan === "pro"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="pro"
                    checked={formData.plan === "pro"}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          Plan Pro
                        </span>
                        <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                          Más Popular
                        </span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        $499<span className="text-sm font-normal text-slate-500">/mes</span>
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Para restaurantes en crecimiento
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Crear Cuenta y Continuar
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Check className="w-4 h-4 text-green-500" />
              <span>No se requiere tarjeta de crédito</span>
            </div>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-slate-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}


