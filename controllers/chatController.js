/**
 * ANTI-FEED AI — Chat & News Controller (controllers/chatController.js)
 * Processa requisições de chat, saúde e atualização de notícias do agente.
 */

const { config, validateConfig } = require('../config/foundry');
const { getOrCreateSession, resetSession, invokeAgent } = require('../services/foundryService');
const { checkRateLimit, validateChatInput } = require('../middleware/errorHandler');
const { parseAgentEditorial } = require('../services/curationParser');
const { curateNewsEdition, getActiveEdition } = require('../services/newsCurationService');
const { getAutoUpdateStatus } = require('../services/autoUpdateService');

async function handleHealth(req, res) {
  const validation = validateConfig();
  const autoUpdate = getAutoUpdateStatus();

  res.writeHead(200, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Cache-Control': 'no-cache'
  });

  return res.end(JSON.stringify({
    status: 'healthy',
    service: 'ANTI-FEED AI Backend Gateway',
    timestamp: new Date().toISOString(),
    auto_update: autoUpdate,
    foundry: {
      status: validation.isValid ? 'connected' : 'misconfigured',
      agent_name: config.agentName,
      auth_mode: config.authMode,
      has_endpoint: !!config.agentEndpoint,
      has_api_key: !!config.apiKey,
      identifier_1: config.identifier1 ? 'configured' : 'none',
      identifier_2: config.identifier2 ? 'configured' : 'none'
    }
  }, null, 2));
}

async function handleChat(req, res, clientIp) {
  if (!checkRateLimit(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json; charset=UTF-8' });
    return res.end(JSON.stringify({
      success: false,
      error: 'Limite de requisições excedido. Por favor, aguarde alguns segundos.'
    }));
  }

  let rawBody = '';
  req.on('data', chunk => {
    rawBody += chunk;
    if (rawBody.length > 1e6) {
      req.destroy();
    }
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(rawBody || '{}');
      const validation = validateChatInput(parsed);

      if (!validation.isValid) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        return res.end(JSON.stringify({
          success: false,
          error: validation.error
        }));
      }

      const session = getOrCreateSession(parsed.sessionId);
      const result = await invokeAgent(validation.message, session, parsed.context);

      const statusCode = result.success ? 200 : 502;
      res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache'
      });

      return res.end(JSON.stringify(result));

    } catch (err) {
      console.error('[ChatController] Erro interno:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({
        success: false,
        error: 'Erro interno ao processar a requisição no servidor.'
      }));
    }
  });
}

/**
 * Retorna a edição ativa atual (carregada na abertura do site sem dados estáticos)
 */
async function handleGetActiveEdition(req, res) {
  try {
    const edition = await getActiveEdition(['tecnologia', 'economia', 'automobilismo', 'mundo', 'politica']);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    return res.end(JSON.stringify(edition));
  } catch (err) {
    console.error('[ChatController] Erro ao obter edição ativa:', err);
    res.writeHead(500, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    return res.end(JSON.stringify({
      success: false,
      error: 'Falha ao carregar a edição ativa de notícias.'
    }));
  }
}

/**
 * Atualização sob demanda das notícias matinais via Pesquisa Real + Agente no Azure AI Foundry
 */
async function handleNewsRefresh(req, res, clientIp) {
  if (!checkRateLimit(clientIp)) {
    res.writeHead(429, {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    return res.end(JSON.stringify({
      success: false,
      error: 'Aguarde alguns segundos antes de solicitar uma nova atualização.'
    }));
  }

  let rawBody = '';
  req.on('data', chunk => {
    rawBody += chunk;
    if (rawBody.length > 500000) req.destroy();
  });

  req.on('end', async () => {
    try {
      const parsed = JSON.parse(rawBody || '{}');
      const categories = Array.isArray(parsed.categories) && parsed.categories.length > 0
        ? parsed.categories
        : ['tecnologia', 'economia', 'automobilismo', 'mundo', 'politica'];

      console.log('[ChatController] Requisição de atualização recebida para categorias:', categories);

      // Executa ciclo completo de busca externa em fontes reais + curadoria do Agente Foundry
      const edition = await curateNewsEdition(categories, { forceRefresh: true });

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      return res.end(JSON.stringify(edition));

    } catch (e) {
      console.error('[ChatController] Erro ao atualizar notícias:', e);
      res.writeHead(500, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      return res.end(JSON.stringify({
        success: false,
        error: 'Falha interna ao processar atualização com fontes externas.',
        preserved: true
      }));
    }
  });
}

/**
 * Atualização sob demanda das notícias esportivas com fontes reais (F1, MotoGP, WEC, etc.)
 */
async function handleSportsRefresh(req, res, clientIp) {
  let rawBody = '';
  req.on('data', chunk => { rawBody += chunk; });
  req.on('end', async () => {
    try {
      const edition = await curateNewsEdition(['automobilismo', 'esportes'], { forceRefresh: true });

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });

      return res.end(JSON.stringify(edition));

    } catch (e) {
      console.error('[ChatController] Erro ao atualizar esportes:', e);
      res.writeHead(500, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      return res.end(JSON.stringify({ success: false, error: 'Falha ao atualizar esportes em tempo real.' }));
    }
  });
}

function handleResetSession(req, res) {
  let rawBody = '';
  req.on('data', chunk => { rawBody += chunk; });
  req.on('end', () => {
    try {
      const parsed = JSON.parse(rawBody || '{}');
      const success = resetSession(parsed.sessionId);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success, message: 'Sessão reiniciada com sucesso.' }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
      return res.end(JSON.stringify({ success: false, error: 'Payload inválido.' }));
    }
  });
}

module.exports = {
  handleHealth,
  handleChat,
  handleGetActiveEdition,
  handleNewsRefresh,
  handleSportsRefresh,
  handleResetSession
};
