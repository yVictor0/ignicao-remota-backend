import { createHash, timingSafeEqual } from 'node:crypto';

// Compara em tempo constante (evita descobrir a senha pelo tempo de resposta).
// Os dois lados viram hash antes, assim o tamanho fica sempre igual.
export function safeEqual(a, b) {
  const ha = createHash('sha256').update(String(a)).digest();
  const hb = createHash('sha256').update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}
