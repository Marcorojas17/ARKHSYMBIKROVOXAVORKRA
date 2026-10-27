import fs from 'fs';

console.log("🛡️  Auditando dependencias...");
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const deps = Object.keys(pkg.dependencies || {});

if (deps.length === 0) {
    console.log("⚠️  No hay dependencias registradas.");
} else {
    console.log(`✅ ${deps.length} dependencias encontradas. Sin vulnerabilidades críticas conocidas (simulación).`);
}
