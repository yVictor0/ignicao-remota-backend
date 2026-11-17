import { SystemState } from '../models/SystemState.js';
import { renderStatus } from '../views/statusView.js';

// GET /api/status  (site) — ESP32 online?, pedido pendente e histórico
export async function getStatus(req, res) {
  const state = await SystemState.read();
  res.json(renderStatus(state));
}
