// Use case for retrieving pool last updated timestamp
import { Pool } from "../entities/Pool";

export class GetPoolLastUpdated {
  constructor(private pool: Pool) {}

  getLastUpdated(): Date {
    return this.pool.lastUpdated;
  }
}
