"use client";

import MobileLayout from "@/components/MobileLayout";
import { User, MapPin, Phone, Mail, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <MobileLayout>
      <div className="px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Mi Perfil</h1>
          <p className="text-slate-600">Gestiona tu información personal</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Usuario</h2>
              <p className="text-slate-500">usuario@ejemplo.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-500">Dirección</div>
                <div className="font-medium">Casa - Calle 10...</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-500">Teléfono</div>
                <div className="font-medium">+52 123 456 7890</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Mail className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-500">Email</div>
                <div className="font-medium">usuario@ejemplo.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="font-medium text-slate-900">Editar Perfil</div>
            <div className="text-sm text-slate-500">Actualiza tu información personal</div>
          </button>
          <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="font-medium text-slate-900">Direcciones Guardadas</div>
            <div className="text-sm text-slate-500">Gestiona tus direcciones de entrega</div>
          </button>
          <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors">
            <div className="font-medium text-slate-900">Notificaciones</div>
            <div className="text-sm text-slate-500">Configura tus preferencias</div>
          </button>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-4 rounded-xl font-medium hover:bg-red-100 transition-colors">
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </MobileLayout>
  );
}






