import { describe, it, expect } from '@jest/globals';

import { AdvancedDatabaseAdapter } from '../../src/core/AdvancedDatabaseAdapter';

describe('AdvancedDatabaseAdapter integration', () => {
  it('should handle concurrent operations', async () => {
    const db = new AdvancedDatabaseAdapter();
    await Promise.all([
      db.create('item-1', { foo: 'bar' }),
      db.create('item-2', { foo: 'baz' }),
      db.create('item-3', { foo: 'qux' }),
    ]);
    expect(await db.read('item-1')).toEqual({ foo: 'bar' });
    expect(await db.read('item-2')).toEqual({ foo: 'baz' });
    expect(await db.read('item-3')).toEqual({ foo: 'qux' });
  });

  it('should support transaction and rollback on failure', async () => {
    const db = new AdvancedDatabaseAdapter();
    await db.create('item-1', { foo: 'bar' });
    await db.create('item-2', { foo: 'baz' });
    // Transaction: update item-1, delete item-2, fail on update missing
    const ops: Array<{ type: 'create' | 'update' | 'delete'; id: string; value?: any }> = [
      { type: 'update', id: 'item-1', value: { foo: 'updated' } },
      { type: 'delete', id: 'item-2' },
      { type: 'update', id: 'missing', value: { foo: 'fail' } },
    ];
    const result = await db.transaction(ops);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    // State should be unchanged
    expect(await db.read('item-1')).toEqual({ foo: 'bar' });
    expect(await db.read('item-2')).toEqual({ foo: 'baz' });
  });
});
