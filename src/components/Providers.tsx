'use client';

import { ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';

const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta';
const RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL;

export function Providers({ children }: { children: ReactNode }) {
  const endpoint = useMemo(() => RPC_URL || (NETWORK === 'devnet' || NETWORK === 'testnet' || NETWORK === 'mainnet-beta' ? clusterApiUrl(NETWORK) : clusterApiUrl('mainnet-beta')), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);
  return <ConnectionProvider endpoint={endpoint} config={{ commitment: 'confirmed' }}><WalletProvider wallets={wallets} autoConnect><WalletModalProvider>{children}</WalletModalProvider></WalletProvider>;
}
