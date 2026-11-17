import { HttpError } from '../utils/HttpError.js';

// Rota inexistente
export function notFound(req, res) {
  res.status(404).json({ error: 'Rota não encontrada' });
}

// Todo erro lançado nos controllers/middlewares cai aqui (Express 5 captura
// também os erros de funções async).
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  // Erros do próprio Express (ex.: JSON inválido no corpo)
  if (typeof err.status === 'number' && err.status >= 400 && err.status < 500) {
    return res.status(err.status).json({ error: 'Requisição inválida' });
  }

  console.error(err);
  return res.status(500).json({ error: 'Erro interno do servidor' });
}
