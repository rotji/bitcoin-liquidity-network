// Use case for clearing all users
import { User } from "../entities/User";

export class ClearUsers {
  constructor(private users: User[]) {}

  execute(): void {
    this.users.length = 0;
  }
}
