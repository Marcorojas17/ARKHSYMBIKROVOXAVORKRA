#!/usr/bin/env node
// check-status.js — valida clasificación REAL/STUB/PENDING
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

if (!fs.existsSync(path.join(root, 'STATUS.md'))) {
  console.log('FALTA STATUS.md');
  process.exit(1);
}

const status = fs.readFileSync(path.join(root, 'STATUS.md'), 'utf8');

// Archivos que DEBEN existir y estar clasificados como REAL
const REAL_FILES = [
  'src/pages/index.html',
  'src/crypto/aes_gcm_siv.js',
  'src/crypto/pqc_kyber.js',
  'src/crypto/pqc_dilithium.js',
  'src/crypto/pqc_sphincs.js',
  'src/crypto/argon2id_kdf.js',
  'src/core/vault.js',
  'src/defense/quantum_entropy.js',
  'bin/arkh',
  'bin/server.py',
  'bin/server-defense.js',
  'bin/vault.js',
  'scripts/build.js',
  'scripts/check.js',
  'scripts/seal.js',
  'tests/test-vault.js',
  'tests/test-defense.js',
  'tests/test-server.py'
];

let ok = 0, fail = 0;
for (const f of REAL_FILES) {
  const exists = fs.existsSync(path.join(root, f));
  const classified = status.includes(f);
  if (exists && classified) {
    console.log('OK   ', f);
    ok++;
  } else {
    console.log('FALLA', f, '| exists:', exists, '| inStatus:', classified);
    fail++;
  }
}

console.log('');
console.log('REAL CHECK:', ok + '/' + REAL_FILES.length, fail === 0 ? '- GREEN' : '- FAIL');
process.exit(fail === 0 ? 0 : 1);
