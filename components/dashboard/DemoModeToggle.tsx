"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

/**
 * Componente para desarrolladores: permite alternar entre modo demo y modo nuevo usuario
 * Eliminar en producción
 */
export default function DemoModeToggle() {
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("bocao_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // Si isNewUser es true o undefined, mostrar como nuevo
      setIsNewUser(userData.isNewUser !== false);
    }
  }, []);

  const toggleMode = () => {
    const storedUser = localStorage.getItem("bocao_user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      userData.isNewUser = !userData.isNewUser;
      localStorage.setItem("bocao_user", JSON.stringify(userData));
      setIsNewUser(userData.isNewUser);
      window.location.reload(); // Reload to apply changes
    }
  };

  const clearSession = () => {
    if (confirm("¿Seguro que quieres cerrar sesión y limpiar los datos?")) {
      localStorage.removeItem("bocao_user");
      window.location.href = "/negocios";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-xl border-2 border-gray-200 p-3">
      <div className="text-xs font-semibold text-slate-700 mb-2">
        🔧 Developer Tools
      </div>
      <div className="space-y-2">
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors w-full"
        >
          {isNewUser ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          {isNewUser ? "Ver con Datos" : "Ver Vacío"}
        </button>
        <button
          onClick={clearSession}
          className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors w-full"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

