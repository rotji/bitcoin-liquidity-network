// Interface for protocol-agnostic DEX adapter
export interface DEXAdapter {
  getPools(): Promise<Pool[]>;
  getReserves(pool: Pool): Promise<{ reserveA: number; reserveB: number }>;
  getFee(pool: Pool): Promise<number>;
}

import { Pool } from "../entities/Pool";
