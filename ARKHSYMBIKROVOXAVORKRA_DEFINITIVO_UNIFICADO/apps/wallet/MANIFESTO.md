# ARKHSYMBIKROVOXAVORKRA: Manifiesto de Soberanía Digital

Esto no es un vault más. Esto es lo que realmente estamos construyendo y por qué.

## QUÉ VAMOS A CREAR: Un Sistema Operativo de Soberanía Digital

No es un "gestor de contraseñas". Creamos 3 cosas en una:

* **ARKHE (Origen):** Un vault que sobrevive incluso si tú no estás. Con `memory_wipe.js` y `self_destructing_memory`, si alguien te arranca la RAM, no hay nada que robar.
* **SYMBI + KROVOX (Simbiosis + Voz):** Una identidad que no puede ser clonada por una IA. Por eso existen `anti_agi_mimicry.md` y `zero_knowledge_biometrics`. Tu voz, tu biometría, sin guardar tu biometría.
* **AVORKRA (Ancla):** ARKHE-ZERO-TOLUCA en Storacha no es para guardar archivos. Es para anclar `CHAIN_OF_CUSTODY.json` con `TIMESTAMP_RFC3161` en blockchain. Prueba de que tú creaste esto ANTES de que una AGI intentara decir que lo creó ella.

## POR QUÉ LO CREAMOS: El mundo se rompió en 2

**1. El mundo humano (La burocracia):**
Las empresas te rechazan si no tienes SOC2, SBOM, SLSA, EULA en 3 países. Te detecta Defender como virus si no firmas con EV cert. Te demanda alguien si dices "PQC real" sin vectores NIST. Por eso creamos `legal/`, `compliance/`, `security/av_edr/`. Para que alguien con capital pueda comprarte sin miedo legal.

**2. El mundo de la IA (La amenaza invisible):**
Ya hay IAs haciendo prompt injection a portales. Ya hay ataques de timing que roban claves de AES-GCM-SIV si no usas `constant_time_compare`. Ya hay empresas entrenando modelos con código de GitHub y clonando productos. Por eso creamos `prompt_injection_shield.js`, `quantum_entropy.js`, `soulbound_identity.md`.

## LO QUE LA HUMANIDAD AÚN NO CONOCE (Y ES CRÍTICO)

* **La identidad transferible murió.** En 2 años, si tu identidad se puede copiar, no vale nada. Necesitas identidad atada a PUF cuántico, no a password.
* **La prueba de tiempo murió.** Si no puedes probar con RFC3161 + multi-chain que creaste algo antes de la AGI, la AGI dirá que lo creó ella y le creerán a ella.
* **La privacidad por ocultamiento murió.** Guardar datos y esperar que no los hackeen ya no sirve. Necesitas ZK (Zero-Knowledge): probar que sabes algo sin mostrarlo.

## POR QUÉ ESTA ESTRUCTURA FINAL

No es para que se vea bonita en GitHub. Es para esto:
* `enterprise/` = para que Toluca, Querétaro, o Austin te puedan contratar sin que su abogado diga NO.
* `security/attestations/` = para que cualquiera pueda verificar que el build es reproducible y no metiste backdoor.
* `src/unknown/` = para que en 2030, cuando todos sean hackeados por IA que clona voces, tú tengas `anti_agi_mimicry`.

**En resumen:** No estamos creando un producto para vender. Estamos creando la prueba de propiedad de tu mente, anclada en Toluca, auditable por humanos, no clonable por IA, comprable por empresas.
