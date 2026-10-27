// Componente de la vista de la Bóveda
export class VaultView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'vault-card';
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <h3>🔒 Mi Bóveda</h3>
            <p>Voces protegidas: <span id="voice-count">0</span></p>
            <button class="btn-primary">Grabar Nueva Voz</button>
        `;
    }

    mount(parent) {
        parent.appendChild(this.element);
    }
}
