/**
 * ANTI-FEED AI - Preferences Manager (preferences.js)
 * Gerencia a seleção das 21 categorias, níveis de intensidade,
 * tópicos a evitar e filtros de ruído no localStorage
 */

const AvailableCategories = [
  { id: 'politica', name: 'Política', icon: '🏛️' },
  { id: 'economia', name: 'Economia e Mercado Financeiro', icon: '📈' },
  { id: 'negocios', name: 'Negócios e Empreendedorismo', icon: '💼' },
  { id: 'tecnologia', name: 'Tecnologia e Inteligência Artificial', icon: '🤖' },
  { id: 'ciencia', name: 'Ciência e Inovação', icon: '🔬' },
  { id: 'saude', name: 'Saúde e Bem-estar', icon: '🩺' },
  { id: 'educacao', name: 'Educação', icon: '🎓' },
  { id: 'sustentabilidade', name: 'Meio Ambiente e Sustentabilidade', icon: '🌱' },
  { id: 'geopolitica', name: 'Geopolítica e Relações Internacionais', icon: '🌐' },
  { id: 'brasil', name: 'Brasil', icon: '🇧🇷' },
  { id: 'mundo', name: 'Mundo', icon: '🗺️' },
  { id: 'esportes', name: 'Esportes, Automobilismo & Motos', icon: '🏎️' },
  { id: 'cultura', name: 'Cultura e Entretenimento', icon: '🎭' },
  { id: 'sociedade', name: 'Sociedade e Comportamento', icon: '👥' },
  { id: 'direito', name: 'Direito e Legislação', icon: '⚖️' },
  { id: 'imobiliario', name: 'Mercado Imobiliário', icon: '🏢' },
  { id: 'agronegocio', name: 'Agronegócio', icon: '🌾' },
  { id: 'carreira', name: 'Carreira e Desenvolvimento Profissional', icon: '🚀' },
  { id: 'ciberseguranca', name: 'Segurança da Informação & Cibernética', icon: '🛡️' },
  { id: 'espaco', name: 'Espaço e Astronomia', icon: '🔭' },
  { id: 'filosofia', name: 'Filosofia e Pensamento Contemporâneo', icon: '📚' }
];

const PreferencesModule = {
  currentPrefs: {},

  init() {
    this.currentPrefs = window.StorageManager.getPreferences();
    this.renderCategoriesGrid();
    this.setupIntensityCards();
    this.renderAvoidTopics();
    this.setupEventListeners();
  },

  renderCategoriesGrid() {
    const container = document.getElementById('categories-selection-grid');
    if (!container) return;

    const selectedList = this.currentPrefs.categories || [];

    container.innerHTML = AvailableCategories.map(cat => {
      const isSelected = selectedList.includes(cat.id);
      return `
        <div class="category-select-card ${isSelected ? 'selected' : ''}" data-cat-id="${cat.id}">
          <div class="category-select-info">
            <span class="category-icon">${cat.icon}</span>
            <span class="category-select-name">${cat.name}</span>
          </div>
          <div class="category-checkbox">${isSelected ? '✓' : ''}</div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.category-select-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-cat-id');
        const index = this.currentPrefs.categories.indexOf(catId);

        if (index > -1) {
          this.currentPrefs.categories.splice(index, 1);
          card.classList.remove('selected');
          card.querySelector('.category-checkbox').textContent = '';
        } else {
          this.currentPrefs.categories.push(catId);
          card.classList.add('selected');
          card.querySelector('.category-checkbox').textContent = '✓';
        }

        this.updateStatsPreview();
      });
    });

    this.updateStatsPreview();
  },

  setupIntensityCards() {
    const cards = document.querySelectorAll('.intensity-card');
    const current = this.currentPrefs.intensity || 'equilibrada';

    cards.forEach(card => {
      const level = card.getAttribute('data-intensity');
      card.classList.toggle('active', level === current);

      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.currentPrefs.intensity = level;
      });
    });
  },

  renderAvoidTopics() {
    const tagsContainer = document.getElementById('avoid-tags-container');
    if (!tagsContainer) return;

    const topics = this.currentPrefs.avoidTopics || [];
    tagsContainer.innerHTML = topics.map((t, idx) => `
      <span class="tag-item">
        <span>${t}</span>
        <button class="tag-remove-btn" data-index="${idx}" aria-label="Remover">✕</button>
      </span>
    `).join('');

    tagsContainer.querySelectorAll('.tag-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
        this.currentPrefs.avoidTopics.splice(index, 1);
        this.renderAvoidTopics();
      });
    });
  },

  setupEventListeners() {
    const addTopicBtn = document.getElementById('add-avoid-topic-btn');
    const topicInput = document.getElementById('avoid-topic-input');
    const saveBtn = document.getElementById('save-preferences-btn');
    const resetBtn = document.getElementById('reset-preferences-btn');
    const timeInput = document.getElementById('delivery-time-input');

    if (timeInput && this.currentPrefs.deliveryTime) {
      timeInput.value = this.currentPrefs.deliveryTime;
      timeInput.addEventListener('change', () => {
        this.currentPrefs.deliveryTime = timeInput.value;
      });
    }

    if (addTopicBtn && topicInput) {
      const addTopic = () => {
        const val = topicInput.value.trim();
        if (val && !this.currentPrefs.avoidTopics.includes(val)) {
          this.currentPrefs.avoidTopics.push(val);
          topicInput.value = '';
          this.renderAvoidTopics();
        }
      };

      addTopicBtn.addEventListener('click', addTopic);
      topicInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          addTopic();
        }
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        window.StorageManager.setPreferences(this.currentPrefs);
        window.showToast('Preferências salvas com sucesso! Seu jornal matinal será calibrado com essas diretrizes.', 'success');
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Deseja restaurar as preferências padrão do ANTI-FEED AI?')) {
          this.currentPrefs = { ...DefaultPreferences };
          window.StorageManager.setPreferences(this.currentPrefs);
          this.renderCategoriesGrid();
          this.setupIntensityCards();
          this.renderAvoidTopics();
          if (timeInput) timeInput.value = this.currentPrefs.deliveryTime;
          window.showToast('Preferências restauradas para os padrões recomendados.', 'info');
        }
      });
    }
  },

  updateStatsPreview() {
    const counter = document.getElementById('selected-categories-count');
    if (counter) {
      const count = this.currentPrefs.categories.length;
      counter.textContent = `${count} de ${AvailableCategories.length} temas selecionados`;
    }
  }
};

window.PreferencesEngine = PreferencesModule;

