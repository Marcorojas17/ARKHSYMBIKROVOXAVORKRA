# THREAT_MODEL.md

## Modelo STRIDE

| Amenaza | Superficie | Mitigación actual | Pendiente |
|:---|:---|:---|:---|
| **Spoofing** | Portal web | Ninguna | DID + firma PQC |
| **Tampering** | src/, dist/ | SHA-256 en check.js | Firmar con Dilithium5 |
| **Repudiation** | Logs | No hay logs | Anclar en Ethereum |
| **Info disclosure** | Código fuente | .gitignore + repo privado | Cifrar vault.arkh |
| **DoS** | server.py | Ninguna | Rate limit + Cloudflare |
| **Elevation** | CLI arkh | chmod 600 | Sandbox |

## Amenazas cuánticas (Q-Day)

| Amenaza | Hoy | Post-Q-Day |
|:---|:---|:---|
| ECDSA secp256k1 | Seguro | Roto por algoritmo de Shor |
| AES-256 | Seguro | 50% más débil (Grover) |
| SHA-256 | Seguro | 50% más débil (Grover) |
| Kyber1024 | — | Seguro (NIST FIPS 203) |
| Dilithium5 | — | Seguro (NIST FIPS 204) |

## Ventana de riesgo
Estimación conservadora de Q-Day: **2030-2035**
Archivos firmados hoy con ECDSA: comprometidos si Q-Day ocurre antes de migrar.
