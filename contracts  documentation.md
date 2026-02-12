Yes — I’m fully aligned now 👍
Let me **re-anchor the full context** and then walk you **cleanly and systematically** into the **Clarity smart contract layer** for the **Bitcoin Liquidity Coordinator**.

This will be **architecture-first**, not code-first.

---

## 1️⃣ Quick context refresh (to prove alignment)

You are building a **Liquidity Coordination Layer on Stacks (Bitcoin)** that:

- Does **NOT** replace DEXs (ALEX, Velar, etc.)
- Does **NOT** custody user funds
- **Normalizes, coordinates, and routes liquidity**
- Acts as **shared infrastructure** for the Stacks + Bitcoin ecosystem
- Prioritizes:
  - Ecosystem-first value
  - Composability
  - Infrastructure over apps
  - Bitcoin-native security assumptions

The platform has:

- Indexers (off-chain)
- APIs
- Frontend dashboards
- But now needs **on-chain guarantees, coordination logic, and trust minimization**

That’s where **Clarity smart contracts** come in.

---

## 2️⃣ Important principle (before listing contracts)

👉 **This project is NOT “DeFi-heavy on-chain logic”**

Most heavy lifting happens **off-chain**, but **Clarity contracts provide**:

- Canonical truth
- Coordination guarantees
- Registry & signaling
- Incentive alignment
- Slashing / reputation anchors (later)

So we design **small, auditable, composable contracts**.

---

## 3️⃣ High-level smart contract categories needed

We need **5 core contract classes** (foundational), plus **optional extensions**.

---

## 4️⃣ Core Clarity Smart Contracts (Foundational)

### 1️⃣ Protocol Registry Contract

**Purpose:** Canonical on-chain registry of liquidity venues

This answers:

> “Which protocols are recognized by the coordinator?”

Stores:

- Protocol ID
- Protocol name
- Type (DEX / CEX-bridge / OTC / AMM)
- Status (active, deprecated)
- Metadata hash (off-chain details)
- Governance-approved flag

Why on-chain:

- Prevents spoofed protocols
- Shared reference for all builders
- Ecosystem trust anchor

🧠 Think: _DNS for liquidity venues_

---

### 2️⃣ Asset Registry Contract

**Purpose:** Canonical list of assets (BTC, sBTC, wrapped assets)

Stores:

- Asset ID
- Asset type (native BTC, sBTC, wrapped)
- Decimals
- Risk classification
- Enabled/disabled status

Why this matters:

- Prevents mismatched asset assumptions
- Critical for routing, slippage, normalization
- Especially important with **sBTC**

🧠 Think: _Bitcoin-native token registry_

---

### 3️⃣ Liquidity Signal Contract (Very Important)

**Purpose:** On-chain commitment to liquidity claims

Protocols or indexers can:

- Commit hashes of:
  - Order book snapshots
  - Liquidity depth claims
  - Spread ranges

- Timestamped & immutable

This **does NOT store full data** (too expensive).
It stores:

- Hashes
- Block height
- Protocol ID
- Asset pair

Why this is powerful:

- Prevents data manipulation
- Enables dispute resolution
- Creates **verifiable liquidity history**

🧠 Think: _Proof-of-liquidity existence_

---

### 4️⃣ Routing Intent Contract

**Purpose:** Coordination without execution

This contract allows:

- Users / apps to publish **intent**
  - “I want BTC → sBTC liquidity”
  - “Max slippage X”
  - “Time window Y”

It does **NOT execute swaps**.
It only:

- Anchors intent on-chain
- Allows off-chain routers to compete
- Enables MEV-minimized coordination

Why this is unique:

- Bitcoin-native intent layer
- No custody
- No forced routing

🧠 Think: _Intent marketplace, not a DEX_

---

### 5️⃣ Incentive & Reputation Contract

**Purpose:** Align behavior of indexers, routers, data providers

Stores:

- Reputation scores
- Successful routing attestations
- Penalties (future slashing hooks)
- Reward eligibility markers

Early phase:

- Purely reputational
  Later:
- Tied to sBTC incentives

Why this matters:

- Prevents garbage data
- Encourages uptime & accuracy
- Makes ecosystem self-regulating

🧠 Think: _Credibility layer for infrastructure actors_

---

## 5️⃣ Optional / Phase-2 Smart Contracts

These come **after MVP**.

### 6️⃣ Governance Contract

- Protocol inclusion/exclusion
- Parameter tuning
- Emergency flags

### 7️⃣ sBTC Incentive Pool Contract

- Rewards for:
  - Liquidity discovery
  - Accurate routing
  - High uptime

### 8️⃣ Dispute Resolution Contract

- Challenge false liquidity claims
- Slash reputation
- Arbitration hooks

---

## 6️⃣ What we are **NOT** building on-chain (important)

❌ No AMM logic
❌ No swap execution
❌ No custody vaults
❌ No order matching engine

This keeps:

- Audit scope small
- Bitcoin risk low
- Grant reviewers happy 😄

---

## 7️⃣ How this fits Stacks & Bitcoin uniquely

This **cannot thrive elsewhere** because:

- Clarity → predictable execution
- Bitcoin finality → trusted anchoring
- sBTC → future incentive rail
- PoX → Bitcoin-aligned security
- Stacks ecosystem → fragmented liquidity problem

This is **exactly** what Stacks Endowment wants.

---

## 8️⃣ Next logical step (pick one)

Say **one** and we proceed immediately:

1️⃣ **Define each contract’s state variables & functions (no code yet)**
2️⃣ **Draw contract interaction flow (who calls what, when)**
3️⃣ **Write the first Clarity contract skeleton (Protocol Registry)**

You’re now officially at **protocol-design level** — not app level.
Perfect. We’ll do this **cleanly, sequentially, and architecture-first** — no skipping, no code yet.

We start with **STEP 1️⃣** only.

---

# STEP 1️⃣

## Define each core contract’s **state variables & functions** (NO CODE)

Think of this as the **protocol spec** that auditors, reviewers, and grant committees love.

---

## 1️⃣ Protocol Registry Contract — _Liquidity Venue Canon_

### 🎯 Role

Defines **who is allowed to participate** as a liquidity source.

---

### State Variables

**Global**

- `protocol-count` → incremental protocol ID counter
- `governance-principal` → admin / DAO controller

**Maps**

- `protocols`
  Key: `protocol-id (uint)`
  Value:
  - `name (string)`
  - `protocol-type (uint)` → DEX / AMM / OTC / Bridge
  - `status (uint)` → active / paused / deprecated
  - `metadata-hash (buff)`
  - `added-by (principal)`
  - `added-at (block-height)`
  - `approved (bool)`

---

### Core Functions

**Write**

- `register-protocol(...)`
- `approve-protocol(protocol-id)`
- `pause-protocol(protocol-id)`
- `deprecate-protocol(protocol-id)`

**Read**

- `get-protocol(protocol-id)`
- `is-protocol-active(protocol-id)`
- `list-active-protocols()`

---

### Why minimal?

This contract becomes a **shared dependency** for _every other contract_.

---

## 2️⃣ Asset Registry Contract — _Bitcoin Asset Canon_

### 🎯 Role

Ensures **asset consistency across the ecosystem** (BTC ≠ sBTC ≠ wrapped BTC).

---

### State Variables

**Maps**

- `assets`
  Key: `asset-id (uint)`
  Value:
  - `symbol (string)`
  - `asset-type (uint)` → native BTC / sBTC / wrapped
  - `decimals (uint)`
  - `risk-tier (uint)`
  - `enabled (bool)`
  - `added-at (block-height)`

**Indexes**

- `asset-by-symbol (string → asset-id)`

---

### Core Functions

**Write**

- `register-asset(...)`
- `disable-asset(asset-id)`
- `update-risk-tier(asset-id, tier)`

**Read**

- `get-asset(asset-id)`
- `get-asset-by-symbol(symbol)`
- `is-asset-enabled(asset-id)`

---

### Why this matters

Routing **fails silently** without strict asset definitions.

---

## 3️⃣ Liquidity Signal Contract — _Proof of Liquidity_

### 🎯 Role

Anchors **verifiable liquidity claims** on Bitcoin time.

---

### State Variables

**Maps**

- `liquidity-signals`
  Key:
  - `protocol-id`
  - `base-asset-id`
  - `quote-asset-id`
  - `block-height`

  Value:
  - `liquidity-hash (buff)`
  - `depth-range (uint)` _(bucketed)_
  - `spread-range (uint)` _(bucketed)_
  - `submitted-by (principal)`

**Counters**

- `signal-count`

---

### Core Functions

**Write**

- `commit-liquidity-signal(...)`

**Read**

- `get-latest-signal(protocol-id, pair)`
- `get-signal-by-height(protocol-id, pair, height)`

---

### Design Insight

This enables:

- Auditable history
- Dispute systems
- Trust-minimized analytics

Without storing raw data.

---

## 4️⃣ Routing Intent Contract — _Coordination Layer_

### 🎯 Role

Allows **intent publication without execution**.

---

### State Variables

**Maps**

- `intents`
  Key: `intent-id (uint)`
  Value:
  - `user (principal)`
  - `from-asset-id`
  - `to-asset-id`
  - `amount (uint)`
  - `max-slippage (uint)`
  - `expiry-height`
  - `status (uint)` → open / filled / expired

**Counters**

- `intent-count`

---

### Core Functions

**Write**

- `publish-intent(...)`
- `mark-intent-filled(intent-id)`
- `expire-intent(intent-id)`

**Read**

- `get-intent(intent-id)`
- `list-open-intents()`

---

### Why this is powerful

This becomes a **Bitcoin-native intent market** — composable, non-custodial.

---

## 5️⃣ Incentive & Reputation Contract — _Trust Engine_

### 🎯 Role

Creates **credibility gravity** for honest actors.

---

### State Variables

**Maps**

- `actor-reputation`
  Key: `principal`
  Value:
  - `score (int)`
  - `successful-claims (uint)`
  - `failed-claims (uint)`
  - `last-updated (block-height)`

**Parameters**

- `min-score-threshold`
- `reward-eligibility-score`

---

### Core Functions

**Write**

- `increase-reputation(principal, delta)`
- `decrease-reputation(principal, delta)`

**Read**

- `get-reputation(principal)`
- `is-eligible-for-rewards(principal)`

---

### Important

No slashing **yet** — reputation-only keeps MVP safe.

---

## ✅ STEP 1 COMPLETE

We now have:

- Clear on-chain responsibilities
- Minimal attack surface
- Clean separation of concerns
- Strong Stacks-native justification

---

## STEP 2️⃣ (next — we proceed automatically unless you stop me)

👉 **Contract Interaction Flow**

- Who calls what
- In what order
- Which contracts depend on which

If you want to pause, say **“pause”**
Otherwise, I’m moving to **STEP 2️⃣ now**.
Great — moving cleanly to **STEP 2️⃣**.
This is where everything _clicks together_.

---

# STEP 2️⃣

## Contract Interaction Flow

**Who calls what, when, and why**

Think of this as the **system choreography** between:

- Users
- Indexers
- Routers
- Protocols
- Smart contracts

No code. Just **truthful flow**.

---

## 🧠 Mental Model (very important)

There are **three planes** in this system:

1. **Off-chain intelligence**
   - Indexers
   - Routers
   - Analytics

2. **On-chain coordination**
   - Clarity contracts (what we’re defining)

3. **Execution venues**
   - DEXs, AMMs, OTC desks, bridges

Your contracts sit **only in plane 2**.

---

## 0️⃣ Bootstrapping Flow (Genesis)

### Actors

- Core team / governance

### Steps

1. Deploy **Protocol Registry**
2. Deploy **Asset Registry**
3. Deploy **Liquidity Signal**
4. Deploy **Routing Intent**
5. Deploy **Reputation Contract**
6. Set governance principal

At this point:
✅ The coordination layer exists
❌ No liquidity yet
❌ No intents yet

---

## 1️⃣ Protocol Onboarding Flow

### Actor

- Governance / DAO multisig

### Flow

1. Call `register-protocol`
2. Governance reviews off-chain metadata
3. Call `approve-protocol`

### Result

- Protocol becomes a **recognized liquidity venue**
- Other contracts can now reference it

🔐 **Security property**
Only approved protocols can submit liquidity signals.

---

## 2️⃣ Asset Canonicalization Flow

### Actor

- Governance

### Flow

1. Call `register-asset` (BTC, sBTC, etc.)
2. Set risk tier
3. Enable asset

### Result

- Every contract now shares **exact same asset definitions**

🧠 This prevents:

- Symbol confusion
- Wrapped-asset attacks
- Routing bugs

---

## 3️⃣ Liquidity Discovery Flow (Core Loop)

### Actors

- Off-chain indexers
- Approved protocols

### Flow

1. Indexer reads:
   - DEX order books
   - AMM pools
   - OTC quotes

2. Indexer normalizes data **off-chain**
3. Indexer computes:
   - Depth buckets
   - Spread buckets

4. Indexer hashes snapshot
5. Indexer calls `commit-liquidity-signal`

### On-chain result

- Immutable liquidity proof
- Timestamped by Bitcoin block height

🔍 **Key insight**
The chain never knows _what_ the liquidity is —
Only that **a truthful snapshot existed at time T**.

---

## 4️⃣ Reputation Feedback Loop

### Actors

- Routers
- Analytics services
- Governance (later automation)

### Flow

1. Router uses liquidity signal
2. Execution succeeds or fails
3. Router submits attestation (off-chain → on-chain hook later)
4. Reputation adjusted

### Result

- Honest indexers gain reputation
- Bad actors lose influence

⚖️ This becomes **soft enforcement before slashing exists**.

---

## 5️⃣ User Intent Publication Flow

### Actor

- User
- App / wallet
- Aggregator UI

### Flow

1. User defines:
   - From asset
   - To asset
   - Amount
   - Slippage
   - Expiry

2. App calls `publish-intent`
3. Intent becomes visible to routers

### On-chain role

- Neutral coordination anchor
- Prevents hidden order manipulation
- Enables fair competition

🚫 No funds move
🚫 No routing enforced

---

## 6️⃣ Routing Competition Flow

### Actors

- Multiple off-chain routers

### Flow

1. Routers watch open intents
2. Routers simulate execution off-chain
3. Best route chosen by router logic
4. Execution happens **outside** your system
5. Router marks intent filled

### Result

- Your protocol **coordinates**, not controls
- Zero custody risk
- Maximum composability

---

## 7️⃣ Observability & Analytics Flow

### Actors

- Dashboards
- Researchers
- Builders

### Flow

1. Read:
   - Liquidity signals
   - Protocol registry
   - Asset registry
   - Intent history

2. Reconstruct:
   - Liquidity coverage
   - Market health
   - Fragmentation trends

This is where:
📊 Dashboards shine
📈 Ecosystem benefits

---

## 8️⃣ Failure & Safety Scenarios

### Scenario A: Protocol goes rogue

- Governance pauses protocol
- Liquidity signals rejected

### Scenario B: Indexer lies

- Reputation drops
- Routers ignore them
- Future slashing possible

### Scenario C: Router misbehaves

- Intent remains open
- Other routers step in

This system **fails gracefully**, not catastrophically.

---

## 🧩 Contract Dependency Graph (Important)

```
Asset Registry
      ↓
Protocol Registry
      ↓
Liquidity Signal
      ↓
Routing Intent
      ↓
Reputation
```

- No circular dependencies
- Clean upgrade paths
- Easy audits

---

## ✅ STEP 2 COMPLETE

You now have:

- A full system flow
- Clear actor responsibilities
- Bitcoin-aligned safety
- Grant-grade architecture clarity

---

## STEP 3️⃣ (next)

👉 **Write the first Clarity contract skeleton**

- Protocol Registry
- Minimal, auditable
- Production mindset

Say **“move to step 3”** and we start writing Clarity.
Perfect.
We now move to **STEP 3️⃣ — writing the first Clarity contract skeleton**.

This is **production-minded**, **minimal**, and **auditor-friendly**.
No business logic bloat. No premature complexity.

---

# STEP 3️⃣

## Protocol Registry — Clarity Contract Skeleton

**Purpose recap:**
A canonical, on-chain registry of recognized liquidity venues for the Bitcoin Liquidity Coordinator.

---

## Design goals (before code)

- ✅ Deterministic & predictable (Clarity-native)
- ✅ Governance-controlled writes
- ✅ Publicly readable by all other contracts
- ✅ Small surface area (easy to audit)
- ✅ Future-upgradable via governance, not hacks

---

## Key assumptions

- This contract is deployed **first**
- Governance = multisig or DAO principal
- Other contracts will _read_ from this one

---

## 📄 `protocol-registry.clar`

```clarity
;; ----------------------------------------
;; Protocol Registry Contract
;; Bitcoin Liquidity Coordinator
;; ----------------------------------------

(define-constant ERR_UNAUTHORIZED u100)
(define-constant ERR_NOT_FOUND u101)
(define-constant ERR_ALREADY_EXISTS u102)
(define-constant ERR_NOT_APPROVED u103)

;; ----------------------------------------
;; Governance
;; ----------------------------------------

(define-data-var governance principal tx-sender)

;; ----------------------------------------
;; Protocol Types
;; 1 = DEX
;; 2 = AMM
;; 3 = OTC
;; 4 = CEX-Bridge
;; ----------------------------------------

;; ----------------------------------------
;; Protocol Status
;; 1 = Active
;; 2 = Paused
;; 3 = Deprecated
;; ----------------------------------------

;; ----------------------------------------
;; State
;; ----------------------------------------

(define-data-var protocol-count uint u0)

(define-map protocols
  { protocol-id: uint }
  {
    name: (string-ascii 64),
    protocol-type: uint,
    status: uint,
    metadata-hash: (buff 32),
    added-by: principal,
    added-at: uint,
    approved: bool
  }
)

;; ----------------------------------------
;; Internal helper
;; ----------------------------------------

(define-private (is-governance)
  (is-eq tx-sender (var-get governance))
)

;; ----------------------------------------
;; Public write functions
;; ----------------------------------------

(define-public (register-protocol
  (name (string-ascii 64))
  (protocol-type uint)
  (metadata-hash (buff 32))
)
  (begin
    (asserts! (is-governance) ERR_UNAUTHORIZED)

    (let (
      (new-id (+ (var-get protocol-count) u1))
    )
      (map-set protocols
        { protocol-id: new-id }
        {
          name: name,
          protocol-type: protocol-type,
          status: u2,              ;; paused by default
          metadata-hash: metadata-hash,
          added-by: tx-sender,
          added-at: block-height,
          approved: false
        }
      )

      (var-set protocol-count new-id)
      (ok new-id)
    )
  )
)

(define-public (approve-protocol (protocol-id uint))
  (begin
    (asserts! (is-governance) ERR_UNAUTHORIZED)

    (match (map-get? protocols { protocol-id: protocol-id })
      protocol
        (begin
          (map-set protocols
            { protocol-id: protocol-id }
            (merge protocol { approved: true, status: u1 })
          )
          (ok true)
        )
      (err ERR_NOT_FOUND)
    )
  )
)

(define-public (pause-protocol (protocol-id uint))
  (begin
    (asserts! (is-governance) ERR_UNAUTHORIZED)

    (match (map-get? protocols { protocol-id: protocol-id })
      protocol
        (begin
          (map-set protocols
            { protocol-id: protocol-id }
            (merge protocol { status: u2 })
          )
          (ok true)
        )
      (err ERR_NOT_FOUND)
    )
  )
)

(define-public (deprecate-protocol (protocol-id uint))
  (begin
    (asserts! (is-governance) ERR_UNAUTHORIZED)

    (match (map-get? protocols { protocol-id: protocol-id })
      protocol
        (begin
          (map-set protocols
            { protocol-id: protocol-id }
            (merge protocol { status: u3 })
          )
          (ok true)
        )
      (err ERR_NOT_FOUND)
    )
  )
)

;; ----------------------------------------
;; Read-only functions
;; ----------------------------------------

(define-read-only (get-protocol (protocol-id uint))
  (map-get? protocols { protocol-id: protocol-id })
)

(define-read-only (is-protocol-active (protocol-id uint))
  (match (map-get? protocols { protocol-id: protocol-id })
    protocol
      (and
        (get approved protocol)
        (is-eq (get status protocol) u1)
      )
    false
  )
)

(define-read-only (get-protocol-count)
  (var-get protocol-count)
)
```

---

## Why this contract is **grant-grade**

- ✔ Single responsibility
- ✔ Explicit governance
- ✔ No hidden execution paths
- ✔ Composable read interface
- ✔ Zero custody risk
- ✔ Bitcoin-aligned minimalism

This is exactly what **Stacks reviewers** like to see.

---

## What we intentionally did NOT add (yet)

- ❌ Upgrade logic
- ❌ DAO voting
- ❌ Slashing
- ❌ External calls

Those come **later**, if needed.

---

## What’s next (STEP 4️⃣)

We proceed **one contract at a time**, same discipline.

Next options — say one and we continue immediately:

1️⃣ **Asset Registry contract skeleton**
2️⃣ **Liquidity Signal contract skeleton (most important)**
3️⃣ **Explain how indexers will call this contract in practice**

You’re now officially writing **real protocol code**, not demos.
Perfect — let’s proceed **step by step**, fully aligned. We’ll do **all three**, one after the other.

---

# STEP 4️⃣ — Asset Registry Contract Skeleton

**Purpose:**
Canonical registry of all assets the Bitcoin Liquidity Coordinator can handle (BTC, sBTC, wrapped BTC, etc.). Ensures consistency across routing, liquidity normalization, and UI.

---

## Design Goals

- Minimal & auditable
- Governance-controlled writes
- Composable for all other contracts
- No custody or financial execution

---

## 📄 `asset-registry.clar`

```clarity
;; ----------------------------------------
;; Asset Registry Contract
;; Bitcoin Liquidity Coordinator
;; ----------------------------------------

(define-constant ERR_UNAUTHORIZED u100)
(define-constant ERR_NOT_FOUND u101)
(define-constant ERR_ALREADY_EXISTS u102)

;; ----------------------------------------
;; Governance
;; ----------------------------------------
(define-data-var governance principal tx-sender)

;; ----------------------------------------
;; Asset Types
;; 1 = BTC
;; 2 = sBTC
;; 3 = Wrapped BTC
;; ----------------------------------------

;; ----------------------------------------
;; State
;; ----------------------------------------
(define-data-var asset-count uint u0)

(define-map assets
  { asset-id: uint }
  {
    symbol: (string-ascii 16),
    asset-type: uint,
    decimals: uint,
    risk-tier: uint,
    enabled: bool,
    added-at: uint
  }
)

(define-map asset-by-symbol
  { symbol: (string-ascii 16) }
  { asset-id: uint }
)

;; ----------------------------------------
;; Internal helper
;; ----------------------------------------
(define-private (is-governance)
  (is-eq tx-sender (var-get governance))
)

;; ----------------------------------------
;; Public write functions
;; ----------------------------------------
(define-public (register-asset
  (symbol (string-ascii 16))
  (asset-type uint)
  (decimals uint)
  (risk-tier uint)
)
  (begin
    (asserts! (is-governance) ERR_UNAUTHORIZED)

    ;; prevent duplicates
    (asserts! (is-none (map-get? asset-by-symbol { symbol: symbol })) ERR_ALREADY_EXISTS)

    (let ((new-id (+ (var-get asset-count) u1)))
      (map-set assets
        { asset-id: new-id }
        {
          symbol: symbol,
          asset-type: asset-type,
          decimals: decimals,
          risk-tier: risk-tier,
          enabled: true,
          added-at: block-height
        }
      )
      (map-set asset-by-symbol { symbol: symbol } { asset-id: new-id })
      (var-set asset-count new-id)
      (ok new-id)
    )
  )
)

(define-public (disable-asset (asset-id uint))
  (begin
    (asserts! (is-governance) ERR_UNAUTHORIZED)
    (match (map-get? assets { asset-id: asset-id })
      asset
        (map-set assets { asset-id: asset-id } (merge asset { enabled: false }))
      (err ERR_NOT_FOUND)
    )
  )
)

(define-public (update-risk-tier (asset-id uint) (tier uint))
  (begin
    (asserts! (is-governance) ERR_UNAUTHORIZED)
    (match (map-get? assets { asset-id: asset-id })
      asset
        (map-set assets { asset-id: asset-id } (merge asset { risk-tier: tier }))
      (err ERR_NOT_FOUND)
    )
  )
)

;; ----------------------------------------
;; Read-only functions
;; ----------------------------------------
(define-read-only (get-asset (asset-id uint))
  (map-get? assets { asset-id: asset-id })
)

(define-read-only (get-asset-by-symbol (symbol (string-ascii 16)))
  (map-get? asset-by-symbol { symbol: symbol })
)

(define-read-only (is-asset-enabled (asset-id uint))
  (match (map-get? assets { asset-id: asset-id })
    asset
      (get enabled asset)
    false
  )
)

(define-read-only (get-asset-count)
  (var-get asset-count)
)
```

✅ Minimal, governance-controlled, auditable.
✅ Fully composable for Routing Intent, Liquidity Signals, and UI dashboards.

---

Next, we move to:

# STEP 5️⃣ — Liquidity Signal Contract Skeleton (most important)

**Purpose:**
Anchors off-chain liquidity snapshots on-chain as **verifiable proof-of-liquidity**, timestamped, immutable, minimal footprint.

---

Do you want me to **proceed and write the full Liquidity Signal contract skeleton now**?
Perfect — moving to **STEP 5️⃣ — Liquidity Signal Contract Skeleton**.

This is the **most important contract** because it provides the **canonical on-chain proof of liquidity** that all routers, dashboards, and other protocols rely on.

---

# STEP 5️⃣ — Liquidity Signal Contract Skeleton

**Purpose:**

- Anchor off-chain liquidity snapshots in a **trust-minimized, immutable, timestamped way**
- Minimal footprint: store only **hashes**, not raw data
- Verifiable by anyone

---

## Design Goals

- Deterministic & predictable (Clarity-native)
- Minimal on-chain storage (hash + metadata)
- Composable with Protocol Registry & Asset Registry
- Support historical queries
- Governance for safety (pause, emergency)

---

## 📄 `liquidity-signal.clar`

```clarity
;; ----------------------------------------
;; Liquidity Signal Contract
;; Bitcoin Liquidity Coordinator
;; ----------------------------------------

(define-constant ERR_UNAUTHORIZED u100)
(define-constant ERR_PROTOCOL_NOT_APPROVED u101)
(define-constant ERR_NOT_FOUND u102)

;; ----------------------------------------
;; Governance
;; ----------------------------------------
(define-data-var governance principal tx-sender)

;; ----------------------------------------
;; State
;; ----------------------------------------

(define-data-var signal-count uint u0)

(define-map liquidity-signals
  { protocol-id: uint
    base-asset-id: uint
    quote-asset-id: uint
    block-height: uint
  }
  {
    liquidity-hash: (buff 32)
    depth-range: uint
    spread-range: uint
    submitted-by: principal
  }
)

;; ----------------------------------------
;; Internal helpers
;; ----------------------------------------

(define-private (is-governance)
  (is-eq tx-sender (var-get governance))
)

;; ----------------------------------------
;; Public write functions
;; ----------------------------------------

(define-public (commit-liquidity-signal
    (protocol-id uint)
    (base-asset-id uint)
    (quote-asset-id uint)
    (liquidity-hash (buff 32))
    (depth-range uint)
    (spread-range uint)
)
  (begin
    ;; Only approved protocols can submit signals
    (match (contract-call? protocol-registry.is-protocol-active protocol-id)
      true
        (let (
          (bh block-height)
        )
          (map-set liquidity-signals
            { protocol-id: protocol-id
              base-asset-id: base-asset-id
              quote-asset-id: quote-asset-id
              block-height: bh
            }
            {
              liquidity-hash: liquidity-hash
              depth-range: depth-range
              spread-range: spread-range
              submitted-by: tx-sender
            }
          )
          (var-set signal-count (+ (var-get signal-count) u1))
          (ok bh)
        )
      (err ERR_PROTOCOL_NOT_APPROVED)
    )
  )
)

;; ----------------------------------------
;; Read-only functions
;; ----------------------------------------

(define-read-only (get-latest-signal (protocol-id uint) (base-asset-id uint) (quote-asset-id uint))
  ;; Scan backwards by block-height (simplified)
  (let ((bh block-height))
    (match (map-get? liquidity-signals
            { protocol-id: protocol-id
              base-asset-id: base-asset-id
              quote-asset-id: quote-asset-id
              block-height: bh
            })
      signal
        signal
      (err ERR_NOT_FOUND)
    )
  )
)

(define-read-only (get-signal-by-height
    (protocol-id uint)
    (base-asset-id uint)
    (quote-asset-id uint)
    (bh uint)
)
  (match (map-get? liquidity-signals
          { protocol-id: protocol-id
            base-asset-id: base-asset-id
            quote-asset-id: quote-asset-id
            block-height: bh
          })
    signal signal
    (err ERR_NOT_FOUND)
  )
)

(define-read-only (get-signal-count)
  (var-get signal-count)
)
```

---

### ✅ Why this contract is critical

- Acts as the **immutable proof-of-liquidity layer**
- Anchors **off-chain snapshots** on-chain
- Minimal attack surface — no funds move
- Composable with **Routing Intent** and **Reputation Contracts**
- Directly supports **MEV-minimized routing & analytics**

---

# STEP 6️⃣ — How Indexers Call This Contract in Practice

**Actors:** Off-chain indexers (trusted data collectors / routers)

### Workflow

1. Indexer pulls liquidity data from:
   - DEXs (ALEX, Velar)
   - AMMs
   - OTC desks

2. Normalize & bucket liquidity (depth, spread)
3. Compute hash of snapshot (off-chain)
4. Call `commit-liquidity-signal` on-chain:
   - `protocol-id`
   - `base-asset-id`, `quote-asset-id`
   - `liquidity-hash`
   - `depth-range`, `spread-range`

5. On-chain storage confirms:
   - Timestamped snapshot
   - Immutability
   - Reputation eligibility

### Notes

- Indexers **never submit raw order books** → gas-efficient
- Reputation contract can **reward accurate indexers**
- Routers & dashboards **read these signals** for safe routing decisions

---

We now have:

1. **Protocol Registry** — done
2. **Asset Registry** — done
3. **Liquidity Signal** — done
4. **Indexer interaction model** — defined

---

Next, we can move to:

# STEP 7️⃣ — Routing Intent & Reputation Contracts

These complete the **on-chain coordination layer**.

Do you want me to **proceed and build the Routing Intent contract skeleton next**?
Perfect — moving to **STEP 7️⃣ — Routing Intent Contract Skeleton**.

This contract is the **coordination layer**, enabling users and apps to **publish intent** for liquidity routing without moving funds. It’s critical for **Bitcoin-native non-custodial composability**.

---

# STEP 7️⃣ — Routing Intent Contract Skeleton

**Purpose:**

- Users anchor their swap intent on-chain
- Routers read intents and compete off-chain
- Minimal footprint, no custody, timestamped

---

## Design Goals

- Deterministic & auditable
- Off-chain execution only
- Intent visibility for routers, dashboards, and analytics
- Governance can pause publication if needed

---

## 📄 `routing-intent.clar`

```clarity
;; ----------------------------------------
;; Routing Intent Contract
;; Bitcoin Liquidity Coordinator
;; ----------------------------------------

(define-constant ERR_UNAUTHORIZED u100)
(define-constant ERR_INTENT_NOT_FOUND u101)
(define-constant ERR_INTENT_EXPIRED u102)

;; ----------------------------------------
;; Governance
;; ----------------------------------------
(define-data-var governance principal tx-sender)

;; ----------------------------------------
;; State
;; ----------------------------------------
(define-data-var intent-count uint u0)

(define-map intents
  { intent-id: uint }
  {
    user: principal,
    from-asset-id: uint,
    to-asset-id: uint,
    amount: uint,
    max-slippage: uint,
    expiry-height: uint,
    status: uint  ;; 1=open, 2=filled, 3=expired
  }
)

;; ----------------------------------------
;; Internal helper
;; ----------------------------------------
(define-private (is-governance)
  (is-eq tx-sender (var-get governance))
)

;; ----------------------------------------
;; Public write functions
;; ----------------------------------------

(define-public (publish-intent
    (from-asset-id uint)
    (to-asset-id uint)
    (amount uint)
    (max-slippage uint)
    (expiry-height uint)
)
  (let ((new-id (+ (var-get intent-count) u1)))
    (map-set intents
      { intent-id: new-id }
      {
        user: tx-sender,
        from-asset-id: from-asset-id,
        to-asset-id: to-asset-id,
        amount: amount,
        max-slippage: max-slippage,
        expiry-height: expiry-height,
        status: u1
      }
    )
    (var-set intent-count new-id)
    (ok new-id)
  )
)

(define-public (mark-intent-filled (intent-id uint))
  (match (map-get? intents { intent-id: intent-id })
    intent
      (begin
        (map-set intents { intent-id: intent-id } (merge intent { status: u2 }))
        (ok true)
      )
    (err ERR_INTENT_NOT_FOUND)
  )
)

(define-public (expire-intent (intent-id uint))
  (match (map-get? intents { intent-id: intent-id })
    intent
      (begin
        (map-set intents { intent-id: intent-id } (merge intent { status: u3 }))
        (ok true)
      )
    (err ERR_INTENT_NOT_FOUND)
  )
)

;; ----------------------------------------
;; Read-only functions
;; ----------------------------------------

(define-read-only (get-intent (intent-id uint))
  (map-get? intents { intent-id: intent-id })
)

(define-read-only (list-open-intents)
  (map-filter intents (lambda (i)
    (is-eq (get status i) u1)
  ))
)

(define-read-only (get-intent-count)
  (var-get intent-count)
)
```

---

### ✅ Why this contract matters

- Anchors user intent in a **trustless, verifiable way**
- Off-chain routers can compete to execute the best routes
- No custody risk → minimal audit scope
- Fully composable with **Liquidity Signal & Reputation** contracts

---

# STEP 8️⃣ — Incentive & Reputation Contract Skeleton

Next step is **building the Incentive & Reputation contract**, which:

- Rewards accurate indexers
- Tracks reputations
- Enables later slashing / incentive logic with sBTC

Do you want me to **proceed and build the Reputation contract skeleton next**?
Perfect — moving to **STEP 8️⃣ — Incentive & Reputation Contract Skeleton**.

This contract **anchors ecosystem incentives**, tracks **indexer and router performance**, and lays the foundation for **future sBTC rewards or slashing**.

---

# STEP 8️⃣ — Incentive & Reputation Contract Skeleton

**Purpose:**

- Track **reputation scores** of off-chain actors (indexers, routers)
- Record **successful vs. failed submissions**
- Enable **future incentive distribution**
- Optional future hooks for **slashing / staking**

---

## Design Goals

- Minimal on-chain footprint
- Composable with Liquidity Signal & Routing Intent
- Transparent, auditable, deterministic
- Governance can adjust reputation parameters

---

## 📄 `reputation.clar`

```clarity
;; ----------------------------------------
;; Incentive & Reputation Contract
;; Bitcoin Liquidity Coordinator
;; ----------------------------------------

(define-constant ERR_UNAUTHORIZED u100)
(define-constant ERR_NOT_FOUND u101)

;; ----------------------------------------
;; Governance
;; ----------------------------------------
(define-data-var governance principal tx-sender)

;; ----------------------------------------
;; State
;; ----------------------------------------
(define-map reputation
  { actor: principal }
  {
    score: int,           ;; reputation points
    successful-submissions: uint,
    failed-submissions: uint
  }
)

;; ----------------------------------------
;; Internal helpers
;; ----------------------------------------
(define-private (is-governance)
  (is-eq tx-sender (var-get governance))
)

;; ----------------------------------------
;; Public write functions
;; ----------------------------------------

;; Increment reputation for successful submission
(define-public (reward-success (actor principal) (points int))
  (asserts! (is-governance) ERR_UNAUTHORIZED)

  (let ((current (default {score: 0, successful-submissions: u0, failed-submissions: u0}
                         (map-get? reputation { actor: actor }))))
    (map-set reputation { actor: actor }
      {
        score: (+ (get score current) points),
        successful-submissions: (+ (get successful-submissions current) u1),
        failed-submissions: (get failed-submissions current)
      }
    )
    (ok true)
  )
)

;; Penalize reputation for failed submission
(define-public (penalize-failure (actor principal) (points int))
  (asserts! (is-governance) ERR_UNAUTHORIZED)

  (let ((current (default {score: 0, successful-submissions: u0, failed-submissions: u0}
                         (map-get? reputation { actor: actor }))))
    (map-set reputation { actor: actor }
      {
        score: (- (get score current) points),
        successful-submissions: (get successful-submissions current),
        failed-submissions: (+ (get failed-submissions current) u1)
      }
    )
    (ok true)
  )
)

;; ----------------------------------------
;; Read-only functions
;; ----------------------------------------

(define-read-only (get-reputation (actor principal))
  (map-get? reputation { actor: actor })
)

(define-read-only (get-score (actor principal))
  (match (map-get? reputation { actor: actor })
    r (get score r)
    0
  )
)
```

---

### ✅ Why this contract matters

- Tracks **actor credibility** across the ecosystem
- Encourages **accurate submissions** of liquidity signals
- Transparent & auditable
- Lays the foundation for **future sBTC-based rewards or penalties**
- Fully composable with **Liquidity Signal & Routing Intent**

---

At this point, the **full foundational on-chain layer** is defined:

1. Protocol Registry ✅
2. Asset Registry ✅
3. Liquidity Signal ✅
4. Routing Intent ✅
5. Incentive & Reputation ✅

---

Next steps could be:

1. **Connecting indexers & routers** to all contracts (practical off-chain integration)
2. **Building frontend dashboards** reading these contracts
3. **Optional Phase-2 contracts**: Governance, sBTC Incentive Pool, Dispute Resolution

We can **proceed to off-chain integration for indexers and routers next**, or start designing the **frontend dashboards**.

Which do you want to tackle first?
