// Use case for retrieving pool reserveA
import { Pool } from "../entities/Pool";

export class GetPoolReserveA {
  constructor(private pool: Pool) {}

  getReserveA(): number {
    return this.pool.reserveA;
  }
}
