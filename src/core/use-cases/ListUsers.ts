// Use case for listing users
import { User } from "../entities/User";

export class ListUsers {
  constructor(private users: User[]) {}

  execute(): User[] {
    return this.users;
  }
}
