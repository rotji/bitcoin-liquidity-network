// Use case for routing swaps across pools
import { Pool } from "../entities/Pool";

export class RouteSwap {
  constructor(private pools: Pool[]) {}

  // Example: Find best pool for swap (to be refined)
  findBestPool(tokenA: string, tokenB: string): Pool | null {
    return (
      this.pools.find(
        (pool) => pool.tokenA === tokenA && pool.tokenB === tokenB,
      ) || null
    );
  }
}
