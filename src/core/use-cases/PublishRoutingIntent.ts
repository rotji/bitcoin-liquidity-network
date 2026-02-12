// Use case for publishing routing intents
import { RoutingIntent } from "../ports/RoutingIntent";

export class PublishRoutingIntent {
  constructor(private routingIntent: RoutingIntent) {}

  async execute(intent: object): Promise<void> {
    await this.routingIntent.publishIntent(intent);
  }
}
