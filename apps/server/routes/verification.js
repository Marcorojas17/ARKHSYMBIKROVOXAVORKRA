import { Router } from 'express';
const router = Router();

router.post('/verify', (req, res) => {
    const { hash } = req.body;
    
    // Simulación de búsqueda en blockchain
    const isValid = hash && hash.startsWith('41a3683'); // Tu hash de Safe Creative
    
    if (isValid) {
        res.json({ verified: true, message: 'Documento auténtico' });
    } else {
        res.status(404).json({ verified: false, message: 'Firma inválida' });
    }
});

export default router;
