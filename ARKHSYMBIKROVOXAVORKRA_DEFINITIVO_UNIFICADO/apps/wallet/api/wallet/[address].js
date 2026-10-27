import { getWalletData } from '../../../lib/wallet.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');
  const { address } = req.query;

  if (!address) return res.status(400).json({ error: 'Falta address' });
  if (!address.endsWith('.eth') && !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({ error: 'Direccion invalida' });
  }

  const KEY = process.env.ALCHEMY_API_KEY;
  if (!KEY) return res.status(500).json({ error: 'ALCHEMY_API_KEY no configurada' });

  try {
    const data = await getWalletData(address, KEY);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
