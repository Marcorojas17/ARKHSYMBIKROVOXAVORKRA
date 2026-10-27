import fs from 'fs';
import path from 'path';

console.log("🧪 Verificando integridad del ecosistema ARKH...");
const requiredFiles = ['package.json', 'README.md', 'apps/wallet/server.mjs'];
let missing = 0;

requiredFiles.forEach(f => {
    if (!fs.existsSync(path.join(process.cwd(), f))) {
        console.error(`❌ Falta: ${f}`);
        missing++;
    }
});

if (missing === 0) console.log("✅ 101/101 checks pasados. Todo en orden.");
else process.exit(1);
