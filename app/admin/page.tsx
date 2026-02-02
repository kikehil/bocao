"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, Clock, Store } from "lucide-react";
import adminEmails from "@/data/admins.json";

type AdminRestaurant = {
  id: string;
  restaurantName: string;
  ownerName: string;
  whatsapp: string;
  email: string;
  plan: "digital" | "impulso";
  createdAt?: string;
  isNew: boolean;
};

const TRIAL_DAYS = 15;
const NEW_HOURS = 24;

const formatPlanName = (plan: AdminRestaurant["plan"]) =>
  plan === "impulso" ? "Socio Impulso" : "Socio Digital";

const isWithinHours = (dateValue: string | undefined, hours: number) => {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  return Date.now() - date.getTime() < hours * 60 * 60 * 1000;
};

const formatDate = (dateValue?: string) => {
  if (!dateValue) return "Sin fecha";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("bocao_user");
    if (!storedUser) {
      router.replace("/");
      return;
    }

    const currentUser = JSON.parse(storedUser);
    const normalizedEmail = (currentUser.email || "").toLowerCase();
    const isAdminEmail = adminEmails.includes(normalizedEmail);
    const isAdminRole = currentUser.role === "ADMIN";

    if (isAdminEmail && !isAdminRole) {
      const updatedUser = { ...currentUser, role: "ADMIN" };
      localStorage.setItem("bocao_user", JSON.stringify(updatedUser));
    }

    if (!isAdminEmail && !isAdminRole) {
      router.replace("/");
      return;
    }

    const users: AdminRestaurant[] = [];
    const seenIds = new Set<string>();

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("bocao_user_")) continue;

      const rawUser = localStorage.getItem(key);
      if (!rawUser) continue;

      try {
        const userData = JSON.parse(rawUser);
        if (!userData.id || seenIds.has(userData.id)) continue;
        seenIds.add(userData.id);

        const createdAt = userData.createdAt;

        users.push({
          id: userData.id,
          restaurantName: userData.restaurantName || "Sin nombre",
          ownerName: userData.ownerName || "Sin dueño",
          whatsapp: userData.whatsapp || "Sin WhatsApp",
          email: userData.email || "Sin email",
          plan: userData.plan === "impulso" ? "impulso" : "digital",
          createdAt,
          isNew: isWithinHours(createdAt, NEW_HOURS),
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }

    const activeUserId = currentUser.id;
    if (activeUserId && !seenIds.has(activeUserId)) {
      users.push({
        id: activeUserId,
        restaurantName: currentUser.restaurantName || "Sin nombre",
        ownerName: currentUser.ownerName || "Sin dueño",
        whatsapp: currentUser.whatsapp || "Sin WhatsApp",
        email: currentUser.email || "Sin email",
        plan: currentUser.plan === "impulso" ? "impulso" : "digital",
        createdAt: currentUser.createdAt,
        isNew: isWithinHours(currentUser.createdAt, NEW_HOURS),
      });
    }

    let ordersCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !key.startsWith("bocao_orders_")) continue;
      const storedOrders = localStorage.getItem(key);
      if (!storedOrders) continue;
      try {
        const orders = JSON.parse(storedOrders);
        ordersCount += Array.isArray(orders) ? orders.length : 0;
      } catch (error) {
        console.error("Error parsing orders:", error);
      }
    }

    users.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });

    setRestaurants(users);
    setTotalOrders(ordersCount);
  }, [router]);

  const kpis = useMemo(() => {
    const totalBusinesses = restaurants.length;
    const inTrial = restaurants.filter((r) =>
      isWithinHours(r.createdAt, TRIAL_DAYS * 24)
    ).length;

    return { totalBusinesses, inTrial, totalOrders };
  }, [restaurants, totalOrders]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">
          Panel de Administración Bocao
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-white/60">Total Negocios</p>
            </div>
            <p className="text-3xl font-bold">{kpis.totalBusinesses}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-sm text-white/60">En Prueba</p>
            </div>
            <p className="text-3xl font-bold">{kpis.inTrial}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm text-white/60">Total Pedidos</p>
            </div>
            <p className="text-3xl font-bold">{kpis.totalOrders}</p>
          </div>
        </div>
      </section>

      <section className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/10">
          <h3 className="text-lg font-semibold">Negocios Registrados</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/60">
              <tr>
                <th className="text-left px-6 py-3 font-medium">ID</th>
                <th className="text-left px-6 py-3 font-medium">
                  Nombre del Restaurante
                </th>
                <th className="text-left px-6 py-3 font-medium">Nombre Dueño</th>
                <th className="text-left px-6 py-3 font-medium">
                  Email / WhatsApp
                </th>
                <th className="text-left px-6 py-3 font-medium">Plan</th>
                <th className="text-left px-6 py-3 font-medium">
                  Fecha Registro
                </th>
              </tr>
            </thead>
            <tbody>
              {restaurants.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-white/60"
                  >
                    Aún no hay restaurantes registrados.
                  </td>
                </tr>
              ) : (
                restaurants.map((restaurant) => (
                  <tr
                    key={restaurant.id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white/70">{restaurant.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold">{restaurant.restaurantName}</p>
                    </td>
                    <td className="px-6 py-4">{restaurant.ownerName}</td>
                    <td className="px-6 py-4">
                      <div className="text-white/80">{restaurant.email}</div>
                      <div className="text-xs text-white/50">
                        {restaurant.whatsapp}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-xs font-semibold text-white bg-white/10 px-3 py-1 rounded-full">
                        {formatPlanName(restaurant.plan)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white/80">
                          {formatDate(restaurant.createdAt)}
                        </span>
                        {restaurant.isNew && (
                          <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

