'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Activity, Shield } from 'lucide-react';

const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE || 'DEMO';

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">IndexPilot</h1>
            <p className="text-xs text-slate-400 -mt-0.5">Web3 Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: APP_MODE === 'LIVE' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)',
              borderColor: APP_MODE === 'LIVE' ? 'rgba(34,197,94,0.3)' : 'rgba(234,179,8,0.3)',
              color: APP_MODE === 'LIVE' ? '#4ade80' : '#facc15',
            }}
          >
            <Shield className="w-3.5 h-3.5" />
            {APP_MODE}
          </div>
          <WalletMultiButton className="!bg-sky-600 hover:!bg-sky-500 !rounded-lg !h-10 !text-sm" />
        </div>
      </div>
    </header>
  );
}