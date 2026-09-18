import express from 'express';
import { saveResults, getClassResults } from '../controllers/result.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.post('/', requireRole(['SCHOOL_ADMIN', 'TEACHER']), saveResults);
router.get('/class/:classId/term/:termId', getClassResults);

export default router;
