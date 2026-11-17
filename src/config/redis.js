import { Redis } from '@upstash/redis';
import { env } from './env.js';

let client;

// Cria o cliente só quando precisa e reaproveita entre chamadas "quentes".
export function getRedis() {
  if (client) return client;

  if (!env.redisUrl || !env.redisToken) {
    throw new Error('Variáveis do Upstash Redis não configuradas');
  }

  client = new Redis({ url: env.redisUrl, token: env.redisToken });
  return client;
}
