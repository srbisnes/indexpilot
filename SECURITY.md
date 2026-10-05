# Security Policy

## Scope

IndexPilot is a Web3 intelligence application. Security-sensitive areas include wallet connectivity, RPC access, API routes, authentication, portfolio data, and future on-chain transaction execution.

## Reporting a vulnerability

Please do not disclose exploitable vulnerabilities in a public issue.

For a private report, contact the project maintainer through the contact method published in the repository owner profile. Include the affected component, version or commit, reproduction steps, impact assessment, and relevant logs or proof of concept with secrets removed.

## Security principles

- Never commit private keys, seed phrases, OAuth secrets, RPC credentials, or production tokens.
- Client-exposed environment variables must use NEXT_PUBLIC_ only when the value is safe to expose.
- Wallet signing must remain user-controlled.
- Production transactions must never be enabled accidentally by a demo configuration.
- Server-side API routes must validate input and apply appropriate rate limits.
- Testnet/devnet and mainnet configurations must remain explicitly separated.

## Supported versions

Security fixes are prioritized for the latest main branch and the latest production deployment.

## Disclosure

We will acknowledge valid reports, investigate the issue, and coordinate remediation before public disclosure when practical.
