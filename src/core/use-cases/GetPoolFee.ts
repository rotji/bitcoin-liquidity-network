// Use case for retrieving pool fee
import { Pool } from "../entities/Pool";

export class GetPoolFee {
  constructor(private pool: Pool) {}

  getFee(): number {
    return this.pool.fee;
  }
}
