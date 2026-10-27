// qkd_sim.js — Simulación educativa de QKD (NO es criptografía real)
// Simula el protocolo BB84 para fines didácticos y de diseño

export function simulateBB84(bits = 32) {
  const alice_bits = Array.from({length: bits}, () => Math.random() > 0.5 ? 1 : 0);
  const alice_bases = Array.from({length: bits}, () => Math.random() > 0.5 ? '+' : 'x');
  const bob_bases = Array.from({length: bits}, () => Math.random() > 0.5 ? '+' : 'x');
  const matching = alice_bases.map((b, i) => b === bob_bases[i]);
  const shared = alice_bits.filter((_, i) => matching[i]);
  return { alice_bits, alice_bases, bob_bases, matching, shared };
}
