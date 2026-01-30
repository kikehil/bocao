// Nota: Este archivo es solo de referencia.
// En Next.js, el middleware debe estar en la raíz del proyecto como middleware.ts
// Este archivo muestra cómo proteger las rutas del dashboard

export { default } from "next/server";
export const config = {
  matcher: "/dashboard/:path*",
};


