import { Router } from 'express';
import { requireDevice } from '../middlewares/auth.js';
import { ack, poll } from '../controllers/deviceController.js';

const router = Router();

// Tudo aqui é exclusivo do ESP32
router.use(requireDevice);

router.get('/poll', poll);
router.post('/ack', ack);

export default router;
