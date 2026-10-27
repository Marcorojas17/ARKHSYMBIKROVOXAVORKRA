// multivault.js — Bóveda con N voces
import { encryptVault, decryptVault } from './portal.js';

export async function createMultiVault(password, voices) {
  // voices: [{name, relative, blob}]
  const manifest = [];
  const encryptedVoices = [];

  for (const v of voices) {
    const data = new Uint8Array(await v.blob.arrayBuffer());
    const enc = await encryptVault(password, data, {
      name: v.name,
      relative: v.relative || '',
      mimeType: v.blob.type,
      duration: v.duration || 0
    });
    encryptedVoices.push(enc);
    manifest.push({
      name: v.name,
      relative: v.relative,
      hash: enc.firma_pqc?.slice(0, 16),
      createdAt: enc.createdAt
    });
  }

  return {
    magic: 'ARKHMULT1',
    version: 1,
    voices: encryptedVoices,
    manifest,
    voiceCount: voices.length,
    createdAt: new Date().toISOString()
  };
}

export async function openMultiVault(multiVault, password, voiceIndex) {
  const voice = multiVault.voices[voiceIndex];
  const data = await decryptVault(voice, password);
  return {
    data,
    meta: {
      name: voice.name,
      relative: voice.relative,
      mimeType: voice.mimeType
    }
  };
}

export function getMasterHash(multiVault) {
  // Hash maestro: SHA-256 de todos los firma_pqc concatenados
  const combined = multiVault.voices.map(v => v.firma_pqc || '').join('');
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(combined))
    .then(h => Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2,'0')).join(''));
}
