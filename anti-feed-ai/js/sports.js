/**
 * ANTI-FEED AI - Sports Engine (sports.js)
 * Sistema de curadoria esportiva especializada com hierarquia completa:
 * Automobilismo, Motovelocidade (MotoGP/WorldSBK), Off-Road, Futebol, Basquete.
 */

const MockSportsData = {
  hero: {
    badge: 'O QUE MAIS IMPORTOU NO ESPORTE HOJE',
    title: 'Fórmula 1 & MotoGP: Fim de Semana Decisivo Redefine Disputas por Título Mundial',
    summary: 'Na F1 em Interlagos, estratégia de pit stop sob chuva mista garantiu recuperação histórica com ultrapassagem quádrupla. Na MotoGP em Valência, duelo milimétrico na última curva selou o campeonato de pilotos por apenas 3 pontos de diferença.',
    meta: ['Automobilismo & Motovelocidade', 'Curadoria Especializada', 'Atualizado há 45 min']
  },

  modalities: [
    { id: 'all', label: 'Todos os Esportes', icon: '🏆' },
    { id: 'automobilismo', label: 'Automobilismo', icon: '🏎️' },
    { id: 'motovelocidade', label: 'Motovelocidade', icon: '🏍️' },
    { id: 'offroad', label: 'Motociclismo Off-Road', icon: '🏜️' },
    { id: 'futebol', label: 'Futebol', icon: '⚽' },
    { id: 'basquete', label: 'Basquete', icon: '🏀' }
  ],

  subCompetitions: {
    automobilismo: ['Fórmula 1', 'WEC (Endurance)', 'IndyCar', 'Stock Car Pro Series', 'Formula E', 'IMSA'],
    motovelocidade: ['MotoGP (Principal)', 'Moto2 & Moto3', 'MotoE (Elétrica)', 'WorldSBK (Superbike)', 'BSB (British SBK)'],
    offroad: ['Rally Dakar', 'MXGP (Mundial de Motocross)', 'AMA Supercross', 'Hard Enduro / WESS'],
    futebol: ['UEFA Champions League', 'Brasileirão Série A', 'Copa Libertadores', 'Premier League'],
    basquete: ['NBA', 'Euroliga', 'NBB Caixa']
  },

  news: [
    {
      id: 'sp-001',
      modality: 'automobilismo',
      competition: 'Fórmula 1',
      title: 'F1: Análise Telemetria Revela Ganho de 0.3s por Volta com Nova Asa Traseira em Curvas de Média',
      source: 'Autosport / FIA Telemetry',
      sourceTrust: '99%',
      readTime: '3 min',
      image: '/assets/images/reference-automobilismo.svg',
      summary: 'Dados de túnel de vento validados no simulador demonstram que o novo pacote aerodinâmico corrigiu o equilíbrio de entrada de curva sem comprometer o arrasto em linha reta.',
      whyItMatters: [
        'Vantagem crucial para as três últimas etapas em circuitos de alta pressão aerodinâmica.',
        'Eficiência do DRS aumentou em 4% em relação ao modelo anterior.'
      ],
      fullContent: `
        <p>A telemetria detalhada registrada durante as sessões de treinos livres confirmou o salto qualitativo da atualização aerodinâmica implementada pela escuderia.</p>
        <p>Com um fluxo de ar mais limpo sobre o assoalho e nova angulação dos defletores traseiros, o carro apresentou ganho sustentado de três décimos por volta no segundo setor, com degradação térmica reduzida nos pneus traseiros.</p>
      `
    },
    {
      id: 'sp-002',
      modality: 'motovelocidade',
      competition: 'MotoGP',
      title: 'MotoGP: Ducati e KTM Testam Dispositivo de Altura Dinâmica para Proteger Pneus Dianteiros',
      source: 'Crash.net MotoGP / Dorna Sports',
      sourceTrust: '98%',
      readTime: '3 min',
      image: '/assets/images/reference-automobilismo.svg',
      summary: 'Ajuste milimétrico na compressão mecânica de largada reduz sobreaquecimento da carcaça do pneu dianteiro em 6°C nas três primeiras voltas de sprint.',
      whyItMatters: [
        'Evita perda prematura de aderência observada nas últimas etapas asiáticas.',
        'Regulamento técnico de 2027 proibirá o sistema, tornando a evolução atual a mais refinada da história.'
      ],
      fullContent: `
        <p>O gerenciamento térmico do pneu dianteiro tem sido o fiel da balança na temporada atual da MotoGP. Engenheiros da Ducati Corse e da KTM Factory Racing revelaram novos amortecedores hidráulicos passivos que ajustam a geometria do chassi em frenagens bruscas de final de reta.</p>
        <p>Os pilotos relataram sensível melhora na estabilidade e capacidade de tangência fechada, mesmo com tanques cheios no início da prova.</p>
      `
    },
    {
      id: 'sp-003',
      modality: 'motovelocidade',
      competition: 'WorldSBK',
      title: 'WorldSBK: Duelo de Superbikes de Produção em Jerez Tem Três Marcas no Mesmo Segundo',
      source: 'WorldSBK Official',
      sourceTrust: '97%',
      readTime: '2 min',
      image: '/assets/images/reference-automobilismo.svg',
      summary: 'Diferente dos protótipos da MotoGP, o Mundial de Superbike demonstrou equilíbrio mecânico recorde entre as superbikes comerciais de 1.000cc da Ducati Panigale, BMW M1000RR e Yamaha R1.',
      whyItMatters: [
        'O regulamento de peso combinado (moto + piloto) nivelou definitivamente o grid.',
        'Média de ultrapassagens por corrida no Superbike cresceu 22% nesta edição.'
      ],
      fullContent: `
        <p>O Mundial de Superbike (WorldSBK) encerrou sua rodada tripla espanhola com celebração do público e equipes. As motos derivadas de produção de série entregaram três vencedores diferentes nas três provas do fim de semana, com disputa direta por vácuo na reta dos boxes decidida por 0.018s.</p>
      `
    },
    {
      id: 'sp-004',
      modality: 'offroad',
      competition: 'Rally Dakar',
      title: 'Rally Dakar: Novas Rotas no Deserto Vazio Exigem 48 Horas de Navegação Autônoma em Bivaque Isolado',
      source: 'Dakar Official / ASO',
      sourceTrust: '99%',
      readTime: '4 min',
      image: '/assets/images/reference-esportes.svg',
      summary: 'A organização do maior rali do planeta divulgou o formato da etapa crono de 48 horas nas dunas gigantes do Empty Quarter, onde pilotos de motos e carros não terão apoio mecânico externo.',
      whyItMatters: [
        'Resgate da essência clássica de aventura e orientação por roadbook digital.',
        'Gestão de combustível e ritmo será determinante frente aos riscos de quebra na areia fofa.'
      ],
      fullContent: `
        <p>A etapa maratona de 48 horas do Rally Dakar levará competidores a um isolamento total no deserto da Arábia Saudita. Às 16h do primeiro dia, todos os veículos deverão parar no bivaque mais próximo entre seis acampamentos mínimos distribuídos no percurso, sem comunicação celular ou assistência de equipes de apoio.</p>
      `
    },
    {
      id: 'sp-005',
      modality: 'automobilismo',
      competition: 'WEC (Endurance)',
      title: 'WEC: Concorrência entre 9 Fabricantes em Hypercar Promete a Temporada Mais Disputada em 30 Anos',
      source: 'FIA WEC / Le Mans Racing',
      sourceTrust: '98%',
      readTime: '3 min',
      image: '/assets/images/reference-automobilismo.svg',
      summary: 'Ferrari, Porsche, Toyota, Cadillac, Alpine, Peugeot, BMW, Lamborghini e Aston Martin alinham no grid mundial de resistência com propulsão híbrida equilibrada por BoP transparente.',
      whyItMatters: [
        'Maior presença oficial de montadoras no automobilismo global contemporâneo.',
        'Tecnologias de regeneração de energia de frenagem já transferidas para carros esportivos de rua.'
      ],
      fullContent: `
        <p>A categoria rainha do endurance mundial, a classe Hypercar do WEC, vive uma era de ouro sem precedentes. Com nove das marcas mais prestigiadas do planeta disputando décimo a décimo nas 24 Horas de Le Mans e no circuito de São Paulo em Interlagos, o automobilismo de longa duração recuperou protagonismo absoluto.</p>
      `
    },
    {
      id: 'sp-006',
      modality: 'futebol',
      competition: 'UEFA Champions League',
      title: 'Champions League: Novo Formato Suíço Intensifica Disputa por Vagas Diretas nas Oitavas',
      source: 'UEFA / The Athletic',
      sourceTrust: '97%',
      readTime: '3 min',
      image: '/assets/images/reference-esportes.svg',
      summary: 'Tabela unificada com 36 clubes eliminou a previsibilidade dos grupos antigos: cada gol marcado agora altera até quatro posições na classificação geral.',
      whyItMatters: [
        'Clubes não podem administrar empates nas rodadas finais da fase de liga.',
        'Audiência global nas transmissões simultâneas aumentou 31%.'
      ],
      fullContent: `
        <p>O modelo de fase de liga da UEFA Champions League transformou o dinamismo do futebol europeu. Com 8 adversários diferentes sorteados para cada equipe, a pontuação agregada em tabela única premia times agressivos ofensivamente e pune retrancas táticas.</p>
      `
    }
  ],

  weekendAgenda: [
    {
      competition: 'Fórmula 1',
      event: 'GP de São Paulo - Interlagos',
      circuit: 'Autódromo José Carlos Pace (Brasil)',
      sessions: [
        { name: 'Classificação Sprint', time: 'Sexta - 15:30' },
        { name: 'Corrida Sprint', time: 'Sábado - 11:00' },
        { name: 'Classificação Principal', time: 'Sábado - 15:00' },
        { name: 'Corrida Principal (71 voltas)', time: 'Domingo - 14:00' }
      ]
    },
    {
      competition: 'MotoGP',
      event: 'GP da Malásia - Sepang',
      circuit: 'Circuito Internacional de Sepang',
      sessions: [
        { name: 'Treino Classificatório Q1 & Q2', time: 'Sábado - 00:50' },
        { name: 'Sprint Race (10 voltas)', time: 'Sábado - 04:00' },
        { name: 'Corrida Principal (20 voltas)', time: 'Domingo - 04:00' }
      ]
    },
    {
      competition: 'WorldSBK',
      event: 'Rodada Final de Jerez',
      circuit: 'Circuito de Jerez-Ángel Nieto (Espanha)',
      sessions: [
        { name: 'Superpole', time: 'Sábado - 06:00' },
        { name: 'Corrida 1', time: 'Sábado - 09:00' },
        { name: 'Superpole Race', time: 'Domingo - 06:00' },
        { name: 'Corrida 2', time: 'Domingo - 09:00' }
      ]
    }
  ]
};

const SportsModule = {
  currentFilter: 'all',

  init() {
    this.renderHero();
    this.renderModalityTabs();
    this.renderNews(this.currentFilter);
    this.renderWeekendAgenda();
    this.setupListeners();
  },

  renderHero() {
    const heroContainer = document.getElementById('sports-hero-content');
    if (!heroContainer) return;

    const h = MockSportsData.hero;
    heroContainer.innerHTML = `
      <div class="sports-hero-badge">${h.badge}</div>
      <h1 class="sports-hero-title">${h.title}</h1>
      <p class="sports-hero-summary">${h.summary}</p>
      <div class="sports-hero-meta">
        ${h.meta.map(m => `<span>• ${m}</span>`).join(' ')}
      </div>
    `;
  },

  renderModalityTabs() {
    const container = document.getElementById('sports-modality-tabs');
    if (!container) return;

    container.innerHTML = MockSportsData.modalities.map(m => `
      <button class="sports-pill-btn ${m.id === this.currentFilter ? 'active' : ''}" data-modality="${m.id}">
        <span>${m.icon}</span>
        <span>${m.label}</span>
      </button>
    `).join('');
  },

  renderNews(filter) {
    const container = document.getElementById('sports-news-grid');
    if (!container) return;

    let items = MockSportsData.news;
    if (filter !== 'all') {
      items = items.filter(item => item.modality === filter);
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-muted); background: var(--card-bg); border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
          <div style="font-size: 32px; margin-bottom: 12px;">🏁</div>
          <h4>Nenhum acontecimento crítico registrado nesta modalidade hoje</h4>
          <p style="font-size: 13px;">O ANTI-FEED AI prioriza apenas notícias com real relevância esportiva.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(item => {
      const isFav = window.StorageManager.isFavorite(item.id);
      return `
        <article class="editorial-card" data-id="${item.id}">
          <div class="card-image-wrap">
            <img src="${item.image}" alt="${item.title}" class="card-image" loading="lazy">
            <span class="card-badge-category" style="position: absolute; top: 10px; left: 10px; background-color: rgba(11,25,44,0.85);">${item.competition}</span>
          </div>
          <div class="card-content">
            <div class="card-meta-row">
              <span class="source-tag">${item.source} (${item.sourceTrust})</span>
              <span>•</span>
              <span class="read-time">${item.readTime}</span>
            </div>

            <h3 class="card-title">${item.title}</h3>
            <p class="card-summary">${item.summary}</p>

            <div class="why-it-matters-box">
              <div class="why-it-matters-title">Impacto no Campeonato:</div>
              <ul class="why-it-matters-list">
                ${item.whyItMatters.map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>

            <div class="card-actions-row">
              <button class="btn btn-secondary btn-sm sports-read-btn" data-id="${item.id}">
                Ler análise completa
              </button>
              <button class="action-icon-btn sports-fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" title="Salvar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    this.attachNewsListeners();
  },

  renderWeekendAgenda() {
    const container = document.getElementById('sports-agenda-grid');
    if (!container) return;

    container.innerHTML = MockSportsData.weekendAgenda.map(item => `
      <div class="race-event-card">
        <div class="race-event-header">
          <span class="race-comp-badge">${item.competition}</span>
          <span style="font-size: 11px; font-weight: 700; color: var(--color-primary-600);">FIM DE SEMANA DE CORRIDA</span>
        </div>
        <div class="race-event-title">${item.event}</div>
        <div class="race-event-circuit">📍 ${item.circuit}</div>

        <div class="race-event-sessions">
          ${item.sessions.map(s => `
            <div class="race-session-row">
              <span style="font-weight: 500;">${s.name}</span>
              <span style="font-weight: 700; font-family: monospace;">${s.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  },

  setupListeners() {
    const container = document.getElementById('sports-modality-tabs');
    if (container) {
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.sports-pill-btn');
        if (!btn) return;

        container.querySelectorAll('.sports-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.currentFilter = btn.getAttribute('data-modality');
        this.renderNews(this.currentFilter);
      });
    }

    const refreshBtn = document.getElementById('refresh-sports-header-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        const icon = refreshBtn.querySelector('.refresh-icon');
        const label = refreshBtn.querySelector('span');
        if (icon) icon.classList.add('spinning');
        refreshBtn.disabled = true;
        if (label) label.textContent = 'Atualizando...';

        try {
          const sportsPrefs = window.StorageManager.getSportsPreferences();
          const res = await fetch('/api/sports/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sportsPrefs)
          });
          const data = await res.json();
          if (data.success) {
            window.showToast('Rodada esportiva atualizada com sucesso pelo Agente no Azure AI Foundry!', 'success');
            if (data.hero) {
              const heroTitle = document.querySelector('.sports-hero-title');
              const heroSummary = document.querySelector('.sports-hero-summary');
              if (heroTitle && data.hero.title) heroTitle.textContent = data.hero.title;
              if (heroSummary && data.hero.summary) {
                heroSummary.innerHTML = `<strong>[Atualizado às ${data.updatedAt} via ${data.agentName}]:</strong> ${data.hero.summary}`;
              }
            }
            if (Array.isArray(data.news) && data.news.length > 0) {
              MockSportsData.news = data.news.map(n => ({
                id: n.id,
                modality: n.category === 'automobilismo' ? 'automobilismo' : 'motovelocidade',
                competition: n.categoryLabel || 'Competição Oficial',
                title: n.title,
                source: n.source,
                sourceTrust: n.sourceCredibility || '99%',
                readTime: n.readTime || '3 min',
                image: n.image,
                summary: n.summary,
                whyItMatters: n.whyItMatters || [],
                externalUrl: n.externalUrl,
                fullContent: n.fullContent
              }));
              this.renderNews(this.currentFilter);
            }
          } else {
            window.showToast('Não foi possível atualizar a rodada esportiva no momento.', 'warning');
          }
        } catch (e) {
          window.showToast('Erro de conexão ao atualizar rodada esportiva.', 'danger');
        } finally {
          if (icon) icon.classList.remove('spinning');
          refreshBtn.disabled = false;
          if (label) label.textContent = 'Atualizar Esportes';
        }
      });
    }
  },

  attachNewsListeners() {
    document.querySelectorAll('.sports-read-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = MockSportsData.news.find(n => n.id === id);
        if (!item) return;

        // Abre leitor modal se o NewsEngine estiver disponível
        if (window.NewsEngine && window.NewsEngine.openReaderModal) {
          // Injeta item no pool de notícias se necessário
          if (!window.NewsEngine.data.some(d => d.id === item.id)) {
            window.NewsEngine.data.push({
              ...item,
              categoryLabel: item.competition,
              verificationStatus: 'Verificada por Esportes AI',
              sourceCredibility: item.sourceTrust,
              imageCaption: `Cobertura esportiva especializada de ${item.competition}.`
            });
          }
          window.NewsEngine.openReaderModal(item.id);
        }
      });
    });

    document.querySelectorAll('.sports-fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-id');
        const isFav = window.StorageManager.toggleFavorite(id);
        e.currentTarget.classList.toggle('active', isFav);
        e.currentTarget.querySelector('svg').setAttribute('fill', isFav ? 'currentColor' : 'none');
        window.showToast(isFav ? 'Salvo em itens favoritos' : 'Removido dos favoritos', 'success');
      });
    });
  }
};

window.SportsEngine = SportsModule;

