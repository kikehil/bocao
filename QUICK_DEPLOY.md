# ⚡ Quick Deploy - Comandos Copy/Paste

## 🖥️ PARTE 1: En Tu PC (Windows)

### 1. Subir al Repositorio

```powershell
# Ver estado
git status

# Agregar todo
git add .

# Commit
git commit -m "feat: Complete app with auth and admin dashboard"

# Push (ya configurado anteriormente)
git push origin main
```

---

## 🌐 PARTE 2: En el VPS

### 1. Conectar al VPS

```bash
ssh root@TU_IP_AQUI
# o
ssh usuario@tu-dominio.com
```

### 2. Instalar Todo (Primera Vez)

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js via NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
nvm alias default 18

# Verificar
node --version
npm --version

# Instalar PM2
sudo npm install -g pm2

# Instalar Git y Nginx
sudo apt install git nginx -y

# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 3. Clonar Proyecto

```bash
# Crear carpeta
mkdir -p ~/projects
cd ~/projects

# Clonar (reemplaza con tu repo)
git clone https://github.com/kikehil/bocao.git
cd bocao

# Instalar dependencias
npm install
```

### 4. Crear Variables de Entorno

```bash
# Crear archivo
nano .env.local
```

**Copiar esto y pegar (Ctrl+Shift+V en terminal):**

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
ADMIN_USERNAME=admin@bocao.com
ADMIN_PASSWORD=TuPasswordSeguro123!
PLATFORM_OWNER_WHATSAPP=5211234567890
```

**Guardar:** `Ctrl+O` → `Enter` → `Ctrl+X`

### 5. Build y Iniciar

```bash
# Build
npm run build

# Crear carpeta de logs
mkdir -p logs

# Iniciar con PM2
pm2 start ecosystem.config.js

# Guardar config
pm2 save

# Auto-inicio
pm2 startup
# Copiar y ejecutar el comando que te muestra
```

### 6. Configurar Nginx

```bash
# Crear config
sudo nano /etc/nginx/sites-available/bocao
```

**Copiar esto y pegar (reemplaza tu-dominio.com):**

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Guardar:** `Ctrl+O` → `Enter` → `Ctrl+X`

**Activar:**

```bash
# Crear link
sudo ln -s /etc/nginx/sites-available/bocao /etc/nginx/sites-enabled/

# Eliminar default
sudo rm /etc/nginx/sites-enabled/default

# Test
sudo nginx -t

# Reload
sudo systemctl reload nginx
```

### 7. Configurar SSL (HTTPS)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtener certificado (reemplaza tu dominio)
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Seguir instrucciones en pantalla
```

### 8. Configurar Firewall

```bash
# Permitir SSH
sudo ufw allow OpenSSH

# Permitir HTTP/HTTPS
sudo ufw allow 'Nginx Full'

# Habilitar
sudo ufw enable

# Verificar
sudo ufw status
```

---

## 🔄 ACTUALIZAR LA APP (Después de cambios)

### En Tu PC:

```powershell
git add .
git commit -m "tu mensaje"
git push origin main
```

### En el VPS:

```bash
# Conectar
ssh usuario@tu-dominio.com

# Actualizar
cd ~/projects/bocao
git pull origin main
npm install
npm run build
pm2 restart bocao-app

# Ver logs
pm2 logs bocao-app --lines 50
```

---

## 📋 Script de Deploy Automático

### Crear una sola vez:

```bash
nano ~/deploy.sh
```

**Copiar esto:**

```bash
#!/bin/bash
echo "🚀 Deploying..."
cd ~/projects/bocao
git pull origin main
npm install
npm run build
pm2 restart bocao-app
echo "✅ Done!"
pm2 status
```

**Guardar y dar permisos:**

```bash
chmod +x ~/deploy.sh
```

### Usar siempre:

```bash
~/deploy.sh
```

---

## 🛠️ Comandos Útiles

### PM2

```bash
pm2 status                  # Ver estado
pm2 logs bocao-app          # Ver logs
pm2 restart bocao-app       # Reiniciar
pm2 stop bocao-app          # Detener
pm2 monit                   # Monitor
```

### Nginx

```bash
sudo nginx -t               # Test config
sudo systemctl reload nginx # Reload
sudo systemctl status nginx # Estado
sudo tail -f /var/log/nginx/bocao_error.log  # Logs
```

### Sistema

```bash
htop                        # Monitor recursos
df -h                       # Espacio disco
free -h                     # Memoria
netstat -tuln | grep 3000   # Ver puerto 3000
```

---

## ⚠️ Troubleshooting Rápido

### App no funciona:

```bash
pm2 logs bocao-app --lines 100
pm2 restart bocao-app
```

### Nginx error:

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo tail -f /var/log/nginx/error.log
```

### Rebuild completo:

```bash
cd ~/projects/bocao
rm -rf .next node_modules
npm install
npm run build
pm2 restart bocao-app
```

---

## ✅ Verificar que Todo Funciona

### URLs para probar:

```
https://tu-dominio.com
https://tu-dominio.com/negocios
https://tu-dominio.com/admin/login
https://tu-dominio.com/login-customer
```

### Credenciales Admin:

```
Usuario: admin@bocao.com
Password: BocaoAdmin2026!
```

---

## 🎉 ¡Listo!

Tu app está corriendo en producción 🚀

**¿Problemas?** Revisa `DEPLOYMENT_GUIDE.md` para más detalles.

