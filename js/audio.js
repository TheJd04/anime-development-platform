/* ============================================================
   AUDIO ENGINE — Web Audio API Synthesizer & Sound Effects
   Generates theme-specific ambient music & UI sound effects
   ============================================================ */

const AudioEngine = {
  ctx: null,
  masterGain: null,
  musicGain: null,
  sfxGain: null,
  isMuted: false,
  volume: 0.5,
  currentTheme: null,
  musicTimer: null,
  stepIndex: 0,

  init() {
    // Load saved volume settings
    const savedVol = localStorage.getItem('levelup_audio_volume');
    if (savedVol !== null) this.volume = parseFloat(savedVol);
    const savedMute = localStorage.getItem('levelup_audio_muted');
    if (savedMute !== null) this.isMuted = savedMute === 'true';

    // Bind Audio Widget Controls
    const muteBtn = document.getElementById('audio-mute-btn');
    const volSlider = document.getElementById('audio-volume-slider');
    if (volSlider) volSlider.value = this.volume.toString();
    if (muteBtn) muteBtn.textContent = this.isMuted ? '🔇' : '🔊';

    muteBtn?.addEventListener('click', () => {
      this.ensureAudioUnlocked();
      const muted = this.toggleMute();
      if (muteBtn) muteBtn.textContent = muted ? '🔇' : '🔊';
    });

    volSlider?.addEventListener('input', (e) => {
      this.ensureAudioUnlocked();
      this.setVolume(parseFloat(e.target.value));
      if (muteBtn) muteBtn.textContent = this.volume === 0 ? '🔇' : '🔊';
    });

    // Start AudioContext on ANY user interaction
    const unlockHandler = () => {
      this.ensureAudioUnlocked();
    };

    ['pointerdown', 'click', 'keydown', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, unlockHandler, { passive: true });
    });
  },

  ensureAudioUnlocked() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.musicGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.musicGain.connect(this.masterGain);
        this.sfxGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.updateGainValues();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        this.updateGainValues();
      }).catch(() => {});
    }
  },

  updateGainValues() {
    if (!this.masterGain || !this.ctx) return;
    const effectiveVol = this.isMuted ? 0 : this.volume;
    this.masterGain.gain.setTargetAtTime(effectiveVol, this.ctx.currentTime, 0.05);
    this.musicGain.gain.setTargetAtTime(0.35, this.ctx.currentTime, 0.05);
    this.sfxGain.gain.setTargetAtTime(0.7, this.ctx.currentTime, 0.05);
  },

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    localStorage.setItem('levelup_audio_volume', this.volume.toString());
    if (this.volume > 0) this.isMuted = false;
    localStorage.setItem('levelup_audio_muted', this.isMuted.toString());
    this.updateGainValues();
  },

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('levelup_audio_muted', this.isMuted.toString());
    this.updateGainValues();
    return this.isMuted;
  },

  /* ── Background Music Synthesizer ─────────────── */
  startThemeMusic(themeId) {
    this.ensureAudioUnlocked();
    if (this.currentTheme === themeId && this.musicTimer) return;
    this.stopThemeMusic();
    this.currentTheme = themeId;
    this.stepIndex = 0;

    // Start 120BPM sequencer loop (250ms per step)
    this.musicTimer = setInterval(() => {
      if (this.isMuted || !this.ctx || this.ctx.state !== 'running') return;
      this.playMusicStep(themeId);
      this.stepIndex = (this.stepIndex + 1) % 16;
    }, 250);
  },

  stopThemeMusic() {
    if (this.musicTimer) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
  },

  playMusicStep(themeId) {
    switch (themeId) {
      case 'pokemon':
        const pkNotes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63, 440.00, 523.25];
        if (this.stepIndex % 2 === 0) {
          const freq = pkNotes[(this.stepIndex / 2) % pkNotes.length];
          this.playSynthNote(freq, 'square', 0.15, 0.08, this.musicGain);
        }
        break;

      case 'naruto':
        const nrNotes = [293.66, 349.23, 392.00, 440.00, 523.25, 440.00, 392.00, 349.23];
        if (this.stepIndex % 4 === 0) {
          const freq = nrNotes[(this.stepIndex / 4) % nrNotes.length];
          this.playSynthNote(freq, 'sine', 0.35, 0.12, this.musicGain);
        }
        if (this.stepIndex % 4 === 0) {
          this.playDrumNote(80, 0.2, this.musicGain);
        }
        break;

      case 'dragonball':
        const dbNotes = [130.81, 164.81, 196.00, 261.63];
        const freq = dbNotes[this.stepIndex % dbNotes.length];
        this.playSynthNote(freq, 'sawtooth', 0.12, 0.1, this.musicGain);
        if (this.stepIndex === 0) {
          this.playSynthNote(65.41, 'sawtooth', 0.8, 0.2, this.musicGain);
        }
        break;

      case 'sololeveling':
        const slNotes = [220.00, 277.18, 329.63, 440.00];
        if (this.stepIndex % 4 === 0) {
          this.playSynthNote(slNotes[(this.stepIndex / 4) % 4], 'sine', 0.3, 0.15, this.musicGain);
        }
        if (this.stepIndex % 8 === 0) {
          this.playSynthNote(110.00, 'triangle', 0.6, 0.25, this.musicGain);
        }
        break;

      case 'bleach':
        const blNotes = [164.81, 196.00, 246.94, 329.63];
        if (this.stepIndex % 8 === 0) {
          const blFreq = blNotes[(this.stepIndex / 8) % blNotes.length];
          this.playSynthNote(blFreq, 'triangle', 0.6, 0.1, this.musicGain);
        }
        break;

      case 'hunterxhunter':
        const hhNotes = [392.00, 440.00, 493.88, 587.33, 523.25, 493.88];
        if (this.stepIndex % 2 === 0) {
          const hhFreq = hhNotes[(this.stepIndex / 2) % hhNotes.length];
          this.playSynthNote(hhFreq, 'triangle', 0.18, 0.1, this.musicGain);
        }
        break;

      case 'demonslayer':
        const dsNotes = [293.66, 311.13, 392.00, 440.00, 523.25, 587.33];
        if (this.stepIndex % 4 === 0) {
          const dsFreq = dsNotes[(this.stepIndex / 4) % dsNotes.length];
          this.playSynthNote(dsFreq, 'sine', 0.4, 0.14, this.musicGain);
        }
        break;
    }
  },

  /* ── Synth Helpers ────────────────────────────── */
  playSynthNote(freq, type, duration, gainVal, targetGain) {
    this.ensureAudioUnlocked();
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(targetGain || this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },

  playDrumNote(freq, duration, targetGain) {
    this.ensureAudioUnlocked();
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(targetGain || this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },

  /* ── Elemental Spell Sound Synthesizer ───────── */
  playSpellCast(elementName = '') {
    this.ensureAudioUnlocked();
    if (!this.ctx || this.isMuted) return;

    const elem = (elementName || '').toLowerCase();
    const now = this.ctx.currentTime;

    // Sub-bass Magic Resonance (Universal)
    this.playSynthNote(55, 'sine', 0.8, 0.4, this.sfxGain);

    if (elem.includes('fire')) {
      // 🔥 Fire Explosion & Flame Sizzle
      this.playSynthNote(120, 'sawtooth', 0.6, 0.4, this.sfxGain);
      this.playNoiseBurst(0.5, 600, 'bandpass');
      setTimeout(() => this.playSynthNote(440, 'triangle', 0.4, 0.3, this.sfxGain), 100);
      setTimeout(() => this.playSynthNote(880, 'sine', 0.5, 0.25, this.sfxGain), 200);

    } else if (elem.includes('frost') || elem.includes('ice')) {
      // ❄️ Glacial Crystal Chimes & Shimmer
      const notes = [1046.50, 1318.51, 1567.98, 2093.00];
      notes.forEach((f, i) => {
        setTimeout(() => this.playSynthNote(f, 'sine', 0.4, 0.3, this.sfxGain), i * 60);
      });
      this.playNoiseBurst(0.4, 3000, 'highpass');

    } else if (elem.includes('lightning') || elem.includes('thunder')) {
      // ⚡ Electric Zap & Laser Thunder
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(now + 0.35);
      this.playNoiseBurst(0.25, 4000, 'bandpass');

    } else if (elem.includes('water')) {
      // 🌊 Aquatic Surge Wave
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(450, now + 0.3);
      osc.frequency.linearRampToValueAtTime(200, now + 0.6);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start();
      osc.stop(now + 0.6);

    } else if (elem.includes('barrier') || elem.includes('shield')) {
      // 🛡️ Divine Aegis Resonance Ring
      const chord = [349.23, 440.00, 523.25, 698.46];
      chord.forEach(f => this.playSynthNote(f, 'sine', 0.8, 0.25, this.sfxGain));

    } else if (elem.includes('blade') || elem.includes('sword')) {
      // ⚔️ Metallic Blade Slash & Sparkle
      this.playSynthNote(1400, 'sawtooth', 0.15, 0.4, this.sfxGain);
      setTimeout(() => this.playSynthNote(2800, 'sine', 0.3, 0.3, this.sfxGain), 50);
      setTimeout(() => this.playSynthNote(3500, 'triangle', 0.3, 0.2, this.sfxGain), 120);

    } else {
      // 🔮 Void Arcane Blast
      const arpeggio = [220, 330, 440, 660, 880, 1100];
      arpeggio.forEach((f, i) => {
        setTimeout(() => this.playSynthNote(f, 'triangle', 0.3, 0.25, this.sfxGain), i * 50);
      });
    }
  },

  playNoiseBurst(duration, filterFreq, filterType = 'bandpass') {
    if (!this.ctx || this.isMuted) return;
    try {
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.value = filterFreq;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },

  playSpellCraft() {
    this.ensureAudioUnlocked();
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 'triangle', 0.3, 0.2), idx * 70);
    });
  },

  playSpellRuneHum() {
    this.ensureAudioUnlocked();
    this.playSynthNote(440, 'sine', 0.12, 0.15);
  },

  /* ── UI Sound Effects ─────────────────────────── */
  playClick() {
    this.ensureAudioUnlocked();
    this.playSynthNote(800, 'sine', 0.04, 0.12);
  },

  playDeviceOpen() {
    this.ensureAudioUnlocked();
    if (!this.ctx || this.isMuted) return;
    this.playSynthNote(300, 'square', 0.08, 0.15);
    setTimeout(() => this.playSynthNote(600, 'sine', 0.12, 0.2), 60);
  },

  playQuestComplete() {
    this.ensureAudioUnlocked();
    if (!this.ctx || this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 'triangle', 0.25, 0.2), idx * 80);
    });
  },

  playRankUp() {
    this.ensureAudioUnlocked();
    if (!this.ctx || this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 'sawtooth', 0.35, 0.25), idx * 100);
    });
  },

  playHealthRestore() {
    this.ensureAudioUnlocked();
    if (!this.ctx || this.isMuted) return;
    const notes = [329.63, 392.00, 523.25, 659.25];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playSynthNote(freq, 'sine', 0.3, 0.15), idx * 70);
    });
  },
};
