# All Tests Plan for Bitcoin Liquidity Coordination Layer (BLCL)

This document lists all the tests needed for the current stack-agnostic foundation and as described in the project documentation.

---

## 1. Core Entities & Value Objects

- [ ] Asset: creation, validation, enable/disable
- [ ] Pool: creation, property updates
- [ ] Protocol: creation, status changes
- [ ] LiquiditySnapshot: creation, property checks
- [ ] User: creation, reputation score updates

## 2. Use Cases (Business Logic)

- [ ] IndexLiquidity: indexes pools, calculates price/depth
- [ ] RouteSwap: finds best pool for swap
- [ ] BuildTransaction: builds correct payloads
- [ ] QuoteLiquidity: returns correct quote for input
- [ ] CommitLiquiditySignal: commits and retrieves signals
- [ ] PublishRoutingIntent: publishes and retrieves intents
- [ ] UpdateReputation: updates and retrieves user reputation
- [ ] GetAssets, GetAssetById: fetches assets, handles missing
- [ ] GetProtocols, GetProtocolById: fetches protocols, handles missing
- [ ] GetPools, GetPoolById: fetches pools, handles missing
- [ ] GetLiquiditySnapshots, GetLiquiditySignalByHeight: fetches snapshots, handles missing
- [ ] User management: create, update, delete, list, find by id

## 3. Ports/Interfaces

- [ ] DEXAdapter: correct interface, mock implementations
- [ ] AssetRegistry: correct interface, mock implementations
- [ ] ProtocolRegistry: correct interface, mock implementations
- [ ] LiquiditySignal: correct interface, mock implementations
- [ ] RoutingIntent: correct interface, mock implementations
- [ ] Reputation: correct interface, mock implementations

## 4. Adapters (when implemented)

- [ ] Database adapters: CRUD, error handling
- [ ] External service adapters: API integration, error handling

## 5. Backend API (when implemented)

- [ ] API endpoints: request/response, validation, error handling
- [ ] Integration: endpoints call correct use cases

## 6. Integration & End-to-End (later phases)

- [ ] Full workflow: index liquidity → route swap → build transaction
- [ ] User flows: create user → update reputation → publish intent
- [ ] Error and edge cases: invalid input, missing data, adapter failures

---

## How to Use This Plan

- Check off each test as you implement and pass it.
- Add new tests as features and requirements evolve.
- Use this as a living checklist for robust, professional coverage.
