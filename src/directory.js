// directory.js

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
const bootstrapModal = new bootstrap.Modal(document.getElementById('activity-modal'));

document.addEventListener('DOMContentLoaded', () => {
    setupFilterListeners();
    renderCityCards();
    updateNavbarBadge();
});

function setupFilterListeners() {
    const budgetMin = document.getElementById('budget-min');
    const budgetMax = document.getElementById('budget-max');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');

    budgetMin.addEventListener('input', () => { filters.budgetMin = parseInt(budgetMin.value); updateBudgetUI(); });
    budgetMax.addEventListener('input', () => { filters.budgetMax = parseInt(budgetMax.value); updateBudgetUI(); });
    sortSelect.addEventListener('change', (e) => { filters.sort = e.target.value; renderCityCards(); });
    searchInput.addEventListener('input', (e) => { filters.search = e.target.value; renderCityCards(); });

    document.querySelectorAll('#interest-options input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filters.interests = Array.from(document.querySelectorAll('#interest-options input:checked')).map(cb => cb.value);
            renderCityCards();
        });
    });

    // Transport buttons listener
    document.querySelectorAll('#transport-options .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#transport-options .btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.transport = btn.dataset.value;
            renderCityCards();
        });
    });

    // Carbon buttons listener
    document.querySelectorAll('#carbon-options .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#carbon-options .btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.carbon = btn.dataset.value;
            renderCityCards();
        });
    });
}

function handleSearch(e) {
    e.preventDefault();
    filters.search = document.getElementById('search-input').value;
    renderCityCards();
}

function updateBudgetUI() {
    const lo = Math.min(filters.budgetMin, filters.budgetMax);
    const hi = Math.max(filters.budgetMin, filters.budgetMax);
    document.getElementById('budget-display').textContent = `RM ${lo} – RM ${hi === 3000 ? '3,000+' : hi}`;
    renderCityCards();
}

function renderCityCards() {
    const lo = Math.min(filters.budgetMin, filters.budgetMax);
    const hi = Math.max(filters.budgetMin, filters.budgetMax);

    let filtered = cities.filter(city => {
        // Budget Check
        if (city.price < lo || city.price > hi) return false;
        
        // Transport Check (Restore this if needed)
        if (filters.transport !== 'any' && !city.transport.includes(filters.transport)) return false;

        // MAX CO2 IMPACT CHECK (The missing part)
        if (filters.carbon === 'low' && city.co2 >= 50) return false;
        if (filters.carbon === 'medium' && city.co2 >= 150) return false;

        // Interests Check
        if (filters.interests.length > 0 && !filters.interests.some(i => city.tags.includes(i))) return false;
        
        // Search Check
        if (filters.search && !city.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
        
        return true;
    });

    if (filters.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === 'co2-asc') filtered.sort((a, b) => a.co2 - b.co2);

    const container = document.getElementById('city-cards');
    const emptyState = document.getElementById('empty-state');
    document.getElementById('results-count').textContent = `Showing ${filtered.length} destinations`;

    if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('d-none');
        return;
    }

    emptyState.classList.add('d-none');
    container.innerHTML = filtered.map(city => `
        <div class="col-md-6 col-xl-4">
            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden city-card" onclick="openModal(${city.id})">
                <div class="city-card-header d-flex align-items-center justify-content-center position-relative" style="background-color: ${city.imgBg}; height: 160px;">
                    <span class="display-3">${city.emoji}</span>
                    <button class="city-card-fav border-0 position-absolute top-0 start-0 m-3 ${isFavorite(city.id) ? 'active' : ''}" onclick="event.stopPropagation(); handleFavToggle(${city.id})">
                        ${isFavorite(city.id) ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="card-body p-4 d-flex flex-column">
                    <h5 class="fw-bold text-success mb-1">${city.name}</h5>
                    <p class="text-muted small mb-3">📍 ${city.country}</p>
                    <div class="mb-3">${city.tags.map(t => `<span class="tag bg-light small px-2 py-1 rounded me-1">${getTagLabel(t)}</span>`).join('')}</div>
                    <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                        <span class="fw-bold">RM ${city.price}</span>
                        <span class="small text-muted">${city.co2} kg CO2</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function handleFavToggle(id) {
    toggleFavorite(id);
    renderCityCards();
}

function openModal(cityId) {
    const city = getCityById(cityId);
    if (!city) return;
    currentModalCity = city;
    const cityActivities = getActivitiesByCity(cityId);

    document.getElementById('modal-header').style.backgroundColor = city.imgBg;
    document.getElementById('modal-emoji').textContent = city.emoji;
    document.getElementById('modal-title').textContent = city.name;
    document.getElementById('modal-subtitle').textContent = city.country;
    document.getElementById('modal-activities-count').textContent = `Available Activities (${cityActivities.length})`;

    document.getElementById('modal-activities').innerHTML = cityActivities.map(act => {
        const added = isInItinerary(act.id);
        return `
        <div class="card border rounded-4 p-3 shadow-sm">
            <div class="d-flex align-items-center gap-3">
                <span class="display-6">${act.emoji}</span>
                <div class="flex-grow-1">
                    <h6 class="fw-bold mb-1">${act.name}</h6>
                    <p class="text-muted small mb-1">${act.description}</p>
                    <div class="small fw-bold text-success">RM ${act.price} • ${act.co2}kg CO2</div>
                </div>
                <button class="btn ${added ? 'btn-success disabled' : 'btn-outline-success'} rounded-3" onclick="handleAddActivity(${act.id})">
                    ${added ? 'Added' : 'Add'}
                </button>
            </div>
        </div>
        `;
    }).join('');
    bootstrapModal.show();
}

function handleAddActivity(id) {
    const act = activities.find(a => a.id === id);
    if (addToItinerary(act, currentModalCity.name, currentModalCity.id)) {
        openModal(currentModalCity.id);
        updateNavbarBadge();
    }
}

function resetFilters() {
    filters = { search: '', budgetMin: 0, budgetMax: 3000, transport: 'any', carbon: 'any', interests: [], sort: 'default' };
    document.getElementById('search-input').value = '';
    document.getElementById('budget-min').value = 0;
    document.getElementById('budget-max').value = 3000;
    document.querySelectorAll('#interest-options input').forEach(cb => cb.checked = false);
    updateBudgetUI();
}