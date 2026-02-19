import { describe, it, expect, jest } from '@jest/globals';
import { GetLiquiditySnapshots } from '../../src/core/use-cases/GetLiquiditySnapshots';
import type { DEXAdapter } from '../../src/core/ports/DEXAdapter';
import type { LiquiditySnapshot } from '../../src/core/entities/LiquiditySnapshot';
import type { Pool } from '../../src/core/entities/Pool';

describe('GetLiquiditySnapshots', () => {
  it('should fetch liquidity snapshots for all pools', async () => {
    const mockPools: Pool[] = [
      new (class PoolMock implements Pool {
        id = 'pool-1';
        protocolId = 'proto-1';
        tokenA = 'BTC';
        tokenB = 'ETH';
        reserveA = 100;
        reserveB = 200;
        fee = 0.003;
        lastUpdated = new Date();
      })(),
      new (class PoolMock implements Pool {
        id = 'pool-2';
        protocolId = 'proto-2';
        tokenA = 'ETH';
        tokenB = 'USDT';
        reserveA = 300;
        reserveB = 400;
        fee = 0.002;
        lastUpdated = new Date();
      })(),
    ];
    const mockGetPools = jest.fn(() => Promise.resolve(mockPools)) as () => Promise<Pool[]>;
    const mockGetReserves = jest.fn((pool: Pool) => Promise.resolve({ reserveA: pool.reserveA, reserveB: pool.reserveB })) as (pool: Pool) => Promise<{ reserveA: number; reserveB: number }>;
    const mockDEXAdapter: DEXAdapter = {
      getPools: mockGetPools,
      getReserves: mockGetReserves,
      getFee: jest.fn((_: Pool) => Promise.resolve(0)) as (pool: Pool) => Promise<number>,
    };
    const getLiquiditySnapshots = new GetLiquiditySnapshots(mockDEXAdapter);
    const snapshots = await getLiquiditySnapshots.execute();
    expect(snapshots.length).toBe(2);
    expect(mockGetPools).toHaveBeenCalled();
    expect(mockGetReserves).toHaveBeenCalledTimes(2);
    expect(snapshots[0].poolId).toBe('pool-1');
    expect(snapshots[1].poolId).toBe('pool-2');
  });
});
