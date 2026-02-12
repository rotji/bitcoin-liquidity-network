// Use case for retrieving pool fee
import { DEXAdapter } from "../ports/DEXAdapter";
import { Pool } from "../entities/Pool";

export class GetFee {
  constructor(private dexAdapter: DEXAdapter) {}

  async execute(pool: Pool): Promise<number> {
    return await this.dexAdapter.getFee(pool);
  }
}
