'use client';

interface Props {
  address: string;
}

export function PortfolioOverview({ address }: Props) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Wallet Overview</h3>
        <span className="text-xs font-mono text-slate-500 truncate max-w-[180px]">
          {address.slice(0, 4)}…{address.slice(-4)}
        </span>
      </div>
      <div className="text-sm text-slate-400">
        <p>Positions and token balances will appear here once the data layer is connected.</p>
        <p className="mt-2 text-xs text-slate-500">
          Jupiter quote endpoint and on-chain readers are scaffolded under <code className="text-sky-400">/api</code>.
        </p>
      </div>
    </div>
  );
}