# 🚀 Guía de Deployment - Bocao

## Paso 1: Preparar y Subir al Repositorio (GitHub)

### 1.1 Verificar Estado de Git

```bash
# Ver estado actual
git status

# Ver commits
git log --oneline
```

### 1.2 Crear .gitignore (si no existe)

Crea un archivo `.gitignore` en la raíz:

```gitignore
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js
/.next/
/out/

# Production
/build
.vercel
.env*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# OS
.DS_Store
*.pem

# IDE
.vscode
.idea
*.swp
*.swo
*~
```

### 1.3 Hacer Commit de los Cambios Recientes

```bash
# Ver cambios
git status

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "feat: Add authentication system and admin dashboard

- Added customer login and registration
- Implemented guest checkout mode
- Created super admin dashboard with metrics
- Added business registration alerts
- Implemented WhatsApp notifications
- Fixed UI issues in product modal and header
- Updated checkout with auto-fill for logged users"

# Verificar el commit
git log --oneline -1
```

### 1.4 Subir al Repositorio

```bash
# Si ya tienes el remote configurado (verificar con: git remote -v)
git push origin main

# Si el remote no existe o cambió, agregar/actualizar:
git remote add origin https://github.com/kikehil/bocao.git
# o si ya existe pero cambió:
git remote set-url origin https://github.com/kikehil/bocao.git

# Push con upstream
git push -u origin main
```

**⚠️ Si te pide credenciales:**
- Usa tu token de GitHub personal (no la contraseña)
- Genera uno en: GitHub → Settings → Developer settings → Personal access tokens

---

## Paso 2: Preparar el VPS

### 2.1 Conectar al VPS via SSH

```bash
# Reemplaza con tus datos
ssh root@tu-ip-del-vps
# o
ssh usuario@tu-dominio.com
```

### 2.2 Actualizar el Sistema

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
```

### 2.3 Instalar Node.js (v18 o superior)

```bash
# Método 1: Usando NVM (Recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
nvm alias default 18

# Método 2: Usando repositorio oficial
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalación
node --version  # Debe ser v18.x o superior
npm --version
```

### 2.4 Instalar PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Verificar instalación
pm2 --version
```

### 2.5 Instalar Git

```bash
# Ubuntu/Debian
sudo apt install git -y

# CentOS/RHEL
sudo yum install git -y

# Verificar instalación
git --version
```

### 2.6 (Opcional) Instalar Nginx

```bash
# Ubuntu/Debian
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y

# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verificar estado
sudo systemctl status nginx
```

---

## Paso 3: Clonar el Proyecto en el VPS

### 3.1 Crear Directorio para Proyectos

```bash
# Crear carpeta
mkdir -p ~/projects
cd ~/projects
```

### 3.2 Clonar el Repositorio

```bash
# Clonar con HTTPS (público)
git clone https://github.com/kikehil/bocao.git

# O con SSH (si configuraste SSH keys)
git clone git@github.com:kikehil/bocao.git

# Entrar al proyecto
cd bocao
```

### 3.3 Instalar Dependencias

```bash
npm install

# Si hay errores, intentar con:
npm install --legacy-peer-deps
```

### 3.4 Crear Variables de Entorno

```bash
# Crear archivo .env.local
nano .env.local
```

**Contenido del `.env.local`:**

```env
# Next.js
NODE_ENV=production
PORT=3000

# URLs
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
NEXT_PUBLIC_API_URL=https://tu-dominio.com/api

# Admin (cambiar por valores seguros)
ADMIN_USERNAME=admin@bocao.com
ADMIN_PASSWORD=TuPasswordSeguro123!

# WhatsApp
PLATFORM_OWNER_WHATSAPP=5211234567890

# (Futuro) Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/bocao
```

**Guardar:** `Ctrl + O`, `Enter`, `Ctrl + X`

### 3.5 Build del Proyecto

```bash
# Build de producción
npm run build

# Verificar que no haya errores
# El output debe terminar con "✓ Compiled successfully"
```

---

## Paso 4: Configurar PM2

### 4.1 Verificar el archivo ecosystem.config.js

El archivo ya está creado. Verificar:

```bash
cat ecosystem.config.js
```

Debe contener:

```javascript
module.exports = {
  apps: [
    {
      name: "bocao-app",
      script: "npm",
      args: "start",
      env: {
        PORT: 3000,
        NODE_ENV: "production"
      },
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "1G",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true
    }
  ]
};
```

### 4.2 Crear Carpeta de Logs

```bash
mkdir -p logs
```

### 4.3 Iniciar la App con PM2

```bash
# Iniciar
pm2 start ecosystem.config.js

# Verificar estado
pm2 status

# Ver logs en tiempo real
pm2 logs bocao-app

# Otros comandos útiles:
pm2 restart bocao-app   # Reiniciar
pm2 stop bocao-app      # Detener
pm2 delete bocao-app    # Eliminar del PM2
```

### 4.4 Guardar Configuración de PM2

```bash
# Guardar procesos actuales
pm2 save

# Configurar auto-inicio en reboot
pm2 startup

# Seguir las instrucciones que aparezcan
# Probablemente algo como:
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u tu-usuario --hp /home/tu-usuario
```

### 4.5 Verificar que la App Esté Corriendo

```bash
# Verificar en el servidor
curl http://localhost:3000

# Si responde HTML, está funcionando ✅
```

---

## Paso 5: Configurar Nginx (Proxy Reverso)

### 5.1 Crear Configuración de Nginx

```bash
sudo nano /etc/nginx/sites-available/bocao
```

**Contenido:**

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Logs
    access_log /var/log/nginx/bocao_access.log;
    error_log /var/log/nginx/bocao_error.log;

    # Proxy a Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # Images
    location /images {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=86400";
    }
}
```

**Guardar:** `Ctrl + O`, `Enter`, `Ctrl + X`

### 5.2 Activar la Configuración

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/bocao /etc/nginx/sites-enabled/

# Eliminar config default si existe
sudo rm /etc/nginx/sites-enabled/default

# Verificar sintaxis
sudo nginx -t

# Si todo está OK, recargar
sudo systemctl reload nginx
```

### 5.3 Verificar Acceso

```bash
# Desde tu computadora, abre en el navegador:
http://tu-ip-del-vps
# o
http://tu-dominio.com
```

**✅ Deberías ver la aplicación funcionando**

---

## Paso 6: Configurar HTTPS con Let's Encrypt (SSL)

### 6.1 Instalar Certbot

```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx -y

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx -y
```

### 6.2 Obtener Certificado SSL

```bash
# Reemplaza con tu dominio
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Seguir las instrucciones:
# 1. Ingresar email
# 2. Aceptar términos
# 3. Elegir si compartir email (opcional)
# 4. Elegir opción 2 (Redirect HTTP to HTTPS)
```

### 6.3 Verificar HTTPS

```bash
# Abrir en navegador:
https://tu-dominio.com

# Debe mostrar el candado verde 🔒
```

### 6.4 Configurar Renovación Automática

```bash
# Verificar que la renovación automática esté configurada
sudo systemctl status certbot.timer

# Test de renovación
sudo certbot renew --dry-run

# Si todo está OK, no hacer nada más
# Certbot renovará automáticamente cada 60 días
```

---

## Paso 7: Configurar Firewall (UFW)

### 7.1 Instalar y Configurar UFW

```bash
# Instalar UFW
sudo apt install ufw -y

# Permitir SSH (IMPORTANTE - hacer antes de habilitar)
sudo ufw allow OpenSSH

# Permitir HTTP y HTTPS
sudo ufw allow 'Nginx Full'

# Habilitar firewall
sudo ufw enable

# Verificar estado
sudo ufw status
```

---

## Paso 8: Scripts de Deployment Automático

### 8.1 Crear Script de Deploy

```bash
# En el VPS, crear script
nano ~/deploy-bocao.sh
```

**Contenido:**

```bash
#!/bin/bash

echo "🚀 Deploying Bocao..."

# Navegar al proyecto
cd ~/projects/bocao

# Pull cambios
echo "📥 Pulling latest changes..."
git pull origin main

# Instalar dependencias
echo "📦 Installing dependencies..."
npm install

# Build
echo "🔨 Building project..."
npm run build

# Reiniciar PM2
echo "♻️  Restarting app..."
pm2 restart bocao-app

# Logs
echo "✅ Deployment complete!"
echo "📊 Checking status..."
pm2 status
```

**Guardar y dar permisos:**

```bash
chmod +x ~/deploy-bocao.sh
```

### 8.2 Usar el Script

```bash
# Cada vez que hagas cambios y los subas al repo:
~/deploy-bocao.sh
```

---

## Paso 9: Comandos Útiles

### Git (En tu PC)

```bash
# Hacer cambios
git add .
git commit -m "tu mensaje"
git push origin main
```

### VPS - Actualizar App

```bash
# SSH al VPS
ssh usuario@tu-dominio.com

# Actualizar
cd ~/projects/bocao
git pull
npm install
npm run build
pm2 restart bocao-app
```

### PM2

```bash
pm2 status              # Ver estado
pm2 logs bocao-app      # Ver logs en tiempo real
pm2 logs bocao-app --lines 100  # Últimas 100 líneas
pm2 restart bocao-app   # Reiniciar
pm2 stop bocao-app      # Detener
pm2 monit              # Monitor en tiempo real
```

### Nginx

```bash
sudo nginx -t                    # Test config
sudo systemctl reload nginx      # Recargar
sudo systemctl restart nginx     # Reiniciar
sudo systemctl status nginx      # Ver estado
tail -f /var/log/nginx/bocao_error.log  # Ver logs
```

### Sistema

```bash
# Ver uso de recursos
htop
# o
top

# Ver espacio en disco
df -h

# Ver memoria
free -h
```

---

## Paso 10: Troubleshooting

### App no inicia

```bash
# Ver logs de PM2
pm2 logs bocao-app --lines 200

# Ver logs de sistema
journalctl -u pm2-usuario -n 50

# Verificar puerto 3000
lsof -i :3000
netstat -tuln | grep 3000
```

### Error de build

```bash
# Limpiar y rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Nginx no funciona

```bash
# Ver logs
sudo tail -f /var/log/nginx/error.log

# Verificar sintaxis
sudo nginx -t

# Reiniciar
sudo systemctl restart nginx
```

### SSL no funciona

```bash
# Renovar certificado
sudo certbot renew --force-renewal

# Verificar configuración
sudo certbot certificates
```

---

## 📋 Checklist Final

- [ ] Código subido a GitHub
- [ ] VPS preparado con Node.js y PM2
- [ ] Proyecto clonado en VPS
- [ ] Variables de entorno configuradas
- [ ] Build exitoso
- [ ] PM2 ejecutando la app
- [ ] Nginx configurado
- [ ] Dominio apuntando al VPS
- [ ] SSL instalado (HTTPS)
- [ ] Firewall configurado
- [ ] Script de deploy creado
- [ ] App accesible en el navegador

---

## 🎉 ¡Listo!

Tu aplicación debería estar funcionando en:

```
https://tu-dominio.com
```

### URLs Importantes:

- **App Principal:** `https://tu-dominio.com`
- **Admin Login:** `https://tu-dominio.com/admin/login`
- **Customer Login:** `https://tu-dominio.com/login-customer`
- **Negocios:** `https://tu-dominio.com/negocios`

---

## 📞 Soporte

Si algo falla, revisa:
1. Logs de PM2: `pm2 logs`
2. Logs de Nginx: `/var/log/nginx/bocao_error.log`
3. Build output: `npm run build`

**Todo listo para producción! 🚀**

