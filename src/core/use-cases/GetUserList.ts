// Use case for getting user list
import { User } from "../entities/User";

export class GetUserList {
  constructor(private users: User[]) {}

  execute(): User[] {
    return this.users;
  }
}
