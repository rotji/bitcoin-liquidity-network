// Use case for retrieving asset type
import { Asset } from "../value-objects/Asset";

export class GetAssetType {
  constructor(private asset: Asset) {}

  getType(): string {
    return this.asset.type;
  }
}
