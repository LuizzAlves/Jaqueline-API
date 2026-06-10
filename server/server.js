import express from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_URL = process.env.PUBLIC_URL || 'http://localhost:3000';

// Serve static files from client build
const clientDist = join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));

// API routes
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/link', (_req, res) => {
  res.json({ url: PUBLIC_URL });
});

// SPA fallback — serve index.html for unknown routes
app.get('*', (_req, res) => {
  res.sendFile(join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 ${PUBLIC_URL}`);
});
