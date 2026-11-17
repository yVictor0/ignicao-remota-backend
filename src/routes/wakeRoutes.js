import { Router } from 'express';
import { requireUser } from '../middlewares/auth.js';
import { createWake } from '../controllers/wakeController.js';

const router = Router();

router.post('/', requireUser, createWake);

export default router;
