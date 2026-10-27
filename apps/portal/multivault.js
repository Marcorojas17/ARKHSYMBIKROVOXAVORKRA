export function createMultiVault(voices) {
    console.log(`[MULTIVAULT] Creando bóveda con ${voices.length} voces...`);
    return {
        magic: 'ARKHMULT1',
        voices: voices,
        createdAt: new Date().toISOString()
    };
}
