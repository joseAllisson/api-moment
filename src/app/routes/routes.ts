import { Router } from 'express';
import momentRouter from '../controllers/momentController';
import commentRouter from '../controllers/commentController';
import express from 'express';
import path from 'path';

const router = Router();

router.use('/moment', momentRouter);
router.use('/comment', commentRouter);
// router.use('/uploads', express.static(path.join(__dirname, 'tmp', 'uploads')));

export default router;