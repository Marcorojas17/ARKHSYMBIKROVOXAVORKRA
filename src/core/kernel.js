// kernel.js — Kernel zero-trust (stub)
// Punto de entrada único del runtime ARKH

export const VERSION = '1.0.0';

export async function boot() {
  console.log('[kernel] boot', VERSION);
  return { ok: true, version: VERSION };
}

export async function shutdown() {
  console.log('[kernel] shutdown');
  return { ok: true };
}
