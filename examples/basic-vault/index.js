// Ejemplo básico de uso de la bóveda
import { createVault, openVault } from '../../src/core/vault.js';

const password = 'mi-password-seguro';
const data = 'Mi voz grabada en formato base64...';

const vault = createVault(password, data);
console.log('Bóveda creada:', vault);

const decrypted = openVault(vault, password);
console.log('Bóveda abierta:', decrypted);
