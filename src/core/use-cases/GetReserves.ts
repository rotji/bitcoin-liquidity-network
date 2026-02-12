// Use case for retrieving pool reserves
import { DEXAdapter } from "../ports/DEXAdapter";
import { Pool } from "../entities/Pool";

export class GetReserves {
  constructor(private dexAdapter: DEXAdapter) {}

  async execute(pool: Pool): Promise<{ reserveA: number; reserveB: number }> {
    return await this.dexAdapter.getReserves(pool);
  }
}
