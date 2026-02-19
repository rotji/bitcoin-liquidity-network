import { describe, it, expect, jest } from '@jest/globals';
import { CreateUser } from '../../src/core/use-cases/CreateUser';
import { GetAssetById } from '../../src/core/use-cases/GetAssetById';
import type { AssetRegistry } from '../../src/core/ports/AssetRegistry';
import type { Asset } from '../../src/core/value-objects/Asset';

// Simulate API router
async function apiRouter(route: string, req: any, assetRegistry?: AssetRegistry): Promise<any> {
  if (route === '/user/create') {
    if (!req.id) return { status: 400, error: 'Missing user id' };
    const createUser = new CreateUser();
    const user = createUser.execute(req.id);
    return { status: 201, data: { id: user.id, reputation: user.reputationScore } };
  }
  if (route === '/asset/get') {
    if (!req.id) return { status: 400, error: 'Missing asset id' };
    if (!assetRegistry) return { status: 500, error: 'Asset registry unavailable' };
    const asset = await assetRegistry.getAssetById(req.id);
    return asset ? { status: 200, data: asset } : { status: 404, error: 'Asset not found' };
  }
  return { status: 404, error: 'Route not found' };
}

describe('API Endpoint Advanced', () => {
  it('should create a user and return 201', async () => {
    const response = await apiRouter('/user/create', { id: 'user-1' });
    expect(response.status).toBe(201);
    expect(response.data).toEqual({ id: 'user-1', reputation: 0 });
  });

  it('should return 400 for missing user id', async () => {
    const response = await apiRouter('/user/create', {});
    expect(response.status).toBe(400);
    expect(response.error).toBe('Missing user id');
  });

  it('should fetch asset and return 200', async () => {
    const mockAsset: Asset = {
      id: 'BTC',
      type: 'BTC',
      decimals: 8,
      riskClassification: 'low',
      enabled: true,
    } as Asset;
    const mockAssetRegistry: AssetRegistry = {
      getAssets: jest.fn(() => Promise.resolve([mockAsset])),
      getAssetById: jest.fn((id: string) => Promise.resolve(id === 'BTC' ? mockAsset : null)),
    };
    const response = await apiRouter('/asset/get', { id: 'BTC' }, mockAssetRegistry);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockAsset);
  });

  it('should return 404 for missing asset', async () => {
    const mockAssetRegistry: AssetRegistry = {
      getAssets: jest.fn(() => Promise.resolve([])),
      getAssetById: jest.fn(() => Promise.resolve(null)),
    };
    const response = await apiRouter('/asset/get', { id: 'ETH' }, mockAssetRegistry);
    expect(response.status).toBe(404);
    expect(response.error).toBe('Asset not found');
  });

  it('should return 500 if asset registry unavailable', async () => {
    const response = await apiRouter('/asset/get', { id: 'BTC' });
    expect(response.status).toBe(500);
    expect(response.error).toBe('Asset registry unavailable');
  });

  it('should return 404 for unknown route', async () => {
    const response = await apiRouter('/unknown', {});
    expect(response.status).toBe(404);
    expect(response.error).toBe('Route not found');
  });
});
