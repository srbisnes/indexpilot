'use client';

import { Bot, Circle } from 'lucide-react';

const agents = [
  { name: 'Portfolio Agent', status: 'ready' },
  { name: 'Risk Agent', status: 'ready' },
  { name: 'Market Agent', status: 'idle' },
  { name: 'Alert Agent', status: 'idle' },
];

export function AgentStatus() {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Bot className="w-4 h-4 text-indigo-400" />
        <h3 className="font-semibold text-sm">Agent Layer</h3>
      </div>
      <ul className="space-y-2.5">
        {agents.map((agent) => (
          <li key={agent.name} className="flex items-center justify-between text-sm">
            <span className="text-slate-300">{agent.name}</span>
            <span className="flex items-center gap-1.5 text-xs">
              <Circle
                className={`w-2 h-2 fill-current ${
                  agent.status === 'ready' ? 'text-emerald-400' : 'text-slate-500'
                }`}
              />
              <span className={agent.status === 'ready' ? 'text-emerald-400' : 'text-slate-500'}>
                {agent.status}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}