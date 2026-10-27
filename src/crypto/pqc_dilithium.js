// pqc_dilithium.js — REAL (usa @noble/post-quantum)
// FIPS 204 — ML-DSA-87 (Dilithium5, nivel más alto)
import { ml_dsa87 } from '@noble/post-quantum/ml-dsa';
import { randomBytes } from '@noble/hashes/utils';

export const ALGORITHM = 'ML-DSA-87';
export const FIPS = '204';

export function generateKeypair(seed) {
  const s = seed || randomBytes(32);
  const { publicKey, secretKey } = ml_dsa87.keygen(s);
  return { publicKey, secretKey };
}

export function sign(message, secretKey) {
  return ml_dsa87.sign(message, secretKey);
}

export function verify(signature, message, publicKey) {
  return ml_dsa87.verify(signature, message, publicKey);
}
