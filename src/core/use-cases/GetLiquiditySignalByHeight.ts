// Use case for retrieving liquidity signal by block height
import { LiquiditySignal } from "../ports/LiquiditySignal";
import { LiquiditySnapshot } from "../entities/LiquiditySnapshot";

export class GetLiquiditySignalByHeight {
  constructor(private liquiditySignal: LiquiditySignal) {}

  async execute(
    poolId: string,
    height: number,
  ): Promise<LiquiditySnapshot | null> {
    return await this.liquiditySignal.getSignalByHeight(poolId, height);
  }
}
