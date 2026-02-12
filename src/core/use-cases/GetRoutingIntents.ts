// Use case for retrieving routing intents
import { RoutingIntent } from "../ports/RoutingIntent";

export class GetRoutingIntents {
  constructor(private routingIntent: RoutingIntent) {}

  async execute(): Promise<object[]> {
    return await this.routingIntent.getIntents();
  }
}
