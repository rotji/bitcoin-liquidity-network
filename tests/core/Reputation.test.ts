import { describe, it, expect, jest } from '@jest/globals';
import type { Reputation } from '../../src/core/ports/Reputation';

describe('Reputation interface', () => {
  it('should allow mocking all required methods', async () => {
    const mockReputation: Reputation = {
      updateScore: jest.fn((userId: string, score: number) => Promise.resolve()),
      getScore: jest.fn((userId: string) => Promise.resolve(userId === 'user-1' ? 42 : 0)),
    };
    await mockReputation.updateScore('user-1', 42);
    const score = await mockReputation.getScore('user-1');
    expect(score).toBe(42);
    const missingScore = await mockReputation.getScore('user-2');
    expect(missingScore).toBe(0);
  });
});
