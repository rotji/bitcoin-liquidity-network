import { describe, it, expect } from '@jest/globals';
import { Protocol } from '../../src/core/entities/Protocol';

describe('Protocol', () => {
  it('should create a valid protocol', () => {
    const protocol = new Protocol('proto-1', 'Uniswap', '0xabc', 'DEX', 'active', 'hash123');
    expect(protocol.id).toBe('proto-1');
    expect(protocol.name).toBe('Uniswap');
    expect(protocol.routerContract).toBe('0xabc');
    expect(protocol.type).toBe('DEX');
    expect(protocol.status).toBe('active');
    expect(protocol.metadataHash).toBe('hash123');
  });

  it('should allow status change', () => {
    const protocol = new Protocol('proto-2', 'Sushi', '0xdef', 'AMM', 'active');
    protocol.status = 'deprecated';
    expect(protocol.status).toBe('deprecated');
  });
});
