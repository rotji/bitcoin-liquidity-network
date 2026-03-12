import type { Request, Response } from 'express';
import {
  getAllRoutingIntents,
  createRoutingIntent,
} from '../services/routingIntentsService';

export const getRoutingIntents = async (req: Request, res: Response) => {
  try {
    const intents = await getAllRoutingIntents();
    res.json(intents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch routing intents' });
  }
};

export const postRoutingIntent = async (req: Request, res: Response) => {
  try {
    console.log('postRoutingIntent request body:', req.body);
    const { user } = req.body;
    if (!user) {
      return res.status(400).json({ error: 'User field is required.' });
    }
    const intent = await createRoutingIntent(req.body);
    console.log('postRoutingIntent result:', intent);
    res.status(201).json(intent);
  } catch (err) {
    console.error('postRoutingIntent error:', err);
    res.status(500).json({ error: 'Failed to create routing intent' });
  }
};
