import express from 'express';
import { getYears, createYear, updateYear, deleteYear } from '../controllers/academicYear.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.get('/', getYears);
router.post('/', requireRole(['SCHOOL_ADMIN']), createYear);
router.put('/:id', requireRole(['SCHOOL_ADMIN']), updateYear);
router.delete('/:id', requireRole(['SCHOOL_ADMIN']), deleteYear);

export default router;
