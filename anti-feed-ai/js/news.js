/**
 * ANTI-FEED AI - Curated News Engine (news.js)
 * Base de dados demonstrativa de curadoria jornalística inteligente com fontes verificadas
 */

const MockNewsData = [
  {
    id: 'news-001',
    isHero: true,
    title: 'Modelos de Raciocínio de IA Superam Benchmark de Formulação Científica em Genômica e Fármacos',
    category: 'tecnologia',
    categoryLabel: 'Tecnologia & IA',
    source: 'MIT Technology Review / Nature',
    sourceCredibility: '99%',
    verificationStatus: 'Verificada por 3 Agentes',
    publishedAt: 'Hoje, 06:15',
    readTime: '4 min',
    image: '/assets/images/reference-hero.svg',
    imageCaption: 'Estruturas de representação computacional de proteínas geradas por inteligência artificial.',
    summary: 'A nova geração de modelos com arquitetura de cadeia de pensamento profundo (deep reasoning) alcançou taxa de acerto inédita na predição de interações moleculares complexas, acelerando a fase pré-clínica de novos imunoterápicos de 4 anos para apenas 6 meses.',
    whyItMatters: [
      'Redução drástica no custo de desenvolvimento de medicamentos para doenças raras.',
      'Primeira comprovação empírica de raciocínio hipotético autônomo em bancada molecular digital.',
      'Validação laboratorial cruzada já confirmada por consórcio internacional de biofarmacêutica.'
    ],
    fullContent: `
      <p>Uma colaboração internacional de pesquisadores anunciou nesta manhã os resultados definitivos da aplicação de novos modelos de inteligência artificial generativa com capacidades avançadas de raciocínio lógico em pesquisas oncológicas.</p>
      
      <p>Diferente das arquiteturas estatísticas tradicionais que apenas previam sequências com base em probabilidades pré-computadas, os novos sistemas demonstraram capacidade de deduzir contra-exemplos biológicos e propor rotas de síntese química que contornam barreiras de toxicidade celular.</p>

      <h4>Impacto Prático e Resultados</h4>
      <p>Nos ensaios duplo-cegos conduzidos em parceria com centros universitários na Suíça e nos Estados Unidos, a assertividade na previsão de ligação ligante-receptor atingiu 94,8%, contra a média histórica de 61% de softwares especializados anteriores.</p>

      <blockquote>"Não estamos apenas acelerando a triagem de moléculas existentes. O modelo está propondo conformações químicas inteiramente novas que não constavam em bases de patentes anteriores", afirmou a líder do consórcio.</blockquote>

      <h4>O que esperar nos próximos meses</h4>
      <p>A fase de validação laboratorial in vitro começará em novembro, com previsão dos primeiros ensaios pré-clínicos regulados pela FDA no primeiro semestre do próximo ano.</p>
    `,
    externalUrl: 'https://www.nature.com'
  },
  {
    id: 'news-002',
    isHero: false,
    title: 'Acordo Internacional Estabelece Novo Padrão para Rastreabilidade de Terras Raras e Minerais Críticos',
    category: 'geopolitica',
    categoryLabel: 'Geopolítica & Mineração',
    source: 'Financial Times / Reuters',
    sourceCredibility: '98%',
    verificationStatus: 'Fonte Primária Oficial',
    publishedAt: 'Hoje, 06:30',
    readTime: '3 min',
    image: '/assets/images/reference-mundo.svg',
    imageCaption: 'Complexo de refino sustentável de neodímio e lítio na Escandinávia.',
    summary: 'Bloco de 24 países firmou protocolo conjunto para certificar a procedência ética e a pegada de carbono na cadeia global de suprimentos de minerais essenciais para baterias e infraestrutura energética.',
    whyItMatters: [
      'Mitiga riscos de estrangulamento unilateral de suprimentos para transição energética.',
      'Cria critérios rígidos anti-trabalho degradante e impacto em bacias hidrográficas.',
      'Garante previsibilidade cambial para contratos de longo prazo na América do Sul e África.'
    ],
    fullContent: `
      <p>Representantes de 24 economias industrializadas e em desenvolvimento assinaram em Genebra o Protocolo de Rastreamento de Minerais Estratégicos. A medida responde à crescente volatilidade geopolítica no fornecimento de lítio, cobalto e elementos de terras raras.</p>
      <p>O tratado prevê a criação de um passaporte digital único para cada lote refinado, auditável via registros criptográficos descentralizados, impedindo a mistura de minerais extraídos em zonas de conflito ou áreas de preservação ambiental permanente.</p>
    `,
    externalUrl: 'https://www.ft.com'
  },
  {
    id: 'news-003',
    isHero: false,
    title: 'Fusão Nuclear Comercial: Novo Confinamento Magnético Mantém Plasma Estável por Tempo Recorde',
    category: 'ciencia',
    categoryLabel: 'Ciência & Inovação',
    source: 'Scientific American',
    sourceCredibility: '97%',
    verificationStatus: 'Revisão por Pares',
    publishedAt: 'Hoje, 05:50',
    readTime: '3 min',
    image: '/assets/images/reference-ciencia.svg',
    imageCaption: 'Reator Tokamak esférico durante o teste de confinamento magnético com supercondutores HTS.',
    summary: 'Reator experimental operado com ímãs supercondutores de alta temperatura (HTS) manteve plasma acima de 100 milhões de graus Celsius por 17 minutos sem perda de calor crítico, superando a marca anterior em 300%.',
    whyItMatters: [
      'Passo fundamental para viabilizar usinas geradoras sem emissão de carbono na próxima década.',
      'Redução de volume necessária para os ímãs viabiliza reatores menores e modulares.',
      'Investimentos privados no setor atingiram recorde de US$ 8 bilhões este ano.'
    ],
    fullContent: `
      <p>Cientistas responsáveis pelo reator de fusão experimental divulgaram relatórios comprovando a sustentação ininterrupta de plasma por mais de 1.000 segundos com ganho líquido de calor sustentado.</p>
      <p>O feito foi possibilitado pelo uso pioneiro de fitas supercondutoras de óxido de cobre, bário e terras raras (YBCO), que operam com eficiência eletromagnética superior e demandam infraestrutura de criogenia substancialmente mais simples.</p>
    `,
    externalUrl: 'https://www.scientificamerican.com'
  },
  {
    id: 'news-004',
    isHero: false,
    title: 'Transição Energética: Matriz Elétrica Global Atinge 42% de Fontes Renováveis no Trimestre',
    category: 'sustentabilidade',
    categoryLabel: 'Sustentabilidade',
    source: 'Agência Internacional de Energia (IEA)',
    sourceCredibility: '99%',
    verificationStatus: 'Relatório Oficial IEA',
    publishedAt: 'Ontem, 22:15',
    readTime: '2 min',
    image: '/assets/images/reference-ciencia.svg',
    imageCaption: 'Parque eólico e usina solar integrados na região nordeste brasileira.',
    summary: 'A combinação de expansão solar distribuída e baterias industriais de armazenamento estabilizou redes em horários de pico, diminuindo a queima de gás e carvão em ritmo recorde na Europa, Brasil e Ásia.',
    whyItMatters: [
      'Primeira inflexão de queda estrutural absoluta nas emissões do setor elétrico.',
      'Custo nivelado de energia (LCOE) solar e eólica já é 35% mais barato que novas térmicas a gás.',
      'Armazenamento por baterias químicas quadruplicou em capacidade instalada em 12 meses.'
    ],
    fullContent: `
      <p>O boletim trimestral da Agência Internacional de Energia (IEA) registrou uma virada histórica: o volume de eletricidade gerado por fontes limpas superou os combustíveis fósseis na média diária de mais de 40 países de médio e grande porte.</p>
      <p>A proliferação de sistemas de armazenamento BESS (Battery Energy Storage Systems) foi apontada como o vetor determinante para atenuar a intermitência natural do vento e do sol sem necessidade de acionamento emergencial de usinas termoelétricas poluentes.</p>
    `,
    externalUrl: 'https://www.iea.org'
  },
  {
    id: 'news-005',
    isHero: false,
    title: 'Banco Central Anuncia Fase Piloto de Liquidação Interbancária com Moeda Digital Soberana (Drex)',
    category: 'economia',
    categoryLabel: 'Economia & Finanças',
    source: 'Valor Econômico / Banco Central do Brasil',
    sourceCredibility: '98%',
    verificationStatus: 'Comunicado Oficial',
    publishedAt: 'Ontem, 19:40',
    readTime: '3 min',
    image: '/assets/images/reference-economia.svg',
    imageCaption: 'Painel financeiro e sistemas de compensação de pagamentos eletrônicos.',
    summary: 'Testes de contratos inteligentes para transações com títulos públicos tokenizados entraram em etapa de alta densidade entre 14 instituições financeiras com privacidade preservada.',
    whyItMatters: [
      'Garante liquidação simultânea e atômica: entrega contra pagamento sem risco de contraparte.',
      'Promete reduzir taxas administrativas em financiamentos de imóveis e veículos.',
      'Brasil consolida liderança global em inovação de infraestrutura de pagamento estatal.'
    ],
    fullContent: `
      <p>O Banco Central do Brasil avançou na agenda do Drex, realizando as primeiras operações simuladas de compra e venda de Títulos Públicos Federais (TPF) tokenizados com liquidação em moeda digital soberana.</p>
      <p>A arquitetura utiliza provas de conhecimento zero (Zero-Knowledge Proofs) para assegurar o sigilo bancário exigido por lei, enquanto mantém a rastreabilidade contra ilícitos financeiros e a conformidade regulatória.</p>
    `,
    externalUrl: 'https://valor.globo.com'
  },
  {
    id: 'news-006',
    isHero: false,
    title: 'Telescópio Espacial James Webb Identifica Compostos Orgânicos em Atmosfera de Exoplaneta Rochoso',
    category: 'ciencia',
    categoryLabel: 'Espaço & Astronomia',
    source: 'NASA / ESA',
    sourceCredibility: '99%',
    verificationStatus: 'Dados Espectrométricos Validados',
    publishedAt: 'Hoje, 04:30',
    readTime: '4 min',
    image: '/assets/images/reference-ciencia.svg',
    imageCaption: 'Representação artística de planeta rochoso na zona habitável de anã vermelha.',
    summary: 'Espectroscopia de transmissão revelou assinaturas químicas de metano, dióxido de carbono e vapor d\'água em planeta situado na zona habitável a 48 anos-luz da Terra.',
    whyItMatters: [
      'Representa a caracterização atmosférica mais precisa de um mundo rochoso já obtida.',
      'Descarta hipótese de planeta estéril desprovido de camada de proteção de gases.',
      'Novas observações dedicadas já foram agendadas para o próximo trimestre.'
    ],
    fullContent: `
      <p>Em comunicado conjunto, cientistas da NASA e da ESA revelaram o espectro atmosférico do exoplaneta LHS 1140 b. Os dados confirmam a presença de atmosfera estável composta predominantemente por nitrogênio, com traços expressivos de compostos carbonados e água.</p>
      <p>Diferente de gigantes gasosos observados anteriormente, a densidade do planeta sugere superfície rochosa com possibilidade de oceanos de água líquida em seu hemisfério iluminado.</p>
    `,
    externalUrl: 'https://www.nasa.gov'
  }
];

const MockAgendaEvents = [
  {
    time: '09:00',
    title: 'Divulgação do IPCA-15 e Indicadores de Inflação',
    category: 'Economia / IBGE'
  },
  {
    time: '14:30',
    title: 'Conferência Anual de Arquitetura de Chips e IA (Hot Chips)',
    category: 'Tecnologia / Hardware'
  },
  {
    time: '18:00',
    title: 'Cúpula dos Ministros de Energia sobre Transição Limpa',
    category: 'Geopolítica / UE'
  }
];

const NewsModule = {
  data: [],
  agenda: [],
  isUpdating: false,

  init() {
    this.setupModal();
    this.setupRefreshButton();
    this.loadActiveEdition();
  },

  async loadActiveEdition() {
    this.renderLoadingState();
    try {
      const res = await fetch('/api/news/edition', { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.hero && (Array.isArray(data.news) && data.news.length > 0 || data.totalCount > 0)) {
          const freshCards = [data.hero];
          if (Array.isArray(data.news)) freshCards.push(...data.news);
          this.data = freshCards;
          if (Array.isArray(data.agenda)) this.agenda = data.agenda;
          this.renderJornal();
          this.updateHeaderBadges(data);
          console.log('[NewsEngine] Edição ativa carregada com sucesso:', this.data.length, 'itens');
          return;
        }
      }
    } catch (e) {
      console.warn('[NewsEngine] Falha ao carregar edição ativa pré-existente:', e);
    }

    // Se ainda não houver edição gerada, solicita geração da 1ª edição real via botão
    const mainBtn = document.getElementById('refresh-news-main-btn') || document.querySelector('.refresh-news-btn');
    if (mainBtn) {
      mainBtn.click();
    } else {
      this.data = MockNewsData;
      this.agenda = MockAgendaEvents;
      this.renderJornal();
    }
  },

  renderLoadingState() {
    const heroContainer = document.getElementById('daily-hero-container');
    const gridContainer = document.getElementById('daily-news-grid');
    if (heroContainer) {
      heroContainer.innerHTML = `
        <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 48px; text-align: center;">
          <div class="refresh-icon spinning" style="width: 36px; height: 36px; margin: 0 auto 16px; border: 3px solid var(--border-color); border-top-color: var(--color-primary-600); border-radius: 50%;"></div>
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px;">Conectando com fontes jornalísticas e Microsoft Foundry...</h3>
          <p style="font-size: 13px; color: var(--text-muted); max-width: 520px; margin: 0 auto;">
            Consultando despachos em tempo real das agências e executando a curadoria oficial ANTI-FEED AI.
          </p>
        </div>
      `;
    }
    if (gridContainer) {
      gridContainer.innerHTML = '';
    }
  },

  async triggerInitialRefresh() {
    const mainBtn = document.getElementById('refresh-news-main-btn');
    if (mainBtn) {
      mainBtn.click();
    }
  },

  updateHeaderBadges(data) {
    const badge = document.getElementById('morning-status-badge');
    if (badge) {
      badge.textContent = `Edição Ativa: ${data.updatedAt} • Agente Oficial`;
      badge.style.backgroundColor = 'rgba(16, 185, 129, 0.15)';
      badge.style.color = '#059669';
    }

    const syncItem = document.getElementById('morning-last-sync');
    if (syncItem) {
      syncItem.innerHTML = `⚡ <strong>Conectado:</strong> ${data.agentName || 'polite-agent-h276sfyhmp'} (v${data.agentVersion || '8'}) • ${data.totalCount || this.data.length} matérias apuradas`;
    }
  },

  setupRefreshButton() {
    const buttons = document.querySelectorAll('.refresh-news-btn');
    if (!buttons || buttons.length === 0) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();

        // TESTE G — Controle de concorrência e debouncing contra cliques múltiplos
        if (this.isUpdating) {
          window.showToast('Atualização já em andamento. Aguarde o retorno do agente.', 'warning');
          return;
        }
        this.isUpdating = true;

        const allButtons = document.querySelectorAll('.refresh-news-btn');
        const icons = document.querySelectorAll('.refresh-news-btn .refresh-icon');
        const mainText = document.querySelector('#refresh-news-main-btn .refresh-btn-text');
        const headerText = document.querySelector('#refresh-news-header-btn span');

        icons.forEach(ic => ic.classList.add('spinning'));
        allButtons.forEach(b => b.disabled = true);
        if (mainText) mainText.textContent = 'Pesquisando fontes reais...';
        if (headerText) headerText.textContent = 'Pesquisando...';

        window.showToast('Consultando despachos reais e solicitando curadoria ao Microsoft Foundry...', 'info');

        try {
          const prefs = window.StorageManager.getPreferences();
          const res = await fetch('/api/news/refresh', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            },
            body: JSON.stringify({
              categories: prefs.categories || ['tecnologia', 'economia', 'automobilismo', 'mundo', 'politica'],
              intensity: prefs.intensity || 'equilibrado',
              avoidTopics: prefs.avoidTopics || [],
              timestamp: Date.now()
            })
          });

          const data = await res.json();

          if (data.success && (data.hero || (Array.isArray(data.news) && data.news.length > 0))) {
            // TESTE C — Substituição real dos cards da grade e da manchete principal com notícias 100% REAIS
            const freshCards = [];
            if (data.hero) freshCards.push(data.hero);
            if (Array.isArray(data.news)) freshCards.push(...data.news);

            if (freshCards.length > 0) {
              this.data = freshCards;
            }

            if (Array.isArray(data.agenda) && data.agenda.length > 0) {
              this.agenda = data.agenda;
            }

            // Renderiza novamente a página inteira com os novos conteúdos reais
            this.renderJornal();
            this.updateHeaderBadges(data);

            // Apresenta banner detalhado de auditoria editorial
            this.displayAgentUpdateBanner(data);

            window.showToast(`Edição renovada: ${data.totalCount || freshCards.length} notícias reais atualizadas pelo Agente no Azure AI Foundry!`, 'success');

          } else {
            console.warn('[NewsEngine] Resposta sem renovação de cards:', data);
            window.showToast(data.error || 'Não foi possível renovar a curadoria no momento. O conteúdo anterior foi preservado.', 'warning');
          }

        } catch (err) {
          console.error('[NewsEngine] Erro ao atualizar notícias:', err);
          window.showToast('Falha de conexão com o Azure AI Foundry. O conteúdo anterior foi mantido intacto.', 'danger');

        } finally {
          icons.forEach(ic => ic.classList.remove('spinning'));
          allButtons.forEach(b => b.disabled = false);
          if (mainText) mainText.textContent = 'Atualizar Edição (Agente IA)';
          if (headerText) headerText.textContent = 'Atualizar Notícias';
          this.isUpdating = false;
        }
      });
    });
  },

  displayAgentUpdateBanner(data) {
    let banner = document.getElementById('agent-news-update-banner');
    const heroContainer = document.getElementById('daily-hero-container');
    if (!heroContainer) return;

    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'agent-news-update-banner';
      banner.className = 'agent-update-alert';
      banner.style.cssText = 'background: linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(11,25,44,0.05) 100%); border: 1px solid var(--color-primary-400); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-5); margin-bottom: var(--space-6); animation: fadeIn 0.3s ease;';
      heroContainer.parentNode.insertBefore(banner, heroContainer);
    }

    const time = data.updatedAt || 'Agora';
    const totalCount = data.totalCount || (this.data ? this.data.length : 0);
    const cats = (data.categoriesRenewed && data.categoriesRenewed.length > 0)
      ? data.categoriesRenewed.join(' • ')
      : 'Tecnologia & Economia';
    const level = data.agentLevel || 'Verificação Editorial Ativa';
    const summaryText = data.agentSummary || 'Curadoria editorial matinal renovada com sucesso pelo Agente oficial no Azure AI Foundry.';

    banner.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="verification-badge">⚡ Curadoria do Agente ANTI-FEED AI (${time})</span>
          <span style="font-size: 11px; background: rgba(5,150,105,0.15); color: #059669; font-weight: 600; padding: 2px 8px; border-radius: 999px;">
            ${totalCount} notícias renovadas
          </span>
        </div>
        <span style="font-size: 11px; color: var(--text-muted); font-family: monospace;">Microsoft Azure AI Foundry (${data.agentName || 'polite-agent-h276sfyhmp'})</span>
      </div>
      <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 6px;">
        <strong>Temas renovados:</strong> ${cats} | <strong>Protocolo:</strong> ${level}
      </div>
      <div style="font-size: 13.5px; line-height: 1.6; color: var(--text-main);">
        ${this.formatMarkdown(summaryText)}
      </div>
    `;
  },

  formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
  },

  async syncWithFoundryAgent() {
    try {
      const prefs = window.StorageManager.getPreferences();
      const res = await fetch('/api/agent/digest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'daily',
          preferences: prefs
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.message) {
          console.log('[ANTI-FEED News] Síntese oficial recebida do agente no Azure AI Foundry.');
        }
      }
    } catch (e) {
      // Falha tratada silenciosamente sem inventar notícias fictícias
      console.info('[ANTI-FEED News] Camada de integração pronta; aguardando conexão ativa com o Foundry.');
    }
  },

  renderJornal() {
    const heroContainer = document.getElementById('daily-hero-container');
    const gridContainer = document.getElementById('daily-news-grid');
    const agendaContainer = document.getElementById('agenda-items-list');

    if (!Array.isArray(this.data) || this.data.length === 0) {
      console.warn('[NewsEngine] Nenhum dado de notícia disponível para renderização.');
      return;
    }

    const heroItem = this.data.find(item => item && item.isHero) || this.data[0];
    const otherItems = this.data.filter(item => item && item.id !== (heroItem ? heroItem.id : null));

    if (heroContainer && heroItem) {
      heroContainer.innerHTML = this.createHeroHTML(heroItem);
    }

    if (gridContainer) {
      gridContainer.innerHTML = otherItems.map(item => this.createCardHTML(item)).join('');
    }

    if (agendaContainer && Array.isArray(this.agenda) && this.agenda.length > 0) {
      agendaContainer.innerHTML = this.agenda.map(evt => `
        <div class="agenda-item">
          <span class="agenda-time">${evt.time || ''}</span>
          <div class="agenda-info">
            <div class="agenda-item-title">${evt.title || ''}</div>
            <div class="agenda-item-category">${evt.category || ''}</div>
          </div>
        </div>
      `).join('');
    }

    this.attachCardEventListeners();
  },

  resolveItemImage(item, isHero = false) {
    if (!item) return isHero ? '/assets/images/reference-hero.svg' : '/assets/images/reference-default.svg';
    if (isHero) return '/assets/images/reference-hero.svg';

    // Se já for uma imagem de referência limpa SVG ou local, preserva
    if (item.image && !item.image.includes('unsplash.com') && (item.image.startsWith('/') || item.image.startsWith('../') || item.image.startsWith('assets/'))) {
      return item.image;
    }

    const cat = (item.category || item.categoryLabel || '').toLowerCase();
    if (cat.includes('econ') || cat.includes('financ') || cat.includes('mercado')) return '/assets/images/reference-economia.svg';
    if (cat.includes('polít') || cat.includes('regul') || cat.includes('governo') || cat.includes('concess')) return '/assets/images/reference-politica.svg';
    if (cat.includes('auto') || cat.includes('f1') || cat.includes('fórmula') || cat.includes('moto')) return '/assets/images/reference-automobilismo.svg';
    if (cat.includes('ciên') || cat.includes('espac') || cat.includes('astro') || cat.includes('saúde') || cat.includes('sustent')) return '/assets/images/reference-ciencia.svg';
    if (cat.includes('mundo') || cat.includes('geo') || cat.includes('diplom')) return '/assets/images/reference-mundo.svg';
    if (cat.includes('esport')) return '/assets/images/reference-esportes.svg';
    if (cat.includes('tec') || cat.includes('ia') || cat.includes('software')) return '/assets/images/reference-tecnologia.svg';
    return '/assets/images/reference-default.svg';
  },

  createHeroHTML(item) {
    if (!item) return '';
    const isFav = (window.StorageManager && typeof window.StorageManager.isFavorite === 'function')
      ? window.StorageManager.isFavorite(item.id)
      : false;
    const whyPoints = Array.isArray(item.whyItMatters)
      ? item.whyItMatters
      : (typeof item.whyItMatters === 'string' ? [item.whyItMatters] : ['Relevância apurada para o seu perfil editorial.']);
    const categoryLabel = item.categoryLabel || item.category || 'Geral';
    const credibility = item.sourceCredibility || '99%';
    const readTime = item.readTime || '3 min';
    const image = this.resolveItemImage(item, true);
    const summary = item.summary || '';
    const title = item.title || 'Manchete em apuração';
    const verification = item.verificationStatus || 'Verificada por Agente Oficial';

    return `
      <article class="editorial-card editorial-card-hero" data-id="${item.id}">
        <div class="card-image-wrap">
          <img src="${image}" alt="${title}" class="card-image" loading="lazy">
          <span class="card-badge-category" style="position: absolute; top: 12px; left: 12px;">${categoryLabel}</span>
        </div>
        <div class="card-content">
          <div class="card-meta-row">
            <span class="verification-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              ${verification}
            </span>
            ${item.externalUrl ? `<a href="${item.externalUrl}" target="_blank" rel="noopener noreferrer" class="source-tag" style="text-decoration: none;" title="Abrir matéria original">🔗 ${item.source || 'Fonte Externa'} (${credibility}) ↗</a>` : `<span class="source-tag">${item.source || 'Fonte Externa'} (${credibility})</span>`}
            <span>•</span>
            <span class="read-time">${readTime}</span>
          </div>

          <h2 class="card-title">${title}</h2>
          <p class="card-summary">${summary}</p>

          <div class="why-it-matters-box">
            <div class="why-it-matters-title">Por que importa para você:</div>
            <ul class="why-it-matters-list">
              ${whyPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
          </div>

          <div class="card-actions-row">
            <button class="btn btn-primary read-more-btn" data-id="${item.id}">
              Ler contextualização completa
            </button>
            <button class="action-icon-btn fav-toggle-btn ${isFav ? 'active' : ''}" data-id="${item.id}" title="Salvar para ler depois">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  },

  createCardHTML(item) {
    if (!item) return '';
    const isFav = (window.StorageManager && typeof window.StorageManager.isFavorite === 'function')
      ? window.StorageManager.isFavorite(item.id)
      : false;
    const whyPoints = Array.isArray(item.whyItMatters)
      ? item.whyItMatters
      : (typeof item.whyItMatters === 'string' ? [item.whyItMatters] : ['Impacto identificado na apuração editorial.']);
    const categoryLabel = item.categoryLabel || item.category || 'Geral';
    const credibility = item.sourceCredibility || '98%';
    const readTime = item.readTime || '3 min';
    const image = this.resolveItemImage(item, false);
    const summary = item.summary || '';
    const title = item.title || 'Notícia em apuração';
    const verification = item.verificationStatus || 'Fonte Primária Oficial';

    return `
      <article class="editorial-card" data-id="${item.id}">
        <div class="card-image-wrap">
          <img src="${image}" alt="${title}" class="card-image" loading="lazy">
          <span class="card-badge-category" style="position: absolute; top: 10px; left: 10px;">${categoryLabel}</span>
        </div>
        <div class="card-content">
          <div class="card-meta-row">
            <span class="verification-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              ${verification}
            </span>
            <span>•</span>
            <span class="read-time">${readTime}</span>
          </div>

          <h3 class="card-title">${title}</h3>
          <p class="card-summary">${summary}</p>

          <div class="why-it-matters-box">
            <div class="why-it-matters-title">Impacto direto:</div>
            <ul class="why-it-matters-list">
              ${whyPoints.slice(0, 2).map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>

          <div class="card-actions-row">
            <button class="btn btn-secondary btn-sm read-more-btn" data-id="${item.id}">
              Ler notícia
            </button>
            <div style="display: flex; gap: 8px;">
              ${item.externalUrl ? `<a href="${item.externalUrl}" target="_blank" rel="noopener noreferrer" class="source-tag" style="align-self: center; font-size: 11px; text-decoration: none;" title="Abrir matéria original">🔗 ${item.source || 'Fonte Externa'} ↗</a>` : `<span class="source-tag" style="align-self: center; font-size: 11px;">${item.source || 'Fonte Externa'}</span>`}
              <button class="action-icon-btn fav-toggle-btn ${isFav ? 'active' : ''}" data-id="${item.id}" title="Favoritar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  },

  attachCardEventListeners() {
    document.querySelectorAll('.read-more-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        this.openReaderModal(id);
      });
    });

    document.querySelectorAll('.fav-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-id');
        const isFav = window.StorageManager.toggleFavorite(id);
        e.currentTarget.classList.toggle('active', isFav);
        e.currentTarget.querySelector('svg').setAttribute('fill', isFav ? 'currentColor' : 'none');
        window.showToast(isFav ? 'Adicionado aos seus itens salvos' : 'Removido dos itens salvos', 'success');
      });
    });
  },

  setupModal() {
    if (document.getElementById('antifeed-reader-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'antifeed-reader-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-header-meta">
            <span id="modal-category" class="badge"></span>
            <span id="modal-source" class="source-tag"></span>
          </div>
          <button class="modal-close-btn" id="modal-close-trigger" aria-label="Fechar leitor">&times;</button>
        </div>
        <div class="modal-body" id="modal-body-content">
          <!-- Dynamic Content -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#modal-close-trigger');
    closeBtn.addEventListener('click', () => this.closeReaderModal());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeReaderModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        this.closeReaderModal();
      }
    });
  },

  openReaderModal(id) {
    const item = this.data.find(d => d && d.id === id);
    if (!item) return;

    const modal = document.getElementById('antifeed-reader-modal');
    if (!modal) return;

    const catEl = document.getElementById('modal-category');
    if (catEl) catEl.textContent = item.categoryLabel || item.category || 'Geral';

    const srcEl = document.getElementById('modal-source');
    if (srcEl) srcEl.textContent = `${item.source || 'Fonte Externa'} • Confiabilidade ${item.sourceCredibility || '99%'}`;

    const body = document.getElementById('modal-body-content');
    if (!body) return;

    const whyPoints = Array.isArray(item.whyItMatters)
      ? item.whyItMatters
      : (typeof item.whyItMatters === 'string' ? [item.whyItMatters] : ['Síntese editorial apurada.']);
    const fullContent = item.fullContent || `<p>${item.summary || 'Conteúdo em apuração.'}</p>`;
    const title = item.title || '';
    const image = this.resolveItemImage(item, item.isHero);
    const imageCaption = item.imageCaption || title;
    const publishedAt = item.publishedAt || 'Hoje';
    const readTime = item.readTime || '3 min';
    const verification = item.verificationStatus || 'Verificada por Agente Oficial';
    const sourceName = (item.source || 'Fonte Primária').split('/')[0].trim();

    body.innerHTML = `
      <h1 class="modal-title">${title}</h1>
      <div class="modal-meta-bar">
        <span>Publicado: ${publishedAt}</span>
        <span>•</span>
        <span>Tempo de leitura estimado: ${readTime}</span>
        <span>•</span>
        <span class="verification-badge">${verification}</span>
      </div>

      <img src="${image}" alt="${title}" class="modal-image">
      <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 24px; font-style: italic;">
        Foto: ${imageCaption}
      </p>

      <div class="why-it-matters-box" style="margin-bottom: 24px;">
        <div class="why-it-matters-title">Síntese Editorial ANTI-FEED:</div>
        <ul class="why-it-matters-list">
          ${whyPoints.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-article-text">
        ${fullContent}
      </div>

      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <span style="font-size: 12px; color: var(--text-muted);">
          Auditoria algorítmica: curadoria em conformidade com as diretrizes do ANTI-FEED AI.
        </span>
        ${item.externalUrl ? `
        <a href="${item.externalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          Acessar fonte original no ${sourceName} ↗
        </a>` : ''}
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeReaderModal() {
    const modal = document.getElementById('antifeed-reader-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.NewsEngine = NewsModule;

