// Interface for asset registry adapter
import { Asset } from "../value-objects/Asset";

export interface AssetRegistry {
  getAssets(): Promise<Asset[]>;
  getAssetById(id: string): Promise<Asset | null>;
}
