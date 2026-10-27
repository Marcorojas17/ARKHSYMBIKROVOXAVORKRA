// quantum_entropy.js — entropía del sistema (real via Web Crypto)
// NO es entropía cuántica real (eso requiere hardware QRNG), pero es CSPRNG

export function randomBytes(n) {
  return crypto.getRandomValues(new Uint8Array(n));
}

export function randomHex(n) {
  return Array.from(randomBytes(n))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export function randomInt(max) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}
