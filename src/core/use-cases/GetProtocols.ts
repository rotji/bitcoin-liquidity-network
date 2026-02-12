// Use case for retrieving protocols
import { ProtocolRegistry } from "../ports/ProtocolRegistry";
import { Protocol } from "../entities/Protocol";

export class GetProtocols {
  constructor(private protocolRegistry: ProtocolRegistry) {}

  async execute(): Promise<Protocol[]> {
    return await this.protocolRegistry.getProtocols();
  }
}
