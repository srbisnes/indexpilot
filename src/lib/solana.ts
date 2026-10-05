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
  // Se houver uma URL configurada na Vercel (com https://), usa ela diretamente
  if (configuredUrl && (configuredUrl.startsWith('http://') || configuredUrl.startsWith('https://'))) {
    return configuredUrl;
  }
  return NETWORKS[network] || clusterApiUrl('mainnet-beta');
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
