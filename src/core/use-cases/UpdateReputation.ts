// Use case for updating user reputation
import { Reputation } from "../ports/Reputation";

export class UpdateReputation {
  constructor(private reputation: Reputation) {}

  async execute(userId: string, score: number): Promise<void> {
    await this.reputation.updateScore(userId, score);
  }
}
