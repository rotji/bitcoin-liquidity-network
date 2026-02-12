// Domain entity representing a liquidity protocol
export class Protocol {
  constructor(
    public id: string,
    public name: string,
    public routerContract: string,
    public type: "DEX" | "CEX-bridge" | "OTC" | "AMM",
    public status: "active" | "deprecated",
    public metadataHash?: string,
  ) {}
}
