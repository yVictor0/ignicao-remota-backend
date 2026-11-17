// "View" da API: define o formato JSON que o site recebe.
export function renderStatus(state) {
  return {
    serverTime: state.now,
    device: state.device,
    pending: state.pending,
    lastWake: state.history[0] ?? null,
    history: state.history,
  };
}
