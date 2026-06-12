// directory.js

// Dynamic Filter Configuration Management State
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

// Safeguard core operational runtime until DOM elements completely execute
document.addEventListener('DOMContentLoaded', async () => {
    setupFilterListeners();
    if (typeof loadCities === 'function') {
        await loadCities();
    }
    renderCityCards();
    renderFavoritePlaces();
    if (typeof updateNavbarBadge === 'function') updateNavbarBadge();
    initDirectoryAuthGuards();
});

function initDirectoryAuthGuards() {
    document.querySelectorAll('.navbar-nav a.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === 'directory.html' || href === 'index.html' || href === 'login.html' || href === 'register.html') return;
        link.addEventListener('click', function(e) {
            if (typeof isAuthenticated === 'function' && !isAuthenticated()) {
                e.preventDefault();
                alert('Please log in to continue.');
                window.location.href = 'login.html';
            }
        });
    });
}

function setupFilterListeners() {
    const budgetMin = document.getElementById('budget-min');
    const budgetMax = document.getElementById('budget-max');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');

    if (budgetMin) budgetMin.addEventListener('input', () => { filters.budgetMin = parseInt(budgetMin.value); updateBudgetDisplay(); renderCityCards(); });
    if (budgetMax) budgetMax.addEventListener('input', () => { filters.budgetMax = parseInt(budgetMax.value); updateBudgetDisplay(); renderCityCards(); });
    if (sortSelect) sortSelect.addEventListener('change', (e) => { filters.sort = e.target.value; renderCityCards(); });
    if (searchInput) searchInput.addEventListener('input', (e) => { filters.search = e.target.value; renderCityCards(); });

    // Transport buttons context handlers
    document.querySelectorAll('#transport-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#transport-options .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.transport = btn.dataset.value;
            renderCityCards();
        });
    });

    // Checkbox input option listener filters
    document.querySelectorAll('#interest-options input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filters.interests = Array.from(document.querySelectorAll('#interest-options input:checked')).map(cb => cb.value);
            renderCityCards();
        });
    });

    // Carbon intensity toggle controls
    document.querySelectorAll('#carbon-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#carbon-options .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.carbon = btn.dataset.value;
            renderCityCards();
        });
    });
}

function handleSearch(e) {
    if (e) e.preventDefault();
    const searchEl = document.getElementById('search-input');
    if (searchEl) {
        filters.search = searchEl.value;
        renderCityCards();
    }
}

function updateBudgetDisplay() {
    const lo = Math.min(filters.budgetMin, filters.budgetMax);
    const hi = Math.max(filters.budgetMin, filters.budgetMax);
    const displayEl = document.getElementById('budget-display');
    if (displayEl) {
        displayEl.textContent = `RM ${lo} – RM ${hi === 3000 ? '3,000+' : hi}`;
    }
}

function renderCityCards() {
    const sourceCities = typeof cities !== 'undefined' ? cities : [];
    const lo = Math.min(filters.budgetMin, filters.budgetMax);
    const hi = Math.max(filters.budgetMin, filters.budgetMax);

    let filtered = sourceCities.filter(city => {
        if (city.price < lo || city.price > hi) return false;
        if (filters.transport !== 'any' && (!city.transport || !city.transport.includes(filters.transport))) return false;
        if (filters.carbon === 'low' && city.co2 >= 50) return false;
        if (filters.carbon === 'medium' && city.co2 >= 150) return false;
        if (filters.interests.length > 0 && (!city.tags || !filters.interests.some(i => city.tags.includes(i)))) return false;
        if (filters.search && !city.name?.toLowerCase().includes(filters.search.toLowerCase()) && 
            !city.country?.toLowerCase().includes(filters.search.toLowerCase())) return false;
        return true;
    });

    if (filters.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === 'co2-asc') filtered.sort((a, b) => a.co2 - b.co2);

    const cardsContainer = document.getElementById('city-cards');
    const emptyState = document.getElementById('empty-state');
    const countDisplay = document.getElementById('results-count');

    if (countDisplay) {
        countDisplay.textContent = `Showing ${filtered.length} destination${filtered.length !== 1 ? 's' : ''}`;
    }

    if (!cardsContainer) return;

    if (filtered.length === 0) {
        cardsContainer.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    cardsContainer.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');

    cardsContainer.innerHTML = filtered.map(city => {
        const fav = typeof isFavorite === 'function' ? isFavorite(city.id) : false;
        const co2Label = city.co2 < 50 ? '🟢' : city.co2 < 150 ? '🟡' : '🔴';

        const tagsHTML = (city.tags || []).slice(0, 3).map(t => {
            const label = (typeof tagLabels !== 'undefined' && tagLabels[t]) ? tagLabels[t] : t.toUpperCase();
            return `<span class="tag">${label}</span>`;
        }).join('');

        return `
          <div class="city-card" onclick="openModal(${city.id})">
            <div class="city-card-header" style="height: 160px; position: relative; overflow: hidden; background-color: ${city.imgBg || '#e8f5ee'};">
              ${city.img_url ? 
                `<img src="${city.img_url}" alt="${city.name}" style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">` : 
                `<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--green-mid);">🌿</div>`
              }
              <span class="city-card-badge" style="position: absolute; top: 12px; right: 12px; z-index: 5;">ECO</span>
              <button class="city-card-fav ${fav ? 'active' : ''}" onclick="handleFavorite(event, ${city.id})" style="position: absolute; top: 12px; left: 12px; z-index: 5;">
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
              <div class="city-card-tags">${tagsHTML}</div>
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
    if (typeof requireLogin === 'function' && !requireLogin()) return;
    if (typeof toggleFavorite === 'function') toggleFavorite(cityId);
    renderCityCards();
    renderFavoritePlaces();
}

function renderFavoritePlaces() {
    const list = document.getElementById('favorites-list');
    const count = document.getElementById('favorites-count');
    if (!list || !count) return;

    if (typeof getFavorites !== 'function' || typeof getCityById !== 'function') return;

    const favoriteCities = getFavorites().map(id => getCityById(id)).filter(Boolean);
    count.textContent = `${favoriteCities.length} saved`;

    if (favoriteCities.length === 0) {
        list.innerHTML = `<p class="favorites-empty">No favourite places yet. Click the heart icon on a destination.</p>`;
        return;
    }

    list.innerHTML = favoriteCities.map(city => `
        <div class="favorite-item" onclick="openModal(${city.id})">
          <div style="width: 40px; height: 40px; border-radius: 6px; background-image: url('${city.img_url || ''}'); background-size: cover; background-position: center; background-color: #eee; flex-shrink: 0;"></div>
          <div class="flex-grow-1 ms-2">
            <h4 class="mb-0 small fw-bold">${city.name}</h4>
            <p class="mb-0 text-muted extra-small">${city.country} • RM ${city.price}</p>
          </div>
          <button class="btn btn-sm btn-link text-danger p-0 border-0" onclick="removeFavoritePlace(event, ${city.id})">Remove</button>
        </div>
    `).join('');
}

function removeFavoritePlace(e, cityId) {
    e.stopPropagation();
    if (typeof requireLogin === 'function' && !requireLogin()) return;
    if (typeof toggleFavorite === 'function') toggleFavorite(cityId);
    renderCityCards();
    renderFavoritePlaces();
}

async function openModal(cityId) {
    if (typeof getCityById !== 'function') return;
    const city = getCityById(cityId);
    if (!city) return;

    currentModalCity = city;
    const cityActivities = typeof getActivitiesByCity === 'function' ? await getActivitiesByCity(cityId) : [];

    // FIXED: Stripped background-image so that it never puts image headers inside the view modal popup
    const modalHeader = document.getElementById('modal-header');
    if (modalHeader) {
        modalHeader.style.backgroundImage = 'none';
        modalHeader.style.backgroundColor = 'var(--green-pale)';
    }

    const titleEl = document.getElementById('modal-title');
    if (titleEl) titleEl.textContent = city.name;

    const subEl = document.getElementById('modal-subtitle');
    if (subEl) subEl.textContent = city.country;

    const countEl = document.getElementById('modal-activities-count');
    if (countEl) countEl.textContent = `Available Activities (${cityActivities.length})`;

    const activitiesContainer = document.getElementById('modal-activities');
    if (activitiesContainer) {
        activitiesContainer.innerHTML = cityActivities.map(activity => {
            const inItinerary = typeof isInItinerary === 'function' ? isInItinerary(activity.id) : false;
            const co2Label = activity.co2 < 5 ? '🟢' : activity.co2 < 10 ? '🟡' : '🔴';
            
            const actTagsHTML = (activity.tags || []).map(tag => {
                const label = (typeof tagLabels !== 'undefined' && tagLabels[tag]) ? tagLabels[tag] : tag.toUpperCase();
                return `<span class="tag">${label}</span>`;
            }).join('');

            // Restored original activity layout styling and dynamic functional check classes
            return `
              <div class="activity-card" style="margin-bottom: 12px; border: 1px solid #eee; padding: 12px; border-radius: 8px; background: white;">
                <div class="activity-card-inner d-flex align-items-start justify-content-between gap-2">
                  <div class="activity-content">
                    <h4 class="activity-name fw-bold mb-1" style="font-size:1rem; color: var(--green-dark);">${activity.name}</h4>
                    <p class="activity-desc text-muted small mb-2">${activity.description}</p>
                    <div class="city-card-tags mb-2">${actTagsHTML}</div>
                    <div class="activity-meta small text-muted d-flex gap-3">
                      <span>⏱️ ${activity.duration}</span>
                      <span>${co2Label} ${activity.co2} kg CO2</span>
                      <span class="activity-price fw-bold text-success">RM ${activity.price}</span>
                    </div>
                  </div>
                  <button class="add-btn btn btn-sm ${inItinerary ? 'btn-success text-white' : 'btn-outline-success'}" onclick="handleAddActivity(${activity.id})">
                    ${inItinerary ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            `;
        }).join('');
    }

    const modalOverlay = document.getElementById('activity-modal');
    if (modalOverlay) modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modalOverlay = document.getElementById('activity-modal');
    if (modalOverlay) modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    currentModalCity = null;
}

async function handleAddActivity(activityId) {
    if (typeof requireLogin === 'function' && !requireLogin()) return;
    if (!currentModalCity) return;
    
    const activity = typeof fetchActivityById === 'function' ? await fetchActivityById(activityId) : null;
    if (!activity) return;

    if (typeof isInItinerary === 'function' && isInItinerary(activityId)) {
        if (typeof removeFromItinerary === 'function') removeFromItinerary(activityId);
    } else {
        if (typeof addToItinerary === 'function') addToItinerary(activity, currentModalCity.name, currentModalCity.id);
    }

    openModal(currentModalCity.id);
    if (typeof updateNavbarBadge === 'function') updateNavbarBadge();
}

function resetFilters() {
    filters = { search: '', budgetMin: 0, budgetMax: 3000, transport: 'any', carbon: 'any', interests: [], sort: 'default' };

    if (document.getElementById('search-input')) document.getElementById('search-input').value = '';
    if (document.getElementById('budget-min')) document.getElementById('budget-min').value = 0;
    if (document.getElementById('budget-max')) document.getElementById('budget-max').value = 3000;
    if (document.getElementById('sort-select')) document.getElementById('sort-select').value = 'default';
    
    document.querySelectorAll('#transport-options .option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === 'any');
    });
    document.querySelectorAll('#carbon-options .option-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === 'any');
    });
    document.querySelectorAll('#interest-options input').forEach(cb => { cb.checked = false; });

    updateBudgetDisplay();
    renderCityCards();
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});