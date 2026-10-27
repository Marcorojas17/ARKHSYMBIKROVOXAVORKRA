// Patrones comunes de ataque de Prompt Injection
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now\s+DAN/i,
  /reveal\s+(your\s+)?(system\s+)?prompt/i,
  /bypass\s+(security|filters|restrictions)/i,
  /act\s+as\s+(an?\s+)?(unrestricted|unfiltered)/i
];

/**
 * Middleware de Express para bloquear intentos de manipulación de IA.
 */
export function promptInjectionShield(req, res, next) {
  // Concatenamos body y query para analizar todo el texto que entra
  const inputText = JSON.stringify(req.body || {}) + JSON.stringify(req.query || {});
  
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(inputText)) {
      console.warn(`\n🚨 [SECURITY ALERT] Prompt Injection bloqueado.`);
      console.warn(`   Patrón detectado: ${pattern}`);
      console.warn(`   IP: ${req.ip || 'Desconocida'}\n`);
      
      return res.status(403).json({ 
        error: "SECURITY_VIOLATION",
        message: "Intento de inyección detectado y bloqueado por ARKHE Defense." 
      });
    }
  }
  
  // Si está limpio, continúa con la petición
  next();
}
