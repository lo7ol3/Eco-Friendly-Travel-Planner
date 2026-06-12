let tripDetails = getTripDetails();
let dropdownOpen = false;
let apiCities = [];

async function loadApiDestinations() {
  try {
    const response = await fetch("http://localhost:3000/api/destinations");
    const data = await response.json();

    apiCities = data
      .filter(item => item.name && item.name !== "Unnamed Destination")
      .map((item, index) => ({
        id: index + 1000,
        name: item.name,
        city: item.city || "",
        country: item.country || "Unknown",
        price: item.price || 100,
        co2: item.co2 || 50,
        transport: item.transport ? [item.transport] : ["bus"],
        tags: item.interests || ["eco", "culture"],
        emoji: getEmojiByDescription(item.description),
        description: item.description || "Tourist destination"
      }));

  } catch (error) {
    console.error("Failed to load itinerary destinations:", error);
  }
}

function getApiCityById(cityId) {
  return apiCities.find(city => city.id === cityId);
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

// Initialize page
document.addEventListener('DOMContentLoaded', async function () {
  await loadApiDestinations();

  document.getElementById('start-date').value = tripDetails.startDate;
  document.getElementById('end-date').value = tripDetails.endDate;

  renderCityDropdown();
  updateCityDisplay();

  renderWeatherWidget();
  renderTimeline();
  renderSidebar();
  updateNavbarBadge();
  renderSavedPlans();

  document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('city-dropdown-menu');
    const button = document.getElementById('city-dropdown');
    if (!dropdown.contains(e.target) && !button.contains(e.target)) {
      closeCityDropdown();
    }
  });
});

// City Dropdown Functions
function toggleCityDropdown() {
  dropdownOpen = !dropdownOpen;
  const menu = document.getElementById('city-dropdown-menu');

  if (dropdownOpen) {
    menu.classList.remove('hidden');
    document.getElementById('city-search').focus();
  } else {
    closeCityDropdown();
  }
}

function closeCityDropdown() {
  dropdownOpen = false;
  document.getElementById('city-dropdown-menu').classList.add('hidden');
  document.getElementById('city-search').value = '';
  renderCityDropdown();
}

function renderCityDropdown(searchQuery = '') {
  const list = document.getElementById('city-list');

  const filtered = apiCities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = '<p class="p-3 mb-0 small text-muted">No destinations found</p>';
    return;
  }

  list.innerHTML = filtered.map(city => `
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center gap-3 py-2 px-3 ${tripDetails.cityId === city.id ? 'bg-light fw-bold' : ''}" onclick="selectCity(${city.id})">
        <span class="fs-5">${city.emoji}</span>
        <div class="flex-grow-1">
          <p class="mb-0 small fw-bold">${city.name}</p>
          <p class="mb-0 x-small text-muted">${city.city ? city.city + ', ' : ''}${city.country}</p>
        </div>
        ${tripDetails.cityId === city.id ? '<span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill" style="font-size: 0.65rem;">Selected</span>' : ''}
      </button>
    </li>
  `).join('');
}

function filterCityDropdown() {
  const query = document.getElementById('city-search').value;
  renderCityDropdown(query);
}

function selectCity(cityId) {
  const city = getApiCityById(cityId);

  if (city) {
    tripDetails.city = city.name;
    tripDetails.cityId = city.id;
    tripDetails.country = city.country;
    tripDetails.destinationCity = city.city;

    setTripDetails(tripDetails);

    updateCityDisplay();
    closeCityDropdown();
    renderWeatherWidget();
    renderTimeline();
    renderSidebar();
  }
}

function updateCityDisplay() {
  const display = document.getElementById('city-dropdown-display');
  const weatherCityName = document.getElementById('weather-city-name');

  if (tripDetails.cityId) {
    const city = getApiCityById(tripDetails.cityId);

    if (city) {
      display.innerHTML = `
        <span class="fs-5">${city.emoji}</span>
        <span class="fw-bold" style="color: var(--green-dark);">
          ${city.name}, ${city.country}
        </span>
      `;

      weatherCityName.textContent = city.city || city.name;
      return;
    }
  }

  display.innerHTML = `
    <svg class="icon text-muted" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
    <span class="text-muted">Select a destination...</span>
  `;

  weatherCityName.textContent = 'Select a city';
}

function updateTripDates() {
  tripDetails.startDate = document.getElementById('start-date').value;
  tripDetails.endDate = document.getElementById('end-date').value;
  setTripDetails(tripDetails);

  // Normalize item dates
  const items = getItineraryItems();
  const start = new Date(tripDetails.startDate);
  const end = new Date(tripDetails.endDate);

  const normalizedItems = items.map(item => {
    if (!item.date) return { ...item, date: tripDetails.startDate };
    const itemDate = new Date(item.date);
    if (itemDate < start || itemDate > end) {
      return { ...item, date: tripDetails.startDate };
    }
    return item;
  });

  setItineraryItems(normalizedItems);

  renderWeatherWidget();
  renderTimeline();
}

// Reset Trip Function
function handleResetTrip() {
  // 1. Safety check: Only prompt if they actually have activities saved
  const currentItems = getItineraryItems();
  if (currentItems.length > 0) {
    if (!confirm("Are you sure you want to clear your entire itinerary? This cannot be undone.")) return;
  }

  // 2. Clear the data
  setItineraryItems([]);

  // 3. Reset trip details to default state
  const defaultTrip = {
    city: '',
    cityId: null,
    startDate: '2026-05-10', // Default start date
    endDate: '2026-05-12'    // Default end date
  };

  setTripDetails(defaultTrip);
  tripDetails = defaultTrip; // Update local state variable

  // 4. Reset the form inputs in the UI
  document.getElementById('start-date').value = defaultTrip.startDate;
  document.getElementById('end-date').value = defaultTrip.endDate;

  // 5. Re-render all components to show the empty states
  updateCityDisplay();
  renderWeatherWidget();
  renderTimeline();
  renderSidebar();
  updateNavbarBadge();
}

// Weather Widget
function renderWeatherWidget() {
  const container = document.getElementById('weather-widget');

  if (!tripDetails.cityId) {
    container.innerHTML = `
          <div class="p-5 text-center bg-white rounded-4 border border-dashed text-muted">
            <svg class="mb-3 opacity-25" width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <p class="mb-1 fw-bold">No city selected</p>
            <p class="small mb-0">Select a destination to see weather forecast for your trip.</p>
          </div>
        `;
    return;
  }

  const city = getApiCityById(tripDetails.cityId);
  const tripDates = getDatesInRange(tripDetails.startDate, tripDetails.endDate);
  const visibleDates = tripDates.slice(0, 16);
  const forecasts = visibleDates.map(date => getWeatherForDate(date));
  const current = forecasts[0];
  const forecastNote = tripDates.length > visibleDates.length
    ? `Showing first ${visibleDates.length} days`
    : `${visibleDates.length} day forecast`;

  container.innerHTML = `
        <div class="weather-widget weather-widget-expanded">
          <div class="weather-current">
            <div class="weather-current-top">
              <div class="weather-temp">
                ${getWeatherIcon(current.icon)}
                <div>
                  <h2>${current.temp}°C</h2>
                  <p class="weather-condition">${current.condition}</p>
                </div>
              </div>
              <div class="weather-city">
                <span style="font-size: 1.125rem;">${city.emoji}</span>
                <p>${city.name}, ${city.country}</p>
              </div>
            </div>

            <div class="weather-summary-meta">
              <div class="weather-summary-pill">
                <span>Forecast</span>
                <strong>${visibleDates.length} days</strong>
              </div>
              <div class="weather-summary-pill">
                <span>Start</span>
                <strong>${formatDateShort(tripDetails.startDate)}</strong>
              </div>
              <div class="weather-summary-pill">
                <span>End</span>
                <strong>${formatDateShort(tripDetails.endDate)}</strong>
              </div>
            </div>
          </div>

          <div class="weather-forecast-section">
            <div class="weather-forecast-header">
              <span>Daily Forecast</span>
              <span class="weather-forecast-note">${forecastNote}</span>
            </div>
            <div class="weather-forecast">
              ${forecasts.map((day, index) => `
                <article class="weather-day ${index === 0 ? 'current' : ''}">
                  <div class="weather-day-label">${day.day}</div>
                  <div class="weather-day-date">${formatDateShort(day.date)}</div>
                  ${getWeatherIcon(day.icon)}
                  <div class="weather-day-temp">${day.temp}°C</div>
                  <div class="weather-day-condition">${day.condition}</div>
                </article>
              `).join('')}
            </div>
          </div>
        </div>
      `;
}

// Timeline
function renderTimeline() {
  const container = document.getElementById('itinerary-timeline');
  const items = getItineraryItems();

  // Filter items by selected city
  const filteredItems = tripDetails.cityId
    ? items.filter(item => item.cityId === tripDetails.cityId)
    : items;

  // No city selected
  if (!tripDetails.cityId) {
    container.innerHTML = `
          <div class="p-4 text-center bg-white rounded-4 shadow-sm text-muted">
            <p class="mb-0">Please select a destination city above to start planning.</p>
          </div>
        `;
    return;
  }

  // No activities
  if (filteredItems.length === 0) {
    container.innerHTML = `
          <div class="p-5 text-center bg-white rounded-4 shadow-sm">
            <p class="mb-3">No activities added for ${tripDetails.city} yet.</p>
            <a href="directory.html" class="btn btn-success btn-sm px-4 rounded-pill">Browse Destinations</a>
          </div>
        `;
    return;
  }

  // Get all dates in trip range
  const dates = getDatesInRange(tripDetails.startDate, tripDetails.endDate);

  // Group items by date
  const itemsByDate = filteredItems.reduce((acc, item) => {
    const date = item.date || tripDetails.startDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {});

  const activityColors = {
    wellness: '#c5e1a5',
    food: '#ffe0b2',
    nature: '#dcedc8',
    culture: '#e1bee7',
    adventure: '#f9e4b7',
    wildlife: '#b2dfdb',
  };

  function getActivityColor(tags) {
    for (const tag of tags) {
      const lower = tag.toLowerCase();
      if (activityColors[lower]) return activityColors[lower];
    }
    return '#e8f5ee';
  }

  container.innerHTML = `
        <div class="timeline">
          <div class="timeline-line"></div>
          ${dates.map(date => {
    const dayItems = itemsByDate[date] || [];
    const dayNum = getDayNumber(tripDetails.startDate, date);

    // Fetch weather for this specific day
    const dayWeather = getWeatherForDate(date);

    return `
              <div class="timeline-day">
                <div class="timeline-dot"></div>
                <div class="timeline-date">Day ${dayNum}: ${formatDate(date)}</div>
                ${dayItems.length > 0 ? dayItems.map(item => {

      // SMART SUGGESTION LOGIC
      const outdoorTags = ['beach', 'hiking', 'cycle', 'wildlife', 'eco'];
      const isOutdoor = item.tags.some(tag => outdoorTags.includes(tag.toLowerCase()));
      const isRaining = dayWeather.icon === 'cloud-rain';

      const weatherSuggestion = (isOutdoor && isRaining) ? `
                    <div style="background-color: #fffbeb; border: 1px solid #fef08a; color: #854d0e; padding: 0.5rem 0.75rem; border-radius: 0.5rem; margin-top: 0.75rem; font-size: 0.75rem; display: flex; align-items: flex-start; gap: 0.5rem;">
                      <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink: 0; width: 1rem; height: 1rem; margin-top: 0.125rem;">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <div>
                        <strong>Weather Alert:</strong> Rain is forecasted! Consider moving this outdoor activity to another day or swapping it for an indoor cultural experience.
                      </div>
                    </div>
                  ` : '';

      return `
                  <div class="timeline-item">
                    <div class="timeline-item-header">
                      <div class="timeline-item-left">
                        <div class="timeline-item-icon" style="background-color: ${getActivityColor(item.tags)}">
                          ${item.emoji}
                        </div>
                        <div>
                          <h4 class="timeline-item-name">${item.name}</h4>
                          <p class="timeline-item-category">${item.tags[0] ? getTagLabel(item.tags[0]) : 'Activity'}</p>
                        </div>
                      </div>
                      <div class="timeline-item-right">
                        <span class="timeline-item-co2">+${item.co2} kg CO2</span>
                        <button class="timeline-item-delete" onclick="removeActivity(${item.id})">
                          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    ${weatherSuggestion}
                    
                    ${dates.length > 1 ? `
                      <div class="timeline-item-move">
                        <span>Move to:</span>
                        <div class="move-btns">
                          ${dates.map((d, idx) => `
                            <button 
                              class="move-btn ${d === date ? 'current' : 'other'}"
                              onclick="${d !== date ? `moveActivity(${item.id}, '${d}')` : ''}"
                              ${d === date ? 'disabled' : ''}
                            >
                              Day ${idx + 1}
                            </button>
                          `).join('')}
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `}).join('') : `
                  <p class="timeline-empty">No activities planned for this day.</p>
                `}
              </div>
            `;
  }).join('')}
        </div>
      `;
}

function removeActivity(activityId) {
  removeFromItinerary(activityId);
  renderTimeline();
  renderSidebar();
  updateNavbarBadge();
}

function moveActivity(activityId, newDate) {
  updateItemDate(activityId, newDate);
  renderTimeline();
}

function renderSidebar() {
  const items = getItineraryItems();
  const filteredItems = tripDetails.cityId
    ? items.filter(item => item.cityId === tripDetails.cityId)
    : [];

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  // Update the Number only (RM is hardcoded in HTML for better styling)
  document.getElementById('total-budget').textContent = totalPrice.toLocaleString();
  document.getElementById('activity-count').textContent = `${filteredItems.length} Activities`;

  const categoryTotals = filteredItems.reduce((acc, item) => {
    const category = item.tags && item.tags[0] ? item.tags[0] : 'other';
    acc[category] = (acc[category] || 0) + item.price;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  const list = document.getElementById('budget-breakdown-list');

  if (sortedCategories.length > 0) {
    list.innerHTML = sortedCategories.map(([category, amount]) => `
        <div class="budget-category-item">
          <span>${category}</span>
          <span>RM ${amount.toLocaleString()}</span>
        </div>
      `).join('');
  } else {
    list.innerHTML = `<p style="font-size: 0.8rem; color: #999; text-align: center;">No activities added yet.</p>`;
  }
}

function renderSavedPlans() {
  const plans = getSavedPlans();
  const container = document.getElementById('saved-plans-list');
  if (!container) return;

  if (plans.length === 0) {
    container.innerHTML = `
        <div class="col-12">
          <div class="p-5 text-center bg-white rounded-4 shadow-sm text-muted">
            <h3 class="h5 mb-3">No saved itineraries yet</h3>
            <p class="mb-3">Create a trip and click Save Itinerary to keep it for later.</p>
            <button class="btn btn-success btn-sm" onclick="document.getElementById('create-tab').click()">Start a Plan</button>
          </div>
        </div>
      `;
    return;
  }

  container.innerHTML = plans.map(plan => {
    const trip = plan.tripDetails || {};
    const count = Array.isArray(plan.items) ? plan.items.length : 0;
    const totalCost = plan.items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const totalCO2 = plan.items.reduce((sum, item) => sum + (Number(item.co2) || 0), 0);
    const startDate = trip.startDate || 'TBD';
    const endDate = trip.endDate || 'TBD';
    const cityLabel = trip.city ? `${trip.city}` : 'Unknown destination';

    return `
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm border-0 rounded-4">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 class="mb-1">${plan.title || cityLabel}</h5>
                  <p class="text-muted small mb-0">${cityLabel}</p>
                </div>
                <button type="button" class="btn btn-sm text-danger p-0" onclick="deleteSavedPlan(${plan.id})">🗑️</button>
              </div>
              <p class="text-muted small mb-1">${startDate} – ${endDate}</p>
              <div class="border-top pt-2 mb-3">
                <p class="small mb-1"><strong>Activities:</strong> ${count}</p>
                <p class="small mb-1"><strong>Total Cost:</strong> RM ${totalCost.toLocaleString()}</p>
                <p class="small mb-0"><strong>CO₂ Impact:</strong> +${totalCO2} kg</p>
              </div>
              <div class="d-flex justify-content-between">
                <button class="btn btn-outline-success btn-sm" onclick="viewSavedPlan(${plan.id})">View</button>
                <button class="btn btn-success btn-sm" onclick="editSavedPlan(${plan.id})">Edit</button>
              </div>
            </div>
          </div>
        </div>
      `;
  }).join('');
}
function saveItinerary() {
  if (!tripDetails.cityId) {
    alert('Please select a destination before saving your itinerary.');
    return;
  }

  const items = getItineraryItems().filter(item => item.cityId === tripDetails.cityId);
  if (items.length === 0) {
    alert('Please add at least one activity to your itinerary before saving.');
    return;
  }

  const defaultTitle = `${tripDetails.city} ${tripDetails.startDate || ''}`.trim();
  const title = prompt('Enter a title for this itinerary plan:', defaultTitle) || defaultTitle;
  const plans = getSavedPlans();
  const id = Date.now();

  plans.push({
    id,
    title,
    tripDetails: { ...tripDetails },
    items
  });

  setSavedPlans(plans);
  renderSavedPlans();
  alert('Itinerary saved successfully. You can now load it from the Saved Itinerary tab.');
}

function openSavedPlanForEdit(planId) {
  const plans = getSavedPlans();
  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    alert('Saved plan not found.');
    return;
  }

  tripDetails = { ...plan.tripDetails };
  setTripDetails(tripDetails);

  const remainingItems = getItineraryItems().filter(item => item.cityId !== tripDetails.cityId);
  setItineraryItems([...remainingItems, ...plan.items]);

  document.getElementById('start-date').value = tripDetails.startDate;
  document.getElementById('end-date').value = tripDetails.endDate;

  updateCityDisplay();
  renderWeatherWidget();
  renderTimeline();
  renderSidebar();
  updateNavbarBadge();

  const createTab = document.getElementById('create-tab');
  const tab = new bootstrap.Tab(createTab);
  tab.show();
}

function viewSavedPlan(planId) {
  const plans = getSavedPlans();
  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    alert('Saved plan not found.');
    return;
  }

  const title = plan.title || plan.tripDetails.city || 'Saved Plan';
  document.getElementById('savedPlanModalLabel').textContent = `Activities for ${title}`;
  document.getElementById('savedPlanModalCity').textContent = `${plan.tripDetails.city || 'Unknown destination'} · ${plan.tripDetails.startDate || 'TBD'} to ${plan.tripDetails.endDate || 'TBD'}`;

  const list = document.getElementById('savedPlanActivitiesList');
  if (!Array.isArray(plan.items) || plan.items.length === 0) {
    list.innerHTML = '<li class="list-group-item text-muted">No activities saved for this plan.</li>';
  } else {
    list.innerHTML = plan.items.map(item => `
      <li class="list-group-item">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <strong>${item.name || item.activity || 'Activity'}</strong>
            <p class="small text-muted mb-0">${item.description || item.city || ''}</p>
          </div>
          <span class="badge bg-success rounded-pill">${item.co2 || '0'} kg CO₂</span>
        </div>
      </li>
    `).join('');
  }

  const modalElement = document.getElementById('savedPlanModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function editSavedPlan(planId) {
  openSavedPlanForEdit(planId);
}

function deleteSavedPlan(planId) {
  if (!confirm('Are you sure you want to delete this saved itinerary?')) return;
  const plans = getSavedPlans().filter(p => p.id !== planId);
  setSavedPlans(plans);
  renderSavedPlans();
}

