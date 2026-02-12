// Interface for protocol registry adapter
import { Protocol } from "../entities/Protocol";

export interface ProtocolRegistry {
  getProtocols(): Promise<Protocol[]>;
  getProtocolById(id: string): Promise<Protocol | null>;
}
