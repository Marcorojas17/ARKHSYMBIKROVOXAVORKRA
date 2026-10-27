import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promptInjectionShield } from '../../src/defense/prompt_injection_shield.js';
import { getWalletData } from './lib/wallet.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, 'public');
const app = express();
const PORT = 3000;

const cache = new Map();
const TTL = 30000;

app.use((req, res, next) => {
app.use(promptInjectionShield);
  console.log(`[${new Date().toISOString().slice(11,19)}] ${req.method} ${req.path}`);
  next();
});

app.get('/api/wallet/:address', async (req, res) => {
  const { address } = req.params;
  console.log('  -> consultando:', address);
  const c = cache.get(address);
  if (c && Date.now() - c.ts < TTL) return res.json(c.data);
  try {
    const data = await getWalletData(address);
    cache.set(address, { ts: Date.now(), data });
    const ok = data.chains.filter(c => !c.error).length;
    console.log(`  -> respondido (${ok}/5 chains OK)`);
    res.json(data);
  } catch (e) {
    console.error('  -> error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.use(express.static(PUBLIC_DIR));
app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' });
  res.sendFile(join(PUBLIC_DIR, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('◯_● WALLET · http://localhost:' + PORT);
  console.log('◯_● WALLET · http://127.0.0.1:' + PORT);
  console.log('');
});
