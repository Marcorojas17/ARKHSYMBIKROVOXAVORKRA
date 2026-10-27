// enclave_loader.js — concepto TEE/SGX (STUB educativo)
// Un enclave real requiere Intel SGX, AMD SEV, o ARM TrustZone.
// Este archivo solo muestra la INTERFAZ esperada.

export async function loadInEnclave(code) {
  throw new Error('TEE real requiere hardware específico (SGX/SEV/TrustZone)');
}

export function isEnclaveAvailable() {
  return false; // No disponible en navegador/Node estándar
}
