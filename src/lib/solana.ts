import { clusterApiUrl } from '@solana/web3.js';

export type SolanaNetwork = 'mainnet-beta' | 'devnet' | 'testnet';

const NETWORKS: Record<SolanaNetwork, string> = {
  'mainnet-beta': clusterApiUrl('mainnet-beta'),
  devnet: clusterApiUrl('devnet'),
  testnet: clusterApiUrl('testnet'),
};

export function getSolanaNetwork(value = process.env.NEXT_PUBLIC_SOLANA_NETWORK): SolanaNetwork {
  if (value === 'devnet' || value === 'testnet' || value === 'mainnet-beta') return value;
  return 'mainnet-beta';
}

export function getSolanaRpcUrl(
  network = getSolanaNetwork(),
  configuredUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL,
): string {
  const expected = NETWORKS[network];
  if (!configuredUrl) return expected;

  const url = new URL(configuredUrl);
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Solana RPC URL must use HTTP or HTTPS.');
  }

  const host = url.hostname.toLowerCase();
  const clusterHosts: Record<SolanaNetwork, string[]> = {
    'mainnet-beta': ['api.mainnet-beta.solana.com', 'api.mainnet.solana.com'],
    devnet: ['api.devnet.solana.com'],
    testnet: ['api.testnet.solana.com'],
  };

  const isOfficialClusterHost = clusterHosts[network]?.includes(host);
  const isLocal = host === 'localhost' || host === '127.0.0.1';

  if (!isOfficialClusterHost && !isLocal) {
    throw new Error(`RPC host does not match selected Solana network: ${network}`);
  }

  return configuredUrl;
}

export function getSolanaConfig() {
  const network = getSolanaNetwork();
  return {
    network,
    rpcUrl: getSolanaRpcUrl(network),
    isTestnet: network === 'testnet',
    isDevnet: network === 'devnet',
    isMainnet: network === 'mainnet-beta',
  };
}
