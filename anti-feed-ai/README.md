# ANTI-FEED AI — Jornal Pessoal Inteligente

> **"Menos informação. Mais inteligência sobre o que realmente importa."**

O **ANTI-FEED AI** é um assistente pessoal de inteligência e curadoria jornalística projetado para combater a exaustão digital causada pelo excesso de notícias, feeds infinitos, notificações invasivas e conteúdos sensacionalistas.

A plataforma substitui o hábito improdutivo de navegar por dezenas de portais por uma experiência diária, organizada, objetiva e personalizada, entregue no início de cada manhã.

---

## 🎯 Os Quatro Pilares do Produto

1. **Personalização Total:** O usuário escolhe exatamente os assuntos, modalidades esportivas e temas que deseja acompanhar.
2. **Inteligência Editorial:** Agentes de IA filtram o ruído, identificam acontecimentos com impacto real e eliminam caça-cliques.
3. **Curadoria Síntese:** Conteúdo contextualizado com "Por que importa para você", sem enrolação e sem rolagem infinita (*mindful completion*).
4. **Transparência e Confiabilidade:** Todas as notícias indicam suas fontes oficiais, índices de credibilidade e links para apuração original.

---

## 💻 Diretrizes Tecnológicas Estritas (Zero Frameworks)

O projeto foi construído **estritamente com padrões web nativos**:
- **HTML5 Semântico:** `<main>`, `<article>`, `<header>`, `<nav>`, `<aside>`, `<section>`
- **CSS3 Puro e Modular:** Variáveis CSS (`var(--...)`), CSS Grid, Flexbox, suporte nativo a temas Claro/Escuro (`body.dark-theme`)
- **JavaScript Puro (ES6+):** Sem uso de bundlers, compiladores ou bibliotecas externas.

> **Importante:** Não foram utilizados React, Next.js, Vue, Angular, TypeScript, Tailwind CSS, Bootstrap ou bibliotecas de terceiros.

---

## 📂 Estrutura de Arquivos

```text
anti-feed-ai/
│
├── index.html                 # Página Principal / Redirecionamento e Jornal Matinal
├── README.md                  # Documentação completa
│
├── pages/
│   ├── jornal.html            # Jornal Matinal com Destaque do Dia e Agenda Estratégica
│   ├── assistente.html        # Meu Assistente: Chat conversacional com Azure AI Foundry demo
│   ├── preferencias.html      # Minhas Preferências: 21 temas, 3 intensidades e filtros anti-ruído
│   ├── sports.html            # ANTI-FEED Sports: Automobilismo, Motovelocidade, Off-Road e Ligas
│   ├── fontes.html            # Fontes & Confiabilidade: Catálogo auditado e índices de credibilidade
│   └── configuracoes.html     # Configurações: Tema Claro/Escuro, switches, exportação JSON
│
├── css/
│   ├── global.css             # Variáveis de cores, fontes, escalas e reset tipográfico
│   ├── layout.css             # Sidebar fixa, cabeçalho sticky, grids e casca da aplicação
│   ├── components.css         # Cards editoriais 16:9, badges, botões, modais e toasts
│   ├── pages.css              # Estilos específicos para cada uma das 6 telas
│   └── responsive.css         # Adaptações para Tablet (<=1024px) e Mobile (<=768px)
│
└── js/
    ├── storage.js             # Gerenciamento reativo de estado no localStorage
    ├── navigation.js          # Navegação ativa, alternador de tema e menu mobile
    ├── news.js                # Base de dados jornalística, leitor modal e agenda
    ├── sports.js              # Hierarquia esportiva técnica, final de semana de corridas
    ├── assistant.js           # Mecanismo conversacional e sugestões de perguntas rápidas
    ├── preferences.js         # Seletor das 21 categorias, níveis de intensidade e tags de bloqueio
    ├── sources.js             # Catálogo de fontes transparentes com filtros
    ├── settings.js            # Sincronização de preferências, exportação e limpeza de dados
    └── app.js                 # Inicializador e coordenador global da aplicação
```

---

## 🏎️ ANTI-FEED SPORTS — Destaque Especial

A cobertura de esportes foi estruturada com especialização técnica e hierarquia clara:
- **Automobilismo:** Fórmula 1, WEC (Mundial de Endurance), IndyCar, Stock Car Pro Series, Formula E e IMSA.
- **Motovelocidade:** MotoGP (Principal), Moto2, Moto3, MotoE e WorldSBK (Superbike Mundial — tratado como categoria técnica autônoma de motos de produção).
- **Motociclismo Off-Road:** Rally Dakar, MXGP (Mundial de Motocross), AMA Supercross e Hard Enduro.
- **Destaque Diário:** *"O que mais importou no esporte hoje"* com telemetria, resultados e agenda dos fins de semana de corrida.

---

## 🌐 Integração Futura com Microsoft Azure AI Foundry

O sistema está estruturado com pontos de conexão preparados para integração com serviços corporativos de nuvem da Microsoft:
- **Azure OpenAI Service:** Conexão com modelos GPT-4o para geração de sínteses e respostas conversacionais no assistente.
- **Azure AI Search:** Recuperação aumentada por geração (RAG) para busca semântica em base vetorial de artigos de múltiplos veículos de imprensa.
- **Azure AI Content Safety:** Filtro automático contra desinformação, clickbait e linguagem sensacionalista.

*(Atualmente o projeto opera com dados demonstrativos curados, identificados de forma transparente).*

---

## 🚀 Como Executar o Projeto

Como a aplicação utiliza apenas tecnologias web nativas, você não precisa executar `npm install` nem configurar servidores complexos.

### Opção 1: Diretamente no Navegador
Dê um duplo clique no arquivo `anti-feed-ai/index.html` (ou no `index.html` na raiz do projeto) e ele abrirá instantaneamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).

### Opção 2: Com um Servidor Estático Local (Opcional)
Se desejar rodar via HTTP local:
```bash
# Com Python 3:
python -m http.server 8000

# Ou com a extensão "Live Server" do VS Code
```
Acesse `http://localhost:8000` no seu navegador.

