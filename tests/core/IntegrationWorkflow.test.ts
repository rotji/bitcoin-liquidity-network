import { describe, it, expect, jest } from '@jest/globals';
import { IndexLiquidity } from '../../src/core/use-cases/IndexLiquidity';
import { RouteSwap } from '../../src/core/use-cases/RouteSwap';
import { BuildTransaction } from '../../src/core/use-cases/BuildTransaction';
import { Pool } from '../../src/core/entities/Pool';

describe('Integration: index liquidity → route swap → build transaction', () => {
  it('should index pools, find best route, and build transaction payload', () => {
    // Mock pools
    const pools = [
      new Pool('pool-1', 'proto-1', 'BTC', 'ETH', 100, 200, 0.003, new Date()),
      new Pool('pool-2', 'proto-2', 'ETH', 'USDT', 300, 400, 0.002, new Date()),
    ];
    // Index liquidity (mocked)
    // Normally IndexLiquidity would use a DEXAdapter, here we just use pools
    // Route swap
    const routeSwap = new RouteSwap(pools);
    const bestPool = routeSwap.findBestPool('BTC', 'ETH');
    expect(bestPool).not.toBeNull();
    expect(bestPool?.id).toBe('pool-1');
    // Build transaction
    const buildTransaction = new BuildTransaction(bestPool!);
    const payload = buildTransaction.buildPayload(10, 20);
    expect(payload).toEqual({
      poolId: 'pool-1',
      amountA: 10,
      amountB: 20,
      fee: 0.003,
    });
  });
});
