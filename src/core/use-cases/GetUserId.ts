// Use case for retrieving user ID
import { User } from "../entities/User";

export class GetUserId {
  constructor(private user: User) {}

  getId(): string {
    return this.user.id;
  }
}
