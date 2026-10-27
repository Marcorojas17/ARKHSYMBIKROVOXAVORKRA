#!/usr/bin/env node
// quantum_attack_sim.js — simulación educativa (no ataque real)
console.log('=== QUANTUM ATTACK SIMULATION ===');
console.log('');
console.log('Escenario: Algoritmo de Shor contra ECDSA');
console.log('Complejidad: O(n^3) qubits donde n = bits de la curva');
console.log('secp256k1 (256 bits): ~1500 qubits lógicos estables');
console.log('Qubits físicos necesarios: ~10^6 (con corrección de error)');
console.log('');
console.log('Estado actual (2026): ~100-500 qubits físicos ruidosos');
console.log('Q-Day estimado: 2030-2035');
console.log('');
console.log('Contra AES-256: Grover reduce a 128 bits efectivos');
console.log('Contra SHA-256: Grover reduce a 128 bits efectivos');
console.log('Contra Kyber1024 (PQC): SEGURO incluso con Shor');
