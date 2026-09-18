import express from 'express';
import { login, register, me } from '../controllers/auth.controller.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', authenticateToken, me);
router.post('/register', authenticateToken, requireRole(['SUPER_ADMIN']), register);

export default router;
