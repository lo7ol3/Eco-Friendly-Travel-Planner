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
let apiCities = [];

document.addEventListener('DOMContentLoaded', () => {
    setupFilterListeners();
    loadApiDestinations();
    renderFavoritePlaces();
    updateNavbarBadge();
    initDirectoryAuthGuards();
});

async function loadApiDestinations(city = "") {
    const cardsContainer = document.getElementById('city-cards');
    const emptyState = document.getElementById('empty-state');

    cardsContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');
    cardsContainer.innerHTML = `<p>Loading destinations...</p>`;

    try {
        const url = city
            ? `http://localhost:3000/api/destinations?city=${encodeURIComponent(city)}`
            : `http://localhost:3000/api/destinations`;

        const response = await fetch(url);
        const data = await response.json();

        apiCities = data
            .filter(item => item.name && item.name !== "Unnamed Destination")
            .map((item, index) => ({
                id: index + 1000,
                name: item.name,
                country: item.country || item.city || "Unknown",
                price: item.price || 100,
                co2: item.co2 || 50,
                transport: item.transport ? [item.transport] : ["bus"],
                tags: item.interests || ["eco", "culture"],
                emoji: getEmojiByDescription(item.description),
                imgBg: getColorByIndex(index),
                description: item.description || "Tourist destination"
            }));

        renderCityCards();

    } catch (error) {
        console.error("API destination error:", error);
        cardsContainer.innerHTML = `<p>Failed to load destinations. Make sure your server is running.</p>`;
    }
}

function getEmojiByDescription(description = "") {
    const text = description.toLowerCase();

    if (text.includes("beach") || text.includes("water")) return "🏖️";
    if (text.includes("park") || text.includes("forest") || text.includes("nature")) return "🌲";
    if (text.includes("museum") || text.includes("heritage")) return "🏛️";
    if (text.includes("restaurant") || text.includes("food")) return "🍃";
    if (text.includes("hotel") || text.includes("accommodation")) return "🏡";
    if (text.includes("monument") || text.includes("statue")) return "🗿";
    if (text.includes("sights") || text.includes("tourism")) return "🌍";

    return "🌿";
}

function getColorByIndex(index) {
    const colors = ["#dff5e1", "#e8f5ee", "#dbeafe", "#fef3c7", "#fce7f3", "#ede9fe"];
    return colors[index % colors.length];
}

function setupFilterListeners() {
    const budgetMin = document.getElementById('budget-min');
    const budgetMax = document.getElementById('budget-max');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');

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

    sortSelect.addEventListener('change', (e) => {
        filters.sort = e.target.value;
        renderCityCards();
    });

    searchInput.addEventListener('input', (e) => {
        filters.search = e.target.value;
    });

    document.querySelectorAll('#transport-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#transport-options .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.transport = btn.dataset.value;
            renderCityCards();
        });
    });

    document.querySelectorAll('#carbon-options .option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#carbon-options .option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filters.carbon = btn.dataset.value;
            renderCityCards();
        });
    });

    document.querySelectorAll('#interest-options input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            filters.interests = Array.from(document.querySelectorAll('#interest-options input:checked')).map(cb => cb.value);
            renderCityCards();
        });
    });
}

function handleSearch(e) {
    e.preventDefault();

    const searchValue = document.getElementById('search-input').value.trim();

    filters.search = '';

    if (searchValue) {
        loadApiDestinations(searchValue);
    } else {
        loadApiDestinations();
    }
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
    loadApiDestinations();
}

function renderCityCards() {
    const lo = Math.min(filters.budgetMin, filters.budgetMax);
    const hi = Math.max(filters.budgetMin, filters.budgetMax);

    let filtered = apiCities.filter(city => {
        if (city.price < lo || city.price > hi) return false;
        if (filters.transport !== 'any' && !city.transport.includes(filters.transport)) return false;
        if (filters.carbon === 'low' && city.co2 >= 50) return false;
        if (filters.carbon === 'medium' && city.co2 >= 150) return false;
        if (filters.interests.length > 0 && !filters.interests.some(i => city.tags.includes(i))) return false;
        if (
            filters.search &&
            !city.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            !city.country.toLowerCase().includes(filters.search.toLowerCase())
        ) return false;

        return true;
    });

    if (filters.sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (filters.sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    if (filters.sort === 'co2-asc') filtered.sort((a, b) => a.co2 - b.co2);

    const cardsContainer = document.getElementById('city-cards');
    const emptyState = document.getElementById('empty-state');

    document.getElementById('results-count').textContent =
        `Showing ${filtered.length} destination${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
        cardsContainer.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    cardsContainer.classList.remove('hidden');
    emptyState.classList.add('hidden');

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
              <p class="city-card-location">📍 ${city.country}</p>
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

function openModal(cityId) {
    const city = apiCities.find(c => c.id === cityId);
    if (!city) return;

    currentModalCity = city;

    const cityActivities = [
        {
            id: cityId + 1,
            emoji: "🌿",
            name: `Eco Tour in ${city.name}`,
            description: "Explore sustainable attractions and local eco-friendly experiences.",
            tags: ["eco", "culture"],
            duration: "2 hours",
            price: 80,
            co2: 5
        },
        {
            id: cityId + 2,
            emoji: "🚶",
            name: "Walking Tour",
            description: "Low-carbon walking activity around the destination area.",
            tags: ["eco"],
            duration: "1 hour",
            price: 50,
            co2: 2
        },
        {
            id: cityId + 3,
            emoji: "🍃",
            name: "Local Green Experience",
            description: "Enjoy local culture, nature, and sustainable travel activities.",
            tags: ["culture", "eco"],
            duration: "3 hours",
            price: 100,
            co2: 8
        }
    ];

    document.getElementById('modal-header').style.backgroundColor = city.imgBg;
    document.getElementById('modal-emoji').textContent = city.emoji;
    document.getElementById('modal-title').textContent = city.name;
    document.getElementById('modal-subtitle').textContent = city.country;
    document.getElementById('modal-activities-count').textContent = `Available Activities (${cityActivities.length})`;

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
                  <span>${activity.duration}</span>
                  <span>${co2Label} ${activity.co2} kg CO2</span>
                  <span class="activity-price">RM ${activity.price}</span>
                </div>
              </div>
              <button 
                class="add-btn ${inItinerary ? 'added' : 'default'}" 
                onclick="handleAddActivity(${activity.id})">
                ${inItinerary ? 'Added' : 'Add'}
              </button>
            </div>
          </div>
        `;
    }).join('');

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

    const activity = {
        id: activityId,
        emoji: "🌿",
        name: `Eco Activity in ${currentModalCity.name}`,
        description: "Sustainable travel activity generated from API destination.",
        tags: ["eco", "culture"],
        duration: "2 hours",
        price: 80,
        co2: 5
    };

    if (isInItinerary(activityId)) {
        removeFromItinerary(activityId);
    } else {
        addToItinerary(activity, currentModalCity.name, currentModalCity.id);
    }

    openModal(currentModalCity.id);
    updateNavbarBadge();
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
        .map(id => apiCities.find(city => city.id === id))
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

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
});