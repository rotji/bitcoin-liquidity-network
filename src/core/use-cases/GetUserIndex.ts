// Use case for getting user index
import { User } from "../entities/User";

export class GetUserIndex {
  constructor(private users: User[]) {}

  execute(id: string): number {
    return this.users.findIndex((user) => user.id === id);
  }
}
