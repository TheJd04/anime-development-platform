/* ============================================================
   MAP — Interactive Anime World Map & Manga Panel Zoom
   ============================================================ */

const MapController = {
  currentZoom: 1,
  selectedLocation: null,

  init() {
    this.render();
    this.bindEvents();
  },

  activeRegionId: 'kanto',
  activeLeagueId: 'indigo',

  render() {
    const data = Storage.load();
    const themeId = data.theme;
    const theme = THEMES[themeId];
    if (!theme) return;

    const el = document.getElementById('map-content');
    if (!el) return;

    let locations = theme.mapLocations || [];
    let regionSelectorHtml = '';

    if (theme.regions && theme.regions.length > 0) {
      const activeRegObj = theme.regions.find(r => r.id === this.activeRegionId) || theme.regions[0];
      locations = activeRegObj.locations || locations;

      regionSelectorHtml = `
        <div class="map-selectors-bar card card-flat mb-md">
          <div class="map-selector-group">
            <label class="form-label" style="margin-bottom:0;">🗺️ Select Region:</label>
            <select class="form-input map-select-input" id="pokemon-region-select">
              ${theme.regions.map(r => `
                <option value="${r.id}" ${r.id === this.activeRegionId ? 'selected' : ''}>${r.name} (${r.kanji})</option>
              `).join('')}
            </select>
          </div>

          <div class="map-selector-group">
            <label class="form-label" style="margin-bottom:0;">🏆 Select League / Tournament:</label>
            <select class="form-input map-select-input" id="pokemon-league-select">
              ${(theme.leagues || []).map(l => `
                <option value="${l.id}" ${l.id === this.activeLeagueId ? 'selected' : ''}>${l.name}</option>
              `).join('')}
            </select>
          </div>
        </div>
      `;
    }

    el.innerHTML = `
      <div class="map-header">
        <div>
          <h2>🗺️ ${theme.universe} World Map</h2>
          <p class="text-xs" style="color: var(--text-dim);">Click any location to zoom in and open its Manga Panel</p>
        </div>
        <div class="map-controls">
          <button class="btn btn-sm btn-secondary" id="map-zoom-in">🔍 Zoom In</button>
          <button class="btn btn-sm btn-secondary" id="map-zoom-out">🔍 Zoom Out</button>
          <button class="btn btn-sm btn-secondary" id="map-reset-zoom">↺ Reset</button>
        </div>
      </div>

      ${regionSelectorHtml}

      <!-- Map Viewport -->
      <div class="map-viewport" id="map-viewport">
        <div class="map-canvas" id="map-canvas" style="transform: scale(1); background-image: url('assets/images/maps/${themeId}.png');">
          <div class="map-grid-overlay"></div>
          <div class="map-watermark">${theme.universe}</div>

          <!-- Location Pins -->
          ${locations.map(loc => `
            <div class="map-pin" style="left: ${loc.x}%; top: ${loc.y}%;" data-location-id="${loc.id}">
              <div class="pin-icon-wrap">
                <span class="pin-icon">${this.getLocationIcon(loc.type)}</span>
                <span class="pin-pulse"></span>
              </div>
              <span class="pin-label">${loc.name}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Manga Panel Modal -->
      <div class="manga-panel-modal" id="manga-panel-modal">
        <div class="manga-panel-card" id="manga-panel-card">
          <!-- Rendered dynamically -->
        </div>
      </div>
    `;

    // Bind region & league selects
    document.getElementById('pokemon-region-select')?.addEventListener('change', (e) => {
      this.activeRegionId = e.target.value;
      AudioEngine.playClick();
      this.render();
    });

    document.getElementById('pokemon-league-select')?.addEventListener('change', (e) => {
      this.activeLeagueId = e.target.value;
      AudioEngine.playClick();
      App.showToast(`Selected League: ${e.target.options[e.target.selectedIndex].text}`, 'info');
    });
  },

  getLocationIcon(type) {
    if (!type) return '📍';
    const lower = type.toLowerCase();
    if (lower.includes('town') || lower.includes('hometown') || lower.includes('village')) return '🏡';
    if (lower.includes('temple') || lower.includes('sacred') || lower.includes('sanctuary')) return '⛩️';
    if (lower.includes('dungeon') || lower.includes('gate') || lower.includes('rift')) return '🌀';
    if (lower.includes('island') || lower.includes('beach')) return '🏝️';
    if (lower.includes('mountain') || lower.includes('cave')) return '🏔️';
    if (lower.includes('arena') || lower.includes('tournament') || lower.includes('fighting')) return '🏟️';
    if (lower.includes('tech') || lower.includes('citadel') || lower.includes('metropolis')) return '🏙️';
    return '⚔️';
  },

  bindEvents() {
    const viewport = document.getElementById('map-viewport');
    const canvas = document.getElementById('map-canvas');

    // Zoom Controls
    document.getElementById('map-zoom-in')?.addEventListener('click', () => this.zoom(0.25));
    document.getElementById('map-zoom-out')?.addEventListener('click', () => this.zoom(-0.25));
    document.getElementById('map-reset-zoom')?.addEventListener('click', () => this.setZoom(1));

    // Location Pin Clicks
    canvas?.addEventListener('click', (e) => {
      const pin = e.target.closest('.map-pin');
      if (!pin) return;
      AudioEngine.playClick();
      this.openMangaPanel(pin.dataset.locationId);
    });

    // Close Manga Panel Modal
    document.getElementById('manga-panel-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'manga-panel-modal' || e.target.closest('.modal-close')) {
        this.closeMangaPanel();
      }
    });
  },

  zoom(delta) {
    this.setZoom(Math.max(0.8, Math.min(2.5, this.currentZoom + delta)));
  },

  setZoom(level) {
    this.currentZoom = level;
    const canvas = document.getElementById('map-canvas');
    if (canvas) {
      canvas.style.transform = `scale(${this.currentZoom})`;
    }
  },

  openMangaPanel(locId) {
    const data = Storage.load();
    const theme = THEMES[data.theme];
    if (!theme) return;

    const loc = (theme.mapLocations || []).find(l => l.id === locId);
    if (!loc) return;

    // Zoom into location on map
    const canvas = document.getElementById('map-canvas');
    if (canvas) {
      canvas.style.transformOrigin = `${loc.x}% ${loc.y}%`;
      canvas.style.transform = 'scale(1.8)';
      this.currentZoom = 1.8;
    }

    if (data.theme === 'naruto') {
      App.showToast('🍥 Dattebayo! (Believe It!) — Leaf Village Command Center', 'info');
    }

    const modal = document.getElementById('manga-panel-modal');
    const card = document.getElementById('manga-panel-card');
    if (!modal || !card) return;

    card.innerHTML = `
      <div class="manga-panel-header">
        <div>
          <div class="manga-panel-title">${loc.name}</div>
          <div class="manga-panel-kanji">${loc.kanji} · ${loc.type}</div>
        </div>
        <button class="modal-close">✕</button>
      </div>
      <div class="manga-panel-body">
        <div class="manga-art-box">
          <span class="manga-art-icon">${this.getLocationIcon(loc.type)}</span>
          <span class="text-xs font-heading mt-sm" style="color: var(--text-dim); letter-spacing: 0.1em;">CHAPTER REGION PANEL</span>
        </div>
        <p class="manga-panel-desc">${loc.desc}</p>

        <div class="card card-flat mb-md">
          <div class="flex justify-between items-center mb-sm">
            <span class="font-heading text-xs" style="color: var(--primary);">LOCAL ENCOUNTER</span>
            <span class="text-xs font-mono" style="color: var(--text-dim);">${loc.encounter}</span>
          </div>
        </div>

        <h4 style="margin-bottom: 12px;">🗡️ Regional Quests</h4>
        <div class="manga-quests-list">
          ${loc.quests.map(q => `
            <div class="manga-quest-item">
              <span class="quest-name">${q}</span>
              <button class="btn btn-sm btn-primary" onclick="MapController.startQuest('${q.replace(/'/g, "\\'")}')">Start Quest</button>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    modal.classList.add('open');
  },

  closeMangaPanel() {
    const modal = document.getElementById('manga-panel-modal');
    if (modal) modal.classList.remove('open');
    this.setZoom(1);
  },

  startQuest(questName) {
    this.closeMangaPanel();
    App.navigate('dashboard');
    App.showToast(`Started quest: "${questName}"`, 'success');
  },
};
