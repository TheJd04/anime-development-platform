/* ============================================================
   GOOGLE AUTH — Google Sign-In & One-Tap SDK Integration
   ============================================================ */

const GoogleAuth = {
  init() {
    if (window.google && google.accounts && google.accounts.id) {
      try {
        google.accounts.id.initialize({
          client_id: "109827364501-sampleclientid.apps.googleusercontent.com",
          callback: this.handleCredentialResponse.bind(this)
        });
      } catch (e) {}
    }
  },

  promptLogin() {
    if (window.google && google.accounts && google.accounts.id) {
      try {
        google.accounts.id.prompt();
      } catch (err) {
        this.mockGoogleSignIn();
      }
    } else {
      this.mockGoogleSignIn();
    }
  },

  mockGoogleSignIn() {
    const googleUser = {
      name: "Google Trainer",
      email: "trainer@gmail.com",
      avatarUrl: "https://lh3.googleusercontent.com/a/default-user=s96-c"
    };

    const nameInput = document.getElementById('onboarding-name');
    if (nameInput) nameInput.value = googleUser.name;

    const data = Storage.load();
    data.profile.name = googleUser.name;
    data.profile.email = googleUser.email;
    data.profile.avatarUrl = googleUser.avatarUrl;
    Storage.save(data);

    if (typeof App !== 'undefined') {
      App.showToast(`🌐 Google Account Connected: ${googleUser.name}`, 'success');
    }
  },

  handleCredentialResponse(response) {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const name = payload.name || payload.given_name || 'Google Warrior';
      const email = payload.email || '';
      const avatarUrl = payload.picture || '';

      const nameInput = document.getElementById('onboarding-name');
      if (nameInput) nameInput.value = name;

      const data = Storage.load();
      data.profile.name = name;
      data.profile.email = email;
      data.profile.avatarUrl = avatarUrl;
      Storage.save(data);

      if (typeof App !== 'undefined') {
        App.showToast(`🌐 Welcome back, ${name}!`, 'success');
      }
    } catch (e) {
      this.mockGoogleSignIn();
    }
  }
};

const App = {
  currentScreen: null,

  init() {
    GoogleAuth.init();

    // Check onboarding
    if (!Storage.isOnboarded()) {
      // Apply a default theme for onboarding visuals
      applyTheme('sololeveling');
      this.navigate('onboarding');
      Onboarding.init();
    } else {
      const data = Storage.load();
      applyTheme(data.theme);
      Storage.checkDayRollover();
      Storage.rolloverGoals();
      this.navigate('dashboard');
    }

    // Initialize NavDevice, Audio Engine, and CursorPet Companion
    NavDevice.init();
    AudioEngine.init();
    if (typeof CursorPet !== 'undefined') CursorPet.init();

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  },

  /**
   * Navigate to a screen
   */
  navigate(screen) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(el => {
      el.classList.remove('active');
    });

    // Show target screen
    const target = document.getElementById(`screen-${screen}`);
    if (target) {
      target.classList.add('active');
    }

    this.currentScreen = screen;

    // Update nav device
    this.updateNav();

    // Initialize screen module
    switch (screen) {
      case 'onboarding':
        Onboarding.init();
        break;
      case 'dashboard':
        Dashboard.init();
        break;
      case 'map':
        MapController.init();
        break;
      case 'health':
        HealthModule.init();
        break;
      case 'spells':
        SpellsModule.init();
        break;
      case 'watch':
        WatchModule.init();
        break;
      case 'diary':
        Diary.init();
        break;
      case 'guild':
        Guild.init();
        break;
      case 'collection':
        Collection.init();
        break;
      case 'profile':
        Profile.init();
        break;
    }

    // Play theme background music
    const data = Storage.load();
    if (data.theme && screen !== 'onboarding') {
      AudioEngine.startThemeMusic(data.theme);
    }


    // Scroll to top
    window.scrollTo(0, 0);
  },

  /**
   * Update navigation device state
   */
  updateNav() {
    const container = document.getElementById('nav-device-container');

    if (this.currentScreen === 'onboarding') {
      if (container) container.classList.add('hidden');
      return;
    }

    if (container) {
      container.classList.remove('hidden');
      NavDevice.render();
      NavDevice.updateActiveLink(this.currentScreen);
      if (typeof CursorPet !== 'undefined') CursorPet.updateTheme();
    }
  },


  /**
   * Show a toast notification
   */
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      xp: '⚡',
      creature: '🎉',
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
      toast.remove();
    }, 3000);
  },

  /**
   * Show XP popup animation
   */
  showXpPopup(amount) {
    const popup = document.createElement('div');
    popup.className = 'xp-popup';
    popup.textContent = `+${amount} XP`;
    popup.style.left = `${Math.random() * 60 + 20}%`;
    popup.style.top = '50%';
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 1200);
  },

  /**
   * Show rank up flash
   */
  showRankUp(rankName) {
    // Flash overlay
    const overlay = document.createElement('div');
    overlay.className = 'rank-up-overlay';
    document.body.appendChild(overlay);
    setTimeout(() => overlay.remove(), 1200);

    // Toast
    setTimeout(() => {
      this.showToast(`🎊 RANK UP! You are now: ${rankName}!`, 'success');
    }, 600);
  },

  /**
   * Show a modal dialog
   */
  showModal(title, bodyHtml, onRender) {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" id="modal-close-btn">✕</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
      </div>
    `;

    overlay.classList.add('open');

    // Close button
    document.getElementById('modal-close-btn')?.addEventListener('click', () => this.closeModal());

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.closeModal();
    });

    // Run onRender callback
    if (onRender) onRender();
  },

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('open');
  },

  /**
   * Generate floating particles in background
   */
  generateParticles() {
    const container = document.getElementById('bg-particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 12}s`;
      particle.style.animationDuration = `${10 + Math.random() * 15}s`;
      container.appendChild(particle);
    }
  },
};

/* ============================================================
   BOOT — Start the app when DOM is ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

