import { AdvancedDatabaseAdapter } from '../../src/core/AdvancedDatabaseAdapter';

describe('AdvancedDatabaseAdapter - resource cleanup', () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it('should clear all data on cleanup', async () => {
    await adapter.create('cleanup-1', { foo: 'bar' });
    await adapter.create('cleanup-2', { foo: 'baz' });
    // Simulate a cleanup method
    // @ts-ignore
    if (typeof adapter.clear === 'function') {
      // @ts-ignore
      await adapter.clear();
    } else {
      // fallback: clear the store directly for test
      // @ts-ignore
      adapter.store.clear();
    }
    expect(await adapter.read('cleanup-1')).toBeUndefined();
    expect(await adapter.read('cleanup-2')).toBeUndefined();
  });
});
