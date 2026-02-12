// Use case for quoting liquidity
import { Pool } from "../entities/Pool";

export class QuoteLiquidity {
  constructor(private pool: Pool) {}

  quote(amountA: number): number {
    // Example: simple quote logic (to be refined)
    return amountA * (this.pool.reserveB / this.pool.reserveA);
  }
}
