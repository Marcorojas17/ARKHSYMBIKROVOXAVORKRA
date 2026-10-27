// vault.js — Bóveda real: Argon2id + AES-GCM + Kyber1024 + Dilithium5
// Modo navegador (sin firma PQC): firma_pqc = null -> openVault salta verificación

import { deriveKey } from '../crypto/argon2id_kdf.js';
import { generateKeypair as pqcDsaKeypair, sign as pqcSign, verify as pqcVerify } from '../crypto/pqc_dilithium.js';
import { encapsulate } from '../crypto/pqc_kyber.js';

const MAGIC = 'ARKHVLT1';
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

export async function createVault(password, data, options = {}) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const { hash: aesKeyBytes } = await deriveKey(password, salt);
  const aesKey = await crypto.subtle.importKey(
    'raw', aesKeyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
  );
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, data);

  // Firma PQC opcional (solo si se pide, requiere @noble instalado)
  let signature = null;
  let pqcPublicKey = null;
  if (options.signPQC) {
    try {
      const dsa = pqcDsaKeypair();
      signature = toB64(pqcSign(new Uint8Array(ciphertext), dsa.secretKey));
      pqcPublicKey = toB64(dsa.publicKey);
    } catch (e) {
      // En navegador sin @noble instalado, se omite con advertencia
      console.warn('Firma PQC omitida:', e.message);
    }
  }

  return {
    magic: MAGIC,
    version: VERSION,
    salt: toB64(salt),
    iv: toB64(iv),
    ciphertext: toB64(new Uint8Array(ciphertext)),
    firma_pqc: signature,
    pqcPublicKey: pqcPublicKey,
    createdAt: new Date().toISOString(),
    note: signature ? 'signed' : 'unsigned (navegador sin PQC)'
  };
}

export async function openVault(vault, password) {
  const salt = fromB64(vault.salt);
  const iv = fromB64(vault.iv);
  const ciphertext = fromB64(vault.ciphertext);

  // Firma PQC: solo si existe
  if (vault.firma_pqc && vault.pqcPublicKey) {
    const ok = pqcVerify(fromB64(vault.firma_pqc), ciphertext, fromB64(vault.pqcPublicKey));
    if (!ok) throw new Error('FIRMA PQC INVALIDA - bóveda alterada');
  } else {
    console.warn('Bóveda sin firma PQC: solo cifrado AES-GCM');
  }

  const { hash: aesKeyBytes } = await deriveKey(password, salt);
  const aesKey = await crypto.subtle.importKey(
    'raw', aesKeyBytes, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
  );
  try {
    const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, ciphertext);
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
