// Use case for finding user by ID
import { User } from "../entities/User";

export class FindUserById {
  constructor(private users: User[]) {}

  execute(id: string): User | null {
    return this.users.find((user) => user.id === id) || null;
  }
}
