// Use case for indexing liquidity across protocols
import { DEXAdapter } from "../ports/DEXAdapter";
import { LiquiditySnapshot } from "../entities/LiquiditySnapshot";

export class IndexLiquidity {
  constructor(private adapter: DEXAdapter) {}

  async execute(): Promise<LiquiditySnapshot[]> {
    const pools = await this.adapter.getPools();
    const snapshots: LiquiditySnapshot[] = [];
    for (const pool of pools) {
      const reserves = await this.adapter.getReserves(pool);
      // const fee = await this.adapter.getFee(pool); // Removed unused variable to fix lint error
      // Example: price and depth calculation (to be refined)
      const price = reserves.reserveA / reserves.reserveB;
      const depth = reserves.reserveA + reserves.reserveB;
      snapshots.push(new LiquiditySnapshot(pool.id, 0, price, depth));
    }
    return snapshots;
  }
}
