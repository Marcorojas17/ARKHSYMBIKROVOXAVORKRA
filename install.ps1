# ARKHSYMBIKROVOXAVORKRA - Windows Installer
Write-Host "◯_● Iniciando instalación del ecosistema ARKH..." -ForegroundColor Cyan

if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js no encontrado. Instálalo desde nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Instalando dependencias..."
npm install

if (!(Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "⚠️  Archivo .env creado. Edítalo y agrega tus API Keys." -ForegroundColor Yellow
}

Write-Host "✅ Instalación completada. Ejecuta: npm start" -ForegroundColor Green
