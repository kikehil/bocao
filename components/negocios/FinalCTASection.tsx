import Image from "next/image";
import Link from "next/link";

export default function FinalCTASection() {
  const whatsappUrl =
    "https://wa.me/528181190257?text=Hola,%20tengo%20dudas%20sobre%20Bocao";

  return (
    <section id="registro" className="relative overflow-hidden py-12 bg-slate-900">
      <div className="absolute inset-0">
        <Image
          src="/business-cta.jpg"
          alt="Restaurante listo para la nueva era del delivery"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Únete a la nueva era del delivery en Pánuco.
            </h2>
            <p className="text-slate-200 max-w-2xl mb-6">
              Profesionaliza tu operación con una App lista para crecer contigo y tu equipo.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-primary hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Unirme y Empezar a recibir pedidos
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border-2 border-white/40 hover:border-white text-white px-7 py-4 rounded-2xl font-semibold transition-all bg-white/10"
              >
                ¿Tienes dudas? Habla con nosotros
              </a>
            </div>
          </div>

          <div className="w-full lg:w-5/12 bg-white/10 border border-white/20 rounded-2xl p-6 backdrop-blur">
            <h3 className="text-white text-lg font-bold mb-4">
              Registro rápido con acompañamiento real
            </h3>
            <ul className="space-y-3 text-sm text-slate-100">
              <li>Configuramos tu menú en 24 horas.</li>
              <li>Activamos tu App y tu panel en un solo día.</li>
              <li>Soporte local para que todo fluya.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

