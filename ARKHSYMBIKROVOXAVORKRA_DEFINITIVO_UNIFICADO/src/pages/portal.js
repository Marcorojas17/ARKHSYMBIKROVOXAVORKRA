// portal.js — Lógica del portal con PQC + Argon2id reales
import { ml_dsa87 } from 'https://esm.sh/@noble/post-quantum@0.4.0/ml-dsa';
import { randomBytes } from 'https://esm.sh/@noble/hashes@1.5.0/utils';
import argon2 from 'https://esm.sh/argon2-browser@1.18.0';

export const MAGIC = 'ARKHVLT2';
export const VERSION = 2;

function toB64(u8) { let s=''; for(let i=0;i<u8.length;i++) s+=String.fromCharCode(u8[i]); return btoa(s); }
function fromB64(b64) { const s=atob(b64); const u8=new Uint8Array(s.length); for(let i=0;i<s.length;i++) u8[i]=s.charCodeAt(i); return u8; }

export async function deriveArgon2(password, salt) {
  const enc = new TextEncoder();
  const result = await argon2.hash({
    pass: enc.encode(password),
    salt,
    time: 3, mem: 65536, parallelism: 4, hashLen: 32,
    type: argon2.ArgonType.Argon2id
  });
  return new Uint8Array(result.hash);
}

export async function encryptVault(password, data, meta = {}) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyBytes = await deriveArgon2(password, salt);
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

  // Firma Dilithium5 real
  const dsa = ml_dsa87.keygen(randomBytes(32));
  const signature = ml_dsa87.sign(new Uint8Array(ciphertext), dsa.secretKey);

  return {
    magic: MAGIC, version: VERSION, ...meta,
    salt: toB64(salt), iv: toB64(iv),
    ciphertext: toB64(new Uint8Array(ciphertext)),
    firma_pqc: toB64(signature),
    pqcPublicKey: toB64(dsa.publicKey),
    createdAt: new Date().toISOString()
  };
}

export async function decryptVault(vault, password) {
  if (vault.magic !== MAGIC) throw new Error('Formato inválido');

  // Verificar firma PQC si existe
  if (vault.firma_pqc && vault.pqcPublicKey) {
    const ok = ml_dsa87.verify(
      fromB64(vault.firma_pqc),
      fromB64(vault.ciphertext),
      fromB64(vault.pqcPublicKey)
    );
    if (!ok) throw new Error('FIRMA PQC INVÁLIDA - bóveda alterada');
  }

  const salt = fromB64(vault.salt);
  const iv = fromB64(vault.iv);
  const ciphertext = fromB64(vault.ciphertext);

  const keyBytes = await deriveArgon2(password, salt);
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);

  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext);
  return new Uint8Array(plaintext);
}
