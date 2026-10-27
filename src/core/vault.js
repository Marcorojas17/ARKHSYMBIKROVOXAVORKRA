// vault.js — Bóveda real de voz: Argon2id + AES-GCM + Kyber1024
// Uso:
//   const v = await createVault('mi contraseña', audioBytes);
//   const b64 = vaultToBase64(v);
//   // ... guardar b64 en vault.arkh
//   const v2 = vaultFromBase64(b64);
//   const audio = await openVault(v2, 'mi contraseña');

import { deriveKey } from '../crypto/argon2id_kdf.js';
import { generateKeypair, encapsulate, decapsulate } from '../crypto/pqc_kyber.js';
import { sign as pqcSign, verify as pqcVerify, generateKeypair as pqcDsaKeypair } from '../crypto/pqc_dilithium.js';

const MAGIC = 'ARKHVLT1';  // 8 bytes identificador
const VERSION = 1;

function toB64(u8) {
  let s = '';
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s);
}

function fromB64(b64) {
  const s = atob(b64);
  const u8 = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
  return u8;
}

export async function createVault(password, data, recipientPublicKey) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  // 1. Derivar clave AES desde password (Argon2id)
  const { hash: aesKeyBytes } = await deriveKey(password, salt);
  const aesKey = await crypto.subtle.importKey(
    'raw', aesKeyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
  );

  // 2. Cifrar con AES-GCM
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    data
  );

  // 3. Si hay destinatario PQC, encapsular clave con Kyber
  let kyberCiphertext = null;
  let kyberShared = null;
  if (recipientPublicKey) {
    const enc = encapsulate(recipientPublicKey);
    kyberCiphertext = toB64(enc.cipherText);
    kyberShared = toB64(enc.sharedSecret);
  }

  // 4. Firmar todo con Dilithium5
  const dsa = pqcDsaKeypair();
  const payload = new Uint8Array(ciphertext);
  const signature = pqcSign(payload, dsa.secretKey);

  return {
    magic: MAGIC,
    version: VERSION,
    salt: toB64(salt),
    iv: toB64(iv),
    ciphertext: toB64(payload),
    kyberCiphertext,
    kyberShared,
    signature: toB64(signature),
    pqcPublicKey: toB64(dsa.publicKey),
    createdAt: new Date().toISOString()
  };
}

export async function openVault(vault, password) {
  const salt = fromB64(vault.salt);
  const iv = fromB64(vault.iv);
  const ciphertext = fromB64(vault.ciphertext);

  // 1. Verificar firma PQC
  const pqcPub = fromB64(vault.pqcPublicKey);
  const sig = fromB64(vault.signature);
  const ok = pqcVerify(sig, ciphertext, pqcPub);
  if (!ok) throw new Error('FIRMA PQC INVALIDA - bóveda alterada');

  // 2. Derivar clave AES
  const { hash: aesKeyBytes } = await deriveKey(password, salt);
  const aesKey = await crypto.subtle.importKey(
    'raw', aesKeyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
  );

  // 3. Descifrar
  try {
    const plaintext = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      ciphertext
    );
    return { ok: true, data: new Uint8Array(plaintext) };
  } catch (e) {
    return { ok: false, error: 'Contraseña incorrecta o datos corruptos' };
  }
}

export function vaultToBase64(vault) {
  return toB64(new TextEncoder().encode(JSON.stringify(vault)));
}

export function vaultFromBase64(b64) {
  return JSON.parse(new TextDecoder().decode(fromB64(b64)));
}
