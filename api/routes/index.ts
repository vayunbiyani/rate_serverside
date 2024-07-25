import { Router } from 'express';
import feedbackRoutes from './feedbackRoutes';

const router = Router();

router.use(feedbackRoutes);

export default router;
