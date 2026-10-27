#!/usr/bin/env node
// vault.js — CLI para bóvedas ARKH
// Uso:
//   node bin/vault.js create <archivo-entrada> <archivo-salida> <password>
//   node bin/vault.js open <archivo-boveda> <archivo-salida> <password>
//   node bin/vault.js test

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');

// Cargar módulos ES dinámicamente
async function loadVault() {
  return await import(path.join(ROOT, 'src/core/vault.js'));
}
async function loadArgon() {
  return await import(path.join(ROOT, 'src/crypto/argon2id_kdf.js'));
}

async function cmdTest() {
  console.log('=== TEST VAULT ===');
  const { createVault, openVault } = await loadVault();
  const password = 'test-password-2026';
  const data = crypto.randomBytes(1024);

  const vault = await createVault(password, data);
  console.log('[1] createVault: OK (ciphertext:', vault.ciphertext.length, 'b64 chars)');

  const opened = await openVault(vault, password);
  console.log('[2] openVault correcto:', opened.ok ? 'PASS' : 'FAIL');
  if (!opened.ok) process.exit(1);

  const equal = Buffer.from(opened.data).equals(data);
  console.log('[3] Contenido idéntico:', equal ? 'PASS' : 'FAIL');

  const wrong = await openVault(vault, 'wrong-password');
  console.log('[4] Password incorrecto rechazado:', !wrong.ok ? 'PASS' : 'FAIL');

  // Alterar ciphertext (ataque MITM)
  const tampered = { ...vault, ciphertext: vault.ciphertext.slice(0, -10) + 'AAAAAAAAAA' };
  try {
    await openVault(tampered, password);
    console.log('[5] Tamper detection: FAIL (no detectó)');
  } catch (e) {
    console.log('[5] Tamper detection:', e.message.includes('PQC') ? 'PASS' : 'FAIL');
  }

  console.log('');
  console.log('VAULT TEST COMPLETO');
}

async function cmdCreate(input, output, password) {
  if (!fs.existsSync(input)) { console.error('No existe:', input); process.exit(1); }
  const { createVault, vaultToBase64 } = await loadVault();
  const data = fs.readFileSync(input);
  console.log('Cifrando', data.length, 'bytes...');
  const vault = await createVault(password, data);
  const b64 = vaultToBase64(vault);
  fs.writeFileSync(output, b64);
  console.log('Bóveda creada:', output, '(' + Math.round(b64.length / 1024), 'KB)');
}

async function cmdOpen(input, output, password) {
  if (!fs.existsSync(input)) { console.error('No existe:', input); process.exit(1); }
  const { openVault, vaultFromBase64 } = await loadVault();
  const vault = vaultFromBase64(fs.readFileSync(input, 'utf8'));
  console.log('Descifrando bóveda...');
  const result = await openVault(vault, password);
  if (!result.ok) { console.error('ERROR:', result.error); process.exit(1); }
  fs.writeFileSync(output, result.data);
  console.log('Bóveda abierta:', output, '(' + result.data.length, 'bytes)');
}

const [cmd, ...args] = process.argv.slice(2);
if (cmd === 'test') cmdTest();
else if (cmd === 'create') cmdCreate(args[0], args[1], args[2]);
else if (cmd === 'open') cmdOpen(args[0], args[1], args[2]);
else {
  console.log('Uso:');
  console.log('  node bin/vault.js test');
  console.log('  node bin/vault.js create <entrada> <salida.arkh> <password>');
  console.log('  node bin/vault.js open <archivo.arkh> <salida> <password>');
}
