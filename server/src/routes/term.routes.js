import express from 'express';
import { getTerms, createTerm, updateTerm, deleteTerm } from '../controllers/term.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { schoolContext } from '../middleware/schoolContext.js';

const router = express.Router();

router.use(authenticateToken, schoolContext);

router.get('/year/:yearId', getTerms);
router.post('/', requireRole(['SCHOOL_ADMIN']), createTerm);
router.put('/:id', requireRole(['SCHOOL_ADMIN']), updateTerm);
router.delete('/:id', requireRole(['SCHOOL_ADMIN']), deleteTerm);

export default router;
