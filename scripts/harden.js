#!/usr/bin/env node
// harden.js — endurece permisos y limpia metadatos
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

const critical = ['bin/arkh', 'bin/server.py', 'install.sh', 'setup_termux_from_zero.sh'];

for (const f of critical) {
  const full = path.join(root, f);
  if (fs.existsSync(full)) {
    try { fs.chmodSync(full, 0o700); console.log('chmod 700:', f); }
    catch (e) { console.log('skip:', f, e.message); }
  }
}

const gitignoreAdd = ['.arkh/vault.arkh', '.arkh/identity.seed', '.env', '*.log'];
const gi = path.join(root, '.gitignore');
const current = fs.existsSync(gi) ? fs.readFileSync(gi, 'utf8') : '';
const missing = gitignoreAdd.filter(line => !current.includes(line));
if (missing.length) {
  fs.appendFileSync(gi, '\n# harden.js additions\n' + missing.join('\n') + '\n');
  console.log('gitignore: agregadas', missing.length, 'lineas');
}

console.log('HARDEN OK');
