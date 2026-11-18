/**
 * ANTI-FEED AI — News Search Service (services/newsSearchService.js)
 * Conecta e consome fontes jornalísticas reais em tempo real via Feeds RSS oficiais
 * cobrindo as 8 categorias: Tecnologia, Economia, Política, Mundo, Automobilismo, Esportes, Ciência e Viagens.
 */

const crypto = require('crypto');
const { resolveCategorySlug, resolveCategoryImage } = require('./curationParser');

// Mapeamento de endpoints de busca e tópicos de notícias em tempo real
const TOPIC_FEEDS = {
  tecnologia: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=pt-BR&gl=BR&ceid=BR:pt-419',
  economia: 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=pt-BR&gl=BR&ceid=BR:pt-419',
  politica: 'https://news.google.com/rss/search?q=pol%C3%ADtica+Brasil+when%3A2d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  mundo: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=pt-BR&gl=BR&ceid=BR:pt-419',
  automobilismo: 'https://news.google.com/rss/search?q=F%C3%B3rmula+1+OR+MotoGP+OR+WEC+when%3A2d&hl=pt-BR&gl=BR&ceid=BR:pt-419',
  esportes: 'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=pt-BR&gl=BR&ceid=BR:pt-419',
  ciencia: 'https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=pt-BR&gl=BR&ceid=BR:pt-419',
  viagens: 'https://news.google.com/rss/search?q=viagens+turismo+aviacao+when%3A3d&hl=pt-BR&gl=BR&ceid=BR:pt-419'
};

const CATEGORY_LABELS = {
  tecnologia: 'Tecnologia & IA',
  economia: 'Economia & Finanças',
  politica: 'Política Nacional',
  mundo: 'Geopolítica Global',
  automobilismo: 'Automobilismo & F1',
  esportes: 'Esportes de Alto Rendimento',
  ciencia: 'Ciência & Inovação',
  viagens: 'Viagens & Turismo'
};

/**
 * Faz requisição HTTP segura a um feed RSS
 */
async function fetchFeedXml(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[NewsSearch] Feed retornou status ${res.status}: ${url}`);
      return null;
    }
    return await res.text();
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn(`[NewsSearch] Erro ao buscar feed ${url}:`, err.message);
    return null;
  }
}

/**
 * Parser de XML de feed RSS / Atom em Vanilla JavaScript
 */
function parseRssItems(xmlText, categoryKey) {
  if (!xmlText) return [];
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const block = match[1];

    // Extrai título
    const titleMatch = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/i) || block.match(/<title>(.*?)<\/title>/i);
    let rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    if (!rawTitle) continue;

    // Extrai link
    const linkMatch = block.match(/<link>(.*?)<\/link>/i);
    const link = linkMatch ? linkMatch[1].trim() : '';

    // Extrai data de publicação
    const pubDateMatch = block.match(/<pubDate>(.*?)<\/pubDate>/i);
    const pubDateStr = pubDateMatch ? pubDateMatch[1].trim() : new Date().toUTCString();
    const pubDate = new Date(pubDateStr);
    const publishedAtISO = !isNaN(pubDate.getTime()) ? pubDate.toISOString() : new Date().toISOString();

    // Extrai fonte
    const sourceMatch = block.match(/<source[^>]*>(.*?)<\/source>/i);
    let source = sourceMatch ? sourceMatch[1].trim() : '';

    // Se o título contiver " - NomeDaFonte", limpa o título e extrai a fonte se vazia
    const lastDash = rawTitle.lastIndexOf(' - ');
    if (lastDash !== -1 && lastDash > rawTitle.length - 40) {
      if (!source) {
        source = rawTitle.substring(lastDash + 3).trim();
      }
      rawTitle = rawTitle.substring(0, lastDash).trim();
    }
    if (!source) source = 'Veículo Verificado';

    // Extrai descrição / resumo
    const descMatch = block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/i) || block.match(/<description>(.*?)<\/description>/i);
    let summary = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim() : '';
    if (summary.length > 280) {
      summary = summary.substring(0, 277) + '...';
    }

    // Calcula Hash do conteúdo para controle de atualidade e deduplicação
    const hash = crypto.createHash('sha256')
      .update(`${rawTitle}|${source}|${publishedAtISO}`)
      .digest('hex');

    const catSlug = resolveCategorySlug(categoryKey);
    const nowISO = new Date().toISOString();

    items.push({
      title: rawTitle,
      source,
      source_url: link,
      published_at: publishedAtISO,
      updated_at: nowISO,
      fetched_at: nowISO,
      category: catSlug,
      categoryLabel: CATEGORY_LABELS[catSlug] || 'Geral',
      image_url: resolveCategoryImage(catSlug),
      summary: summary || `Notícia apurada e veiculada por ${source}.`,
      content_hash: hash
    });
  }

  return items;
}

/**
 * Coleta despachos jornalísticos reais recentes para uma lista de categorias
 */
async function fetchTopDispatches(requestedCategories = [], limitPerCategory = 3) {
  const categories = Array.isArray(requestedCategories) && requestedCategories.length > 0
    ? requestedCategories.map(c => resolveCategorySlug(c))
    : ['tecnologia', 'economia', 'automobilismo', 'mundo', 'politica'];

  const uniqueCategories = Array.from(new Set(categories));
  const allDispatches = [];
  const seenHashes = new Set();

  const fetchPromises = uniqueCategories.map(async (cat) => {
    const feedUrl = TOPIC_FEEDS[cat] || TOPIC_FEEDS.tecnologia;
    const xml = await fetchFeedXml(feedUrl);
    if (!xml) return [];
    const items = parseRssItems(xml, cat);
    return items.slice(0, limitPerCategory);
  });

  const results = await Promise.all(fetchPromises);
  for (const group of results) {
    for (const item of group) {
      if (!seenHashes.has(item.content_hash)) {
        seenHashes.add(item.content_hash);
        allDispatches.push(item);
      }
    }
  }

  // Ordena por data mais recente primeiro
  allDispatches.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

  return allDispatches;
}

module.exports = {
  TOPIC_FEEDS,
  CATEGORY_LABELS,
  fetchFeedXml,
  parseRssItems,
  fetchTopDispatches
};
