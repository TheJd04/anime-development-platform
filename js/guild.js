/* ============================================================
   GUILD — Training Room / Competition Hub
   ============================================================ */

const Guild = {
  init() {
    this.render();
  },

  render() {
    const data = Storage.load();
    const themeId = data.theme;
    const theme = THEMES[themeId];
    if (!theme) return;

    const el = document.getElementById('guild-content');
    if (!el) return;

    el.innerHTML = `
      <div class="guild-header">
        <h2 class="guild-title text-glow">${theme.guildName}</h2>
        <p class="guild-subtitle">Train, compete, and rise through the ranks</p>
      </div>

      <div class="guild-content">
        <!-- Challenges Column -->
        <div>
          <h3 style="margin-bottom: 16px;">⚔️ Active Challenges</h3>
          <div class="guild-challenges stagger-children">
            ${this.renderChallenges(data, theme)}
          </div>
        </div>

        <!-- Leaderboard Column -->
        <div>
          <h3 style="margin-bottom: 16px;">🏆 Leaderboard</h3>
          <div class="card card-flat">
            <div class="tabs" id="leaderboard-tabs">
              <div class="tab active" data-tab="overall">Overall</div>
              <div class="tab" data-tab="study">Study</div>
              <div class="tab" data-tab="exercise">Exercise</div>
              <div class="tab" data-tab="goals">Goals</div>
            </div>
            <div class="leaderboard" id="leaderboard-list">
              ${this.renderLeaderboard(data, theme, 'overall')}
            </div>
          </div>

          <div class="mt-lg">
            <h3 style="margin-bottom: 16px;">📊 Your Stats</h3>
            <div class="card card-flat">
              ${this.renderPersonalStats(data, theme)}
            </div>
          </div>
        </div>
      </div>
    `;

    // Tab switching
    document.getElementById('leaderboard-tabs')?.addEventListener('click', (e) => {
      const tab = e.target.closest('.tab');
      if (!tab) return;
      document.querySelectorAll('#leaderboard-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('leaderboard-list').innerHTML = this.renderLeaderboard(data, theme, tab.dataset.tab);
    });
  },

  renderChallenges(data, theme) {
    const challenges = this.generateChallenges(theme);
    return challenges.map(c => `
      <div class="challenge-card">
        <div class="challenge-type">${c.type}</div>
        <div class="challenge-name">${c.name}</div>
        <div class="challenge-desc">${c.description}</div>
        <div style="margin: 12px 0;">
          <div class="progress-label">
            <span class="progress-name">Progress</span>
            <span class="progress-value">${this.getChallengeProgress(data, c)}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${this.getChallengeProgress(data, c)}%"></div>
          </div>
        </div>
        <div class="challenge-reward">🎁 Reward: ${c.reward} ${theme.xpName}</div>
      </div>
    `).join('');
  },

  generateChallenges(theme) {
    const dayOfWeek = new Date().getDay();
    return [
      {
        id: 'daily-study',
        type: 'Daily Quest',
        name: `${theme.bracketNames.study}: 30 Minutes`,
        description: 'Complete at least 30 minutes of focused study today.',
        target: 30,
        metric: 'study_minutes',
        reward: 100,
      },
      {
        id: 'daily-exercise',
        type: 'Daily Quest',
        name: `${theme.bracketNames.exercise}: Get Moving`,
        description: 'Log at least one exercise session today.',
        target: 1,
        metric: 'exercise_count',
        reward: 75,
      },
      {
        id: 'daily-goals',
        type: 'Daily Quest',
        name: `${theme.bracketNames.goals}: Set 3 Goals`,
        description: 'Set and complete at least 3 goals today.',
        target: 3,
        metric: 'goals_completed',
        reward: 80,
      },
      {
        id: 'weekly-streak',
        type: 'Weekly Challenge',
        name: '7-Day Warrior Streak',
        description: 'Maintain an active streak for 7 consecutive days.',
        target: 7,
        metric: 'streak',
        reward: 500,
      },
      {
        id: 'weekly-diary',
        type: 'Weekly Challenge',
        name: 'Chronicle Your Journey',
        description: 'Write at least 3 diary entries this week.',
        target: 3,
        metric: 'weekly_diary',
        reward: 200,
      },
    ];
  },

  getChallengeProgress(data, challenge) {
    let current = 0;

    switch (challenge.metric) {
      case 'study_minutes':
        current = data.study.todayMinutes;
        break;
      case 'exercise_count':
        current = data.exercise.log.filter(e =>
          new Date(e.date).toDateString() === new Date().toDateString()
        ).length;
        break;
      case 'goals_completed':
        current = data.goals.today.filter(g => g.completed).length;
        break;
      case 'streak':
        current = data.stats.streak;
        break;
      case 'weekly_diary': {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        current = data.diary.filter(d => new Date(d.date) >= weekAgo).length;
        break;
      }
    }

    return Math.min(100, Math.round((current / challenge.target) * 100));
  },

  renderLeaderboard(data, theme, tab) {
    // Solo leaderboard with simulated competitors
    const playerScore = this.getScoreForTab(data, tab);
    const competitors = this.generateCompetitors(theme, tab);

    // Add player
    competitors.push({
      name: data.profile.name || 'You',
      score: playerScore,
      isPlayer: true,
    });

    // Sort descending
    competitors.sort((a, b) => b.score - a.score);

    return competitors.map((entry, idx) => {
      const rankClass = idx === 0 ? 'gold' : idx === 1 ? 'silver' : idx === 2 ? 'bronze' : '';
      return `
        <div class="leaderboard-entry" style="${entry.isPlayer ? 'border: 1px solid var(--primary); background: var(--surface-light);' : ''}">
          <span class="leaderboard-rank ${rankClass}">#${idx + 1}</span>
          <span class="leaderboard-name">${entry.name} ${entry.isPlayer ? '⭐' : ''}</span>
          <span class="leaderboard-score">${entry.score.toLocaleString()}</span>
        </div>
      `;
    }).join('');
  },

  getScoreForTab(data, tab) {
    switch (tab) {
      case 'study': return data.study.todayMinutes * 10;
      case 'exercise': return data.exercise.log.length * 50;
      case 'goals': return data.stats.tasksCompleted * 25;
      default: return data.profile.xp;
    }
  },

  generateCompetitors(theme, tab) {
    // Seeded pseudo-random based on day so competitors are consistent
    const seed = new Date().toDateString().length * 7;
    const names = [
      'Ryuji', 'Sakura', 'Tanjiro', 'Mikasa', 'Gon', 
      'Shinichi', 'Erza', 'Killua', 'Asta', 'Hinata',
    ];

    return names.slice(0, 5).map((name, i) => ({
      name,
      score: Math.floor((seed * (i + 3) * 17) % 2000) + 100,
      isPlayer: false,
    }));
  },

  renderPersonalStats(data, theme) {
    const totalStudy = data.study.sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalExercise = data.exercise.log.reduce((sum, e) => sum + e.duration, 0);

    return `
      <div class="grid grid-2 gap-sm">
        <div class="bracket-stat">
          <span class="bracket-stat-label">Total ${theme.xpName}</span>
          <span class="bracket-stat-value">${data.profile.xp.toLocaleString()}</span>
        </div>
        <div class="bracket-stat">
          <span class="bracket-stat-label">Streak</span>
          <span class="bracket-stat-value">🔥 ${data.stats.streak}</span>
        </div>
        <div class="bracket-stat">
          <span class="bracket-stat-label">Study Hours</span>
          <span class="bracket-stat-value">${(totalStudy / 60).toFixed(1)}h</span>
        </div>
        <div class="bracket-stat">
          <span class="bracket-stat-label">Exercise Hours</span>
          <span class="bracket-stat-value">${(totalExercise / 60).toFixed(1)}h</span>
        </div>
        <div class="bracket-stat">
          <span class="bracket-stat-label">Goals Done</span>
          <span class="bracket-stat-value">${data.stats.tasksCompleted}</span>
        </div>
        <div class="bracket-stat">
          <span class="bracket-stat-label">${theme.collectionName}</span>
          <span class="bracket-stat-value">${data.collection.length}</span>
        </div>
      </div>
    `;
  },
};
