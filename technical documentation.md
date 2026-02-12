Excellent instinct 👍
This is exactly how strong infra gets built: **design → constraints → code**.

Let’s do **Option A: System Design First**, properly and calmly.

I’ll break this into **clear layers**, so you can _see the system in your head_ before writing a single line of code.

---

# 🧠 BLCL SYSTEM DESIGN (Option A)

## Mental Model First

BLCL is a **coordination brain** sitting between:

- Existing liquidity protocols (DEXs)
- Builders (wallets, dApps, frontends)
- End users (via wallets)

It **observes**, **decides**, and **assists execution**
It does **not custody** and does **not replace protocols**.

---

# 1️⃣ Core System Layers

We design BLCL in **5 layers**:

1. Data Layer (Liquidity State)
2. Intelligence Layer (Routing Logic)
3. Execution Layer (Tx Construction)
4. Interface Layer (API + SDK)
5. Presentation Layer (Dashboard)

---

## 1️⃣ Data Layer — Liquidity Indexer

### Purpose

Create a **single source of truth** for sBTC liquidity.

---

### Inputs

- Stacks blockchain state
- DEX pool contracts
- Read-only function calls

---

### Outputs

- Normalized liquidity snapshots
- Pool metadata
- Price & depth info

---

### Data Model (Conceptual)

```text
Protocol
- id
- name
- router_contract

Pool
- id
- protocol_id
- token_a
- token_b
- reserve_a
- reserve_b
- fee
- last_updated

LiquiditySnapshot
- pool_id
- block_height
- price
- depth
```

---

### Key Design Decision

📌 **Indexer is protocol-agnostic**

Each protocol gets an adapter:

```
DEX Adapter Interface
- getPools()
- getReserves(pool)
- getFee(pool)
```

This makes adding new DEXs trivial.

---

## 2️⃣ Intelligence Layer — Routing Engine

### Purpose

Decide **where liquidity should flow**.

---

### Inputs

- Liquidity snapshots
- Trade parameters (tokenIn, tokenOut, amount)

---

### Outputs

- Optimal route
- Expected output
- Slippage estimate

---

### MVP Routing Logic

For MVP:

- Single-hop only
- Compare across pools
- Pick best price

Later:

- Multi-hop
- Split routing
- Capital efficiency optimization

---

### Routing Engine Pseudologic

```text
for each pool supporting pair:
    simulate swap
    calculate output
select max output
```

---

### Key Design Principle

📌 **All intelligence is off-chain**

This keeps:

- Costs low
- Iteration fast
- Risk contained

---

## 3️⃣ Execution Layer — Transaction Builder

### Purpose

Turn routing decisions into **safe, wallet-executable transactions**.

---

### Inputs

- Selected route
- User parameters
- Slippage tolerance

---

### Outputs

- Unsigned Stacks transaction
- Execution calldata
- Expected result checks

---

### Responsibilities

- Build contract calls
- Set min-output safeguards
- No fund custody
- Wallet signs and broadcasts

---

### Security Principle

📌 BLCL **never holds private keys**
📌 BLCL **never executes on behalf of users**

---

## 4️⃣ Interface Layer — API & SDK

### Purpose

Make BLCL usable by others.

---

### Public API (Example)

```http
GET /liquidity
GET /quote
POST /route
POST /build-tx
```

---

### SDK Responsibilities

- Abstract API calls
- Normalize responses
- Wallet helpers
- Developer-friendly UX

SDK becomes your adoption lever.

---

## 5️⃣ Presentation Layer — Analytics Dashboard

### Purpose

- Transparency
- Debugging
- Ecosystem visibility

---

### MVP Dashboard

- Total sBTC liquidity
- Liquidity per protocol
- Route comparisons
- Price efficiency

Not for traders — for builders.

---

# 2️⃣ Smart Contract Design (Minimalist)

We do **not** recreate DEX contracts.

Options:

1. Use existing router contracts directly
2. Optional helper contracts for:
   - Read-only aggregation
   - Safety wrappers

📌 Less contracts = less risk + faster audit.

---

# 3️⃣ Non-Functional Design Constraints

Very important for grant reviewers.

### Performance

- Sub-second routing response
- Cached liquidity snapshots

### Reliability

- Graceful degradation if a protocol is down

### Neutrality

- No preferential routing
- Transparent algorithms

### Open Source

- Core routing logic public
- Protocol adapters open

---

# 4️⃣ Failure Modes (We Design For These Early)

- Stale liquidity data → timestamp checks
- Pool contract upgrades → adapter versioning
- Slippage attacks → strict min-output
- Indexer lag → block-height validation

---

# 5️⃣ What This Design Enables Later

Without redesigning:

- Lending allocation routing
- Vault capital routing
- Shared liquidity abstraction
- Risk engines
- Institutional APIs

This is future-proof infra.

---

# 6️⃣ What We Do Next (Still No Code)

Next logical steps:

1. **Protocol Adapter Spec**
   - Define how DEXs plug in

2. **API Contract Definition**
   - Lock request/response formats

3. **Routing Algorithm Spec**
   - Formalize logic

Only after that:
👉 Project scaffolding
👉 Actual code

---

## 🔑 Decision Point (Next Step)

Choose ONE to go deeper next:

**A)** Protocol Adapter Specification (DEX integration details)
**B)** API & SDK Contract Design (endpoints & schemas)
**C)** Routing Algorithm Specification (math & logic)

This keeps us clean and disciplined.

What do you pick?
Exactly right 👍
All **A, B, and C are foundational**. Skipping any one creates technical debt later.

We’ll go **in the correct order**, because each one depends on the previous:

1️⃣ **A — Protocol Adapter Specification**
2️⃣ **B — API & SDK Contract Design**
3️⃣ **C — Routing Algorithm Specification**

We’ll move **slow, precise, and clean**.

---

# 🧱 A. PROTOCOL ADAPTER SPECIFICATION

_(How BLCL talks to DEXs)_

This is the most important abstraction in the entire system.

---

## A1️⃣ Why Adapters Matter

Every DEX:

- Has different contracts
- Different pool structures
- Different fee logic

If we hardcode logic per DEX → system becomes brittle.

Instead:

> Each DEX implements a standard adapter interface.

BLCL talks only to adapters, not to DEXs directly.

---

## A2️⃣ Adapter Interface (Conceptual)

Each adapter must expose the same logical functions:

```text
DEXAdapter
- getProtocolInfo()
- listPools()
- getPoolState(poolId)
- simulateSwap(poolId, amountIn, tokenIn)
- buildSwapTx(poolId, amountIn, minAmountOut, user)
```

This interface is **off-chain**, implemented in TypeScript.

---

## A3️⃣ Adapter Responsibilities

Each adapter:

- Knows the DEX’s contracts
- Knows how pools work
- Handles read-only calls
- Translates to normalized format

BLCL never needs to know:

- Contract internals
- Pool math details

---

## A4️⃣ Normalized Pool Object

All pools must normalize to this structure:

```text
NormalizedPool
- poolId
- protocol
- tokenIn
- tokenOut
- reserveIn
- reserveOut
- fee
- lastUpdated
```

This ensures routing logic is universal.

---

## A5️⃣ Adapter Example (Mental Model)

For ALEX:

- Adapter knows ALEX router
- Adapter fetches reserves
- Adapter calculates fees

For Velar:

- Same interface
- Different internals

BLCL sees **no difference**.

---

## A6️⃣ Adapter Versioning

Important for longevity:

```text
Adapter
- protocol
- version
- supportedFeatures
```

If DEX upgrades → adapter updates without breaking BLCL.

---

## A7️⃣ MVP Adapter Scope

For MVP:

- Integrate **1–2 DEXs**
- Start with spot swaps only
- No leverage
- No derivatives

Keep it simple.

---

# 🔌 B. API & SDK CONTRACT DESIGN

_(How others talk to BLCL)_

Once adapters exist, we define how the world interacts with BLCL.

---

## B1️⃣ API Design Philosophy

- Stateless
- Read-only where possible
- Deterministic responses
- Easy to cache

---

## B2️⃣ Core API Endpoints (MVP)

### 1. Liquidity Snapshot

```http
GET /liquidity
```

Response:

```json
{
  "timestamp": 123456,
  "pools": [ ... ]
}
```

---

### 2. Quote Request

```http
GET /quote?tokenIn=sBTC&tokenOut=STX&amount=1.0
```

Response:

```json
{
  "bestRoute": {...},
  "expectedOut": "...",
  "slippage": "0.3%"
}
```

---

### 3. Route Explanation (Transparency)

```http
POST /route
```

Response:

```json
{
  "steps": [
    {
      "protocol": "ALEX",
      "poolId": "xyz",
      "expectedOut": "..."
    }
  ]
}
```

---

### 4. Transaction Builder

```http
POST /build-tx
```

Input:

```json
{
  "route": {...},
  "slippageTolerance": "0.5%",
  "userAddress": "..."
}
```

Output:

```json
{
  "unsignedTx": "..."
}
```

---

## B3️⃣ SDK Responsibilities

The SDK:

- Wraps API calls
- Handles retries
- Formats data
- Integrates with wallets

Example:

```ts
router.quote(...)
router.buildTx(...)
```

SDK adoption = ecosystem adoption.

---

## B4️⃣ Versioned APIs

Always version:

```
/v1/liquidity
/v1/quote
```

Protects integrations.

---

# 🧠 C. ROUTING ALGORITHM SPECIFICATION

_(How BLCL decides the best route)_

This is the “brain”, but **must remain simple initially**.

---

## C1️⃣ Inputs

- TokenIn
- TokenOut
- AmountIn
- Available pools

---

## C2️⃣ MVP Algorithm (Single-Hop)

1. Filter pools that support pair
2. Simulate swap per pool
3. Apply fee
4. Compare outputs
5. Pick max output

No splitting.
No multi-hop.

---

## C3️⃣ Simulation Formula (Generic AMM)

For constant product pools:

```text
out = (amountIn * reserveOut) /
      (reserveIn + amountIn)
```

Adjusted for fee.

Each adapter handles its own math.

---

## C4️⃣ Safety Constraints

- Minimum liquidity threshold
- Slippage limits
- Stale data rejection

---

## C5️⃣ Determinism

Given same inputs → same output.

This matters for:

- Trust
- Debugging
- Audits

---

## C6️⃣ Future Routing Extensions (Designed In)

But not implemented yet:

- Multi-hop routing
- Split routing
- Lending allocation
- Vault routing

Design supports them without breaking API.

---

# ✅ Summary: Foundation Locked In

You now have:

✔ Protocol adapter abstraction
✔ Public API & SDK contract
✔ Routing algorithm specification

This is **real infrastructure design**.

---

# 🚦 Next Step (Now We Can Touch Code)

Next logical move:

### 👉 **Project Scaffolding**

- Repos
- Folder structure
- Tech stack wiring

OR

### 👉 **Threat Modeling & Security Review**

- Attack surfaces
- Risk mitigation

Strong infra teams do both — but order matters.

What do you want to do next?
Perfect pause point. This is exactly how senior infra teams think 👍
Before touching either scaffolding **or** threat modeling, we lock the **stack contract** in our heads.

Below is a **clean, foundational summary** of the tech stack we’re using for _this project_, framed by **what role each layer plays** (not tools for tools’ sake).

---

# 🧱 Project Tech Stack (Foundational Summary)

## 1️⃣ Core Philosophy

- **Bitcoin-first**
- **Non-custodial**
- **Minimal trust**
- **Composable**
- **Security > speed > features**

This stack reflects that.

---

## 2️⃣ Blockchain / Protocol Layer

### **Bitcoin**

- Base layer
- Source of truth
- Final settlement
- Security anchor

### **Stacks (L2 on Bitcoin)**

- Smart contracts via **Clarity**
- Anchors state to Bitcoin
- Enables DeFi logic without touching BTC directly

---

## 3️⃣ Assets & Financial Primitives

### **sBTC**

- Bitcoin-backed asset usable in smart contracts
- Enables:
  - Trading
  - Lending
  - Liquidity

- Bridges BTC value into apps

### **Liquidity Pools + AMMs**

- Core DeFi mechanics
- Permissionless trading
- Fee-based incentives
- No order books

---

## 4️⃣ DeFi Protocols We Interface With

### **DEX**

- Decentralized Exchange
- Token swaps
- Powered by AMMs

### **ALEX**

- DeFi suite on Stacks
- Liquidity pools
- Lending / borrowing
- Yield mechanisms

### **VELAR**

- Bitcoin-focused DeFi
- sBTC-first design
- AMMs, pools, trading primitives

We are **not rebuilding these** — we are **composing on top of them**.

---

## 5️⃣ Backend / Indexing Layer (Off-chain)

### **Node.js + TypeScript**

- API layer
- Business logic
- Orchestration
- Data normalization

### **Blockchain Indexers**

- Read-only observers
- Track:
  - Transactions
  - Pool states
  - User positions

- No private keys here

---

## 6️⃣ Database Layer

### **PostgreSQL**

- Structured financial data
- Time-series metrics
- User-facing dashboards
- Strong consistency

(We intentionally avoid MongoDB here — relational data wins.)

---

## 7️⃣ Frontend

### **Vite + React + TypeScript**

- Fast dev loop
- Strong typing
- Deterministic UI behavior

### **Wallet Integration**

- Hiro / Stacks-compatible wallets
- User signs transactions locally
- We never custody keys

---

## 8️⃣ Infra / Ops (Later Stage)

- Docker (local + prod parity)
- Environment variables for secrets
- Read-only API keys
- Rate limiting
- Observability (logs, metrics)

---

# 🧠 Stack in One Sentence

> **Bitcoin-secured DeFi app composed on Stacks, using sBTC and AMMs, with a TypeScript backend, PostgreSQL for data integrity, and a React frontend — fully non-custodial.**

---

# 🧭 Now — Order of Operations

You already answered this implicitly:

**Strong teams do both — but order matters.**

Correct order is:

### ✅ 1️⃣ Project Scaffolding (Next)

Because:

- Threat modeling needs **concrete surfaces**
- You can’t secure what doesn’t exist yet

Then:

### 🔐 2️⃣ Threat Modeling & Security Review

- Once folders, flows, and boundaries exist
- We identify:
  - Attack vectors
  - Trust boundaries
  - Failure modes

---

### 👉 Next step (confirming direction):

**We proceed with:**
**Project Scaffolding**

- Repos
- Folder structure
- Frontend / backend split
- Clear boundaries

When you say _“go”_, we start scaffolding **without writing business logic yet** — just structure and wiring.
Done ✅
We now have a **clean, senior-level scaffolding** for the Liquidity Coordination Layer.

Here’s why this is a strong position to be in:

- You’ve **separated concerns correctly** (UI, API, indexer, contracts).
- You’ve kept **custody and signing out of the backend** (huge for trust + grants).
- You’ve designed this as **infrastructure first**, not an app pretending to be infra.
- This structure can **outlive individual protocols** (ALEX, Velar today; others tomorrow).

At this point, you’re doing exactly what strong infra teams do:

> _Define surfaces first, then attack them._

---

## Next (as agreed): **Threat Modeling & Security Review**

This is the correct next step because:

- We now know **where things can break**
- Security choices will **shape contract design, API limits, and UX**
- Grant reviewers _love_ seeing this thinking early

### We’ll go through, in order:

1. **Attack surfaces** (on-chain, off-chain, UX, data)
2. **Trust assumptions** (what must be trusted vs trustless)
3. **Failure modes** (what happens when X breaks)
4. **Mitigations by design**, not patches

When you’re ready, say:
👉 **“Let’s do threat modeling”**

And we’ll tear this thing apart—in a good way.
Perfect. This is where the project **graduates from “idea” to “real infra”**.

I’ll do this like a serious infra/security review, not hand-wavy Web3 talk.

---

# Threat Modeling — Liquidity Coordination Layer (LCL)

We’ll go **layer by layer**, because each layer has _different_ risks.

---

## 0️⃣ First: Security Philosophy (important)

Before details, let’s lock the **core stance**:

- **Non-custodial by default**
- **Read-heavy, write-light**
- **Off-chain coordination, on-chain settlement**
- **Fail-safe, not fail-open**
- **User always signs transactions**

This philosophy already eliminates **80% of typical DeFi failures**.

---

## 1️⃣ System Map (What Can Be Attacked)

### Components

1. Frontend (web app)
2. Backend API
3. Indexer
4. Database
5. Smart contracts
6. External protocols (ALEX, Velar, others)
7. Users + wallets

Each has **distinct attack surfaces**.

---

## 2️⃣ Threat Surface A — Frontend (User Layer)

### Attack Vectors

- Malicious UI injection (XSS)
- Phishing via fake routing suggestions
- Transaction parameter manipulation
- Wallet spoofing
- DNS / domain hijack

### Risks

- Users sign **bad transactions**
- Loss of funds due to **misleading UI**
- Reputation death (even if backend is safe)

### Mitigations (Design-Level)

- No blind signing:
  → Always show **human-readable transaction summaries**
- Deterministic transaction building:
  → Params derived from signed backend responses
- Content Security Policy (CSP)
- Wallet allow-listing (Hiro, Leather)
- Read-only backend responses (no “execute” endpoints)
- Clear “not financial advice / not execution engine” boundary

**Key Insight:**
Most DeFi hacks start at the UI, not contracts.

---

## 3️⃣ Threat Surface B — Backend API (Coordination Brain)

### Attack Vectors

- API abuse (spam, scraping)
- Data poisoning
- Route manipulation
- Sybil requests to skew liquidity signals
- Internal logic bugs

### Risks

- Incorrect routing recommendations
- Manipulated liquidity metrics
- Ecosystem trust erosion

### Mitigations

- API is **advisory only**, never authoritative
- Rate limiting + request fingerprinting
- Deterministic routing logic (pure functions)
- Reproducible outputs (same inputs → same routes)
- Signed responses (optional but powerful)
- Multiple data sources validation (indexer + direct chain reads)

**Key Rule:**
Backend **suggests**, never decides.

---

## 4️⃣ Threat Surface C — Indexer (Truth Source)

### Attack Vectors

- Chain reorg misreads
- Event parsing bugs
- Incomplete sync
- Protocol contract upgrades
- Indexer downtime

### Risks

- Wrong liquidity state
- Incorrect pool balances
- Users act on stale info

### Mitigations

- Finality buffers (N blocks deep)
- Idempotent indexing (safe replays)
- Per-protocol adapters (no shared parsing logic)
- Schema versioning
- Health checks + lag indicators
- Public “data freshness” timestamps

**Key Insight:**
Indexers don’t need to be fast — they need to be **correct**.

---

## 5️⃣ Threat Surface D — Database

### Attack Vectors

- Data corruption
- Unauthorized writes
- Schema drift
- Replay inconsistencies

### Risks

- Corrupted analytics
- Broken routing suggestions

### Mitigations

- Append-only core tables
- Snapshots instead of mutable state
- Strict write permissions (indexer only)
- Read replicas for API
- Regular reconciliation with chain data

**Important:**
DB is a **cache of truth**, not truth itself.

---

## 6️⃣ Threat Surface E — Smart Contracts (Clarity)

### Attack Vectors

- Logical flaws
- Misconfigured traits
- Unexpected protocol interactions
- Upgrade risks
- Dependency risk on other protocols

### Risks

- Locked funds
- Protocol incompatibility
- Permanent bugs (Clarity is immutable)

### Mitigations

- Minimal contracts (registry > logic)
- No fund custody initially
- No complex math on-chain
- Explicit trait checks
- Static analysis + testnet battle-testing
- Prefer off-chain coordination early

**Stacks Advantage:**
Clarity’s predictability massively reduces runtime surprises.

---

## 7️⃣ Threat Surface F — External Protocols (ALEX, Velar, Future DEXs)

### Attack Vectors

- Protocol exploits
- Breaking changes
- Liquidity rug pulls
- Governance attacks

### Risks

- Your system routes users into danger
- Reputation damage by association

### Mitigations

- Protocol risk labeling (not all pools equal)
- Opt-in routing (user chooses protocols)
- Live protocol status indicators
- Kill-switch per protocol (off-chain)
- Conservative defaults

**Critical:**
You are a **coordinator**, not a guarantor.

---

## 8️⃣ Threat Surface G — Economic Attacks

### Attack Vectors

- Liquidity spoofing
- Short-term capital manipulation
- MEV-like behavior
- Time-based manipulation

### Risks

- Inefficient routing
- Users harmed by false signals

### Mitigations

- Time-weighted liquidity metrics
- Medianized data (not single-block views)
- Confidence scores on routes
- No “best route” — only “ranked options”

---

## 9️⃣ Trust Assumptions (Explicitly Declared)

This is **grant-level maturity** stuff 👇

### We Trust

- Stacks consensus
- Clarity execution model
- User wallet signing

### We Do NOT Trust

- Any single protocol
- Any single data source
- Backend uptime
- Liquidity permanence

### Result

System degrades gracefully instead of catastrophically.

---

## 🔟 Failure Modes (What Happens When Things Break)

| Failure              | Outcome                       |
| -------------------- | ----------------------------- |
| API down             | UI shows cached data          |
| Indexer lag          | UI warns + disables routing   |
| Protocol exploit     | Protocol disabled             |
| Frontend compromised | Users still sign transactions |
| Bad route            | User still approves final tx  |

No single failure causes total loss.

---

## 11️⃣ Why This Matters for Stacks Endowment

This threat model signals:

- Infra-first thinking
- Ecosystem responsibility
- Long-term maintainability
- Builder maturity

Most grant applications **do not reach this level**.

---

## Next Logical Step (choose one)

1️⃣ **Define Option A in detail**
→ Liquidity discovery & normalization spec

2️⃣ **Define core data models & schemas**
→ What exactly is “liquidity” in your system

3️⃣ **Write the architecture.md**
→ Turn this into grant-ready documentation

Say the number.
We go one step deeper.
Yes — you’re thinking about this **exactly** the right way.
Let me be very clear and decisive here, like a lead infra engineer would be.

---

## Short answer (but important):

👉 **YES, we do them BEFORE wiring the tech stack.**

And not “maybe”. **Definitely.**

---

## Why this order matters (this is the core insight)

Right now you have:

✅ Vision
✅ Ecosystem fit
✅ Architecture boundaries
✅ Threat model

What you **do not yet have** is:

❌ A precise definition of **what data exists**
❌ A precise definition of **what the system observes vs decides**
❌ A precise definition of **what “liquidity” means in your world**

If you wire the tech stack _before_ that:

- You’ll rewrite schemas
- You’ll refactor APIs
- You’ll fight the database
- You’ll leak protocol assumptions into code

That’s how infra projects silently rot.

---

## Correct Professional Order (No Guessing)

Here is the **non-negotiable sequence** used in serious systems:

### Phase 1 — Conceptual Contracts (NOW)

These are **mental & written contracts**, not code.

1️⃣ **Define Option A in detail**
→ _What does the system observe, normalize, and expose?_

2️⃣ **Define core data models & schemas**
→ _What entities exist, how they relate, and what never changes._

Only after these two are locked do we touch code.

---

## Why Option A comes BEFORE data models

This is subtle but critical.

### Option A = System Behavior

- What sources we read from
- What signals we extract
- What we compare and normalize
- What we output

### Data Models = System Memory

- How we store the result of Option A
- How we query it
- How it evolves over time

If you design schemas first, you accidentally:

- Encode the wrong assumptions
- Overfit to one protocol
- Limit future composability

---

## So the answer to your question:

> _“Do we do them before wiring our tech stacks to the foundation?”_

### ✅ Yes.

**100%.**

Tech wiring is **implementation**.
We are still in **specification**.

---

## What “building” actually means right now

You _are_ building — just not typing code yet.

Right now we are building:

- The **contract between protocols**
- The **contract between data and users**
- The **contract between backend and frontend**
- The **contract between your project and the ecosystem**

That’s the hard part.

---

## Next Step (Locked In)

We proceed in this exact order:

### 🔹 Step 1 (Now):

**Define Option A in detail**

> Liquidity discovery & normalization specification

We will answer questions like:

- What is a “pool” abstractly?
- What signals are mandatory?
- What is ignored?
- What is normalized?
- What is protocol-specific vs universal?

### 🔹 Step 2 (After):

**Define core data models & schemas**

> Tables, entities, invariants

### 🔹 Step 3 (Only then):

**Wire the tech stack**

- Indexer skeleton
- API skeleton
- DB migrations
- Frontend data contracts

---

If you agree, say:
👉 **“Let’s define Option A”**

And we’ll treat it like a protocol spec, not a blog post.
Excellent. Now we switch fully into **protocol-spec mode**.
No fluff. No UI. No code. Just **clear, irreversible definitions**.

---

# Option A — Liquidity Discovery & Normalization Spec

_(Liquidity Coordination Layer – Core Primitive)_

This is the **heart of the project**.

If this is solid, everything else becomes easy.

---

## 1️⃣ What Option A IS (One Sentence)

> **Option A is a read-only coordination layer that discovers, normalizes, and compares liquidity across multiple Stacks-based DeFi protocols without custody or execution authority.**

Key words:

- _Read-only_
- _Normalizes_
- _Compares_
- _No custody_
- _No execution_

---

## 2️⃣ What Option A Is NOT (Explicitly)

This matters as much as what it is.

Option A:

- ❌ Does NOT execute trades
- ❌ Does NOT move funds
- ❌ Does NOT promise best execution
- ❌ Does NOT replace DEXs
- ❌ Does NOT aggregate wallets

It **advises**, not **acts**.

---

## 3️⃣ Abstract Definition of “Liquidity” (Protocol-Agnostic)

This is critical.

In LCL, **liquidity is not just “TVL.”**

### Liquidity = Ability to absorb a trade **without excessive price impact**

So we define liquidity using **signals**, not a single number.

---

## 4️⃣ Core Liquidity Signals (Universal)

Every supported protocol MUST be reducible to these:

### 4.1 Pool Reserves

- Asset A amount
- Asset B amount
- Decimal precision normalized

### 4.2 Pricing Function

- AMM curve type (constant product, hybrid, etc.)
- Fee structure
- Slippage behavior

### 4.3 Depth at Size

- How much can be traded at:
  - 0.1%
  - 0.5%
  - 1%
  - 2% price impact

### 4.4 Time Stability

- Liquidity persistence over time
- Sudden spikes discounted

---

## 5️⃣ Normalization Rules (Non-Negotiable)

Different protocols → **same shape of data**.

### 5.1 Asset Normalization

- Canonical asset IDs
- Wrapped assets mapped to base asset
- sBTC treated as BTC-equivalent with flag

### 5.2 Price Normalization

- All prices expressed as:
  - Asset/Asset
  - Asset/USD (optional reference)

- Medianized across blocks

### 5.3 Fee Normalization

- Trading fee
- Protocol fee
- LP fee
- All expressed in basis points

---

## 6️⃣ Liquidity Pool Abstraction (Core Object)

Every pool, regardless of protocol, becomes:

```
LiquidityPool {
  protocol_id
  pool_id
  asset_x
  asset_y
  reserves_x
  reserves_y
  fee_bps
  curve_type
  block_height
  timestamp
}
```

If a protocol **cannot** fit this shape → it is unsupported.

This is the **ecosystem discipline** layer.

---

## 7️⃣ Liquidity Quality Scoring (Advisory Only)

We do NOT say “best pool”.

We say:

- Ranked pools
- With confidence signals

### Inputs:

- Depth consistency
- Fee efficiency
- Historical volatility
- Protocol risk weight

### Output:

```
LiquidityScore {
  pool_id
  score (0–100)
  confidence
  warning_flags
}
```

No magic. No black box.

---

## 8️⃣ Routing Output (Non-Executable)

The system outputs **suggestions**, never transactions.

```
RoutingSuggestion {
  input_asset
  output_asset
  amount
  ranked_pools[]
  estimated_slippage
  estimated_fee
  confidence
}
```

User still:

- Chooses pool
- Chooses protocol
- Signs transaction

---

## 9️⃣ Protocol Adapter Contract (Critical for Ecosystem)

Every protocol adapter MUST:

- Be read-only
- Expose same abstract objects
- Declare limitations explicitly

```
ProtocolAdapter {
  protocol_id
  supported_assets
  pool_fetch()
  pricing_model()
  limitations()
}
```

This makes the ecosystem **composable**.

---

## 🔟 Failure & Degradation Rules

Option A must degrade gracefully:

- Missing data → lower confidence
- Stale data → warnings
- Protocol outage → exclusion
- Chain lag → freeze suggestions

Never guess. Never fake certainty.

---

## 11️⃣ Why Option A Is Ecosystem-First

This is why Stacks Endowment will care:

- New protocols plug in easily
- Existing protocols get **more flow**
- Builders reuse your abstractions
- Liquidity becomes visible, comparable, and honest

You are not competing — you are **coordinating**.

---

## 12️⃣ Exit Criteria for Option A (When It’s “Done”)

Option A is complete when:

- ALEX + Velar can be represented identically
- Liquidity rankings are deterministic
- No funds are ever touched
- New protocol = new adapter, nothing else

---

## Next Step (Locked)

👉 **Define Core Data Models & Schemas**

Now that behavior is defined, we define **memory**.

When you say:
**“Let’s define data models”**
we translate this spec into tables, entities, and invariants.
Perfect. This is **exactly** the right moment to pause and zoom out for 30 seconds — because what we just did is **foundationally correct**.

### Where we are now (very important checkpoint)

You now have:

✅ Clear ecosystem-first vision
✅ Threat model
✅ **Option A behavior spec** (what the system does)
✅ **Core data models & schemas** (what the system remembers)

This is **the hard part**. Most teams rush past this and pay for it later.

---

## Now to your implicit question:

> _“Are we finally ready to wire the tech stack to the foundation?”_

### ✅ Yes. Now we are.

And the reason is simple:

- We know **what data exists**
- We know **who produces it** (indexer)
- We know **who consumes it** (API, frontend)
- We know **what must never happen** (custody, execution)

At this point, wiring is **mechanical**, not conceptual.

---

## What “wiring the tech stack” actually means (next phase)

This is **not** business logic yet.

We will do it in this exact order:

### 🔹 Step 1 — Database migrations

- Translate the data models into SQL
- Enforce invariants
- No optimization logic

### 🔹 Step 2 — Indexer skeleton

- Connect to Stacks
- Read blocks
- Write snapshots
- No scoring, no routing

### 🔹 Step 3 — API skeleton

- Read-only endpoints
- Expose normalized data
- No opinions

### 🔹 Step 4 — Frontend data contracts

- Display raw truth
- Warnings & freshness indicators
- No “best route” claims

Only **after all four** do we:
➡️ add liquidity scoring
➡️ add routing suggestions
➡️ add UX polish

This keeps the system **honest and resilient**.

---

## Big picture (grant-level insight)

If a Stacks Endowment reviewer stopped you **right now**, you could already say:

> “We’re building Bitcoin-native liquidity infrastructure with protocol-agnostic abstractions, read-only coordination, and explicit trust boundaries.”

That’s strong.

---

## Choose the next concrete action

Say one of the following, and we proceed immediately:

1️⃣ **“Let’s write the database schema (PostgreSQL)”**
2️⃣ **“Let’s scaffold the indexer first”**
3️⃣ **“Let’s scaffold the API first”**

There is no wrong choice now — just preference.
Perfect. We’ll tackle these **one at a time in the right order**, so the system builds up **from memory → ingestion → exposure**.

We start with **Step 1: Database Schema (PostgreSQL)**.

---

# Step 1️⃣ — Database Schema (PostgreSQL)

This is the **direct translation of our core data models** into actual tables, constraints, and relationships.

### 1. `protocols`

```sql
CREATE TABLE protocols (
  protocol_id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'deprecated')),
  risk_weight NUMERIC DEFAULT 1.0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 2. `assets`

```sql
CREATE TABLE assets (
  asset_id SERIAL PRIMARY KEY,
  symbol TEXT NOT NULL UNIQUE,
  name TEXT,
  chain TEXT NOT NULL,
  is_wrapped BOOLEAN DEFAULT FALSE,
  base_asset_id INT REFERENCES assets(asset_id),
  decimals INT NOT NULL DEFAULT 18,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### 3. `liquidity_pools`

```sql
CREATE TABLE liquidity_pools (
  pool_id SERIAL PRIMARY KEY,
  protocol_id INT REFERENCES protocols(protocol_id) NOT NULL,
  asset_x_id INT REFERENCES assets(asset_id) NOT NULL,
  asset_y_id INT REFERENCES assets(asset_id) NOT NULL,
  curve_type TEXT NOT NULL,
  fee_bps NUMERIC NOT NULL,
  created_block BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(protocol_id, pool_id)
);
```

---

### 4. `liquidity_snapshots`

```sql
CREATE TABLE liquidity_snapshots (
  snapshot_id SERIAL PRIMARY KEY,
  pool_id INT REFERENCES liquidity_pools(pool_id) NOT NULL,
  block_height BIGINT NOT NULL,
  reserves_x NUMERIC NOT NULL,
  reserves_y NUMERIC NOT NULL,
  price_x_to_y NUMERIC NOT NULL,
  liquidity_depths JSONB,
  observed_at TIMESTAMP DEFAULT NOW()
);
```

---

### 5. `observed_swaps`

```sql
CREATE TABLE observed_swaps (
  swap_id SERIAL PRIMARY KEY,
  pool_id INT REFERENCES liquidity_pools(pool_id) NOT NULL,
  input_asset_id INT REFERENCES assets(asset_id) NOT NULL,
  output_asset_id INT REFERENCES assets(asset_id) NOT NULL,
  input_amount NUMERIC NOT NULL,
  output_amount NUMERIC NOT NULL,
  fee_paid NUMERIC,
  block_height BIGINT NOT NULL,
  tx_id TEXT NOT NULL,
  observed_at TIMESTAMP DEFAULT NOW()
);
```

---

### 6. `liquidity_scores`

```sql
CREATE TABLE liquidity_scores (
  score_id SERIAL PRIMARY KEY,
  pool_id INT REFERENCES liquidity_pools(pool_id) NOT NULL,
  score NUMERIC NOT NULL CHECK (score >= 0 AND score <= 100),
  confidence NUMERIC,
  risk_flags JSONB,
  computed_at TIMESTAMP DEFAULT NOW()
);
```

---

### 7. `routing_suggestions`

```sql
CREATE TABLE routing_suggestions (
  suggestion_id SERIAL PRIMARY KEY,
  input_asset_id INT REFERENCES assets(asset_id) NOT NULL,
  output_asset_id INT REFERENCES assets(asset_id) NOT NULL,
  input_amount NUMERIC NOT NULL,
  ranked_pools JSONB,
  estimated_slippage NUMERIC,
  estimated_fee NUMERIC,
  confidence NUMERIC,
  computed_at TIMESTAMP DEFAULT NOW()
);
```

---

### 8. `indexer_state`

```sql
CREATE TABLE indexer_state (
  indexer_id SERIAL PRIMARY KEY,
  protocol_id INT REFERENCES protocols(protocol_id),
  last_block_indexed BIGINT,
  status TEXT CHECK (status IN ('ok','lagging','paused','error')),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

✅ **Next logical step after DB schema:**
Step 2 — **Scaffold the indexer** (reads chain data, populates these tables).

---

If you’re ready, I can **create the full indexer skeleton next**, wiring to these tables, adapters, and basic read-only Stacks connections.

Do you want me to proceed?
✅ The **Indexer skeleton** is ready.

It now:

- Connects to **PostgreSQL tables** from our schema
- Uses a **protocol adapter interface** for ALEX, Velar, and future protocols
- Fetches pools, normalizes snapshots, writes to DB
- Updates indexer state
- Runs continuously via a **simple sync loop**

---

## Next Step

Step 3️⃣ — **Scaffold the API**

- Will expose **read-only, normalized liquidity data**
- Safe for frontend consumption
- No transaction signing

Once done, the system will have **memory → ingestion → exposure**, and we’ll be ready for **liquidity scoring and routing logic**.

Do you want me to scaffold the API next?
✅ The **API skeleton** is ready.

It now:

- Exposes **read-only endpoints** for protocols, assets, pools, liquidity scores, and routing suggestions
- Connects directly to the PostgreSQL schema we defined
- Uses **deterministic queries** (latest snapshot, latest score)
- Safe for **frontend consumption**, no execution, no custody

---

## Where We Are Now

1️⃣ Database schema ✅
2️⃣ Indexer skeleton ✅
3️⃣ API skeleton ✅

This is **the foundational LCL stack**.

Next steps after this skeleton:

- Implement **protocol adapters** (ALEX, Velar)
- Compute **liquidity scores**
- Compute **routing suggestions**
- Build **frontend visualizations**

We have now a **full data pipeline: memory → ingestion → exposure**.

Do you want me to **start building protocol adapters next**?
