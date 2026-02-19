import { describe, it, expect } from '@jest/globals';
import { CreateUser } from '../../src/core/use-cases/CreateUser';
import { User } from '../../src/core/entities/User';

describe('CreateUser', () => {
  it('should create a new user with default reputation', () => {
    const createUser = new CreateUser();
    const user = createUser.execute('user-1');
    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe('user-1');
    expect(user.reputationScore).toBe(0);
  });
});
