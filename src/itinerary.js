// ============================================
// STATE
// ============================================

let tripDetails = getTripDetails();

let selectedStart = {
    name: "Kuala Lumpur",
    lat: 3.1390,
    lon: 101.6869
};

let locationCache = [];

// ============================================
// INIT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('start-date').value = tripDetails.startDate || '';
    document.getElementById('end-date').value = tripDetails.endDate || '';

    document.getElementById("selectedStartLocation").textContent =
        selectedStart.name;

    document.getElementById("travelMode")
    .addEventListener("change", () => {
        updateTravelModeUI();
        calculateItineraryCarbon();
    });

    populateCitySelect();
    renderAll();
});

// ============================================
// MAIN RENDER (IMPORTANT FIXED)
// ============================================

function renderAll() {
    updateCityDisplay();
    renderWeatherWidget();
    renderSavedActivityScheduler();
    renderTimeline();
    renderSidebar();
    updateNavbarBadge();
    syncDestinationFromItinerary();
}
function updateTripDates() {
    tripDetails.startDate = document.getElementById("start-date").value;
    tripDetails.endDate = document.getElementById("end-date").value;

    setTripDetails(tripDetails);

    renderSavedActivityScheduler(); // 🔥 THIS updates dropdown
    renderTimeline();
}

// ============================================
// CITY SELECTION
// ============================================

function populateCitySelect() {
    const select = document.getElementById('city-select');

    select.innerHTML =
        '<option value="">Select a destination...</option>' +
        cities.map(city => `
            <option value="${city.id}" ${tripDetails.cityId == city.id ? 'selected' : ''}>
                ${city.emoji} ${city.name}, ${city.country}
            </option>
        `).join('');
}

function selectCity(cityId) {
    if (!cityId) return;

    const city = getCityById(parseInt(cityId));

    tripDetails.city = city.name;
    tripDetails.cityId = city.id;

    setTripDetails(tripDetails);

    renderAll();
}

// ============================================
// START LOCATION SEARCH
// ============================================

async function searchLocation(query) {
    const box = document.getElementById("locationSuggestions");

    if (!query || query.length < 2) {
        box.innerHTML = "";
        return;
    }

    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
    );

    const data = await res.json();
    locationCache = data.results || [];

    box.innerHTML = locationCache.map((loc, index) => `
        <button class="list-group-item list-group-item-action"
            onclick="selectStartLocation(${index})">
            📍 ${loc.name}, ${loc.country}
        </button>
    `).join("");
}

function selectStartLocation(index) {
    const loc = locationCache[index];
    if (!loc) return;

    selectedStart = {
        name: `${loc.name}, ${loc.country}`,
        lat: loc.latitude,
        lon: loc.longitude
    };

    document.getElementById("startLocationInput").value = selectedStart.name;
    document.getElementById("selectedStartLocation").textContent = selectedStart.name;

    document.getElementById("locationSuggestions").innerHTML = "";

    updateAutoDistance();
}

// ============================================
// DISTANCE
// ============================================

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

async function updateAutoDistance() {
    if (!tripDetails.city || !selectedStart.lat) return;

    const destRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${tripDetails.city}&count=1&format=json`
    );

    const destData = await destRes.json();
    if (!destData.results?.length) return;

    const dest = destData.results[0];

    const km = calculateDistance(
        selectedStart.lat,
        selectedStart.lon,
        dest.latitude,
        dest.longitude
    );

    document.getElementById("autoDistance").textContent = km.toFixed(1);
    window.autoTravelDistance = km;
    calculateItineraryCarbon();
}

// ============================================
// WEATHER (RESTORED + FIXED FORECAST)
// ============================================

async function renderWeatherWidget() {
    const start = new Date(tripDetails.startDate);
    const end = new Date(tripDetails.endDate);
    const container = document.getElementById('weather-widget');

    if (!tripDetails.city) {
        container.innerHTML = `
            <div class="p-4 text-muted text-center">
                Select a destination to see weather
            </div>`;
        return;
    }

    try {
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${tripDetails.city}&count=1&format=json`
        );

        const geoData = await geoRes.json();
        if (!geoData.results?.length) return;

        const { latitude, longitude, name } = geoData.results[0];

        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        );

        const weatherData = await weatherRes.json();

        const dates = weatherData.daily.time;
        const maxT = weatherData.daily.temperature_2m_max;
        const minT = weatherData.daily.temperature_2m_min;
        const codes = weatherData.daily.weathercode;

        const getInfo = (code, max) => {
            if ([95,96,99].includes(code)) return { icon:"⛈️", label:"Storm", color:"text-danger" };
            if ([61,63,65].includes(code)) return { icon:"🌧️", label:"Rain", color:"text-primary" };
            if (code === 0 && max >= 32) return { icon:"☀️", label:"Hot", color:"text-warning" };
            if (code === 0) return { icon:"🌤️", label:"Sunny", color:"text-success" };
            return { icon:"⛅", label:"Cloudy", color:"text-muted" };
        };

        const forecast = dates
          .map((d, i) => ({
              date: d,
              max: maxT[i],
              min: minT[i],
              ...getInfo(codes[i], maxT[i])
          }))
          .filter(day => {
              const date = new Date(day.date);
              return date >= start && date <= end;
          });
          if (forecast.length === 0) {
    container.innerHTML = `
        <div class="p-3 text-muted text-center">
            No weather data available for your selected trip dates
        </div>`;
    return;
}
            

        container.innerHTML = `
            <div class="p-3">
                <h5>${name}</h5>
                <div class="row g-2">
                    ${forecast.map((d, i) => `
                        <div class="col-6 col-md-4">
                            <div class="p-2 bg-light rounded text-center">
                                <div class="small text-muted">
                                    ${new Date(d.date).toLocaleDateString()}
                                </div>
                                <div>${d.icon}</div>
                                <div class="${d.color} fw-bold">${d.label}</div>
                                <div>${d.max}° / ${d.min}°</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

    } catch (err) {
        console.error(err);
        container.innerHTML = `<div class="text-danger">Weather failed</div>`;
    }
}

// ============================================
// SAVED ACTIVITIES (RESTORED WORKING LOGIC)
// ============================================

function renderSavedActivityScheduler() {
    const activitySelect = document.getElementById("savedActivitySelect");
    const dateSelect = document.getElementById("activityDateSelect");

    if (!activitySelect || !dateSelect) return;

    const saved = getSavedActivities();
    const dates = getDatesInRange(tripDetails.startDate, tripDetails.endDate);

    const filtered = tripDetails.cityId
        ? saved.filter(i => i.cityId == tripDetails.cityId)
        : [];

    activitySelect.innerHTML =
        filtered.length
            ? `<option value="">Select activity</option>` +
              filtered.map(i => `<option value="${i.id}">${i.emoji} ${i.name}</option>`).join('')
            : `<option>No activities</option>`;

    dateSelect.innerHTML =
        `<option value="">Select date</option>` +
        dates.map((d,i)=>`<option value="${d}">Day ${i+1} - ${d}</option>`).join('');
}

function addSavedActivityToSchedule() {
    const id = Number(document.getElementById("savedActivitySelect").value);
    const date = document.getElementById("activityDateSelect").value;

    const saved = getSavedActivities();
    const activity = saved.find(a => a.id === id);

    const items = getItineraryItems();

    items.push({ ...activity, date });

    setItineraryItems(items);

    renderAll();
}

function moveActivity(id, newDate) {
    if (!newDate) return;

    const items = getItineraryItems();

    const updated = items.map(item => {
        if (item.id === id) {
            return { ...item, date: newDate };
        }
        return item;
    });
    updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    setItineraryItems(updated);

    renderAll();
}


// ============================================
// CARBON CALCULATOR (RESTORED)
// ============================================
function calculateItineraryCarbon() {
  const travelMode = document.getElementById("travelMode")?.value || "flight";
    const flightDistance =
        Number(document.getElementById("flightDistance")?.value) ||
        window.autoTravelDistance ||
        0;

    const flightClass = document.getElementById("flightClass").value;
    const roundTrip = document.getElementById("roundTrip").checked;

    const localDistance = Number(document.getElementById("localDistance").value) || 0;
    const localTransport = document.getElementById("localTransport").value;

    const nights = Number(document.getElementById("nights").value) || 0;
    const accommodationType = document.getElementById("accommodationType").value;
    const activityItems = getItineraryItems().filter(item => item.cityId == tripDetails.cityId);

const activityEmission = activityItems.reduce((sum, item) => {
    return sum + (Number(item.co2) || 0);
}, 0);

    const flightFactors = {
        economy: 0.255,
        premium: 0.382,
        business: 0.739,
        first: 1.019
    };

    const localFactors = {
        walking: 0,
        train: 0.03,
        bus: 0.05,
        electric: 0.053,
        car: 0.21
    };

    const accFactors = {
        eco: 8.2,
        hostel: 5.1,
        budget: 10.2,
        standard: 20.6,
        luxury: 33.4
    };

    let flight = 0;

if (travelMode === "flight") {
    flight = flightDistance * flightFactors[flightClass];
    if (roundTrip) flight *= 2;
}

if (travelMode === "bus") {
    flight = flightDistance * 0.05;
}

if (travelMode === "train") {
    flight = flightDistance * 0.03;
}

if (travelMode === "car") {
    flight = flightDistance * 0.21;
}

    const local = localDistance * (localFactors[localTransport] || 0);
    const acc = nights * (accFactors[accommodationType] || 0);

const total = flight + local + acc + activityEmission;
    document.getElementById("carbonTotal").textContent =
        total.toFixed(1) + " kg CO₂";

   document.getElementById("carbonBreakdown").innerHTML =
    `Trip transport: ${flight.toFixed(1)} kg CO₂<br>
     Local transport: ${local.toFixed(1)} kg CO₂<br>
     Accommodation: ${acc.toFixed(1)} kg CO₂<br>
     Activities: ${activityEmission.toFixed(1)} kg CO₂`;

    document.getElementById("carbonResultBox").style.display = "block";

    localStorage.setItem("carbonEmissions", total.toFixed(1));
    
}
function updateTravelModeUI() {
    const mode = document.getElementById("travelMode").value;
    const flightClass = document.getElementById("flightClass");

    if (!flightClass) return;

    flightClass.disabled = mode !== "flight";
}

// ============================================
// OTHER FUNCTIONS (UNCHANGED)
// ============================================

function renderTimeline() {
    const container = document.getElementById('itinerary-timeline');
    const items = getItineraryItems().filter(item => item.cityId == tripDetails.cityId);

    if (items.length === 0) {
        container.innerHTML = `
            <div class="timeline-placeholder shadow-sm">
                <p class="text-muted italic mb-4">
                    No activities added for ${tripDetails.city || 'your destination'} yet. Save activities from Directory, then add them to your schedule here.
                </p>
                <a href="directory.html" class="browse-btn">Browse Destinations</a>
            </div>`;
        return;
    }

    const dates = getDatesInRange(tripDetails.startDate, tripDetails.endDate);

    container.innerHTML = dates.map((date, idx) => {

        const dayItems = items.filter(i => i.date === date);

        return `
        <div class="timeline-day-v2 mb-4">
            <div class="timeline-dot-v2"></div>

            <div class="d-flex align-items-center mb-3">
                <span class="badge bg-success me-2 py-2 px-3 rounded-pill">
                    Day ${idx + 1}
                </span>
                <span class="text-muted small fw-bold">${date}</span>
            </div>

            <div class="ms-1">
                ${dayItems.length > 0 ? dayItems.map(item => `
                    <div class="card p-3 border-0 shadow-sm rounded-4 mb-2">
                        <div class="d-flex justify-content-between align-items-center">

                            <div class="d-flex align-items-center gap-3">
                                <span class="fs-4">${item.emoji}</span>
                                <h6 class="fw-bold mb-0">${item.name}</h6>

                                <select class="form-select form-select-sm mt-2"
                                    onchange="moveActivity(${item.id}, this.value)">
                                    ${dates.map(d => `
                                        <option value="${d}" ${item.date === d ? 'selected' : ''}>
                                            ${formatDateShort(d)}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                           <button class="btn btn-sm text-danger"
    onclick="removeActivity(${item.id}, '${item.date}')">✕</button>
                        </div>
                    </div>
                `).join('') : `
                    <p class="text-muted small italic ms-2">No activities planned.</p>
                `}
            </div>
        </div>`;
    }).join('');
}

function removeActivity(activityId, activityDate) {
    const items = getItineraryItems();
    const updated = items.filter(item => !(item.id === activityId && item.date === activityDate));
    setItineraryItems(updated);
    renderAll();
}
function renderSidebar() {
    const items = getItineraryItems().filter(item => item.cityId == tripDetails.cityId);

    const totalCost = items.reduce((sum, item) => {
        return sum + (Number(item.price) || 0);
    }, 0);

    document.getElementById("total-budget").textContent = "RM " + totalCost.toLocaleString();
    document.getElementById("activity-count").textContent = items.length + " activities";

    const breakdown = document.getElementById("budget-breakdown");

    if (items.length === 0) {
        breakdown.innerHTML = "Add activities to see breakdown.";
        return;
    }

    breakdown.innerHTML = items.map(item => `
        <div class="d-flex justify-content-between mb-2">
            <span>${item.name}</span>
            <span>RM ${Number(item.price) || 0}</span>
        </div>
    `).join("");
}
function updateCityDisplay() {
    const el = document.getElementById('weather-city-name');
    if (!el) return;

    el.textContent = tripDetails.city || 'Select a city';
}
function syncDestinationFromItinerary() {
    const input = document.getElementById("endLocation");

    if (!input) return;

    if (!tripDetails.city) {
        input.value = "";
        return;
    }

    input.value = tripDetails.city;
}
function attachCarbonListeners() {
    const ids = [
        "flightClass",
        "roundTrip",
        "localTransport",
        "localDistance",
        "accommodationType",
        "nights"
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener("change", calculateItineraryCarbon);
        el.addEventListener("input", calculateItineraryCarbon);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    attachCarbonListeners();
    
});

function removeActivity(activityId, activityDate) {
    let items = getItineraryItems();

    items = items.filter(item => {
        return !(Number(item.id) === Number(activityId) && item.date === activityDate);
    });

    setItineraryItems(items);
    renderAll();
}

function handleResetTrip() {
    const confirmReset = confirm("Are you sure you want to reset the whole itinerary?");
    if (!confirmReset) return;

    localStorage.removeItem("ecotravel-itinerary");

    tripDetails = {
        city: '',
        cityId: null,
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0]
    };

    setTripDetails(tripDetails);

    document.getElementById("start-date").value = tripDetails.startDate;
    document.getElementById("end-date").value = tripDetails.endDate;

    renderAll();
}

