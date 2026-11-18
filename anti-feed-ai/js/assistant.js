/**
 * ANTI-FEED AI — Assistant Engine (assistant.js)
 * Conexão direta com a API do Backend (/api/chat) que intermedeia
 * a comunicação com o Agente oficial existente no Microsoft Azure AI Foundry.
 */

const AssistantModule = {
  sessionId: null,
  chatHistory: [],
  isProcessing: false,
  foundryStatus: 'checking',

  async init() {
    this.initSession();
    this.loadHistory();
    this.renderMessages();
    this.setupListeners();
    await this.checkBackendHealth();
  },

  initSession() {
    let savedId = localStorage.getItem('antifeed_session_id');
    if (!savedId) {
      savedId = 'sess_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem('antifeed_session_id', savedId);
    }
    this.sessionId = savedId;
  },

  async checkBackendHealth() {
    const statusText = document.getElementById('azure-status-text');
    const statusIndicator = document.getElementById('azure-status-indicator');

    try {
      const res = await fetch('/api/health');
      if (!res.ok) throw new Error('Servidor retornou código ' + res.status);
      const data = await res.json();

      const foundry = data.foundry || {};
      if (foundry.status === 'connected') {
        this.foundryStatus = 'ready';
        if (statusText) statusText.textContent = `Conectado ao Agente Oficial: ${foundry.agent_name} (Azure Foundry)`;
        if (statusIndicator) {
          statusIndicator.innerHTML = '<span style="color: #4ade80;">● Online (OpenAI Responses)</span>';
        }
      } else {
        this.foundryStatus = 'pending_configuration';
        if (statusText) {
          statusText.textContent = 'Azure AI Foundry: Configuração pendente no .env';
        }
        if (statusIndicator) {
          statusIndicator.innerHTML = '<span style="color: #fbbf24;">● Configuração Pendente</span>';
        }
      }
    } catch (err) {
      this.foundryStatus = 'offline';
      if (statusText) statusText.textContent = 'Servidor Backend desconectado';
      if (statusIndicator) statusIndicator.innerHTML = '<span style="color: #f87171;">● Desconectado</span>';
    }
  },

  loadHistory() {
    const saved = window.StorageManager.get(StorageKeys.CHAT, null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      this.chatHistory = saved;
    } else {
      this.chatHistory = [
        {
          sender: 'ai',
          time: this.getCurrentTimeString(),
          text: `Olá! Sou a interface oficial do **Agente ANTI-FEED AI** hospedado no **Microsoft Azure AI Foundry**.<br><br>Todas as respostas, filtragens e sínteses jornalísticas são processadas conforme os módulos de instrução, regras editoriais e mecanismos de segurança do agente.<br><br>Em que posso ajudar hoje?`
        }
      ];
    }
  },

  saveHistory() {
    window.StorageManager.set(StorageKeys.CHAT, this.chatHistory);
  },

  renderMessages() {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    container.innerHTML = this.chatHistory.map(msg => `
      <div class="chat-message-row ${msg.sender}">
        <div class="chat-bubble">
          <div>${msg.text}</div>
          <div class="chat-bubble-meta">${msg.time}</div>
        </div>
      </div>
    `).join('');

    if (this.isProcessing) {
      container.innerHTML += `
        <div class="chat-message-row ai">
          <div class="chat-bubble" style="display: flex; align-items: center; gap: 8px; font-style: italic; color: var(--text-muted);">
            <div class="spinner-dot" style="width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-primary-500); animation: pulse 1s infinite;"></div>
            <span>Consultando Agente ANTI-FEED AI no Azure AI Foundry...</span>
          </div>
        </div>
      `;
    }

    container.scrollTop = container.scrollHeight;
  },

  setupListeners() {
    const inputField = document.getElementById('chat-input-text');
    const sendBtn = document.getElementById('chat-send-btn');
    const chips = document.querySelectorAll('.prompt-chip');
    const clearBtn = document.getElementById('chat-clear-btn');

    if (sendBtn && inputField) {
      sendBtn.addEventListener('click', () => this.handleSendMessage());
      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query && !this.isProcessing) {
          this.sendMessage(query);
        }
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', async () => {
        if (confirm('Deseja iniciar uma nova conversa e redefinir o contexto da sessão?')) {
          const oldSessionId = this.sessionId;
          try {
            await fetch('/api/chat/reset', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId: oldSessionId })
            });
          } catch (e) {
            // Silencioso
          }

          localStorage.removeItem('antifeed_session_id');
          this.initSession();
          this.chatHistory = [
            {
              sender: 'ai',
              time: this.getCurrentTimeString(),
              text: `Nova sessão iniciada (ID: <code>${this.sessionId.slice(0, 14)}...</code>). O contexto de mensagens anteriores foi reiniciado no Microsoft Foundry. Como posso ajudar?`
            }
          ];
          this.saveHistory();
          this.renderMessages();
          window.showToast('Nova sessão iniciada com o agente', 'info');
        }
      });
    }
  },

  handleSendMessage() {
    const inputField = document.getElementById('chat-input-text');
    if (!inputField || this.isProcessing) return;

    const text = inputField.value.trim();
    if (!text) return;

    inputField.value = '';
    this.sendMessage(text);
  },

  async sendMessage(text) {
    if (this.isProcessing) return;

    const userTime = this.getCurrentTimeString();
    this.chatHistory.push({
      sender: 'user',
      time: userTime,
      text: escapeHtml(text)
    });

    this.isProcessing = true;
    this.renderMessages();

    // Obtém preferências atuais para passar como contexto
    const userPrefs = window.StorageManager.getPreferences();
    const sportsPrefs = window.StorageManager.getSportsPreferences();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          sessionId: this.sessionId,
          context: {
            categories: userPrefs.categories || [],
            sports: sportsPrefs.competitions || [],
            intensity: userPrefs.intensity || 'equilibrada',
            language: userPrefs.language || 'pt-BR',
            avoidTopics: userPrefs.avoidTopics || []
          }
        })
      });

      const data = await response.json();

      if (data.sessionId && data.sessionId !== this.sessionId) {
        this.sessionId = data.sessionId;
        localStorage.setItem('antifeed_session_id', this.sessionId);
      }

      let replyFormatted = '';

      if (data.success) {
        // Resposta oficial retornada pelo Agente no Azure AI Foundry
        replyFormatted = formatMarkdownToHTML(data.message);
        if (data.agentName) {
          replyFormatted += `
            <div style="margin-top: 10px; font-size: 11px; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 6px; display: flex; justify-content: space-between;">
              <span>Agente: <strong>${data.agentName} (v${data.agentVersion})</strong></span>
              <span>Processado em ${data.elapsedMs}ms</span>
            </div>
          `;
        }
      } else {
        // Falha tratada (autenticação, rate limit, timeout)
        replyFormatted = `
          <div style="background-color: rgba(239, 68, 68, 0.08); border-left: 3px solid #ef4444; padding: 12px 14px; border-radius: 4px;">
            <strong style="color: #dc2626;">❌ Status do Azure AI Foundry: ${data.status || 'Falha na requisição'}</strong>
            <p style="font-size: 13px; margin-top: 4px;">${data.message || data.error || 'Não foi possível concluir a chamada ao agente.'}</p>
          </div>
        `;
      }

      this.chatHistory.push({
        sender: 'ai',
        time: this.getCurrentTimeString(),
        text: replyFormatted
      });

    } catch (err) {
      console.error('[ANTI-FEED Assistant] Erro ao comunicar com /api/chat:', err);
      this.chatHistory.push({
        sender: 'ai',
        time: this.getCurrentTimeString(),
        text: `
          <div style="color: var(--color-danger); font-size: 13px;">
            <strong>⚠️ Falha de Comunicação:</strong> Não foi possível conectar ao backend local (<code>/api/chat</code>). Certifique-se de que o servidor Node.js está em execução.
          </div>
        `
      });
    } finally {
      this.isProcessing = false;
      this.saveHistory();
      this.renderMessages();
    }
  },

  getCurrentTimeString() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }
};

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

function formatMarkdownToHTML(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

window.AssistantEngine = AssistantModule;
