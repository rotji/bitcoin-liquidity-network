// Use case for retrieving pool reserveB
import { Pool } from "../entities/Pool";

export class GetPoolReserveB {
  constructor(private pool: Pool) {}

  getReserveB(): number {
    return this.pool.reserveB;
  }
}
