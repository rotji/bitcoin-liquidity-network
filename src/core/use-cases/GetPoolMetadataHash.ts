// Use case for retrieving pool metadata hash
import { Pool } from "../entities/Pool";

export class GetPoolMetadataHash {
  constructor(private pool: Pool) {}

  getMetadataHash(): string | undefined {
    // Example: metadata hash logic (to be refined)
    return undefined;
  }
}
