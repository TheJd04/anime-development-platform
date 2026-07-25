/* ============================================================
   THEMES — Configuration for each anime universe
   Ranks, bracket names, guild names, quotes, devices, map locations, etc.
   ============================================================ */

const THEMES = {
  /* ── Dragon Ball ───────────────────────────── */
  dragonball: {
    id: 'dragonball',
    name: 'Dragon Ball',
    tagline: 'Push Beyond Your Limits',
    emoji: '🐉',
    universe: 'Dragon World',
    diaryName: 'Training Log',

    device: {
      type: 'dragonradar',
      name: 'Dragon Radar',
      triggerIcon: '🧭',
      triggerLabel: 'Dragon Radar',
      subtitle: 'Capsule Corp Model-7 OS',
    },

    ranks: [
      { name: 'Earthling',          xp: 0,     tier: 1 },
      { name: 'Martial Artist',     xp: 200,   tier: 1 },
      { name: 'Z-Fighter',          xp: 500,   tier: 2 },
      { name: 'Super Saiyan',       xp: 1000,  tier: 3 },
      { name: 'Super Saiyan 2',     xp: 2000,  tier: 4 },
      { name: 'Super Saiyan 3',     xp: 3500,  tier: 5 },
      { name: 'Super Saiyan God',   xp: 5500,  tier: 5 },
      { name: 'Super Saiyan Blue',  xp: 8000,  tier: 6 },
      { name: 'Ultra Instinct',     xp: 12000, tier: 6 },
      { name: 'Beast Form',         xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Hyperbolic Time Chamber',
      exercise: 'Gravity Training',
      goals:    'Power Level Goals',
    },

    bracketIcons: {
      study:    '⏳',
      exercise: '🏋️',
      goals:    '📊',
    },

    guildName: 'Training Room',
    collectionName: 'Capsule Collection',
    enemyLabel: 'Enemies',
    xpName: 'Power Level',
    currencyName: 'Zeni',
    streakName: 'Training Streak',

    mapLocations: [
      {
        id: 'db-loc-1',
        name: 'Kame House',
        kanji: '亀仙人',
        x: 20, y: 70,
        type: 'Training Island',
        desc: 'Master Roshi\'s quiet island in the sea. The foundation of Turtle School martial arts training with heavy turtle shells.',
        quests: ['Beach Pushups', 'Turtle Shell Running', 'Ki Control Basics'],
        encounter: 'Master Roshi & Sea Turtle',
      },
      {
        id: 'db-loc-2',
        name: 'Capsule Corporation HQ',
        kanji: 'カプセルコーポレーション',
        x: 75, y: 30,
        type: 'Tech Metropolis',
        desc: 'Bulma and Dr. Brief\'s ultra-tech headquarters. Home to 100g Gravity Rooms and Saiyan Armor crafting.',
        quests: ['100g Gravity Simulation', 'Capsule Engineering Study'],
        encounter: 'Bulma & Dr. Brief',
      },
      {
        id: 'db-loc-3',
        name: 'Korin Tower & Kami Lookout',
        kanji: 'カリン塔',
        x: 45, y: 40,
        type: 'Sacred Sanctuary',
        desc: 'A sacred tower reaching above the clouds. Drink Senzu beans and train under Kami\'s watchful eye.',
        quests: ['Senzu Endurance Sprint', 'Cloud Balance Study'],
        encounter: 'Korin & Mr. Popo',
      },
      {
        id: 'db-loc-4',
        name: 'Hyperbolic Time Chamber',
        kanji: '精神と時の部屋',
        x: 50, y: 15,
        type: 'Dimensional Rift',
        desc: 'One year inside equals one day outside. Extreme gravity, fluctuating temperature, and boundless white void.',
        quests: ['1-Year Deep Focus Study', 'Ultra Saiyan Breakthrough'],
        encounter: 'Z-Fighter Spirit',
      },
      {
        id: 'db-loc-5',
        name: 'World Martial Arts Arena',
        kanji: '天下一武道会',
        x: 30, y: 55,
        type: 'Tournament Grounds',
        desc: 'The historic Tenkaichi Budokai arena where Earth\'s strongest martial artists test their limits.',
        quests: ['Ring Sparring Workout', 'Tournament Focus Sprint'],
        encounter: 'Budokai Announcer',
      },
      {
        id: 'db-loc-6',
        name: 'Sacred World of the Kai',
        kanji: '界王神界',
        x: 85, y: 80,
        type: 'God Realm',
        desc: 'The realm of Supreme Kais. Pull the Z-Sword from the mountain and unlock your hidden potential.',
        quests: ['Z-Sword Weight Training', 'Mystic Potential Unlocking'],
        encounter: 'Elder Kai & Kibito',
      },
    ],

    motivationalQuotes: [
      { text: 'I am the hope of the universe. I am the answer to all living things that cry out for peace.', source: 'Warrior of Legend' },
      { text: 'Power comes in response to a need, not a desire. You have to create that need.', source: 'Saiyan Proverb' },
      { text: 'Limits exist only to be surpassed. That is what it means to be a warrior.', source: 'Z-Fighter Wisdom' },
      { text: 'Even the mightiest warriors started by throwing a single punch.', source: 'Master of Martial Arts' },
      { text: 'The real enemy is the one that whispers you cannot improve.', source: 'Ancient Saiyan Saying' },
    ],
  },

  /* ── Naruto ────────────────────────────────── */
  naruto: {
    id: 'naruto',
    name: 'Naruto',
    tagline: 'Believe It — Your Ninja Way',
    emoji: '🍥',
    universe: 'Hidden Leaf Village',
    diaryName: 'Ninja Scroll Journal',

    device: {
      type: 'scroll',
      name: 'Ninja Scroll',
      triggerIcon: '📜',
      triggerLabel: 'Ninja Scroll',
      subtitle: 'Secret Shinobi Archives',
    },

    ranks: [
      { name: 'Academy Student',  xp: 0,     tier: 1 },
      { name: 'Genin',            xp: 200,   tier: 1 },
      { name: 'Chunin',           xp: 500,   tier: 2 },
      { name: 'Special Jonin',    xp: 1000,  tier: 3 },
      { name: 'Jonin',            xp: 2000,  tier: 4 },
      { name: 'Anbu Captain',     xp: 3500,  tier: 4 },
      { name: 'Sage Mode',        xp: 5500,  tier: 5 },
      { name: 'Tailed Beast Sync',xp: 8000,  tier: 6 },
      { name: 'Six Paths',        xp: 12000, tier: 6 },
      { name: 'Hokage',           xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Scroll Study',
      exercise: 'Ninja Training',
      goals:    'Mission Objectives',
    },

    bracketIcons: {
      study:    '📜',
      exercise: '🥷',
      goals:    '🎯',
    },

    guildName: 'Hidden Village',
    collectionName: 'Bingo Book',
    enemyLabel: 'Rogue Ninja',
    xpName: 'Chakra',
    currencyName: 'Ryō',
    streakName: 'Mission Streak',

    mapLocations: [
      {
        id: 'nr-loc-1',
        name: 'Hidden Leaf Village (Konohagakure)',
        kanji: '木ノ葉隠れの里',
        x: 58, y: 82,
        type: 'Ninja Citadel',
        desc: 'The village hidden in the leaves under Hokage Rock faces. Home of Ichiraku Ramen and the Ninja Academy.',
        quests: ['Academy Scroll Reading', 'Ramen Shop Dash', 'Tree Walking Drill'],
        encounter: 'Iruka Sensei & Teuchi',
      },
      {
        id: 'nr-loc-2',
        name: 'Forest of Death',
        kanji: '死の森',
        x: 52, y: 38,
        type: 'Exam Survival Zone',
        desc: 'A giant 10km fenced zone filled with giant beasts and poisonous flora. The battlefield of the 2nd Chunin Exam.',
        quests: ['Heaven & Earth Scroll Hunt', 'Survival Sprint'],
        encounter: 'Anko Mitarashi',
      },
      {
        id: 'nr-loc-3',
        name: 'Valley of the End',
        kanji: '終末の谷',
        x: 74, y: 24,
        type: 'Historic Monument',
        desc: 'Massive statues of Hashirama Senju and Madara Uchiha towering over a thundering waterfall. Place of destiny.',
        quests: ['Waterfall Meditation', 'Chakra Control Focus'],
        encounter: 'Rival Shinobi Shadow',
      },
      {
        id: 'nr-loc-4',
        name: 'Mount Myoboku',
        kanji: '妙木山',
        x: 14, y: 26,
        type: 'Toad Sage Realm',
        desc: 'The secret land of giant toads and natural energy. Gather Senjutsu chakra on oil balance pedestals.',
        quests: ['Senjutsu Stillness Meditation', 'Toad Oil Balance Workout'],
        encounter: 'Fukasaku & Shima',
      },
      {
        id: 'nr-loc-5',
        name: 'Hidden Sand Village (Sunagakure)',
        kanji: '砂隠れの里',
        x: 20, y: 52,
        type: 'Desert Fortress',
        desc: 'Fortified inside a natural desert canyon. Home of Puppet jutsu and Wind Release masters.',
        quests: ['Sandstorm Endurance Run', 'Wind Jutsu Scroll Study'],
        encounter: 'Gaara & Temari',
      },
      {
        id: 'nr-loc-6',
        name: 'Akatsuki Hideout',
        kanji: '暁のアジト',
        x: 78, y: 66,
        type: 'Rogue Den',
        desc: 'A hidden cave sealed by a Five-Seal Barrier deep in rainy mountains.',
        quests: ['Barrier Breaking Task', 'Shadow Clones Study'],
        encounter: 'Red Cloud Shadow',
      },
    ],

    motivationalQuotes: [
      { text: 'I\'m not gonna run away. I never go back on my word. That\'s my ninja way.', source: 'Leaf Village Hero' },
      { text: 'Hard work is worthless for those who don\'t believe in themselves.', source: 'Green Beast of the Leaf' },
      { text: 'A ninja must see through deception — especially the lies they tell themselves.', source: 'Copy Ninja' },
      { text: 'When people are protecting something truly precious, they become as strong as they need to be.', source: 'First Hokage' },
      { text: 'The difference between stupidity and genius is that genius has its limits.', source: 'Lazy Genius' },
    ],
  },

  /* ── Bleach ────────────────────────────────── */
  bleach: {
    id: 'bleach',
    name: 'Bleach',
    tagline: 'Abandon Your Fear — Look Forward',
    emoji: '⚔️',
    universe: 'Soul Society',
    diaryName: 'Soul Records',

    device: {
      type: 'soulpager',
      name: 'Soul Pager',
      triggerIcon: '📟',
      triggerLabel: 'Soul Pager',
      subtitle: 'Seireitei Denreishinki OS',
    },

    ranks: [
      { name: 'Living Soul',       xp: 0,     tier: 1 },
      { name: 'Unseated Officer',   xp: 200,   tier: 1 },
      { name: 'Seated Officer',     xp: 500,   tier: 2 },
      { name: '3rd Seat',           xp: 1000,  tier: 3 },
      { name: 'Lieutenant',         xp: 2000,  tier: 4 },
      { name: 'Shikai Released',    xp: 3500,  tier: 4 },
      { name: 'Captain',            xp: 5500,  tier: 5 },
      { name: 'Bankai Achieved',    xp: 8000,  tier: 6 },
      { name: 'Visored',            xp: 12000, tier: 6 },
      { name: 'Captain Commander',  xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Kidō Practice',
      exercise: 'Zanpakutō Training',
      goals:    'Soul Missions',
    },

    bracketIcons: {
      study:    '📖',
      exercise: '🗡️',
      goals:    '💀',
    },

    guildName: 'Soul Society',
    collectionName: 'Hollow Registry',
    enemyLabel: 'Hollows',
    xpName: 'Reiatsu',
    currencyName: 'Kan',
    streakName: 'Patrol Streak',

    mapLocations: [
      {
        id: 'bl-loc-1',
        name: 'Karakura Town',
        kanji: '空座町',
        x: 25, y: 70,
        type: 'Human World Sector',
        desc: 'A spiritual hotspot in the living world. Urahara Shop stocks Soul Candy and Gigai supplies.',
        quests: ['Hollow Patrol Run', 'Karakura High Study Session'],
        encounter: 'Kisuke Urahara & Yoruichi',
      },
      {
        id: 'bl-loc-2',
        name: 'Seireitei (13 Court Guard Squads)',
        kanji: '瀞霊廷',
        x: 50, y: 40,
        type: 'Soul Capital Citadel',
        desc: 'The walled city of Soul Reapers. Contains Squad 1 HQ, Kidō Corps, and the Central 46 chamber.',
        quests: ['Kidō Incantation Study', 'Shunpo Step Sprint'],
        encounter: 'Squad Captains',
      },
      {
        id: 'bl-loc-3',
        name: 'Rukongai District 80 (Zaraki)',
        kanji: '流魂街',
        x: 75, y: 55,
        type: 'Outskirt Wilderness',
        desc: 'The lawless 80th district of Soul Society where Kenpachi Zaraki carved his reputation.',
        quests: ['Heavy Sword Sparring', 'Unflinching Focus Drill'],
        encounter: 'Kenpachi Zaraki',
      },
      {
        id: 'bl-loc-4',
        name: 'Hueco Mundo & Las Noches',
        kanji: '虚圏',
        x: 80, y: 15,
        type: 'Hollow Desert Realm',
        desc: 'An endless white sand desert under an inverted moon. Crowned by Aizen\'s palace of Las Noches.',
        quests: ['Reishi Sand Sprint', 'Desolation Endurance'],
        encounter: 'Espada Remnant',
      },
      {
        id: 'bl-loc-5',
        name: 'Soul King Palace',
        kanji: '霊王宮',
        x: 50, y: 10,
        type: 'Royal Celestial Domain',
        desc: 'Floating cities in the stratosphere guarded by Squad Zero. The pinnacle of spiritual density.',
        quests: ['Bankai Refinement Study', 'Royal Bath Recovery'],
        encounter: 'Squad Zero Officer',
      },
    ],

    motivationalQuotes: [
      { text: 'We must not shed tears. For that is the surrender of the body to the heart.', source: 'Head Captain' },
      { text: 'If you give up, that is when the fight is over.', source: 'Soul Reaper Proverb' },
      { text: 'We stand in awe before that which cannot be seen, and we respect with every fiber that which cannot be explained.', source: '13th Division Philosophy' },
      { text: 'People can bring their hearts together. The true enemy is giving up.', source: 'Substitute Soul Reaper' },
      { text: 'The blade is me. I am the blade. There is no separation.', source: 'Zanpakutō Wisdom' },
    ],
  },

  /* ── Solo Leveling ─────────────────────────── */
  sololeveling: {
    id: 'sololeveling',
    name: 'Solo Leveling',
    tagline: 'Arise — The System Has Chosen You',
    emoji: '⚡',
    universe: 'The System',
    diaryName: 'System Log',

    device: {
      type: 'system',
      name: 'System Window',
      triggerIcon: '🌐',
      triggerLabel: 'System Panel',
      subtitle: 'Player Subsystem Interface',
    },

    ranks: [
      { name: 'E-Rank Hunter',     xp: 0,     tier: 1 },
      { name: 'D-Rank Hunter',     xp: 200,   tier: 1 },
      { name: 'C-Rank Hunter',     xp: 500,   tier: 2 },
      { name: 'B-Rank Hunter',     xp: 1000,  tier: 3 },
      { name: 'A-Rank Hunter',     xp: 2000,  tier: 4 },
      { name: 'S-Rank Hunter',     xp: 3500,  tier: 5 },
      { name: 'National Level',    xp: 5500,  tier: 5 },
      { name: 'Shadow Monarch',    xp: 8000,  tier: 6 },
      { name: 'Ruler',             xp: 12000, tier: 6 },
      { name: 'Absolute Being',    xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Intelligence Stat',
      exercise: 'Strength Training',
      goals:    'Daily Quest',
    },

    bracketIcons: {
      study:    '🧠',
      exercise: '💪',
      goals:    '📋',
    },

    guildName: 'The System',
    collectionName: 'Shadow Army',
    enemyLabel: 'Dungeon Monsters',
    xpName: 'Experience Points',
    currencyName: 'Gold',
    streakName: 'Quest Streak',

    mapLocations: [
      {
        id: 'sl-loc-1',
        name: 'Seoul Hunter Association HQ',
        kanji: 'ハンター協会',
        x: 35, y: 55,
        type: 'Hunter Operations Center',
        desc: 'The central administration where Mana meters rank Hunters from E to S class.',
        quests: ['Mana Measurement Test', 'Daily Quest Pushups'],
        encounter: 'Chairman Go Gun-Hee',
      },
      {
        id: 'sl-loc-2',
        name: 'Double Dungeon (Cartenon Temple)',
        kanji: '二重ダンジョン',
        x: 20, y: 35,
        type: 'Forbidden Temple',
        desc: 'The hidden D-rank gate containing giant stone statues and the Commandments of the God Statue.',
        quests: ['Commandment Reading Task', 'Statue Dodge Fitness'],
        encounter: 'God Statue & Architect',
      },
      {
        id: 'sl-loc-3',
        name: 'Jeju Island Raid Sector',
        kanji: '済州島',
        x: 65, y: 75,
        type: 'S-Rank Disaster Gate',
        desc: 'An island overtaken by evolved Chimera Ant monsters led by the Ant King Beru.',
        quests: ['Ant Colony Cleanup Run', 'S-Rank Focus Sprint'],
        encounter: 'Beru Shadow',
      },
      {
        id: 'sl-loc-4',
        name: 'Red Gate (Snowy Forest)',
        kanji: 'レッドゲート',
        x: 75, y: 30,
        type: 'Isolated Rift Realm',
        desc: 'A gate that severed connection with the outside world. Freezing snowland ruled by Baruka.',
        quests: ['Sub-Zero Conditioning Run', 'Survival Intel Study'],
        encounter: 'Baruka Ice Elf',
      },
      {
        id: 'sl-loc-5',
        name: 'Demon Castle (100th Floor)',
        kanji: '悪魔城',
        x: 45, y: 15,
        type: 'System Instant Dungeon',
        desc: 'A 100-story burning tower containing Holy Water recipe ingredients and Demon King Baran.',
        quests: ['Demon King Sprint', 'Alchemy Recipe Study'],
        encounter: 'Demon King Baran',
      },
    ],

    motivationalQuotes: [
      { text: 'I alone level up. No one else will walk this path for me.', source: 'The System' },
      { text: 'You have leveled up. New strength has been acquired.', source: 'System Notification' },
      { text: 'The weak do not get to choose how they die. Become strong.', source: 'S-Rank Hunter' },
      { text: 'A daily quest has been issued. Failure to complete will result in penalty.', source: 'The System' },
      { text: 'Arise. You are not done yet.', source: 'Shadow Monarch' },
    ],
  },

  /* ── Hunter x Hunter ───────────────────────── */
  hunterxhunter: {
    id: 'hunterxhunter',
    name: 'Hunter x Hunter',
    tagline: 'You Should Enjoy the Detours',
    emoji: '🃏',
    universe: 'Hunter Association',
    diaryName: 'Field Notes',

    device: {
      type: 'hunterphone',
      name: 'Beetle 07 Phone',
      triggerIcon: '📱',
      triggerLabel: 'Beetle Phone',
      subtitle: 'Hunter Association Network',
    },

    ranks: [
      { name: 'Exam Applicant',    xp: 0,     tier: 1 },
      { name: 'Amateur Hunter',    xp: 200,   tier: 1 },
      { name: 'Licensed Hunter',   xp: 500,   tier: 2 },
      { name: 'Single-Star Hunter',xp: 1000,  tier: 3 },
      { name: 'Nen Awakened',      xp: 2000,  tier: 3 },
      { name: 'Double-Star Hunter', xp: 3500,  tier: 4 },
      { name: 'Nen Master',        xp: 5500,  tier: 5 },
      { name: 'Triple-Star Hunter', xp: 8000,  tier: 6 },
      { name: 'Zodiac',            xp: 12000, tier: 6 },
      { name: 'Chairman',          xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Nen Study',
      exercise: 'Physical Enhancement',
      goals:    'Hunter Objectives',
    },

    bracketIcons: {
      study:    '🔮',
      exercise: '🏃',
      goals:    '🎯',
    },

    guildName: 'Hunter Association',
    collectionName: 'Greed Island Cards',
    enemyLabel: 'Chimera Ants',
    xpName: 'Nen Points',
    currencyName: 'Jenny',
    streakName: 'Training Streak',

    mapLocations: [
      {
        id: 'hh-loc-1',
        name: 'Greed Island (Start Point)',
        kanji: 'グリードアイランド',
        x: 50, y: 50,
        type: 'Nen Game Island',
        desc: 'The legendary real-world video game designed by Ging Freecss for Hunters.',
        quests: ['Book & Gain Spell Reading', 'Rock-Paper-Scissors Workout'],
        encounter: 'Biscuit Krueger & Gon',
      },
      {
        id: 'hh-loc-2',
        name: 'Masadora (City of Magic Spells)',
        kanji: 'マサドラ',
        x: 65, y: 35,
        type: 'Spell Trading Hub',
        desc: 'The town in Greed Island famous for spell card shops and bandit encounters.',
        quests: ['Card Binder Organization', 'Spur-of-Moment Sprint'],
        encounter: 'Spell Card Vendor',
      },
      {
        id: 'hh-loc-3',
        name: 'Heavens Arena',
        kanji: '天空闘技場',
        x: 25, y: 40,
        type: '251-Story Fighting Tower',
        desc: 'The world\'s popular combat site where fighters earn cash and master Nen on the 200th floor.',
        quests: ['200th Floor Sparring', 'Ren Aura Concentration'],
        encounter: 'Hisoka & Wing',
      },
      {
        id: 'hh-loc-4',
        name: 'Whale Island',
        kanji: 'くじら島',
        x: 15, y: 70,
        type: 'Peaceful Island Home',
        desc: 'Gon\'s hometown surrounded by lush forests and Master of the Swamp fish.',
        quests: ['Swamp Fishing Sprint', 'Nature Observation Study'],
        encounter: 'Mito Freecss',
      },
      {
        id: 'hh-loc-5',
        name: 'Yorknew City',
        kanji: 'ヨークシンシティ',
        x: 80, y: 65,
        type: 'Auction Metropolis',
        desc: 'Site of the world\'s largest September auction, hunted by the Phantom Troupe.',
        quests: ['Southernpiece Auction Study', 'Troupe Evasion Cardio'],
        encounter: 'Phantom Troupe Spider',
      },
      {
        id: 'hh-loc-6',
        name: 'Dark Continent Border',
        kanji: '暗黒大陸',
        x: 85, y: 15,
        type: 'Uncharted Wild Frontier',
        desc: 'The colossal land outside the known world where Five Great Calamities originate.',
        quests: ['Survival Research Study', 'Extreme Stamina Drill'],
        encounter: 'Ging Freecss',
      },
    ],

    motivationalQuotes: [
      { text: 'You should enjoy the little detours to the fullest. Because that\'s where you\'ll find the things more important than what you want.', source: 'Former Chairman' },
      { text: 'If you want to get to know someone, find out what makes them angry.', source: 'Transmuter Proverb' },
      { text: 'Nen reflects the will. Strengthen your will, strengthen your Nen.', source: 'Nen Master' },
      { text: 'An apology is a promise to do things differently next time, and to keep the promise.', source: 'Hunter Wisdom' },
      { text: 'When I say it doesn\'t hurt, it means I can bear it.', source: 'Enhancer Philosophy' },
    ],
  },

  /* ── Pokémon ───────────────────────────────── */
  pokemon: {
    id: 'pokemon',
    name: 'Pokémon',
    tagline: 'Gotta Level \'Em All Up',
    emoji: '⭐',
    universe: 'Pokédex Lab',
    diaryName: 'Journey Journal',

    device: {
      type: 'pokedex',
      name: 'Pokédex',
      triggerIcon: '📕',
      triggerLabel: 'Pokédex',
      subtitle: 'MODEL HANDY-505 OS',
    },

    ranks: [
      { name: 'Beginner Trainer',  xp: 0,     tier: 1 },
      { name: 'Bug Catcher',      xp: 200,   tier: 1 },
      { name: 'Gym Challenger',   xp: 500,   tier: 2 },
      { name: 'Badge Collector',  xp: 1000,  tier: 3 },
      { name: 'Ace Trainer',      xp: 2000,  tier: 4 },
      { name: 'Elite Four',       xp: 3500,  tier: 5 },
      { name: 'Champion',         xp: 5500,  tier: 5 },
      { name: 'Battle Legend',    xp: 8000,  tier: 6 },
      { name: 'Regional Professor', xp: 12000, tier: 6 },
      { name: 'Pokémon Master',   xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Pokédex Research',
      exercise: 'Trainer Fitness',
      goals:    'Daily Catches',
    },

    bracketIcons: {
      study:    '📚',
      exercise: '🏃‍♂️',
      goals:    '🎒',
    },

    guildName: 'Pokédex Lab',
    collectionName: 'Pokédex',
    enemyLabel: 'Wild Pokémon',
    xpName: 'Trainer XP',
    currencyName: 'PokéDollars',
    streakName: 'Daily Streak',

    mapLocations: [
      {
        id: 'pk-loc-1',
        name: 'Pallet Town & Oak Lab',
        kanji: 'マサラタウン',
        x: 20, y: 75,
        type: 'Quiet Hometown',
        desc: 'A pure white town where journey beginnings start. Professor Oak awards starter Pokémon here.',
        quests: ['Starter Reading Session', 'Route 1 Jog'],
        encounter: 'Professor Oak & Red',
      },
      {
        id: 'pk-loc-2',
        name: 'Viridian Forest',
        kanji: 'トキワの森',
        x: 25, y: 55,
        type: 'Lush Bug Preserve',
        desc: 'A dense natural maze trees where sunlight barely penetrates. Famous for Pikachu and Caterpie.',
        quests: ['Bug Catching Cardio', 'Berry Foraging Research'],
        encounter: 'Bug Catcher Sam',
      },
      {
        id: 'pk-loc-3',
        name: 'Mt. Moon',
        kanji: 'オツキミやま',
        x: 45, y: 35,
        type: 'Mystic Mountain Cave',
        desc: 'A cavern known for rare Moon Stones and Clefairy dancing under meteor showers.',
        quests: ['Fossil Discovery Study', 'Cave Exploration Walk'],
        encounter: 'Super Nerd & Clefairy',
      },
      {
        id: 'pk-loc-4',
        name: 'Cerulean Gym',
        kanji: 'ハナダジム',
        x: 60, y: 30,
        type: 'Water Battle Arena',
        desc: 'An indoor swimming pool arena hosted by Misty and the Sensational Sisters.',
        quests: ['Swimming Lap Workout', 'Water Type Move Study'],
        encounter: 'Misty',
      },
      {
        id: 'pk-loc-5',
        name: 'Safari Zone (Fuchsia)',
        kanji: 'サファリゾーン',
        x: 50, y: 70,
        type: 'Wildlife Preserve',
        desc: 'A vast open park where trainers use Bait and Rocks to catch rare wild Chansey and Scyther.',
        quests: ['30-Step Safari Cardio', 'Pokedex Entry Log'],
        encounter: 'Warden Slowpoke',
      },
      {
        id: 'pk-loc-6',
        name: 'Indigo Plateau',
        kanji: 'セキエイこうげん',
        x: 15, y: 30,
        type: 'League HQ Arena',
        desc: 'The ultimate destination where the Elite Four and League Champion await challengers.',
        quests: ['Champion Level Focus', 'Full Team Conditioning'],
        encounter: 'Lance & Dragonite',
      },
    ],

    motivationalQuotes: [
      { text: 'I see now that the circumstances of one\'s birth are irrelevant; it is what you do with the gift of life that determines who you are.', source: 'Legendary Psychic' },
      { text: 'Strong trainers are those who raise their partners with love and dedication.', source: 'Regional Professor' },
      { text: 'Do you want to have a strong team? Then train every single day.', source: 'Gym Leader' },
      { text: 'The important thing is not how long you live. It\'s what you accomplish with your life.', source: 'Aura Guardian' },
      { text: 'There\'s no Pokemon that can\'t be befriended. It just takes patience and heart.', source: 'Master Trainer' },
    ],

    regions: [
      {
        id: 'kanto',
        name: 'Kanto Region',
        kanji: 'カントー地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 1 · Indigo League · Pallet Town, Viridian Forest, Mt. Moon, Cerulean Gym, Safari Zone, Indigo Plateau',
        locations: [
          { id: 'pk-loc-1', name: 'Pallet Town & Oak Lab', kanji: 'マサラタウン', x: 20, y: 75, type: 'Quiet Hometown', desc: 'A pure white town where journey beginnings start. Professor Oak awards starter Pokémon here.', quests: ['Starter Reading Session', 'Route 1 Jog'], encounter: 'Professor Oak & Red' },
          { id: 'pk-loc-2', name: 'Viridian Forest', kanji: 'トキワの森', x: 25, y: 55, type: 'Lush Bug Preserve', desc: 'A dense natural maze where sunlight barely penetrates.', quests: ['Bug Catching Cardio', 'Berry Foraging Research'], encounter: 'Bug Catcher Sam' },
          { id: 'pk-loc-3', name: 'Mt. Moon', kanji: 'オツキミやま', x: 45, y: 35, type: 'Mystic Mountain Cave', desc: 'A cavern known for rare Moon Stones and Clefairy meteor showers.', quests: ['Fossil Discovery Study', 'Cave Exploration Walk'], encounter: 'Super Nerd & Clefairy' },
          { id: 'pk-loc-4', name: 'Cerulean Gym', kanji: 'ハナダジム', x: 60, y: 30, type: 'Water Battle Arena', desc: 'An indoor swimming pool arena hosted by Misty.', quests: ['Swimming Lap Workout', 'Water Type Move Study'], encounter: 'Misty' },
          { id: 'pk-loc-5', name: 'Safari Zone (Fuchsia)', kanji: 'サファリゾーン', x: 50, y: 70, type: 'Wildlife Preserve', desc: 'Vast open park to catch rare wild Pokémon.', quests: ['30-Step Safari Cardio', 'Pokedex Entry Log'], encounter: 'Warden Slowpoke' },
          { id: 'pk-loc-6', name: 'Indigo Plateau', kanji: 'セキエイこうげん', x: 15, y: 30, type: 'League HQ Arena', desc: 'The ultimate destination where Elite Four and Champion await.', quests: ['Champion Level Focus', 'Full Team Conditioning'], encounter: 'Lance & Dragonite' },
        ]
      },
      {
        id: 'orange',
        name: 'Orange Archipelago (Orange Islands)',
        kanji: 'オレンジ諸島',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Anime Arc · Orange League · Valencia Island, Navel Island, Pummelo Stadium',
        locations: [
          { id: 'oi-loc-1', name: 'Valencia Island & GS Ball Lab', kanji: 'ヴァレンシア島', x: 25, y: 75, type: 'Tropical Lab Island', desc: 'Professor Ivy’s laboratory where Ash received the mysterious GS Ball.', quests: ['GS Ball Research Session', 'Island Beach Sprint'], encounter: 'Professor Ivy & Lapras' },
          { id: 'oi-loc-2', name: 'Navel Island Peak', kanji: 'ネーブル島', x: 45, y: 45, type: 'Icy Mountain Trail', desc: 'Danny’s gym challenge involving bobsled racing down a frozen peak.', quests: ['Bobsled Cardio Sprint', 'Ice Sculpting Focus'], encounter: 'Gym Leader Danny' },
          { id: 'oi-loc-3', name: 'Pummelo Stadium', kanji: 'カンピロスタジアム', x: 75, y: 35, type: 'Orange League Arena', desc: 'Where Ash defeated Drake and Dragonite to win the Winner’s Trophy.', quests: ['Winners Trophy Battle Prep', '6v6 Full Team Fitness'], encounter: 'Supreme Gym Leader Drake' },
        ]
      },
      {
        id: 'johto',
        name: 'Johto Region',
        kanji: 'ジョウト地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 2 · Silver Conference · New Bark Town, Sprout Tower, Goldenrod City, Mt. Silver',
        locations: [
          { id: 'jh-loc-1', name: 'New Bark Town', kanji: 'ワカバタウン', x: 25, y: 70, type: 'Town of Winds', desc: 'Where the winds of a new era blow. Elm Lab starter distribution.', quests: ['New Bark Jog', 'Elm Research Study'], encounter: 'Professor Elm' },
          { id: 'jh-loc-2', name: 'Sprout Tower (Violet)', kanji: 'マダツボミのとう', x: 40, y: 40, type: 'Ancient Wooden Pagoda', desc: 'A tall wooden tower swaying like Bellsprout.', quests: ['Swaying Balance Meditation', 'Sprout Tower Cardio'], encounter: 'Elder Li & Bellsprout' },
          { id: 'jh-loc-3', name: 'Goldenrod Radio Tower', kanji: 'コガネシティ', x: 60, y: 55, type: 'Metropolis Hub', desc: 'The largest city in Johto housing the Magnet Train and Radio Tower.', quests: ['Radio Broadcast Sprint', 'Goldenrod Mall Run'], encounter: 'Whitney & Clefairy' },
          { id: 'jh-loc-4', name: 'Mt. Silver Summit', kanji: 'シロガネやま', x: 80, y: 30, type: 'Legendary Peak', desc: 'The highest frozen mountain in Kanto/Johto where Trainer Red trains.', quests: ['Summit Blizzard Climb', 'Legendary Trainer Battle Focus'], encounter: 'Trainer Red' },
        ]
      },
      {
        id: 'hoenn',
        name: 'Hoenn Region',
        kanji: 'ホウエン地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 3 · Ever Grande Conference · Littleroot, Petalburg, Mt. Chimney, Marine Cave',
        locations: [
          { id: 'hn-loc-1', name: 'Littleroot Town', kanji: 'ミシロタウン', x: 20, y: 80, type: 'Coastal Haven', desc: 'A town that can’t be shaded any color. Professor Birch’s field lab.', quests: ['Birch Field Research Run', 'Route 101 Jog'], encounter: 'Professor Birch & May' },
          { id: 'hn-loc-2', name: 'Mt. Chimney Volcano', kanji: 'えんとつやま', x: 50, y: 35, type: 'Active Volcano Peak', desc: 'Cable car mountain peak where Team Magma & Aqua clash.', quests: ['Volcanic Cable Climb', 'Heat Resistance Fitness'], encounter: 'Maxie & Archie' },
          { id: 'hn-loc-3', name: 'Ever Grande City', kanji: 'サイユウシティ', x: 85, y: 65, type: 'Flower Ocean Citadel', desc: 'A city filled with flowers and water waterfalls leading to Hoenn League.', quests: ['Ever Grande Waterfall Swim', 'Hoenn Champion Focus'], encounter: 'Steven Stone & Metagross' },
        ]
      },
      {
        id: 'sinnoh',
        name: 'Sinnoh Region',
        kanji: 'シンオウ地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 4 · Lily of the Valley Conference · Mt. Coronet, Eterna Forest, Spear Pillar',
        locations: [
          { id: 'sn-loc-1', name: 'Twinleaf Town', kanji: 'フタバタウン', x: 20, y: 75, type: 'Snowy Quiet Village', desc: 'Fresh green town where young trainers dream of Dialga and Palkia.', quests: ['Lake Verity Sprint', 'Starter Choice Study'], encounter: 'Professor Rowan' },
          { id: 'sn-loc-2', name: 'Spear Pillar (Mt. Coronet)', kanji: 'やりのはしら', x: 50, y: 30, type: 'Dimensional Ruins', desc: 'Ancient ruins at the peak of Mt. Coronet where time and space converge.', quests: ['Space-Time Meditation', 'Spear Pillar Summit Run'], encounter: 'Cynthia & Garchomp' },
          { id: 'sn-loc-3', name: 'Lily of the Valley Island', kanji: 'スズランじま', x: 85, y: 40, type: 'Conference Grounds', desc: 'The site of the Sinnoh League tournament where Ash fought Tobias.', quests: ['Tournament Prep Workout', 'Sinnoh Championship Study'], encounter: 'Tobias & Darkrai' },
        ]
      },
      {
        id: 'unova',
        name: 'Unova Region',
        kanji: 'イッシュ地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 5 · Vertress Conference · Nuvema Town, Castelia City, Dragonspiral Tower',
        locations: [
          { id: 'un-loc-1', name: 'Nuvema Town', kanji: 'カノコタウン', x: 20, y: 70, type: 'Coastal Frontier', desc: 'Professor Juniper’s laboratory starting point for Unova trainers.', quests: ['Juniper Starter Study', 'Nuvema Jog'], encounter: 'Professor Juniper' },
          { id: 'un-loc-2', name: 'Castelia City', kanji: 'ヒウンシティ', x: 50, y: 55, type: 'Metropolis & Casteliacones', desc: 'A sprawling skyscraper city with Skyarrow Bridge and famous ice cream.', quests: ['Bridge Interval Run', 'Castelia City Focus Sprint'], encounter: 'Gym Leader Burgh' },
          { id: 'un-loc-3', name: 'Dragonspiral Tower', kanji: 'リュウラセンのとう', x: 65, y: 30, type: 'Ancient Ruins', desc: 'Unova’s oldest standing structure where Reshiram and Zekrom awaken.', quests: ['Dragon Spiral Climb', 'Ancient Dragon Meditation'], encounter: 'N & Reshiram / Zekrom' },
        ]
      },
      {
        id: 'kalos',
        name: 'Kalos Region',
        kanji: 'カロス地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 6 · Lumiose Conference · Prism Tower (Lumiose), Anistar Sundial, Kalos League',
        locations: [
          { id: 'kl-loc-1', name: 'Lumiose City & Prism Tower', kanji: 'ミアレシティ', x: 50, y: 45, type: 'Prism Tower Metropolis', desc: 'The star-shaped capital city housing the electric Prism Tower Gym.', quests: ['Prism Tower Stairs Run', 'Mega Evolution Research'], encounter: 'Clemont & Bonnie' },
          { id: 'kl-loc-2', name: 'Anistar City Sundial', kanji: 'ヒャッコシティ', x: 75, y: 30, type: 'Mystic Cosmic Monument', desc: 'A massive pink crystal sundial connected to Mega Stones.', quests: ['Cosmic Sundial Meditation', 'Future Sight Study'], encounter: 'Gym Leader Olympia' },
          { id: 'kl-loc-3', name: 'Lumiose League Stadium', kanji: 'カロスリーグ', x: 30, y: 65, type: 'Kalos League Arena', desc: 'Where Ash-Greninja battled Alain’s Mega Charizard X in the finals.', quests: ['Ash-Greninja Bond Sprint', 'League Finals Focus'], encounter: 'Alain & Mega Charizard X' },
        ]
      },
      {
        id: 'alola',
        name: 'Alola Islands',
        kanji: 'アローラ地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 7 · Manalo Conference · Melemele Island, Aether Paradise, Manalo Stadium',
        locations: [
          { id: 'al-loc-1', name: 'Melemele Island & Pokémon School', kanji: 'メレメレ島', x: 25, y: 65, type: 'Tropical School Island', desc: 'Kukui’s house and the Pokémon School guarded by Tapu Koko.', quests: ['Z-Ring Dance Cardio', 'Kukui School Research'], encounter: 'Professor Kukui & Tapu Koko' },
          { id: 'al-loc-2', name: 'Aether Paradise', kanji: 'エーテルパラダイス', x: 50, y: 45, type: 'Floating Ocean Research Hub', desc: 'Artificial floating island dedicated to Ultra Beast protection.', quests: ['Ultra Wormhole Research', 'Floating Lab Walk'], encounter: 'Lusamine & Gladion' },
          { id: 'al-loc-3', name: 'Manalo Stadium (Mount Lanakila)', kanji: 'マナロスタジアム', x: 75, y: 30, type: 'First Alola League Arena', desc: 'Where Ash Ketchum won his first official Regional League Championship!', quests: ['Alola Champion Celebration Workout', '10,000,000 Volt Thunderbolt Focus'], encounter: 'Champion Ash Ketchum' },
        ]
      },
      {
        id: 'galar',
        name: 'Galar Region (Gigantamax)',
        kanji: 'ガラル地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 8 · Masters Eight Tournament · Wild Area, Wyndon Stadium (Dynamax), Slumbering Weald',
        locations: [
          { id: 'gl-loc-1', name: 'Wild Area & Max Raid Dens', kanji: 'ワイルドエリア', x: 45, y: 55, type: 'Open Gigantamax Wilderness', desc: 'Vast expanse where Dynamax energy glows in Max Raid Dens.', quests: ['Max Raid Den Sprint', 'Wild Area Camping Fitness'], encounter: 'Wild Gigantamax Snorlax' },
          { id: 'gl-loc-2', name: 'Wyndon Stadium', kanji: 'シュートスタジアム', x: 50, y: 25, type: 'Dynamax Championship Colosseum', desc: 'Massive colosseum host to the Masters Eight World Coronation Series.', quests: ['Gigantamax Power Lift', 'Masters Eight World Champion Study'], encounter: 'Monarch Leon & Charizard' },
          { id: 'gl-loc-3', name: 'Slumbering Weald', kanji: 'まどろみの森', x: 25, y: 75, type: 'Foggy Sacred Forest', desc: 'Ancient misty woods where the rusted sword and shield of Zacian & Zamazenta rest.', quests: ['Foggy Trail Endurance Run', 'Legendary Hero Meditation'], encounter: 'Zacian & Zamazenta' },
        ]
      },
      {
        id: 'paldea',
        name: 'Paldea Region (Terastal)',
        kanji: 'パルデア地方',
        image: 'assets/images/maps/pokemon.png',
        desc: 'Gen 9 · Naranja Academy · Mesagoza, Great Crater of Paldea (Area Zero)',
        locations: [
          { id: 'pa-loc-1', name: 'Mesagoza & Naranja Academy', kanji: 'テーブルシティ', x: 50, y: 60, type: 'Academy Central City', desc: 'The sprawling academy hub where trainers begin their Treasure Hunt.', quests: ['Treasure Hunt Planning Study', 'Academy Stairway Run'], encounter: 'Director Clavell & Nemona' },
          { id: 'pa-loc-2', name: 'Great Crater of Paldea (Area Zero)', kanji: 'エリアゼロ', x: 50, y: 40, type: 'Forbidden Paradox Crater', desc: 'A giant crater filled with Tera Crystals and ancient/future Paradox Pokémon.', quests: ['Paradox Crystal Focus Sprint', 'Deep Crater Descent Workout'], encounter: 'Professor Sada / Turo' },
        ]
      },
    ],
    leagues: [
      { id: 'indigo', name: 'Indigo League Tournament (Kanto)', region: 'kanto' },
      { id: 'orange', name: 'Orange League Trophy (Orange Archipelago)', region: 'orange' },
      { id: 'silver', name: 'Silver Conference (Johto)', region: 'johto' },
      { id: 'evergrande', name: 'Ever Grande Conference (Hoenn)', region: 'hoenn' },
      { id: 'lilyofthevalley', name: 'Lily of the Valley Conference (Sinnoh)', region: 'sinnoh' },
      { id: 'vertress', name: 'Vertress Conference (Unova)', region: 'unova' },
      { id: 'lumiose', name: 'Lumiose Conference (Kalos)', region: 'kalos' },
      { id: 'manalo', name: 'Manalo Conference (Alola Islands)', region: 'alola' },
      { id: 'masterseight', name: 'Masters Eight World Championships (Galar / Gigantamax)', region: 'galar' },
      { id: 'paldealeague', name: 'Paldea League Assessment (Paldea)', region: 'paldea' },
    ],

    animeHub: {
      title: 'Pokémon Anime Series (ポケットモンスター)',
      rating: '7.82 / 10 (MAL) · 7.5 / 10 (IMDb)',
      animeEpisodes: '1,230+ Episodes (Original to Horizons)',
      mangaChapters: '640+ Chapters (Pokémon Adventures / Special)',
      mangaSync: 'Ash Ketchum Journey (1,232 eps) complete. Pokémon Horizons (Liko & Roy) ongoing!',
      studio: 'OLM, Inc.',
      status: 'Airing Weekly (Horizons) · Games Gen 9 Paldea',
      synopsis: 'Ash Ketchum of Pallet Town sets out on a legendary quest across 8 regional leagues to become the World Champion & Pokémon Master alongside Pikachu!',
      streamingSites: [
        { name: 'Pokémon TV / Official', icon: '⚡', url: 'https://www.pokemon.com/us/pokemon-episodes', label: 'Watch Free Episodes' },
        { name: 'Netflix', icon: '🔴', url: 'https://www.netflix.com/title/70143836', label: 'Stream Horizons & Ultimate Journeys' },
        { name: 'Hulu', icon: '🟢', url: 'https://www.hulu.com/series/pokemon', label: 'Watch Classic & XY Seasons' },
        { name: 'MANGA Plus / Viz', icon: '📖', url: 'https://www.viz.com/pokemon', label: 'Read Pokémon Adventures Manga' },
      ],
    },
  },

  /* ── Demon Slayer ──────────────────────────── */
  demonslayer: {
    id: 'demonslayer',
    name: 'Demon Slayer',
    tagline: 'Set Your Heart Ablaze',
    emoji: '⚔️',
    universe: 'Demon Slayer Corps',
    diaryName: 'Slayer Chronicle',

    device: {
      type: 'wisterialetter',
      name: 'Kasugai Message',
      triggerIcon: '🕊️',
      triggerLabel: 'Corps Scroll',
      subtitle: 'Demon Slayer Corps HQ',
    },

    ranks: [
      { name: 'Mizunoto',         xp: 0,     tier: 1 },
      { name: 'Mizunoe',          xp: 200,   tier: 1 },
      { name: 'Kanoto',           xp: 500,   tier: 2 },
      { name: 'Kanoe',            xp: 1000,  tier: 3 },
      { name: 'Tsuchinoto',       xp: 2000,  tier: 4 },
      { name: 'Tsuchinoe',        xp: 3500,  tier: 4 },
      { name: 'Hinoto',           xp: 5500,  tier: 5 },
      { name: 'Hinoe',            xp: 8000,  tier: 6 },
      { name: 'Kinoto',           xp: 12000, tier: 6 },
      { name: 'Hashira',          xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Breathing Technique Study',
      exercise: 'Total Concentration Fitness',
      goals:    'Demon Quotas',
    },

    bracketIcons: {
      study:    '🌊',
      exercise: '🔥',
      goals:    '👺',
    },

    guildName: 'Slayer Corps HQ',
    collectionName: 'Demon Catalogue',
    enemyLabel: 'Twelve Kizuki Demons',
    xpName: 'Breathing Master Points',
    currencyName: 'Yen',
    streakName: 'Patrol Streak',

    mapLocations: [
      {
        id: 'ds-loc-1',
        name: 'Mt. Fujikasane (Final Selection)',
        kanji: '藤襲山',
        x: 30, y: 65,
        type: 'Wisteria Mountain',
        desc: 'Blooms year-round with demon-repelling Wisteria flowers. Surviving 7 days grants Nichirin steel.',
        quests: ['7-Day Wisteria Endurance', 'Breathing Form Reading'],
        encounter: 'Hand Demon & Urokodaki Mask',
      },
      {
        id: 'ds-loc-2',
        name: 'Asakusa District (Tokyo)',
        kanji: '浅草',
        x: 65, y: 55,
        type: 'Taisho City Hub',
        desc: 'A bustling neon-lit night town where Tanjiro first encountered Muzan Kibutsuji.',
        quests: ['Night Patrol Cardio', 'Medical Demon Study'],
        encounter: 'Tamayo & Yushiro',
      },
      {
        id: 'ds-loc-3',
        name: 'Natagumo Mountain',
        kanji: '那田蜘蛛山',
        x: 45, y: 35,
        type: 'Spider Clan Domain',
        desc: 'Dark woods draped in razor-sharp spider threads, ruled by Lower Moon 5 Rui.',
        quests: ['Thread Dodge Sprint', ' Hinokami Kagura Dance Study'],
        encounter: 'Rui & Spider Family',
      },
      {
        id: 'ds-loc-4',
        name: 'Butterfly Mansion (Kocho)',
        kanji: '蝶屋敷',
        x: 25, y: 35,
        type: 'Rehabilitation Estate',
        desc: 'Shinobu Kocho\'s medical estate. Master Total Concentration Breathing Constant by blowing up gourd vessels.',
        quests: ['Gourd Blowing Lung Exercise', 'Reflex Tea Cup Drills'],
        encounter: 'Shinobu Kocho & Kanao',
      },
      {
        id: 'ds-loc-5',
        name: 'Swordsmith Village',
        kanji: '刀鍛冶の里',
        x: 80, y: 25,
        type: 'Hidden Forge Valley',
        desc: 'Secret village where masked smiths forge Nichirin blades. Home to Yoriichi Type Zero doll.',
        quests: ['Yoriichi Doll Sparring', 'Blade Polishing Study'],
        encounter: 'Haganezuka & Muichiro',
      },
      {
        id: 'ds-loc-6',
        name: 'Infinity Castle',
        kanji: '無限城',
        x: 85, y: 75,
        type: 'Shifting Dimensional Citadel',
        desc: 'Nakime\'s biwa-controlled infinite sliding room fortress where final battles unfold.',
        quests: ['Spatial Awareness Study', 'Hashira Level Conditioning'],
        encounter: 'Muzan Kibutsuji',
      },
    ],

    motivationalQuotes: [
      { text: 'Set your heart ablaze. Go beyond your limits!', source: 'Flame Hashira' },
      { text: 'No matter how weak or unworthy you feel, keep your heart burning.', source: 'Corps Pillar Wisdom' },
      { text: 'Master one thing to perfection. If you can only do one strike, make it lethal.', source: 'Thunder Master' },
      { text: 'Feel rage. Forgiving someone who took lives is not kindness—it is weakness.', source: 'Water Hashira' },
      { text: 'Life is a series of decisions. You never have complete freedom, but you choose your oath.', source: 'Mist Hashira' },
    ],
  },

  /* ── Black Clover 🍀 ──────────────────────── */
  blackclover: {
    id: 'blackclover',
    name: 'Black Clover',
    tagline: 'My Magic Is Never Giving Up!',
    emoji: '🍀',
    universe: 'Clover Kingdom',
    diaryName: 'Grimoire Journal',

    device: {
      type: 'grimoire',
      name: '5-Leaf Grimoire',
      triggerIcon: '🍀',
      triggerLabel: 'Grimoire',
      subtitle: 'Anti-Magic Black Bull HUD',
    },

    ranks: [
      { name: 'Magic Knight Recruit',      xp: 0,     tier: 1 },
      { name: 'Junior Magic Knight 5th',   xp: 200,   tier: 1 },
      { name: 'Junior Magic Knight 1st',   xp: 500,   tier: 2 },
      { name: 'Intermediate Magic Knight', xp: 1000,  tier: 3 },
      { name: 'Senior Magic Knight',       xp: 2000,  tier: 4 },
      { name: 'Vice-Captain',              xp: 3500,  tier: 5 },
      { name: 'Squad Captain',             xp: 5500,  tier: 5 },
      { name: 'Grand Magic Knight',        xp: 8000,  tier: 6 },
      { name: 'Royal Knight',              xp: 12000, tier: 6 },
      { name: 'Wizard King (Magic Emperor)',xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Grimoire Reading',
      exercise: 'Anti-Magic Training',
      goals:    'Squad Missions',
    },

    bracketIcons: {
      study:    '📖',
      exercise: '🗡️',
      goals:    '🍀',
    },

    guildName: 'Black Bulls Hideout',
    collectionName: '5-Leaf Grimoire Spells',
    enemyLabel: 'Devils & Midnight Sun',
    xpName: 'Mana Level',
    currencyName: 'Yul',
    streakName: 'Magic Knight Streak',

    mapLocations: [
      {
        id: 'bc-loc-1',
        name: 'Hage Village Church',
        kanji: 'ハージ村',
        x: 20, y: 70,
        type: 'Humble Village Home',
        desc: 'A quiet village in the Forsaken Realm where Asta and Yuno grew up under the giant Demon Skull.',
        quests: ['Demon Skull Pushups', 'Grimoire Tower Run'],
        encounter: 'Father Orsi & Sister Lily',
      },
      {
        id: 'bc-loc-2',
        name: 'Black Bulls Hideout',
        kanji: '黒の暴牛のアジト',
        x: 40, y: 55,
        type: 'Shifting Magic Mansion',
        desc: 'The chaotic headquarters of Yami Sukehiro and the Black Bulls, constantly shifting shape via Henry\'s magic.',
        quests: ['100x Heavy Sword Swing', 'Mana Zone Concentration'],
        encounter: 'Captain Yami & Noelle',
      },
      {
        id: 'bc-loc-3',
        name: 'Royal Capital Citadel',
        kanji: '王都',
        x: 50, y: 35,
        type: 'Imperial Castle City',
        desc: 'The sparkling seat of the Clover Kingdom housing the Wizard King\'s Castle and Magic Knight Squad HQs.',
        quests: ['Royal Archive Study', 'Magic Knight Entrance Exam'],
        encounter: 'Wizard King Julius Novachrono',
      },
      {
        id: 'bc-loc-4',
        name: 'Dungeon of Ancient Magic',
        kanji: '古代魔導具のダンジョン',
        x: 65, y: 45,
        type: 'Ancient Labyrinth',
        desc: 'Trapped underground labyrinth filled with ancient treasure, traps, and Sylph the Wind Spirit.',
        quests: ['Spirit Awakening Study', 'Ancient Rune Deciphering'],
        encounter: 'Yuno & Sylph',
      },
      {
        id: 'bc-loc-5',
        name: 'Heart Kingdom Sanctuary',
        kanji: 'ハート王国',
        x: 75, y: 70,
        type: 'Lush Elemental Domain',
        desc: 'A realm surrounded by natural mana where Queen Loropechika and Spirit Guardians train Stage 0 Mages.',
        quests: ['Mana Method Arrays', 'Elemental Rune Study'],
        encounter: 'Queen Loropechika & Undine',
      },
      {
        id: 'bc-loc-6',
        name: 'Spade Kingdom Castle',
        kanji: 'スペード王国',
        x: 80, y: 20,
        type: 'Dark Devil Citadel',
        desc: 'Fortress of the Dark Triad where the Tree of Qliphoth ritual threatens to open the devil gate.',
        quests: ['Anti-Magic Devil Slash Drill', 'Dark Triad Evasion Sprint'],
        encounter: 'Asta Black Form & Liebe',
      },
    ],

    motivationalQuotes: [
      { text: 'My magic is never giving up! That is my true power!', source: 'Asta' },
      { text: 'Surpass your limits! Right here, right now!', source: 'Captain Yami Sukehiro' },
      { text: 'Someone who cannot believe in themselves has no right to protect anyone.', source: 'Wizard King Julius' },
      { text: 'I don\'t care who you are or where you came from. If you work hard, you can become the Wizard King.', source: 'Yuno' },
      { text: 'Failure is not an option when you are fighting for the people you love.', source: 'Noelle Silva' },
    ],

    animeHub: {
      title: 'Black Clover (ブラッククローバー)',
      rating: '8.14 / 10 (MAL) · 8.3 / 10 (IMDb)',
      animeEpisodes: '170 Episodes + Movie: Sword of the Wizard King',
      mangaChapters: '371 Chapters (Ongoing)',
      mangaSync: 'Episode 170 corresponds to Manga Chapter 270. Read Chapter 271+ to continue the Spade Kingdom Raid!',
      studio: 'Studio Pierrot',
      status: 'Manga Ongoing in Jump GIGA · Movie Released',
      synopsis: 'In a world where magic is everything, Asta is born without a single drop of mana. Undeterred, he receives the anti-magic 5-Leaf Grimoire and aims to become the Wizard King!',
      streamingSites: [
        { name: 'Crunchyroll', icon: '🟠', url: 'https://www.crunchyroll.com/series/GRE50KV36/black-clover', label: 'Watch Sub & Dub' },
        { name: 'Netflix', icon: '🔴', url: 'https://www.netflix.com/title/80237722', label: 'Stream Movie & Episodes' },
        { name: 'Hulu', icon: '🟢', url: 'https://www.hulu.com/series/black-clover', label: 'Watch All Seasons' },
        { name: 'MANGA Plus', icon: '📖', url: 'https://mangaplus.shueisha.co.jp/titles/100003', label: 'Read Official Manga Online' },
        { name: 'Viz Media', icon: '📕', url: 'https://www.viz.com/shonenjump/chapters/black-clover', label: 'Official Shonen Jump Manga' },
      ],
    },
  },

  /* ── 10. One Piece ─────────────────────────── */
  onepiece: {
    id: 'onepiece',
    name: 'One Piece',
    tagline: 'I\'m Gonna Be King of the Pirates!',
    emoji: '☠️',
    universe: 'Grand Line',
    diaryName: 'Log Book',

    device: {
      type: 'logpose',
      name: 'Log Pose',
      triggerIcon: '🧭',
      triggerLabel: 'Log Pose',
      subtitle: 'Grand Line Magnetic Compass',
    },

    ranks: [
      { name: 'Cabin Boy',          xp: 0,     tier: 1 },
      { name: 'Rookie Pirate',       xp: 200,   tier: 1 },
      { name: 'Straw Hat Mate',      xp: 500,   tier: 2 },
      { name: 'Super Rookie',        xp: 1000,  tier: 3 },
      { name: 'Warlord Challenger', xp: 2000,  tier: 4 },
      { name: 'Worst Generation',    xp: 3500,  tier: 4 },
      { name: 'Yonko Commander',     xp: 5500,  tier: 5 },
      { name: 'Haki Master',         xp: 8000,  tier: 6 },
      { name: 'Emperor of the Sea',  xp: 12000, tier: 6 },
      { name: 'Pirate King',         xp: 18000, tier: 'max' },
    ],

    bracketNames: {
      study:    'Nami\'s Cartography Study',
      exercise: 'Zoro\'s Heavy Lifting',
      goals:    'Pirate Bounties',
    },

    bracketIcons: {
      study:    '📜',
      exercise: '⚔️',
      goals:    '💰',
    },

    guildName: 'Straw Hat Crew',
    collectionName: 'Devil Fruits & Bounties',
    enemyLabel: 'Marines & Rivals',
    xpName: 'Bounty XP',
    currencyName: 'Berries (฿)',
    streakName: 'Voyage Streak',

    mapLocations: [
      { id: 'op-loc-1', name: 'Foosha Village & Windmill', kanji: 'フーシャ村', x: 15, y: 75, type: 'East Blue Hometown', desc: 'Luffy’s hometown where Shanks gave him the Straw Hat.', quests: ['Windmill Jog', 'Shanks Promise Reading'], encounter: 'Shanks & Makino' },
      { id: 'op-loc-2', name: 'Baratie Ocean Restaurant', kanji: 'バラティエ', x: 30, y: 65, type: 'Floating Ocean Ship', desc: 'Zeff’s floating sea restaurant where Sanji trained.', quests: ['Chef Meal Prep', 'Baratie Deck Cardio'], encounter: 'Chef Zeff & Sanji' },
      { id: 'op-loc-3', name: 'Alabasta Kingdom (Alubarna)', kanji: 'アラバスタ', x: 45, y: 50, type: 'Desert Oasis Citadel', desc: 'Vivi’s desert kingdom plagued by Crocodile’s Baroque Works.', quests: ['Desert March Fitness', 'Crocodile Water Jutsu Study'], encounter: 'Princess Vivi & Crocodile' },
      { id: 'op-loc-4', name: 'Enies Lobby (Judicial Island)', kanji: 'エニエス・ロビー', x: 60, y: 40, type: 'World Govt Stronghold', desc: 'The island that never sees night. Site of CP9 Robin rescue.', quests: ['Flag Burning Determination', 'CP9 Gear Second Sprint'], encounter: 'Rob Lucci & Robin' },
      { id: 'op-loc-5', name: 'Marineford HQ', kanji: 'マリンフォード', x: 75, y: 35, type: 'Navy HQ Arena', desc: 'Site of the Paramount Summit War between Whitebeard and Marines.', quests: ['Conqueror Haki Meditation', 'Summit War Endurance'], encounter: 'Whitebeard & Ace' },
      { id: 'op-loc-6', name: 'Wano Country (Onigashima)', kanji: 'ワノ国', x: 85, y: 20, type: 'Samurai Fortress Island', desc: 'Isolated samurai kingdom where Luffy unlocked Gear 5 Sun God Nika.', quests: ['Gear 5 Nika Jump Workout', 'Ryuo Haki Sparring'], encounter: 'Kaido & Sun God Nika' },
    ],

    motivationalQuotes: [
      { text: 'If you don\'t take risks, you can\'t create a future!', source: 'Monkey D. Luffy' },
      { text: 'When do you think a person dies? When they are forgotten!', source: 'Dr. Hiriluk' },
      { text: 'Scars on the back are a swordsman\'s shame.', source: 'Roronoa Zoro' },
      { text: 'No one is born into this world to be alone!', source: 'Jaguar D. Saul' },
      { text: 'I want to live! Take me out to sea with you!', source: 'Nico Robin' },
    ],

    animeHub: {
      title: 'One Piece (ワンピース)',
      rating: '8.72 / 10 (MAL) · 8.9 / 10 (IMDb)',
      animeEpisodes: '1,100+ Episodes (Egghead Island Arc)',
      mangaChapters: '1,110+ Chapters (Final Saga)',
      mangaSync: 'Episode 1100 corresponds to Manga Chapter 1060+. Read Chapter 1061+ on MANGA Plus!',
      studio: 'Toei Animation',
      status: 'Airing Weekly · Egghead Arc',
      synopsis: 'Monkey D. Luffy sets sail with his Straw Hat Pirates across the Grand Line in search of the legendary ONE PIECE to become the King of the Pirates!',
      streamingSites: [
        { name: 'Crunchyroll', icon: '🟠', url: 'https://www.crunchyroll.com/series/GRMG8WE5W/one-piece', label: 'Watch All 1100+ Episodes' },
        { name: 'Netflix', icon: '🔴', url: 'https://www.netflix.com/title/80217863', label: 'Stream Live Action & Anime' },
        { name: 'MANGA Plus', icon: '📖', url: 'https://mangaplus.shueisha.co.jp/titles/100020', label: 'Read Official One Piece Manga' },
      ],
    },
  },
};


/**
 * Get the current rank object for a given XP total
 */
function getCurrentRank(themeId, xp) {
  const fallback = { name: 'Novice Warrior', xp: 0, tier: 1 };
  const theme = THEMES[themeId] || THEMES.sololeveling;
  if (!theme || !Array.isArray(theme.ranks) || theme.ranks.length === 0) return fallback;
  const userXp = typeof xp === 'number' ? xp : 0;
  let current = theme.ranks[0];
  for (const rank of theme.ranks) {
    if (userXp >= rank.xp) current = rank;
    else break;
  }
  return current || fallback;
}

/**
 * Get the next rank object (or null if at max)
 */
function getNextRank(themeId, xp) {
  const theme = THEMES[themeId] || THEMES.sololeveling;
  if (!theme || !Array.isArray(theme.ranks)) return null;
  const userXp = typeof xp === 'number' ? xp : 0;
  for (const rank of theme.ranks) {
    if (userXp < rank.xp) return rank;
  }
  return null;
}

/**
 * Get progress percentage toward next rank
 */
function getRankProgress(themeId, xp) {
  const current = getCurrentRank(themeId, xp);
  const next = getNextRank(themeId, xp);
  if (!next || !current) return 100;
  const userXp = typeof xp === 'number' ? xp : 0;
  const range = next.xp - current.xp;
  if (range <= 0) return 100;
  const progress = userXp - current.xp;
  return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
}

/**
 * Get rank tier number (for CSS class)
 */
function getRankTierClass(themeId, xp) {
  const rank = getCurrentRank(themeId, xp);
  if (!rank) return 'rank-1';
  if (rank.tier === 'max') return 'rank-max';
  return `rank-${rank.tier || 1}`;
}

/**
 * Apply theme to DOM
 */
function applyTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
}

/**
 * Get a random motivational quote for the theme
 */
function getRandomQuote(themeId) {
  const theme = THEMES[themeId];
  if (!theme) return { text: 'Keep pushing forward.', source: 'Unknown' };
  const quotes = theme.motivationalQuotes;
  return quotes[Math.floor(Math.random() * quotes.length)];
}
