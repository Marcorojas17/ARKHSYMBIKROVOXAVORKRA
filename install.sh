#!/data/data/com.termux/files/usr/bin/bash
echo "Instalando ARKHSYMBIKROVOXAVORKRA..."
pkg install -y nodejs python >/dev/null 2>&1
npm install
npm run check
npm run build
echo "Listo. Siguiente: npm run serve"
