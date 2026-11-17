import { Router } from 'express';
import wakeRoutes from './wakeRoutes.js';
import statusRoutes from './statusRoutes.js';
import deviceRoutes from './deviceRoutes.js';

const router = Router();

// Público, só para checar se a API está no ar
router.get('/health', (req, res) => res.json({ ok: true }));

router.use('/wake', wakeRoutes); // site
router.use('/status', statusRoutes); // site
router.use('/device', deviceRoutes); // ESP32

export default router;
