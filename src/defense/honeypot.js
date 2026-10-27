// honeypot.js — STUB
// Requiere backend para registrar IPs y comportamiento de atacantes

export function trapRoute(req) {
  // Endpoint falso que solo bots conocen
  console.log('[honeypot] TRAP HIT:', {
    ip: req.headers?.['x-forwarded-for'] || 'unknown',
    userAgent: req.headers?.['user-agent'],
    timestamp: new Date().toISOString()
  });
  return { status: 404, body: 'Not Found' };
}

export const HONEYPOT_PATHS = [
  '/wp-admin',
  '/.env',
  '/admin',
  '/api/v1/users',
  '/phpmyadmin'
];
