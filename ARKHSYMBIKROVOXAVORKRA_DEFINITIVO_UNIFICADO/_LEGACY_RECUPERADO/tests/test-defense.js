#!/usr/bin/env node
// test-defense.js — Simula ataques contra server-defense.js
// Uso: node bin/server-defense.js (en otra terminal) + node tests/test-defense.js
const http = require('http');

const BASE = 'http://localhost:3001';

function req(path, ua = 'test-agent') {
  return new Promise((resolve) => {
    const url = new URL(BASE + path);
    http.get({ hostname: url.hostname, port: url.port, path: url.pathname, headers: { 'User-Agent': ua } }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, body }));
    }).on('error', e => resolve({ status: 0, error: e.message }));
  });
}

(async () => {
  console.log('=== TEST DEFENSE ===');

  let r = await req('/index.html');
  console.log('[1] Request normal:', r.status, r.status === 200 ? 'PASS' : 'FAIL');

  r = await req('/wp-admin');
  console.log('[2] Honeypot /wp-admin:', r.status, r.status === 404 ? 'PASS' : 'FAIL');

  r = await req('/index.html', 'sqlmap/1.0');
  console.log('[3] WAF scanner:', r.status, r.status === 403 ? 'PASS' : 'FAIL');

  r = await req('/index.html?x=<script>alert(1)</script>');
  console.log('[4] WAF XSS:', r.status, r.status === 403 ? 'PASS' : 'FAIL');

  // Rate limit: 15 requests rápidos
  const results = await Promise.all(Array.from({ length: 15 }, () => req('/index.html')));
  const blocked = results.filter(x => x.status === 429).length;
  console.log('[5] IDS rate limit:', blocked > 0 ? 'PASS (' + blocked + ' blocked)' : 'FAIL');

  console.log('');
  console.log('Revisa logs en: .arkh/logs/');
})();
