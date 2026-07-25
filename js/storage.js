/* ============================================================
   STORAGE — localStorage wrapper with JSON serialization
   ============================================================ */

const STORAGE_KEY = 'levelup_data';

const DEFAULT_DATA = {
  theme: null,
  profile: {
    name: '',
    xp: 0,
    createdAt: null,
    lastActive: null,
  },
  diary: [],
  study: {
    sessions: [],
    geminiApiKey: '',
    todayMinutes: 0,
    lastStudyDate: null,
  },
  exercise: {
    log: [],
    lastExerciseDate: null,
  },
  goals: {
    yesterday: [],
    today: [],
    lastGoalDate: null,
  },
  collection: [],
  pokemon: {
    region: 'kanto',
    league: 'indigo',
    regionConfirmed: false,
  },
  stats: {
    streak: 0,
    longestStreak: 0,
    totalXp: 0,
    tasksCompleted: 0,
    diaryEntries: 0,
    exerciseSessions: 0,
    studySessions: 0,
    lastActiveDate: null,
  },
};

const Storage = {
  /**
   * Load all data from localStorage
   */
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this._deepClone(DEFAULT_DATA);
      const data = JSON.parse(raw);
      // Merge with defaults to handle schema upgrades
      return this._merge(DEFAULT_DATA, data);
    } catch (e) {
      console.error('Storage load error:', e);
      return this._deepClone(DEFAULT_DATA);
    }
  },

  /**
   * Save all data to localStorage
   */
  save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Storage save error:', e);
    }
  },

  /**
   * Get a specific key path (dot notation)
   */
  get(path) {
    const data = this.load();
    return path.split('.').reduce((obj, key) => obj?.[key], data);
  },

  /**
   * Set a specific key path (dot notation)
   */
  set(path, value) {
    const data = this.load();
    const keys = path.split('.');
    let obj = data;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!obj[keys[i]]) obj[keys[i]] = {};
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    this.save(data);
    return data;
  },

  /**
   * Check if user has completed onboarding
   */
  isOnboarded() {
    const data = this.load();
    return !!(data.theme && data.profile.name);
  },

  /**
   * Reset all data
   */
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * Export data as JSON string
   */
  export() {
    return JSON.stringify(this.load(), null, 2);
  },

  /**
   * Import data from JSON string
   */
  import(jsonStr) {
    try {
      const data = JSON.parse(jsonStr);
      this.save(data);
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  },

  /**
   * Roll over goals: move today → yesterday if date changed
   */
  rolloverGoals() {
    const data = this.load();
    const today = new Date().toDateString();

    if (data.goals.lastGoalDate && data.goals.lastGoalDate !== today) {
      data.goals.yesterday = data.goals.today.map(g => ({ ...g }));
      data.goals.today = [];
      data.goals.lastGoalDate = today;
      this.save(data);
    } else if (!data.goals.lastGoalDate) {
      data.goals.lastGoalDate = today;
      this.save(data);
    }
    return data;
  },

  /**
   * Reset daily counters if the date has changed
   */
  checkDayRollover() {
    const data = this.load();
    const today = new Date().toDateString();

    if (data.study.lastStudyDate !== today) {
      data.study.todayMinutes = 0;
      data.study.lastStudyDate = today;
    }

    // Streak logic
    if (data.stats.lastActiveDate) {
      const lastDate = new Date(data.stats.lastActiveDate);
      const now = new Date();
      const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        data.stats.streak++;
        if (data.stats.streak > data.stats.longestStreak) {
          data.stats.longestStreak = data.stats.streak;
        }
      } else if (diffDays > 1) {
        data.stats.streak = 1;
      }
    } else {
      data.stats.streak = 1;
    }

    data.stats.lastActiveDate = today;
    data.profile.lastActive = today;
    this.save(data);
    return data;
  },

  /**
   * Add XP and return { newXp, leveledUp, oldRank, newRank }
   */
  addXp(amount) {
    const data = this.load();
    const themeId = data.theme;
    const oldRank = getCurrentRank(themeId, data.profile.xp);

    data.profile.xp += amount;
    data.stats.totalXp += amount;

    const newRank = getCurrentRank(themeId, data.profile.xp);
    const leveledUp = oldRank.name !== newRank.name;

    this.save(data);

    return {
      newXp: data.profile.xp,
      leveledUp,
      oldRank: oldRank.name,
      newRank: newRank.name,
    };
  },

  // --- Helpers ---

  _deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  },

  _merge(defaults, actual) {
    const result = this._deepClone(defaults);
    for (const key of Object.keys(actual)) {
      if (actual[key] !== null && typeof actual[key] === 'object' && !Array.isArray(actual[key]) && result[key]) {
        result[key] = this._merge(result[key], actual[key]);
      } else {
        result[key] = actual[key];
      }
    }
    return result;
  },
};
