// Simulador de ataque cuántico (Educativo)
console.log("⚛️  Iniciando simulación de ataque cuántico...");

// Simula el tiempo que tomaría romper una llave ECDSA con un ordenador cuántico
const qubits = 4096;
const timeToCrackYears = Math.pow(2, qubits / 2) / (60 * 60 * 24 * 365);

console.log(`🔐 Algoritmo: ECDSA secp256k1`);
console.log(`💻 Poder de cómputo: ${qubits} qubits lógicos`);
console.log(`⏳ Tiempo estimado de ruptura: ${timeToCrackYEARS.toExponential(2)} años`);

if (timeToCrackYears < 10) {
    console.warn("⚠️  Vulnerabilidad alta. Migrar a ML-DSA (PQC) inmediatamente.");
} else {
    console.log("✅ Sistema seguro actualmente. (Pero PQC es el futuro).");
}
