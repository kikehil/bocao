# Bocao - Web App

Plataforma de entrega de comida local (PWA) con modelo sin comisiones para restaurantes.

## 🚀 Características

- **Next.js 15** con App Router
- **Tailwind CSS** con enfoque mobile-first
- **PWA** (Progressive Web App)
- **Diseño moderno** inspirado en Uber Eats / Rappi
- **Interfaz móvil optimizada** con navegación inferior y header sticky

## 📦 Instalación

```bash
npm install
```

## 🏃 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
├── app/              # App Router de Next.js
│   ├── layout.tsx   # Layout principal
│   ├── page.tsx     # Página de inicio
│   └── globals.css  # Estilos globales
├── components/       # Componentes React
│   ├── MobileLayout.tsx
│   ├── Header.tsx
│   ├── BottomNavigation.tsx
│   ├── HomePage.tsx
│   ├── HeroCarousel.tsx
│   ├── CategoriesRail.tsx
│   ├── RecommendedSection.tsx
│   ├── FiltersBar.tsx
│   └── RestaurantFeed.tsx
├── data/            # Datos mock
│   └── restaurants.js
└── lib/             # Utilidades
    └── utils.ts
```

## 🎨 Paleta de Colores

- **Primario**: `#F97316` (Orange)
- **Fondo**: `#F9FAFB` (Gray-50)
- **Texto Principal**: `#0F172A` (Slate-900)
- **Texto Secundario**: `#64748B` (Slate-500)

## 📱 Características de UI

- Header sticky con selector de ubicación y búsqueda
- Carrusel de banners promocionales
- Categorías con scroll horizontal
- Sección de productos recomendados
- Filtros inteligentes
- Feed de restaurantes con cards grandes
- Navegación inferior fija

## 🛠️ Tecnologías

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React (Iconos)



