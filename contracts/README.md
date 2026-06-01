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
- `npm run verify:mantle-sepolia` verifies the Mantle Sepolia deployment through the Mantle explorer API

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
InvoiceNFT:   0x018ee8F363421016177DbC8F9492fe2a1C720e29
YieldVault:   0x7f51D3B234E4c20959A1f6e91D3B852EE16c65A6
AgentRouter:  0x4430248F3b2304F946f08c43A06C3451657FD658
PrivacyRegistry: 0x2DA4B52913A928263a405dE3b42a5768a4dCa3b0
PythOracle:   0x7CfdF0580C87d0c379c4a5cDbC46A036E8AF71E3
AaveYieldSource: 0x5a179d261fD322ecaED06FA9Aa2973980D74322c
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

# On Mantle Sepolia both the Pyth contract address and the MNT/USD feed ID are built in.
# You only need these env vars if you want to override the defaults.
# $env:PYTH_NATIVE_USD_FEED="0x..."
# If the default RPC is slow or unavailable, point `MANTLE_SEPOLIA_RPC` at another public Mantle Sepolia endpoint.

# Deploy a mock Aave pool you can point AAVE_POOL at
npm run deploy:mock-aave

# Deploy a wrapped MNT asset for testnet usage
$env:MOCK_AAVE_WRAP_NATIVE="true"
npm run deploy:mock-aave

# Verify the live Mantle Sepolia contracts programmatically
# Requires ETHERSCAN_API_KEY (or MANTLESCAN_API_KEY) in contracts/.env
npm run verify:mantle-sepolia
```

## Programmatic Verification

The verification script submits each deployed contract to Mantle's Etherscan V2 API and waits for the result.

Required env var:

- `ETHERSCAN_API_KEY` or `MANTLESCAN_API_KEY`

It verifies these live Mantle Sepolia contracts:

- `InvoiceNFT`
- `YieldVault`
- `AgentRouter`
- `PrivacyRegistry`
- `PythOracle`
- `AaveV3YieldSource`

If a contract was already verified, the script skips it. If the live bytecode no longer matches the current source, the script will fail for that contract so you can redeploy and verify again.

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
