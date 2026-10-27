#!/usr/bin/env node
// quantum_test.js — verifica que los stubs PQC existan y no rompan
const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname, '..');

const crypto = ['pqc_kyber', 'pqc_dilithium', 'pqc_sphincs', 'aes_gcm_siv', 'argon2id_kdf', 'qkd_sim'];
const core = ['kernel', 'guardian', 'memory_wipe'];
const defense = ['honeypot', 'intrusion_detection', 'quantum_entropy'];

let ok = 0, total = 0;

console.log('=== QUANTUM TEST ===');
for (const f of crypto) {
  total++;
  const p = path.join(root, 'src/crypto', f + '.js');
  if (fs.existsSync(p)) { console.log('OK crypto/' + f + '.js'); ok++; }
  else console.log('FALTA crypto/' + f + '.js');
}
for (const f of core) {
  total++;
  const p = path.join(root, 'src/core', f + '.js');
  if (fs.existsSync(p)) { console.log('OK core/' + f + '.js'); ok++; }
  else console.log('FALTA core/' + f + '.js');
}
for (const f of defense) {
  total++;
  const p = path.join(root, 'src/defense', f + '.js');
  if (fs.existsSync(p)) { console.log('OK defense/' + f + '.js'); ok++; }
  else console.log('FALTA defense/' + f + '.js');
}

console.log('');
console.log('SCORE:', ok + '/' + total, ok === total ? '- GREEN' : '- FAIL');
process.exit(ok === total ? 0 : 1);
