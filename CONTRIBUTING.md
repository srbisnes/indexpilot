# Contributing to IndexPilot

## Development requirements

- Node.js 22.12+
- npm 10+
- Git
- A Solana wallet such as Phantom for wallet-flow testing

Use the repository-pinned Node version.

~~~bash
nvm use
npm install
~~~

## Local workflow

~~~bash
cp .env.example .env.local
npm run typecheck
npm run test
npm run lint
npm run build
npm run dev
~~~

## Pull requests

Every change should:

1. Explain the problem and proposed solution.
2. Include tests for new application behavior.
3. Avoid committing secrets or generated credentials.
4. Keep production and test-network configuration explicit.
5. Update documentation when architecture, environment variables, or public behavior changes.

## Commit conventions

Prefer conventional commit prefixes: feat, fix, docs, chore, test, refactor, security.

## Review standard

A change is ready when typecheck, tests, lint, and production build pass, and the relevant user flow has been verified in a browser for UI changes.
