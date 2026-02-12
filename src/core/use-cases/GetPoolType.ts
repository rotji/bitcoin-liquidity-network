// Use case for retrieving pool type
import { Pool } from "../entities/Pool";

export class GetPoolType {
  constructor(private pool: Pool) {}

  getType(): string {
    // Example: infer type from protocol or other logic
    return "DEX"; // To be refined
  }
}
