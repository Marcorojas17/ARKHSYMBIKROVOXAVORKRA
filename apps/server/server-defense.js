import express from 'express';
const app = express();
const PORT = 3001;

// Middleware de defensa y log
app.use((req, res, next) => {
    console.log(`[DEFENSA] ${new Date().toISOString()} - ${req.method} ${req.url} - IP: ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.json({ status: 'active', service: 'ARKH Defense Layer' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
    console.log(`🛡️  Servidor de Defensa activo en http://localhost:${PORT}`);
});
