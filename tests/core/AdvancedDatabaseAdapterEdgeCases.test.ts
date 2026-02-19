import { AdvancedDatabaseAdapter } from '../../src/core/AdvancedDatabaseAdapter';

describe('AdvancedDatabaseAdapter - edge case handling', () => {
  let adapter: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapter = new AdvancedDatabaseAdapter();
  });

  it('should handle empty transaction array gracefully', async () => {
    const result = await adapter.transaction([]);
    expect(result.success).toBe(true);
    expect(result.results).toEqual([]);
  });

  it('should handle invalid operation type', async () => {
    // purposely invalid type
    // purposely invalid type
    const ops: Array<{ type: 'create' | 'update' | 'delete'; id: string; value?: any }> = [
      { type: 'invalid' as any, id: 'item-1' }
    ];
    const result = await adapter.transaction(ops);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should rollback on partial failure', async () => {
    await adapter.create('item-1', { foo: 'bar' });
    const ops: Array<{ type: 'create' | 'update' | 'delete'; id: string; value?: any }> = [
      { type: 'update', id: 'item-1', value: { foo: 'baz' } },
      { type: 'update', id: 'missing', value: { foo: 'fail' } },
    ];
    const result = await adapter.transaction(ops);
    expect(result.success).toBe(false);
    // item-1 should remain unchanged
    const item = await adapter.read('item-1');
    expect(item).toEqual({ foo: 'bar' });
  });
});
