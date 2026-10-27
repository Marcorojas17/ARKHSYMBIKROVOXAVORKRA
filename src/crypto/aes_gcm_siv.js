// aes_gcm_siv.js — cifrado simétrico AEAD
// Usa Web Crypto API nativa del navegador/Node
// Real, no stub — esto SÍ funciona

export async function encrypt(plaintext, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    new TextEncoder().encode(plaintext)
  );
  return { iv, ciphertext: new Uint8Array(ct) };
}

export async function decrypt(ciphertext, iv, key) {
  const pt = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(pt);
}

export async function generateKey() {
  return await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}
