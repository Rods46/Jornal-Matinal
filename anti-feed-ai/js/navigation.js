/**
 * ANTI-FEED AI - Navigation & UI Shell Manager (navigation.js)
 * Controla sidebar, alternância de tema, menu responsivo mobile e notificações
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigationHighlight();
  initMobileDrawer();
  initToastContainer();
});

/**
 * Inicialização e persistência do tema (Light / Dark)
 */
function initTheme() {
  const currentTheme = window.StorageManager.getTheme();
  document.body.classList.toggle('dark-theme', currentTheme === 'dark');
  updateThemeButtonIcons(currentTheme);

  // Escuta botões de toggle
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      const newTheme = isDark ? 'light' : 'dark';
      window.StorageManager.setTheme(newTheme);
      updateThemeButtonIcons(newTheme);
      showToast(`Tema alterado para modo ${newTheme === 'dark' ? 'escuro' : 'claro'}`, 'info');
    });
  });
}

function updateThemeButtonIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle-icon');
  icons.forEach(icon => {
    if (theme === 'dark') {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
      icon.setAttribute('title', 'Alternar para Modo Claro');
    } else {
      icon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
      icon.setAttribute('title', 'Alternar para Modo Escuro');
    }
  });
}

/**
 * Destaca o link ativo na barra lateral baseado no pathname atual
 */
function initNavigationHighlight() {
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.sidebar-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const hrefClean = href.split('/').pop().replace('.html', '');
    const currentClean = currentPath.split('/').pop().replace('.html', '') || 'index';

    // Se estiver em index ou jornal
    if ((currentClean === '' || currentClean === 'index' || currentClean === 'jornal') &&
        (hrefClean === 'index' || hrefClean === 'jornal')) {
      link.classList.add('active');
    } else if (hrefClean && currentClean.includes(hrefClean)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Menu Drawer Responsivo para Mobile
 */
function initMobileDrawer() {
  const mobileToggle = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.app-sidebar');
  let overlay = document.querySelector('.mobile-sidebar-overlay');

  if (!overlay && sidebar) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-sidebar-overlay';
    document.body.appendChild(overlay);
  }

  if (mobileToggle && sidebar && overlay) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    });
  }
}

/**
 * Sistema Global de Notificações / Toasts
 */
function initToastContainer() {
  if (!document.getElementById('antifeed-toast-container')) {
    const container = document.createElement('div');
    container.id = 'antifeed-toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

window.showToast = function(message, type = 'info', duration = 3500) {
  const container = document.getElementById('antifeed-toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;

  const iconMap = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    danger: '❌'
  };

  toast.innerHTML = `
    <span class="toast-icon">${iconMap[type] || 'ℹ️'}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

