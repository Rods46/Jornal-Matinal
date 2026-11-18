/**
 * ANTI-FEED AI - Application Orchestrator (app.js)
 * Coordena os módulos da aplicação de acordo com a página ativa
 */

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.toLowerCase();

  // Inicializa NewsEngine se estiver na Home / Jornal ou se contêineres existirem no DOM
  const hasNewsContainers = !!(document.getElementById('daily-hero-container') || document.getElementById('daily-news-grid'));
  if (hasNewsContainers || path.endsWith('index.html') || path.endsWith('jornal.html') || path.includes('jornal') || path.endsWith('/') || path === '' || path.endsWith('/anti-feed-ai')) {
    if (window.NewsEngine && typeof window.NewsEngine.init === 'function') {
      window.NewsEngine.init();
    }
  }

  // Inicializa SportsEngine se estiver na página de Esportes
  if (path.includes('sports.html')) {
    if (window.SportsEngine && typeof window.SportsEngine.init === 'function') {
      window.SportsEngine.init();
    }
  }

  // Inicializa AssistantEngine se estiver na página do Assistente
  if (path.includes('assistente.html')) {
    if (window.AssistantEngine && typeof window.AssistantEngine.init === 'function') {
      window.AssistantEngine.init();
    }
  }

  // Inicializa PreferencesEngine se estiver na página de Preferências
  if (path.includes('preferencias.html')) {
    if (window.PreferencesEngine && typeof window.PreferencesEngine.init === 'function') {
      window.PreferencesEngine.init();
    }
  }

  // Inicializa SourcesEngine se estiver na página de Fontes
  if (path.includes('fontes.html')) {
    if (window.SourcesEngine && typeof window.SourcesEngine.init === 'function') {
      window.SourcesEngine.init();
    }
  }

  // Inicializa SettingsEngine se estiver na página de Configurações
  if (path.includes('configuracoes.html')) {
    if (window.SettingsEngine && typeof window.SettingsEngine.init === 'function') {
      window.SettingsEngine.init();
    }
  }

  // Busca rápida no cabeçalho
  const searchInput = document.querySelector('.header-search-input');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
          // Se não estiver no assistente, redireciona para o assistente com a pergunta
          if (!window.location.pathname.includes('assistente.html')) {
            const targetUrl = window.location.pathname.includes('/pages/')
              ? 'assistente.html'
              : 'pages/assistente.html';
            window.location.href = targetUrl;
          } else if (window.AssistantEngine) {
            window.AssistantEngine.sendMessage(query);
            searchInput.value = '';
          }
        }
      }
    });
  }
});

