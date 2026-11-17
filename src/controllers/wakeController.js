import { WakeRequest } from '../models/WakeRequest.js';
import { renderWakeCreated } from '../views/wakeView.js';
import { HttpError } from '../utils/HttpError.js';

// POST /api/wake  (site) — registra o pedido de ligar o PC
export async function createWake(req, res) {
  const command = await WakeRequest.create();

  if (!command) {
    throw new HttpError(409, 'Já existe um pedido aguardando o ESP32.');
  }

  res.status(202).json(renderWakeCreated(command));
}
