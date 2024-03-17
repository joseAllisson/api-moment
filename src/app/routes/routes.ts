import { Router } from 'express';
import momentRouter from '../controllers/momentController';
import commentRouter from '../controllers/commentController';

const router = Router();

router.use('/moment', momentRouter);
router.use('/comment', commentRouter);

export default router;