import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { argv } from 'process';

const FILE = argv[2] || 'README.md';
const SIGNER = 'did:kronos:human:marcorojas17';
if (!existsSync(FILE)) { console.error('No existe:', FILE); process.exit(1); }

const content = readFileSync(FILE);
const hash = createHash('sha256').update(content).digest('hex');
const now = new Date().toISOString();

const gold = createHash('sha256').update(hash + now + SIGNER).digest('hex');
const fract = [];
for (let i = 0; i < 5; i++) {
  const row = gold.slice(i * 12, i * 12 + 12);
  let line = '';
  for (const c of row) {
    const v = parseInt(c, 16);
    line += v < 4 ? '\u00b7' : v < 8 ? '\u2591' : v < 12 ? '\u2592' : '\u2593';
  }
  fract.push(line);
}

const witness = createHash('sha256').update(gold + hash).digest('hex');
const seal = {
  magic: 'KINTSUGI-V1',
  signer: SIGNER,
  file: FILE,
  content_hash: 'sha256:' + hash,
  content_size: content.length,
  timestamp: now,
  golden_crack: fract,
  gold_hash: 'sha256:' + gold,
  witness: 'sha256:' + witness
};

writeFileSync(FILE + '.kintsugi', JSON.stringify(seal, null, 2));
console.log('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
console.log('  SELLO KINTSUGI \u00b7 ' + now);
console.log('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
console.log('  Firmante: ' + SIGNER);
console.log('  Archivo:  ' + FILE);
console.log('  Tamano:   ' + content.length + ' bytes');
console.log('  Hash:     ' + hash);
console.log('');
console.log('  GRIETA DORADA (visual \u00fanica):');
fract.forEach(l => console.log('    ' + l));
console.log('');
console.log('  Testigo:  ' + witness);
console.log('\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550');
console.log('  Guardado en: ' + FILE + '.kintsugi');
