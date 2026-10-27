import { formatEther, formatUnits, JsonRpcProvider } from 'ethers';

export const CHAINS = {
  polygon:  { host: 'polygon-mainnet', symbol: 'POL', chainId: 137   },
  ethereum: { host: 'eth-mainnet',     symbol: 'ETH', chainId: 1     },
  arbitrum: { host: 'arb-mainnet',     symbol: 'ETH', chainId: 42161 },
  base:     { host: 'base-mainnet',    symbol: 'ETH', chainId: 8453  },
  optimism: { host: 'opt-mainnet',     symbol: 'ETH', chainId: 10    },
};

const SPAM_WORDS = ['claim','reward','visit','www.','http','airdrop','redeem','.app','.lol','.eu','.com'];

function hasNonAscii(s) {
  for (const c of s) if (c.charCodeAt(0) > 127) return true;
  return false;
}

function isSpamToken(meta) {
  const name = meta.name || '';
  const symbol = meta.symbol || '';
  if (!name || !symbol) return true;
  if (!meta.logo) return true;
  if (hasNonAscii(name) || hasNonAscii(symbol)) return true;
  const digits = (symbol.match(/[0-9]/g) || []).length;
  if (digits > 2) return true;
  const combo = (name + ' ' + symbol).toLowerCase();
  for (const w of SPAM_WORDS) if (combo.includes(w)) return true;
  if ((name + symbol).length > 30) return true;
  return false;
}

async function rpc(host, method, params, key) {
  const url = `https://${host}.g.alchemy.com/v2/${key}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
  });
  const data = await res.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  return data.result;
}

export async function resolveAddress(input, key) {
  if (!input.endsWith('.eth')) return input;
  const provider = new JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${key}`);
  const resolved = await provider.resolveName(input);
  if (!resolved) throw new Error(`No se pudo resolver ${input}`);
  return resolved;
}

async function getChainData(address, key, name, cfg) {
  try {
    const balWei = await rpc(cfg.host, 'eth_getBalance', [address, 'latest'], key);
    const tk = await rpc(cfg.host, 'alchemy_getTokenBalances', [address, 'erc20'], key);
    const nonZero = tk.tokenBalances.filter(t => t.tokenBalance !== '0x' + '0'.repeat(64));

    const tokens = [];
    let spam = 0;
    for (const t of nonZero) {
      const meta = await rpc(cfg.host, 'alchemy_getTokenMetadata', [t.contractAddress], key);
      if (isSpamToken(meta)) { spam++; continue; }
      tokens.push({
        symbol: meta.symbol,
        name: meta.name,
        balance: formatUnits(BigInt(t.tokenBalance), meta.decimals || 18),
        addr: t.contractAddress,
      });
    }

    const txRes = await rpc(cfg.host, 'alchemy_getAssetTransfers', [{
      fromBlock: '0x0', toBlock: 'latest', fromAddress: address,
      category: ['external', 'erc20'], maxCount: '0x5', order: 'desc',
    }], key);

    const txs = (txRes.transfers || [])
      .filter(tx => !hasNonAscii(tx.asset || ''))
      .map(tx => ({
        date: new Date(tx.metadata.blockTimestamp).toISOString().slice(0, 10),
        amount: tx.value !== null ? tx.value.toFixed(4) : '0',
        asset: tx.asset || cfg.symbol,
        to: tx.to,
      }));

    return {
      chain: name,
      chainId: cfg.chainId,
      symbol: cfg.symbol,
      balance: formatEther(BigInt(balWei)),
      tokens,
      spamFiltered: spam,
      transactions: txs,
    };
  } catch (e) {
    return { chain: name, chainId: cfg.chainId, error: e.message };
  }
}

export async function getWalletData(input, key) {
  const address = await resolveAddress(input, key);
  const results = await Promise.all(
    Object.entries(CHAINS).map(([name, cfg]) => getChainData(address, key, name, cfg))
  );
  return {
    address,
    resolvedFrom: input !== address ? input : null,
    chains: results,
  };
}
