/* ============================================================
   NAV DEVICE — Animated Theme-Specific Navigation Device
   ============================================================ */

const NavDevice = {
  isOpen: false,

  init() {
    this.render();
    this.bindEvents();
  },

  /**
   * Render or re-render the device container based on current user theme
   */
  render() {
    const container = document.getElementById('nav-device-container');
    if (!container) return;

    const data = Storage.load();
    const themeId = data.theme || 'sololeveling';
    const theme = THEMES[themeId];
    if (!theme) return;

    const device = theme.device || {
      type: 'system',
      name: 'System HUD',
      triggerIcon: '📱',
      triggerLabel: 'Device UI',
      subtitle: 'Terminal Interface',
    };

    const currentRank = getCurrentRank(themeId, data.profile.xp);
    const initial = (data.profile.name || '?')[0].toUpperCase();
    const diaryName = theme.diaryName || 'Diary';

    const spellNames = {
      pokemon: { name: 'Move Tutor', icon: '⚡' },
      naruto: { name: 'Jutsu Dojo', icon: '🍥' },
      sololeveling: { name: 'Skill Forge', icon: '👑' },
      dragonball: { name: 'Ki Training', icon: '🐉' },
      bleach: { name: 'Kido Altar', icon: '⚔️' },
      hunterxhunter: { name: 'Hatsu Lab', icon: '🎯' },
      demonslayer: { name: 'Breathing Dojo', icon: '🗡️' },
      wandandsword: { name: 'Spell Forge', icon: '🪄' },
      blackclover: { name: 'Grimoire Spells', icon: '🍀' },
    };
    const spellMeta = spellNames[themeId] || { name: 'Spell Creator', icon: '🪄' };

    // === GRIMOIRE BOOK DEVICE ===
    if (device.type === 'grimoire') {
      this.renderGrimoire(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta);
      return;
    }

    // === POKÉDEX DEVICE ===
    if (device.type === 'pokedex') {
      this.renderPokedex(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta);
      return;
    }

    // === NINJA SCROLL DEVICE ===
    if (device.type === 'scroll') {
      this.renderScroll(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta);
      return;
    }

    // === DRAGON RADAR DEVICE ===
    if (device.type === 'dragonradar') {
      this.renderDragonRadar(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta);
      return;
    }

    // === DEFAULT DEVICE (all other types) ===
    container.className = `nav-device-container nav-device--${device.type} ${this.isOpen ? 'open' : ''}`;

    container.innerHTML = `
      <!-- Collapsed Trigger Button -->
      <button class="nav-device-trigger" id="nav-device-trigger-btn" title="Open ${device.name}">
        <span class="trigger-icon">${device.triggerIcon}</span>
        <span class="trigger-pulse"></span>
      </button>

      <!-- Expanded Device Panel -->
      <div class="nav-device-panel" id="nav-device-panel">
        <!-- Device Header -->
        <div class="device-header">
          <div class="device-title-area">
            <span class="device-icon-large">${device.triggerIcon}</span>
            <div>
              <div class="device-title">${device.name}</div>
              <div class="device-subtitle">${device.subtitle}</div>
            </div>
          </div>
          <button class="device-close-btn" id="nav-device-close-btn">✕</button>
        </div>

        <!-- User Badge inside Device -->
        <div class="device-user-card">
          <div class="device-avatar">${initial}</div>
          <div class="device-user-details">
            <div class="device-user-name">${data.profile.name || 'Warrior'}</div>
            <div class="device-user-rank">${currentRank ? currentRank.name : 'E-Rank'} · ${data.profile.xp} ${theme.xpName}</div>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="device-nav-links">
          <button class="device-nav-item ${App.currentScreen === 'dashboard' ? 'active' : ''}" data-screen="dashboard">
            <span class="nav-icon">⚡</span>
            <span>Dashboard</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'map' ? 'active' : ''}" data-screen="map">
            <span class="nav-icon">🗺️</span>
            <span>World Map</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'health' ? 'active' : ''}" data-screen="health">
            <span class="nav-icon">🍲</span>
            <span>Health & Rest</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'spells' ? 'active' : ''}" data-screen="spells">
            <span class="nav-icon">${spellMeta.icon}</span>
            <span>${spellMeta.name}</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'diary' ? 'active' : ''}" data-screen="diary">
            <span class="nav-icon">📝</span>
            <span>${diaryName}</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'guild' ? 'active' : ''}" data-screen="guild">
            <span class="nav-icon">⚔️</span>
            <span>${theme.guildName}</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'collection' ? 'active' : ''}" data-screen="collection">
            <span class="nav-icon">🎴</span>
            <span>${theme.collectionName}</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'watch' ? 'active' : ''}" data-screen="watch">
            <span class="nav-icon">📺</span>
            <span>Anime & Manga Hub</span>
          </button>
          <button class="device-nav-item ${App.currentScreen === 'profile' ? 'active' : ''}" data-screen="profile">
            <span class="nav-icon">👤</span>
            <span>Profile & Settings</span>
          </button>
        </div>


        <!-- Device Footer -->
        <div class="device-footer">
          <span>${theme.universe}</span>
          <span>🔥 Streak: ${data.stats.streak}d</span>
        </div>
      </div>
    `;
  },

  /**
   * Render the Grimoire Book device (Black Clover, Wand & Sword)
   */
  renderGrimoire(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta) {
    const mascotImages = {
      blackclover: 'assets/images/mascot-blackclover.png',
      wandandsword: 'assets/images/mascot-blackclover.png', // fallback for now
    };
    const mascotSrc = mascotImages[themeId] || '';

    const rankName = currentRank ? currentRank.name : 'Recruit';
    const xpDisplay = `${data.profile.xp} ${theme.xpName}`;

    container.className = `nav-device-container nav-device--grimoire ${this.isOpen ? 'open' : ''}`;

    // Build navigation entries for left page
    const navItems = [
      { screen: 'dashboard', icon: '⚡', name: 'Dashboard' },
      { screen: 'map', icon: '🗺️', name: 'World Map' },
      { screen: 'health', icon: '🍲', name: 'Health & Rest' },
      { screen: 'spells', icon: spellMeta.icon, name: spellMeta.name },
      { screen: 'diary', icon: '📝', name: diaryName },
      { screen: 'guild', icon: '⚔️', name: theme.guildName },
      { screen: 'collection', icon: '🎴', name: theme.collectionName },
      { screen: 'watch', icon: '📺', name: 'Anime & Manga Hub' },
      { screen: 'profile', icon: '👤', name: 'Profile & Settings' },
    ];

    const navLinksHtml = navItems.map(item => `
      <button class="grimoire-spell-entry ${App.currentScreen === item.screen ? 'active' : ''}" data-screen="${item.screen}">
        <span class="spell-icon">${item.icon}</span>
        <span class="spell-name">${item.name}</span>
      </button>
    `).join('');

    // Build mascot HTML
    const mascotHtml = mascotSrc
      ? `<img class="grimoire-mascot" src="${mascotSrc}" alt="Grimoire Mascot" />`
      : '';

    container.innerHTML = `
      <!-- Collapsed Trigger: Floating Grimoire Book -->
      <button class="nav-device-trigger" id="nav-device-trigger-btn" title="Open ${device.name}">
        <span class="trigger-icon">${device.triggerIcon}</span>
        <span class="trigger-pulse"></span>
      </button>

      <!-- Expanded: Open Grimoire Book -->
      <div class="nav-device-panel" id="nav-device-panel">
        <div class="grimoire-book">
          <!-- Close Button -->
          <button class="grimoire-close-btn" id="nav-device-close-btn" title="Close Grimoire">✕</button>

          <!-- LEFT PAGE: Active Spells (Navigation) -->
          <div class="grimoire-page page-left">
            <div class="grimoire-page-title">${themeId === 'blackclover' ? '🍀 Active Spells' : '🪄 Spell Index'}</div>
            <div class="grimoire-nav-entries">
              ${navLinksHtml}
            </div>
          </div>

          <!-- SPINE / BINDING -->
          <div class="grimoire-spine"></div>

          <!-- RIGHT PAGE: Logs & Info -->
          <div class="grimoire-page page-right">
            <div class="grimoire-page-title">${themeId === 'blackclover' ? '📜 Logs & Info' : '📖 Arcane Records'}</div>

            <!-- User Card -->
            <div class="grimoire-user-card">
              <div class="grimoire-user-avatar">${initial}</div>
              <div>
                <div class="grimoire-user-name">${data.profile.name || 'Warrior'}</div>
                <div class="grimoire-user-rank">${rankName}</div>
              </div>
            </div>

            <!-- Mission Log -->
            <div class="grimoire-info-section">
              <div class="grimoire-info-label">Mission Log</div>
              <div class="grimoire-info-value">Current: ${theme.bracketNames.goals || 'Daily Quest'}</div>
              <div class="grimoire-info-value">Next: ${theme.bracketNames.study || 'Study Session'}</div>
            </div>

            <!-- Squad Status -->
            <div class="grimoire-info-section">
              <div class="grimoire-info-label">Squad Status</div>
              <div class="grimoire-info-value highlight">${theme.guildName}</div>
              <div class="grimoire-info-value">${rankName} · ${xpDisplay}</div>
            </div>

            <div class="grimoire-divider"></div>

            <!-- Stats -->
            <div class="grimoire-info-section">
              <div class="grimoire-info-label">Stats</div>
              <div class="grimoire-info-value">🔥 Streak: ${data.stats.streak} days</div>
              <div class="grimoire-info-value">📊 Study: ${data.stats.studyMinutes || 0} min</div>
              <div class="grimoire-info-value">💪 Exercise: ${data.stats.exerciseMinutes || 0} min</div>
              <div class="grimoire-info-value">✅ Goals: ${data.stats.goalsCompleted || 0} done</div>
            </div>

            <div class="grimoire-divider"></div>

            <!-- Universe -->
            <div class="grimoire-info-section">
              <div class="grimoire-info-label">Universe</div>
              <div class="grimoire-info-value highlight">${theme.universe}</div>
            </div>

            ${mascotHtml}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render the Pokédex device (Pokémon theme)
   */
  renderPokedex(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta) {
    const rankName = currentRank ? currentRank.name : 'Novice Trainer';
    const xpDisplay = `${data.profile.xp} ${theme.xpName}`;

    container.className = `nav-device-container nav-device--pokedex ${this.isOpen ? 'open' : ''}`;

    const navItems = [
      { screen: 'dashboard', icon: '⚡', name: 'Dashboard' },
      { screen: 'map', icon: '🗺️', name: 'World Map' },
      { screen: 'health', icon: '🍲', name: 'Health & Rest' },
      { screen: 'spells', icon: spellMeta.icon, name: spellMeta.name },
      { screen: 'diary', icon: '📝', name: diaryName },
      { screen: 'guild', icon: '⚔️', name: theme.guildName },
      { screen: 'collection', icon: '🎴', name: theme.collectionName },
      { screen: 'watch', icon: '📺', name: 'Anime & Manga Hub' },
      { screen: 'profile', icon: '👤', name: 'Profile & Settings' },
    ];

    const navBtnsHtml = navItems.map(item => `
      <button class="pokedex-nav-btn ${App.currentScreen === item.screen ? 'active' : ''}" data-screen="${item.screen}">
        <span class="poke-nav-icon">${item.icon}</span>
        <span>${item.name}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <!-- Collapsed Trigger: Pokéball button -->
      <button class="nav-device-trigger" id="nav-device-trigger-btn" title="Open Pokédex">
        <span class="trigger-icon">🔴</span>
        <span class="trigger-pulse"></span>
      </button>

      <!-- Expanded: Open Pokédex Two-Panel Device -->
      <div class="nav-device-panel" id="nav-device-panel">
        <div class="pokedex-body">
          <button class="pokedex-close-btn" id="nav-device-close-btn" title="Close Pokédex">✕</button>

          <!-- LEFT PANEL -->
          <div class="pokedex-left">
            <!-- Top bar -->
            <div class="pokedex-top-bar">
              <div class="pokedex-lens"></div>
              <div class="pokedex-leds">
                <span class="pokedex-led red"></span>
                <span class="pokedex-led yellow"></span>
                <span class="pokedex-led green"></span>
              </div>
            </div>

            <!-- Screen Area -->
            <div class="pokedex-screen-area">
              <div class="pokedex-main-screen">
                <div class="pokedex-screen-title">TRAINER DATA // REGION 01</div>
                
                <div class="pokedex-screen-user">
                  <div class="pokedex-screen-avatar">${initial}</div>
                  <div>
                    <div class="pokedex-screen-name">${data.profile.name || 'Trainer'}</div>
                    <div class="pokedex-screen-rank">${rankName}</div>
                  </div>
                </div>

                <div class="pokedex-screen-stats">
                  <div class="pokedex-stat-row"><span class="stat-label">EXP:</span> ${xpDisplay}</div>
                  <div class="pokedex-stat-row"><span class="stat-label">STREAK:</span> 🔥 ${data.stats.streak}d</div>
                  <div class="pokedex-stat-row"><span class="stat-label">STUDY:</span> ⏱️ ${data.stats.studyMinutes || 0}m</div>
                  <div class="pokedex-stat-row"><span class="stat-label">GOALS:</span> ✅ ${data.stats.goalsCompleted || 0}</div>
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div class="pokedex-controls">
              <div class="pokedex-dpad-wrap">
                <div class="dpad-btn up"></div>
                <div class="dpad-btn left-d"></div>
                <div class="dpad-btn center"></div>
                <div class="dpad-btn right-d"></div>
                <div class="dpad-btn down"></div>
              </div>
              <div class="pokedex-action-btns">
                <div class="pokedex-btn-red"></div>
                <div class="pokedex-btn-blue"></div>
                <div class="pokedex-btn-green"></div>
              </div>
            </div>
          </div>

          <!-- HINGE -->
          <div class="pokedex-hinge"></div>

          <!-- RIGHT PANEL -->
          <div class="pokedex-right">
            <!-- Info Screen & PokéFollower Selector -->
            <div class="pokedex-info-screen">
              <div class="pokedex-info-title">POKÉDEX NAV & PokéFollowers</div>
              <div class="pokedex-follower-bar" style="display: flex; gap: 6px; overflow-x: auto; padding: 4px 0; margin-top: 4px;">
                ${CursorPet.pokemonFollowers.map(p => `
                  <button class="pokedex-follower-chip ${CursorPet.activePokemonFollower === p.id ? 'active' : ''} ${data.profile.xp < p.reqXp ? 'locked' : ''}"
                          onclick="CursorPet.setPokemonFollower('${p.id}'); NavDevice.render();"
                          title="${p.name} (${p.badge} · Req ${p.reqXp} XP)"
                          style="background: rgba(0,0,0,0.6); border: 1.5px solid ${CursorPet.activePokemonFollower === p.id ? '#FFD600' : 'rgba(0,229,255,0.3)'}; color: #FFF; border-radius: 6px; padding: 2px 6px; font-size: 0.7rem; cursor: pointer; display: flex; align-items: center; gap: 3px; white-space: nowrap;">
                    <span>${p.icon}</span>
                    <span>${p.name}</span>
                    ${data.profile.xp < p.reqXp ? '🔒' : ''}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Navigation Grid -->
            <div class="pokedex-nav-grid">
              ${navBtnsHtml}
            </div>

            <!-- Right Controls -->
            <div class="pokedex-right-controls">
              <div class="pokedex-green-btn"></div>
              <div class="pokedex-bottom-btns">
                <div class="pokedex-dark-btn"></div>
                <div class="pokedex-dark-btn"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render the Ninja Scroll device (Naruto theme)
   */
  renderScroll(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta) {
    const rankName = currentRank ? currentRank.name : 'Academy Student';
    const xpDisplay = `${data.profile.xp} ${theme.xpName}`;

    container.className = `nav-device-container nav-device--scroll ${this.isOpen ? 'open' : ''}`;

    const navItems = [
      { screen: 'dashboard', icon: '⚡', name: 'Dashboard' },
      { screen: 'map', icon: '🗺️', name: 'World Map' },
      { screen: 'health', icon: '🍲', name: 'Health & Rest' },
      { screen: 'spells', icon: spellMeta.icon, name: spellMeta.name },
      { screen: 'diary', icon: '📝', name: diaryName },
      { screen: 'guild', icon: '⚔️', name: theme.guildName },
      { screen: 'collection', icon: '🎴', name: theme.collectionName },
      { screen: 'watch', icon: '📺', name: 'Anime & Manga Hub' },
      { screen: 'profile', icon: '👤', name: 'Profile & Settings' },
    ];

    const navItemsHtml = navItems.map(item => `
      <button class="scroll-nav-item ${App.currentScreen === item.screen ? 'active' : ''}" data-screen="${item.screen}">
        <span class="scroll-icon">${item.icon}</span>
        <span>${item.name}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <!-- Collapsed Trigger: Headband Ninja Scroll -->
      <button class="nav-device-trigger" id="nav-device-trigger-btn" title="Open Ninja Scroll">
        <span class="trigger-icon">📜</span>
        <span class="trigger-pulse"></span>
      </button>

      <!-- Expanded: Unrolled Ninja Summoning Scroll -->
      <div class="nav-device-panel" id="nav-device-panel">
        <div class="ninja-scroll-body">
          <button class="scroll-close-btn" id="nav-device-close-btn" title="Close Scroll">✕</button>

          <!-- Left Wooden Roller -->
          <div class="scroll-roller scroll-roller-left"></div>

          <!-- Parchment Canvas -->
          <div class="scroll-canvas">
            <div class="scroll-kanji-banner">史上最強口寄せ忍法・うずまき</div>

            <!-- Left Section: Jutsu Directory (Nav Links) -->
            <div class="scroll-section-left">
              <div class="scroll-header-title">🍥 Shinobi Scroll Index</div>
              <div class="scroll-nav-list">
                ${navItemsHtml}
              </div>
            </div>

            <!-- Right Section: Shinobi Profile & Mission Log -->
            <div class="scroll-section-right">
              <div class="scroll-header-title">📜 Shinobi Records</div>

              <div class="scroll-user-card">
                <div class="scroll-user-avatar">${initial}</div>
                <div>
                  <div class="scroll-user-name">${data.profile.name || 'Shinobi'}</div>
                  <div class="scroll-user-rank">${rankName}</div>
                </div>
              </div>

              <div class="scroll-info-block">
                <div class="scroll-info-label">Chakra Power</div>
                <div class="scroll-info-val">${xpDisplay}</div>
              </div>

              <div class="scroll-info-block">
                <div class="scroll-info-label">Current Quest</div>
                <div class="scroll-info-val">🔥 ${data.stats.streak} Day Training Streak</div>
              </div>

              <div class="scroll-info-block">
                <div class="scroll-info-label">Village Affiliation</div>
                <div class="scroll-info-val">${theme.universe}</div>
              </div>

              <div class="scroll-leaf-seal" title="Leaf Village Emblem">🍥</div>
            </div>
          </div>

          <!-- Right Wooden Roller -->
          <div class="scroll-roller scroll-roller-right"></div>
        </div>
      </div>
    `;
  },

  /**
   * Render the Dragon Radar device (Dragon Ball theme)
   */
  renderDragonRadar(container, data, theme, themeId, device, currentRank, initial, diaryName, spellMeta) {
    const rankName = currentRank ? currentRank.name : 'Earthling Warrior';
    const xpDisplay = `${data.profile.xp} ${theme.xpName}`;

    container.className = `nav-device-container nav-device--dragonradar ${this.isOpen ? 'open' : ''}`;

    const navItems = [
      { screen: 'dashboard', icon: '⚡', name: 'Dashboard' },
      { screen: 'map', icon: '🗺️', name: 'World Map' },
      { screen: 'health', icon: '🍲', name: 'Health & Rest' },
      { screen: 'spells', icon: spellMeta.icon, name: spellMeta.name },
      { screen: 'diary', icon: '📝', name: diaryName },
      { screen: 'guild', icon: '⚔️', name: theme.guildName },
      { screen: 'collection', icon: '🎴', name: theme.collectionName },
      { screen: 'watch', icon: '📺', name: 'Anime & Manga Hub' },
      { screen: 'profile', icon: '👤', name: 'Profile & Settings' },
    ];

    const navBtnsHtml = navItems.map(item => `
      <button class="radar-nav-btn ${App.currentScreen === item.screen ? 'active' : ''}" data-screen="${item.screen}">
        <span>${item.icon}</span>
        <span>${item.name}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <!-- Collapsed Trigger: Round Bulma Dragon Radar -->
      <button class="nav-device-trigger" id="nav-device-trigger-btn" title="Open Dragon Radar">
        <span class="trigger-icon">🧭</span>
        <span class="trigger-pulse"></span>
      </button>

      <!-- Expanded: Handheld Bulma Dragon Radar Device -->
      <div class="nav-device-panel" id="nav-device-panel">
        <div class="radar-body-frame">
          <!-- Top Silver Knob Close Button -->
          <div class="radar-top-knob" id="nav-device-close-btn" title="Close Radar"></div>
          <div class="radar-side-strap"></div>

          <!-- Green Radar Screen -->
          <div class="radar-screen-inner">
            <button class="radar-close-btn" id="nav-device-close-btn" title="Close Radar">✕</button>

            <!-- Direction Arrows -->
            <span class="radar-arrow top">▲</span>
            <span class="radar-arrow bottom">▲</span>
            <span class="radar-arrow left">▲</span>
            <span class="radar-arrow right">▲</span>

            <!-- 7 Glowing Dragon Ball Blips -->
            <span class="dragon-ball-blip" style="top: 25%; left: 35%;"></span>
            <span class="dragon-ball-blip" style="top: 20%; left: 60%;"></span>
            <span class="dragon-ball-blip" style="top: 45%; left: 25%;"></span>
            <span class="dragon-ball-blip" style="top: 50%; left: 75%;"></span>
            <span class="dragon-ball-blip" style="top: 70%; left: 40%;"></span>
            <span class="dragon-ball-blip" style="top: 75%; left: 65%;"></span>
            <span class="dragon-ball-blip" style="top: 82%; left: 48%;"></span>

            <!-- User Info Header -->
            <div class="radar-user-header">
              <div class="radar-user-name">🐉 ${data.profile.name || 'Z-Fighter'}</div>
              <div class="radar-user-sub">${rankName} · ${xpDisplay}</div>
            </div>

            <!-- Radar Navigation Grid -->
            <div class="radar-nav-container">
              ${navBtnsHtml}
            </div>

            <div style="font-family: monospace; font-size: 0.65rem; color: #69F0AE; text-align: center; z-index: 2;">
              CAPSULE CORP RADAR OS // STREAK: 🔥 ${data.stats.streak}d
            </div>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    const container = document.getElementById('nav-device-container');
    if (!container) return;

    // Trigger button open
    container.addEventListener('click', (e) => {
      const triggerBtn = e.target.closest('#nav-device-trigger-btn');
      if (triggerBtn) {
        this.open();
        return;
      }

      // Close button inside device panel (default, grimoire, pokedex, scroll, dragonradar)
      const closeBtn = e.target.closest('#nav-device-close-btn');
      if (closeBtn) {
        this.close();
        return;
      }

      // Nav item click (default device)
      const navItem = e.target.closest('.device-nav-item');
      if (navItem) {
        const screen = navItem.dataset.screen;
        if (screen) {
          App.navigate(screen);
          this.close();
        }
        return;
      }

      // Nav item click (grimoire spell entries)
      const spellEntry = e.target.closest('.grimoire-spell-entry');
      if (spellEntry) {
        const screen = spellEntry.dataset.screen;
        if (screen) {
          App.navigate(screen);
          this.close();
        }
        return;
      }

      // Nav item click (pokedex nav buttons)
      const pokedexBtn = e.target.closest('.pokedex-nav-btn');
      if (pokedexBtn) {
        const screen = pokedexBtn.dataset.screen;
        if (screen) {
          App.navigate(screen);
          this.close();
        }
        return;
      }

      // Nav item click (scroll nav items)
      const scrollItem = e.target.closest('.scroll-nav-item');
      if (scrollItem) {
        const screen = scrollItem.dataset.screen;
        if (screen) {
          App.navigate(screen);
          this.close();
        }
        return;
      }

      // Nav item click (radar nav buttons)
      const radarBtn = e.target.closest('.radar-nav-btn');
      if (radarBtn) {
        const screen = radarBtn.dataset.screen;
        if (screen) {
          App.navigate(screen);
          this.close();
        }
      }
    });

    // Close when clicking outside panel
    document.addEventListener('click', (e) => {
      if (this.isOpen && !e.target.closest('#nav-device-container')) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  },

  open() {
    this.isOpen = true;
    const container = document.getElementById('nav-device-container');
    if (container) container.classList.add('open');
  },

  close() {
    this.isOpen = false;
    const container = document.getElementById('nav-device-container');
    if (container) container.classList.remove('open');
  },

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  },

  updateActiveLink(screen) {
    // Update default device nav items
    document.querySelectorAll('.device-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screen);
    });
    // Update grimoire spell entries
    document.querySelectorAll('.grimoire-spell-entry').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screen);
    });
    // Update pokedex nav buttons
    document.querySelectorAll('.pokedex-nav-btn').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screen);
    });
    // Update scroll nav items
    document.querySelectorAll('.scroll-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screen);
    });
    // Update radar nav buttons
    document.querySelectorAll('.radar-nav-btn').forEach(item => {
      item.classList.toggle('active', item.dataset.screen === screen);
    });
  },
};
