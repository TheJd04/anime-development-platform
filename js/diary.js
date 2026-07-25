/* ============================================================
   DIARY — Blog / Diary CRUD
   ============================================================ */

const Diary = {
  init() {
    this.render();
    this.bindEvents();
  },

  render() {
    const data = Storage.load();
    const theme = THEMES[data.theme] || {};
    const diaryTitle = theme.diaryName || 'Diary & Blog';
    const el = document.getElementById('diary-content');
    if (!el) return;

    el.innerHTML = `
      <div class="diary-header">
        <h2>📝 ${diaryTitle}</h2>
        <button class="btn btn-primary" id="diary-new-btn">+ New Entry</button>
      </div>
      <div class="diary-feed" id="diary-feed">

        ${data.diary.length > 0 ? 
          [...data.diary].reverse().map((entry, reverseIdx) => {
            const idx = data.diary.length - 1 - reverseIdx;
            return this.renderEntry(entry, idx);
          }).join('') 
          : `
            <div class="empty-state">
              <div class="empty-state-icon">📖</div>
              <div class="empty-state-text">No entries yet. Start writing about your journey!</div>
            </div>
          `
        }
      </div>
    `;
  },

  renderEntry(entry, index) {
    const date = new Date(entry.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return `
      <div class="diary-entry" data-diary-index="${index}">
        <div class="diary-entry-header">
          <div>
            <div class="diary-entry-title">${this.escapeHtml(entry.title)}</div>
            <div class="diary-entry-date">${dateStr} · ${timeStr}</div>
          </div>
          <div class="diary-entry-actions">
            <button class="btn btn-ghost btn-sm" data-diary-edit="${index}">✏️</button>
            <button class="btn btn-ghost btn-sm" data-diary-delete="${index}">🗑️</button>
          </div>
        </div>
        <div class="diary-entry-body">${this.escapeHtml(entry.content)}</div>
        <div class="diary-entry-footer">
          ${entry.mood ? `<span class="diary-mood">${entry.mood}</span>` : ''}
          ${(entry.tags || []).map(t => `<span class="diary-tag">${this.escapeHtml(t)}</span>`).join('')}
          <span class="text-xs" style="color: var(--text-dim); margin-left: auto;">
            ${this.wordCount(entry.content)} words
          </span>
        </div>
      </div>
    `;
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.id === 'diary-new-btn') {
        this.showEntryModal();
      }

      if (e.target.dataset.diaryEdit !== undefined) {
        e.stopPropagation();
        this.showEntryModal(parseInt(e.target.dataset.diaryEdit));
      }

      if (e.target.dataset.diaryDelete !== undefined) {
        e.stopPropagation();
        this.deleteEntry(parseInt(e.target.dataset.diaryDelete));
      }

      // Click entry to view
      const entry = e.target.closest('.diary-entry');
      if (entry && !e.target.dataset.diaryEdit && !e.target.dataset.diaryDelete) {
        this.viewEntry(parseInt(entry.dataset.diaryIndex));
      }
    });
  },

  showEntryModal(editIndex = null) {
    const data = Storage.load();
    const isEdit = editIndex !== null;
    const entry = isEdit ? data.diary[editIndex] : null;

    const moods = ['😤', '😔', '😐', '🙂', '😊', '😁', '🔥', '💪', '🧘', '🎯'];

    App.showModal(isEdit ? 'Edit Entry' : 'New Entry', `
      <div class="form-group mb-md">
        <label class="form-label">Title</label>
        <input type="text" class="form-input" id="diary-title" value="${isEdit ? this.escapeHtml(entry.title) : ''}" placeholder="Give your entry a title..." />
      </div>
      <div class="form-group mb-md">
        <label class="form-label">Content</label>
        <textarea class="form-input" id="diary-content-input" rows="8" placeholder="Write about your journey today...">${isEdit ? this.escapeHtml(entry.content) : ''}</textarea>
        <span class="text-xs" style="color: var(--text-dim);" id="diary-word-count">0 words</span>
      </div>
      <div class="form-group mb-md">
        <label class="form-label">Mood</label>
        <div class="flex gap-xs flex-wrap" id="diary-mood-select">
          ${moods.map(m => `
            <button class="btn btn-ghost btn-sm ${entry?.mood === m ? 'active' : ''}" 
              data-mood="${m}" 
              style="${entry?.mood === m ? 'background: rgba(255,255,255,0.1); border: 1px solid var(--primary);' : ''} font-size: 1.3rem; padding: 6px 10px;">
              ${m}
            </button>
          `).join('')}
        </div>
      </div>
      <div class="form-group mb-md">
        <label class="form-label">Tags (comma separated)</label>
        <input type="text" class="form-input" id="diary-tags" value="${isEdit ? (entry.tags || []).join(', ') : ''}" placeholder="e.g. training, mindset, goals" />
      </div>
      <button class="btn btn-primary btn-block" id="diary-save-btn">${isEdit ? 'Update' : 'Save'} Entry</button>
    `, () => {
      let selectedMood = entry?.mood || '';

      // Word count
      const textarea = document.getElementById('diary-content-input');
      const wordCountEl = document.getElementById('diary-word-count');
      if (textarea && wordCountEl) {
        const updateCount = () => {
          wordCountEl.textContent = this.wordCount(textarea.value) + ' words';
        };
        textarea.addEventListener('input', updateCount);
        updateCount();
      }

      // Mood selection
      document.getElementById('diary-mood-select')?.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-mood]');
        if (!btn) return;
        document.querySelectorAll('#diary-mood-select .btn').forEach(b => {
          b.style.background = '';
          b.style.border = '';
          b.classList.remove('active');
        });
        btn.style.background = 'rgba(255,255,255,0.1)';
        btn.style.border = '1px solid var(--primary)';
        btn.classList.add('active');
        selectedMood = btn.dataset.mood;
      });

      // Save
      document.getElementById('diary-save-btn')?.addEventListener('click', () => {
        const title = document.getElementById('diary-title').value.trim();
        const content = document.getElementById('diary-content-input').value.trim();
        const tagsRaw = document.getElementById('diary-tags').value.trim();
        const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

        if (!title || !content) {
          App.showToast('Title and content are required!', 'error');
          return;
        }

        const freshData = Storage.load();
        const entryObj = {
          id: isEdit ? freshData.diary[editIndex].id : Date.now().toString(36),
          title,
          content,
          date: isEdit ? freshData.diary[editIndex].date : new Date().toISOString(),
          mood: selectedMood,
          tags,
        };

        if (isEdit) {
          entryObj.updatedAt = new Date().toISOString();
          freshData.diary[editIndex] = entryObj;
        } else {
          freshData.diary.push(entryObj);
          freshData.stats.diaryEntries++;

          // Award XP for writing
          Storage.save(freshData);
          const xpResult = Storage.addXp(15);
          App.showToast(`+15 ${THEMES[freshData.theme].xpName}! Entry saved.`, 'xp');
          App.showXpPopup(15);
          if (xpResult.leveledUp) {
            App.showRankUp(xpResult.newRank);
          }
        }

        Storage.save(freshData);
        App.closeModal();
        this.render();

        if (!isEdit) {
          App.showToast('Entry saved!', 'success');
        }
      });
    });
  },

  viewEntry(index) {
    const data = Storage.load();
    const entry = data.diary[index];
    if (!entry) return;

    const date = new Date(entry.date);
    const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

    App.showModal(entry.title, `
      <div style="color: var(--text-dim); font-size: 0.85rem; margin-bottom: 16px;">
        ${dateStr} ${entry.mood ? `· ${entry.mood}` : ''}
      </div>
      <div style="color: var(--text); line-height: 1.8; font-size: 0.95rem; white-space: pre-wrap;">${this.escapeHtml(entry.content)}</div>
      ${(entry.tags || []).length > 0 ? `
        <div class="flex gap-xs flex-wrap mt-lg">
          ${entry.tags.map(t => `<span class="diary-tag">${this.escapeHtml(t)}</span>`).join('')}
        </div>
      ` : ''}
      <div class="flex gap-sm mt-lg justify-end">
        <button class="btn btn-secondary btn-sm" data-diary-edit="${index}" id="diary-view-edit">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" data-diary-delete="${index}" id="diary-view-delete">🗑️ Delete</button>
      </div>
    `, () => {
      document.getElementById('diary-view-edit')?.addEventListener('click', () => {
        App.closeModal();
        setTimeout(() => this.showEntryModal(index), 200);
      });
      document.getElementById('diary-view-delete')?.addEventListener('click', () => {
        App.closeModal();
        this.deleteEntry(index);
      });
    });
  },

  deleteEntry(index) {
    if (!confirm('Delete this entry?')) return;
    const data = Storage.load();
    data.diary.splice(index, 1);
    Storage.save(data);
    this.render();
    App.showToast('Entry deleted.', 'info');
  },

  // --- Utils ---
  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  wordCount(str) {
    return str.trim() ? str.trim().split(/\s+/).length : 0;
  },
};
