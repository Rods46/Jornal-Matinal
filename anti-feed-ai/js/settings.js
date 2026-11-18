/**
 * ANTI-FEED AI - Settings Manager (settings.js)
 * Gerencia preferências globais do aplicativo, sincronização de tema,
 * exportação de dados do usuário e limpeza de cache local.
 */

const SettingsModule = {
  settings: {},

  init() {
    this.settings = window.StorageManager.get(StorageKeys.SETTINGS, DefaultSettings);
    this.syncUI();
    this.setupListeners();
  },

  syncUI() {
    const themeSwitch = document.getElementById('setting-theme-switch');
    const audioSwitch = document.getElementById('setting-audio-switch');
    const pushSwitch = document.getElementById('setting-push-switch');
    const compactSwitch = document.getElementById('setting-compact-switch');

    const currentTheme = window.StorageManager.getTheme();
    if (themeSwitch) {
      themeSwitch.checked = currentTheme === 'dark';
    }

    if (audioSwitch) audioSwitch.checked = !!this.settings.audioDigest;
    if (pushSwitch) pushSwitch.checked = !!this.settings.dailyPush;
    if (compactSwitch) compactSwitch.checked = !!this.settings.compactMode;
  },

  setupListeners() {
    const themeSwitch = document.getElementById('setting-theme-switch');
    const audioSwitch = document.getElementById('setting-audio-switch');
    const pushSwitch = document.getElementById('setting-push-switch');
    const compactSwitch = document.getElementById('setting-compact-switch');

    const exportBtn = document.getElementById('export-data-btn');
    const clearStorageBtn = document.getElementById('clear-storage-btn');

    if (themeSwitch) {
      themeSwitch.addEventListener('change', () => {
        const newTheme = themeSwitch.checked ? 'dark' : 'light';
        window.StorageManager.setTheme(newTheme);
        window.showToast(`Tema alterado para ${newTheme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}`, 'info');
      });
    }

    if (audioSwitch) {
      audioSwitch.addEventListener('change', () => {
        this.settings.audioDigest = audioSwitch.checked;
        this.save();
        window.showToast('Previsão de síntese de voz atualizada', 'info');
      });
    }

    if (pushSwitch) {
      pushSwitch.addEventListener('change', () => {
        this.settings.dailyPush = pushSwitch.checked;
        this.save();
        window.showToast('Preferência de envio matinal registrada', 'info');
      });
    }

    if (compactSwitch) {
      compactSwitch.addEventListener('change', () => {
        this.settings.compactMode = compactSwitch.checked;
        this.save();
        window.showToast('Layout compacto atualizado', 'info');
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportUserData());
    }

    if (clearStorageBtn) {
      clearStorageBtn.addEventListener('click', () => {
        if (confirm('Atenção: Isso apagará todas as suas preferências, temas salvos e histórico local. Deseja continuar?')) {
          window.StorageManager.resetAll();
          window.showToast('Todos os dados locais foram redefinidos', 'warning');
          setTimeout(() => window.location.reload(), 1200);
        }
      });
    }
  },

  save() {
    window.StorageManager.set(StorageKeys.SETTINGS, this.settings);
  },

  exportUserData() {
    const backup = {
      app: 'ANTI-FEED AI',
      exportedAt: new Date().toISOString(),
      preferences: window.StorageManager.getPreferences(),
      sports: window.StorageManager.getSportsPreferences(),
      favorites: window.StorageManager.getFavorites(),
      settings: this.settings
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `antifeed-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    window.showToast('Backup das preferências exportado com sucesso!', 'success');
  }
};

window.SettingsEngine = SettingsModule;

