'use client';

import { Shield } from 'lucide-react';

export function RiskPanel({
  concentration = '100% SOL (Activo Único)',
  volatility = '54.2% Anual (Media)',
  liquidity = 'Alta (Solana L1)',
}: {
  concentration?: string;
  volatility?: string;
  liquidity?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-4 h-4 text-sky-400" />
        <h3 className="font-semibold text-sm">Motor de Riesgo</h3>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Concentración</span>
          <span className="text-slate-200 font-medium">{concentration}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Volatilidad</span>
          <span className="text-slate-200 font-medium">{volatility}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Liquidez</span>
          <span className="text-slate-200 font-medium">{liquidity}</span>
        </div>
        <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 flex items-center justify-between">
          <span>✓ Motor de Riesgo Activo</span>
          <span className="text-slate-500 font-mono">VaR 95%</span>
        </div>
      </div>
    </div>
  );
}
