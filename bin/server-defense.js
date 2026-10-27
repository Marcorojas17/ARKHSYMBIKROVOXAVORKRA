#!/usr/bin/env node
// server-defense.js — Backend real con honeypot, IDS y WAF
// Uso: node bin/server-defense.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const LOG_DIR = path.join(ROOT, '.arkh', 'logs');
const WAF_FILE = path.join(ROOT, 'src', 'defense', 'waf_rules.json');

fs.mkdirSync(LOG_DIR, { recursive: true });

const HONEYPOT_PATHS = ['/wp-admin', '/.env', '/phpmyadmin', '/admin', '/api/v1/users', '/config.php'];
const events = [];

const WAF = fs.existsSync(WAF_FILE) ? JSON.parse(fs.readFileSync(WAF_FILE, 'utf8')) : { rules: [] };

function logEvent(type, data) {
  const entry = { ts: new Date().toISOString(), type, ...data };
  events.push(entry);
  const file = path.join(LOG_DIR, new Date().toISOString().slice(0, 10) + '.jsonl');
  fs.appendFileSync(file, JSON.stringify(entry) + '\n');
  console.log('[' + type + ']', data.ip || '', data.path || '', data.userAgent || '');
}

function getIp(req) {
  return (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
}

function idsCheck(ip) {
  const now = Date.now();
  const recent = events.filter(e => e.type === 'request' && e.ip === ip && now - new Date(e.ts).getTime() < 5000);
  if (recent.length >= 10) {
    logEvent('IDS_ALERT', { ip, count: recent.length, reason: 'rate_limit_exceeded' });
    return true;
  }
  return false;
}

function wafCheck(req) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const url = (req.url || '').toLowerCase();

  if (/sqlmap|nikto|nmap|masscan|zgrab/.test(ua)) return { block: true, rule: 'block_scanners' };
  if (/<script|javascript:|onerror=/.test(url)) return { block: true, rule: 'block_xss' };
  if (/\.\.\/|\/etc\/passwd/.test(url)) return { block: true, rule: 'block_lfi' };
  return { block: false };
}

const server = http.createServer((req, res) => {
  const ip = getIp(req);
  const ua = req.headers['user-agent'] || '';
  const url = req.url === '/' ? '/index.html' : req.url;

  logEvent('request', { ip, path: url, userAgent: ua });

  // Honeypot
  if (HONEYPOT_PATHS.includes(url) || HONEYPOT_PATHS.some(h => url.startsWith(h))) {
    logEvent('HONEYPOT_HIT', { ip, path: url, userAgent: ua });
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  // IDS
  if (idsCheck(ip)) {
    res.writeHead(429, { 'Content-Type': 'text/plain' });
    res.end('Too Many Requests');
    return;
  }

  // WAF
  const waf = wafCheck(req);
  if (waf.block) {
    logEvent('WAF_BLOCK', { ip, path: url, rule: waf.rule, userAgent: ua });
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  // Static
  const safe = path.normalize(url).replace(/^(\.\.\/)+/, '');
  const filePath = path.join(DIST, safe);
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    const ext = path.extname(filePath);
    const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json' }[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('=== ARKH DEFENSE SERVER ===');
  console.log('Puerto:', PORT);
  console.log('Honeypots:', HONEYPOT_PATHS.length);
  console.log('WAF rules:', WAF.rules.length);
  console.log('Logs:', LOG_DIR);
  console.log('URL: http://localhost:' + PORT);
});
