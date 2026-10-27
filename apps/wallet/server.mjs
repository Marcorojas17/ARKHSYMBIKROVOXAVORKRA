import 'dotenv/config';
import express from 'express';
import { getWalletData } from './lib/wallet.js';

const app = express();
const PORT = 3000;
const KEY = process.env.ALCHEMY_API_KEY;

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

app.use(express.static('public'));
app.listen(PORT, () => console.log(`\n◯_● WALLET · http://localhost:${PORT}\n`));
