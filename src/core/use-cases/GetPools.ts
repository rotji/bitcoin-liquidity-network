// Use case for retrieving pools
import { DEXAdapter } from "../ports/DEXAdapter";
import { Pool } from "../entities/Pool";

export class GetPools {
  constructor(private dexAdapter: DEXAdapter) {}

  async execute(): Promise<Pool[]> {
    return await this.dexAdapter.getPools();
  }
}
