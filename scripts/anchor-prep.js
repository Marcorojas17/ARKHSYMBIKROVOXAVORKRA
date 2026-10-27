import crypto from 'crypto';
import fs from 'fs';
const file='mi-boveda.arkh';
const buf=fs.existsSync(file)?fs.readFileSync(file):Buffer.from('e8d9eac8');
const h=crypto.createHash('sha256').update(buf).digest('hex');
console.log('=== ANCHOR PREP ===');
console.log('Master hash:',h);
console.log('0x'+h);
console.log('SHA256 vault:',h);
