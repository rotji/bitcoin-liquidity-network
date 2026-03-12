import type { Request, Response } from 'express';
import { getAllUsers, createUser as createUserService } from '../services/usersService';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    console.log('createUser request body:', req.body);
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required.' });
    }
    try {
      const user = await createUserService(username, email);
      console.log('createUser result:', user);
      res.status(201).json(user);
    } catch (err: any) {
      if (err && err.code === '23505') {
        // Unique constraint violation
        return res.status(409).json({ error: 'Username or email already exists.' });
      }
      throw err;
    }
  } catch (err) {
    console.error('createUser error:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};
