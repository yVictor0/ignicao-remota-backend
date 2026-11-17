import { randomUUID } from 'node:crypto';
import { getRedis } from '../config/redis.js';
import { HISTORY_SIZE, KEYS, PENDING_TTL_SECONDS } from '../config/constants.js';

// Pedido de "ligar o PC": nasce no site, é buscado e confirmado pelo ESP32.
export const WakeRequest = {
  // Cria um pedido novo. Devolve null se já existe um aguardando.
  async create() {
    const command = { id: randomUUID(), requestedAt: Date.now() };

    // nx: só grava se ainda não existir -> evita duplicar por clique repetido
    const created = await getRedis().set(KEYS.pending, command, {
      ex: PENDING_TTL_SECONDS,
      nx: true,
    });

    return created ? command : null;
  },

  async findPending() {
    return (await getRedis().get(KEYS.pending)) ?? null;
  },

  // Marca o pedido como executado: limpa o pendente e grava no histórico.
  // Devolve o evento, ou null se o pedido não existe mais (expirou/já confirmado).
  async complete(id) {
    const redis = getRedis();
    const pending = await redis.get(KEYS.pending);

    if (!pending || pending.id !== id) return null;

    const event = { id, requestedAt: pending.requestedAt, sentAt: Date.now() };
    const history = (await redis.get(KEYS.history)) || [];
    const nextHistory = [event, ...history].slice(0, HISTORY_SIZE);

    await redis.pipeline().del(KEYS.pending).set(KEYS.history, nextHistory).exec();

    return event;
  },
};
