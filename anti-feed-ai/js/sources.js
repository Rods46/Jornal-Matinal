/**
 * ANTI-FEED AI - Sources Directory (sources.js)
 * Catálogo transparente de fontes jornalísticas credenciadas,
 * índices de confiabilidade e metodologias de verificação cruzada.
 */

const MockSourcesList = [
  {
    name: 'Reuters',
    type: 'Internacional / Agência Global',
    category: 'internacional',
    credibility: 99,
    bias: 'Neutro / Factual',
    country: 'Reino Unido / Global',
    description: 'Padrão ouro em jornalismo de fatos diretos, apuração primária e ausência de viés opinativo nos boletins de agência.'
  },
  {
    name: 'Associated Press (AP)',
    type: 'Internacional / Agência Global',
    category: 'internacional',
    credibility: 99,
    bias: 'Neutro / Factual',
    country: 'Estados Unidos / Global',
    description: 'Cooperativa jornalística global com manual de redação rigoroso e critérios estritos de checagem com múltiplas testemunhas.'
  },
  {
    name: 'Financial Times',
    type: 'Especializada / Economia & Geopolítica',
    category: 'internacional',
    credibility: 98,
    bias: 'Analítico / Mercados',
    country: 'Reino Unido',
    description: 'Referência mundial em dados financeiros auditados, comércio exterior e análise aprofundada de acordos bilaterais.'
  },
  {
    name: 'Nature & Springer Nature',
    type: 'Especializada / Ciência & Pesquisa',
    category: 'especializada',
    credibility: 99,
    bias: 'Científico / Revisão por Pares',
    country: 'Internacional',
    description: 'Periódico científico de maior prestígio do planeta, com validação de teses por comitês acadêmicos independentes.'
  },
  {
    name: 'MIT Technology Review',
    type: 'Especializada / Tecnologia & Inovação',
    category: 'especializada',
    credibility: 98,
    bias: 'Tecnológico / Acadêmico',
    country: 'Estados Unidos',
    description: 'Publicação do Massachusetts Institute of Technology dedicada à análise sóbria e desmistificação do avanço computacional.'
  },
  {
    name: 'Autosport & Motorsport Network',
    type: 'Especializada / Automobilismo & Motociclismo',
    category: 'especializada',
    credibility: 97,
    bias: 'Técnico Esportivo',
    country: 'Global',
    description: 'Cobertura técnica com acesso oficial aos paddocks da FIA Fórmula 1, WEC, MotoGP e comissões técnicas.'
  },
  {
    name: 'Valor Econômico',
    type: 'Nacional / Economia & Negócios',
    category: 'nacional',
    credibility: 96,
    bias: 'Analítico / Brasil',
    country: 'Brasil',
    description: 'Principal veículo de análise macroeconômica, regulação financeira, decisões do Banco Central e mercados no Brasil.'
  },
  {
    name: 'BBC News Brasil & Global',
    type: 'Nacional / Internacional',
    category: 'nacional',
    credibility: 97,
    bias: 'Factual / Contextual',
    country: 'Reino Unido / Brasil',
    description: 'Tradição em apuração com pluralidade de vozes, foco pedagógico e cobertura de direitos humanos e ciências.'
  },
  {
    name: 'Agência Internacional de Energia (IEA)',
    type: 'Especializada / Energia & Sustentabilidade',
    category: 'especializada',
    credibility: 99,
    bias: 'Estatístico Governamental',
    country: 'França / OCDE',
    description: 'Autarquia autônoma responsável pelas estatísticas consolidadas da transição de matriz elétrica e carbono no mundo.'
  }
];

const SourcesModule = {
  currentTab: 'all',

  init() {
    this.renderSources(this.currentTab);
    this.setupTabs();
  },

  renderSources(tab) {
    const container = document.getElementById('sources-catalog-grid');
    if (!container) return;

    let items = MockSourcesList;
    if (tab !== 'all') {
      items = items.filter(s => s.category === tab);
    }

    container.innerHTML = items.map(s => `
      <div class="source-card">
        <div class="source-card-header">
          <div>
            <h3 class="source-name">${s.name}</h3>
            <span class="source-type">${s.type}</span>
          </div>
          <span class="verification-badge" style="font-size: 11px;">Auditada</span>
        </div>

        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
          ${s.description}
        </p>

        <div class="source-trust-meter">
          <div class="trust-label-row">
            <span style="color: var(--text-muted); font-size: 11px;">Índice de Confiabilidade Editorial</span>
            <span style="font-weight: 700; color: var(--color-success); font-size: 12px;">${s.credibility}%</span>
          </div>
          <div class="trust-bar-bg">
            <div class="trust-bar-fill" style="width: ${s.credibility}%;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); border-top: 1px dashed var(--border-color); padding-top: 8px;">
          <span>Origem: <strong>${s.country}</strong></span>
          <span>Classificação: <strong>${s.bias}</strong></span>
        </div>
      </div>
    `).join('');
  },

  setupTabs() {
    const tabs = document.querySelectorAll('.source-filter-btn');
    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.getAttribute('data-tab');
        this.renderSources(this.currentTab);
      });
    });
  }
};

window.SourcesEngine = SourcesModule;

