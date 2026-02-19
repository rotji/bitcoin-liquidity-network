// Use case for creating a user
import { User } from "../entities/User";

export class CreateUser {
  execute(id: string): User {
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid user id');
    }
    return new User(id, 0);
  }
}
