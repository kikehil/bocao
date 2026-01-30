"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente para proteger rutas del dashboard
 * Redirige a /login si no hay sesión activa
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const checkAuth = () => {
      const storedUser = localStorage.getItem("bocao_user");
      
      if (!storedUser) {
        // No hay sesión, redirigir a login
        router.push("/login");
        return;
      }

      try {
        const userData = JSON.parse(storedUser);
        if (userData.email) {
          // Sesión válida
          setIsAuthenticated(true);
        } else {
          // Datos inválidos
          router.push("/login");
        }
      } catch (e) {
        // Error al parsear, limpiar y redirigir
        localStorage.removeItem("bocao_user");
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Mientras redirige
  }

  return <>{children}</>;
}


