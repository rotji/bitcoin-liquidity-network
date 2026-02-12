// Use case for getting user
import { User } from "../entities/User";

export class GetUser {
  constructor(private users: User[]) {}

  execute(id: string): User | null {
    return this.users.find((user) => user.id === id) || null;
  }
}
