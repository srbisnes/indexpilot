import { Connection, PublicKey } from '@solana/web3.js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSolanaConfig } from '@/lib/solana';

const querySchema = z.object({
  address: z.string().min(32).max(44),
});

export async function GET(request: Request) {
  const parsed = querySchema.safeParse(
    Object.fromEntries(new URL(request.url).searchParams.entries()),
  );

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid wallet address.' }, { status: 400 });
  }

  let publicKey: PublicKey;
  try {
    publicKey = new PublicKey(parsed.data.address);
  } catch {
    return NextResponse.json({ error: 'Invalid Solana public key.' }, { status: 400 });
  }

  try {
    const config = getSolanaConfig();
    const connection = new Connection(config.rpcUrl, 'confirmed');

    const [balance, tokenAccounts] = await Promise.all([
      connection.getBalance(publicKey, 'confirmed'),
      connection.getParsedTokenAccountsByOwner(publicKey, { programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') }, 'confirmed'),
    ]);

    const tokens = tokenAccounts.value.map(({ pubkey, account }) => {
      const info = account.data.parsed.info;
      const tokenAmount = info.tokenAmount;
      return {
        account: pubkey.toBase58(),
        mint: info.mint as string,
        amount: tokenAmount.amount as string,
        decimals: tokenAmount.decimals as number,
        uiAmount: tokenAmount.uiAmount as number | null,
      };
    }).filter((token) => token.uiAmount !== 0);

    return NextResponse.json({
      network: config.network,
      wallet: publicKey.toBase58(),
      sol: {
        lamports: balance,
        amount: balance / 1_000_000_000,
      },
      tokens,
      tokenCount: tokens.length,
      fetchedAt: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'private, max-age=15, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('portfolio RPC error', error);
    return NextResponse.json(
      { error: 'Unable to read portfolio from the configured Solana RPC.' },
      { status: 502 },
    );
  }
}
