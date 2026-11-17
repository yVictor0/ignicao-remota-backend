// Servidor local (npm run dev). Na Vercel quem é usado é o api/index.js.
import app from './app.js';

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
