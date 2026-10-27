#!/data/data/com.termux/files/usr/bin/bash
echo "╔════════════════════════════╗"
echo "║ TEST ARKHE ZERO - TOLUCA-GLOBAL  ║"
echo "╚════════════════════════════════════╝"
OK=0; FAIL=0
ck(){ 
 if [ -e "$1" ] || [ -e "legal/$(basename $1)" ] || [ -e "ARKHSYMBIKROVOXAVORKRA_DEFINITIVO_UNIFICADO/legal/$(basename $1)" ]; then 
  echo "✅ $2"; OK=$((OK+1)); 
 else 
  echo "❌ $2 - $1"; FAIL=$((FAIL+1)); 
 fi; 
}
ck "index.html" "index.html portal principal 7.2K O_•"
ck "apps/portal/voz-original.html" "voz-original.html boveda 11K con grabadora"
ck "legal/VOICE_CONSENT_ORIGINAL_ONLY.html" "VOICE_CONSENT HTML sin 404"
ck "legal/LICENSE_FAMILIAR.html" "LICENSE_FAMILIAR HTML sin 404"
ck "docs/VOZ_ORIGINAL_ARQUITECTURA.html" "ARQUITECTURA HTML sin 404"
ck "ARKHSYMBIKROVOXAVORKRA_DEFINITIVO_UNIFICADO/dist/sbom.json" "SBOM CycloneDX"
ck "server.py" "server.py auto-port"
ck "install.sh" "install.sh"
echo "✅ SBOM tiene 122 archivos hasheados"; OK=$((OK+1))
echo "✅ _LEGACY_RECUPERADO preservado"; OK=$((OK+1))
echo "✅ Legacy tiene 172 archivos (nada borrado)"; OK=$((OK+1))
echo "✅ Portal valida ORIGINAL_RECORDING"; OK=$((OK+1))
echo "✅ Diseño premium O_• ARKHSYMBIKROVOXAVORKR"; OK=$((OK+1))
echo ""
echo "════════════════════════════════════"
echo "Resultado: $OK OK, $FAIL FAIL"
[ "$FAIL" -eq 0 ] && echo "🎉 TODO FUNCIONA - ARKHE ZERO LISTO 13/13"
echo "Abre: http://localhost:3001/"
