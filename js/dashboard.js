/* ============================================================
   DASHBOARD — 3 Brackets + XP + Daily overview
   ============================================================ */

const Dashboard = {
  studyTimer: null,
  studyStartTime: null,
  studyElapsed: 0,

  init() {
    this.render();
    this.bindEvents();
  },

  render() {
    const data = Storage.load();
    const themeId = data.theme;
    const theme = THEMES[themeId];
    if (!theme) return;

    // Check day rollover
    Storage.checkDayRollover();
    Storage.rolloverGoals();
    const freshData = Storage.load();

    this.renderGreeting(freshData, theme);
    this.renderXpBar(freshData, theme);
    this.renderStudyBracket(freshData, theme);
    this.renderExerciseBracket(freshData, theme);
    this.renderGoalsBracket(freshData, theme);
    this.renderQuote(theme);
    this.renderRecentActivity(freshData, theme);
  },

  renderGreeting(data, theme) {
    const el = document.getElementById('dashboard-greeting');
    if (!el) return;
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';

    const bannerImages = {
      naruto: 'assets/images/dashboards/naruto_hokage.png',
      blackclover: 'assets/images/maps/blackclover.png',
      pokemon: 'assets/images/maps/pokemon.png',
      sololeveling: 'assets/images/maps/sololeveling.png',
      dragonball: 'assets/images/maps/dragonball.png',
      bleach: 'assets/images/maps/bleach.png',
      demonslayer: 'assets/images/maps/demonslayer.png',
    };
    const bannerImg = bannerImages[data.theme] || 'assets/images/maps/sololeveling.png';

    el.innerHTML = `
      <div class="dashboard-anime-banner" style="background-image: linear-gradient(180deg, rgba(5,2,15,0.4) 0%, rgba(5,2,15,0.95) 100%), url('${bannerImg}');">
        <div class="dashboard-banner-content">
          <p class="dashboard-greeting">${greeting}, ${data.profile.name || 'warrior'}.</p>
          <div class="dashboard-title-row">
            <h1 class="text-glow">${theme.universe} HQ</h1>
            <div class="dashboard-meta">
              <div class="streak-display">
                <span class="streak-fire">🔥</span>
                <span>${data.stats.streak} day${data.stats.streak !== 1 ? 's' : ''}</span>
              </div>
              <span class="rank-badge ${getRankTierClass(data.theme, data.profile.xp)}">
                ${getCurrentRank(data.theme, data.profile.xp).name}
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderXpBar(data, theme) {
    const el = document.getElementById('dashboard-xp');
    if (!el) return;

    const current = getCurrentRank(data.theme, data.profile.xp);
    const next = getNextRank(data.theme, data.profile.xp);
    const progress = getRankProgress(data.theme, data.profile.xp);

    el.innerHTML = `
      <div class="xp-display">
        <span class="xp-icon">⚡</span>
        <div class="xp-info">
          <div class="xp-level">${current.name} ${next ? '→ ' + next.name : '(MAX)'}</div>
          <div class="progress-bar progress-bar-lg">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="xp-numbers">${data.profile.xp} / ${next ? next.xp : '∞'} ${theme.xpName}</div>
        </div>
      </div>
    `;
  },

  renderStudyBracket(data, theme) {
    const el = document.getElementById('bracket-study');
    if (!el) return;

    const todaySessions = data.study.sessions.filter(s =>
      new Date(s.date).toDateString() === new Date().toDateString()
    );

    el.innerHTML = `
      <div class="bracket-header">
        <div class="bracket-title">
          <div class="bracket-icon">${theme.bracketIcons.study}</div>
          <div>
            <div class="bracket-name">${theme.bracketNames.study}</div>
            <div class="bracket-subtitle">Focus & learn</div>
          </div>
        </div>
        <button class="btn btn-sm btn-secondary" id="study-settings-btn">⚙️</button>
      </div>
      <div class="bracket-body">
        <div class="bracket-stat">
          <span class="bracket-stat-label">Today</span>
          <span class="bracket-stat-value">${data.study.todayMinutes} min</span>
        </div>
        <div class="bracket-stat">
          <span class="bracket-stat-label">Sessions</span>
          <span class="bracket-stat-value">${todaySessions.length}</span>
        </div>
        <div class="flex gap-sm">
          <button class="btn btn-primary btn-block" id="study-timer-btn">
            ${this.studyTimer ? '⏹ Stop Timer' : '▶ Start Study'}
          </button>
        </div>
        <div id="study-timer-display" class="text-center font-mono text-xl ${this.studyTimer ? '' : 'hidden'}" style="color: var(--primary); padding: 8px 0;">
          00:00
        </div>
        <button class="btn btn-ghost btn-sm btn-block" id="study-log-manual-btn">+ Log manually</button>
      </div>
    `;
  },

  renderExerciseBracket(data, theme) {
    const el = document.getElementById('bracket-exercise');
    if (!el) return;

    const todayExercises = data.exercise.log.filter(e =>
      new Date(e.date).toDateString() === new Date().toDateString()
    );
    const totalMinutes = todayExercises.reduce((sum, e) => sum + (e.duration || 0), 0);

    el.innerHTML = `
      <div class="bracket-header">
        <div class="bracket-title">
          <div class="bracket-icon">${theme.bracketIcons.exercise}</div>
          <div>
            <div class="bracket-name">${theme.bracketNames.exercise}</div>
            <div class="bracket-subtitle">Move & strengthen</div>
          </div>
        </div>
      </div>
      <div class="bracket-body">
        <div class="bracket-stat">
          <span class="bracket-stat-label">Today</span>
          <span class="bracket-stat-value">${totalMinutes} min</span>
        </div>
        <div class="bracket-stat">
          <span class="bracket-stat-label">Exercises</span>
          <span class="bracket-stat-value">${todayExercises.length}</span>
        </div>
        <button class="btn btn-primary btn-block" id="exercise-log-btn">+ Log Exercise</button>
        ${todayExercises.length > 0 ? `
          <div class="checklist" style="margin-top: 8px;">
            ${todayExercises.slice(-3).map(ex => `
              <div class="checklist-item completed" style="cursor: default;">
                <span class="checklist-check">✓</span>
                <span class="checklist-text">${ex.type} — ${ex.duration} min</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  },

  renderGoalsBracket(data, theme) {
    const el = document.getElementById('bracket-goals');
    if (!el) return;

    const completed = data.goals.yesterday.filter(g => g.completed).length;
    const total = data.goals.yesterday.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    el.innerHTML = `
      <div class="bracket-header">
        <div class="bracket-title">
          <div class="bracket-icon">${theme.bracketIcons.goals}</div>
          <div>
            <div class="bracket-name">${theme.bracketNames.goals}</div>
            <div class="bracket-subtitle">Set & conquer</div>
          </div>
        </div>
      </div>
      <div class="bracket-body">
        ${total > 0 ? `
          <div>
            <div class="progress-label">
              <span class="progress-name">Yesterday's Goals</span>
              <span class="progress-value">${completed}/${total} (${pct}%)</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${pct}%"></div>
            </div>
          </div>
          <div class="checklist">
            ${data.goals.yesterday.map((g, i) => `
              <div class="checklist-item ${g.completed ? 'completed' : ''}" data-goal-type="yesterday" data-goal-index="${i}">
                <span class="checklist-check">${g.completed ? '✓' : ''}</span>
                <span class="checklist-text">${g.text}</span>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">🎯</div>
            <div class="empty-state-text">No goals from yesterday yet.</div>
          </div>
        `}
        <div class="divider"></div>
        <div class="progress-label">
          <span class="progress-name">Today's Goals</span>
          <span class="progress-value">${data.goals.today.length}</span>
        </div>
        <div class="checklist" id="today-goals-list">
          ${data.goals.today.map((g, i) => `
            <div class="checklist-item ${g.completed ? 'completed' : ''}" data-goal-type="today" data-goal-index="${i}">
              <span class="checklist-check">${g.completed ? '✓' : ''}</span>
              <span class="checklist-text">${g.text}</span>
              <button class="checklist-delete" data-delete-goal="${i}">✕</button>
            </div>
          `).join('')}
        </div>
        <div class="flex gap-sm mt-sm">
          <input type="text" class="form-input" id="goal-input" placeholder="Add a goal for today..." />
          <button class="btn btn-primary btn-sm" id="goal-add-btn">+</button>
        </div>
      </div>
    `;
  },

  renderQuote(theme) {
    const el = document.getElementById('dashboard-quote');
    if (!el) return;
    const quote = getRandomQuote(theme.id);
    el.innerHTML = `
      <div class="quote-banner">
        <span class="quote-text">${quote.text}</span>
        <span class="quote-source">— ${quote.source}</span>
      </div>
    `;
  },

  renderRecentActivity(data, theme) {
    const el = document.getElementById('dashboard-activity');
    if (!el) return;

    // Combine all activities, sort by date, take last 5
    const activities = [];

    data.study.sessions.forEach(s => {
      activities.push({ type: 'study', text: `Studied for ${s.duration} min`, date: s.date, icon: theme.bracketIcons.study });
    });

    data.exercise.log.forEach(e => {
      activities.push({ type: 'exercise', text: `${e.type} — ${e.duration} min`, date: e.date, icon: theme.bracketIcons.exercise });
    });

    data.diary.slice(-5).forEach(d => {
      activities.push({ type: 'diary', text: `Wrote: "${d.title}"`, date: d.date, icon: '📝' });
    });

    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    const recent = activities.slice(0, 5);

    el.innerHTML = `
      <div class="card card-flat">
        <h4 style="margin-bottom: 14px;">Recent Activity</h4>
        ${recent.length > 0 ? `
          <div class="checklist">
            ${recent.map(a => `
              <div class="checklist-item" style="cursor: default;">
                <span style="font-size: 1.1rem;">${a.icon}</span>
                <span class="checklist-text">${a.text}</span>
                <span class="text-xs" style="color: var(--text-dim); white-space: nowrap;">
                  ${this.formatTimeAgo(a.date)}
                </span>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="empty-state">
            <div class="empty-state-icon">📋</div>
            <div class="empty-state-text">No activity yet. Start training!</div>
          </div>
        `}
      </div>
    `;
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      // Study timer
      if (e.target.id === 'study-timer-btn') {
        this.toggleStudyTimer();
      }

      // Log manual study
      if (e.target.id === 'study-log-manual-btn') {
        this.showStudyLogModal();
      }

      // Study settings (API key)
      if (e.target.id === 'study-settings-btn') {
        this.showStudySettingsModal();
      }

      // Log exercise
      if (e.target.id === 'exercise-log-btn') {
        this.showExerciseModal();
      }

      // Add goal
      if (e.target.id === 'goal-add-btn') {
        this.addGoal();
      }

      // Toggle goal completion
      const goalItem = e.target.closest('.checklist-item[data-goal-type]');
      if (goalItem && !e.target.classList.contains('checklist-delete')) {
        this.toggleGoal(goalItem.dataset.goalType, parseInt(goalItem.dataset.goalIndex));
      }

      // Delete goal
      if (e.target.dataset.deleteGoal !== undefined) {
        this.deleteGoal(parseInt(e.target.dataset.deleteGoal));
      }
    });

    // Goal input enter key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.id === 'goal-input') {
        this.addGoal();
      }
    });
  },

  // --- Study Timer ---
  toggleStudyTimer() {
    if (this.studyTimer) {
      this.stopStudyTimer();
    } else {
      this.startStudyTimer();
    }
  },

  startStudyTimer() {
    this.studyStartTime = Date.now();
    this.studyElapsed = 0;
    this.studyTimer = setInterval(() => {
      this.studyElapsed = Math.floor((Date.now() - this.studyStartTime) / 1000);
      const display = document.getElementById('study-timer-display');
      if (display) {
        const mins = Math.floor(this.studyElapsed / 60).toString().padStart(2, '0');
        const secs = (this.studyElapsed % 60).toString().padStart(2, '0');
        display.textContent = `${mins}:${secs}`;
        display.classList.remove('hidden');
      }
    }, 1000);
    this.render();
  },

  stopStudyTimer() {
    clearInterval(this.studyTimer);
    const minutes = Math.max(1, Math.round(this.studyElapsed / 60));
    this.studyTimer = null;
    this.logStudySession(minutes);
    this.studyElapsed = 0;
  },

  logStudySession(minutes) {
    const data = Storage.load();
    data.study.sessions.push({
      date: new Date().toISOString(),
      duration: minutes,
    });
    data.study.todayMinutes += minutes;
    data.stats.studySessions++;
    Storage.save(data);

    const xpResult = Storage.addXp(minutes * 2); // 2 XP per minute
    this.render();

    App.showToast(`+${minutes * 2} ${THEMES[data.theme].xpName}! Studied ${minutes} min`, 'xp');
    App.showXpPopup(minutes * 2);

    if (xpResult.leveledUp) {
      App.showRankUp(xpResult.newRank);
    }

    // Chance to capture creature
    if (Math.random() < 0.3) {
      Collection.tryCapture();
    }
  },

  showStudyLogModal() {
    App.showModal('Log Study Session', `
      <div class="form-group mb-md">
        <label class="form-label">Duration (minutes)</label>
        <input type="number" class="form-input" id="manual-study-minutes" min="1" value="30" />
      </div>
      <button class="btn btn-primary btn-block" id="manual-study-confirm">Log Session</button>
    `, () => {
      document.getElementById('manual-study-confirm')?.addEventListener('click', () => {
        const mins = parseInt(document.getElementById('manual-study-minutes').value) || 0;
        if (mins > 0) {
          this.logStudySession(mins);
          App.closeModal();
        }
      });
    });
  },

  showStudySettingsModal() {
    const data = Storage.load();
    App.showModal('Study Settings', `
      <div class="form-group mb-md">
        <label class="form-label">Gemini API Key</label>
        <input type="password" class="form-input" id="gemini-api-key" value="${data.study.geminiApiKey || ''}" placeholder="Enter your API key..." />
        <p class="text-xs mt-sm" style="color: var(--text-dim);">Optional. Will be used for AI-powered study features (coming soon).</p>
      </div>
      <button class="btn btn-primary btn-block" id="save-api-key">Save</button>
    `, () => {
      document.getElementById('save-api-key')?.addEventListener('click', () => {
        const key = document.getElementById('gemini-api-key').value.trim();
        Storage.set('study.geminiApiKey', key);
        App.closeModal();
        App.showToast('API key saved!', 'success');
      });
    });
  },

  // --- Exercise ---
  showExerciseModal() {
    App.showModal('Log Exercise', `
      <div class="form-group mb-md">
        <label class="form-label">Type</label>
        <select class="form-input" id="exercise-type">
          <option value="Running">Running</option>
          <option value="Pushups">Pushups</option>
          <option value="Squats">Squats</option>
          <option value="Pull-ups">Pull-ups</option>
          <option value="Plank">Plank</option>
          <option value="Yoga">Yoga</option>
          <option value="Swimming">Swimming</option>
          <option value="Cycling">Cycling</option>
          <option value="Weight Training">Weight Training</option>
          <option value="Martial Arts">Martial Arts</option>
          <option value="Walking">Walking</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="form-group mb-md">
        <label class="form-label">Duration (minutes)</label>
        <input type="number" class="form-input" id="exercise-duration" min="1" value="30" />
      </div>
      <div class="form-group mb-md">
        <label class="form-label">Notes (optional)</label>
        <input type="text" class="form-input" id="exercise-notes" placeholder="How did it feel?" />
      </div>
      <button class="btn btn-primary btn-block" id="exercise-confirm">Log It 💪</button>
    `, () => {
      document.getElementById('exercise-confirm')?.addEventListener('click', () => {
        const type = document.getElementById('exercise-type').value;
        const duration = parseInt(document.getElementById('exercise-duration').value) || 0;
        const notes = document.getElementById('exercise-notes').value.trim();

        if (duration > 0) {
          const data = Storage.load();
          data.exercise.log.push({
            date: new Date().toISOString(),
            type,
            duration,
            notes,
          });
          data.stats.exerciseSessions++;
          Storage.save(data);

          const xpResult = Storage.addXp(duration * 3); // 3 XP per minute
          App.closeModal();
          this.render();

          App.showToast(`+${duration * 3} ${THEMES[data.theme].xpName}! ${type} logged.`, 'xp');
          App.showXpPopup(duration * 3);

          if (xpResult.leveledUp) {
            App.showRankUp(xpResult.newRank);
          }

          if (Math.random() < 0.35) {
            Collection.tryCapture();
          }
        }
      });
    });
  },

  // --- Goals ---
  addGoal() {
    const input = document.getElementById('goal-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const data = Storage.load();
    data.goals.today.push({ text, completed: false });
    Storage.save(data);
    input.value = '';
    this.render();
  },

  toggleGoal(type, index) {
    const data = Storage.load();
    const goal = data.goals[type]?.[index];
    if (!goal) return;

    const wasCompleted = goal.completed;
    goal.completed = !goal.completed;
    Storage.save(data);

    if (!wasCompleted && goal.completed) {
      data.stats.tasksCompleted++;
      Storage.save(data);
      const xpResult = Storage.addXp(25); // 25 XP per goal
      App.showToast(`+25 ${THEMES[data.theme].xpName}! Goal completed!`, 'xp');
      App.showXpPopup(25);

      if (xpResult.leveledUp) {
        App.showRankUp(xpResult.newRank);
      }

      if (Math.random() < 0.2) {
        Collection.tryCapture();
      }
    }

    this.render();
  },

  deleteGoal(index) {
    const data = Storage.load();
    data.goals.today.splice(index, 1);
    Storage.save(data);
    this.render();
  },

  // --- Utils ---
  formatTimeAgo(dateStr) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  },
};
