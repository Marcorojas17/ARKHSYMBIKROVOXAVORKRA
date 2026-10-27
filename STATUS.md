# STATUS.md — Estado real de cada archivo

**Última actualización:** 2026-10-26
**Criterio:**
- **REAL** = funciona hoy (con `npm install` si aplica)
- **STUB** = existe pero `throw new Error`
- **HARDWARE** = requiere chip físico
- **PENDING** = documento de intención, no ejecutable

## ✅ REAL — funcional

### Núcleo
- `src/pages/index.html` — portal cyberpunk
- `src/core/vault.js` — bóveda Argon2id + AES-GCM + Dilithium5
- `src/crypto/pqc_kyber.js` — ML-KEM-1024 real
- `src/crypto/pqc_dilithium.js` — ML-DSA-87 real
- `src/crypto/pqc_sphincs.js` — SLH-DSA-SHA2-256f real
- `src/crypto/argon2id_kdf.js` — KDF OWASP 2024
- `src/crypto/aes_gcm_siv.js` — AES-GCM nativo
- `src/crypto/qkd_sim.js` — simulación BB84 (educativa)
- `src/defense/quantum_entropy.js` — CSPRNG nativo

### Ejecutables
- `bin/arkh` — CLI (check/build/serve/seal/harden/quantum)
- `bin/server.py` — HTTP/HTTPS + security headers + honeypot
- `bin/server-defense.js` — honeypot + WAF + IDS
- `bin/vault.js` — crear/abrir bóvedas

### Scripts
- `scripts/build.js` — copia src→dist
- `scripts/check.js` — valida archivos base
- `scripts/check-status.js` — valida clasificación
- `scripts/seal.js` — SHA-256 de críticos
- `scripts/harden.js` — chmod 700 + gitignore
- `scripts/quantum_test.js` — verifica módulos PQC

### Tests
- `tests/test-vault.js` — cifra/descifra/verifica/tamper
- `tests/test-defense.js` — ataca al backend Node
- `tests/test-server.py` — prueba servidor Python
- `tests/red_team.js` — checklist pentest
- `tests/quantum_attack_sim.js` — simulación Shor

### Legal (texto real)
- `legal/LICENSE_GLOBAL_PROPIETARIA.txt`
- `legal/LICENSE_FAMILIAR.txt`
- `legal/LICENSE_PQC.txt`
- `EULA.txt`

### Contratos
- `contracts/anchor.sol` — compila en Remix

## 🟡 STUB

- `src/core/guardian.js` — self-destruct no implementado (legal)
- `src/defense/honeypot.js` — stub, la versión real está en `bin/server-defense.js`
- `src/defense/intrusion_detection.js` — stub, IDS real en `bin/server-defense.js`

## 🔴 HARDWARE

- `security/enclave/enclave_loader.js` — requiere Intel SGX / AMD SEV / ARM TrustZone

## 📝 PENDING

- `legal/PATENT_PENDING.txt` — registro IMPI ($15k-30k MXN)
- `legal/NOTARIZATION_PROOF.md` — notario en Toluca
- `legal/CHAIN_OF_CUSTODY.json` — borrador
- `security/audit_report.md` — auditor externo ($5k-15k USD)
- `security/sbom.json` — regenerar con sbom real
- `contracts/proof_of_existence.json` — desplegar en Ethereum
- `.arkh/vault.arkh` — archivo de bóveda real (se genera al usar vault.js)

## Resumen

| Categoría | Cantidad |
|---|---|
| REAL | 27 |
| STUB | 3 |
| HARDWARE | 1 |
| PENDING | 7 |
| **Total** | **38** |

**Regla de honestidad:** si un archivo dice "REAL" aquí pero falla al ejecutar, es un bug — repórtalo.
