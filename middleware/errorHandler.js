/**
 * ANTI-FEED AI — Security & Error Handler (middleware/errorHandler.js)
 * Rate limiting, sanitização, validação de payload e proteção de credenciais.
 */

// Rate Limiter em memória por IP
const ipRequests = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minuto
const MAX_REQUESTS_PER_WINDOW = 40;

function checkRateLimit(ip) {
  const now = Date.now();
  let record = ipRequests.get(ip);
  if (!record) {
    record = { count: 1, startTime: now };
    ipRequests.set(ip, record);
    return true;
  }

  if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.startTime = now;
    return true;
  }

  record.count++;
  return record.count <= MAX_REQUESTS_PER_WINDOW;
}

function validateChatInput(body) {
  if (!body || typeof body !== 'object') {
    return { isValid: false, error: 'O corpo da requisição deve ser um objeto JSON válido.' };
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return { isValid: false, error: 'O campo "message" é obrigatório e não pode ser vazio.' };
  }

  if (message.length > 5000) {
    return { isValid: false, error: 'A mensagem excede o limite máximo permitido de 5.000 caracteres.' };
  }

  return { isValid: true, message };
}

function setSecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}

module.exports = {
  checkRateLimit,
  validateChatInput,
  setSecurityHeaders
};
