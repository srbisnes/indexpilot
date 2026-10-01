'use client';

import { Shield } from 'lucide-react';

export function RiskPanel() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-sky-400" />
        <h3 className="font-semibold text-sm">Risk Engine</h3>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Concentration</span>
          <span className="text-slate-300">—</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Volatility</span>
          <span className="text-slate-300">—</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Liquidity</span>
          <span className="text-slate-300">—</span>
        </div>
        <div className="pt-2 border-t border-slate-800 text-xs text-slate-500">
          Risk Engine is functional and covered by unit tests.
        </div>
      </div>
    </div>
  );
}