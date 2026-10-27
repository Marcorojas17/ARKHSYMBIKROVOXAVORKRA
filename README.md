<!--
  KRONOS 2099 — README Sellado
  SEAL: 2607086319439-2036-GPG
  Implementación actual: ARKHSYMBIKROVOXAVORKRA v1.0
-->

<div align="center">

```

██╗  ██╗██████╗  ██████╗ ███╗   ██╗ ██████╗ ███████╗
██║ ██╔╝██╔══██╗██╔═══██╗████╗  ██║██╔═══██╗██╔════╝
█████╔╝ ██████╔╝██║   ██║██╔██╗ ██║██║   ██║███████╗
██╔═██╗ ██╔══██╗██║   ██║██║╚██╗██║██║   ██║╚════██║
██║  ██╗██║  ██║╚██████╔╝██║ ╚████║╚██████╔╝███████║
╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
2 0 9 9

```

**El SSL de la Voz Humana**

> *"En 2099, probar que dijiste algo será tan importante como probar que lo firmaste.
> Construimos la llave antes de que la cerradura exista."*

[![SEAL](https://img.shields.io/badge/SEAL-2607086319439--2036--GPG-000000?style=flat-square&labelColor=000000)](#-el-sello)
[![STATUS](https://img.shields.io/badge/status-BETA_FUNCIONAL-yellow?style=flat-square&labelColor=000000)](#-qué-es-y-qué-no-es)
[![FILES](https://img.shields.io/badge/files-198-000000?style=flat-square&labelColor=000000)](#-estructura)
[![CID](https://img.shields.io/badge/IPFS-QmNXN4o...-000000?style=flat-square&labelColor=000000)](#-el-sello)
[![LICENSE](https://img.shields.io/badge/license-Open_Sovereign-000000?style=flat-square&labelColor=000000)](#-licencia)

</div>

---

## ◢ ÍNDICE

- [🧠 El problema](#-el-problema)
- [🜂 La respuesta](#-la-respuesta)
- [🔏 El sello](#-el-sello)
- [⚙️ Cómo funciona](#-cómo-funciona)
- [🚫 Qué es y qué NO es](#-qué-es-y-qué-no-es)
- [📁 Estructura](#-estructura)
- [🚀 Instalación](#-instalación)
- [🎯 Estado real del proyecto](#-estado-real-del-proyecto)
- [🌐 Soberanía](#-soberanía)
- [🗺️ Roadmap](#-roadmap)
- [📜 Licencia](#-licencia)

---

## 🧠 El problema

```

2026 ─────────────────────────────────────────────────► 2099

```

La primera vez fue un fraude. La segunda, una elección. La tercera, una guerra.

**Después dejamos de contar.**

La voz dejó de ser prueba. Se volvió ruido.

En 2026 ya no podías demostrar que **tú** dijiste algo. Podías grabar. Podías subir. Podías transcribir. Pero no podías probar que la voz en el archivo **era tuya, y no de un modelo entrenado con diez segundos tuyos.**

> **El último testigo murió sin poder testificar.**
> **El último acuerdo se firmó con la boca cerrada.**
> **Nadie hizo nada.**

Hasta ahora.

---

## 🜂 La respuesta

**KRONOS 2099** es la visión. **ARKHSYMBIKROVOXAVORKRA** es la implementación.

```

┌─────────────────────────────────────────────────────────┐
│                                                         │
│   No detecta IA.      →   PRUEBA HUMANIDAD.             │
│   No adivina.         →   FIRMA.                        │
│   No depende de una   →   DEPENDE DE MATEMÁTICAS.       │
│   empresa.                                              │
│                                                         │
└─────────────────────────────────────────────────────────┘

```

Es open source. Es auditables. No tiene versión anterior que borrar. **LEGACY 0.**

---

## 🔏 El sello

**El SEAL no es un logo. Es un ancla.**

Proviene del **Acta Fundacional del Movimiento de Co-Creatividad Simbiótica y Respeto Digital**, registrada en Safe Creative el **8 de julio de 2026 a las 7:02 UTC**, con prueba blockchain en Ethereum.

```

─────────────────────────────────────────────────────────────
ID RAÍZ          2607086319439
SHA-256          41a3683bbf83296eeb45da9b0e0ea5a7c095e78b49
3772e79520a92dbc39f4c3
BLOCKCHAIN       Ethereum · 0x8ca8e84e...2970e
IPFS CID         QmNXN4oMkWd4yaFCPGjrW5D4DgrDNLjYHyFNpWNC4owxR6
MASTER HASH      0x2d41cd6330eba4f2c09e037b8e9e19ba79
322b416eaeb397d5204e4f2a18cba3
CADENA           /legal/CHAIN_OF_CUSTODY.json
─────────────────────────────────────────────────────────────

```

> **Honestidad radical:** el Acta Fundacional declara **51% humano / 49% IA** en concepto, dirección creativa y producción. No lo escondemos. Es parte del diseño.

---

## ⚙️ Cómo funciona

```

┌──────────────────┐
│  Tu voz, humana  │
└─────────┬────────┘
│
┌─────────▼────────┐
│   mediaRecorder  │   ← Captura en navegador
└─────────┬────────┘
│
┌─────────▼────────┐
│  Argon2id KDF    │   ← OWASP 2024 · 64MB · 3 iter
└─────────┬────────┘
│
┌─────────▼────────┐
│  AES-256-GCM     │   ← Cifrado autenticado
└─────────┬────────┘
│
┌─────────▼────────┐
│  ML-DSA-87       │   ← Firma PQC (Dilithium5 · FIPS 204)
└─────────┬────────┘
│
┌─────────▼────────┐
│  bóveda .arkh    │   ← Descargable, offline, tuya
└──────────────────┘

```

### Tres capas. Un solo sello.

**01 · Argon2id**
El KDF resistente a GPU/ASIC. Parámetros OWASP 2024: 64 MB de memoria, 3 iteraciones, paralelismo 4. Ni una GPU dedicada puede romperlo fácilmente.

**02 · AES-256-GCM**
Cifrado autenticado. No solo confidencialidad: también integridad. Si un byte cambia, el descifrado falla.

**03 · ML-DSA-87 (Dilithium5)**
Firma post-cuántica según NIST FIPS 204. Cuando llegue el Q-Day (computación cuántica que rompa ECDSA/RSA), tus bóvedas seguirán siendo seguras.

---

## 🚫 Qué es y qué NO es

**Esto es lo más importante del documento.**

```

╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ✗  No es una IA que "detecta" IA.                              ║
║      Es un sistema de firma. Detecta integridad, no intención.   ║
║                                                                  ║
║   ✗  No es un notario.                                           ║
║      No da fe pública. Da evidencia técnica verificable.         ║
║                                                                  ║
║   ✗  No es infalsificable.                                       ║
║      Nada lo es. Es resistente bajo custodia segura de llaves.   ║
║                                                                  ║
║   ✗  No sustituye asesoría legal.                                ║
║      La validez depende del uso, no del código.                  ║
║                                                                  ║
║   ✗  No es central.                                              ║
║      No hay un servidor al que pedir permiso.                    ║
║                                                                  ║
║   ✗  No es gratis para producción a escala.                      ║
║      El núcleo sí. Los servicios de escala no.                   ║
║                                                                  ║
║   ✗  No está auditado externamente.                              ║
║      STATUS.md dice qué es REAL vs PENDING. Leerlo.              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

```

Ver **[STATUS.md](STATUS.md)** para clasificación honesta de cada archivo (REAL / STUB / HARDWARE / PENDING).

---

## 📁 Estructura

```

ARKHSYMBIKROVOXAVORKRA/
│
├── ◆  src/pages/      → portal + PQC navegador + i18n
├── ◆  src/core/       → vault · kernel · identity · memory_wipe
├── ◆  src/crypto/     → ML-KEM · ML-DSA · SLH-DSA · Argon2id · AES-GCM
├── ◆  src/defense/    → WAF · rate limit · audit log · prompt shield
├── ◆  src/unknown/    → AGI · soulbound · ZK-biometrics (futuro)
├── ◆  bin/            → arkh · vault · identity · servers
├── ◆  scripts/        → build · check · seal · sbom · anchor-prep
├── ◆  contracts/      → anchor.sol (con CID real) · anchor_pqc.sol
├── ◆  tests/          → vault · defense · quantum · red-team
├── ◆  public/         → PWA manifest · sw · favicon
├── ◆  docs/           → install · vault · legal · blockchain
├── ◆  legal/          → licencias + chain-of-custody + notarial
├── ◆  compliance/     → SOC2 · GDPR · HIPAA · NIS2
├── ◆  enterprise/     → SSO · SCIM · SLA · pricing
├── ◆  security/       → sbom · csp · sigstore · slsa
│
├── ▓  dist/           → build (gitignored)
└── ▓  .arkh/          → núcleo (gitignored)

```

**198 archivos · 59 directorios · 101/101 checks GREEN.**

---

## 🚀 Instalación

```console
$ pkg install nodejs python git
$ git clone <repo> ARKHSYMBIKROVOXAVORKRA
$ cd ARKHSYMBIKROVOXAVORKRA
$ npm install
$ ./bin/arkh check
```

```text
ARKH CHECK - 1330 archivos verificados [■■]
[■■■■] 11/11 archivos base OK - 101/101
[■■■■■] Kintsugi: grietas doradas activas
```

Una línea. Un demo. Treinta segundos.
Si en 30 segundos no verificaste una voz, no es ARKH. Es otra cosa.

---

🎯 Estado real del proyecto

```
Fase   Foco                                    Estado
────   ────────────────────────────────────    ─────────
F0     Cimientos: web, kernel, vault            🟢 95%
F1     Verificación: cymatic, PQC, seal-verify  🟢 80%
F2     Soberanía: self-audit, provenance        🟡 60%
F3     Producto: monetization, compliance       🟡 40%
F4     Escala: mobile, PWA, interop, hardware   🟡 25%
F5     Marca: viral, design, comunidad          🔴 10%
```

Lo que funciona hoy:

· ✅ Portal grabador + bóveda Argon2id + AES-GCM + ML-DSA-87
· ✅ Multi-voz + QR del master hash
· ✅ CLI arkh · vault · identity
· ✅ Servidores Node + Python con honeypot
· ✅ PWA instalable · i18n ES/EN
· ✅ Tests (vault, defense, quantum)
· ✅ IPFS CID QmNXN4o... (verificable públicamente)
· ✅ Contrato Solidity con master hash embebido

Lo que falta (honesto):

· ⏳ Deploy en Sepolia (15 min, guía en docs/BLOCKCHAIN.md)
· 📝 Notarización legal (~$1,500 MXN)
· 📝 Registro IMPI (~$2,500 MXN)
· 📝 Auditoría externa (~$5k-15k USD)
· 🔴 Enclave SGX (requiere hardware físico)

---

🌐 Soberanía

```
─────────────────────────────────────────────────────────────────
AUDITORÍA         propia, pública, firmada con GPG
CERTIFICACIÓN     auto-atestación en .well-known/attestation.json
NORMA             KRONOS-1 · KRONOS-2-PQ · KRONOS-3-VOZ
INFRAESTRUCTURA   espejos · IPFS · torrents
                  GitHub es espejo, no origen
LLAVES            custodia propia · Shamir Secret Sharing
GOBERNANZA        asamblea · veto · derecho a fork
TRANSPARENCIA     todo público, incluso nuestros errores
─────────────────────────────────────────────────────────────────
```

Precedente: Debian. Bitcoin. GPG. Tor.
No es nuevo. Es probado.

Ver /docs/LEGAL.md.

---

🗺️ Roadmap

v1.0 se alcanza cuando estos siete módulos estén al 100%:

```
apps/portal     ·  src/core       ·  src/crypto
src/defense     ·  contracts      ·  docs
provenance
```

Siete módulos. Nada más. Todo lo demás amplifica.

Ver /STATUS.md para el detalle fase por fase.

---

📜 Licencia

Open Sovereign.

· ✅ Código abierto para auditoría, fork y uso familiar
· 💰 Servicios de escala, certificación y peritaje son de pago
· 🔐 El núcleo siempre será auditable

Ver legal/LICENSE_GLOBAL_PROPIETARIA.txt y legal/LICENSE_FAMILIAR.txt.

---

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                          K R O N O S                         ║
║                            2 0 9 9                           ║
║                                                              ║
║                 El SSL de la Voz Humana                      ║
║                                                              ║
║              198 files · Beta · LEGACY 0                     ║
║                                                              ║
║            "La voz humana no se pierde.                      ║
║                    Se firma."                                ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   SEAL      2607086319439-2036-GPG                           ║
║   ORIGEN    2026-07-08 07:02:03 UTC                          ║
║   IPFS      QmNXN4oMkWd4yaFCPGjrW5D4DgrDNLjYHyFNpWNC4owxR6  ║
║   CADENA    /legal/CHAIN_OF_CUSTODY.json                     ║
║                                                              ║
║   Firmado. Verificable. Soberano.                            ║
║   Co-Creatividad Simbiótica y Respeto Digital.               ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

</div>

<!--
  ─────────────────────────────────────────────────────────────
  Documento firmado con SEAL 2607086319439-2036-GPG
  Hash del README: [auto-generado en .arkh/seal_manifest.json]
  ─────────────────────────────────────────────────────────────
-->

