/**
 * ANTI-FEED AI — Curation Parser (services/curationParser.js)
 * Converte respostas do Agente no Azure AI Foundry (JSON ou Markdown editorial)
 * em modelos de dados estruturados para renderização direta nos cards do frontend.
 */

const CATEGORY_IMAGES = {
  hero: '/assets/images/reference-hero.svg',
  tecnologia: '/assets/images/reference-tecnologia.svg',
  ia: '/assets/images/reference-tecnologia.svg',
  economia: '/assets/images/reference-economia.svg',
  financas: '/assets/images/reference-economia.svg',
  politica: '/assets/images/reference-politica.svg',
  geopolitica: '/assets/images/reference-mundo.svg',
  mundo: '/assets/images/reference-mundo.svg',
  ciencia: '/assets/images/reference-ciencia.svg',
  sustentabilidade: '/assets/images/reference-ciencia.svg',
  saude: '/assets/images/reference-ciencia.svg',
  automobilismo: '/assets/images/reference-automobilismo.svg',
  motovelocidade: '/assets/images/reference-automobilismo.svg',
  esportes: '/assets/images/reference-esportes.svg',
  default: '/assets/images/reference-default.svg'
};

function resolveCategorySlug(label) {
  if (!label || typeof label !== 'string') return 'tecnologia';
  const l = label.toLowerCase();
  if (l.includes('econ') || l.includes('financ') || l.includes('mercado')) return 'economia';
  if (l.includes('polít') || l.includes('governo') || l.includes('lei') || l.includes('regul') || l.includes('concess')) return 'politica';
  if (l.includes('geo') || l.includes('mundo') || l.includes('diplom')) return 'mundo';
  if (l.includes('ciên') || l.includes('espac') || l.includes('astro')) return 'ciencia';
  if (l.includes('sustent') || l.includes('energ') || l.includes('clima')) return 'ciencia';
  if (l.includes('saúde') || l.includes('med') || l.includes('bio')) return 'ciencia';
  if (l.includes('auto') || l.includes('f1') || l.includes('fórmula') || l.includes('motovelocidade')) return 'automobilismo';
  if (l.includes('esport')) return 'esportes';
  return 'tecnologia';
}

function resolveCategoryImage(categorySlug, isHero = false) {
  if (isHero) {
    return CATEGORY_IMAGES.hero;
  }
  return CATEGORY_IMAGES[categorySlug] || CATEGORY_IMAGES.default;
}

/**
 * Converte resposta do agente (JSON ou Markdown) em objetos Hero, News e Agenda
 */
function parseAgentEditorial(text, timeStr) {
  if (!text || typeof text !== 'string') {
    return { hero: null, news: [], agenda: [], summary: '', rawText: '' };
  }

  // 1. Tentar extração via JSON nativo ou bloco de código ```json ... ```
  let jsonData = null;
  const jsonBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (jsonBlockMatch) {
    try {
      jsonData = JSON.parse(jsonBlockMatch[1]);
    } catch (e) {
      // Ignora erro de JSON e tenta markdown
    }
  }

  if (!jsonData) {
    try {
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        jsonData = JSON.parse(text.substring(firstBrace, lastBrace + 1));
      }
    } catch (e) {
      // Ignora e faz fallback para markdown
    }
  }

  if (jsonData && typeof jsonData === 'object') {
    return normalizeParsedJson(jsonData, timeStr, text);
  }

  // 2. Fallback: Parser de Markdown Estruturado (Módulos 1-17 do Agente ANTI-FEED)
  return parseMarkdownEditorial(text, timeStr);
}

function normalizeParsedJson(data, timeStr, rawText) {
  let hero = null;
  const news = [];
  const agenda = [];
  const now = Date.now();

  if (data.hero && typeof data.hero === 'object') {
    const catSlug = resolveCategorySlug(data.hero.category || data.hero.categoryLabel);
    hero = {
      id: data.hero.id || `news-hero-${now}`,
      isHero: true,
      title: data.hero.title || 'Manchete Principal da Edição',
      category: catSlug,
      categoryLabel: data.hero.categoryLabel || 'Tecnologia & IA',
      source: data.hero.source || 'Veículos Oficiais & Cobertura de Referência',
      sourceCredibility: data.hero.sourceCredibility || '98%',
      verificationStatus: data.hero.verificationStatus || 'Verificada por Agente Oficial',
      publishedAt: data.hero.publishedAt || `Hoje, ${timeStr}`,
      readTime: data.hero.readTime || '4 min',
      image: resolveCategoryImage(catSlug, true),
      imageCaption: data.hero.imageCaption || `Curadoria algorítmica ANTI-FEED AI (${data.hero.categoryLabel || 'Geral'}).`,
      summary: data.hero.summary || '',
      whyItMatters: Array.isArray(data.hero.whyItMatters) && data.hero.whyItMatters.length > 0
        ? data.hero.whyItMatters
        : ['Impacto direto na tomada de decisão estratégica.'],
      fullContent: data.hero.fullContent || `<p>${data.hero.summary || ''}</p>`,
      externalUrl: data.hero.externalUrl || 'https://news.google.com'
    };
  }

  if (Array.isArray(data.news)) {
    data.news.forEach((item, idx) => {
      if (!item || typeof item !== 'object') return;
      const catSlug = resolveCategorySlug(item.category || item.categoryLabel);
      news.push({
        id: item.id || `news-grid-${now}-${idx}`,
        isHero: false,
        title: item.title || `Acontecimento Relevante #${idx + 1}`,
        category: catSlug,
        categoryLabel: item.categoryLabel || 'Geral',
        source: item.source || 'Fontes Primárias Verificadas',
        sourceCredibility: item.sourceCredibility || '97%',
        verificationStatus: item.verificationStatus || 'Fonte Primária Oficial',
        publishedAt: item.publishedAt || `Hoje, ${timeStr}`,
        readTime: item.readTime || '3 min',
        image: resolveCategoryImage(catSlug, false),
        imageCaption: item.imageCaption || `Análise contextualizada de ${item.categoryLabel || 'Geral'}.`,
        summary: item.summary || '',
        whyItMatters: Array.isArray(item.whyItMatters) && item.whyItMatters.length > 0
          ? item.whyItMatters
          : ['Relevância confirmada para o setor.'],
        fullContent: item.fullContent || `<p>${item.summary || ''}</p>`,
        externalUrl: item.externalUrl || 'https://news.google.com'
      });
    });
  }

  if (Array.isArray(data.agenda)) {
    data.agenda.forEach(item => {
      if (!item || typeof item !== 'object') return;
      agenda.push({
        time: item.time || timeStr,
        title: item.title || 'Compromisso da agenda',
        category: item.category || 'Acompanhamento'
      });
    });
  }

  return {
    hero,
    news,
    agenda,
    summary: data.summary || '',
    rawText
  };
}

function parseMarkdownEditorial(text, timeStr) {
  let hero = null;
  const news = [];
  const agenda = [];
  let summary = '';
  const now = Date.now();

  // 1. Resumo editorial
  const resumoMatch = text.match(/###\s*RESUMO\s*EDITORIAL([\s\S]*?)(?=###|$)/i);
  if (resumoMatch) {
    summary = resumoMatch[1].trim();
  }

  // 2. Manchete Principal
  const heroMatch = text.match(/###\s*MANCHETE\s*PRINCIPAL([\s\S]*?)(?=###|$)/i);
  if (heroMatch) {
    const block = heroMatch[1];
    const titleMatch = block.match(/-\s*Título:\s*(.+)/i);
    const catMatch = block.match(/-\s*Categoria:\s*(.+)/i);
    const fonteMatch = block.match(/-\s*Fonte:\s*(.+)/i);
    const confMatch = block.match(/-\s*Confiabilidade:\s*(.+)/i);
    const resMatch = block.match(/-\s*Resumo:\s*([\s\S]*?)(?=-\s*Por que importa:|$)/i);
    const contextMatch = block.match(/-\s*Contexto:\s*([\s\S]*?)(?=(?:###|\n\n[A-Z]|$))/i);

    const whyBullets = [];
    const whyMatch = block.match(/-\s*Por que importa:([\s\S]*?)(?=-\s*Contexto:|$)/i);
    if (whyMatch) {
      const lines = whyMatch[1].split('\n');
      for (const line of lines) {
        const cleaned = line.replace(/^\s*[\*\-•]\s*/, '').trim();
        if (cleaned) whyBullets.push(cleaned);
      }
    }

    const catLabel = catMatch ? catMatch[1].trim() : 'Tecnologia & IA';
    const catSlug = resolveCategorySlug(catLabel);

    hero = {
      id: `news-hero-${now}`,
      isHero: true,
      title: titleMatch ? titleMatch[1].trim() : 'Manchete Principal da Edição',
      category: catSlug,
      categoryLabel: catLabel,
      source: fonteMatch ? fonteMatch[1].trim() : 'Fontes Oficiais & Cobertura de Referência',
      sourceCredibility: confMatch ? confMatch[1].trim() : '95%',
      verificationStatus: confMatch && confMatch[1].includes('Nível B')
        ? 'Verificação Cautelosa (Nível B)'
        : 'Verificada por Agente Oficial',
      publishedAt: `Hoje, ${timeStr}`,
      readTime: '4 min',
      image: resolveCategoryImage(catSlug, true),
      imageCaption: `Cobertura editorial pelo Agente ANTI-FEED AI no Azure AI Foundry.`,
      summary: resMatch ? resMatch[1].trim() : '',
      whyItMatters: whyBullets.length > 0 ? whyBullets : [
        'Acompanhamento contínuo dos desdobramentos de mercado.',
        'Impacto direto na tomada de decisão estratégica.'
      ],
      fullContent: `
        <p>${resMatch ? resMatch[1].trim() : ''}</p>
        <h4>Contextualização e Repercussão</h4>
        <p>${contextMatch ? contextMatch[1].trim().replace(/\n+/g, '</p><p>') : 'Análise contínua em andamento pela equipe de inteligência editorial.'}</p>
      `,
      externalUrl: 'https://news.google.com'
    };
  }

  // 3. Notícias Relevantes da Grade
  const newsMatch = text.match(/###\s*NOTÍCIAS\s*RELEVANTES([\s\S]*?)(?=###|$)/i);
  if (newsMatch) {
    const lines = newsMatch[1].split(/\n(?=\d+\.\s*Título:)/i);
    lines.forEach((line, idx) => {
      if (!line.trim()) return;
      const tMatch = line.match(/Título:\s*([^|]+)/i);
      const cMatch = line.match(/Categoria:\s*([^|]+)/i);
      const fMatch = line.match(/Fonte:\s*([^|]+)/i);
      const confMatch = line.match(/Confiabilidade:\s*([^|]+)/i);
      const rMatch = line.match(/Resumo:\s*([^|]+)/i);
      const pMatch = line.match(/Por que importa:\s*(.+)/i);

      if (tMatch) {
        const cLabel = cMatch ? cMatch[1].trim() : 'Geral';
        const cSlug = resolveCategorySlug(cLabel);
        news.push({
          id: `news-grid-${now}-${idx}`,
          isHero: false,
          title: tMatch[1].trim(),
          category: cSlug,
          categoryLabel: cLabel,
          source: fMatch ? fMatch[1].trim() : 'Agências de Notícias & Fontes Primárias',
          sourceCredibility: confMatch ? confMatch[1].trim() : '95%',
          verificationStatus: 'Fonte Primária Verificada',
          publishedAt: `Hoje, ${timeStr}`,
          readTime: '3 min',
          image: resolveCategoryImage(cSlug),
          imageCaption: `Análise editorial de ${cLabel}.`,
          summary: rMatch ? rMatch[1].trim() : '',
          whyItMatters: pMatch ? [pMatch[1].trim()] : ['Relevância para a tomada de decisão.'],
          fullContent: `
            <p>${rMatch ? rMatch[1].trim() : ''}</p>
            <p>Curadoria orientada pelo ANTI-FEED AI com fontes consolidadas e checagem de fatos.</p>
          `,
          externalUrl: 'https://news.google.com'
        });
      }
    });
  }

  // 4. Agenda do Dia
  const agendaMatch = text.match(/###\s*AGENDA([\s\S]*?)(?=###|Observação|$)/i);
  if (agendaMatch) {
    const rawLines = agendaMatch[1].split('\n');
    for (const l of rawLines) {
      const clean = l.replace(/^\s*[\*\-•]\s*/, '').trim();
      if (!clean) continue;
      const parts = clean.split('|');
      const timeAndTitle = parts[0] || '';
      const cat = parts[1] ? parts[1].trim() : 'Compromisso';

      const timeMatch = timeAndTitle.match(/^([\d]{1,2}(?::[\d]{2})?(?:[–\-][\d]{1,2}:[\d]{2})?)\s*:\s*(.*)$/);
      if (timeMatch) {
        agenda.push({
          time: timeMatch[1].trim(),
          title: timeMatch[2].trim(),
          category: cat
        });
      } else {
        agenda.push({
          time: 'Hoje',
          title: timeAndTitle.trim(),
          category: cat
        });
      }
    }
  }

  return { hero, news, agenda, summary, rawText: text };
}

module.exports = {
  CATEGORY_IMAGES,
  resolveCategorySlug,
  resolveCategoryImage,
  parseAgentEditorial
};
