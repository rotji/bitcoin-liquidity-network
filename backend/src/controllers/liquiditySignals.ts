import type { Request, Response } from 'express';
import {
  getAllLiquiditySignals,
  createLiquiditySignal,
} from '../services/liquiditySignalsService';

export const getLiquiditySignals = async (req: Request, res: Response) => {
  try {
    const signals = await getAllLiquiditySignals();
    res.json(signals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch liquidity signals' });
  }
};

export const postLiquiditySignal = async (req: Request, res: Response) => {
  try {
    console.log('postLiquiditySignal request body:', req.body);
    const { protocol } = req.body;
    if (!protocol) {
      return res.status(400).json({ error: 'Protocol field is required.' });
    }
    const signal = await createLiquiditySignal(req.body);
    console.log('postLiquiditySignal result:', signal);
    res.status(201).json(signal);
  } catch (err) {
    console.error('postLiquiditySignal error:', err);
    res.status(500).json({ error: 'Failed to create liquidity signal' });
  }
};
