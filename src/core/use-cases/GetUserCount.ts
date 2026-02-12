// Use case for retrieving user count
import { User } from "../entities/User";

export class GetUserCount {
  constructor(private users: User[]) {}

  execute(): number {
    return this.users.length;
  }
}
