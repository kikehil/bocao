"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileLayout from "@/components/MobileLayout";
import { User, MapPin, Phone, Mail, LogOut, LogIn, Heart, Clock, Settings, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  savedAddresses?: string[];
  favoriteRestaurants?: string[];
  orderHistory?: any[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const customerData = localStorage.getItem("bocao_customer");
    if (customerData) {
      setCustomer(JSON.parse(customerData));
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
      localStorage.removeItem("bocao_customer");
      setCustomer(null);
      router.push("/");
    }
  };

  if (isLoading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600">Cargando...</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // ============ STATE A: GUEST MODE (Not Logged In) ============
  if (!customer) {
    return (
      <MobileLayout>
        <div className="px-4 py-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary/10 via-orange-50 to-white rounded-3xl p-8 mb-6 text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <ShoppingBag className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              ¡Bienvenido! 👋
            </h1>
            <p className="text-slate-600 mb-6">
              Guarda tus direcciones y favoritos creando una cuenta
            </p>
            
            {/* Benefits */}
            <div className="space-y-3 mb-6 text-left">
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Direcciones guardadas
                  </div>
                  <div className="text-xs text-slate-500">
                    Paga más rápido sin escribir cada vez
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Restaurantes favoritos
                  </div>
                  <div className="text-xs text-slate-500">
                    Accede rápidamente a tus lugares preferidos
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white rounded-xl p-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    Historial de pedidos
                  </div>
                  <div className="text-xs text-slate-500">
                    Reordena tus platillos favoritos en un click
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Link
                href="/login-customer"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg"
              >
                <LogIn className="w-5 h-5" />
                Iniciar Sesión / Registrarse
              </Link>
              
              <Link
                href="/"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors block"
              >
                Continuar como invitado →
              </Link>
            </div>
          </div>

          {/* Guest Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-slate-900 mb-4">
              ℹ️ Información
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Puedes realizar pedidos sin crear cuenta, pero no podrás guardar 
              tus direcciones ni ver el historial de órdenes.
            </p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  // ============ STATE B: LOGGED IN ============
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
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {customer.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-900">{customer.name}</h2>
              <p className="text-slate-500 text-sm">{customer.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700">
              <Phone className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-500">Teléfono</div>
                <div className="font-medium">{customer.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <MapPin className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-500">Direcciones guardadas</div>
                <div className="font-medium">
                  {customer.savedAddresses?.length || 0} dirección(es)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Heart className="w-5 h-5 text-slate-400" />
              <div>
                <div className="text-sm text-slate-500">Favoritos</div>
                <div className="font-medium">
                  {customer.favoriteRestaurants?.length || 0} restaurante(s)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          <Link 
            href="/my-orders"
            className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 flex items-center justify-between"
          >
            <div>
              <div className="font-medium text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Mis Pedidos
              </div>
              <div className="text-sm text-slate-500">Ver historial de órdenes</div>
            </div>
            <span className="text-slate-400">→</span>
          </Link>
          
          <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Direcciones Guardadas
              </div>
              <div className="text-sm text-slate-500">Gestiona tus direcciones de entrega</div>
            </div>
            <span className="text-slate-400">→</span>
          </button>
          
          <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Mis Favoritos
              </div>
              <div className="text-sm text-slate-500">Restaurantes que te encantan</div>
            </div>
            <span className="text-slate-400">→</span>
          </button>
          
          <button className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Configuración
              </div>
              <div className="text-sm text-slate-500">Notificaciones y privacidad</div>
            </div>
            <span className="text-slate-400">→</span>
          </button>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-4 rounded-xl font-medium hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>
      </div>
    </MobileLayout>
  );
}






