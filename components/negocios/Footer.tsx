"use client";

import Link from "next/link";

const footerLinks = [
  { name: "Inicio", href: "/" },
  { name: "Precios", href: "#precios" },
  { name: "Contacto", href: "#contacto" },
  { name: "Aviso de Privacidad", href: "#privacidad" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 mb-4">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-slate-600 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Bottom Text */}
        <div className="text-center">
          <p className="text-sm text-slate-600">
            Hecho con <span className="text-red-500">❤️</span> para los negocios de Pánuco, Veracruz
          </p>
        </div>
      </div>
    </footer>
  );
}

