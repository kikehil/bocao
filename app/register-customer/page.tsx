"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, AlertCircle, Check } from "lucide-react";

export default function CustomerRegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    try {
      // Validations
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Las contraseñas no coinciden");
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setErrorMessage("La contraseña debe tener al menos 6 caracteres");
        setIsLoading(false);
        return;
      }

      // Check if email already exists
      const existingCustomers = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("bocao_customer_")) {
          const customerData = JSON.parse(localStorage.getItem(key) || "{}");
          existingCustomers.push(customerData);
        }
      }

      const emailExists = existingCustomers.some((c) => c.email === formData.email);
      if (emailExists) {
        setErrorMessage("Este correo ya está registrado");
        setIsLoading(false);
        return;
      }

      // Create customer account
      const customerId = `customer_${Date.now()}`;
      const customerData = {
        id: customerId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
        savedAddresses: [],
        favoriteRestaurants: [],
        orderHistory: [],
      };

      // Save to localStorage
      localStorage.setItem(`bocao_customer_${customerId}`, JSON.stringify(customerData));
      localStorage.setItem("bocao_customer", JSON.stringify(customerData));

      // Redirect to home with success message
      router.push("/?registered=true");
    } catch (error) {
      setErrorMessage("Ocurrió un error. Por favor intenta nuevamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Bocao"
              width={140}
              height={50}
              className="h-12 w-auto mx-auto"
              priority
            />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-6">
            Crea tu cuenta 🎉
          </h1>
          <p className="text-slate-600 mt-2">
            Guarda tus direcciones y haz pedidos más rápido
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Juan Pérez"
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

            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="1234567890"
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
                placeholder="Mínimo 6 caracteres"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Repite tu contraseña"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Benefits List */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-900 mb-2">
                ✨ Beneficios de crear cuenta:
              </p>
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Guarda tus direcciones favoritas</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Historial de pedidos</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Checkout más rápido</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-slate-600">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login-customer"
              className="text-primary font-semibold hover:underline"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>

        {/* Skip Link */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Saltar y ordenar como invitado →
          </Link>
        </div>
      </div>
    </div>
  );
}

