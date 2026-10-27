#!/bin/bash
FILE="$1"

if [ -z "$ARKHE_SECRET" ]; then
  echo "Error: Debes configurar ARKHE_SECRET. Ej: export ARKHE_SECRET=\$(openssl rand -hex 32)"
  exit 1
fi

if [ ! -f "$FILE" ]; then 
  echo "Error: Archivo no encontrado: $FILE"
  exit 1
fi

# Crear carpeta de certificados si no existe
mkdir -p certificates

HASH=$(sha256sum "$FILE" | awk '{print $1}')
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SEAL=$(echo -n "$HASH$TIMESTAMP" | openssl dgst -sha256 -hmac "$ARKHE_SECRET" | awk '{print $2}')

OUT="certificates/$(basename "$FILE").arkh.json"
echo "{\"file\": \"$FILE\", \"hash\": \"$HASH\", \"timestamp_utc\": \"$TIMESTAMP\", \"hmac_seal\": \"$SEAL\"}" > "$OUT"

echo "✅ Certificado forense generado y guardado en: $OUT"
