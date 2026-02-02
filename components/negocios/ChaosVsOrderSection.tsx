import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ChaosVsOrderSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Del caos al orden en cada pedido
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Profesionaliza tu atención y cocina con un flujo claro y sin estrés.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex lg:items-center">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 mb-3">
                El Caos Actual
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>Mensajes perdidos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>Direcciones confusas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>Preguntas repetitivas de precios.</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>Errores en la cocina.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="order-2 lg:order-none">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/business-compare.jpg"
                alt="Comparación de caos versus orden en pedidos"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="bg-[#FFF7ED] border border-primary/20 rounded-2xl p-6 flex lg:items-center">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 mb-3">
                El Orden Bocao
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span>Menú digital siempre visible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span>Direcciones exactas con GPS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span>Comandas claras directas a cocina.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span>Clientes felices.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

