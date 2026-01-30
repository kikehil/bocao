# 📋 Instrucciones para Agregar el Logo de Bocao

## 1. Guardar el Logo

Guarda la imagen del logo en la carpeta `/public` con el nombre `logo-bocao.png`:

```
D:\WEB\DELIGO\
  └── public\
      └── logo-bocao.png
```

**Importante:** El nombre del archivo debe ser exactamente `logo-bocao.png` o deberás actualizar las rutas en los componentes.

## 2. Ubicaciones donde Aparece el Logo

El logo ha sido integrado en **4 componentes principales**:

### ✅ Header Principal (App del Cliente)
- **Archivo:** `components/Header.tsx`
- **Ruta:** `/` (Home), `/[slug]` (Restaurantes), `/checkout`, etc.
- **Tamaño:** 80x28px (altura 28px)
- **Posición:** Parte superior izquierda, antes del selector de ubicación

### ✅ Navbar Landing Page (B2B)
- **Archivo:** `components/negocios/Navbar.tsx`
- **Ruta:** `/negocios`
- **Tamaño:** 100x35px (altura 32px)
- **Posición:** Centrado en el navbar

### ✅ Sidebar Dashboard (Panel de Negocios)
- **Archivo:** `components/dashboard/Sidebar.tsx`
- **Ruta:** `/dashboard/*` (todas las páginas del dashboard)
- **Tamaño:** 120x42px (altura 40px)
- **Posición:** Parte superior del sidebar, centrado

### ✅ Footer Landing Page
- **Archivo:** `components/negocios/Footer.tsx`
- **Ruta:** `/negocios` (parte inferior)
- **Nota:** Ya está preparado para usar el logo si es necesario

## 3. Formatos Recomendados

- **Formato preferido:** PNG con fondo transparente
- **Dimensiones originales:** Mantén la proporción del logo
- **Peso:** Optimiza la imagen para web (< 100KB)
- **Alternativa:** También puedes usar SVG para mejor calidad

## 4. Si Necesitas Cambiar el Nombre del Archivo

Si guardas el logo con otro nombre (ej: `bocao-logo.png`), actualiza estas líneas:

**En Header.tsx:**
```tsx
src="/bocao-logo.png"  // Cambia aquí
```

**En Navbar.tsx:**
```tsx
src="/bocao-logo.png"  // Cambia aquí
```

**En Sidebar.tsx:**
```tsx
src="/bocao-logo.png"  // Cambia aquí
```

## 5. Verificación

Después de guardar el logo, verifica que aparezca en:

1. **Home:** `http://localhost:3001/`
2. **Landing B2B:** `http://localhost:3001/negocios`
3. **Dashboard:** `http://localhost:3001/dashboard/orders`

Si no aparece, verifica:
- ✅ El nombre del archivo es correcto
- ✅ El archivo está en `/public`
- ✅ Reiniciaste el servidor de desarrollo

## 6. Optimización (Opcional)

Para mejorar el rendimiento:

```bash
# Instalar herramienta de optimización de imágenes
npm install sharp

# Next.js optimizará automáticamente las imágenes usando el componente Image
```

## 7. Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que la ruta sea `/logo-bocao.png` (sin `/public`)
3. Asegúrate de que el servidor esté corriendo
4. Limpia el caché del navegador (Ctrl + Shift + R)



