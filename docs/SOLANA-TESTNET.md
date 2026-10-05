# Solana Testnet — Next Engineering Stage

## Objective

Move IndexPilot's Solana integration into an isolated test environment before any production transaction capability is introduced.

The current production deployment remains on the existing configuration. This document defines the next stage; it does not switch production to Testnet.

## Network strategy

| Environment | Cluster | Purpose |
|---|---|---|
| Local | Local validator | deterministic development and integration tests |
| Development | Devnet | application development and wallet-flow testing |
| Test | Testnet | network-level validation and release candidate testing |
| Production | Mainnet | real user activity and real assets |

Solana's documentation recommends Devnet for application development; Testnet is primarily used for validator/network stress testing. Therefore the project should use Devnet first, then Testnet as a release-validation environment. This is aligned with Solana's official cluster guidance.

## Planned Testnet configuration

~~~env
NEXT_PUBLIC_SOLANA_NETWORK=testnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.testnet.solana.com
NEXT_PUBLIC_APP_MODE=DEMO
~~~

The official Testnet RPC is https://api.testnet.solana.com. Public RPC endpoints are rate-limited and are not appropriate as final production infrastructure.

## Implementation stages

### Stage 1 — Network abstraction
- Centralize cluster selection.
- Validate network/RPC configuration at startup.
- Prevent invalid combinations such as a Testnet label pointing to Mainnet RPC.
- Display the active cluster in the UI.

### Stage 2 — Wallet validation
- Connect Phantom.
- Display wallet public key.
- Detect the selected cluster.
- Reject or warn on wallet/network mismatch.
- Test connect/disconnect/reconnect flows.

### Stage 3 — Read-only portfolio data
- Query SOL balance.
- Query SPL token accounts.
- Normalize balances into a common portfolio model.
- Add loading, empty, timeout and RPC-error states.

### Stage 4 — Intelligence layer
- Feed normalized positions into the Risk Engine.
- Replace placeholder volatility/liquidity assumptions with measured data.
- Add provenance for every market/risk metric.
- Keep agent recommendations informational until transaction execution is audited.

### Stage 5 — Transaction simulation
- Add transaction builders without automatic signing.
- Simulate before wallet approval.
- Show fees, accounts and instructions before signing.
- Record transaction signatures after successful submission.

### Stage 6 — Testnet release gate

Required before enabling testnet transactions:

- Typecheck passes.
- Unit tests pass.
- Integration tests pass.
- Browser wallet flow passes.
- RPC failure/retry tests pass.
- Network mismatch tests pass.
- Transaction simulation passes.
- No secrets in repository.
- Security review completed.

## Mainnet gate

Testnet success is not a mainnet authorization. Mainnet requires a separate security review, production RPC provider, monitoring, transaction limits, incident response and explicit user-consent UX.

## Official references

- Solana clusters and RPC endpoints: https://solana.com/docs/references/clusters
- Solana RPC overview: https://solana.com/docs/rpc
