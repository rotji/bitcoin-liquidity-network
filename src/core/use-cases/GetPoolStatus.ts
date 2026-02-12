// Use case for retrieving pool status
import { Pool } from "../entities/Pool";

export class GetPoolStatus {
  constructor(private pool: Pool) {}

  getStatus(): string {
    // Example: status logic (to be refined)
    return "active"; // To be refined
  }
}
