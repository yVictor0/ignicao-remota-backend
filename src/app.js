import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.disable('x-powered-by');

// CORS: libera só os frontends listados em ALLOWED_ORIGIN.
// Requisições sem Origin (ESP32, curl) passam direto.
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowed = env.allowedOrigins.includes('*') || env.allowedOrigins.includes(origin);
      return callback(null, allowed);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'X-Device-Key'],
    maxAge: 86400,
  }),
);

app.use(express.json({ limit: '10kb' }));

// Nada aqui deve ser cacheado (status muda toda hora)
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;
