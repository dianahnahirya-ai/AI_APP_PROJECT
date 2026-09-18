import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent, generateCodes } from '../controllers/student.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.get('/', getStudents);
router.post('/', requireRole(['SCHOOL_ADMIN']), createStudent);
router.post('/generate-codes', requireRole(['SCHOOL_ADMIN']), generateCodes);
router.put('/:id', requireRole(['SCHOOL_ADMIN']), updateStudent);
router.delete('/:id', requireRole(['SCHOOL_ADMIN']), deleteStudent);

export default router;
