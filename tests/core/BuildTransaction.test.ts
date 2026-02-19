import { describe, it, expect } from '@jest/globals';
import { BuildTransaction } from '../../src/core/use-cases/BuildTransaction';
import { Pool } from '../../src/core/entities/Pool';

describe('BuildTransaction', () => {
  it('should build a correct transaction payload', () => {
    const pool = new Pool('pool-1', 'proto-1', 'BTC', 'ETH', 100, 200, 0.003, new Date());
    const buildTransaction = new BuildTransaction(pool);
    const payload = buildTransaction.buildPayload(10, 20);
    expect(payload).toEqual({
      poolId: 'pool-1',
      amountA: 10,
      amountB: 20,
      fee: 0.003,
    });
  });
});
