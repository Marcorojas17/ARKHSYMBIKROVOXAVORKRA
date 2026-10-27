#!/bin/bash
FILE="$1"

if [ -z "$ARKHE_SECRET" ]; then
  echo "Error: Debes configurar la variable de entorno ARKHE_SECRET (export ARKHE_SECRET='tu_llave_privada')"
  exit 1
fi

if [ ! -f "$FILE" ]; then 
  echo "Error: Archivo no encontrado: $FILE"
  exit 1
fi

HASH=$(sha256sum "$FILE" | awk '{print $1}')
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# HMAC usando la variable de entorno secreta
SEAL=$(echo -n "$HASH$TIMESTAMP" | openssl dgst -sha256 -hmac "$ARKHE_SECRET" | awk '{print $2}')

echo "{\"file\": \"$FILE\", \"hash\": \"$HASH\", \"timestamp_utc\": \"$TIMESTAMP\", \"hmac_seal\": \"$SEAL\"}"
