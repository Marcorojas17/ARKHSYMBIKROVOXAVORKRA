#!/bin/bash
FILE="$1"
if [ ! -f "$FILE" ]; then echo "Error: Archivo no encontrado"; exit 1; fi
HASH=$(sha256sum "$FILE" | awk '{print $1}')
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
# Generación de sello HMAC rápido para el ejemplo
SEAL=$(echo -n "$HASH$TIMESTAMP" | openssl dgst -sha256 -hmac "ARKHE_ZERO_KEY" | awk '{print $2}')
echo "{\"file\": \"$FILE\", \"hash\": \"$HASH\", \"timestamp_utc\": \"$TIMESTAMP\", \"hmac_seal\": \"$SEAL\"}"
