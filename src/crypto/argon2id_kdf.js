// argon2id_kdf.js — REAL (usa argon2-browser)
// KDF resistente a GPU/ASIC. Parámetros OWASP 2024.
import argon2 from 'argon2-browser';

export const PARAMS = {
  time: 3,        // iteraciones
  mem: 65536,     // 64 MB
  parallelism: 4,
  hashLen: 32,    // 256 bits
  type: argon2.ArgonType.Argon2id
};

export async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const result = await argon2.hash({
    pass: enc.encode(password),
    salt: salt || crypto.getRandomValues(new Uint8Array(16)),
    time: PARAMS.time,
    mem: PARAMS.mem,
    parallelism: PARAMS.parallelism,
    hashLen: PARAMS.hashLen,
    type: PARAMS.type
  });
  return {
    hash: new Uint8Array(result.hash),
    salt: result.hash && salt ? salt : result.hash.slice(0, 16)
  };
}
