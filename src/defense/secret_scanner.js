export function scanSecrets(text) {
    // Busca patrones de API keys y tokens
    const patterns = [
        /alch_[a-zA-Z0-9]{20,}/g,
        /ghp_[a-zA-Z0-9]{20,}/g,
        /AIza[0-9A-Za-z_-]{35}/g
    ];
    
    let found = [];
    patterns.forEach(p => {
        const matches = text.match(p);
        if (matches) found.push(...matches);
    });
    
    return found.length > 0 ? found : null;
}
