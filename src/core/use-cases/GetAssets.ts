// Use case for retrieving assets
import { AssetRegistry } from "../ports/AssetRegistry";
import { Asset } from "../value-objects/Asset";

export class GetAssets {
  constructor(private assetRegistry: AssetRegistry) {}

  async execute(): Promise<Asset[]> {
    return await this.assetRegistry.getAssets();
  }
}
