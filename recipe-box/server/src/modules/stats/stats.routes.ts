import { Router } from 'express';
import { StatsController } from './stats.controller.js';

const router = Router();
const controller = new StatsController();

router.get('/', controller.getStats);
router.get('/featured', controller.getFeatured);

export default router;
