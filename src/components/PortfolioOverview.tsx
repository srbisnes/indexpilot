'use client';

import { useEffect, useState } from 'react';
interface Props { address: string; }
interface Portfolio { network: string; wallet: string; sol: { lamports: number; amount: number }; tokens: Array<{ account: string; mint: string; amount: string; decimals: number; uiAmount: number | null }>; tokenCount: number; fetchedAt: string; }

export function PortfolioOverview({ address }: Props) {
  const [data, setData] = useState<Portfolio | null>(null); const [error, setError] = useState(''); const [loading, setLoading] = useState(true);
  useEffect(() => { let active = true; setLoading(true); fetch(`/api/portfolio?address=${encodeURIComponent(address)}`).then(async r => { const body = await r.json(); if (!r.ok) throw new Error(body.error || 'Portfolio request failed.'); return body as Portfolio; }).then(body => { if (active) { setData(body); setError(''); } }).catch((e: Error) => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [address]);
  if (loading) return <Panel title="Wallet Overview"><p className="text-sm text-slate-400">Reading Solana RPC…</p></Panel>;
  if (error) return <Panel title="Wallet Overview"><p className="text-sm text-rose-400">{error}</p><p className="mt-2 text-xs text-slate-500">Check the selected network and RPC endpoint.</p></Panel>;
  if (!data) return null;
  return <Panel title="Wallet Overview"><div className="grid grid-cols-2 md:grid-cols-4 gap-4"><Metric label="SOL" value={data.sol.amount.toFixed(4)} /><Metric label="SPL accounts" value={String(data.tokenCount)} /><Metric label="Network" value={data.network} /><Metric label="Updated" value={new Date(data.fetchedAt).toLocaleTimeString()} /></div>{data.tokens.length > 0 && <div className="mt-6 overflow-x-auto"><table className="w-full text-sm"><thead className="text-left text-slate-500"><tr><th className="pb-2">Mint</th><th className="pb-2">Amount</th></tr></thead><tbody>{data.tokens.slice(0, 10).map(token => <tr key={token.account} className="border-t border-slate-800"><td className="py-2 font-mono text-xs text-slate-400">{token.mint}</td><td className="py-2 text-slate-200">{token.uiAmount ?? token.amount}</td></tr>)}</tbody></table></div>}</Panel>;
}
function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6"><div className="flex items-center justify-between mb-4"><h3 className="font-semibold">{title}</h3></div>{children}</div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold text-slate-200 break-all">{value}</p></div>; }
