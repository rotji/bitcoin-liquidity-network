import { describe, it, expect, jest } from '@jest/globals';
import { CreateUser } from '../../src/core/use-cases/CreateUser';
import { UpdateReputation } from '../../src/core/use-cases/UpdateReputation';
import { PublishRoutingIntent } from '../../src/core/use-cases/PublishRoutingIntent';
import { User } from '../../src/core/entities/User';
import type { Reputation } from '../../src/core/ports/Reputation';
import type { RoutingIntent } from '../../src/core/ports/RoutingIntent';

describe('Integration: create user → update reputation → publish intent', () => {
  it('should create a user, update reputation, and publish routing intent', async () => {
    // Create user
    const createUser = new CreateUser();
    const user = createUser.execute('user-1');
    expect(user.id).toBe('user-1');
    expect(user.reputationScore).toBe(0);

    // Update reputation (mock port)
    const mockUpdateScore = jest.fn((_: string, __: number) => Promise.resolve()) as (userId: string, score: number) => Promise<void>;
    const mockGetScore = jest.fn((_: string) => Promise.resolve(42)) as (userId: string) => Promise<number>;
    const mockReputation: Reputation = {
      updateScore: mockUpdateScore,
      getScore: mockGetScore,
    };
    const updateReputation = new UpdateReputation(mockReputation);
    await updateReputation.execute('user-1', 42);
    expect(mockUpdateScore).toHaveBeenCalledWith('user-1', 42);
    const score = await mockReputation.getScore('user-1');
    expect(score).toBe(42);

    // Publish routing intent (mock port)
    const mockPublishIntent = jest.fn((_: object) => Promise.resolve()) as (intent: object) => Promise<void>;
    const mockGetIntents = jest.fn(() => Promise.resolve([{ from: 'BTC', to: 'ETH', amount: 10 }])) as () => Promise<object[]>;
    const mockRoutingIntent: RoutingIntent = {
      publishIntent: mockPublishIntent,
      getIntents: mockGetIntents,
    };
    const publishRoutingIntent = new PublishRoutingIntent(mockRoutingIntent);
    const intent = { from: 'BTC', to: 'ETH', amount: 10 };
    await publishRoutingIntent.execute(intent);
    expect(mockPublishIntent).toHaveBeenCalledWith(intent);
    const intents = await mockRoutingIntent.getIntents();
    expect(intents[0]).toEqual(intent);
  });
});
