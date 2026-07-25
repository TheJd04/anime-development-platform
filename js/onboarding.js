/* ============================================================
   ONBOARDING — Universe selection + name input
   ============================================================ */

const Onboarding = {
  selectedTheme: null,

  init() {
    this.renderUniverseCards();
    this.bindEvents();
  },

  renderUniverseCards() {
    const grid = document.getElementById('universe-grid');
    if (!grid) return;

    grid.innerHTML = Object.values(THEMES).map(theme => `
      <div class="universe-card" data-universe="${theme.id}" id="universe-${theme.id}">
        <span class="universe-emoji">${theme.emoji}</span>
        <div class="universe-name">${theme.name}</div>
        <div class="universe-desc">${theme.tagline}</div>
      </div>
    `).join('');
  },

  bindEvents() {
    // Universe card selection
    const grid = document.getElementById('universe-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const card = e.target.closest('.universe-card');
        if (!card) return;

        // Remove previous selection
        grid.querySelectorAll('.universe-card').forEach(c => c.classList.remove('selected'));

        // Select this one
        card.classList.add('selected');
        this.selectedTheme = card.dataset.universe;

        // Preview theme colors
        applyTheme(this.selectedTheme);
      });
    }

    // Start button
    const startBtn = document.getElementById('onboarding-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.completeOnboarding());
    }

    // Enter key on name input
    const nameInput = document.getElementById('onboarding-name');
    if (nameInput) {
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.completeOnboarding();
      });
    }
  },

  completeOnboarding() {
    const nameInput = document.getElementById('onboarding-name');
    const name = nameInput ? nameInput.value.trim() : '';

    if (!name) {
      nameInput?.classList.add('animate-shake');
      setTimeout(() => nameInput?.classList.remove('animate-shake'), 500);
      App.showToast('Enter your warrior name!', 'error');
      return;
    }

    if (!this.selectedTheme) {
      App.showToast('Choose your universe first!', 'error');
      return;
    }

    // Save to storage
    const data = Storage.load();
    data.theme = this.selectedTheme;
    data.profile.name = name;
    data.profile.createdAt = new Date().toISOString();
    data.goals.lastGoalDate = new Date().toDateString();
    Storage.save(data);

    // Apply theme
    applyTheme(this.selectedTheme);

    // Transition to dashboard
    App.navigate('dashboard');
    App.showToast(`Welcome, ${name}! Your journey begins.`, 'success');
  },
};
