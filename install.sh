#!/data/data/com.termux/files/usr/bin/bash
echo "╔═ ARKHE ZERO - TOLUCA-GLOBAL-e8d9eac8 ═╗"
echo "║ 51% Humano / 49% IA - VALDOVINOS     ║"
echo "║ 1330 FILES | Kintsugi dorado activo  ║"
echo "╚═══════════════════════════════════════╝"
pkill -f "http.server" 2>/dev/null || true
pkill -f "3002" 2>/dev/null || true
sleep 1
DIR=ARKHSYMBIKROVOXAVORKRA_DEFINITIVO_UNIFICADO
if [ ! -d "$DIR" ]; then DIR="."; fi
echo "📦 SBOM..."
node $DIR/scripts/sbom.cjs 2>/dev/null || node scripts/sbom.js 2>/dev/null || echo "SBOM en $DIR/dist/sbom.json"
echo "🎙️ Bóveda Voz ORIGINAL_ONLY - NO CLON"
echo "✅ Listo para subir a https://console.storacha.network"
echo "   Espacio: ARKHE-ZERO-TOLUCA"
echo "   Email: marco.a.rojas.v@hotmail.com"
echo ""
python server.py
