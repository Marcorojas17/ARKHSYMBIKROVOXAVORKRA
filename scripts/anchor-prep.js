import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sealPath = path.join(root, '.arkh', 'seal_manifest.json');
if (!fs.existsSync(sealPath)) {
  console.log('No hay .arkh/seal_manifest.json, creando uno dummy para ancla');
  const dummy = { master_hash: 'e8d9eac8a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0', timestamp: new Date().toISOString() };
  console.log('=== ANCHOR PREP ===');
  console.log('Master hash (para register):');
  console.log('  ' + dummy.master_hash);
  console.log('');
  console.log('Formato Solidity bytes32:');
  console.log('  0x' + dummy.master_hash);
  process.exit(0);
}
const seal = JSON.parse(fs.readFileSync(sealPath,'utf8'));
console.log('=== ANCHOR PREP ===');
console.log('Master hash: ' + seal.master_hash);
console.log('0x' + seal.master_hash);
console.log('');
console.log('Pasos: 1. Remix 2. Deploy anchor.sol en Sepolia 3. register(0x'+seal.master_hash+')');
