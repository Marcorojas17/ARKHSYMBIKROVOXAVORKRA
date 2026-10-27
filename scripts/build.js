#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const src = path.join(root, 'src', 'pages', 'index.html');
const dist = path.join(root, 'dist', 'index.html');
if (!fs.existsSync(src)) { console.error('Falta', src); process.exit(1); }
fs.mkdirSync(path.dirname(dist), { recursive: true });
fs.copyFileSync(src, dist);
console.log('OK dist/index.html -', fs.statSync(dist).size, 'bytes');
