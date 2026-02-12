// Use case for creating a user
import { User } from "../entities/User";

export class CreateUser {
  execute(id: string): User {
    return new User(id, 0);
  }
}
