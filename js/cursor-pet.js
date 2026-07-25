/* ============================================================
   CURSOR PET — Theme-Aware Mouse Follower Anime Companion
   Smooth spring physics, running/idle animations, and theme pets
   ============================================================ */

const CursorPet = {
  container: null,
  element: null,
  targetX: window.innerWidth / 2,
  targetY: window.innerHeight / 2,
  currentX: window.innerWidth / 2,
  currentY: window.innerHeight / 2,
  vx: 0,
  vy: 0,
  facingLeft: false,
  isMoving: false,
  idleTimer: null,

  // Mascot sprite definitions per theme
  mascots: {
    blackclover: {
      name: 'Rouge (Fate Cat)',
      icon: '🐱',
      color: '#FF80AB',
      trail: '✨',
      avatarHtml: `
        <div class="pet-sprite pet-rouge">
          <span class="pet-emoji">🐱</span>
          <span class="pet-aura pink"></span>
        </div>
      `,
    },
    pokemon: {
      name: 'Pikachu',
      icon: '⚡',
      color: '#FFD600',
      trail: '⚡',
      avatarHtml: `
        <div class="pet-sprite pet-pikachu">
          <span class="pet-emoji">⚡</span>
          <span class="pet-aura yellow"></span>
        </div>
      `,
    },
  },

  // Pokémon Theme PokéFollowers Catalogue (Unlocked with Gym Badges & Trophies)
  pokemonFollowers: [
    { id: 'pikachu',    name: 'Pikachu',    icon: '⚡', aura: 'yellow', badge: 'Starter',      reqXp: 0,    unlocked: true },
    { id: 'eevee',      name: 'Eevee',      icon: '🦊', aura: 'orange', badge: 'Boulder Badge', reqXp: 200,  unlocked: true },
    { id: 'charmander', name: 'Charmander', icon: '🔥', aura: 'orange', badge: 'Cascade Badge', reqXp: 500,  unlocked: false },
    { id: 'squirtle',   name: 'Squirtle',   icon: '💧', aura: 'cyan',   badge: 'Thunder Badge', reqXp: 1000, unlocked: false },
    { id: 'bulbasaur',  name: 'Bulbasaur',  icon: '🍃', aura: 'green',  badge: 'Rainbow Badge', reqXp: 1500, unlocked: false },
    { id: 'gengar',     name: 'Gengar',     icon: '👻', aura: 'purple', badge: 'Soul Badge',    reqXp: 2500, unlocked: false },
    { id: 'lucario',    name: 'Lucario',    icon: '⚔️', aura: 'cyan',   badge: 'Marsh Badge',   reqXp: 4000, unlocked: false },
    { id: 'mewtwo',     name: 'Mewtwo',     icon: '🔮', aura: 'purple', badge: 'Volcano Badge', reqXp: 6000, unlocked: false },
    { id: 'rayquaza',   name: 'Rayquaza',   icon: '🐉', aura: 'gold',   badge: 'Earth Badge',   reqXp: 9000, unlocked: false },
    { id: 'arceus',     name: 'Arceus',     icon: '👑', aura: 'gold',   badge: 'League Trophy', reqXp: 15000, unlocked: false },
  ],

  activePokemonFollower: 'pikachu',

  setPokemonFollower(followerId) {
    this.activePokemonFollower = followerId;
    this.updateTheme();
  },

  naruto: {
      name: 'Pakkun (Ninja Pug)',
      icon: '🐶',
      color: '#FF9800',
      trail: '🍥',
      avatarHtml: `
        <div class="pet-sprite pet-pakkun">
          <span class="pet-emoji">🐶</span>
          <span class="pet-headband">🍥</span>
          <span class="pet-aura orange"></span>
        </div>
      `,
    },
    dragonball: {
      name: 'Flying Nimbus',
      icon: '☁️',
      color: '#FFEA00',
      trail: '🌟',
      avatarHtml: `
        <div class="pet-sprite pet-nimbus">
          <span class="pet-emoji">☁️</span>
          <span class="pet-aura gold"></span>
        </div>
      `,
    },
    bleach: {
      name: 'Kon Plush',
      icon: '🦁',
      color: '#FF9100',
      trail: '⚔️',
      avatarHtml: `
        <div class="pet-sprite pet-kon">
          <span class="pet-emoji">🦁</span>
          <span class="pet-aura cyan"></span>
        </div>
      `,
    },
    sololeveling: {
      name: 'Mini Beru (Shadow)',
      icon: '👑',
      color: '#00E5FF',
      trail: '🔥',
      avatarHtml: `
        <div class="pet-sprite pet-beru">
          <span class="pet-emoji">👑</span>
          <span class="pet-aura shadow"></span>
        </div>
      `,
    },
    hunterxhunter: {
      name: 'Greed Island Sprite',
      icon: '🃏',
      color: '#4CAF50',
      trail: '🎯',
      avatarHtml: `
        <div class="pet-sprite pet-greed">
          <span class="pet-emoji">🃏</span>
          <span class="pet-aura green"></span>
        </div>
      `,
    },
    demonslayer: {
      name: 'Chuchun (Sparrow)',
      icon: '🕊️',
      color: '#BA68C8',
      trail: '🌸',
      avatarHtml: `
        <div class="pet-sprite pet-sparrow">
          <span class="pet-emoji">🕊️</span>
          <span class="pet-aura purple"></span>
        </div>
      `,
    },
    wandandsword: {
      name: 'Spell Cat',
      icon: '🪄',
      color: '#00E5FF',
      trail: '✨',
      avatarHtml: `
        <div class="pet-sprite pet-magiccat">
          <span class="pet-emoji">🐱</span>
          <span class="pet-aura magic"></span>
        </div>
      `,
    },
    onepiece: {
      name: 'Tony Tony Chopper',
      icon: '🦌',
      color: '#FF4081',
      trail: '🌸',
      avatarHtml: `
        <div class="pet-sprite pet-chopper">
          <span class="pet-emoji">🦌</span>
          <span class="pet-aura pink"></span>
        </div>
      `,
    },
  },

  init() {
    this.createDOM();
    this.bindEvents();
    this.animate();
  },

  createDOM() {
    let petDiv = document.getElementById('cursor-pet-container');
    if (!petDiv) {
      petDiv = document.createElement('div');
      petDiv.id = 'cursor-pet-container';
      petDiv.className = 'cursor-pet-wrapper';
      document.body.appendChild(petDiv);
    }
    this.container = petDiv;
    this.updateTheme();
  },

  updateTheme() {
    if (!this.container) return;
    const data = Storage.load();
    const themeId = data.theme || 'blackclover';
    let petConfig = this.mascots[themeId] || this.mascots.blackclover;

    if (themeId === 'pokemon') {
      const activePk = this.pokemonFollowers.find(p => p.id === this.activePokemonFollower) || this.pokemonFollowers[0];
      petConfig = {
        name: activePk.name,
        icon: activePk.icon,
        trail: activePk.icon,
        avatarHtml: `
          <div class="pet-sprite pet-pokemon">
            <span class="pet-emoji">${activePk.icon}</span>
            <span class="pet-aura ${activePk.aura}"></span>
          </div>
        `,
      };
    }

    this.container.innerHTML = `
      <div class="cursor-pet-inner" id="cursor-pet-inner">
        ${petConfig.avatarHtml}
        <span class="pet-name-tooltip">${petConfig.name}</span>
      </div>
    `;
    this.element = document.getElementById('cursor-pet-inner');
  },

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
      this.isMoving = true;

      clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        this.isMoving = false;
      }, 300);
    });

    // Spawn tiny trail sparkles on click
    window.addEventListener('click', (e) => {
      this.spawnSparkle(e.clientX, e.clientY);
    });
  },

  animate() {
    // Smooth lag-follow physics (easing towards mouse cursor with offset)
    const dx = this.targetX + 22 - this.currentX;
    const dy = this.targetY + 22 - this.currentY;

    this.currentX += dx * 0.12;
    this.currentY += dy * 0.12;

    if (Math.abs(dx) > 2) {
      this.facingLeft = dx < 0;
    }

    if (this.container) {
      this.container.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0) scaleX(${this.facingLeft ? -1 : 1})`;
    }

    if (this.element) {
      if (this.isMoving) {
        this.element.classList.add('running');
        this.element.classList.remove('idle');
      } else {
        this.element.classList.remove('running');
        this.element.classList.add('idle');
      }
    }

    requestAnimationFrame(() => this.animate());
  },

  spawnSparkle(x, y) {
    const data = Storage.load();
    const themeId = data.theme || 'blackclover';
    const petConfig = this.mascots[themeId] || this.mascots.blackclover;

    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-pet-sparkle';
    sparkle.innerText = petConfig.trail;
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  },
};
