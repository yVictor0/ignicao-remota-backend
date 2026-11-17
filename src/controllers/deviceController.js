import { Device } from '../models/Device.js';
import { WakeRequest } from '../models/WakeRequest.js';
import { renderAck, renderPoll } from '../views/deviceView.js';
import { HttpError } from '../utils/HttpError.js';

// GET /api/device/poll  (ESP32)
// Serve de batimento cardíaco e informa se há pedido para ligar o PC.
export async function poll(req, res) {
  const [, pending] = await Promise.all([Device.recordHeartbeat(), WakeRequest.findPending()]);
  res.json(renderPoll(pending));
}

// POST /api/device/ack  { "id": "..." }  (ESP32)
// Confirma que o magic packet foi enviado. Idempotente: repetir não dá erro.
export async function ack(req, res) {
  const id = req.body?.id;

  if (!id || typeof id !== 'string') {
    throw new HttpError(400, 'Campo "id" é obrigatório');
  }

  const event = await WakeRequest.complete(id);
  res.json(renderAck({ ignored: event === null }));
}
