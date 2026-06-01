# vasmo Contracts

Hardhat workspace for the vasmo protocol contracts.

## Layout

- `src/` Solidity contracts
- `test/` Hardhat test suite
- `scripts/` Deployment scripts
- `hardhat.config.js` compiler and path configuration

## Commands

- `npm run build` compiles the contracts
- `npm test` runs the Hardhat test suite
- `npm run deploy:local` deploys the core contracts on the Hardhat network
- `npm run deploy:factory` deploys the protocol via the factory
- `npm run deploy:mock-aave` deploys a mock Aave pool for testnet use
- `npm run deploy:multichain` deploys with optional Pyth and Aave addresses

## Contracts

| Contract | Description |
|----------|-------------|
| `InvoiceNFT` | ERC-721 tokenized invoices with privacy commitments |
| `YieldVault` | Manages yield strategies (Hold/Conservative/Aggressive) |
| `AgentRouter` | Routes AI agent decisions to execute strategies |
| `PythOracle` | Real-time price feeds via Pyth Network |
| `LendleYieldSource` | Integration with Lendle lending protocol |
| `VasmoFactory` | Atomic deployment of entire protocol |

## Deployed (Mantle Sepolia)

```
InvoiceNFT:   0xf35be6ffebf91acc27a78696cf912595c6b08aaa
YieldVault:   0xd2cad31a080b0dae98d9d6427e500b50bcb92774
AgentRouter:  0xec5bfee9d17e25cc8d52b8cb7fb81d8cabb53c5f
```

## Quick Start

```bash
# Build
npm run build

# Test
npm test

# Deploy locally
npm run deploy:local

# Deploy with optional external integrations
npm run deploy:multichain

# Deploy a mock Aave pool you can point AAVE_POOL at
npm run deploy:mock-aave

# Deploy a wrapped MNT asset for testnet usage
$env:MOCK_AAVE_WRAP_NATIVE="true"
npm run deploy:mock-aave
```

## Architecture

```text
InvoiceNFT <-- YieldVault <-- AgentRouter
     v            v
  Oracle    LendleYieldSource
```

## Key Features

- **Privacy**: Invoice data stored as cryptographic commitments
- **Yield Strategies**: Simulated 0-7% APY based on strategy
- **AI Agent**: Authorized agents can execute strategy changes
- **Pagination**: Scalable queries with `getActiveInvoicesPaginated()`

## Security

- OpenZeppelin contracts for access control
- Pausable for emergency stops
- Rate limiting on agent decisions
- MAX_PRINCIPAL bounds on deposits
