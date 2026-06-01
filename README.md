# vasmo

> Autonomous AI Treasury Agent for B2B Commerce on Mantle Sepolia

vasmo is an AI-native treasury management system that transforms how businesses handle invoices. When you create an invoice, our autonomous agent takes over: tokenizing it as a privacy-preserving NFT, deploying capital to yield strategies, and settling payments via x402 rails. It is deployed on Mantle Sepolia for the current testnet flow.

**[Live Demo](https://vasmo-app.vercel.app/)** · Built for Mantle Sepolia testnet

---

## x402: Agentic Finance in Action

vasmo showcases the x402 vision of autonomous financial agents:

- **AI Agent Monitors 24/7** — Continuously analyzes invoice health, risk scores, and yield opportunities
- **Autonomous Strategy Recommendations** — Agent evaluates Conservative vs Aggressive yield strategies based on invoice due dates and payment probability
- **Human-in-the-Loop** — Auto-executes only above 70% confidence; user approves lower-confidence decisions
- **x402 Payment Settlement** — Clients pay invoices directly via smart contract. Machines paying machines.

This is agentic finance infrastructure: machines handling real financial decisions autonomously.

---

## Mantle Sepolia Integration

Built natively for Mantle Sepolia:

- **x402 Payment Rails** — Full implementation of x402 on-chain invoice settlement
- **Mantle Sepolia** — Live deployment on Chain ID 5003
- **Crypto.com Ecosystem Ready** — Architecture supports [Crypto.com Market Data MCP](https://mcp.crypto.com/docs) integration
- **Pyth Network Oracles** — Price feed infrastructure for real-time risk assessment

---

## Who This Is For

Crypto-native freelancers, consultants, and small agencies who:
- Invoice other businesses on net-30/60/90 terms
- Have $20K+ in outstanding receivables regularly
- Already have a crypto wallet

**Not our user:**
- Businesses that need cash advances (we don't lend)
- Non-crypto users (wallet required, no fiat on-ramp)
- Consumer-facing businesses (B2B invoices only)

---

## What vasmo Does

```
Connect Wallet → Mint Invoice → Deposit to Vault → AI Manages Yield → Client Pays On-Chain → Withdraw
```

1. **Mint** — Create an NFT representing your invoice
2. **Deposit** — Put equivalent CRO into a yield vault
3. **AI Agent** — Monitors and optimizes your yield strategy
4. **Pay** — Client pays invoice directly on-chain via x402
5. **Withdraw** — Get principal + yield when payment settles

---

## What vasmo Does NOT Do

- **Advance cash** — We don't lend against invoices
- **Collect payments** — We don't chase your clients
- **Verify invoices** — We trust what you enter
- **Guarantee returns** — DeFi yields fluctuate
- **Support fiat** — Crypto only
- **Onboard non-crypto users** — Wallet required

---

## Success Criteria

This project succeeds if:
- User can mint an invoice in < 2 minutes
- User can deposit and see yield accruing
- AI agent analyzes and recommends strategies
- Client can pay invoice on-chain
- User can withdraw principal + yield without issues

---

## Scope

**In scope (what we built):**
- Wallet connection (Mantle Sepolia)
- Invoice minting (manual entry)
- On-chain payment (x402 pay invoice)
- Deposit to yield vault
- Dashboard (portfolio, yield tracking)
- Withdrawal flow
- AI agent monitoring

**Out of scope (not pursuing):**
- QuickBooks production integration
- Multi-chain support
- Team/org accounts
- Fiat on-ramp
- Mobile app

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Network | Mantle Sepolia (Chain ID 5003) |
| Contracts | Solidity (Foundry) |
| Frontend | Next.js + wagmi + Tailwind |
| Agent | TypeScript + WebSocket |
| Yield | Simulated (for demo) |
| Oracles | MockOracle (for demo) |

---

## Deployed Contracts (Mantle Sepolia)

**Chain ID:** 5003
**Deployment Date:** 2026-01-22

| Contract | Address |
|----------|---------|
| InvoiceNFT | [`0x018ee8F363421016177DbC8F9492fe2a1C720e29`](https://explorer.sepolia.mantle.xyz/address/0x018ee8F363421016177DbC8F9492fe2a1C720e29) |
| YieldVault | [`0x7f51D3B234E4c20959A1f6e91D3B852EE16c65A6`](https://explorer.sepolia.mantle.xyz/address/0x7f51D3B234E4c20959A1f6e91D3B852EE16c65A6) |
| AgentRouter | [`0x4430248F3b2304F946f08c43A06C3451657FD658`](https://explorer.sepolia.mantle.xyz/address/0x4430248F3b2304F946f08c43A06C3451657FD658) |
| PrivacyRegistry | [`0x2DA4B52913A928263a405dE3b42a5768a4dCa3b0`](https://explorer.sepolia.mantle.xyz/address/0x2DA4B52913A928263a405dE3b42a5768a4dCa3b0) |
| PythOracle | [`0x7CfdF0580C87d0c379c4a5cDbC46A036E8AF71E3`](https://explorer.sepolia.mantle.xyz/address/0x7CfdF0580C87d0c379c4a5cDbC46A036E8AF71E3) |
| AaveYieldSource | [`0x5a179d261fD322ecaED06FA9Aa2973980D74322c`](https://explorer.sepolia.mantle.xyz/address/0x5a179d261fD322ecaED06FA9Aa2973980D74322c) |

[View on Mantle Explorer](https://explorer.sepolia.mantle.xyz)

---

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm
- Foundry (for contracts)
- MetaMask with Mantle Sepolia configured

### Add Mantle Sepolia to MetaMask

| Setting | Value |
|---------|-------|
| Network Name | Mantle Sepolia |
| RPC URL | https://5003.rpc.thirdweb.com/ |
| Chain ID | 5003 |
| Symbol | MNT |
| Explorer | https://explorer.sepolia.mantle.xyz |

Get test MNT from a Mantle Sepolia faucet/provider.

### Run Locally

```bash
# Install dependencies
pnpm install

# Start frontend
cd app && pnpm dev

# Start agent (separate terminal)
cd agent && pnpm dev
```

Visit `http://localhost:3000`

### Deploy Contracts

```bash
cd contracts
npm run deploy:mantle-sepolia
```

---

## Project Structure

```
vasmo/
├── app/          # Next.js frontend
├── agent/        # TypeScript agent service
├── contracts/    # Solidity smart contracts
└── README.md
```

---

## x402 Payment Flow

The `payInvoice` function enables on-chain invoice settlement:

```solidity
function payInvoice(uint256 tokenId) external payable {
    // Validates invoice is payable (Active or InYield)
    // Transfers payment to invoice owner
    // Updates status to Paid
    // Emits InvoicePaid event
}
```

Clients can pay invoices directly through the UI or programmatically via the smart contract.

---

## Known Limitations (Hackathon Prototype)

**This is a demonstration project built for Mantle Sepolia testnet.**

### What's Real vs Simulated

#### Fully Functional
- Smart contracts deployed on Mantle Sepolia
- Wallet connection and transaction signing
- Invoice NFT minting and ownership tracking
- On-chain invoice payment (x402)
- Deposit/withdrawal flows
- Dashboard UI and data visualization
- Agent service with WebSocket communication

#### Simulated for Demo
**Yields are SIMULATED:**
- YieldVault uses hardcoded APY rates:
  - Conservative: 3.5% APY (constant)
  - Aggressive: 7.0% APY (constant)
- Yield calculation: `(principal × APY × time) / (365 days × 10000)` on-chain
- Real DeFi integration exists in contract architecture but not activated for demo

**Why simulated?** Integrating live DeFi pools requires production addresses, mainnet liquidity, and complex error handling. For hackathon purposes, simulated yields demonstrate the mechanism.

#### Partial Implementation
**Agent Service:**
- Runs as single Node.js process (port 8080)
- No database persistence (in-memory state only)
- Production would require job queue, PostgreSQL, and monitoring

**Privacy Commitments:**
- Invoice data stored as `keccak256` hashes on-chain
- Reveal verification exists but not used in UI
- True privacy would require zero-knowledge proofs

### Security & Legal Disclaimers

**Not Production-Ready:**
- Smart contracts are **NOT audited**
- No formal security review performed
- Use **testnet only** — do not deposit real funds
- Deployer retains admin privileges

### Honest Assessment

**What we proved:**
- Invoice tokenization is technically feasible
- On-chain payments work (x402)
- AI agents can automate strategy decisions
- Clean architecture and professional UI/UX are possible in Web3

**What we didn't prove:**
- Product-market fit
- Unit economics
- Go-to-market strategy

**This project demonstrates technical competence in agentic finance.**

---

## License

MIT
