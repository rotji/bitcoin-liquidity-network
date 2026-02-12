// Use case for retrieving pool price and depth
import { Pool } from "../entities/Pool";

export class GetPoolPriceDepth {
  constructor(private pool: Pool) {}

  getPrice(): number {
    return this.pool.reserveA / this.pool.reserveB;
  }

  getDepth(): number {
    return this.pool.reserveA + this.pool.reserveB;
  }
}
