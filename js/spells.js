/* ============================================================
   SPELLS — Anime Magic Ritual Altar & Arcane Grimoire Engine
   ============================================================ */

const SpellsModule = {
  selectedElement: '🔥 Fire',

  elements: [
    { name: '🔥 Fire', icon: '🔥', rune: 'ᚠ', defaultIncantation: 'Ignis Ardens!' },
    { name: '❄️ Frost', icon: '❄️', rune: 'ᛏ', defaultIncantation: 'Glacies Zero!' },
    { name: '⚡ Lightning', icon: '⚡', rune: 'ᛋ', defaultIncantation: 'Fulgur Fulmen!' },
    { name: '🌊 Water', icon: '🌊', rune: 'ᛚ', defaultIncantation: 'Aqua Cataracta!' },
    { name: '🛡️ Barrier', icon: '🛡️', rune: 'ᛟ', defaultIncantation: 'Aegis Sanctum!' },
    { name: '⚔️ Spellblade', icon: '⚔️', rune: 'ᚷ', defaultIncantation: 'Gladio Magia!' },
    { name: '🔮 Void', icon: '🔮', rune: 'ᚦ', defaultIncantation: 'Eldritch Nova!' },
  ],

  incantationPrefixes: [
    'Ignis', 'Glacies', 'Fulgur', 'Aqua', 'Aegis', 'Gladio', 'Astral',
    'Inferno', 'Tempest', 'Absolute', 'Sanctum', 'Eldritch', 'Vortex', 'Kaiser'
  ],

  incantationSuffixes: [
    'Ardens', 'Invoco', 'Cataracta', 'Fulmen', 'Nova Burst', 'Sanctuary',
    'Slash', 'Shielding', 'Zero Veil', 'Dragon Roar', 'Eclipse', 'Overdrive'
  ],

  init() {
    this.render();
    this.bindEvents();
    this.ensureRitualOverlay();
  },

  getThemeConfig(themeId) {
    const configs = {
      pokemon: {
        title: '⚡ Move Tutor & TM Crafting Machine',
        subtitle: 'Craft custom Pokémon battle moves & TMs powered by elemental typing',
        matrixLabel: 'POKÉMON MOVE MATRIX ACTIVE',
        forgeTitle: '✨ Craft Custom Battle Move',
        incantationLabel: 'Shouted Trainer Command',
        namePlaceholder: 'e.g. Volt Tackle',
        incantPlaceholder: 'e.g. Pikachu, use Thunderbolt!',
        grimoireTitle: '🎒 Moveset & TM Inventory',
        castBtn: 'Unleash Move ⚡',
        actionWord: 'UNLEASHED MOVE',
        defaults: [
          { id: 'sp-1', name: 'Volt Tackle Surge', element: '⚡ Lightning', incantation: 'Pikachu, full speed Ahead!', duration: 25, mana: 50, rank: 'S-RANK' },
          { id: 'sp-2', name: 'Hydro Pump Wave', element: '🌊 Water', incantation: 'Blastoise, unleash Hydro Pump!', duration: 30, mana: 60, rank: 'SS-RANK' },
          { id: 'sp-3', name: 'Flamethrower Blast', element: '🔥 Fire', incantation: 'Charizard, incinerate!', duration: 20, mana: 40, rank: 'A-RANK' },
        ],
      },
      naruto: {
        title: '🍥 Jutsu Scroll & Hand Seal Dojo',
        subtitle: 'Weave hand seals & craft custom Ninjutsu / Taijutsu techniques',
        matrixLabel: 'CHAKRA MATRIX ACTIVE',
        forgeTitle: '✨ Weave New Jutsu Technique',
        incantationLabel: 'Hand Seal Incantation',
        namePlaceholder: 'e.g. Lightning Blade',
        incantPlaceholder: 'e.g. Ram → Snake → Tiger: Katon!',
        grimoireTitle: '📜 Secret Jutsu Scrolls',
        castBtn: 'Perform Jutsu ⚡',
        actionWord: 'PERFORMED JUTSU',
        defaults: [
          { id: 'sp-1', name: 'Rasengan Burst', element: '⚡ Lightning', incantation: 'Chakra Spherical Rotation!', duration: 25, mana: 50, rank: 'S-RANK' },
          { id: 'sp-2', name: 'Great Fireball Jutsu', element: '🔥 Fire', incantation: 'Katon: Goukakyuu no Jutsu!', duration: 30, mana: 60, rank: 'SS-RANK' },
          { id: 'sp-3', name: 'Water Dragon Bullet', element: '🌊 Water', incantation: 'Suiton: Suiryuudan no Jutsu!', duration: 20, mana: 40, rank: 'A-RANK' },
        ],
      },
      sololeveling: {
        title: '👑 System Skill & Monarch Ability Forge',
        subtitle: 'Forge custom Hunter skills & Necromancy abilities powered by the System',
        matrixLabel: 'MONARCH SYSTEM RIFT ACTIVE',
        forgeTitle: '✨ Forge Hunter Skill',
        incantationLabel: 'System Command Keyword',
        namePlaceholder: 'e.g. Ruler\'s Authority',
        incantPlaceholder: 'e.g. ARISE!',
        grimoireTitle: '🗡️ Active Skill Library',
        castBtn: 'Activate Skill ⚡',
        actionWord: 'ACTIVATED SKILL',
        defaults: [
          { id: 'sp-1', name: 'Shadow Extraction', element: '🔮 Void', incantation: 'ARISE!', duration: 25, mana: 50, rank: 'S-RANK' },
          { id: 'sp-2', name: 'Ruler\'s Authority', element: '🛡️ Barrier', incantation: 'Psychokinesis Surge!', duration: 30, mana: 60, rank: 'SS-RANK' },
          { id: 'sp-3', name: 'Dagger Speed Rush', element: '⚔️ Spellblade', incantation: 'Mutilate Slash!', duration: 20, mana: 40, rank: 'A-RANK' },
        ],
      },
      dragonball: {
        title: '🐉 Ki Attack & Turtle School Dojo',
        subtitle: 'Concentrate your Ki & forge legendary Saiyan blasts & martial techniques',
        matrixLabel: 'SAIYAN KI MATRIX ACTIVE',
        forgeTitle: '✨ Charge New Ki Technique',
        incantationLabel: 'Shout / Ki Charge Chant',
        namePlaceholder: 'e.g. Kamehameha',
        incantPlaceholder: 'e.g. KA-ME-HA-ME-HA!',
        grimoireTitle: '💥 Martial Arts Manual',
        castBtn: 'Fire Ki Blast ⚡',
        actionWord: 'UNLEASHED KI BLAST',
        defaults: [
          { id: 'sp-1', name: 'Kamehameha Wave', element: '⚡ Lightning', incantation: 'KA-ME-HA-ME-HA!', duration: 25, mana: 50, rank: 'S-RANK' },
          { id: 'sp-2', name: 'Final Flash', element: '🔥 Fire', incantation: 'FINAL FLASSSSSSH!', duration: 30, mana: 60, rank: 'SS-RANK' },
          { id: 'sp-3', name: 'Spirit Bomb Focus', element: '🌊 Water', incantation: 'Lend me your energy!', duration: 20, mana: 40, rank: 'A-RANK' },
        ],
      },
      bleach: {
        title: '⚔️ Kido & Zanpakuto Release Altar',
        subtitle: 'Recite Hado incantations & awaken your Zanpakuto Shikai/Bankai releases',
        matrixLabel: 'REIATSU SPIRIT MATRIX ACTIVE',
        forgeTitle: '✨ Inscribe Kido Spell / Bankai',
        incantationLabel: 'Invocative Poem / Release Chant',
        namePlaceholder: 'e.g. Bankai: Tensa Zangetsu',
        incantPlaceholder: 'e.g. Roar, Zabimaru!',
        grimoireTitle: '📖 Gotei 13 Kido Archives',
        castBtn: 'Unleash Bankai ⚡',
        actionWord: 'RELEASED BANKAI',
        defaults: [
          { id: 'sp-1', name: 'Bankai: Tensa Zangetsu', element: '⚔️ Spellblade', incantation: 'Getsuga Tensho!', duration: 25, mana: 50, rank: 'S-RANK' },
          { id: 'sp-2', name: 'Hado #33 Sokatsui', element: '🔥 Fire', incantation: 'Ye lord, mask of flesh and bone...', duration: 30, mana: 60, rank: 'SS-RANK' },
          { id: 'sp-3', name: 'Bakudo #81 Danku', element: '🛡️ Barrier', incantation: 'Splintering wall of light!', duration: 20, mana: 40, rank: 'A-RANK' },
        ],
      },
      demonslayer: {
        title: '🗡️ Breathing Style & Sword Form Dojo',
        subtitle: 'Master total concentration breathing & forge Nichirin sword forms',
        matrixLabel: 'TOTAL CONCENTRATION BREATH ACTIVE',
        forgeTitle: '✨ Forge Breathing Style Form',
        incantationLabel: 'Breathing Chant',
        namePlaceholder: 'e.g. Water Surface Slash',
        incantPlaceholder: 'e.g. Total Concentration: Water Breathing!',
        grimoireTitle: '📜 Demon Slayer Scroll',
        castBtn: 'Unleash Form ⚡',
        actionWord: 'UNLEASHED SWORD FORM',
        defaults: [
          { id: 'sp-1', name: 'Water Surface Slash', element: '🌊 Water', incantation: 'First Form: Water Surface Slash!', duration: 25, mana: 50, rank: 'S-RANK' },
          { id: 'sp-2', name: 'Thunderclap and Flash', element: '⚡ Lightning', incantation: 'First Form: Thunderclap and Flash 8-Fold!', duration: 30, mana: 60, rank: 'SS-RANK' },
          { id: 'sp-3', name: 'Flame Breathing: Purgatory', element: '🔥 Fire', incantation: 'Ninth Form: Purgatory!', duration: 20, mana: 40, rank: 'A-RANK' },
        ],
      },
    };
    return configs[themeId] || {
      title: '🪄 Magic Ritual Altar & Grimoire',
      subtitle: 'Craft ancient arcane incantations & unleash elemental spell training rituals',
      matrixLabel: 'SPELLCRAFT MATRIX ACTIVE',
      forgeTitle: '✨ Forge Custom Spell',
      incantationLabel: 'Ancient Incantation Words',
      namePlaceholder: 'e.g. Tempest Blade Slash',
      incantPlaceholder: 'e.g. Fulgur Ignis Invoco!',
      grimoireTitle: '📖 Arcane Grimoire',
      castBtn: 'Cast ⚡',
      actionWord: 'CAST SPELL',
      defaults: [
        { id: 'sp-1', name: 'Ignis Sword Burst', element: '⚔️ Spellblade', incantation: 'Gladio Ignis Ardens!', duration: 25, mana: 50, rank: 'S-RANK' },
        { id: 'sp-2', name: 'Absolute Frost Barrier', element: '❄️ Frost', incantation: 'Glacies Shielding!', duration: 30, mana: 60, rank: 'SS-RANK' },
        { id: 'sp-3', name: 'Thunder Strike Workout', element: '⚡ Lightning', incantation: 'Fulgur Speed Surge!', duration: 20, mana: 40, rank: 'A-RANK' },
      ],
    };
  },

  render() {
    const data = Storage.load();
    const themeId = data.theme || 'sololeveling';
    const cfg = this.getThemeConfig(themeId);

    const el = document.getElementById('spells-content');
    if (!el) return;

    if (!data.spells || data.spells.length === 0) {
      data.spells = cfg.defaults;
      Storage.save(data);
    }

    const spells = data.spells;
    const currentElemObj = this.elements.find(e => e.name === this.selectedElement) || this.elements[0];

    el.innerHTML = `
      <div class="spells-header">
        <h2 class="spells-title">${cfg.title}</h2>
        <p class="spells-subtitle">${cfg.subtitle}</p>
      </div>

      <!-- Concentric Magic Circle Visualizer Altar -->
      <div class="magic-circle-container" id="magic-circle-visualizer" data-element="${this.selectedElement}">
        <div class="magic-circle-ring-outer"></div>
        <div class="magic-circle-ring-middle"></div>
        <div class="magic-circle-ring-inner"></div>

        <div class="magic-rune-core">
          <span class="magic-rune-symbol" id="active-rune-symbol">${currentElemObj.icon}</span>
          <div class="spellcraft-label" id="active-spell-label">${cfg.matrixLabel}</div>
        </div>
      </div>

      <div class="spells-grid">
        <!-- Spell Crafting Form -->
        <div class="spell-forge-card">
          <div class="spell-forge-title">
            <span>${cfg.forgeTitle}</span>
            <button class="btn-random-incantation" id="random-incantation-btn">🎲 Random Generator</button>
          </div>

          <div class="element-selector-container">
            <div class="element-selector-label">⚡ Select Elemental Affinity</div>
            <div class="element-selector" id="element-selector">
              ${this.elements.map(e => `
                <button class="element-btn ${e.name === this.selectedElement ? 'active' : ''}" data-element="${e.name}">
                  <span>${e.icon}</span>
                  <span>${e.name.replace(/[^a-zA-Z]/g, '').trim()}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="form-group mb-md">
            <label class="form-label">Name</label>
            <input type="text" class="form-input" id="spell-name-input" placeholder="${cfg.namePlaceholder}" value="${cfg.defaults[0].name}" />
          </div>

          <div class="form-group mb-md">
            <label class="form-label">${cfg.incantationLabel}</label>
            <input type="text" class="form-input" id="spell-incantation-input" placeholder="${cfg.incantPlaceholder}" value="${cfg.defaults[0].incantation}" />
          </div>

          <div class="form-group mb-md">
            <label class="form-label">Training Duration (Minutes)</label>
            <input type="number" class="form-input" id="spell-duration-input" min="5" max="120" value="25" />
          </div>

          <!-- Dynamic Power Gauge -->
          <div class="spell-power-meter">
            <div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">CALCULATED SPELL POWER</div>
              <div style="font-size: 0.9rem; font-weight: 700; color: var(--primary);" id="mana-cost-display">🔮 50 MP · ⚡ +75 XP</div>
            </div>
            <span class="power-rank-badge" id="spell-rank-display">S-RANK</span>
          </div>

          <button class="btn btn-primary btn-block btn-lg" id="craft-spell-btn">🔮 ${cfg.forgeTitle}</button>
        </div>

        <!-- Saved Grimoire Spells -->
        <div>
          <div class="grimoire-title">
            <span>${cfg.grimoireTitle}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${spells.length} Mastered</span>
          </div>

          <div class="grimoire-container" id="grimoire-list">
            ${spells.map(s => `
              <div class="spell-card" data-spell-id="${s.id}">
                <div class="spell-info">
                  <div class="spell-icon-wrapper">
                    <span>${s.element.split(' ')[0]}</span>
                  </div>
                  <div>
                    <div class="spell-name">${s.name}</div>
                    <div class="spell-incantation">"${s.incantation}"</div>
                    <div class="spell-meta-tags">
                      <span class="spell-tag">⏱️ ${s.duration} min</span>
                      <span class="spell-tag">🔮 ${s.mana || s.duration * 2} MP</span>
                      <span class="spell-tag" style="color: var(--accent);">${s.rank || 'A-RANK'}</span>
                    </div>
                  </div>
                </div>
                <div class="spell-actions">
                  <button class="btn-cast-spell" onclick="SpellsModule.castSpell('${s.id}')">${cfg.castBtn}</button>
                  <button class="btn-delete-spell" onclick="SpellsModule.deleteSpell('${s.id}')" title="Delete">🗑️</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindInputs();
  },

  bindInputs() {
    const durInput = document.getElementById('spell-duration-input');
    if (durInput) {
      durInput.addEventListener('input', () => this.updatePowerGauge());
    }
  },

  updatePowerGauge() {
    const dur = parseInt(document.getElementById('spell-duration-input')?.value) || 25;
    const mana = dur * 2;
    const xp = dur * 3;
    let rank = 'B-RANK';
    if (dur >= 45) rank = 'SS-RANK';
    else if (dur >= 25) rank = 'S-RANK';
    else if (dur >= 15) rank = 'A-RANK';

    const manaEl = document.getElementById('mana-cost-display');
    const rankEl = document.getElementById('spell-rank-display');
    if (manaEl) manaEl.textContent = `🔮 ${mana} MP · ⚡ +${xp} XP`;
    if (rankEl) rankEl.textContent = rank;
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      // Element selector click
      const elemBtn = e.target.closest('.element-btn');
      if (elemBtn) {
        document.querySelectorAll('.element-btn').forEach(b => b.classList.remove('active'));
        elemBtn.classList.add('active');
        this.selectedElement = elemBtn.dataset.element;

        AudioEngine.playSpellRuneHum();
        AudioEngine.playSpellCast(this.selectedElement);

        const visualizer = document.getElementById('magic-circle-visualizer');
        if (visualizer) visualizer.setAttribute('data-element', this.selectedElement);

        const elemObj = this.elements.find(el => el.name === this.selectedElement);
        if (elemObj) {
          const symbolEl = document.getElementById('active-rune-symbol');
          const labelEl = document.getElementById('active-spell-label');
          if (symbolEl) symbolEl.textContent = elemObj.icon;
          if (labelEl) labelEl.textContent = `${elemObj.name.toUpperCase()} MATRIX ACTIVE`;
        }
        return;
      }

      // Random Incantation Generator button
      if (e.target.id === 'random-incantation-btn') {
        this.generateRandomIncantation();
        return;
      }

      // Craft spell button
      if (e.target.id === 'craft-spell-btn') {
        this.craftSpell();
        return;
      }
    });
  },

  generateRandomIncantation() {
    AudioEngine.playClick();
    const p = this.incantationPrefixes[Math.floor(Math.random() * this.incantationPrefixes.length)];
    const s = this.incantationSuffixes[Math.floor(Math.random() * this.incantationSuffixes.length)];
    const nameInput = document.getElementById('spell-name-input');
    const incantInput = document.getElementById('spell-incantation-input');

    if (nameInput) nameInput.value = `${p} ${s}`;
    if (incantInput) incantInput.value = `${p} ${s} Invoco!`;
    this.updatePowerGauge();
  },

  craftSpell() {
    const name = document.getElementById('spell-name-input')?.value.trim();
    const incantation = document.getElementById('spell-incantation-input')?.value.trim() || 'Magia Invoco!';
    const duration = parseInt(document.getElementById('spell-duration-input')?.value) || 25;

    if (!name) {
      App.showToast('Please enter a spell name!', 'error');
      return;
    }

    let rank = 'B-RANK';
    if (duration >= 45) rank = 'SS-RANK';
    else if (duration >= 25) rank = 'S-RANK';
    else if (duration >= 15) rank = 'A-RANK';

    const data = Storage.load();
    if (!data.spells) data.spells = [];
    const newSpell = {
      id: 'sp-' + Date.now().toString(36),
      name,
      element: this.selectedElement,
      incantation,
      duration,
      mana: duration * 2,
      rank,
    };

    data.spells.push(newSpell);
    Storage.save(data);

    AudioEngine.playSpellCraft();
    App.showToast(`✨ Forged new spell: "${name}"!`, 'success');
    this.render();
  },

  deleteSpell(spellId) {
    AudioEngine.playClick();
    const data = Storage.load();
    if (!data.spells) return;
    data.spells = data.spells.filter(s => s.id !== spellId);
    Storage.save(data);
    App.showToast('Spell removed from grimoire.', 'info');
    this.render();
  },

  ensureRitualOverlay() {
    if (document.getElementById('spell-ritual-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'spell-ritual-overlay';
    overlay.className = 'spell-ritual-overlay';
    overlay.innerHTML = `
      <div class="ritual-speed-lines"></div>
      <div class="ritual-magic-circle">
        <span class="ritual-rune-icon" id="ritual-rune-icon">🔥</span>
      </div>
      <div class="ritual-incantation-title" id="ritual-incantation-text">IGNIS ARDENS INVOCO!</div>
      <div class="ritual-spell-subtitle" id="ritual-spell-subtitle">✨ SPELL CASTING RITUAL ACTIVE · +75 XP</div>
      <button class="ritual-close-btn" id="ritual-close-btn">⚡ BEGIN TRAINING SESSION</button>
    `;
    document.body.appendChild(overlay);

    document.getElementById('ritual-close-btn')?.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  },

  castSpell(spellId) {
    const data = Storage.load();
    const spell = (data.spells || []).find(s => s.id === spellId);
    if (!spell) return;

    const themeId = data.theme || 'sololeveling';
    const cfg = this.getThemeConfig(themeId);

    AudioEngine.ensureAudioUnlocked();
    AudioEngine.playSpellCast(spell.element);

    // Full screen anime spell casting ritual animation
    this.ensureRitualOverlay();
    const overlay = document.getElementById('spell-ritual-overlay');
    const runeIcon = document.getElementById('ritual-rune-icon');
    const incantText = document.getElementById('ritual-incantation-text');
    const subtitle = document.getElementById('ritual-spell-subtitle');

    if (runeIcon) runeIcon.textContent = spell.element.split(' ')[0] || '🔮';
    if (incantText) incantText.textContent = `"${spell.incantation.toUpperCase()}"`;
    if (subtitle) subtitle.textContent = `✨ ${spell.name.toUpperCase()} ${cfg.actionWord} · ${spell.duration} MIN TRAINING · +${spell.duration * 3} XP`;

    if (overlay) {
      overlay.classList.add('active');
    }

    // Record study session and award XP
    data.study.sessions.push({
      date: new Date().toISOString(),
      duration: spell.duration,
    });
    data.study.todayMinutes += spell.duration;
    Storage.save(data);

    const xpResult = Storage.addXp(spell.duration * 3);
    App.showXpPopup(spell.duration * 3);
    App.showToast(`✨ ${cfg.actionWord}: "${spell.incantation}"!`, 'xp');

    if (xpResult.leveledUp) {
      setTimeout(() => App.showRankUp(xpResult.newRank), 1200);
    }
  },
};

