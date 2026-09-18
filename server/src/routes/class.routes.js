import express from 'express';
import { getClasses, createClass, updateClass, deleteClass } from '../controllers/class.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.get('/', getClasses);
router.post('/', requireRole(['SCHOOL_ADMIN']), createClass);
router.put('/:id', requireRole(['SCHOOL_ADMIN']), updateClass);
router.delete('/:id', requireRole(['SCHOOL_ADMIN']), deleteClass);

export default router;
