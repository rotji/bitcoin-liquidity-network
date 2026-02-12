// Use case for retrieving asset enabled status
import { Asset } from "../value-objects/Asset";

export class GetAssetEnabled {
  constructor(private asset: Asset) {}

  isEnabled(): boolean {
    return this.asset.enabled;
  }
}
