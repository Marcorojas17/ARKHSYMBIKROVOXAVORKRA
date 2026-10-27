import { Router } from 'express';
const router = Router();

// Simulación de base de datos en memoria
let vaults = [];

router.post('/create', (req, res) => {
    const { name, hash } = req.body;
    const newVault = { id: Date.now(), name, hash, createdAt: new Date() };
    vaults.push(newVault);
    res.status(201).json({ message: "Bóveda creada", data: newVault });
});

router.get('/', (req, res) => {
    res.json({ total: vaults.length, data: vaults });
});

export default router;
