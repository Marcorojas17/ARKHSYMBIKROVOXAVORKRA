// ARKH Defense Server
import express from 'express';
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
    console.log(`[DEFENSA] Petición detectada: ${req.path}`);
    next();
});

app.get('/', (req, res) => res.send('ARKH Defense Active'));

app.listen(PORT, () => console.log(`🛡️ Defense Server en puerto ${PORT}`));
