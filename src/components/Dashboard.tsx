'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { PortfolioOverview } from './PortfolioOverview';
import { RiskPanel } from './RiskPanel';
import { AgentStatus } from './AgentStatus';
import { Wallet, BarChart3, ShieldAlert } from 'lucide-react';

export function Dashboard() {
  const { publicKey, connected } = useWallet();
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="mb-8"><h2 className="text-2xl font-bold tracking-tight mb-1">Portfolio Intelligence</h2><p className="text-slate-400 text-sm">Read-only Solana portfolio intelligence. Transaction signing is not enabled.</p></div>{!connected ? <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-12 text-center"><div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4"><Wallet className="w-8 h-8 text-slate-400" /></div><h3 className="text-lg font-semibold mb-2">Connect your wallet</h3><p className="text-slate-400 text-sm max-w-md mx-auto">Connect Phantom to read your SOL and SPL token accounts on the active Solana cluster.</p></div> : <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="lg:col-span-2 space-y-6"><PortfolioOverview address={publicKey?.toBase58() || ''} /><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><StatCard icon={<BarChart3 className="w-5 h-5" />} label="Portfolio Value" value="Read-only" sub="USD pricing is the next data-layer milestone" /><StatCard icon={<ShieldAlert className="w-5 h-5" />} label="Risk Score" value="Ready" sub="Risk Engine awaits normalized market values" /></div></div><div className="space-y-6"><RiskPanel /><AgentStatus /></div></div>}</div>;
}
function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string; }) { return <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"><div className="flex items-center gap-2 text-slate-400 mb-3">{icon}<span className="text-sm font-medium">{label}</span></div><div className="text-2xl font-bold tracking-tight">{value}</div><p className="text-xs text-slate-500 mt-1">{sub}</p></div>; }
