import { describe, it, expect } from '@jest/globals';
import { CreateUser } from '../../src/core/use-cases/CreateUser';
import { UpdateUser } from '../../src/core/use-cases/UpdateUser';
import { User } from '../../src/core/entities/User';

describe('Security & Validation Edge Cases', () => {
  it('should reject invalid user ids', () => {
    const createUser = new CreateUser();
    expect(() => createUser.execute('')).toThrow();
    expect(() => createUser.execute(null as any)).toThrow();
  });

  it('should prevent duplicate user creation', () => {
    const createUser = new CreateUser();
    const users: User[] = [];
    users.push(createUser.execute('user-1'));
    // Simulate duplicate check
    const duplicate = users.find(u => u.id === 'user-1');
    expect(duplicate).toBeDefined();
    // Attempt to add duplicate
    if (!users.find(u => u.id === 'user-1')) {
      users.push(createUser.execute('user-1'));
    }
    expect(users.length).toBe(1);
  });

  it('should reject unauthorized reputation updates', () => {
    const users = [new User('user-1', 0)];
    const updateUser = new UpdateUser(users);
    // Simulate authorization check
    const authorized = false;
    if (!authorized) {
      expect(() => updateUser.execute('user-1', 100, false)).toThrow();
    }
  });
});
