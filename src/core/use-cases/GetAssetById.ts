// Use case for retrieving asset by ID
import { AssetRegistry } from "../ports/AssetRegistry";
import { Asset } from "../value-objects/Asset";

export class GetAssetById {
  constructor(private assetRegistry: AssetRegistry) {}

  async execute(id: string): Promise<Asset | null> {
    return await this.assetRegistry.getAssetById(id);
  }
}
