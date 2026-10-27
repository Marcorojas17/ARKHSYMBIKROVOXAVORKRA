# Arquitectura Voz Original - Por qué NO clonamos

## Problema de la industria:
TTS Clone = genera lo que NUNCA dijiste = demanda por suplantación + fraude.
Detectado como malware por antivirus (comportamiento deepfake).

## Nuestra solución:
ORIGINAL_ONLY_NO_CLONE

1. Graba: MediaRecorder -> Blob webm -> WAV
2. Sella: SHA256(arrayBuffer) + timestamp + Chain of Custody JSON
3. Valida: type must be ORIGINAL_RECORDING else BLOQUEADO
4. Reproduce: Audio(URL.createObjectURL(blob)) - sin IA generativa
5. Hereda: LICENSE_FAMILIAR.txt + VOICE_CONSENT

Avatar honesto:
"Yo no genero. Yo solo reproduzco lo que tu abuelo SI dijo el 2026-10-27. Hash: abc... Prueba en IPFS."

## Anti-malware:
- No obfuscation, no eval, no child_process oculto
- Todo firmado, SBOM CycloneDX, SLSA L3
- Comentario // SIMULACIÓN - NO ES QKD FÍSICO en qkd_sim.js
- behavior_manifest.md explica que solo accede a microfono con permiso

## Monetización:
- Familiar: $99/año por bóveda (Toluca)
- Enterprise: SSO, SCIM, SLA 99.9, SOC2, ISO27001
- Anclaje: Storacha ARKHE-ZERO-TOLUCA + IPFS + RFC3161
