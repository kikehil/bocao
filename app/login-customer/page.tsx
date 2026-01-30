"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, AlertCircle, ShoppingBag } from "lucide-react";

export default function CustomerLoginPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const customerData = localStorage.getItem("bocao_customer");
    if (customerData) {
      router.push("/");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);
    
    try {
      // Get all registered customers from localStorage
      const customers = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("bocao_customer_")) {
          const customerData = JSON.parse(localStorage.getItem(key) || "{}");
          customers.push(customerData);
        }
      }
      
      // Validate credentials
      const customer = customers.find(
        (c) => c.email === formData.email && c.password === formData.password
      );
      
      if (customer) {
        // Login successful
        localStorage.setItem("bocao_customer", JSON.stringify(customer));
        router.push("/");
      } else {
        setErrorMessage("Correo o contraseña incorrectos. Verifica tus datos.");
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error. Por favor intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
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
            ¡Bienvenido de nuevo! 👋
          </h1>
          <p className="text-slate-600 mt-2">
            Inicia sesión para guardar tus favoritos
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>
                <Link
                  href="#"
                  className="text-xs text-primary hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Funcionalidad próximamente");
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-slate-500 font-medium">
                o
              </span>
            </div>
          </div>

          {/* Guest Mode Button */}
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-slate-700 font-medium text-center"
          >
            <ShoppingBag className="w-5 h-5" />
            Continuar como Invitado
          </Link>

          <p className="text-xs text-center text-slate-500 mt-3">
            Puedes ordenar sin crear cuenta
          </p>
        </div>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-slate-600">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register-customer"
              className="text-primary font-semibold hover:underline"
            >
              Crear Cuenta
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

