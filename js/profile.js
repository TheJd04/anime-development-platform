/* ============================================================
   PROFILE — Stats, rank progress, theme switcher, settings
   ============================================================ */

const Profile = {
  init() {
    this.render();
  },

  render() {
    const data = Storage.load();
    const themeId = data.theme;
    const theme = THEMES[themeId];
    if (!theme) return;

    const el = document.getElementById('profile-content');
    if (!el) return;

    const rank = getCurrentRank(themeId, data.profile.xp);
    const nextRank = getNextRank(themeId, data.profile.xp);
    const progress = getRankProgress(themeId, data.profile.xp);
    const totalStudy = data.study.sessions.reduce((sum, s) => sum + s.duration, 0);
    const totalExercise = data.exercise.log.reduce((sum, e) => sum + e.duration, 0);
    const initial = (data.profile.name || '?')[0].toUpperCase();

    el.innerHTML = `
      <div class="profile-header">
        <div class="relative" style="display: inline-block;">
          <div class="aura"></div>
          <div class="profile-avatar-large">${initial}</div>
        </div>
        <h2 class="profile-name text-glow">${data.profile.name}</h2>
        <span class="rank-badge ${getRankTierClass(themeId, data.profile.xp)}" style="font-size: 0.85rem; padding: 6px 18px;">
          ${rank.name}
        </span>
        <p class="text-sm mt-sm" style="color: var(--text-dim);">
          Joined ${data.profile.createdAt ? new Date(data.profile.createdAt).toLocaleDateString() : 'recently'}
          · ${theme.name} Universe
        </p>
      </div>

      <!-- Rank Progress -->
      <div class="card card-glow mb-lg" style="max-width: 600px; margin-left: auto; margin-right: auto;">
        <h4 style="margin-bottom: 14px;">Rank Progression</h4>
        <div class="xp-display" style="background: transparent; padding: 0;">
          <div class="xp-info w-full">
            <div class="flex justify-between items-center mb-sm">
              <span class="font-heading text-sm" style="color: var(--text);">${rank.name}</span>
              <span class="font-heading text-sm" style="color: var(--text-muted);">${nextRank ? nextRank.name : 'MAX RANK'}</span>
            </div>
            <div class="progress-bar progress-bar-lg">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div class="flex justify-between mt-sm">
              <span class="font-mono text-xs" style="color: var(--text-dim);">${data.profile.xp.toLocaleString()} ${theme.xpName}</span>
              <span class="font-mono text-xs" style="color: var(--text-dim);">${nextRank ? nextRank.xp.toLocaleString() : '∞'}</span>
            </div>
          </div>
        </div>

        <!-- All ranks -->
        <div class="mt-lg">
          <div class="text-xs font-heading mb-sm" style="color: var(--text-dim); letter-spacing: 0.1em;">ALL RANKS</div>
          <div class="flex flex-col gap-xs">
            ${theme.ranks.map(r => {
              const achieved = data.profile.xp >= r.xp;
              const isCurrent = r.name === rank.name;
              return `
                <div class="flex items-center gap-sm" style="padding: 6px 10px; border-radius: 6px; 
                  ${isCurrent ? 'background: var(--surface-light); border: 1px solid var(--primary);' : ''}
                  ${!achieved ? 'opacity: 0.35;' : ''}">
                  <span style="font-size: 0.85rem;">${achieved ? '✅' : '🔒'}</span>
                  <span class="font-heading text-sm" style="flex: 1;">${r.name}</span>
                  <span class="font-mono text-xs" style="color: var(--text-dim);">${r.xp.toLocaleString()} ${theme.xpName}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="profile-stats-grid">
        <div class="profile-stat-card">
          <div class="stat-number">${data.profile.xp.toLocaleString()}</div>
          <div class="profile-stat-label">Total ${theme.xpName}</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-number">🔥 ${data.stats.streak}</div>
          <div class="profile-stat-label">${theme.streakName}</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-number">${(totalStudy / 60).toFixed(1)}</div>
          <div class="profile-stat-label">Study Hours</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-number">${(totalExercise / 60).toFixed(1)}</div>
          <div class="profile-stat-label">Exercise Hours</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-number">${data.stats.tasksCompleted}</div>
          <div class="profile-stat-label">Goals Completed</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-number">${data.diary.length}</div>
          <div class="profile-stat-label">Diary Entries</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-number">${data.collection.length}</div>
          <div class="profile-stat-label">${theme.collectionName}</div>
        </div>
        <div class="profile-stat-card">
          <div class="stat-number">${data.stats.longestStreak}</div>
          <div class="profile-stat-label">Best Streak</div>
        </div>
      </div>

      <!-- Settings -->
      <div class="profile-settings mt-lg">
        <div class="settings-group">
          <div class="settings-group-title">Universe</div>
          <div class="settings-row">
            <div>
              <div class="settings-row-label">Current: ${theme.emoji} ${theme.name}</div>
              <div class="settings-row-desc">Change your anime universe theme</div>
            </div>
            <button class="btn btn-secondary btn-sm" id="profile-change-theme">Switch</button>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-group-title">Profile</div>
          <div class="settings-row">
            <div>
              <div class="settings-row-label">Change Name</div>
              <div class="settings-row-desc">Update your warrior name</div>
            </div>
            <button class="btn btn-secondary btn-sm" id="profile-change-name">Edit</button>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-group-title">Data</div>
          <div class="settings-row">
            <div>
              <div class="settings-row-label">Export Data</div>
              <div class="settings-row-desc">Download your data as JSON</div>
            </div>
            <button class="btn btn-secondary btn-sm" id="profile-export">Export</button>
          </div>
          <div class="settings-row">
            <div>
              <div class="settings-row-label">Import Data</div>
              <div class="settings-row-desc">Restore from a JSON file</div>
            </div>
            <button class="btn btn-secondary btn-sm" id="profile-import">Import</button>
          </div>
          <div class="settings-row">
            <div>
              <div class="settings-row-label">Reset Everything</div>
              <div class="settings-row-desc">Delete all data and start over</div>
            </div>
            <button class="btn btn-danger btn-sm" id="profile-reset">Reset</button>
          </div>
        </div>
      </div>
    `;

    this.bindSettingsEvents();
  },

  bindSettingsEvents() {
    // Change theme
    document.getElementById('profile-change-theme')?.addEventListener('click', () => {
      App.showModal('Switch Universe', `
        <div class="flex flex-col gap-sm">
          ${Object.values(THEMES).map(t => `
            <button class="btn btn-secondary btn-block" data-switch-theme="${t.id}" style="text-align: left; justify-content: flex-start; padding: 14px 18px;">
              <span style="font-size: 1.4rem; margin-right: 10px;">${t.emoji}</span>
              <span>${t.name}</span>
            </button>
          `).join('')}
        </div>
      `, () => {
        document.querySelectorAll('[data-switch-theme]').forEach(btn => {
          btn.addEventListener('click', () => {
            const newTheme = btn.dataset.switchTheme;
            Storage.set('theme', newTheme);
            applyTheme(newTheme);
            App.closeModal();
            App.updateNav();
            this.render();
            App.showToast(`Switched to ${THEMES[newTheme].name}!`, 'success');
          });
        });
      });
    });

    // Change name
    document.getElementById('profile-change-name')?.addEventListener('click', () => {
      const data = Storage.load();
      App.showModal('Change Name', `
        <div class="form-group mb-md">
          <label class="form-label">New Name</label>
          <input type="text" class="form-input" id="new-name-input" value="${data.profile.name}" />
        </div>
        <button class="btn btn-primary btn-block" id="save-name-btn">Save</button>
      `, () => {
        document.getElementById('save-name-btn')?.addEventListener('click', () => {
          const name = document.getElementById('new-name-input').value.trim();
          if (name) {
            Storage.set('profile.name', name);
            App.closeModal();
            App.updateNav();
            this.render();
            App.showToast('Name updated!', 'success');
          }
        });
      });
    });

    // Export
    document.getElementById('profile-export')?.addEventListener('click', () => {
      const jsonStr = Storage.export();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `levelup-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      App.showToast('Data exported!', 'success');
    });

    // Import
    document.getElementById('profile-import')?.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (Storage.import(ev.target.result)) {
            const data = Storage.load();
            applyTheme(data.theme);
            App.updateNav();
            this.render();
            App.showToast('Data imported successfully!', 'success');
          } else {
            App.showToast('Import failed. Invalid file.', 'error');
          }
        };
        reader.readAsText(file);
      });
      input.click();
    });

    // Reset
    document.getElementById('profile-reset')?.addEventListener('click', () => {
      if (confirm('⚠️ This will delete ALL your data permanently. Are you sure?')) {
        if (confirm('Last chance — really delete everything?')) {
          Storage.reset();
          location.reload();
        }
      }
    });
  },
};
