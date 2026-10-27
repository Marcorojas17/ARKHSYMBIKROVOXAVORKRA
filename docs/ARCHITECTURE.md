# ARKH Architecture

El ecosistema ARKH se divide en 4 capas:

1. **Capa de Presentación (Frontend):** `apps/portal` y `apps/wallet`.
2. **Capa de Servicios (Backend):** Express.js routes en `apps/server`.
3. **Capa Criptográfica (Core):** Lógica PQC en `src/crypto`.
4. **Capa de Datos (Blockchain):** Smart Contracts en `contracts/` e IPFS.

## Flujo de Datos
El usuario graba su voz en el Portal -> Se cifra con Argon2id en el Core -> Se ancla el Hash en Ethereum -> Se guarda la evidencia en IPFS.
