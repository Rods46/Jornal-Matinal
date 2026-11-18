/**
 * ANTI-FEED AI — Foundry Service (services/foundryService.js)
 * Comunicação direta com o Agente ANTI-FEED AI no Azure AI Foundry
 * utilizando o protocolo OpenAI Responses (?api-version=v1).
 */

const { config, validateConfig } = require('../config/foundry');
const crypto = require('crypto');

// Sessões ativas isoladas por usuário
const sessions = new Map();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h

function getOrCreateSession(sessionId) {
  const now = Date.now();
  let id = sessionId;
  if (!id || typeof id !== 'string' || id.length < 6) {
    id = 'sess_' + crypto.randomUUID();
  }

  let session = sessions.get(id);
  if (!session) {
    session = {
      id,
      lastResponseId: null,
      messages: [],
      createdAt: now,
      lastActive: now
    };
    sessions.set(id, session);
  } else {
    session.lastActive = now;
  }

  // Limpeza preventiva de sessões antigas
  if (sessions.size > 1000) {
    for (const [sId, sess] of sessions.entries()) {
      if (now - sess.lastActive > SESSION_TTL_MS) {
        sessions.delete(sId);
      }
    }
  }

  return session;
}

function resetSession(sessionId) {
  if (sessionId && sessions.has(sessionId)) {
    sessions.delete(sessionId);
    return true;
  }
  return false;
}

/**
 * Invoca o agente oficial através do protocolo OpenAI Responses do Foundry
 */
async function invokeAgent(userMessage, session, userPreferences = null, options = {}) {
  const validation = validateConfig();
  if (!validation.isValid) {
    return {
      success: false,
      status: 'configuration_error',
      message: 'Configuração do Azure AI Foundry incompleta no backend.',
      errors: validation.errors
    };
  }

  const endpointUrl = `${config.agentEndpoint}?api-version=${config.apiVersion}`;

  // Monta payload oficial do protocolo OpenAI Responses
  const payload = {
    input: userMessage
  };

  // Se houver histórico na sessão e não for uma consulta fresca/isolada, conecta via previous_response_id
  if (session && session.lastResponseId && !options.freshSession) {
    payload.previous_response_id = session.lastResponseId;
  }

  const headers = {
    'Content-Type': 'application/json',
    'api-key': config.apiKey,
    'User-Agent': 'ANTI-FEED-AI-Backend/1.0'
  };

  const timeoutDuration = options.timeoutMs || 120000; // 120 segundos para suportar raciocínio profundo e web search
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);

  try {
    const startTime = Date.now();
    const res = await fetch(endpointUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    const elapsedMs = Date.now() - startTime;

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[FoundryService] Erro HTTP ${res.status}:`, errText);

      if (res.status === 401 || res.status === 403) {
        return {
          success: false,
          status: 'auth_error',
          message: 'Falha de autorização com o agente no Azure AI Foundry. A credencial precisa de permissão no recurso.'
        };
      }

      if (res.status === 429) {
        return {
          success: false,
          status: 'rate_limited',
          message: 'Limite temporário de requisições no Azure AI Foundry atingido. Tente novamente em instantes.'
        };
      }

      return {
        success: false,
        status: 'service_error',
        message: `O serviço do Azure AI Foundry retornou status ${res.status}.`
      };
    }

    const data = await res.json();

    // Armazena o ID da resposta para continuidade contextual na próxima mensagem
    if (data.id) {
      session.lastResponseId = data.id;
    }

    // Extrai o texto final produzido pelo agente no output
    let agentText = '';
    if (Array.isArray(data.output)) {
      for (const item of data.output) {
        if (item.type === 'message' && Array.isArray(item.content)) {
          for (const c of item.content) {
            if (c.type === 'output_text' && typeof c.text === 'string') {
              agentText += c.text;
            }
          }
        }
      }
    }

    if (!agentText && typeof data.response === 'string') {
      agentText = data.response;
    }

    // Salva histórico na sessão local
    session.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    });
    session.messages.push({
      role: 'assistant',
      content: agentText,
      responseId: data.id,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      status: 'completed',
      message: agentText,
      sessionId: session.id,
      responseId: data.id,
      model: data.model || 'gpt-5',
      agentName: config.agentName,
      agentVersion: data.agent_reference?.version || '8',
      toolsCount: (data.tools || []).length,
      elapsedMs,
      timestamp: new Date().toISOString()
    };

  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return {
        success: false,
        status: 'timeout',
        message: `Tempo limite excedido (${Math.round(timeoutDuration / 1000)}s) ao aguardar resposta do agente ANTI-FEED AI.`
      };
    }
    console.error('[FoundryService] Erro de rede:', err.message);
    return {
      success: false,
      status: 'connection_error',
      message: 'Falha de comunicação com o endpoint do Azure AI Foundry.'
    };
  }
}

module.exports = {
  getOrCreateSession,
  resetSession,
  invokeAgent
};
