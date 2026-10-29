#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { ml_dsa87 } from '@noble/post-quantum/ml-dsa'; // Asumiendo que usas esta librería
import { webcrypto as crypto } from 'crypto';

async function verifySignature() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error("Uso: node verify.mjs <archivo_original> <archivo_firma> <llave_publica>");
    process.exit(1);
  }

  const [filePath, sigPath, pubKeyPath] = args;

  try {
    const originalData = fs.readFileSync(filePath);
    const signature = fs.readFileSync(sigPath);
    const publicKey = fs.readFileSync(pubKeyPath);

    // Hash del archivo original (SHA-256)
    const hashBuffer = await crypto.subtle.digest('SHA-256', originalData);
    const hashUint8 = new Uint8Array(hashBuffer);

    // Verificación ML-DSA-87
    const isValid = ml_dsa87.verify(signature, hashUint8, publicKey);

    if (isValid) {
      console.log("✅ FIRMA VÁLIDA: El archivo es auténtico y no ha sido alterado.");
      console.log(`📄 Archivo: ${filePath}`);
      console.log(`🔐 Algoritmo: ML-DSA-87 (Dilithium5)`);
    } else {
      console.error("❌ FIRMA INVÁLIDA: El archivo ha sido modificado o la llave es incorrecta.");
      process.exit(1);
    }
  } catch (error) {
    console.error("🚨 Error en la verificación:", error.message);
    process.exit(1);
  }
}

verifySignature();
