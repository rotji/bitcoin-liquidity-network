// Use case for building transaction payloads
import { Pool } from "../entities/Pool";

export class BuildTransaction {
  constructor(private pool: Pool) {}

  buildPayload(amountA: number, amountB: number): object {
    // Example payload structure (to be refined)
    return {
      poolId: this.pool.id,
      amountA,
      amountB,
      fee: this.pool.fee,
    };
  }
}
