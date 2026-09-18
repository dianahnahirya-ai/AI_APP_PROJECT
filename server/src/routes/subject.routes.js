import express from 'express';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../controllers/subject.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.get('/', getSubjects);
router.post('/', requireRole(['SCHOOL_ADMIN']), createSubject);
router.put('/:id', requireRole(['SCHOOL_ADMIN']), updateSubject);
router.delete('/:id', requireRole(['SCHOOL_ADMIN']), deleteSubject);

export default router;
