// Use case for adding a user
import { User } from "../entities/User";

export class AddUser {
  constructor(private users: User[]) {}

  execute(user: User): void {
    this.users.push(user);
  }
}
