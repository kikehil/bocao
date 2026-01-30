"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import TrialBanner from "@/components/dashboard/TrialBanner";
import DemoModeToggle from "@/components/dashboard/DemoModeToggle";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Debug: Verificar estado de la sesión en cada carga del dashboard
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      const storedUser = localStorage.getItem("bocao_user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        console.log("🔍 Dashboard - Estado del usuario:", {
          restaurantName: userData.restaurantName,
          isNewUser: userData.isNewUser,
          shouldShowOnboarding: userData.isNewUser !== false,
        });
      }
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <main className="lg:pl-64">
          {/* Trial Banner - Appears at top for users in trial mode */}
          <TrialBanner />
          
          {/* Main Content */}
          <div className="p-6">{children}</div>
        </main>

        {/* Developer Tools - Remove in production */}
        <DemoModeToggle />
      </div>
    </ProtectedRoute>
  );
}
