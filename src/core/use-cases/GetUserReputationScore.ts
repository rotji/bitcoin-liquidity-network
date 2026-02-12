// Use case for retrieving user reputation score
import { User } from "../entities/User";

export class GetUserReputationScore {
  constructor(private user: User) {}

  getScore(): number {
    return this.user.reputationScore;
  }
}
