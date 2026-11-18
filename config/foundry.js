/**
 * ANTI-FEED AI — Foundry Configuration (config/foundry.js)
 * Leitura, validação e sanitização das variáveis de ambiente do Azure AI Foundry.
 */

const path = require('path');

// Carrega .env com suporte nativo
try {
  if (typeof process.loadEnvFile === 'function') {
    process.loadEnvFile(path.join(__dirname, '..', '.env'));
  }
} catch (e) {
  // Ignora se já estiver carregado no runtime
}

const config = {
  projectEndpoint: (process.env.FOUNDRY_PROJECT_ENDPOINT || '').trim(),
  openaiEndpoint: (process.env.FOUNDRY_OPENAI_ENDPOINT || '').trim(),
  agentEndpoint: (process.env.FOUNDRY_AGENT_ENDPOINT || '').trim(),
  agentName: (process.env.FOUNDRY_AGENT_NAME || 'polite-agent-h276sfyhmp').trim(),
  identifier1: (process.env.FOUNDRY_IDENTIFIER_1 || '').trim(),
  identifier2: (process.env.FOUNDRY_IDENTIFIER_2 || '').trim(),
  authMode: (process.env.FOUNDRY_AUTH_MODE || 'api_key').trim(),
  apiKey: (process.env.FOUNDRY_API_KEY || '').trim(),
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: (process.env.NODE_ENV || 'development').trim(),
  apiVersion: 'v1'
};

function validateConfig() {
  const errors = [];
  if (!config.agentEndpoint) {
    errors.push('FOUNDRY_AGENT_ENDPOINT não configurado.');
  }
  if (!config.apiKey && config.authMode === 'api_key') {
    errors.push('FOUNDRY_API_KEY não configurada para authMode api_key.');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = {
  config,
  validateConfig
};
