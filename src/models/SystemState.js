import { getRedis } from '../config/redis.js';
import { KEYS } from '../config/constants.js';
import { Device } from './Device.js';

// Leitura agregada para o painel. Usa um único MGET (1 comando no Redis).
export const SystemState = {
  async read(now = Date.now()) {
    const [pending, lastSeenRaw, history] = await getRedis().mget(
      KEYS.pending,
      KEYS.lastSeen,
      KEYS.history,
    );

    const lastSeenAt = lastSeenRaw == null ? null : Number(lastSeenRaw);

    return {
      now,
      pending: pending ?? null,
      device: { online: Device.isOnline(lastSeenAt, now), lastSeenAt },
      history: Array.isArray(history) ? history : [],
    };
  },
};
