"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

// Credenciales hardcodeadas (en producción usar env variables)
const ADMIN_CREDENTIALS = {
  username: "admin@bocao.com",
  password: "BocaoAdmin2026!",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error on input change
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simular un pequeño delay (como si fuera una API)
    setTimeout(() => {
      if (
        formData.username === ADMIN_CREDENTIALS.username &&
        formData.password === ADMIN_CREDENTIALS.password
      ) {
        // Login exitoso
        const adminSession = {
          username: formData.username,
          role: "super_admin",
          loginTime: new Date().toISOString(),
        };
        
        localStorage.setItem("bocao_admin_session", JSON.stringify(adminSession));
        router.push("/admin/overview");
      } else {
        // Credenciales incorrectas
        setError("Credenciales incorrectas. Acceso denegado.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE zNGgydjJoLTJ6bS0yIDJoMnYyaC0yem0tMiAyaDJ2MmgtMnptLTIgMmgydjJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo y Título */}
        <div className="text-center mb-8">
          <div className="inline-block bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-slate-700 mb-4">
            <Shield className="w-12 h-12 text-primary mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-400">
            Panel de Super Administrador
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700 p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-400 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username/Email */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Usuario / Email
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="admin@bocao.com"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder:text-slate-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:outline-none focus:border-primary transition-colors text-white placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-orange-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verificando...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Acceder al Panel
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-xl">
            <p className="text-xs text-slate-400 text-center">
              🔒 Área restringida solo para administradores autorizados
            </p>
          </div>
        </div>

        {/* Credenciales de Demo (SOLO PARA DESARROLLO - REMOVER EN PRODUCCIÓN) */}
        <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-xs text-amber-400 font-medium mb-2 text-center">
            🔑 Credenciales de Demo (DEV)
          </p>
          <div className="space-y-1 text-xs text-amber-300 font-mono">
            <p className="text-center">Usuario: admin@bocao.com</p>
            <p className="text-center">Password: BocaoAdmin2026!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

