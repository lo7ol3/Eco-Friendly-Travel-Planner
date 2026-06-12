// ============================================
// ITINERARY PAGE SPECIFIC CODE
// ============================================

let tripDetails = getTripDetails();
let dropdownOpen = false;
let weatherForecasts = [];
let editingPlanId = null;

// Initialize page
document.addEventListener('DOMContentLoaded', async function () {
  if (typeof loadCities === 'function') {
    await loadCities();
  }

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
  document.addEventListener('click', function (e) {
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
    showConfirmDialog(
      'Clear Itinerary',
      'Are you sure you want to clear your entire itinerary? This cannot be undone.',
      {
        confirmBtnText: 'Clear All',
        confirmBtnClass: 'btn-danger',
        icon: '⚠️',
        onConfirm: executeResetTrip
      }
    );
  } else {
    executeResetTrip();
  }
}

function executeResetTrip() {
  setItineraryItems([]);
  editingPlanId = null;

  const defaults = typeof getDefaultDates === 'function' ? getDefaultDates() : { start: '', end: '' };

  const defaultTrip = {
    city: '',
    cityId: null,
    startDate: defaults.start,
    endDate: defaults.end
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

  } catch (error) {
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
    showNotification('Action Required', 'Please select a destination before saving your itinerary.', 'error');
    return;
  }

  const items = getItineraryItems().filter(item => item.cityId === tripDetails.cityId);
  if (items.length === 0) {
    showNotification('Itinerary Empty', 'Please add at least one activity to your itinerary before saving.', 'error');
    return;
  }

  const defaultTitle = editingPlanId
    ? (getSavedPlans().find(p => p.id === editingPlanId)?.title || `${tripDetails.city} ${tripDetails.startDate || ''}`.trim())
    : `${tripDetails.city} ${tripDetails.startDate || ''}`.trim();

  const titleInput = document.getElementById('itinerary-title-input');
  if (titleInput) {
    titleInput.value = defaultTitle;
  }

  const saveModalTitle = document.querySelector('#saveItineraryModal h3');
  const saveModalBtn = document.querySelector('#saveItineraryModal button.btn-success');
  if (saveModalTitle) {
    saveModalTitle.textContent = editingPlanId ? 'Update Itinerary Plan' : 'Save Itinerary Plan';
  }
  if (saveModalBtn) {
    saveModalBtn.textContent = editingPlanId ? 'Update Plan' : 'Save Plan';
  }

  const modalEl = document.getElementById('saveItineraryModal');
  if (modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeSaveModal() {
  const modalEl = document.getElementById('saveItineraryModal');
  if (modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function confirmSaveItinerary() {
  const titleInput = document.getElementById('itinerary-title-input');
  const title = titleInput ? titleInput.value.trim() : '';
  if (!title) {
    showNotification('Title Required', 'Please enter a title for your plan.', 'error');
    return;
  }

  const items = getItineraryItems().filter(item => item.cityId === tripDetails.cityId);
  const plans = getSavedPlans();

  if (editingPlanId) {
    const planIndex = plans.findIndex(p => p.id === editingPlanId);
    if (planIndex !== -1) {
      plans[planIndex].title = title;
      plans[planIndex].tripDetails = { ...tripDetails };
      plans[planIndex].items = items;
    } else {
      plans.push({
        id: editingPlanId,
        title,
        tripDetails: { ...tripDetails },
        items
      });
    }
  } else {
    const id = Date.now();
    plans.push({
      id,
      title,
      tripDetails: { ...tripDetails },
      items
    });
  }

  setSavedPlans(plans);
  renderSavedPlans();
  closeSaveModal();

  showNotification(
    editingPlanId ? 'Itinerary Updated!' : 'Itinerary Saved!',
    editingPlanId ? 'Your saved itinerary has been updated.' : 'You can now view and load it from the Saved Itinerary tab.',
    'success'
  );
}

function showNotification(title, message, type = 'success') {
  const modalIcon = document.getElementById('notificationModalIcon');
  const modalTitle = document.getElementById('notificationModalTitle');
  const modalMsg = document.getElementById('notificationModalMessage');

  if (modalTitle) modalTitle.textContent = title;
  if (modalMsg) modalMsg.textContent = message;

  if (type === 'error') {
    if (modalIcon) {
      modalIcon.textContent = '⚠️';
      modalIcon.style.display = 'block';
    }
    if (modalTitle) {
      modalTitle.classList.remove('text-success');
      modalTitle.classList.add('text-danger');
    }
  } else {
    if (modalIcon) {
      modalIcon.textContent = '🎉';
      modalIcon.style.display = 'block';
    }
    if (modalTitle) {
      modalTitle.classList.remove('text-danger');
      modalTitle.classList.add('text-success');
    }
  }

  const modalEl = document.getElementById('notificationModal');
  if (modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeNotificationModal() {
  const modalEl = document.getElementById('notificationModal');
  if (modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function showConfirmDialog(title, message, options = {}) {
  const modalEl = document.getElementById('confirmModal');
  const iconEl = document.getElementById('confirmModalIcon');
  const titleEl = document.getElementById('confirmModalTitle');
  const messageEl = document.getElementById('confirmModalMessage');
  const actionBtn = document.getElementById('confirmModalActionBtn');

  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  if (options.icon && iconEl) {
    iconEl.textContent = options.icon;
    iconEl.style.display = 'block';
  } else if (iconEl) {
    iconEl.textContent = '⚠️';
    iconEl.style.display = 'none';
  }

  if (actionBtn) {
    actionBtn.textContent = options.confirmBtnText || 'Confirm';
    actionBtn.className = 'btn btn-sm w-50 py-2 rounded-pill fw-semibold ' + (options.confirmBtnClass || 'btn-danger');

    // Clone button to remove previous event listeners
    const newActionBtn = actionBtn.cloneNode(true);
    actionBtn.parentNode.replaceChild(newActionBtn, actionBtn);

    newActionBtn.addEventListener('click', function () {
      if (typeof options.onConfirm === 'function') {
        options.onConfirm();
      }
      closeConfirmModal();
    });
  }

  if (modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeConfirmModal() {
  const modalEl = document.getElementById('confirmModal');
  if (modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeSaveModal();
    closeNotificationModal();
    closeConfirmModal();
    closeSavedPlanModal();
  }
});

function openSavedPlanForEdit(planId) {
  const plans = getSavedPlans();
  const plan = plans.find(p => p.id === planId);
  if (!plan) {
    showNotification('Not Found', 'The requested plan was not found.', 'error');
    return;
  }

  editingPlanId = planId;

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
    showNotification('Not Found', 'The requested plan was not found.', 'error');
    return;
  }

  const title = plan.title || plan.tripDetails.city || 'Saved Plan';
  document.getElementById('savedPlanModalLabel').textContent = `Activities for ${title}`;
  document.getElementById('savedPlanModalCity').textContent = `${plan.tripDetails.city || 'Unknown destination'} · ${plan.tripDetails.startDate || 'TBD'} to ${plan.tripDetails.endDate || 'TBD'}`;

  const list = document.getElementById('savedPlanActivitiesList');
  if (!Array.isArray(plan.items) || plan.items.length === 0) {
    list.innerHTML = '<p class="p-4 text-center text-muted small bg-light rounded-4 mb-0">No activities saved for this plan.</p>';
  } else {
    list.innerHTML = plan.items.map(item => `
      <div class="p-3 rounded-4 d-flex justify-content-between align-items-center" style="background: #f8f9fa; border: 1px solid rgba(0,0,0,0.04);">
        <div>
          <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">${item.name || item.activity || 'Activity'}</h6>
          <p class="small text-muted mb-0" style="font-size: 0.8rem;">${item.description || item.city || ''}</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge bg-light text-dark border rounded-pill px-3 py-2 fw-semibold" style="font-size: 0.75rem;">
            RM ${Number(item.price || 0).toLocaleString()}
          </span>
          <span class="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 fw-semibold" style="font-size: 0.75rem;">
            ${item.co2 || '0'} kg CO₂
          </span>
        </div>
      </div>
    `).join('');
  }

  const modalEl = document.getElementById('savedPlanModal');
  if (modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeSavedPlanModal() {
  const modalEl = document.getElementById('savedPlanModal');
  if (modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function editSavedPlan(planId) {
  openSavedPlanForEdit(planId);
}

function deleteSavedPlan(planId) {
  showConfirmDialog(
    'Delete Itinerary',
    'Are you sure you want to delete this saved itinerary? This cannot be undone.',
    {
      confirmBtnText: 'Delete',
      confirmBtnClass: 'btn-danger',
      icon: '⚠️',
      onConfirm: function () {
        const plans = getSavedPlans().filter(p => p.id !== planId);
        setSavedPlans(plans);
        renderSavedPlans();
        if (editingPlanId === planId) {
          editingPlanId = null;
        }
        showNotification('Deleted Successfully', 'The saved itinerary has been deleted.', 'success');
      }
    }
  );
}