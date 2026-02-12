// Use case for retrieving liquidity snapshots
import { DEXAdapter } from "../ports/DEXAdapter";
import { LiquiditySnapshot } from "../entities/LiquiditySnapshot";

export class GetLiquiditySnapshots {
  constructor(private dexAdapter: DEXAdapter) {}

  async execute(): Promise<LiquiditySnapshot[]> {
    // Example: index liquidity
    const pools = await this.dexAdapter.getPools();
    const snapshots: LiquiditySnapshot[] = [];
    for (const pool of pools) {
      const reserves = await this.dexAdapter.getReserves(pool);
      const price = reserves.reserveA / reserves.reserveB;
      const depth = reserves.reserveA + reserves.reserveB;
      snapshots.push(new LiquiditySnapshot(pool.id, 0, price, depth));
    }
    return snapshots;
  }
}
