const solc = require('solc');
const fs = require('fs');

const source = fs.readFileSync('contracts/anchor.sol', 'utf8');
const input = {
  language: 'Solidity',
  sources: { 'anchor.sol': { content: source } },
  settings: { outputSelection: { '*': { '*': ['abi', 'evm.bytecode.object'] } } }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const errs = (output.errors || []).filter(e => e.severity === 'error');
if (errs.length) { console.error(errs); process.exit(1); }

const c = output.contracts['anchor.sol']['ArkheAnchor'];
fs.writeFileSync('build.json', JSON.stringify({ abi: c.abi, bytecode: '0x' + c.evm.bytecode.object }, null, 2));
console.log('✅ build.json creado. Bytecode:', c.evm.bytecode.object.length, 'chars');
