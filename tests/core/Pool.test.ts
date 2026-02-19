import { describe, it, expect } from '@jest/globals';
import { Pool } from '../../src/core/entities/Pool';

describe('Pool', () => {
  it('should create a valid pool', () => {
    const now = new Date();
    const pool = new Pool('pool-1', 'protocol-1', 'BTC', 'ETH', 100, 200, 0.003, now);
    expect(pool.id).toBe('pool-1');
    expect(pool.protocolId).toBe('protocol-1');
    expect(pool.tokenA).toBe('BTC');
    expect(pool.tokenB).toBe('ETH');
    expect(pool.reserveA).toBe(100);
    expect(pool.reserveB).toBe(200);
    expect(pool.fee).toBe(0.003);
    expect(pool.lastUpdated).toBe(now);
  });
  // Add more tests for property updates as needed
});
