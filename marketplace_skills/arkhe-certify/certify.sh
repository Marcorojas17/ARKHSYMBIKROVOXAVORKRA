#!/bin/bash
FILE="$1"

if [ -z "$ARKHE_SECRET" ]; then
  echo "Error: Debes configurar ARKHE_SECRET."
  exit 1
fi

if [ ! -f "$FILE" ]; then 
  echo "Error: Archivo no encontrado: $FILE"
  exit 1
fi

mkdir -p certificates

HASH=$(sha256sum "$FILE" | awk '{print $1}')
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
SEAL=$(echo -n "$HASH$TIMESTAMP" | openssl dgst -sha256 -hmac "$ARKHE_SECRET" | awk '{print $2}')

# El nombre incluye el timestamp para NO SOBRESCRIBIR evidencia
BASE_NAME=$(basename "$FILE")
SAFE_TIME=$(date -u +"%Y%m%d_%H%M%S")
OUT="certificates/${BASE_NAME}_${SAFE_TIME}.arkh.json"

echo "{
  \"format_version\": \"1.0\",
  \"algorithm\": \"HMAC-SHA256\",
  \"file\": \"$FILE\",
  \"hash\": \"$HASH\",
  \"timestamp_utc\": \"$TIMESTAMP\",
  \"hmac_seal\": \"$SEAL\"
}" > "$OUT"

echo "✅ Certificado forense inmutable generado: $OUT"
