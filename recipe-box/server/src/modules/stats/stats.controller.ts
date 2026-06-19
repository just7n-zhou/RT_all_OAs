import { Request, Response, NextFunction } from 'express';
import { StatsService } from './stats.service.js';

export class StatsController {
  private service: StatsService;

  constructor() {
    this.service = new StatsService();
  }

  getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.service.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  };

  getFeatured = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const featured = await this.service.getFeatured();
      res.json(featured);
    } catch (error) {
      next(error);
    }
  };
}
