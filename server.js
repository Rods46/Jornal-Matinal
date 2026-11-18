/**
 * ANTI-FEED AI — Main HTTP Server (server.js)
 * Servidor HTTP modular com integração direta ao Microsoft Azure AI Foundry.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { config, validateConfig } = require('./config/foundry');
const { routeRequest } = require('./routes/chatRoutes');
const { startPeriodicAutoUpdate } = require('./services/autoUpdateService');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURI(parsedUrl.pathname);
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // 1. Despacha rotas de API (/api/chat, /api/health, /api/chat/reset)
  if (pathname.startsWith('/api/')) {
    const handled = routeRequest(req, res, pathname, clientIp);
    if (handled) return;
  }

  // 2. Servidor de Arquivos Estáticos (Frontend 100% Nativo)
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/anti-feed-ai/index.html';
  }

  let filePath = path.join(__dirname, reqPath);
  if (!fs.existsSync(filePath)) {
    const candidatePath = path.join(__dirname, 'anti-feed-ai', reqPath);
    if (fs.existsSync(candidatePath)) {
      filePath = candidatePath;
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 Não Encontrado: ' + reqPath);
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
    }
  });
});

server.listen(config.port, '127.0.0.1', () => {
  const validation = validateConfig();
  console.log(`[ANTI-FEED AI] Servidor iniciado em: http://localhost:${config.port}`);
  console.log(`[ANTI-FEED AI] Agente Azure Foundry: ${config.agentName}`);
  console.log(`[ANTI-FEED AI] Integração: ${validation.isValid ? 'Pronta & Conectada (Protocolo OpenAI Responses)' : 'Pendente de configuração'}`);
  startPeriodicAutoUpdate(60);
});
