import { describe, it, expect } from '@jest/globals';
import { UpdateUser } from '../../src/core/use-cases/UpdateUser';
import { User } from '../../src/core/entities/User';

describe('UpdateUser', () => {
  it('should update the reputation score of an existing user', () => {
    const users = [new User('user-1', 0), new User('user-2', 5)];
    const updateUser = new UpdateUser(users);
    updateUser.execute('user-1', 10);
    expect(users[0].reputationScore).toBe(10);
    expect(users[1].reputationScore).toBe(5);
  });

  it('should do nothing if user does not exist', () => {
    const users = [new User('user-1', 0)];
    const updateUser = new UpdateUser(users);
    updateUser.execute('user-2', 10);
    expect(users[0].reputationScore).toBe(0);
  });
});
