# Audit Report — ARKHSYMBIKROVOXAVORKRA

## Estado: PENDIENTE

## Qué hay hoy
- `scripts/check.js` valida existencia de archivos (101/101)
- `scripts/seal.js` genera hash SHA-256 de archivos críticos
- No hay auditoría externa

## Qué falta
- [ ] Auditoría de código por tercero (EtherAuthority, Trail of Bits, etc.)
- [ ] Prueba de penetración del portal web
- [ ] Revisión del contrato Solidity
- [ ] Verificación de implementación PQC (cuando no sea stub)
- [ ] Análisis de dependencias (npm audit, snyk)

## Costo estimado de auditoría real
- Auditoría smart contract: $5,000 - $15,000 USD
- Auditoría web app: $3,000 - $10,000 USD
- Auditoría PQC: $10,000+ USD (pocas firmas lo hacen)

## Recomendación
No vendas "auditado" hasta que exista el reporte de un tercero.
