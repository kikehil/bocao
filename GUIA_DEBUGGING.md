# 🔧 Guía de Debugging - Bocao

## Problema: "Después de registrar muestra datos de Burger House"

### Pasos de Verificación

#### 1. Abrir la Consola del Navegador
- **Chrome/Edge**: `F12` o `Ctrl+Shift+I`
- **Firefox**: `F12` o `Ctrl+Shift+K`

#### 2. Verificar la Sesión Actual

En la consola del navegador, ejecuta:

```javascript
// Ver datos del usuario actual
JSON.parse(localStorage.getItem("bocao_user"))
```

**Deberías ver algo como:**
```json
{
  "restaurantName": "Tu Restaurante",
  "ownerName": "Tu Nombre",
  "email": "tu@email.com",
  "whatsapp": "+52...",
  "password": "...",
  "plan": "pro",
  "isNewUser": true,  ← DEBE SER true
  "createdAt": "2026-01-29...",
  "id": "1738..."
}
```

#### 3. Si `isNewUser` NO es `true`

Forzar el valor correcto:

```javascript
// Obtener usuario
let user = JSON.parse(localStorage.getItem("bocao_user"));

// Corregir el flag
user.isNewUser = true;

// Guardar
localStorage.setItem("bocao_user", JSON.stringify(user));

// Recargar página
location.reload();
```

#### 4. Limpiar Sesión Completamente

Si sigue sin funcionar:

```javascript
// Limpiar todo
localStorage.clear();

// O solo Bocao
localStorage.removeItem("bocao_user");

// Ir al registro
location.href = "/register";
```

---

## Herramienta de Debugging Incluida

He agregado una función de debugging. En la consola del navegador:

```javascript
debugSession()
```

**Salida esperada:**
```
🔍 Bocao - Debug de Sesión
✅ Sesión activa encontrada:
┌─────────────────────────┬──────────────────┐
│ Nombre del Restaurante  │ Tu Restaurante   │
│ Dueño                   │ Tu Nombre        │
│ Email                   │ tu@email.com     │
│ Es Usuario Nuevo        │ SÍ ✅            │
└─────────────────────────┴──────────────────┘

👥 Usuarios registrados:
  - test@bocao.com (Tacos El Rey)
  - otro@email.com (Pizza Pepe)
Total: 2 usuario(s) registrado(s)
```

---

## Verificar qué se está mostrando

### Dashboard de Órdenes (`/dashboard/orders`)

✅ **Correcto para usuario nuevo:**
```
┌────────────────────────────────┐
│ 🎉 ¡Bienvenido a Bocao!       │
│                                │
│ 1. ⚙️  Configura tu restaurante│
│ 2. 🍔 Agrega tu primer producto│
│ 3. 📱 Comparte tu código QR    │
└────────────────────────────────┘
```

❌ **Incorrecto (bug):**
```
Kanban vacío sin onboarding
```

### Editor de Menú (`/dashboard/menu`)

✅ **Correcto para usuario nuevo:**
```
┌────────────────────────────────┐
│         🍽️                     │
│   Tu menú está vacío          │
│                                │
│ [+ Agregar tu Primer Producto] │
└────────────────────────────────┘
```

❌ **Incorrecto (bug):**
```
Tabla con productos:
- Classic Burger
- Cheese Burger
- etc.
```

---

## Solución Rápida

### Opción 1: Usar el Developer Tools

En el dashboard, en la esquina inferior derecha:
1. Click en "🔧 Developer Tools"
2. Click en "Ver Vacío"
3. Recarga la página

### Opción 2: Código en Consola

```javascript
// Forzar modo nuevo usuario
let user = JSON.parse(localStorage.getItem("bocao_user"));
user.isNewUser = true;
localStorage.setItem("bocao_user", JSON.stringify(user));
location.reload();
```

### Opción 3: Registro Limpio

```javascript
// Limpiar todo y empezar de cero
localStorage.clear();
location.href = "/register";
```

---

## Cambios Realizados en el Código

He actualizado la lógica para que:

### Antes (❌ Bug):
```typescript
setIsNewUser(userData.isNewUser || false);
// Si isNewUser es undefined → false (muestra datos mock)
```

### Ahora (✅ Correcto):
```typescript
const userIsNew = userData.isNewUser !== false;
setIsNewUser(userIsNew);
// Si isNewUser es undefined o true → true (muestra vacío)
// Solo si isNewUser === false → false (muestra datos mock)
```

---

## Testing

### Test Completo

1. **Abrir en incógnito** (para no tener caché)
2. Ir a `http://localhost:3000/register`
3. Registrar nuevo usuario:
   - Nombre: "Test Restaurant"
   - Email: "test@nuevo.com"
   - Password: "test123456"
4. Después del registro → Deberías ver:
   - ✅ Banner de bienvenida
   - ✅ Menú vacío
   - ✅ Sin productos de Burger House

---

## Consola del Navegador - Comandos Útiles

```javascript
// Ver usuario actual
JSON.parse(localStorage.getItem("bocao_user"))

// Ver todos los usuarios
for(let i=0; i<localStorage.length; i++) {
  const key = localStorage.key(i);
  if(key.startsWith("bocao_user_")) {
    console.log(JSON.parse(localStorage.getItem(key)));
  }
}

// Forzar usuario nuevo
let u = JSON.parse(localStorage.getItem("bocao_user"));
u.isNewUser = true;
localStorage.setItem("bocao_user", JSON.stringify(u));
location.reload();

// Forzar usuario con datos (para testing)
let u = JSON.parse(localStorage.getItem("bocao_user"));
u.isNewUser = false;
localStorage.setItem("bocao_user", JSON.stringify(u));
location.reload();

// Debugging completo
debugSession()
```

---

## Si el problema persiste

1. Abre DevTools (`F12`)
2. Ve a la pestaña "Console"
3. Ejecuta: `debugSession()`
4. Copia toda la salida
5. Comparte el resultado para revisarlo


