import { describe, it, expect, jest } from '@jest/globals';
import { GetAssetById } from '../../src/core/use-cases/GetAssetById';
import type { AssetRegistry } from '../../src/core/ports/AssetRegistry';
import type { Asset } from '../../src/core/value-objects/Asset';

describe('GetAssetById', () => {
  it('should fetch asset by id using the port', async () => {
    const mockAsset: Asset = new (class AssetMock implements Asset {
      id = 'BTC';
      type: 'BTC' = 'BTC';
      decimals = 8;
      riskClassification = 'low';
      enabled = true;
    })();
    const mockGetAssetById = jest.fn((id: string) => Promise.resolve(id === 'BTC' ? mockAsset : null)) as (id: string) => Promise<Asset | null>;
    const mockAssetRegistry: AssetRegistry = {
      getAssets: jest.fn(() => Promise.resolve([mockAsset])) as () => Promise<Asset[]>,
      getAssetById: mockGetAssetById,
    };
    const getAssetById = new GetAssetById(mockAssetRegistry);
    const asset = await getAssetById.execute('BTC');
    expect(asset).toEqual(mockAsset);
    expect(mockGetAssetById).toHaveBeenCalledWith('BTC');
  });

  it('should return null if asset not found', async () => {
    const mockGetAssetById = jest.fn(() => Promise.resolve(null)) as (id: string) => Promise<Asset | null>;
    const mockAssetRegistry: AssetRegistry = {
      getAssets: jest.fn(() => Promise.resolve([])) as () => Promise<Asset[]>,
      getAssetById: mockGetAssetById,
    };
    const getAssetById = new GetAssetById(mockAssetRegistry);
    const asset = await getAssetById.execute('ETH');
    expect(asset).toBeNull();
    expect(mockGetAssetById).toHaveBeenCalledWith('ETH');
  });
});
