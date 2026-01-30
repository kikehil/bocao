/**
 * Utilidad de debugging para verificar el estado de la sesión
 * Ejecuta en la consola del navegador: debugSession()
 */

export function debugSession() {
  console.group("🔍 Bocao - Debug de Sesión");
  
  const storedUser = localStorage.getItem("bocao_user");
  
  if (!storedUser) {
    console.log("❌ No hay sesión activa");
    console.groupEnd();
    return;
  }

  try {
    const userData = JSON.parse(storedUser);
    console.log("✅ Sesión activa encontrada:");
    console.table({
      "Nombre del Restaurante": userData.restaurantName || "N/A",
      "Dueño": userData.ownerName || "N/A",
      "Email": userData.email || "N/A",
      "WhatsApp": userData.whatsapp || "N/A",
      "Plan": userData.plan || "N/A",
      "Es Usuario Nuevo": userData.isNewUser ? "SÍ ✅" : "NO ❌",
      "Fecha de Creación": userData.createdAt ? new Date(userData.createdAt).toLocaleString() : "N/A",
      "ID": userData.id || "N/A",
    });

    console.log("\n📦 Datos completos:", userData);

    // Verificar otros usuarios
    console.log("\n👥 Usuarios registrados:");
    let userCount = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("bocao_user_")) {
        userCount++;
        const user = JSON.parse(localStorage.getItem(key) || "{}");
        console.log(`  - ${user.email} (${user.restaurantName})`);
      }
    }
    console.log(`Total: ${userCount} usuario(s) registrado(s)`);

  } catch (e) {
    console.error("❌ Error al parsear datos de sesión:", e);
  }

  console.groupEnd();
}

// Hacer disponible globalmente en desarrollo
if (typeof window !== "undefined") {
  (window as any).debugSession = debugSession;
}


