import { Router } from 'express';
import { requireUser } from '../middlewares/auth.js';
import { getStatus } from '../controllers/statusController.js';

const router = Router();

router.get('/', requireUser, getStatus);

export default router;
