// Componente de auditoría en tiempo real
export class AuditView {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'audit-card';
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <h3>📊 Auditoría</h3>
            <ul id="audit-log">
                <li>[SISTEMA] Iniciando protocolo...</li>
                <li>[OK] Firmas PQC válidas</li>
            </ul>
        `;
    }

    addLog(message) {
        const log = this.element.querySelector('#audit-log');
        const li = document.createElement('li');
        li.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        log.appendChild(li);
    }

    mount(parent) {
        parent.appendChild(this.element);
    }
}
