// Use case for retrieving protocol by ID
import { ProtocolRegistry } from "../ports/ProtocolRegistry";
import { Protocol } from "../entities/Protocol";

export class GetProtocolById {
  constructor(private protocolRegistry: ProtocolRegistry) {}

  async execute(id: string): Promise<Protocol | null> {
    return await this.protocolRegistry.getProtocolById(id);
  }
}
