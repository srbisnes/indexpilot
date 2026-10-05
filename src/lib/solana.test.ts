import { describe, expect, it } from 'vitest';
import { getSolanaNetwork, getSolanaRpcUrl } from './solana';

describe('Solana configuration', () => {
  it('accepts supported networks', () => {
    expect(getSolanaNetwork('testnet')).toBe('testnet');
    expect(getSolanaNetwork('devnet')).toBe('devnet');
    expect(getSolanaNetwork('mainnet-beta')).toBe('mainnet-beta');
  });

  it('falls back safely for an invalid network', () => {
    expect(getSolanaNetwork('invalid')).toBe('mainnet-beta');
  });

  it('rejects an RPC host that does not match the selected cluster', () => {
    expect(() => getSolanaRpcUrl('testnet', 'https://api.mainnet.solana.com')).toThrow(
      /does not match selected Solana network/,
    );
  });

  it('accepts the official Testnet endpoint', () => {
    expect(getSolanaRpcUrl('testnet', 'https://api.testnet.solana.com')).toBe(
      'https://api.testnet.solana.com',
    );
  });
});
