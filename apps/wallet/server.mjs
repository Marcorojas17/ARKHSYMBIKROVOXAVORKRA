import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { getWalletData } from './lib/wallet.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, 'public');

const app = express();
const PORT = 3000;
const KEY = process.env.ALCHEMY_API_KEY;

if (!KEY || !KEY.startsWith('alch_')) {
  console.error('❌ ALCHEMY_API_KEY invalida en .env (debe empezar con alch_)');
  process.exit(1);
}

console.log('Public dir:', PUBLIC_DIR);

const cache = new Map();
const TTL = 30000;

app.get('/api/wallet/:address', async (req, res) => {
  const { address } = req.params;
  if (!address.endsWith('.eth') && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Direccion invalida' });
  }
  const c = cache.get(address);
  if (c && Date.now() - c.ts < TTL) return res.json(c.data);
  try {
    const data = await getWalletData(address, KEY);
    cache.set(address, { ts: Date.now(), data });
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Servir archivos estaticos (incluye index.html en /)
app.use(express.static(PUBLIC_DIR));

// Fallback para SPA: cualquier ruta que no sea /api sirve index.html
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('◯_● WALLET · http://localhost:' + PORT);
  console.log('');
});
