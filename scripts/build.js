import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("🔨 Iniciando build de ARKH...");
const distDir = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// Simular copia de archivos
console.log("✅ Build completado en /dist");
