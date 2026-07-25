/* ============================================================
   WATCH — Anime Streaming & Manga Tracker Hub
   Official streaming site directory, Manga chapter conversion, and ratings
   ============================================================ */

/**
 * Shared anime streaming sites — shown on every theme's watch page
 */
const ANIME_STREAMING_SITES = [
  { name: '123Animes',      icon: '🎬', url: 'https://123animes.ru',          label: 'Watch Anime Free' },
  { name: '9Anime TV',      icon: '📺', url: 'https://9animetv.to',           label: 'Stream Sub & Dub' },
  { name: 'AllManga',        icon: '📖', url: 'https://allmanga.to',            label: 'Read Manga Online' },
  { name: 'Anime Nexus',    icon: '🌐', url: 'https://anime.nexus',           label: 'Anime Streaming Hub' },
  { name: 'AnimeGG',        icon: '🎮', url: 'https://animegg.org',           label: 'Watch Anime Free' },
  { name: 'AnimeKai',       icon: '⚡', url: 'https://animekai.to',           label: 'Stream Anime' },
  { name: 'AnimePahe',      icon: '🔵', url: 'https://animepahe.ru',          label: 'Lightweight Streaming' },
  { name: 'AnimeStream',    icon: '🌊', url: 'https://animestream.net',       label: 'Watch Anime Online' },
  { name: 'AnimeZ',         icon: '🅰️', url: 'https://animez.org',            label: 'Anime Library' },
  { name: 'Anitaku',        icon: '🏯', url: 'https://anitaku.io',            label: 'Anime Episodes' },
  { name: 'AniWatch TV',    icon: '👁️', url: 'https://aniwatchtv.to',         label: 'Watch Sub & Dub' },
  { name: 'AniWorld',       icon: '🌍', url: 'https://aniworld.to',           label: 'German Anime Streams' },
  { name: 'GogoAnime',      icon: '🟢', url: 'https://gogoanime.org.vc',      label: 'Classic Anime Streaming' },
  { name: 'HiAnime',        icon: '🔷', url: 'https://hianime.to',            label: 'HD Anime Streaming' },
  { name: 'KickAssAnime',   icon: '🦵', url: 'https://kickassanime.mx',       label: 'Fast Anime Streaming' },
  { name: 'KissAnime',      icon: '💋', url: 'https://kissanime.com.ru',      label: 'Watch Anime Online' },
  { name: 'Nyaa',           icon: '🐱', url: 'https://nyaa.land',             label: 'Anime Torrents' },
  { name: 'WCO Stream',     icon: '📡', url: 'https://wcostream.tv',          label: 'Cartoons & Anime' },
];

const WatchModule = {
  selectedThemeId: null,

  init() {
    const data = Storage.load();
    if (!this.selectedThemeId) {
      this.selectedThemeId = data.theme || 'sololeveling';
    }
    this.render();
    this.bindEvents();
  },

  render() {
    const el = document.getElementById('watch-content');
    if (!el) return;

    const data = Storage.load();
    const currentTheme = THEMES[this.selectedThemeId] || THEMES[data.theme] || THEMES.sololeveling;
    const hub = currentTheme.animeHub || {
      title: `${currentTheme.name} Anime Series`,
      rating: '8.5 / 10 (MAL)',
      animeEpisodes: '100+ Episodes',
      mangaChapters: '200+ Chapters',
      mangaSync: 'Check official manga sources for latest chapter sync!',
      studio: 'Animation Studio',
      status: 'Airing / Published',
      synopsis: `Explore the epic anime journey of ${currentTheme.name}!`,
      streamingSites: [
        { name: 'Crunchyroll', icon: '🟠', url: 'https://www.crunchyroll.com', label: 'Watch Sub & Dub' },
        { name: 'Netflix', icon: '🔴', url: 'https://www.netflix.com', label: 'Stream Select Seasons' },
        { name: 'MANGA Plus', icon: '📖', url: 'https://mangaplus.shueisha.co.jp', label: 'Read Official Manga' },
      ]
    };

    const allThemes = Object.values(THEMES);

    el.innerHTML = `
      <div class="watch-header mb-lg">
        <div>
          <h2 class="watch-title text-glow">📺 Anime Streaming & Manga Tracker Hub</h2>
          <p class="text-sm" style="color: var(--text-muted);">Discover streaming platforms, manga chapter sync stats, and ratings for your favorite anime</p>
        </div>
      </div>

      <!-- Universe Selector Tabs -->
      <div class="watch-theme-selector mb-lg">
        ${allThemes.map(t => `
          <button class="watch-theme-btn ${t.id === this.selectedThemeId ? 'active' : ''}" data-theme-id="${t.id}">
            <span>${t.emoji}</span>
            <span>${t.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Anime & Manga Showcase Hero -->
      <div class="watch-hero-card card mb-lg">
        <div class="watch-hero-header">
          <div>
            <div class="watch-anime-title">${hub.title}</div>
            <div class="watch-rating-badge">⭐ ${hub.rating}</div>
          </div>
          <span class="watch-studio-badge">🎬 ${hub.studio} · ${hub.status}</span>
        </div>

        <p class="watch-synopsis">${hub.synopsis}</p>

        <!-- Live Manga & Anime Progress Counters Grid -->
        <div class="watch-stats-grid">
          <div class="watch-stat-card">
            <div class="watch-stat-icon">📺</div>
            <div>
              <div class="watch-stat-label">ANIME EPISODES</div>
              <div class="watch-stat-value">${hub.animeEpisodes}</div>
            </div>
          </div>

          <div class="watch-stat-card">
            <div class="watch-stat-icon">📖</div>
            <div>
              <div class="watch-stat-label">MANGA CHAPTERS</div>
              <div class="watch-stat-value">${hub.mangaChapters}</div>
            </div>
          </div>

          <div class="watch-stat-card watch-stat-card-wide">
            <div class="watch-stat-icon">🔄</div>
            <div>
              <div class="watch-stat-label">ANIME-TO-MANGA CHAPTER SYNC</div>
              <div class="watch-stat-sync">${hub.mangaSync}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Official Streaming & Manga Directory -->
      ${hub.streamingSites && hub.streamingSites.length > 0 ? `
        <h3 style="margin-bottom: 16px;">🌐 Official Watch & Read</h3>
        <div class="watch-links-grid mb-lg">
          ${hub.streamingSites.map(site => `
            <a href="${site.url}" target="_blank" rel="noopener noreferrer" class="watch-site-card">
              <div class="watch-site-icon">${site.icon}</div>
              <div class="watch-site-info">
                <div class="watch-site-name">${site.name}</div>
                <div class="watch-site-label">${site.label}</div>
              </div>
              <span class="watch-external-icon">↗</span>
            </a>
          `).join('')}
        </div>
      ` : ''}

      <!-- Community Streaming Sites (All Themes) -->
      <h3 style="margin-bottom: 16px;">🎬 Anime Streaming Sites</h3>
      <div class="watch-links-grid">
        ${ANIME_STREAMING_SITES.map(site => `
          <a href="${site.url}" target="_blank" rel="noopener noreferrer" class="watch-site-card">
            <div class="watch-site-icon">${site.icon}</div>
            <div class="watch-site-info">
              <div class="watch-site-name">${site.name}</div>
              <div class="watch-site-label">${site.label}</div>
            </div>
            <span class="watch-external-icon">↗</span>
          </a>
        `).join('')}
      </div>
    `;
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('.watch-theme-btn');
      if (themeBtn) {
        this.selectedThemeId = themeBtn.dataset.themeId;
        AudioEngine.playClick();
        this.render();
      }
    });
  },
};
