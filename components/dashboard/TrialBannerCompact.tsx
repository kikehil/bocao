"use client";

import { useState } from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Versión compacta del banner de prueba
 * Usa esta si prefieres un diseño más minimalista
 */
export default function TrialBannerCompact() {
  const [isVisible, setIsVisible] = useState(true);
  const daysLeft = 6;

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Message */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Prueba Premium:</span> Te quedan{" "}
              <span className="font-bold">{daysLeft} días</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/settings?tab=billing"
              className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              Activar
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-amber-200 rounded transition-colors"
            >
              <X className="w-4 h-4 text-amber-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



