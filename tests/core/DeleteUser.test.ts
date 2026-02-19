import { describe, it, expect } from '@jest/globals';
import { DeleteUser } from '../../src/core/use-cases/DeleteUser';
import { User } from '../../src/core/entities/User';

describe('DeleteUser', () => {
  it('should delete a user by id', () => {
    const users = [new User('user-1', 0), new User('user-2', 5)];
    const deleteUser = new DeleteUser(users);
    deleteUser.execute('user-1');
    expect(users.length).toBe(1);
    expect(users[0].id).toBe('user-2');
  });

  it('should do nothing if user does not exist', () => {
    const users = [new User('user-1', 0)];
    const deleteUser = new DeleteUser(users);
    deleteUser.execute('user-2');
    expect(users.length).toBe(1);
    expect(users[0].id).toBe('user-1');
  });
});
