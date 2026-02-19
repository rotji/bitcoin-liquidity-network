import { describe, it, expect, jest } from '@jest/globals';
import { GetPools } from '../../src/core/use-cases/GetPools';
import type { DEXAdapter } from '../../src/core/ports/DEXAdapter';
import type { Pool } from '../../src/core/entities/Pool';

describe('GetPools', () => {
  it('should fetch pools using the port', async () => {
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
    const mockDEXAdapter: DEXAdapter = {
      getPools: mockGetPools,
      getReserves: jest.fn((_: Pool) => Promise.resolve({ reserveA: 0, reserveB: 0 })) as (pool: Pool) => Promise<{ reserveA: number; reserveB: number }>,
      getFee: jest.fn((_: Pool) => Promise.resolve(0)) as (pool: Pool) => Promise<number>,
    };
    const getPools = new GetPools(mockDEXAdapter);
    const pools = await getPools.execute();
    expect(pools).toEqual(mockPools);
    expect(mockGetPools).toHaveBeenCalled();
  });
});
