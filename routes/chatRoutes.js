/**
 * ANTI-FEED AI — Chat & API Routes (routes/chatRoutes.js)
 * Despacha rotas de API para os controladores apropriados.
 */

const {
  handleHealth,
  handleChat,
  handleGetActiveEdition,
  handleNewsRefresh,
  handleSportsRefresh,
  handleResetSession
} = require('../controllers/chatController');
const { setSecurityHeaders } = require('../middleware/errorHandler');

function routeRequest(req, res, pathname, clientIp) {
  setSecurityHeaders(res);

  // GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    handleHealth(req, res);
    return true;
  }

  // GET /api/news/edition ou GET /api/news (Carrega a edição ativa real)
  if (req.method === 'GET' && (pathname === '/api/news/edition' || pathname === '/api/news')) {
    handleGetActiveEdition(req, res);
    return true;
  }

  // POST /api/chat
  if (req.method === 'POST' && pathname === '/api/chat') {
    handleChat(req, res, clientIp);
    return true;
  }

  // POST /api/news/refresh
  if (req.method === 'POST' && pathname === '/api/news/refresh') {
    handleNewsRefresh(req, res, clientIp);
    return true;
  }

  // POST /api/sports/refresh
  if (req.method === 'POST' && pathname === '/api/sports/refresh') {
    handleSportsRefresh(req, res, clientIp);
    return true;
  }

  // POST /api/chat/reset
  if (req.method === 'POST' && pathname === '/api/chat/reset') {
    handleResetSession(req, res);
    return true;
  }

  return false;
}

module.exports = {
  routeRequest
};
