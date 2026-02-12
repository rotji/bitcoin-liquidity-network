// Use case for setting user reputation score
import { User } from "../entities/User";

export class SetUserReputationScore {
  constructor(private user: User) {}

  setScore(score: number): void {
    this.user.reputationScore = score;
  }
}
