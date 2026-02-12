// Interface for liquidity signal adapter
import { LiquiditySnapshot } from "../entities/LiquiditySnapshot";

export interface LiquiditySignal {
  commitLiquiditySignal(snapshot: LiquiditySnapshot): Promise<void>;
  getLatestSignal(poolId: string): Promise<LiquiditySnapshot | null>;
  getSignalByHeight(
    poolId: string,
    height: number,
  ): Promise<LiquiditySnapshot | null>;
}
