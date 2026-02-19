import { describe, it, expect, jest } from '@jest/globals';
import { GetProtocolById } from '../../src/core/use-cases/GetProtocolById';
import type { ProtocolRegistry } from '../../src/core/ports/ProtocolRegistry';
import type { Protocol } from '../../src/core/entities/Protocol';

describe('GetProtocolById', () => {
  it('should fetch protocol by id using the port', async () => {
    const mockProtocol: Protocol = new (class ProtocolMock implements Protocol {
      id = 'proto-1';
      name = 'Protocol One';
      routerContract = '0xrouter1';
      type: 'DEX' = 'DEX';
      status: 'active' = 'active';
    })();
    const mockGetProtocolById = jest.fn((id: string) => Promise.resolve(id === 'proto-1' ? mockProtocol : null)) as (id: string) => Promise<Protocol | null>;
    const mockProtocolRegistry: ProtocolRegistry = {
      getProtocols: jest.fn(() => Promise.resolve([mockProtocol])) as () => Promise<Protocol[]>,
      getProtocolById: mockGetProtocolById,
    };
    const getProtocolById = new GetProtocolById(mockProtocolRegistry);
    const protocol = await getProtocolById.execute('proto-1');
    expect(protocol).toEqual(mockProtocol);
    expect(mockGetProtocolById).toHaveBeenCalledWith('proto-1');
  });

  it('should return null if protocol not found', async () => {
    const mockGetProtocolById = jest.fn(() => Promise.resolve(null)) as (id: string) => Promise<Protocol | null>;
    const mockProtocolRegistry: ProtocolRegistry = {
      getProtocols: jest.fn(() => Promise.resolve([])) as () => Promise<Protocol[]>,
      getProtocolById: mockGetProtocolById,
    };
    const getProtocolById = new GetProtocolById(mockProtocolRegistry);
    const protocol = await getProtocolById.execute('proto-2');
    expect(protocol).toBeNull();
    expect(mockGetProtocolById).toHaveBeenCalledWith('proto-2');
  });
});
