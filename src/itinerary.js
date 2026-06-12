// ============================================
// ITINERARY PAGE SPECIFIC CODE
// ============================================

let tripDetails = getTripDetails();
let dropdownOpen = false;
let weatherForecasts = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  // Load trip details
  document.getElementById('start-date').value = tripDetails.startDate;
  document.getElementById('end-date').value = tripDetails.endDate;
  
  // Populate city dropdown
  renderCityDropdown();
  updateCityDisplay();
  
  // Render all sections
    renderWeatherWidget().then(() => {
    renderTimeline();
  });
  renderSidebar();
  updateNavbarBadge();
  renderSavedPlans();

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('city-dropdown-menu');
    const button = document.getElementById('city-dropdown');
    if (!dropdown || !button) return;
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
  const filtered = cities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0) {
    list.innerHTML = '<p class="p-3 mb-0 small text-muted">No cities found</p>';
    return;
  }

  list.innerHTML = filtered.map(city => `
    <li>
      <button type="button" class="dropdown-item d-flex align-items-center gap-3 py-2 px-3 ${tripDetails.cityId === city.id ? 'bg-light fw-bold' : ''}" onclick="selectCity(${city.id})">
        <img src="${city.img_url || ''}" alt="" class="rounded shadow-sm" style="width: 32px; height: 32px; object-fit: cover; flex-shrink: 0;" onerror="this.src='https://placehold.co/32x32?text=📍'">
        <div class="flex-grow-1">
          <p class="mb-0 small fw-bold">${city.name}</p>
          <p class="mb-0 x-small text-muted">${city.country}</p>
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
  const city = getCityById(cityId);
  if (city) {
    tripDetails.city = city.name;
    tripDetails.cityId = city.id;
    setTripDetails(tripDetails);
    
    updateCityDisplay();
    closeCityDropdown();
    renderWeatherWidget().then(() => {
  renderTimeline();
});

renderSidebar();
  }
}

function updateCityDisplay() {
  const display = document.getElementById('city-dropdown-display');
  const weatherCityName = document.getElementById('weather-city-name');
  
  if (tripDetails.cityId) {
    const city = getCityById(tripDetails.cityId);
    if (city) {
      display.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <img src="${city.img_url || ''}" alt="" class="rounded-circle shadow-sm" style="width: 24px; height: 24px; object-fit: cover;" onerror="this.style.display='none'">
          <span class="fw-bold" style="color: var(--green-dark);">${city.name}, ${city.country}</span>
        </div>
      `;
      weatherCityName.textContent = city.name;
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
  
  renderWeatherWidget().then(() => {
    renderTimeline();
  });
}

// Reset Trip Function
function handleResetTrip() {
  const currentItems = getItineraryItems();
  if (currentItems.length > 0) {
    if (!confirm("Are you sure you want to clear your entire itinerary? This cannot be undone.")) return;
  }

  setItineraryItems([]);
  
  const defaultTrip = {
    city: '',
    cityId: null,
    startDate: '2026-05-10', 
    endDate: '2026-05-12'    
  };
  
  setTripDetails(defaultTrip);
  tripDetails = defaultTrip; 

  document.getElementById('start-date').value = defaultTrip.startDate;
  document.getElementById('end-date').value = defaultTrip.endDate;

  updateCityDisplay();
  renderWeatherWidget().then(() => {
    renderTimeline();
  });
  renderSidebar();
  updateNavbarBadge();
}

// Weather Widget
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getWeatherSearchName(city) {
  return city.name.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
}

function renderWeatherAlerts(alerts) {
  if (!alerts || alerts.length === 0) return '';

  return `
    <div class="weather-alert-list">
      ${alerts.map(alert => `
        <div class="weather-alert weather-alert-${alert.type}">
          ${escapeHtml(alert.message)}
        </div>
      `).join('')}
    </div>
  `;
}

function renderWeatherDay(day) {
  const uv = weatherService.getUVRiskLevel(day.uvIndex);

  return `
    <article class="weather-day" title="${escapeHtml(day.condition)} on ${escapeHtml(weatherService.formatDate(day.date))}">
      <div class="weather-day-label">${escapeHtml(day.day)}</div>
      <div class="weather-day-date">${escapeHtml(weatherService.formatDate(day.date).replace(',', ''))}</div>
      <div class="weather-day-icon">${day.icon}</div>
      <div class="weather-day-temp">${day.maxTemp}&deg; / ${day.minTemp}&deg;</div>
      <div class="weather-day-meta">
        <span>${day.precipitationChance}% rain</span>
        <span>${day.windSpeed} km/h</span>
        <span class="uv-${uv.color}">UV ${day.uvIndex}</span>
      </div>
    </article>
  `;
}

async function renderWeatherWidget() {
  const container = document.getElementById('weather-widget');
  if (!container) return;

  if (!tripDetails.cityId) {
    weatherForecasts = [];
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

  const city = getCityById(tripDetails.cityId);
  if (!city) return;

  container.innerHTML = `
    <div class="weather-widget weather-loading">
      <div class="spinner-border spinner-border-sm text-success" role="status" aria-hidden="true"></div>
      <span>Loading Open-Meteo forecast...</span>
    </div>
  `;

  try {
    const location = await weatherService.getCoordinates(getWeatherSearchName(city));

    let forecasts = [];
    let usingTripDates = true;

    try {
      forecasts = await weatherService.getDailyForecast(
        location.latitude,
        location.longitude,
        tripDetails.startDate,
        tripDetails.endDate
      );
      weatherForecasts = forecasts;
    } catch (dateRangeError) {
      console.warn('Trip-date forecast unavailable, loading next available forecast:', dateRangeError);
      forecasts = await weatherService.getDailyForecast(location.latitude, location.longitude);
      weatherForecasts = [];
      usingTripDates = false;
    }

    const current = forecasts[0];

    if (!current) {
      throw new Error('No forecast available');
    }

    const cityLabel = `${city.name}, ${city.country}`;
    const periodLabel = usingTripDates
      ? `${weatherService.formatDate(tripDetails.startDate)} to ${weatherService.formatDate(tripDetails.endDate)}`
      : 'Next available Open-Meteo forecast';

    container.innerHTML = `
      <section class="weather-widget">
        <div class="weather-current">
          <div class="weather-temp">
            <span class="weather-main-icon">${current.icon}</span>
            <h2>${current.temp}&deg;C</h2>
          </div>

          <p class="weather-condition">
            ${escapeHtml(current.condition)} &middot; Wind ${current.windSpeed} km/h
          </p>

          <p class="weather-period">${escapeHtml(periodLabel)}</p>

          <div class="weather-city d-flex align-items-center gap-2 mt-2">
            <img src="${escapeHtml(city.img_url || '')}"
                 alt=""
                 class="rounded shadow-sm"
                 style="width:24px;height:24px;object-fit:cover;"
                 onerror="this.style.display='none'">
            <p class="mb-0 fw-bold">${escapeHtml(cityLabel)}</p>
          </div>

          ${renderWeatherAlerts(current.alert)}
        </div>

        <div class="weather-forecast-wrap" aria-label="Scrollable daily weather forecast">
          <div class="weather-forecast">
            ${forecasts.map(renderWeatherDay).join('')}
          </div>
        </div>
      </section>
    `;

  } catch(error) {
    console.error(error);
    weatherForecasts = [];

    container.innerHTML = `
      <div class="alert alert-warning mb-0">
        Unable to load weather forecast from Open-Meteo. Please check your connection or try another city.
      </div>
    `;
  }
}
// Timeline
function renderTimeline() {
  const container = document.getElementById('itinerary-timeline');
  const items = getItineraryItems();
  
  const filteredItems = tripDetails.cityId 
    ? items.filter(item => item.cityId === tripDetails.cityId)
    : items;

  if (!tripDetails.cityId) {
    container.innerHTML = `
      <div class="p-4 text-center bg-white rounded-4 shadow-sm text-muted">
        <p class="mb-0">Please select a destination city above to start planning.</p>
      </div>
    `;
    return;
  }

  if (filteredItems.length === 0) {
    container.innerHTML = `
      <div class="p-5 text-center bg-white rounded-4 shadow-sm">
        <p class="mb-3">No activities added for ${tripDetails.city} yet.</p>
        <a href="directory.html" class="btn btn-success btn-sm px-4 rounded-pill">Browse Destinations</a>
      </div>
    `;
    return;
  }

  const dates = getDatesInRange(tripDetails.startDate, tripDetails.endDate);
  
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
        const dayWeather = weatherForecasts.find(f => f.date === date);
        
        return `
          <div class="timeline-day">
            <div class="timeline-dot"></div>
            <div class="timeline-date">Day ${dayNum}: ${formatDate(date)}</div>
            ${dayItems.length > 0 ? dayItems.map(item => {
              
              const outdoorTags = ['beach', 'hiking', 'cycle', 'wildlife', 'eco'];
              const isOutdoor = item.tags.some(tag => outdoorTags.includes(tag.toLowerCase()));
              const suitable = dayWeather
                  ? weatherService.isSuitableForOutdoor(dayWeather)
                  : true;
    
              
              const weatherSuggestion = (isOutdoor && !suitable)
                  ? `
                    <div class="alert alert-warning mt-2 py-2">
                      Weather Alert:
                      ${dayWeather?.condition || 'Poor weather'} expected.
                    </div>
                  `
                  : '';

              return `
              <div class="timeline-item">
                <div class="timeline-item-header">
                  <div class="timeline-item-left">
                    <div class="timeline-item-icon" style="background-color: ${getActivityColor(item.tags)}">
                      ${item.emoji || '📍'}
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
  
  document.getElementById('total-budget').textContent = totalPrice.toLocaleString();
  document.getElementById('activity-count').textContent = `${filteredItems.length} Activities`;

  const categoryTotals = filteredItems.reduce((acc, item) => {
    const category = item.tags && item.tags[0] ? item.tags[0] : 'other';
    acc[category] = (acc[category] || 0) + item.price;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
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
  renderWeatherWidget().then(() => {
    renderTimeline();
  });
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
