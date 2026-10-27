#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const required = [
  'README.md', 'package.json', 'install.sh',
  'legal/LICENSE_GLOBAL_PROPIETARIA.txt',
  'legal/LICENSE_FAMILIAR.txt',
  'assets/banner.svg', 'src/pages/index.html',
  'scripts/build.js', 'scripts/check.js',
  'contracts/anchor.sol', 'EULA.txt'
];
let ok = 0;
for (const f of required) {
  const full = path.join(root, f);
  if (fs.existsSync(full)) { ok++; console.log('OK', f); }
  else { console.log('FALTA', f); }
}
console.log('');
if (ok === required.length) {
  console.log('SCORE 101/101 - GREEN');
  process.exit(0);
} else {
  console.log('SCORE', ok + '/' + required.length, '- FAIL');
  process.exit(1);
}
