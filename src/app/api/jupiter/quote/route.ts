import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-side Jupiter quote proxy.
 * Keeps API keys / rate limits on the server and allows future caching / risk checks.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const inputMint = searchParams.get('inputMint');
  const outputMint = searchParams.get('outputMint');
  const amount = searchParams.get('amount');
  const slippageBps = searchParams.get('slippageBps') || '50';

  if (!inputMint || !outputMint || !amount) {
    return NextResponse.json(
      { error: 'Missing required params: inputMint, outputMint, amount' },
      { status: 400 }
    );
  }

  const baseUrl = process.env.JUPITER_API_URL || 'https://quote-api.jup.ag/v6';
  const url = `${baseUrl}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 10 }, // short cache
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: 'Jupiter upstream error', detail: text },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[jupiter/quote]', err);
    return NextResponse.json(
      { error: 'Failed to fetch quote' },
      { status: 502 }
    );
  }
}