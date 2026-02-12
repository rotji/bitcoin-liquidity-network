// Domain entity representing a snapshot of liquidity
export class LiquiditySnapshot {
  constructor(
    public poolId: string,
    public blockHeight: number,
    public price: number,
    public depth: number,
  ) {}
}
