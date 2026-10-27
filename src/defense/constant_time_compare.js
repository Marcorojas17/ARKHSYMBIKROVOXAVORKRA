import crypto from 'crypto';

/**
 * Compara dos strings o hashes en tiempo constante.
 * Evita ataques de temporización (timing attacks) al no detenerse en el primer byte diferente.
 */
export function constantTimeCompare(val1, val2) {
  if (typeof val1 !== 'string' || typeof val2 !== 'string') {
    return false;
  }
  
  const buf1 = Buffer.from(val1);
  const buf2 = Buffer.from(val2);
  
  // Si las longitudes son diferentes, retorna false de inmediato
  // (La longitud no se considera información sensible en este contexto).
  if (buf1.length !== buf2.length) {
    return false;
  }
  
  // crypto.timingSafeEqual hace la comparación byte a byte sin cortocircuito
  return crypto.timingSafeEqual(buf1, buf2);
}
