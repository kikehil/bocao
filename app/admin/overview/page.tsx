"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Store,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageCircle,
  LogOut,
  Shield,
  BarChart3,
} from "lucide-react";

interface Business {
  id: string;
  restaurantName: string;
  ownerName: string;
  whatsapp: string;
  email: string;
  plan: string;
  status: string;
  createdAt: string;
}

interface Stats {
  totalBusinesses: number;
  totalOrders: number;
  totalCustomers: number;
  pendingBusinesses: number;
}

export default function AdminOverviewPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalBusinesses: 0,
    totalOrders: 0,
    totalCustomers: 0,
    pendingBusinesses: 0,
  });
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [ordersPerDay, setOrdersPerDay] = useState<number[]>([]);

  useEffect(() => {
    // Check auth
    const adminSession = localStorage.getItem("bocao_admin_session");
    if (!adminSession) {
      router.push("/admin/login");
      return;
    }

    // Load data
    loadAdminData();
  }, [router]);

  const loadAdminData = () => {
    // Get all businesses
    const allBusinesses: Business[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("bocao_user_")) {
        const businessData = JSON.parse(localStorage.getItem(key) || "{}");
        allBusinesses.push({
          ...businessData,
          status: businessData.status || "active",
        });
      }
    }

    // Get pending businesses
    const pending = JSON.parse(localStorage.getItem("bocao_admin_pending") || "[]");

    // Get all customers
    const allCustomers = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("bocao_customer_")) {
        allCustomers.push(JSON.parse(localStorage.getItem(key) || "{}"));
      }
    }

    // Mock orders count (en producción vendría de DB)
    const mockTotalOrders = Math.floor(Math.random() * 500) + 150;

    // Mock orders per day for last 7 days
    const mockOrdersPerDay = Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 50) + 10
    );

    setStats({
      totalBusinesses: allBusinesses.length,
      totalOrders: mockTotalOrders,
      totalCustomers: allCustomers.length,
      pendingBusinesses: pending.length,
    });

    setBusinesses(allBusinesses);
    setOrdersPerDay(mockOrdersPerDay);
    setIsLoading(false);
  };

  const handleLogout = () => {
    if (confirm("¿Cerrar sesión del panel de administrador?")) {
      localStorage.removeItem("bocao_admin_session");
      router.push("/admin/login");
    }
  };

  const handleContactBusiness = (business: Business) => {
    const message = `Hola ${business.ownerName}, te contacto desde Bocao. 

🏪 Restaurante: ${business.restaurantName}

¿En qué puedo ayudarte?`;

    const whatsappUrl = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: "bg-green-500/20 text-green-400 border-green-500/30",
      pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      suspended: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    const labels = {
      active: "Activo",
      pending: "Pendiente",
      suspended: "Suspendido",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
          styles[status as keyof typeof styles] || styles.active
        }`}
      >
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-slate-400">Panel de Control</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        {stats.pendingBusinesses > 0 && (
          <div className="mb-6 bg-amber-500/10 border-2 border-amber-500/30 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <p className="text-amber-400 font-semibold">
                Tienes {stats.pendingBusinesses} negocio(s) pendiente(s) de
                verificación
              </p>
              <p className="text-sm text-amber-400/80">
                Revisa la sección "Directorio de Negocios" más abajo
              </p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Businesses */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Store className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Negocios</p>
            <p className="text-3xl font-bold text-white">
              {stats.totalBusinesses}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Restaurantes registrados
            </p>
          </div>

          {/* Total Orders */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Órdenes</p>
            <p className="text-3xl font-bold text-white">{stats.totalOrders}</p>
            <p className="text-xs text-slate-500 mt-2">
              Pedidos procesados (global)
            </p>
          </div>

          {/* Total Customers */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Total Clientes</p>
            <p className="text-3xl font-bold text-white">
              {stats.totalCustomers}
            </p>
            <p className="text-xs text-slate-500 mt-2">Usuarios registrados</p>
          </div>

          {/* Pending Businesses */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-500/20 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
              <AlertCircle className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-slate-400 text-sm mb-1">Pendientes</p>
            <p className="text-3xl font-bold text-white">
              {stats.pendingBusinesses}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Negocios por verificar
            </p>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">
              Órdenes por Día (Últimos 7 Días)
            </h2>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-40">
            {ordersPerDay.map((count, index) => {
              const maxOrders = Math.max(...ordersPerDay);
              const height = (count / maxOrders) * 100;
              const daysAgo = 6 - index;
              const date = new Date();
              date.setDate(date.getDate() - daysAgo);

              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-orange-600 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
                    style={{ height: `${height}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {count} pedidos
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    {date.toLocaleDateString("es-ES", {
                      weekday: "short",
                    })}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Businesses Directory Table */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white">
              Directorio de Negocios
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Lista de todos los restaurantes registrados en la plataforma
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Restaurante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Dueño
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {businesses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      No hay negocios registrados aún
                    </td>
                  </tr>
                ) : (
                  businesses.map((business) => (
                    <tr
                      key={business.id}
                      className="hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {business.restaurantName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {business.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-300">
                          {business.ownerName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-300 font-mono">
                          {business.whatsapp}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            business.plan === "pro"
                              ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                              : "bg-slate-600/50 text-slate-300 border border-slate-600"
                          }`}
                        >
                          {business.plan === "pro" ? "Premium" : "Básico"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(business.status)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleContactBusiness(business)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Contactar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

