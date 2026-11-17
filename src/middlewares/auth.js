import { env } from '../config/env.js';
import { HttpError } from '../utils/HttpError.js';
import { safeEqual } from '../utils/safeEqual.js';

// Autenticação do site: header "Authorization: Bearer <APP_PASSWORD>"
export function requireUser(req, res, next) {
  if (!env.appPassword) {
    throw new HttpError(500, 'APP_PASSWORD não configurada no servidor');
  }

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token || !safeEqual(token, env.appPassword)) {
    throw new HttpError(401, 'Senha inválida');
  }
  next();
}

// Autenticação do ESP32: header "x-device-key: <DEVICE_API_KEY>"
export function requireDevice(req, res, next) {
  if (!env.deviceApiKey) {
    throw new HttpError(500, 'DEVICE_API_KEY não configurada no servidor');
  }

  const key = req.headers['x-device-key'] || '';

  if (!key || !safeEqual(key, env.deviceApiKey)) {
    throw new HttpError(401, 'Chave do dispositivo inválida');
  }
  next();
}
