/* ============================================================
   HEALTH — Themed Health, Meals & Recovery Station
   ============================================================ */

const HealthModule = {
  // Preset authentic anime meals per universe
  mealsData: {
    dragonball: [
      { id: 'db-m1', name: 'Senzu Bean', icon: '🫘', hp: 100, calories: 50, desc: 'Instantly restores full stamina and heals all wounds.' },
      { id: 'db-m2', name: 'Saiyan Roast Meat', icon: '🍖', hp: 40, calories: 650, desc: 'Massive dinosaur meat roast enjoyed after intense gravity training.' },
      { id: 'db-m3', name: 'Master Roshi Rice Bowl', icon: '🍚', hp: 25, calories: 350, desc: 'Hearty white rice bowl packed with energy.' },
      { id: 'db-m4', name: 'Capsule Corp Energy Drink', icon: '🥤', hp: 15, calories: 120, desc: 'Electrolyte drink formulated by Dr. Brief.' },
    ],

    naruto: [
      { id: 'nr-m1', name: 'Miso Tonkotsu Ramen', icon: '🍜', hp: 45, calories: 550, desc: 'Naruto\'s absolute favorite from Ichiraku Ramen with extra Chashu pork.' },
      { id: 'nr-m2', name: 'Three-Color Dango', icon: '🍡', hp: 20, calories: 220, desc: 'Sweet rice flour dumplings favored by Itachi and Mitarashi Anbu.' },
      { id: 'nr-m3', name: 'Military Food Pill', icon: '💊', hp: 35, calories: 150, desc: 'High-density chakra pill used on long S-rank missions.' },
      { id: 'nr-m4', name: 'Leaf Village Green Tea', icon: '🍵', hp: 15, calories: 40, desc: 'Calming green tea for chakra focus and inner peace.' },
    ],

    bleach: [
      { id: 'bl-m1', name: 'Squad 4 Health Tonic', icon: '🧪', hp: 50, calories: 100, desc: 'Kaidō spirit potion brewed by Unohana\'s squad.' },
      { id: 'bl-m2', name: 'Urahara Shop Candy', icon: '🍬', hp: 20, calories: 120, desc: 'Sweet Gikon-gai Soul Candy for a quick Reiatsu boost.' },
      { id: 'bl-m3', name: 'Karakura Bento Box', icon: '🍱', hp: 35, calories: 480, desc: 'Balanced high-protein Bento meal packed by Yuzu.' },
      { id: 'bl-m4', name: 'Spirit Energy Tea', icon: '🍵', hp: 15, calories: 30, desc: 'Refreshes spiritual pressure reserves.' },
    ],

    sololeveling: [
      { id: 'sl-m1', name: 'High-Grade HP Potion', icon: '🧪', hp: 60, calories: 80, desc: 'Purchased from the System Store to instantly close dungeon wounds.' },
      { id: 'sl-m2', name: 'Monarch Essence Elixir', icon: '🔮', hp: 100, calories: 0, desc: 'Crystallized mana elixir that completely replenishes status.' },
      { id: 'sl-m3', name: 'Hunter Guild Steak', icon: '🥩', hp: 35, calories: 580, desc: 'High-protein steak served to S-Rank raid members.' },
      { id: 'sl-m4', name: 'Mana Recovery Tonic', icon: '🍹', hp: 25, calories: 110, desc: 'Restores spent magic points for intense quests.' },
    ],

    hunterxhunter: [
      { id: 'hh-m1', name: 'Greed Island Meal Card', icon: '🃏', hp: 50, calories: 300, desc: 'B-Rank spell card (#045) that summons a 5-star feast.' },
      { id: 'hh-m2', name: 'Swamp Fish Roast', icon: '🐟', hp: 30, calories: 400, desc: 'Freshly caught fish from Whale Island swamps.' },
      { id: 'hh-m3', name: 'Heavens Arena Protein Shake', icon: '🥤', hp: 25, calories: 250, desc: 'Formulated for 200th floor combatants.' },
      { id: 'hh-m4', name: 'Choco-Robo Kun', icon: '🍫', hp: 15, calories: 180, desc: 'Killua\'s favorite chocolate robot snacks.' },
    ],

    pokemon: [
      { id: 'pk-m1', name: 'Max Potion', icon: '🧴', hp: 100, calories: 50, desc: 'Full restoration spray used at Pokémon Centers.' },
      { id: 'pk-m2', name: 'Oran Berry Juice', icon: '🫐', hp: 25, calories: 120, desc: 'Freshly squeezed natural berry juice that heals 10 HP.' },
      { id: 'pk-m3', name: 'Lumiose Galette', icon: '🥮', hp: 20, calories: 210, desc: 'Crispy pastry specialty enjoyed by regional champions.' },
      { id: 'pk-m4', name: 'Puff Puff Bread', icon: '🍞', hp: 15, calories: 160, desc: 'Fluffy baked bread loved by water and fire partners.' },
    ],

    demonslayer: [
      { id: 'ds-m1', name: 'Butterfly Mansion Gourd Soup', icon: '🥣', hp: 45, calories: 320, desc: 'Restorative medicinal soup cooked by Aoi for injured corps members.' },
      { id: 'ds-m2', name: 'Wisteria Flower Tea', icon: '🫖', hp: 20, calories: 20, desc: 'Calming floral tea that purges demonic toxins.' },
      { id: 'ds-m3', name: 'Tanjiro\'s Onigiri', icon: '🍙', hp: 30, calories: 280, desc: 'Handmade rice balls shared on night patrols.' },
      { id: 'ds-m4', name: 'Sweet Red Bean Mochi', icon: '🍡', hp: 15, calories: 190, desc: 'Mitsuri\'s favorite sweet treat after heavy training.' },
    ],

    wandandsword: [
      { id: 'ws-m1', name: 'Magia Elixir of Mana', icon: '🧪', hp: 60, calories: 90, desc: 'High-density mana elixir distilled at Regarden Spire.' },
      { id: 'ws-m2', name: 'Regarden Academy Roast', icon: '🥩', hp: 35, calories: 520, desc: 'Hearty protein roast served in the student dining hall.' },
      { id: 'ws-m3', name: 'Mana Fruit Tart', icon: '🥧', hp: 25, calories: 240, desc: 'Enchanted pastry infused with magical berry syrup.' },
      { id: 'ws-m4', name: 'Spire Herbal Tea', icon: '🫖', hp: 15, calories: 25, desc: 'Refreshes spell casting focus and stamina.' },
    ],
  },

  stationNames: {
    dragonball: { name: 'Senzu Bean & Saiyan Feast Hall', subtitle: 'Eat Like a Saiyan Warrior' },
    naruto: { name: 'Ichiraku Ramen & Food Stand', subtitle: 'Chakra Calorie Fuel Station' },
    bleach: { name: 'Squad 4 Medical Relief Station', subtitle: 'Kaidō Healing & Spirit Refreshment' },
    sololeveling: { name: 'System Recovery Potion Lab', subtitle: 'Status Restoration & Mana Fuel' },
    hunterxhunter: { name: 'Greed Island Feast Hall', subtitle: 'Hunter Guild Dining & Spell Foods' },
    pokemon: { name: 'Pokémon Center & PokéCafé', subtitle: 'Trainer Recovery & Berry Bar' },
    demonslayer: { name: 'Butterfly Mansion Rest Place', subtitle: 'Wisteria Recovery & Medicinal Tea' },
    wandandsword: { name: 'Regarden Dining & Mana Bar', subtitle: 'Academy Food & Spell Restoration' },
  },


  init() {
    this.render();
    this.bindEvents();
  },

  render() {
    const data = Storage.load();
    const themeId = data.theme || 'sololeveling';
    const theme = THEMES[themeId];
    if (!theme) return;

    const el = document.getElementById('health-content');
    if (!el) return;

    const station = this.stationNames[themeId] || { name: 'Rest Station', subtitle: 'Health & Recovery' };
    const meals = this.mealsData[themeId] || this.mealsData.sololeveling;

    // Load health state from storage or default
    const hp = data.health?.hp ?? 85;
    const waterCups = data.health?.waterCups ?? 4;
    const totalCalories = data.health?.todayCalories ?? 0;
    const loggedMeals = data.health?.loggedMeals ?? [];

    el.innerHTML = `
      <div class="health-header">
        <h2 class="health-title text-glow">${station.name}</h2>
        <p class="health-subtitle">${station.subtitle}</p>
      </div>

      <!-- HP & Energy Card -->
      <div class="hp-card">
        <div class="hp-bar-wrap">
          <div class="hp-bar-label">
            <span>❤️ Health & Energy (HP)</span>
            <span class="font-mono text-primary">${hp} / 100 HP</span>
          </div>
          <div class="hp-bar-track">
            <div class="hp-bar-fill" style="width: ${hp}%;"></div>
          </div>
        </div>
        <div class="flex justify-between items-center text-xs" style="color: var(--text-muted);">
          <span>Calories Today: <strong class="font-mono" style="color: var(--text);">${totalCalories} kcal</strong></span>
          <button class="btn btn-sm btn-primary" id="health-full-rest-btn">🛋️ Full Rest (+20 HP)</button>
        </div>
      </div>

      <div class="health-grid">
        <!-- Meals Section -->
        <div>
          <h3 style="margin-bottom: 16px;">🍱 Themed Foods & Drinks</h3>
          <div class="meals-grid">
            ${meals.map(m => `
              <div class="meal-card" data-meal-id="${m.id}">
                <span class="meal-icon">${m.icon}</span>
                <div class="meal-name">${m.name}</div>
                <div class="meal-stats">+${m.hp} HP · ${m.calories} kcal</div>
                <button class="btn btn-sm btn-secondary btn-block">Consume</button>
              </div>
            `).join('')}
          </div>

          <div class="card card-flat">
            <h4 style="margin-bottom: 12px;">📋 Today's Consumed Meals</h4>
            ${loggedMeals.length > 0 ? `
              <div class="checklist">
                ${loggedMeals.map(m => `
                  <div class="checklist-item" style="cursor: default;">
                    <span style="font-size: 1.2rem;">${m.icon}</span>
                    <span class="checklist-text">${m.name}</span>
                    <span class="font-mono text-xs" style="color: var(--primary);">+${m.hp} HP</span>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="empty-state" style="padding: 20px;">
                <div class="empty-state-text">No meals logged today yet. Eat to restore HP!</div>
              </div>
            `}
          </div>
        </div>

        <!-- Hydration & Sleep Section -->
        <div>
          <h3 style="margin-bottom: 16px;">💧 Hydration Tracker</h3>
          <div class="card card-flat mb-lg" style="text-align: center;">
            <div class="text-sm font-heading mb-sm" style="color: var(--text-muted);">8 CUPS DAILY TARGET</div>
            <div class="water-tracker" id="water-tracker">
              ${Array.from({ length: 8 }).map((_, i) => `
                <div class="water-drop ${i < waterCups ? 'filled' : ''}" data-water-index="${i}">
                  <span class="water-drop-icon">💧</span>
                </div>
              `).join('')}
            </div>
            <p class="text-xs mt-md" style="color: var(--text-dim);">${waterCups}/8 Cups Consumed</p>
          </div>

          <h3>😴 Sleep & Recovery</h3>
          <div class="card card-flat">
            <p class="text-xs mb-md" style="color: var(--text-muted);">Log last night's sleep to boost your daily XP multiplier!</p>
            <div class="form-group mb-md">
              <label class="form-label">Sleep Hours</label>
              <input type="number" class="form-input" id="sleep-hours-input" min="1" max="14" value="${data.health?.sleepHours || 8}" />
            </div>
            <button class="btn btn-secondary btn-block" id="save-sleep-btn">Log Sleep</button>
          </div>
        </div>
      </div>
    `;
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      // Consume meal card
      const mealCard = e.target.closest('.meal-card');
      if (mealCard) {
        this.consumeMeal(mealCard.dataset.mealId);
        return;
      }

      // Water drop click
      const waterDrop = e.target.closest('.water-drop');
      if (waterDrop) {
        this.toggleWater(parseInt(waterDrop.dataset.waterIndex));
        return;
      }

      // Full rest button
      if (e.target.id === 'health-full-rest-btn') {
        this.fullRest();
        return;
      }

      // Save sleep button
      if (e.target.id === 'save-sleep-btn') {
        const hours = parseInt(document.getElementById('sleep-hours-input')?.value) || 8;
        const data = Storage.load();
        if (!data.health) data.health = {};
        data.health.sleepHours = hours;
        Storage.save(data);
        AudioEngine.playClick();
        App.showToast(`Logged ${hours}h sleep. Well rested!`, 'success');
      }
    });
  },

  consumeMeal(mealId) {
    const data = Storage.load();
    const themeId = data.theme || 'sololeveling';
    const meals = this.mealsData[themeId] || this.mealsData.sololeveling;
    const meal = meals.find(m => m.id === mealId);
    if (!meal) return;

    if (!data.health) data.health = {};
    data.health.hp = Math.min(100, (data.health.hp ?? 85) + meal.hp);
    data.health.todayCalories = (data.health.todayCalories ?? 0) + meal.calories;

    if (!data.health.loggedMeals) data.health.loggedMeals = [];
    data.health.loggedMeals.push({ name: meal.name, icon: meal.icon, hp: meal.hp });

    Storage.save(data);
    AudioEngine.playHealthRestore();
    App.showToast(`Consumed ${meal.name}! (+${meal.hp} HP)`, 'success');
    this.render();
  },

  toggleWater(index) {
    const data = Storage.load();
    if (!data.health) data.health = {};
    let water = data.health.waterCups ?? 4;
    water = index + 1 === water ? index : index + 1;
    data.health.waterCups = water;
    Storage.save(data);

    AudioEngine.playClick();
    this.render();
  },

  fullRest() {
    const data = Storage.load();
    if (!data.health) data.health = {};
    data.health.hp = Math.min(100, (data.health.hp ?? 85) + 20);
    Storage.save(data);

    AudioEngine.playHealthRestore();
    App.showToast('Took a full rest! (+20 HP restored)', 'success');
    this.render();
  },
};
