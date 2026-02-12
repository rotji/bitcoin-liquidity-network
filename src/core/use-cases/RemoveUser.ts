// Use case for removing a user
import { User } from "../entities/User";

export class RemoveUser {
  constructor(private users: User[]) {}

  execute(id: string): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
