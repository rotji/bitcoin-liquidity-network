import { describe, it, expect, jest } from '@jest/globals';
import { PublishRoutingIntent } from '../../src/core/use-cases/PublishRoutingIntent';
import type { RoutingIntent } from '../../src/core/ports/RoutingIntent';

describe('PublishRoutingIntent', () => {
  it('should publish a routing intent using the port', async () => {
    const mockPublish = jest.fn((_: object) => Promise.resolve()) as (intent: object) => Promise<void>;
    const mockRoutingIntent: RoutingIntent = {
      publishIntent: mockPublish,
      getIntents: jest.fn(() => Promise.resolve([])) as () => Promise<object[]>,
    };
    const intent = { from: 'BTC', to: 'ETH', amount: 10 };
    const publishRoutingIntent = new PublishRoutingIntent(mockRoutingIntent);
    await publishRoutingIntent.execute(intent);
    expect(mockPublish).toHaveBeenCalledWith(intent);
  });
});
