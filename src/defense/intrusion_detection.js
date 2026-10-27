// intrusion_detection.js — IDS comportamental (stub educativo)

const events = [];

export function logEvent(type, metadata) {
  events.push({ type, metadata, ts: Date.now() });
}

export function analyze() {
  // Heurística: 10+ requests en 5 seg del mismo IP = sospechoso
  const now = Date.now();
  const recent = events.filter(e => now - e.ts < 5000);
  const byIp = {};
  for (const e of recent) {
    const ip = e.metadata?.ip || 'unknown';
    byIp[ip] = (byIp[ip] || 0) + 1;
  }
  return Object.entries(byIp)
    .filter(([_, count]) => count >= 10)
    .map(([ip, count]) => ({ ip, count, suspicion: 'HIGH' }));
}
