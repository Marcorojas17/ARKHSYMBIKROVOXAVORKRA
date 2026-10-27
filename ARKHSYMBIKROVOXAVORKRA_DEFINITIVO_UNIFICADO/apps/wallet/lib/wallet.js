import { formatEther, JsonRpcProvider } from 'ethers';

export const CHAINS = {
  polygon:  { rpc: 'https://polygon-bor-rpc.publicnode.com',  symbol: 'POL', chainId: 137,   explorer: 'https://polygonscan.com' },
  ethereum: { rpc: 'https://ethereum-rpc.publicnode.com',     symbol: 'ETH', chainId: 1,     explorer: 'https://etherscan.io' },
  arbitrum: { rpc: 'https://arbitrum-one-rpc.publicnode.com', symbol: 'ETH', chainId: 42161, explorer: 'https://arbiscan.io' },
  base:     { rpc: 'https://base-rpc.publicnode.com',         symbol: 'ETH', chainId: 8453,  explorer: 'https://basescan.org' },
  optimism: { rpc: 'https://optimism-rpc.publicnode.com',     symbol: 'ETH', chainId: 10,    explorer: 'https://optimistic.etherscan.io' },
};

const providers = {};
function getProvider(rpc) {
  if (!providers[rpc]) providers[rpc] = new JsonRpcProvider(rpc, undefined, { staticNetwork: true });
  return providers[rpc];
}

async function getChain(name, cfg, address) {
  try {
    const provider = getProvider(cfg.rpc);
    const wei = await provider.getBalance(address);
    return {
      chain: name,
      chainId: cfg.chainId,
      symbol: cfg.symbol,
      balance: formatEther(wei),
      tokens: [],
      spamFiltered: 0,
      transactions: [],
      explorer: cfg.explorer + '/address/' + address,
    };
  } catch (e) {
    return { chain: name, chainId: cfg.chainId, error: e.message.slice(0, 120) };
  }
}

export async function resolveAddress(input) {
  if (!input.endsWith('.eth')) return input;
  const provider = new JsonRpcProvider('https://ethereum-rpc.publicnode.com', undefined, { staticNetwork: true });
  const resolved = await provider.resolveName(input);
  if (!resolved) throw new Error('No se pudo resolver ' + input);
  return resolved;
}

export async function getWalletData(input) {
  let address = input;
  if (input.endsWith('.eth')) address = await resolveAddress(input);
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) throw new Error('Direccion invalida');

  const chains = await Promise.all(
    Object.entries(CHAINS).map(([name, cfg]) => getChain(name, cfg, address))
  );

  return { address, resolvedFrom: input !== address ? input : null, chains };
}
