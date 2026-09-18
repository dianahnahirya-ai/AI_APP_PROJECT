import express from 'express';
import { getGradingScales, createGradingScale, updateGradingScale, deleteGradingScale } from '../controllers/grading.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.get('/', getGradingScales);
router.post('/', requireRole(['SCHOOL_ADMIN']), createGradingScale);
router.put('/:id', requireRole(['SCHOOL_ADMIN']), updateGradingScale);
router.delete('/:id', requireRole(['SCHOOL_ADMIN']), deleteGradingScale);

export default router;
