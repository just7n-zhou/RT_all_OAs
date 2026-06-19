import { StatsRepository } from './stats.repository.js';

export class StatsService {
  private repository: StatsRepository;

  constructor() {
    this.repository = new StatsRepository();
  }

  async getStats() {
    const { totalCount, avgPrepTime, cuisineBreakdown } = await this.repository.getStats();

    const cuisineDistribution = cuisineBreakdown.map((item) => ({
      cuisine: item.cuisine,
      count: Number(item.count),
      percentage: totalCount > 0 ? Math.round((Number(item.count) / totalCount) * 100) : 0,
    }));

    return {
      totalRecipes: totalCount,
      avgPrepTime: Math.round(avgPrepTime),
      cuisineDistribution,
    };
  }

  async getFeatured() {
    return this.repository.getFeatured();
  }
}
