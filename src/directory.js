// directory.js

   // ============================================
    // DESTINATIONS PAGE SPECIFIC CODE
    // ============================================

    // Filter state
    let filters = {
      search: '',
      budgetMin: 0,
      budgetMax: 3000,
      transport: 'any',
      carbon: 'any',
      interests: ['eco'],
      sort: 'default'
    };

    let currentModalCity = null;

    // Initialize page
    document.addEventListener('DOMContentLoaded', function() {
     setupFilterListeners();
     renderCityCards();
     renderFavoritePlaces();
     updateNavbarBadge();
     initDirectoryAuthGuards();
    });

    function initDirectoryAuthGuards() {
      document.querySelectorAll('.navbar-nav a.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === 'directory.html' || href === 'index.html' || href === 'login.html' || href === 'register.html') return;
        link.addEventListener('click', function(e) {
          if (!isAuthenticated()) {
            e.preventDefault();
            alert('Please log in to continue.');
            window.location.href = 'login.html';
          }
        });
      });
    }

    // Setup filter event listeners
    function setupFilterListeners() {
      // Budget range
      const budgetMin = document.getElementById('budget-min');
      const budgetMax = document.getElementById('budget-max');
      
      budgetMin.addEventListener('input', () => {
        filters.budgetMin = parseInt(budgetMin.value);
        updateBudgetDisplay();
        renderCityCards();
      });
      
      budgetMax.addEventListener('input', () => {
        filters.budgetMax = parseInt(budgetMax.value);
        updateBudgetDisplay();
        renderCityCards();
      });

      // Transport options
      document.querySelectorAll('#transport-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#transport-options .option-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          filters.transport = btn.dataset.value;
          renderCityCards();
        });
      });

      // Interest checkboxes
      document.querySelectorAll('#interest-options input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          filters.interests = Array.from(document.querySelectorAll('#interest-options input:checked'))
            .map(cb => cb.value);
          renderCityCards();
        });
      });

      // Carbon options
      document.querySelectorAll('#carbon-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#carbon-options .option-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          filters.carbon = btn.dataset.value;
          renderCityCards();
        });
      });

      // Sort select
      document.getElementById('sort-select').addEventListener('change', (e) => {
        filters.sort = e.target.value;
        renderCityCards();
      });

      // Search input
      document.getElementById('search-input').addEventListener('input', (e) => {
        filters.search = e.target.value;
        renderCityCards();
      });
    }

    function handleSearch(e) {
      e.preventDefault();
      filters.search = document.getElementById('search-input').value;
      renderCityCards();
    }

    function updateBudgetDisplay() {
      const lo = Math.min(filters.budgetMin, filters.budgetMax);
      const hi = Math.max(filters.budgetMin, filters.budgetMax);
      document.getElementById('budget-display').textContent = 
        `RM ${lo} – RM ${hi === 3000 ? '3,000+' : hi}`;
    }

    function resetFilters() {
      filters = {
        search: '',
        budgetMin: 0,
        budgetMax: 3000,
        transport: 'any',
        carbon: 'any',
        interests: [],
        sort: 'default'
      };

      // Reset UI
      document.getElementById('search-input').value = '';
      document.getElementById('budget-min').value = 0;
      document.getElementById('budget-max').value = 3000;
      document.getElementById('sort-select').value = 'default';
      
      document.querySelectorAll('#transport-options .option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === 'any');
      });
      
      document.querySelectorAll('#carbon-options .option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === 'any');
      });
      
      document.querySelectorAll('#interest-options input').forEach(cb => {
        cb.checked = false;
      });

      updateBudgetDisplay();
      renderCityCards();
    }

    // Filter and render city cards
    function renderCityCards() {
      const lo = Math.min(filters.budgetMin, filters.budgetMax);
      const hi = Math.max(filters.budgetMin, filters.budgetMax);

      let filtered = cities.filter(city => {
        if (city.price < lo || city.price > hi) return false;
        if (filters.transport !== 'any' && !city.transport.includes(filters.transport)) return false;
        if (filters.carbon === 'low' && city.co2 >= 50) return false;
        if (filters.carbon === 'medium' && city.co2 >= 150) return false;
        if (filters.interests.length > 0 && !filters.interests.some(i => city.tags.includes(i))) return false;
        if (filters.search && !city.name.toLowerCase().includes(filters.search.toLowerCase()) && 
            !city.country.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
      });

      // Sort
      if (filters.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
      if (filters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
      if (filters.sort === 'co2-asc') filtered.sort((a, b) => a.co2 - b.co2);

      // Update count
      document.getElementById('results-count').textContent = 
        `Showing ${filtered.length} destination${filtered.length !== 1 ? 's' : ''}`;

      // Show/hide empty state
      const cardsContainer = document.getElementById('city-cards');
      const emptyState = document.getElementById('empty-state');
      
      if (filtered.length === 0) {
        cardsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
      }

      cardsContainer.classList.remove('hidden');
      emptyState.classList.add('hidden');

      // Render cards
      cardsContainer.innerHTML = filtered.map(city => {
        const co2Label = getCO2Label(city.co2);
        const fav = isFavorite(city.id);
        
        return `
          <div class="city-card" onclick="openModal(${city.id})">
            <div class="city-card-header" style="background-color: ${city.imgBg}">
              <span class="city-card-emoji">${city.emoji}</span>
              <span class="city-card-badge">ECO</span>
              <button class="city-card-fav ${fav ? 'active' : ''}" onclick="handleFavorite(event, ${city.id})">
                <svg class="icon" fill="${fav ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>
            <div class="city-card-content">
              <h3 class="city-card-name">${city.name}</h3>
              <p class="city-card-location">
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 12px; height: 12px;">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                ${city.country}
              </p>
              <div class="city-card-tags">
                ${city.tags.slice(0, 3).map(tag => `<span class="tag">${getTagLabel(tag)}</span>`).join('')}
              </div>
              <div class="city-card-footer">
                <span class="city-card-price">~RM ${city.price}</span>
                <span class="city-card-co2">${co2Label} ${city.co2} kg CO2</span>
              </div>
              <button class="view-activities-btn">View Activities</button>
            </div>
          </div>
        `;
      }).join('');
    }

   function handleFavorite(e, cityId) {
  e.stopPropagation();
  if (!requireLogin()) return;
  toggleFavorite(cityId);
  renderCityCards();
  renderFavoritePlaces();
}
function renderFavoritePlaces() {
  const list = document.getElementById('favorites-list');
  const count = document.getElementById('favorites-count');

  if (!list || !count) return;

  const favoriteCities = getFavorites()
    .map(id => getCityById(id))
    .filter(Boolean);

  count.textContent = `${favoriteCities.length} saved`;

  if (favoriteCities.length === 0) {
    list.innerHTML = `<p class="favorites-empty">No favourite places yet. Click the heart icon on a destination.</p>`;
    return;
  }

  list.innerHTML = favoriteCities.map(city => `
    <div class="favorite-item" onclick="openModal(${city.id})">
      <span class="favorite-emoji">${city.emoji}</span>
      <div>
        <h4>${city.name}</h4>
        <p>${city.country} • RM ${city.price} • ${city.co2} kg CO2</p>
      </div>
      <button onclick="removeFavoritePlace(event, ${city.id})">Remove</button>
    </div>
  `).join('');
}

function removeFavoritePlace(e, cityId) {
  e.stopPropagation();
  if (!requireLogin()) return;
  toggleFavorite(cityId);
  renderCityCards();
  renderFavoritePlaces();
}

    // Modal functions
    function openModal(cityId) {
      const city = getCityById(cityId);
      if (!city) return;

      currentModalCity = city;
      const cityActivities = getActivitiesByCity(cityId);

      // Update modal header
      document.getElementById('modal-header').style.backgroundColor = city.imgBg;
      document.getElementById('modal-emoji').textContent = city.emoji;
      document.getElementById('modal-title').textContent = city.name;
      document.getElementById('modal-subtitle').textContent = city.country;
      document.getElementById('modal-activities-count').textContent = `Available Activities (${cityActivities.length})`;

      // Render activities
      document.getElementById('modal-activities').innerHTML = cityActivities.map(activity => {
        const inItinerary = isInItinerary(activity.id);
        const co2Label = activity.co2 < 5 ? '🟢' : activity.co2 < 10 ? '🟡' : '🔴';
        
        return `
          <div class="activity-card">
            <div class="activity-card-inner">
              <span class="activity-emoji">${activity.emoji}</span>
              <div class="activity-content">
                <h4 class="activity-name">${activity.name}</h4>
                <p class="activity-desc">${activity.description}</p>
                <div class="city-card-tags" style="margin-bottom: 0.75rem;">
                  ${activity.tags.map(tag => `<span class="tag">${getTagLabel(tag)}</span>`).join('')}
                </div>
                <div class="activity-meta">
                  <span>
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 12px; height: 12px;">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    ${activity.duration}
                  </span>
                  <span>
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 12px; height: 12px;">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    ${co2Label} ${activity.co2} kg CO2
                  </span>
                  <span class="activity-price">RM ${activity.price}</span>
                </div>
              </div>
              <button 
                class="add-btn ${inItinerary ? 'added' : 'default'}" 
                onclick="handleAddActivity(${activity.id})"
              >
                ${inItinerary ? `
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Added
                ` : `
                  <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add
                `}
              </button>
            </div>
          </div>
        `;
      }).join('');

      // Show modal
      document.getElementById('activity-modal').classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      document.getElementById('activity-modal').classList.add('hidden');
      document.body.style.overflow = '';
      currentModalCity = null;
    }

    function handleAddActivity(activityId) {
      if (!requireLogin()) return;
      if (!currentModalCity) return;
      
      const activity = activities.find(a => a.id === activityId);
      if (!activity) return;

      if (isInItinerary(activityId)) {
        removeFromItinerary(activityId);
      } else {
        addToItinerary(activity, currentModalCity.name, currentModalCity.id);
      }

      // Re-render modal to update button state and badge
      openModal(currentModalCity.id);
      updateNavbarBadge();
    }

    // Close modal on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeModal();
    });
  