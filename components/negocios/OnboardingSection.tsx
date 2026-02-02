import Image from "next/image";
import Link from "next/link";

export default function OnboardingSection() {
  return (
    <section className="py-12 bg-[#FFF7ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="/business-onboarding.jpg"
                alt="Equipo ayudando a configurar la tienda digital"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              ¿No le sabes a la tecnología? Nosotros sí.
            </h2>
            <p className="text-slate-700 mb-6 leading-relaxed">
              No te preocupes por subir fotos o configurar menús. Mándanos tu carta
              por WhatsApp y nuestro equipo configura tu tienda digital en 24 horas.
              Tú solo dedícate a cocinar.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              Empezar a recibir pedidos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

