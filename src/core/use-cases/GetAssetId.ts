// Use case for retrieving asset ID
import { Asset } from "../value-objects/Asset";

export class GetAssetId {
  constructor(private asset: Asset) {}

  getId(): string {
    return this.asset.id;
  }
}
