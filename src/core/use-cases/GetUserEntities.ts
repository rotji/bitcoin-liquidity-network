// Use case for retrieving user entities
import { User } from "../entities/User";

export class GetUserEntities {
  constructor(private users: User[]) {}

  execute(): User[] {
    return this.users;
  }
}
