import { describe, it, expect, jest } from '@jest/globals';
import { GetLiquiditySignalByHeight } from '../../src/core/use-cases/GetLiquiditySignalByHeight';
import type { LiquiditySignal } from '../../src/core/ports/LiquiditySignal';
import { LiquiditySnapshot } from '../../src/core/entities/LiquiditySnapshot';

describe('GetLiquiditySignalByHeight', () => {
  it('should fetch liquidity signal by poolId and height', async () => {
    const mockSnapshot: LiquiditySnapshot = new LiquiditySnapshot('pool-1', 123, 1.5, 300);
    const mockGetSignalByHeight = jest.fn((poolId: string, height: number) => Promise.resolve((poolId === 'pool-1' && height === 123) ? mockSnapshot : null)) as (poolId: string, height: number) => Promise<LiquiditySnapshot | null>;
    const mockCommit = jest.fn((_: LiquiditySnapshot) => Promise.resolve()) as (snapshot: LiquiditySnapshot) => Promise<void>;
    const mockGetLatestSignal = jest.fn((_: string) => Promise.resolve(null)) as (poolId: string) => Promise<LiquiditySnapshot | null>;
    const mockLiquiditySignal: LiquiditySignal = {
      commitLiquiditySignal: mockCommit,
      getLatestSignal: mockGetLatestSignal,
      getSignalByHeight: mockGetSignalByHeight,
    };
    const getLiquiditySignalByHeight = new GetLiquiditySignalByHeight(mockLiquiditySignal);
    const snapshot = await getLiquiditySignalByHeight.execute('pool-1', 123);
    expect(snapshot).toEqual(mockSnapshot);
    expect(mockGetSignalByHeight).toHaveBeenCalledWith('pool-1', 123);
  });

  it('should return null if no signal found', async () => {
    const mockGetSignalByHeight = jest.fn(() => Promise.resolve(null)) as (poolId: string, height: number) => Promise<LiquiditySnapshot | null>;
    const mockCommit = jest.fn((_: LiquiditySnapshot) => Promise.resolve()) as (snapshot: LiquiditySnapshot) => Promise<void>;
    const mockGetLatestSignal = jest.fn((_: string) => Promise.resolve(null)) as (poolId: string) => Promise<LiquiditySnapshot | null>;
    const mockLiquiditySignal: LiquiditySignal = {
      commitLiquiditySignal: mockCommit,
      getLatestSignal: mockGetLatestSignal,
      getSignalByHeight: mockGetSignalByHeight,
    };
    const getLiquiditySignalByHeight = new GetLiquiditySignalByHeight(mockLiquiditySignal);
    const snapshot = await getLiquiditySignalByHeight.execute('pool-2', 456);
    expect(snapshot).toBeNull();
    expect(mockGetSignalByHeight).toHaveBeenCalledWith('pool-2', 456);
  });
});
