// Use case for committing liquidity signals
import { LiquiditySignal } from "../ports/LiquiditySignal";
import { LiquiditySnapshot } from "../entities/LiquiditySnapshot";

export class CommitLiquiditySignal {
  constructor(private liquiditySignal: LiquiditySignal) {}

  async execute(snapshot: LiquiditySnapshot): Promise<void> {
    await this.liquiditySignal.commitLiquiditySignal(snapshot);
  }
}
