# IndexPilot

**Web3 Intelligence Platform for Solana portfolio intelligence, risk analytics and agent-assisted monitoring.**

[![CI](https://github.com/srbisnes/indexpilot/actions/workflows/ci.yml/badge.svg)](https://github.com/srbisnes/indexpilot/actions/workflows/ci.yml)
[![Production](https://img.shields.io/badge/production-Vercel-black)](https://indexpilot-chi.vercel.app)

## Product

IndexPilot is being built as a professional intelligence layer for Web3 users and teams:

- Portfolio intelligence
- Risk scoring
- Solana wallet connectivity
- Market and liquidity intelligence
- Agent-assisted monitoring
- Jupiter integration boundary
- Future enterprise monitoring and intelligence APIs

The product is intentionally designed around **read-only intelligence first, simulation second, and user-approved transactions last**.

## Current release

**v0.1 — Production foundation**

Implemented:

- Next.js 14 + TypeScript + App Router
- Responsive portfolio dashboard
- Phantom wallet adapter
- Configurable Solana RPC
- Jupiter API route scaffold
- Risk Engine with unit tests
- Explicit LIVE / DEMO modes
- GitHub Actions: typecheck, tests and production build
- Vercel production deployment
- Security, contribution and architecture documentation

### Authentication status

The repository currently contains Google OAuth environment placeholders, but the audited main branch does **not** contain the Google OAuth provider/session implementation. See Google Authentication Status in docs/GOOGLE-AUTH.md.

This distinction is intentional: the repository should never claim functionality that cannot be reproduced from source.

## Architecture

~~~text
                         INDEXPILOT
                              |
          +-------------------+-------------------+
          |                   |                   |
       Identity            Wallet           Intelligence
          |                   |                   |
     Google OAuth          Phantom          Risk Engine
          |                   |                   |
          +-------------------+-------------------+
                              |
                       Solana Data Layer
                              |
                    RPC / Jupiter / Tokens
                              |
                       Agent Intelligence
~~~

See docs/ARCHITECTURE.md.

## Solana network strategy

Production is kept separate from the next blockchain testing stage.

| Environment | Network | Purpose |
|---|---|---|
| Local | Local validator | deterministic development |
| Development | Devnet | application and wallet testing |
| Release candidate | Testnet | network/stress validation |
| Production | Mainnet | real user activity |

Solana's official documentation recommends Devnet for application development and describes Testnet primarily as a validator/network stress-testing environment. The project will therefore use Devnet before Testnet release validation. Official cluster documentation: https://solana.com/docs/references/clusters

The detailed rollout is documented in docs/SOLANA-TESTNET.md.

## Repository structure

~~~text
.
├── .github/workflows/ci.yml
├── docs/
│   ├── ARCHITECTURE.md
│   ├── GOOGLE-AUTH.md
│   ├── ROADMAP.md
│   └── SOLANA-TESTNET.md
├── src/
│   ├── app/
│   │   └── api/jupiter/
│   ├── components/
│   └── lib/
│       ├── risk-engine.ts
│       └── risk-engine.test.ts
├── .env.example
├── .nvmrc
├── CONTRIBUTING.md
├── LICENSE
├── SECURITY.md
└── README.md
~~~

## Local development

Requirements:

- Node.js 22.12+
- npm 10+
- Phantom or another compatible Solana wallet for wallet-flow testing

~~~bash
git clone https://github.com/srbisnes/indexpilot.git
cd indexpilot
nvm use
npm install
cp .env.example .env.local
npm run typecheck
npm run test
npm run lint
npm run build
npm run dev
~~~

Open http://localhost:3000.

## Environment

Copy .env.example to .env.local.

Important variables:

| Variable | Purpose |
|---|---|
| NEXT_PUBLIC_APP_URL | Application URL |
| NEXT_PUBLIC_APP_MODE | DEMO or LIVE |
| NEXT_PUBLIC_SOLANA_NETWORK | Solana cluster label |
| NEXT_PUBLIC_SOLANA_RPC_URL | Solana RPC endpoint |
| JUPITER_API_URL | Jupiter API boundary |
| GOOGLE_CLIENT_ID | Future Google OAuth client ID |
| GOOGLE_CLIENT_SECRET | Future server-side OAuth secret |
| NEXTAUTH_SECRET | Future session secret |
| NEXTAUTH_URL | Future auth callback base URL |

Never commit real credentials.

## Quality gates

~~~bash
npm run typecheck
npm run test
npm run lint
npm run build
~~~

GitHub Actions runs the same core quality gates on pushes and pull requests to main.

## Security model

- Private keys and seed phrases never belong on the server.
- Wallet signing remains user-controlled.
- Production and test networks are explicitly separated.
- Demo mode prevents accidental transaction behavior.
- Server-side API routes must validate external input.
- OAuth secrets must remain server-side.
- Transaction execution will not be enabled before simulation, testing and security review.

Read SECURITY.md.

## Roadmap

### Phase 1 — Foundation
**Complete**

Production dashboard, wallet integration, risk engine, CI/CD and Vercel deployment.

### Phase 2 — Identity + real Solana data
**Next**

Google OAuth/session implementation, user profiles, wallet association, Devnet portfolio ingestion and real SOL/SPL metrics.

### Phase 3 — Solana Testnet release candidate

Testnet adapter, RPC resilience, network mismatch protection, transaction simulation, user confirmation UX, integration tests and security review.

### Phase 4 — Intelligence platform

Evidence-backed agents, measured volatility/liquidity, alerts, intelligence API and enterprise workspaces.

### Phase 5 — Enterprise

RBAC, organizations, audit logs, API keys, billing, dedicated RPC infrastructure, observability and external security audit.

Full roadmap: docs/ROADMAP.md.

## Deployment

The production application is deployed on Vercel and connected to the GitHub repository.

Production:
https://indexpilot-chi.vercel.app

Repository:
https://github.com/srbisnes/indexpilot

## License

Proprietary. See LICENSE.
