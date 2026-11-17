// Resposta do poll: o ESP32 só precisa saber se deve ligar e qual o id.
export function renderPoll(pending) {
  if (!pending) return { wake: false };
  return { wake: true, id: pending.id };
}

export function renderAck({ ignored = false } = {}) {
  return ignored ? { ok: true, ignored: true } : { ok: true };
}
