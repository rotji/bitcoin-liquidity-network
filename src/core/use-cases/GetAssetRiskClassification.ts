// Use case for retrieving asset risk classification
import { Asset } from "../value-objects/Asset";

export class GetAssetRiskClassification {
  constructor(private asset: Asset) {}

  getRiskClassification(): string {
    return this.asset.riskClassification;
  }
}
