const fs = require("fs");
const path = require("path");

const emailArg = process.argv.find((arg) => arg.includes("@"));

if (!emailArg) {
  console.error("Uso: node scripts/set-admin.js tu@email.com");
  process.exit(1);
}

const normalizedEmail = emailArg.trim().toLowerCase();
const adminsPath = path.join(__dirname, "..", "data", "admins.json");

let admins = [];
try {
  const raw = fs.readFileSync(adminsPath, "utf-8");
  admins = JSON.parse(raw);
  if (!Array.isArray(admins)) {
    admins = [];
  }
} catch (error) {
  admins = [];
}

if (!admins.includes(normalizedEmail)) {
  admins.push(normalizedEmail);
  admins.sort();
  fs.writeFileSync(adminsPath, JSON.stringify(admins, null, 2));
}

console.log(`User ${normalizedEmail} is now an Admin.`);
console.log("Reinicia el servidor y vuelve a iniciar sesión para aplicar el rol.");


