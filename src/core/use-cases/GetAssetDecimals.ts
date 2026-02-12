// Use case for retrieving asset decimals
import { Asset } from "../value-objects/Asset";

export class GetAssetDecimals {
  constructor(private asset: Asset) {}

  getDecimals(): number {
    return this.asset.decimals;
  }
}
