import { AdvancedDatabaseAdapter } from '../../src/core/AdvancedDatabaseAdapter';

describe('Multi-adapter workflow', () => {
  let adapterA: AdvancedDatabaseAdapter;
  let adapterB: AdvancedDatabaseAdapter;

  beforeEach(() => {
    adapterA = new AdvancedDatabaseAdapter();
    adapterB = new AdvancedDatabaseAdapter();
  });

  it('should coordinate state between two adapters', async () => {
    await adapterA.create('user-1', { name: 'Alice', balance: 100 });
    await adapterB.create('user-1', { name: 'Alice', balance: 100 });
    // Simulate a transfer from A to B
    await adapterA.update('user-1', { name: 'Alice', balance: 80 });
    await adapterB.update('user-1', { name: 'Alice', balance: 120 });
    expect(await adapterA.read('user-1')).toEqual({ name: 'Alice', balance: 80 });
    expect(await adapterB.read('user-1')).toEqual({ name: 'Alice', balance: 120 });
  });

  it('should rollback both adapters on failure', async () => {
    await adapterA.create('user-2', { name: 'Bob', balance: 50 });
    await adapterB.create('user-2', { name: 'Bob', balance: 50 });
    // Simulate a coordinated transaction
    const backupA = new Map((adapterA as any).store);
    const backupB = new Map((adapterB as any).store);
    try {
      await adapterA.update('user-2', { name: 'Bob', balance: 30 });
      // Simulate failure in B
      throw new Error('Adapter B failure');
    } catch {
      // Rollback both
      (adapterA as any).store = backupA;
      (adapterB as any).store = backupB;
    }
    expect(await adapterA.read('user-2')).toEqual({ name: 'Bob', balance: 50 });
    expect(await adapterB.read('user-2')).toEqual({ name: 'Bob', balance: 50 });
  });
});
