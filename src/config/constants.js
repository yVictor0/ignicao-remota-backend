// Chaves usadas no Redis
export const KEYS = {
  pending: 'wol:pending', // pedido de ligar aguardando o ESP32 (expira sozinho)
  lastSeen: 'wol:lastSeen', // timestamp (ms) do último contato do ESP32
  history: 'wol:history', // últimos pedidos já executados
};

// Quanto tempo um pedido fica válido esperando o ESP32 buscá-lo
export const PENDING_TTL_SECONDS = 120;

// Se o ESP32 ficar mais tempo que isso sem dar sinal, é considerado offline.
// Precisa ser maior que o intervalo de polling do firmware (padrão: 15 s).
export const ONLINE_THRESHOLD_MS = 40_000;

// Quantos eventos manter no histórico
export const HISTORY_SIZE = 10;
