import { describe, it, expect, jest } from '@jest/globals';
import type { DEXAdapter } from '../../src/core/ports/DEXAdapter';
import type { Pool } from '../../src/core/entities/Pool';

describe('DEXAdapter interface', () => {
  it('should allow mocking all required methods', async () => {
    const mockPool: Pool = {
      id: 'pool-1',
      protocolId: 'proto-1',
      tokenA: 'BTC',
      tokenB: 'ETH',
      reserveA: 100,
      reserveB: 200,
      fee: 0.003,
      lastUpdated: new Date(),
    } as Pool;
    const mockDEXAdapter: DEXAdapter = {
      getPools: jest.fn(() => Promise.resolve([mockPool])),
      getReserves: jest.fn((pool: Pool) => Promise.resolve({ reserveA: pool.reserveA, reserveB: pool.reserveB })),
      getFee: jest.fn((pool: Pool) => Promise.resolve(pool.fee)),
    };
    const pools = await mockDEXAdapter.getPools();
    expect(pools[0]).toEqual(mockPool);
    const reserves = await mockDEXAdapter.getReserves(mockPool);
    expect(reserves).toEqual({ reserveA: 100, reserveB: 200 });
    const fee = await mockDEXAdapter.getFee(mockPool);
    expect(fee).toBe(0.003);
  });
});
