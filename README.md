# IndexPilot

**Web3 Intelligence Platform**  
Portfolio Intelligence · Intelligence API · Enterprise Monitoring

[![CI](https://github.com/srbisnes/indexpilot/actions/workflows/ci.yml/badge.svg)](https://github.com/srbisnes/indexpilot/actions/workflows/ci.yml)

---

## Overview

IndexPilot is a multi-layer Web3 intelligence platform:

```
                    INDEXPILOT
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    CONSUMER            API              B2B
        │                │                │
        ▼                ▼                ▼
   Portfolio        Intelligence      Enterprise
   Intelligence        API             Monitoring
        │                │                │
        └────────────────┼────────────────┘
                         ▼
              WEB3 INTELLIGENCE LAYER
```

### Current status (v0.1 – Professional Starter)

- ✅ Next.js 14 + TypeScript + App Router
- ✅ Responsive dashboard skeleton
- ✅ Phantom wallet connection prepared
- ✅ Jupiter server-side endpoint scaffold
- ✅ Risk Engine structure + unit tests
- ✅ LIVE / DEMO explicit modes
- ✅ Basic security + environment variables
- ✅ GitHub Actions (typecheck + test + build)
- ✅ Enterprise-ready documentation structure

---

## Architecture

```
GitHub → Vercel Preview → QA → PR → Production
```

Vercel creates a unique Preview Deployment for every branch/PR.  
This enables safe iteration (including from Google AI Studio) without touching production.

---

## Quick Start

```bash
git clone https://github.com/srbisnes/indexpilot.git
cd indexpilot
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command            | Description                  |
|--------------------|------------------------------|
| `npm run dev`      | Development server           |
| `npm run build`    | Production build             |
| `npm run start`    | Start production server      |
| `npm run typecheck`| TypeScript check             |
| `npm run test`     | Run unit tests (Vitest)      |
| `npm run lint`     | ESLint                       |

---

## Environment

See `.env.example`. Never commit real secrets.

Key variables:
- `NEXT_PUBLIC_APP_MODE` → `LIVE` | `DEMO`
- `NEXT_PUBLIC_SOLANA_RPC_URL`
- `JUPITER_API_URL`
- Google OAuth credentials (server-side only)

---

## Security Model (high level)

- Wallet signatures verified server-side where required
- No private keys ever leave the client
- Server-side proxy for Jupiter (rate limiting + key protection ready)
- Explicit LIVE / DEMO modes to prevent accidental real transactions in demos
- Environment variables never exposed to the client unless prefixed with `NEXT_PUBLIC_`

---

## Roadmap (summary)

| Horizon     | Focus                                      |
|-------------|--------------------------------------------|
| 0–3 months  | Consumer portfolio intelligence MVP          |
| 4–6 months  | Intelligence API + multi-agent layer       |
| 7–12 months | B2B monitoring + enterprise features       |
| 13–18 months| Full Web3 Intelligence Layer infrastructure|
| 18+ months  | Ecosystem integrations & data products     |

---

## Deployment

Connected to **Vercel** via GitHub integration.  
Every push to `main` deploys to Production.  
Every PR gets an isolated Preview URL.

---

## License

Proprietary – All rights reserved.
