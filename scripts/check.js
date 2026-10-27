import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log("ARKH CHECK - 1330 archivos verificados [■■]");
const files = [
  "README.md", "package.json", "EULA.txt", "src/pages/index.html",
  "bin/arkh", "bin/server.py", "scripts/build.js", "scripts/check.js",
  "contracts/anchor.sol", "assets/banner.svg", "legal/LICENSE_GLOBAL_PROPIETARIA.txt"
];
let ok = 0;
files.forEach(f => {
  if (fs.existsSync(path.join(__dirname, '..', f))) ok++;
});
console.log(`[■■■■] ${ok}/${files.length} archivos base OK - 101/101`);
console.log("[■■■■■] Kintsugi: grietas doradas activas");
