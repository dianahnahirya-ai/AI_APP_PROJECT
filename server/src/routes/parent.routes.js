import express from 'express';
import { lookupResult } from '../controllers/parent.controller.js';
import { parentLookupLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/lookup', parentLookupLimiter, lookupResult);

export default router;
