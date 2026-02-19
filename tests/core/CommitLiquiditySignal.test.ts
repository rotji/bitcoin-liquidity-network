import { describe, it, expect, jest } from '@jest/globals';
import { CommitLiquiditySignal } from '../../src/core/use-cases/CommitLiquiditySignal';
import { LiquiditySnapshot } from '../../src/core/entities/LiquiditySnapshot';
import type { LiquiditySignal } from '../../src/core/ports/LiquiditySignal';

describe('CommitLiquiditySignal', () => {
  it('should commit a liquidity signal using the port', async () => {
    const mockCommit = jest.fn((_: any) => Promise.resolve()) as (snapshot: LiquiditySnapshot) => Promise<void>;
    const mockGetLatestSignal = jest.fn((_: string) => Promise.resolve(null)) as (poolId: string) => Promise<LiquiditySnapshot | null>;
    const mockGetSignalByHeight = jest.fn((_: string, __: number) => Promise.resolve(null)) as (poolId: string, height: number) => Promise<LiquiditySnapshot | null>;
    const mockLiquiditySignal: LiquiditySignal = {
      commitLiquiditySignal: mockCommit,
      getLatestSignal: mockGetLatestSignal,
      getSignalByHeight: mockGetSignalByHeight,
    };
    // Use a number for the last argument (e.g., block height or timestamp)
    const snapshot = new LiquiditySnapshot('pool-1', 100, 200, 123456);
    const commitLiquiditySignal = new CommitLiquiditySignal(mockLiquiditySignal);
    await commitLiquiditySignal.execute(snapshot);
    expect(mockCommit).toHaveBeenCalledWith(snapshot);
  });
});
