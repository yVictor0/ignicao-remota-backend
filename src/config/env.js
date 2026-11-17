// Leitura centralizada das variáveis de ambiente
export const env = {
  appPassword: process.env.APP_PASSWORD,
  deviceApiKey: process.env.DEVICE_API_KEY,

  allowedOrigins: (process.env.ALLOWED_ORIGIN || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean),

  // A integração da Vercel pode criar com um destes dois prefixos
  redisUrl: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  redisToken: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
};
