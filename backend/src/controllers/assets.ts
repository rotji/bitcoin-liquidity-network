import type { Request, Response } from 'express';
import { getAllAssets, createAsset as createAssetService } from '../services/assetsService.js';

export const getAssets = async (req: Request, res: Response) => {
  try {
    const assets = await getAllAssets();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

export const createAsset = async (req: Request, res: Response) => {
  try {
    const { name, symbol, protocolId } = req.body;
    const asset = await createAssetService(name, symbol, protocolId);
    res.status(201).json(asset);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create asset' });
  }
};
