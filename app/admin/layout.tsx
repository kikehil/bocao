"use client";

import Link from "next/link";
import { Shield, Users, BarChart3 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:w-64 border-r border-white/10 bg-slate-950">
        <div className="px-6 py-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">
              God Mode
            </p>
            <p className="text-lg font-bold">Bocao Admin</p>
          </div>
        </div>
        <nav className="px-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white"
          >
            <BarChart3 className="w-5 h-5 text-primary" />
            Panel General
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70">
            <Users className="w-5 h-5" />
            Restaurantes
          </div>
        </nav>
        <div className="mt-auto px-6 py-6 text-xs text-white/50">
          Área restringida para el dueño de la plataforma.
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">
                Super Admin
              </p>
              <h1 className="text-xl font-bold">Panel de Administración Bocao</h1>
            </div>
            <Link
              href="/"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Volver al sitio
            </Link>
          </div>
        </header>

        <main className="px-6 py-8 bg-slate-950 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

