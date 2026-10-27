#!/data/data/com.termux/files/usr/bin/bash
# TERRENO CERO - ARKHSYMBIKROVOXAVORKRA
# Titular: Marco Antonio Rojas Valdovinos - 51% Humano 49% IA
set -e

echo "PREPARANDO TERRENO CERO - ARKHSYMBIKROVOXAVORKRA"

echo "[01] Binarios base..."
pkg update -y
pkg install -y git nodejs python wget

echo "[02] Estructura..."
mkdir -p ARKHSYMBIKROVOXAVORKRA
cd ARKHSYMBIKROVOXAVORKRA

echo "[03] Instalando dependencias npm..."
npm install

echo "[04] Check..."
node scripts/check.js

echo "[05] Build..."
node scripts/build.js

echo ""
echo "TERRENO LISTO - ARKHSYMBIKROVOXAVORKRA"
echo "Ruta: $(pwd)"
echo "Siguiente: npm run serve  o  npm run live"
echo "51% Humano - 49% IA - 100% Real"
