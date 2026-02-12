// Domain entity representing a liquidity pool
export class Pool {
  constructor(
    public id: string,
    public protocolId: string,
    public tokenA: string,
    public tokenB: string,
    public reserveA: number,
    public reserveB: number,
    public fee: number,
    public lastUpdated: Date,
  ) {}
}
