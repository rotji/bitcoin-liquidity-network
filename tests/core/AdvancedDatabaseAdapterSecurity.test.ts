import { AdvancedDatabaseAdapter } from '../../src/core/AdvancedDatabaseAdapter';

describe('AdvancedDatabaseAdapter - security and validation', () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it('should reject invalid IDs', async () => {
    await expect(adapter.create('', { foo: 'bar' })).rejects.toThrow();
    await expect(adapter.update('', { foo: 'baz' })).rejects.toThrow();
    await expect(adapter.delete('')).rejects.toThrow();
  });

  it('should reject invalid values', async () => {
    await expect(adapter.create('id-1', undefined as any)).rejects.toThrow();
    await expect(adapter.update('id-1', undefined as any)).rejects.toThrow();
  });

  it('should prevent prototype pollution', async () => {
    await expect(adapter.create('__proto__', { polluted: true })).rejects.toThrow();
    await expect(adapter.create('constructor', { polluted: true })).rejects.toThrow();
  });

  it('should not allow injection attacks in IDs', async () => {
    const maliciousId = 'id; DROP TABLE users;';
    await expect(adapter.create(maliciousId, { foo: 'bar' })).rejects.toThrow();
  });
});
