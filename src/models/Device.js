import { getRedis } from '../config/redis.js';
import { KEYS, ONLINE_THRESHOLD_MS } from '../config/constants.js';

// O ESP32: sabemos que está vivo pelo último contato (heartbeat).
export const Device = {
  async recordHeartbeat() {
    await getRedis().set(KEYS.lastSeen, Date.now());
  },

  isOnline(lastSeenAt, now = Date.now()) {
    return lastSeenAt !== null && now - lastSeenAt < ONLINE_THRESHOLD_MS;
  },
};
