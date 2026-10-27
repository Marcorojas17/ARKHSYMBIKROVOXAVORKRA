#!/usr/bin/env bash
# ARKHSYMBIKROVOXAVORKRA - Installer
set -e

echo "◯_● Iniciando instalación del ecosistema ARKH..."
pkg update -y && pkg install nodejs python git -y

echo "📦 Instalando dependencias..."
npm install

echo "🔐 Configurando entorno..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Archivo .env creado. Edítalo y agrega tus API Keys."
fi

echo "🧪 Verificando sistema..."
npm test

echo "✅ Instalación completada. Ejecuta: npm start"
