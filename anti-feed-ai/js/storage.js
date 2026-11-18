/**
 * ANTI-FEED AI - Storage Manager (storage.js)
 * Gerencia persistência local no localStorage com segurança e reatividade
 */

const StorageKeys = {
  THEME: 'antifeed_theme',
  PREFERENCES: 'antifeed_preferences',
  SPORTS: 'antifeed_sports',
  FAVORITES: 'antifeed_favorites',
  HISTORY: 'antifeed_history',
  SETTINGS: 'antifeed_settings',
  CHAT: 'antifeed_chat_history'
};

const DefaultPreferences = {
  intensity: 'equilibrada', // 'essencial', 'equilibrada', 'completa'
  categories: [
    'tecnologia',
    'geopolitica',
    'economia',
    'esportes',
    'ciencia',
    'sustentabilidade'
  ],
  avoidTopics: ['Fofocas de celebridades', 'Sensacionalismo policial', 'Reality shows'],
  language: 'pt-BR',
  deliveryTime: '07:00'
};

const DefaultSports = {
  modalities: ['automobilismo', 'motovelocidade', 'futebol', 'basquete'],
  competitions: ['f1', 'motogp', 'wec', 'worldsbk', 'champions_league', 'nba'],
  favorites: ['Ferrari', 'Ducati Lenovo', 'Real Madrid', 'Ayrton Senna Legacy']
};

const DefaultSettings = {
  theme: 'light',
  audioDigest: true,
  dailyPush: true,
  fontSize: 'medium',
  compactMode: false
};

const Storage = {
  get(key, fallback = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (err) {
      console.warn(`[ANTI-FEED Storage] Erro ao ler a chave "${key}":`, err);
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent('antifeed-storage-updated', { detail: { key, value } }));
      return true;
    } catch (err) {
      console.error(`[ANTI-FEED Storage] Falha ao gravar a chave "${key}":`, err);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error(`[ANTI-FEED Storage] Falha ao remover a chave "${key}":`, err);
      return false;
    }
  },

  // Helpers de domínio
  getPreferences() {
    return this.get(StorageKeys.PREFERENCES, DefaultPreferences);
  },

  setPreferences(prefs) {
    return this.set(StorageKeys.PREFERENCES, { ...DefaultPreferences, ...prefs });
  },

  getSportsPreferences() {
    return this.get(StorageKeys.SPORTS, DefaultSports);
  },

  setSportsPreferences(sports) {
    return this.set(StorageKeys.SPORTS, sports);
  },

  getTheme() {
    const saved = localStorage.getItem(StorageKeys.THEME);
    if (saved) return saved;
    // Detecta preferência do SO se não houver preferência salva
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  },

  setTheme(theme) {
    localStorage.setItem(StorageKeys.THEME, theme);
    document.body.classList.toggle('dark-theme', theme === 'dark');
    window.dispatchEvent(new CustomEvent('antifeed-theme-changed', { detail: { theme } }));
  },

  getFavorites() {
    return this.get(StorageKeys.FAVORITES, []);
  },

  toggleFavorite(newsId) {
    const favs = this.getFavorites();
    const index = favs.indexOf(newsId);
    let isFav = false;
    if (index > -1) {
      favs.splice(index, 1);
      isFav = false;
    } else {
      favs.push(newsId);
      isFav = true;
    }
    this.set(StorageKeys.FAVORITES, favs);
    return isFav;
  },

  isFavorite(newsId) {
    const favs = this.getFavorites();
    return favs.includes(newsId);
  },

  resetAll() {
    try {
      localStorage.removeItem(StorageKeys.PREFERENCES);
      localStorage.removeItem(StorageKeys.SPORTS);
      localStorage.removeItem(StorageKeys.FAVORITES);
      localStorage.removeItem(StorageKeys.HISTORY);
      localStorage.removeItem(StorageKeys.CHAT);
      localStorage.removeItem(StorageKeys.SETTINGS);
      return true;
    } catch (e) {
      return false;
    }
  }
};

window.StorageManager = Storage;

