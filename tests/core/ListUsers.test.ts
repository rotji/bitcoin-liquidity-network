import { describe, it, expect } from '@jest/globals';
import { ListUsers } from '../../src/core/use-cases/ListUsers';
import { User } from '../../src/core/entities/User';

describe('ListUsers', () => {
  it('should return all users', () => {
    const users = [new User('user-1', 0), new User('user-2', 5)];
    const listUsers = new ListUsers(users);
    const result = listUsers.execute();
    expect(result).toEqual(users);
  });

  it('should return an empty array if no users', () => {
    const users: User[] = [];
    const listUsers = new ListUsers(users);
    const result = listUsers.execute();
    expect(result).toEqual([]);
  });
});
