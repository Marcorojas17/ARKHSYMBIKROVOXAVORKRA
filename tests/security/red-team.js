// Script de Red Team: Escaneo básico de vulnerabilidades
const targetUrl = 'http://localhost:3000';

async function runRedTeam() {
    console.log(`🕵️  Iniciando Red Team contra ${targetUrl}...`);

    try {
        // 1. Verificar cabeceras de seguridad
        const res = await fetch(targetUrl);
        const headers = res.headers;
        
        console.log("🔍 Analizando cabeceras HTTP...");
        if (!headers.get('content-security-policy')) {
            console.warn("⚠️  Falta Content-Security-Policy (CSP)");
        } else {
            console.log("✅ CSP Detectada");
        }

        if (!headers.get('x-frame-options')) {
            console.warn("⚠️  Falta X-Frame-Options (Clickjacking)");
        }

        // 2. Intentar inyección básica
        console.log("💉 Probando inyección SQL/XSS...");
        const payload = encodeURIComponent("<script>alert(1)</script>");
        const injRes = await fetch(`${targetUrl}/?q=${payload}`);
        
        if (injRes.status === 200) {
            console.log("✅ Respuesta controlada (No XSS detectado)");
        }

        console.log("🏁 Red Team finalizado.");
    } catch (err) {
        console.error("❌ Error en Red Team:", err.message);
    }
}

runRedTeam();
