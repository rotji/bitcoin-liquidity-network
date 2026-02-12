// Use case for retrieving pool tokens
import { Pool } from "../entities/Pool";

export class GetPoolTokens {
  constructor(private pool: Pool) {}

  getTokens(): { tokenA: string; tokenB: string } {
    return {
      tokenA: this.pool.tokenA,
      tokenB: this.pool.tokenB,
    };
  }
}
