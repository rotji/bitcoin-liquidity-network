// Use case for retrieving pool ID
import { Pool } from "../entities/Pool";

export class GetPoolId {
  constructor(private pool: Pool) {}

  getId(): string {
    return this.pool.id;
  }
}
