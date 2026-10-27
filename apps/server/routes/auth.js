import { Router } from 'express';
const router = Router();

router.post('/login', (req, res) => {
    const { did, signature } = req.body;
    
    if (!did || !signature) {
        return res.status(400).json({ error: 'Faltan credenciales' });
    }
    
    // Simulación de validación PQC
    console.log(`[AUTH] Validando firma para ${did}`);
    res.json({ authenticated: true, token: 'jwt-simulado-12345' });
});

export default router;
