# IndexPilot Architecture

## Product layers

~~~text
                    INDEXPILOT
                        |
        +---------------+---------------+
        |               |               |
     Identity        Wallet         Intelligence
        |               |               |
   Google OAuth     Phantom        Risk Engine
        |               |               |
        +---------------+---------------+
                        |
                  Solana Data Layer
                        |
              RPC / Jupiter / Tokens
                        |
                 Agent Intelligence
~~~

## Current implementation

- Next.js App Router + TypeScript.
- Solana wallet adapter with Phantom.
- Solana RPC configuration through environment variables.
- Jupiter API route scaffold.
- Portfolio UI components.
- Risk Engine with unit tests.
- Agent status UI.
- GitHub Actions typecheck/test/build pipeline.
- Vercel production deployment.

## Next architecture increment

The next engineering increment should introduce:

- explicit environment/cluster configuration;
- Google authentication session layer;
- persistent user profile;
- wallet-to-user association;
- normalized portfolio data model;
- measured market/risk data;
- agent execution boundaries;
- observability and audit events;
- Testnet/Devnet integration tests.

## Security boundaries

~~~text
Browser
  |
  +-- Wallet adapter ----> User-approved wallet signatures
  |
  +-- Auth session ------> Server authorization
  |
  +-- API routes --------> Validation / rate limits
                              |
                              +--> Solana RPC
                              +--> Jupiter
~~~

Private keys and seed phrases must never be sent to IndexPilot servers.
