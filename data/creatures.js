/* ============================================================
   CREATURES — Collectible entities per theme
   ~10 per universe, 4 rarity tiers
   ============================================================ */

const CREATURES = {
  /* ── Dragon Ball ───────────────────────────── */
  dragonball: [
    { id: 'db-01', name: 'Saibaman',        emoji: '🌱', rarity: 'common',    description: 'A planted warrior grown from a seed. Weak but sneaky.' },
    { id: 'db-02', name: 'Red Ribbon Drone', emoji: '🤖', rarity: 'common',    description: 'Mass-produced soldier bot from an old army.' },
    { id: 'db-03', name: 'Namekian Warrior', emoji: '💚', rarity: 'common',    description: 'A brave fighter from the green planet.' },
    { id: 'db-04', name: 'Krillin Clone',    emoji: '👨‍🦲', rarity: 'rare',     description: 'A spirited bald fighter with hidden power.' },
    { id: 'db-05', name: 'Ginyu Soldier',    emoji: '💪', rarity: 'rare',      description: 'Elite soldier with flamboyant poses.' },
    { id: 'db-06', name: 'Frieza Minion',    emoji: '👾', rarity: 'rare',      description: 'Henchman of the galactic tyrant.' },
    { id: 'db-07', name: 'Cell Jr',          emoji: '🧬', rarity: 'epic',      description: 'A bio-engineered miniature terror.' },
    { id: 'db-08', name: 'Majin Spirit',     emoji: '🫧', rarity: 'epic',      description: 'Fragment of ancient chaotic magic.' },
    { id: 'db-09', name: 'Golden Warrior',   emoji: '⚡', rarity: 'epic',      description: 'A warrior who has unlocked legendary power.' },
    { id: 'db-10', name: 'Eternal Dragon',   emoji: '🐉', rarity: 'legendary', description: 'Grant any wish. The ultimate summon.' },
  ],

  /* ── Naruto ────────────────────────────────── */
  naruto: [
    { id: 'nr-01', name: 'Training Dummy',    emoji: '🪵', rarity: 'common',    description: 'A wooden post. Every ninja starts here.' },
    { id: 'nr-02', name: 'Shadow Clone',      emoji: '👤', rarity: 'common',    description: 'A basic clone technique. Pops easily.' },
    { id: 'nr-03', name: 'Genin Scout',       emoji: '🥷', rarity: 'common',    description: 'A fresh academy graduate on patrol.' },
    { id: 'nr-04', name: 'Anbu Operative',    emoji: '🎭', rarity: 'rare',      description: 'Masked elite working from the shadows.' },
    { id: 'nr-05', name: 'Sand Golem',        emoji: '🏜️', rarity: 'rare',     description: 'Desert construct animated by chakra.' },
    { id: 'nr-06', name: 'Curse Mark Beast',  emoji: '🔥', rarity: 'rare',      description: 'Transformed warrior fueled by dark power.' },
    { id: 'nr-07', name: 'Toad Sage',         emoji: '🐸', rarity: 'epic',      description: 'Ancient amphibian master of nature energy.' },
    { id: 'nr-08', name: 'Akatsuki Phantom',  emoji: '☁️', rarity: 'epic',     description: 'Red-cloud rogue with unreadable intentions.' },
    { id: 'nr-09', name: 'Bijuu Fragment',    emoji: '🦊', rarity: 'epic',      description: 'A shard of tailed-beast chakra.' },
    { id: 'nr-10', name: 'Sage of Six Paths', emoji: '☯️', rarity: 'legendary', description: 'The origin of all ninja arts.' },
  ],

  /* ── Bleach ────────────────────────────────── */
  bleach: [
    { id: 'bl-01', name: 'Hollow Husk',       emoji: '💀', rarity: 'common',    description: 'A lost soul consumed by emptiness.' },
    { id: 'bl-02', name: 'Shinigami Cadet',   emoji: '⚔️', rarity: 'common',   description: 'Soul reaper in training. Still learning.' },
    { id: 'bl-03', name: 'Kidō Spark',        emoji: '✨', rarity: 'common',    description: 'A condensed ball of spiritual energy.' },
    { id: 'bl-04', name: 'Menos Grande',       emoji: '👹', rarity: 'rare',      description: 'A towering hollow made of countless souls.' },
    { id: 'bl-05', name: 'Zanpakutō Spirit',  emoji: '🗡️', rarity: 'rare',    description: 'The sentient soul within a blade.' },
    { id: 'bl-06', name: 'Arrancar Scout',     emoji: '🌑', rarity: 'rare',     description: 'Hollow that has torn away its own mask.' },
    { id: 'bl-07', name: 'Visored Shade',      emoji: '🎭', rarity: 'epic',     description: 'One who walks between shinigami and hollow.' },
    { id: 'bl-08', name: 'Espada Remnant',     emoji: '🌀', rarity: 'epic',     description: 'Fragment of the top ten warriors.' },
    { id: 'bl-09', name: 'Bankai Echo',        emoji: '💠', rarity: 'epic',     description: 'The resonance of an ultimate release.' },
    { id: 'bl-10', name: 'Soul King Fragment', emoji: '👑', rarity: 'legendary', description: 'A shard of the being that holds worlds together.' },
  ],

  /* ── Solo Leveling ─────────────────────────── */
  sololeveling: [
    { id: 'sl-01', name: 'E-Rank Spider',     emoji: '🕷️', rarity: 'common',   description: 'Low-level dungeon crawling arachnid.' },
    { id: 'sl-02', name: 'Stone Golem',        emoji: '🗿', rarity: 'common',    description: 'A lumbering dungeon guardian.' },
    { id: 'sl-03', name: 'Goblin Grunt',       emoji: '👺', rarity: 'common',    description: 'Green-skinned dungeon fodder.' },
    { id: 'sl-04', name: 'Shadow Soldier',     emoji: '🖤', rarity: 'rare',      description: 'Risen from the dead to serve the monarch.' },
    { id: 'sl-05', name: 'Ice Elf',            emoji: '❄️', rarity: 'rare',     description: 'Elegant but deadly frost mage.' },
    { id: 'sl-06', name: 'Red Gate Demon',     emoji: '😈', rarity: 'rare',     description: 'Fiend from a gate that never closes.' },
    { id: 'sl-07', name: 'Arch-Lich',          emoji: '☠️', rarity: 'epic',     description: 'Undead sorcerer of immense power.' },
    { id: 'sl-08', name: 'Dragon Knight',      emoji: '🐲', rarity: 'epic',     description: 'Armored warrior bonded with a wyrm.' },
    { id: 'sl-09', name: 'Monarch Shard',      emoji: '🔮', rarity: 'epic',     description: 'Crystallized authority of a Ruler.' },
    { id: 'sl-10', name: 'Shadow Monarch',     emoji: '👁️', rarity: 'legendary', description: 'The one who commands an army of shadows.' },
  ],

  /* ── Hunter x Hunter ───────────────────────── */
  hunterxhunter: [
    { id: 'hh-01', name: 'Foxbear Cub',       emoji: '🦊', rarity: 'common',    description: 'A fluffy but fierce forest creature.' },
    { id: 'hh-02', name: 'Exam Rookie',        emoji: '📝', rarity: 'common',    description: 'First-time Hunter Exam applicant.' },
    { id: 'hh-03', name: 'Nen Beast',          emoji: '👻', rarity: 'common',    description: 'A wild aura construct roaming free.' },
    { id: 'hh-04', name: 'Phantom Troupe Spy', emoji: '🕸️', rarity: 'rare',    description: 'Agent of the infamous spider gang.' },
    { id: 'hh-05', name: 'Chimera Ant Scout',  emoji: '🐜', rarity: 'rare',     description: 'Insectoid soldier with human-level cunning.' },
    { id: 'hh-06', name: 'Greed Island Card',  emoji: '🃏', rarity: 'rare',     description: 'A powerful game card made real.' },
    { id: 'hh-07', name: 'Royal Guard',        emoji: '🛡️', rarity: 'epic',    description: 'Elite protector of the ant king.' },
    { id: 'hh-08', name: 'Zoldyck Assassin',   emoji: '🌙', rarity: 'epic',    description: 'Born killer from the legendary family.' },
    { id: 'hh-09', name: 'Nen Master',         emoji: '🌟', rarity: 'epic',     description: 'One who has mastered all Nen types.' },
    { id: 'hh-10', name: 'King of Ants',       emoji: '👑', rarity: 'legendary', description: 'The apex predator. Power beyond measure.' },
  ],

  /* ── Pokémon ───────────────────────────────── */
  pokemon: [
    { id: 'pk-01', name: 'Leafling',          emoji: '🌿', rarity: 'common',    description: 'A tiny grass creature soaking up sunlight.' },
    { id: 'pk-02', name: 'Sparkmouse',        emoji: '⚡', rarity: 'common',    description: 'Electric rodent with rosy cheeks.' },
    { id: 'pk-03', name: 'Aquapup',           emoji: '💧', rarity: 'common',    description: 'Playful water pup that loves puddles.' },
    { id: 'pk-04', name: 'Flamewing',         emoji: '🔥', rarity: 'rare',      description: 'A fiery bird with magnificent plumage.' },
    { id: 'pk-05', name: 'Geodude Jr',        emoji: '🪨', rarity: 'rare',      description: 'A floating rock with a grumpy face.' },
    { id: 'pk-06', name: 'Ghostfog',          emoji: '👻', rarity: 'rare',      description: 'A mischievous spirit made of purple gas.' },
    { id: 'pk-07', name: 'Dragontide',        emoji: '🐉', rarity: 'epic',      description: 'Serpentine dragon of the deep seas.' },
    { id: 'pk-08', name: 'Psychowl',          emoji: '🦉', rarity: 'epic',      description: 'Owl with immense telekinetic power.' },
    { id: 'pk-09', name: 'Steelwing',         emoji: '🦅', rarity: 'epic',      description: 'Metallic raptor that cuts through storms.' },
    { id: 'pk-10', name: 'Celestial Beast',   emoji: '🌌', rarity: 'legendary', description: 'Cosmic entity said to have shaped the world.' },
  ],

  /* ── Demon Slayer ──────────────────────────── */
  demonslayer: [
    { id: 'ds-01', name: 'Kasugai Crow',      emoji: '🐦', rarity: 'common',    description: 'A talking messenger crow assigned to corps members.' },
    { id: 'ds-02', name: 'Temple Demon',      emoji: '👹', rarity: 'common',    description: 'A ravenous low-tier demon lurking in dark forests.' },
    { id: 'ds-03', name: 'Wisteria Moth',      emoji: '🦋', rarity: 'common',    description: 'A delicate insect drawn to demon-repelling blossoms.' },
    { id: 'ds-04', name: 'Swamp Demon',       emoji: '🌫️', rarity: 'rare',      description: 'A demon that splits into three bodies in liquid shadows.' },
    { id: 'ds-05', name: 'Temari Fiend',      emoji: '🤹‍♀️', rarity: 'rare',     description: 'Uses blood demon art to hurl destructive balls.' },
    { id: 'ds-06', name: 'Kyogai Drummer',    emoji: '🥁', rarity: 'rare',      description: 'Rotates rooms by striking drums embedded in his flesh.' },
    { id: 'ds-07', name: 'Lower Moon Shard',  emoji: '👁️', rarity: 'epic',      description: 'Fragment of a Twelve Kizuki member\'s dark essence.' },
    { id: 'ds-08', name: 'Flaming Tiger',     emoji: '🐅', rarity: 'epic',      description: 'A roaring aura beast forged from Flame Breathing.' },
    { id: 'ds-09', name: 'Water Dragon Spirit', emoji: '🌊', rarity: 'epic',    description: 'Flowing form of Tenth Form: Constant Flux.' },
    { id: 'ds-10', name: 'Progenitor Demon',  emoji: '🩸', rarity: 'legendary', description: 'The original demon whose blood grants terrible power.' },
  ],

  /* ── Wand and Sword (Wistoria) ─────────────── */
  wandandsword: [
    { id: 'ws-01', name: 'Mana Wisps',         emoji: '✨', rarity: 'common',    description: 'Floating luminous mana particles surrounding magical ruins.' },
    { id: 'ws-02', name: 'Gargoyle Sentinel', emoji: '🗿', rarity: 'common',    description: 'Animated stone guardian guarding lower academy floors.' },
    { id: 'ws-03', name: 'Spell Sprite',       emoji: '🧚', rarity: 'common',    description: 'Playful magic creature that feeds on elemental incantations.' },
    { id: 'ws-04', name: 'Frost Golem',        emoji: '❄️', rarity: 'rare',      description: 'Towering ice construct that freezes magical barriers.' },
    { id: 'ws-05', name: 'Flame Salamander',   emoji: '🦎', rarity: 'rare',      description: 'Fire element beast inhabiting underground lava ducts.' },
    { id: 'ws-06', name: 'Shadow Wraith',      emoji: '👤', rarity: 'rare',      description: 'Dark magic phantom immune to non-magical strikes.' },
    { id: 'ws-07', name: 'Chimera Beast',      emoji: '🦁', rarity: 'epic',      description: 'Three-headed magical fusion beast of intense ferocity.' },
    { id: 'ws-08', name: 'Spellblade Avatar',  emoji: '⚔️', rarity: 'epic',     description: 'Aura spirit embodying the synthesis of Wand magic and Sword mastery.' },
    { id: 'ws-09', name: 'Grand Magia Dragon', emoji: '🐲', rarity: 'epic',     description: 'Ancient dragon guarding the highest spire of Magia Tower.' },
    { id: 'ws-10', name: 'Magia Supreme Sovereign', emoji: '👑', rarity: 'legendary', description: 'The ultimate magician who commands all elemental forces.' },
  ],
};


