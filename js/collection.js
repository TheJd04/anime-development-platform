/* ============================================================
   COLLECTION — Creature capture & display
   ============================================================ */

const Collection = {
  init() {
    this.render();
  },

  render() {
    const data = Storage.load();
    const themeId = data.theme;
    const theme = THEMES[themeId];
    if (!theme) return;

    const el = document.getElementById('collection-content');
    if (!el) return;

    const allCreatures = CREATURES[themeId] || [];
    const capturedIds = new Set(data.collection.map(c => c.id));

    el.innerHTML = `
      <div class="collection-header">
        <h2>${theme.collectionName}</h2>
        <div class="collection-progress">
          ${capturedIds.size} / ${allCreatures.length} captured
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <div class="progress-label">
          <span class="progress-name">Collection Progress</span>
          <span class="progress-value">${allCreatures.length > 0 ? Math.round((capturedIds.size / allCreatures.length) * 100) : 0}%</span>
        </div>
        <div class="progress-bar progress-bar-lg">
          <div class="progress-fill" style="width: ${allCreatures.length > 0 ? (capturedIds.size / allCreatures.length) * 100 : 0}%"></div>
        </div>
      </div>

      <div class="tabs mb-md" id="collection-rarity-tabs">
        <div class="tab active" data-rarity="all">All</div>
        <div class="tab" data-rarity="common">Common</div>
        <div class="tab" data-rarity="rare">Rare</div>
        <div class="tab" data-rarity="epic">Epic</div>
        <div class="tab" data-rarity="legendary">Legendary</div>
      </div>

      <div class="collection-grid stagger-children" id="collection-grid">
        ${this.renderCreatureCards(allCreatures, capturedIds, 'all')}
      </div>
    `;

    // Rarity tab switching
    document.getElementById('collection-rarity-tabs')?.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      document.querySelectorAll('#collection-rarity-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('collection-grid').innerHTML = this.renderCreatureCards(allCreatures, capturedIds, tab.dataset.rarity);
    });

    // Creature card click
    document.getElementById('collection-grid')?.addEventListener('click', (e) => {
      const card = e.target.closest('.creature-card');
      if (!card || card.classList.contains('locked')) return;
      this.showCreatureDetail(card.dataset.creatureId);
    });
  },

  renderCreatureCards(allCreatures, capturedIds, filter) {
    let filtered = allCreatures;
    if (filter !== 'all') {
      filtered = allCreatures.filter(c => c.rarity === filter);
    }

    return filtered.map(creature => {
      const captured = capturedIds.has(creature.id);
      return `
        <div class="creature-card ${captured ? '' : 'locked'}" data-creature-id="${creature.id}">
          <span class="creature-emoji">${captured ? creature.emoji : '❓'}</span>
          <div class="creature-name">${captured ? creature.name : '???'}</div>
          <div class="creature-rarity ${creature.rarity}">${creature.rarity}</div>
        </div>
      `;
    }).join('');
  },

  showCreatureDetail(creatureId) {
    const data = Storage.load();
    const themeId = data.theme;
    const allCreatures = CREATURES[themeId] || [];
    const creature = allCreatures.find(c => c.id === creatureId);
    if (!creature) return;

    const captured = data.collection.find(c => c.id === creatureId);

    App.showModal(creature.name, `
      <div class="text-center mb-lg">
        <span style="font-size: 5rem; display: block;">${creature.emoji}</span>
        <div class="creature-rarity ${creature.rarity}" style="font-size: 0.9rem; margin-top: 8px;">
          ${creature.rarity.toUpperCase()}
        </div>
      </div>
      <p style="color: var(--text-muted); line-height: 1.7; text-align: center; margin-bottom: 16px;">
        ${creature.description}
      </p>
      ${captured ? `
        <div class="bracket-stat">
          <span class="bracket-stat-label">Captured</span>
          <span class="bracket-stat-value">${new Date(captured.capturedAt).toLocaleDateString()}</span>
        </div>
      ` : ''}
    `);
  },

  /**
   * Try to capture a random creature (called from dashboard on task completion)
   */
  tryCapture() {
    const data = Storage.load();
    const themeId = data.theme;
    const theme = THEMES[themeId];
    const allCreatures = CREATURES[themeId] || [];
    if (allCreatures.length === 0) return;

    const capturedIds = new Set(data.collection.map(c => c.id));

    // Filter uncaptured
    const uncaptured = allCreatures.filter(c => !capturedIds.has(c.id));
    if (uncaptured.length === 0) return; // All captured!

    // Rarity weights
    const weights = { common: 60, rare: 25, epic: 12, legendary: 3 };

    // Filter by weighted random rarity
    const roll = Math.random() * 100;
    let rarity;
    if (roll < weights.legendary) rarity = 'legendary';
    else if (roll < weights.legendary + weights.epic) rarity = 'epic';
    else if (roll < weights.legendary + weights.epic + weights.rare) rarity = 'rare';
    else rarity = 'common';

    let candidates = uncaptured.filter(c => c.rarity === rarity);
    // Fallback if no creatures of that rarity are uncaptured
    if (candidates.length === 0) candidates = uncaptured;

    const creature = candidates[Math.floor(Math.random() * candidates.length)];

    // Capture it!
    data.collection.push({
      id: creature.id,
      name: creature.name,
      rarity: creature.rarity,
      capturedAt: new Date().toISOString(),
    });
    Storage.save(data);

    // Show capture notification
    const rarityColors = {
      common: '#78909C',
      rare: '#42A5F5',
      epic: '#AB47BC',
      legendary: '#FFD600',
    };

    App.showToast(
      `${creature.emoji} Captured: ${creature.name} (${creature.rarity.toUpperCase()})!`,
      'creature'
    );

    // Bonus XP for captures
    const xpBonus = { common: 10, rare: 25, epic: 50, legendary: 150 };
    const result = Storage.addXp(xpBonus[creature.rarity] || 10);
    
    setTimeout(() => {
      App.showXpPopup(xpBonus[creature.rarity] || 10);
    }, 500);

    if (result.leveledUp) {
      setTimeout(() => App.showRankUp(result.newRank), 800);
    }
  },
};
