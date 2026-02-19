import { describe, it, expect } from '@jest/globals';
import { RouteSwap } from '../../src/core/use-cases/RouteSwap';
import { Pool } from '../../src/core/entities/Pool';

describe('RouteSwap', () => {
  it('should find the best pool for a swap', () => {
    const pools = [
      new Pool('pool-1', 'proto-1', 'BTC', 'ETH', 100, 200, 0.003, new Date()),
      new Pool('pool-2', 'proto-2', 'ETH', 'USDT', 300, 400, 0.002, new Date()),
    ];
    const routeSwap = new RouteSwap(pools);
    const bestPool = routeSwap.findBestPool('BTC', 'ETH');
    expect(bestPool).not.toBeNull();
    expect(bestPool?.id).toBe('pool-1');
  });

  it('should return null if no pool matches', () => {
    const pools = [
      new Pool('pool-1', 'proto-1', 'BTC', 'ETH', 100, 200, 0.003, new Date()),
    ];
    const routeSwap = new RouteSwap(pools);
    const bestPool = routeSwap.findBestPool('ETH', 'BTC');
    expect(bestPool).toBeNull();
  });
});
