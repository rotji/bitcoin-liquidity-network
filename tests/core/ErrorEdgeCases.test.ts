import { describe, it, expect, jest } from '@jest/globals';
import { GetAssetById } from '../../src/core/use-cases/GetAssetById';
import { GetPoolById } from '../../src/core/use-cases/GetPoolById';
import type { AssetRegistry } from '../../src/core/ports/AssetRegistry';
import type { DEXAdapter } from '../../src/core/ports/DEXAdapter';
import type { Asset } from '../../src/core/value-objects/Asset';
import type { Pool } from '../../src/core/entities/Pool';

describe('Integration: error and edge cases', () => {
  it('should return null for missing asset', async () => {
    const mockAssetRegistry: AssetRegistry = {
      getAssets: jest.fn(() => Promise.resolve([])),
      getAssetById: jest.fn(() => Promise.resolve(null)),
    };
    const getAssetById = new GetAssetById(mockAssetRegistry);
    const asset = await getAssetById.execute('NON_EXISTENT');
    expect(asset).toBeNull();
  });

  it('should return null for missing pool', async () => {
    const mockDEXAdapter: DEXAdapter = {
      getPools: jest.fn(() => Promise.resolve([])),
      getReserves: jest.fn((_: Pool) => Promise.resolve({ reserveA: 0, reserveB: 0 })),
      getFee: jest.fn((_: Pool) => Promise.resolve(0)),
    };
    const getPoolById = new GetPoolById(mockDEXAdapter);
    const pool = await getPoolById.execute('NON_EXISTENT');
    expect(pool).toBeNull();
  });

  it('should handle adapter failure gracefully', async () => {
    const mockAssetRegistry: AssetRegistry = {
      getAssets: jest.fn(() => Promise.reject(new Error('Adapter failure'))),
      getAssetById: jest.fn(() => Promise.reject(new Error('Adapter failure'))),
    };
    const getAssetById = new GetAssetById(mockAssetRegistry);
    await expect(getAssetById.execute('BTC')).rejects.toThrow('Adapter failure');
  });
});
