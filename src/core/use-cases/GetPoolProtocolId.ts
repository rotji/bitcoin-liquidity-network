// Use case for retrieving pool protocol ID
import { Pool } from "../entities/Pool";

export class GetPoolProtocolId {
  constructor(private pool: Pool) {}

  getProtocolId(): string {
    return this.pool.protocolId;
  }
}
