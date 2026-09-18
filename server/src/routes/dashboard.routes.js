import express from 'express';
import { getStats } from '../controllers/dashboard.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.get('/stats', getStats);

export default router;
