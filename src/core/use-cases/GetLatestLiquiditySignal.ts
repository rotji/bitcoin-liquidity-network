// Use case for retrieving latest liquidity signal
import { LiquiditySignal } from "../ports/LiquiditySignal";
import { LiquiditySnapshot } from "../entities/LiquiditySnapshot";

export class GetLatestLiquiditySignal {
  constructor(private liquiditySignal: LiquiditySignal) {}

  async execute(poolId: string): Promise<LiquiditySnapshot | null> {
    return await this.liquiditySignal.getLatestSignal(poolId);
  }
}
