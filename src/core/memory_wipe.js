// memory_wipe.js — limpieza de referencias sensibles (best-effort en JS)
// Nota: JS no garantiza el wipe real de memoria (GC puede mover/copiar)

export function wipeArray(arr) {
  if (!arr) return;
  for (let i = 0; i < arr.length; i++) arr[i] = 0;
  arr.length = 0;
}

export function wipeObject(obj) {
  if (!obj) return;
  for (const k of Object.keys(obj)) {
    if (typeof obj[k] === 'string') obj[k] = '';
    else if (typeof obj[k] === 'number') obj[k] = 0;
    else obj[k] = null;
  }
}
