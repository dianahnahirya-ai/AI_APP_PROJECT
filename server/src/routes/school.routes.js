import express from 'express';
import { getSchools, createSchool, updateSchool, deleteSchool } from '../controllers/school.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['SUPER_ADMIN']));

router.get('/', getSchools);
router.post('/', createSchool);
router.put('/:id', updateSchool);
router.delete('/:id', deleteSchool);

export default router;
