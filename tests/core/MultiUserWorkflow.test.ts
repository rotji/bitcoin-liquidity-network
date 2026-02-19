import { describe, it, expect } from '@jest/globals';
import { CreateUser } from '../../src/core/use-cases/CreateUser';
import { UpdateUser } from '../../src/core/use-cases/UpdateUser';
import { DeleteUser } from '../../src/core/use-cases/DeleteUser';
import { ListUsers } from '../../src/core/use-cases/ListUsers';
import { User } from '../../src/core/entities/User';

describe('Integration: multi-user workflow', () => {
  it('should handle concurrent user creation, update, and deletion', () => {
    // Create multiple users
    const createUser = new CreateUser();
    const users: User[] = [
      createUser.execute('user-1'),
      createUser.execute('user-2'),
      createUser.execute('user-3'),
    ];
    expect(users.length).toBe(3);
    expect(users.map(u => u.id)).toEqual(['user-1', 'user-2', 'user-3']);

    // Update users
    const updateUser = new UpdateUser(users);
    updateUser.execute('user-1', 10);
    updateUser.execute('user-2', 20);
    expect(users[0].reputationScore).toBe(10);
    expect(users[1].reputationScore).toBe(20);

    // Delete a user
    const deleteUser = new DeleteUser(users);
    deleteUser.execute('user-2');
    expect(users.length).toBe(2);
    expect(users.map(u => u.id)).toEqual(['user-1', 'user-3']);

    // List users
    const listUsers = new ListUsers(users);
    const listed = listUsers.execute();
    expect(listed.length).toBe(2);
    expect(listed.map(u => u.id)).toEqual(['user-1', 'user-3']);
  });

  it('should maintain data consistency with rapid operations', () => {
    const createUser = new CreateUser();
    const users: User[] = [];
    // Rapid creation
    for (let i = 1; i <= 100; i++) {
      users.push(createUser.execute(`user-${i}`));
    }
    expect(users.length).toBe(100);
    // Rapid update
    const updateUser = new UpdateUser(users);
    for (let i = 1; i <= 100; i++) {
      updateUser.execute(`user-${i}`, i);
    }
    expect(users[99].reputationScore).toBe(100);
    // Rapid deletion
    const deleteUser = new DeleteUser(users);
    for (let i = 1; i <= 50; i++) {
      deleteUser.execute(`user-${i}`);
    }
    expect(users.length).toBe(50);
    expect(users[0].id).toBe('user-51');
  });
});
