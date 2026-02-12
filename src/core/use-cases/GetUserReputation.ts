// Use case for retrieving user reputation
import { Reputation } from "../ports/Reputation";

export class GetUserReputation {
  constructor(private reputation: Reputation) {}

  async execute(userId: string): Promise<number> {
    return await this.reputation.getScore(userId);
  }
}
