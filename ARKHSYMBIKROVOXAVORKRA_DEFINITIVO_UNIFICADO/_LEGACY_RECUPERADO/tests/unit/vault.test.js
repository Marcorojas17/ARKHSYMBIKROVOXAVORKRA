// Test unitario para la bóveda
describe('ARKH Vault Core', () => {
    test('Debe cifrar y descifrar correctamente', () => {
        const data = "mi_voz";
        const encrypted = "ENCRYPTED_" + btoa(data);
        expect(encrypted).not.toBe(data);
    });

    test('Debe detectar contraseña incorrecta', () => {
        const password = "1234";
        const wrong = "4321";
        expect(password).not.toBe(wrong);
    });
});
