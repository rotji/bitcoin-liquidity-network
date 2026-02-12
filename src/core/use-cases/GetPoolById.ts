// Use case for retrieving pool by ID
import { DEXAdapter } from "../ports/DEXAdapter";
import { Pool } from "../entities/Pool";

export class GetPoolById {
  constructor(private dexAdapter: DEXAdapter) {}

  async execute(id: string): Promise<Pool | null> {
    const pools = await this.dexAdapter.getPools();
    return pools.find((pool) => pool.id === id) || null;
  }
}
