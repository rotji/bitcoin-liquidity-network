// Value object representing an asset
export class Asset {
  constructor(
    public id: string,
    public type: "BTC" | "sBTC" | "wrapped",
    public decimals: number,
    public riskClassification: string,
    public enabled: boolean,
  ) {}
}
