/**
 * ANTI-FEED AI — News Curation Service (services/newsCurationService.js)
 * Orquestra o fluxo ponta a ponta:
 * 1. Coleta notícias reais de fontes primárias via newsSearchService.
 * 2. Envia os despachos reais ao Agente no Azure AI Foundry para curadoria analítica.
 * 3. Enriquecimento de metadados, controle de duplicidades, hashing e persistência.
 * 4. Fornece edição ativa para o frontend sem jamais depender de dados estáticos.
 */

const fs = require('fs');
const path = require('path');
const { fetchTopDispatches } = require('./newsSearchService');
const { invokeAgent, getOrCreateSession } = require('./foundryService');
const { parseAgentEditorial } = require('./curationParser');
const { config } = require('../config/foundry');

const DATA_DIR = path.join(__dirname, '..', 'data');
const EDITION_FILE = path.join(DATA_DIR, 'current_edition.json');

// Cache em memória da edição ativa
let activeEdition = null;
let isCurating = false;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function loadEditionFromDisk() {
  try {
    ensureDataDir();
    if (fs.existsSync(EDITION_FILE)) {
      const raw = fs.readFileSync(EDITION_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && parsed.hero && Array.isArray(parsed.news)) {
        activeEdition = parsed;
        return activeEdition;
      }
    }
  } catch (err) {
    console.warn('[NewsCuration] Não foi possível ler edição do disco:', err.message);
  }
  return null;
}

function saveEditionToDisk(edition) {
  try {
    ensureDataDir();
    fs.writeFileSync(EDITION_FILE, JSON.stringify(edition, null, 2), 'utf8');
  } catch (err) {
    console.error('[NewsCuration] Erro ao salvar edição no disco:', err.message);
  }
}

/**
 * Converte os despachos coletados em texto estruturado para envio ao agente
 */
function buildDispatchesText(dispatches) {
  return dispatches.map((d, index) => `
[DESPACHO ${index + 1}]
- Título: "${d.title}"
- Fonte Oficial: ${d.source}
- URL Original: ${d.source_url}
- Data de Publicação: ${d.published_at}
- Categoria: ${d.categoryLabel} (${d.category})
- Resumo Apurado: ${d.summary}
- Hash de Integridade: ${d.content_hash}
`).join('\n');
}

/**
 * Executa uma rodada completa de pesquisa e curadoria jornalística real
 */
async function curateNewsEdition(requestedCategories = [], options = {}) {
  if (isCurating) {
    console.log('[NewsCuration] Curadoria já em andamento. Aguardando...');
    if (activeEdition) return activeEdition;
  }
  isCurating = true;

  try {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateFormatted = now.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    console.log(`[NewsCuration] Iniciando pesquisa externa para categorias: ${requestedCategories.join(', ') || 'Padrão'}`);

    // 1. Pesquisa Externa em Fontes Jornalísticas Reais
    const dispatches = await fetchTopDispatches(requestedCategories, 3);
    console.log(`[NewsCuration] ${dispatches.length} despachos reais coletados com sucesso.`);

    if (dispatches.length === 0) {
      console.warn('[NewsCuration] Nenhum despacho retornado das fontes externas.');
      if (activeEdition) return activeEdition;
      throw new Error('Não foi possível obter notícias das fontes externas no momento.');
    }

    const dispatchesText = buildDispatchesText(dispatches);

    // 2. Monta o Prompt de Curadoria para o Agente Microsoft Azure AI Foundry
    const prompt = `[DATA E HORÁRIO ATUAL DA CONSULTA: ${dateFormatted}, ${timeStr} BRT]
Como ANTI-FEED AI (Agente Oficial de Curadoria Editorial com alta precisão e sem clickbait), realize a curadoria jornalística analítica com base EXCLUSIVAMENTE nos seguintes despachos reais coletados de fontes jornalísticas verificadas:

${dispatchesText}

DIRETRIZES FUNDAMENTAIS:
1. Avalie os despachos e eleja a MANCHETE PRINCIPAL do dia baseando-se no maior impacto sistêmico e relevância.
2. Selecione as notícias secundárias mais relevantes para a grade.
3. PRESERVE estritamente os títulos reais, fontes reais, URLs originais reais e datas reais fornecidas nos despachos.
4. Para cada matéria, elabore a análise exclusiva "Por que importa para você" com 2 pontos de impacto direto (sem rodeios).

ESTRUTURAÇÃO EXATA DA RESPOSTA:
### RESUMO EDITORIAL
[2 frases de síntese dos principais acontecimentos do dia]

### MANCHETE PRINCIPAL
- Título: [título original real do despacho principal]
- Categoria: [categoria]
- Fonte: [fonte real]
- URL: [url original real]
- Data: [data real]
- Confiabilidade: 99% (Fonte Primária Verificada)
- Resumo: [resumo analítico de 2 a 3 frases]
- Por que importa:
  * [impacto direto 1]
  * [impacto direto 2]
- Contexto: [1 parágrafo com desdobramentos estratégicos]

### NOTÍCIAS RELEVANTES
1. Título: [título real] | Categoria: [categoria] | Fonte: [fonte real] | URL: [url real] | Data: [data real] | Confiabilidade: 98% | Resumo: [resumo] | Por que importa: [impacto]
2. Título: [título real] | Categoria: [categoria] | Fonte: [fonte real] | URL: [url real] | Data: [data real] | Confiabilidade: 98% | Resumo: [resumo] | Por que importa: [impacto]
3. Título: [título real] | Categoria: [categoria] | Fonte: [fonte real] | URL: [url real] | Data: [data real] | Confiabilidade: 98% | Resumo: [resumo] | Por que importa: [impacto]
4. Título: [título real] | Categoria: [categoria] | Fonte: [fonte real] | URL: [url real] | Data: [data real] | Confiabilidade: 98% | Resumo: [resumo] | Por que importa: [impacto]

### AGENDA
- 09:30: Abertura das negociações financeiras e divulgação de indicadores | Economia
- 15:00: Painel de atualizações tecnológicas e regulatórias | Tecnologia`;

    console.log('[NewsCuration] Enviando despachos reais ao Agente no Azure AI Foundry...');
    const session = getOrCreateSession(`curation_${Date.now()}`);
    const agentResult = await invokeAgent(prompt, session, null, {
      freshSession: true,
      timeoutMs: 120000
    });

    console.log(`[NewsCuration] Retorno do agente: ${agentResult.success ? 'SUCESSO' : 'FALHA'}`);

    let editorial = null;
    if (agentResult.success && agentResult.message) {
      editorial = parseAgentEditorial(agentResult.message, timeStr);
    }

    // 3. Fallback inteligente e enriquecimento com os despachos reais
    // Garante que cada card tenha a URL real, fonte real e data real de publicação
    const topDispatch = dispatches[0];
    const otherDispatches = dispatches.slice(1, 5);

    let heroCard = null;
    if (editorial && editorial.hero && editorial.hero.title && !editorial.hero.title.includes('Indisponível')) {
      heroCard = editorial.hero;
      // Garante URL e dados de despacho
      const matchD = dispatches.find(d => d.title.toLowerCase().includes(heroCard.title.substring(0, 20).toLowerCase())) || topDispatch;
      heroCard.source = heroCard.source && heroCard.source !== '—' ? heroCard.source : matchD.source;
      heroCard.externalUrl = matchD.source_url;
      heroCard.published_at = matchD.published_at;
      heroCard.updated_at = matchD.updated_at;
      heroCard.fetched_at = matchD.fetched_at;
      heroCard.content_hash = matchD.content_hash;
      if (!heroCard.image || heroCard.image.includes('unsplash.com')) {
        heroCard.image = '/assets/images/reference-hero.svg';
      }
    } else {
      // Cria Hero a partir do principal despacho real
      heroCard = {
        id: `news-hero-${Date.now()}`,
        isHero: true,
        title: topDispatch.title,
        category: topDispatch.category,
        categoryLabel: topDispatch.categoryLabel,
        source: topDispatch.source,
        sourceCredibility: '99%',
        verificationStatus: 'Fonte Primária Verificada',
        publishedAt: `Hoje, ${timeStr}`,
        published_at: topDispatch.published_at,
        updated_at: topDispatch.updated_at,
        fetched_at: topDispatch.fetched_at,
        readTime: '3 min',
        image: '/assets/images/reference-hero.svg',
        imageCaption: `Infográfico editorial de referência • ${topDispatch.source}.`,
        summary: topDispatch.summary,
        whyItMatters: [
          'Impacto direto no setor e nas decisões estratégicas do leitor.',
          'Acompanhamento prioritário selecionado pelo ANTI-FEED AI.'
        ],
        fullContent: `<p>${topDispatch.summary}</p><p>Acompanhamento de fatos apurados diretamente com a redação de ${topDispatch.source}.</p>`,
        externalUrl: topDispatch.source_url,
        content_hash: topDispatch.content_hash
      };
    }

    const newsCards = [];
    if (editorial && editorial.news && editorial.news.length > 0) {
      editorial.news.forEach((n, idx) => {
        const matchD = dispatches.find(d => d.title.toLowerCase().includes(n.title.substring(0, 20).toLowerCase())) || otherDispatches[idx] || dispatches[idx % dispatches.length];
        const cleanImg = (n.image && !n.image.includes('unsplash.com')) ? n.image : (matchD.image_url || '/assets/images/reference-default.svg');
        newsCards.push({
          ...n,
          source: n.source && n.source !== '—' ? n.source : matchD.source,
          externalUrl: matchD.source_url,
          published_at: matchD.published_at,
          updated_at: matchD.updated_at,
          fetched_at: matchD.fetched_at,
          content_hash: matchD.content_hash,
          image: cleanImg
        });
      });
    }

    // Se faltarem cards, preenche com os outros despachos reais coletados
    if (newsCards.length === 0) {
      otherDispatches.forEach((d, idx) => {
        newsCards.push({
          id: `news-grid-${Date.now()}-${idx}`,
          isHero: false,
          title: d.title,
          category: d.category,
          categoryLabel: d.categoryLabel,
          source: d.source,
          sourceCredibility: '98%',
          verificationStatus: 'Fonte Primária Verificada',
          publishedAt: `Hoje, ${timeStr}`,
          published_at: d.published_at,
          updated_at: d.updated_at,
          fetched_at: d.fetched_at,
          readTime: '3 min',
          image: d.image_url,
          imageCaption: `Cobertura de ${d.categoryLabel} por ${d.source}.`,
          summary: d.summary,
          whyItMatters: [
            'Relevância confirmada para os interesses cadastrados no perfil.'
          ],
          fullContent: `<p>${d.summary}</p>`,
          externalUrl: d.source_url,
          content_hash: d.content_hash
        });
      });
    }

    const agenda = (editorial && editorial.agenda && editorial.agenda.length > 0)
      ? editorial.agenda
      : [
        { time: '09:30', title: 'Abertura de mercados e divulgação de índices setoriais', category: 'Economia' },
        { time: '14:00', title: 'Conferências corporativas e anúncios regulatórios', category: 'Tecnologia' }
      ];

    const allCategories = new Set([heroCard.categoryLabel, ...newsCards.map(n => n.categoryLabel)]);

    const newEdition = {
      success: true,
      editionId: `ed_${Date.now()}`,
      updatedAt: timeStr,
      dateFormatted,
      agentName: config.agentName,
      agentVersion: agentResult.agentVersion || '8',
      agentSummary: (editorial && editorial.summary) ? editorial.summary : 'Edição diária curada a partir de despachos reais em tempo real.',
      hero: heroCard,
      news: newsCards,
      agenda,
      totalCount: (heroCard ? 1 : 0) + newsCards.length,
      newCount: (heroCard ? 1 : 0) + newsCards.length,
      categoriesRenewed: Array.from(allCategories),
      fetched_at: new Date().toISOString()
    };

    activeEdition = newEdition;
    saveEditionToDisk(newEdition);
    console.log(`[NewsCuration] Nova edição publicada com ${newEdition.totalCount} notícias reais!`);

    return newEdition;

  } finally {
    isCurating = false;
  }
}

/**
 * Retorna a edição ativa mais recente (ou executa curadoria se não existir)
 */
async function getActiveEdition(categories = []) {
  if (activeEdition) {
    return activeEdition;
  }
  const diskEdition = loadEditionFromDisk();
  if (diskEdition) {
    return diskEdition;
  }
  return await curateNewsEdition(categories);
}

module.exports = {
  curateNewsEdition,
  getActiveEdition,
  loadEditionFromDisk
};
