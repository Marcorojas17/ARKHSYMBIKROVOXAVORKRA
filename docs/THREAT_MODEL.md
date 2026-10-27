# Threat Model (STRIDE)

| Amenaza | Descripción | Mitigación |
|:---|:---|:---|
| **Spoofing** | Suplantación de identidad | Firmas ML-DSA + DID |
| **Tampering** | Modificación del audio | Hash SHA-256 inmutable |
| **Repudiation** | Negar haber grabado | Anclaje en Ethereum |
| **Info Disclosure** | Robo de la voz | Cifrado AES-256-GCM |
| **DoS** | Ataque de saturación | Rate Limiting (Express) |
| **Elevation** | Acceso no autorizado | Control de roles en Smart Contract |
