// Use case for retrieving pool metadata
import { Pool } from "../entities/Pool";

export class GetPoolMetadata {
  constructor(private pool: Pool) {}

  getMetadata(): object {
    return {
      id: this.pool.id,
      protocolId: this.pool.protocolId,
      tokenA: this.pool.tokenA,
      tokenB: this.pool.tokenB,
      fee: this.pool.fee,
      lastUpdated: this.pool.lastUpdated,
    };
  }
}
