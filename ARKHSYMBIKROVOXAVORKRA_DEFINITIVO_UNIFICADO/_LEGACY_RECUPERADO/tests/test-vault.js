#!/usr/bin/env node
// test-vault.js — wrapper para el test del CLI
const { spawn } = require('child_process');
const path = require('path');

const proc = spawn('node', [path.join(__dirname, '..', 'bin', 'vault.js'), 'test'], {
  stdio: 'inherit'
});
proc.on('exit', code => process.exit(code));
