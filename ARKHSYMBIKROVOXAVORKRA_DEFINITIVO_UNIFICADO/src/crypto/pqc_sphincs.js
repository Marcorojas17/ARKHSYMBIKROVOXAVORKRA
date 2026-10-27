// pqc_sphincs.js — REAL (usa @noble/post-quantum)
// FIPS 205 — SLH-DSA-SHA2-256f (SPHINCS+ sin estado)
import { slh_dsa_sha2_256f } from '@noble/post-quantum/slh-dsa';
import { randomBytes } from '@noble/hashes/utils';

export const ALGORITHM = 'SLH-DSA-SHA2-256f';
export const FIPS = '205';

export function generateKeypair(seed) {
  const s = seed || randomBytes(96);
  const { publicKey, secretKey } = slh_dsa_sha2_256f.keygen(s);
  return { publicKey, secretKey };
}

export function sign(message, secretKey) {
  return slh_dsa_sha2_256f.sign(message, secretKey);
}

export function verify(signature, message, publicKey) {
  return slh_dsa_sha2_256f.verify(signature, message, publicKey);
}
