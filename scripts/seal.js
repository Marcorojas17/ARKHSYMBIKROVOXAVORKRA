#!/usr/bin/env node
// seal.js — genera sello SHA-256 de todos los archivos críticos
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');

const files = [
  'src/pages/index.html', 'README.md', 'package.json',
  'legal/LICENSE_GLOBAL_PROPIETARIA.txt',
  'legal/LICENSE_FAMILIAR.txt', 'legal/LICENSE_PQC.txt'
];

const manifest = {
  timestamp: new Date().toISOString(),
  owner: 'Marco Antonio Rojas Valdovinos',
  did: 'did:kronos:human:marcorojas17',
  files: {}
};

let combined = '';
for (const f of files) {
  const full = path.join(root, f);
  if (fs.existsSync(full)) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
    manifest.files[f] = hash;
    combined += hash;
  }
}

manifest.master_hash = crypto.createHash('sha256').update(combined).digest('hex');

const outDir = path.join(root, '.arkh');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, 'seal_manifest.json');
fs.writeFileSync(outFile, JSON.stringify(manifest, null, 2));

console.log('SELLO GENERADO');
console.log('Archivos:', Object.keys(manifest.files).length);
console.log('Master Hash:', manifest.master_hash);
console.log('Guardado en:', outFile);
