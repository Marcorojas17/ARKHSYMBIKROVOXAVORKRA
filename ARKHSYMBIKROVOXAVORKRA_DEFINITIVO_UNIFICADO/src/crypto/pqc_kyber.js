// pqc_kyber.js — REAL (usa @noble/post-quantum)
// FIPS 203 — ML-KEM-1024 (Kyber1024)
import { ml_kem1024 } from '@noble/post-quantum/ml-kem';
import { randomBytes } from '@noble/hashes/utils';

export const ALGORITHM = 'ML-KEM-1024';
export const FIPS = '203';
export const SEED_LEN = 64;

export function generateKeypair(seed) {
  const s = seed || randomBytes(SEED_LEN);
  const { publicKey, secretKey } = ml_kem1024.keygen(s);
  return { publicKey, secretKey };
}

export function encapsulate(publicKey) {
  const { cipherText, sharedSecret } = ml_kem1024.encapsulate(publicKey);
  return { cipherText, sharedSecret };
}

export function decapsulate(cipherText, secretKey) {
  return ml_kem1024.decapsulate(cipherText, secretKey);
}
