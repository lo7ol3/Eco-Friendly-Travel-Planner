let tripDetails = getTripDetails();

document.addEventListener('DOMContentLoaded', () => {
    // Initial Load
    document.getElementById('start-date').value = tripDetails.startDate || '';
    document.getElementById('end-date').value = tripDetails.endDate || '';
    
    populateCitySelect();
    renderAll();
});

function renderAll() {
    updateCityDisplay();
    renderWeatherWidget();
    renderTimeline();
    renderSidebar();
    updateNavbarBadge();
}

function populateCitySelect() {
    const select = document.getElementById('city-select');
    select.innerHTML = '<option value="">Select a destination...</option>' + 
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

function updateTripDates() {
    tripDetails.startDate = document.getElementById('start-date').value;
    tripDetails.endDate = document.getElementById('end-date').value;
    setTripDetails(tripDetails);
    renderAll();
}

function updateCityDisplay() {
    document.getElementById('weather-city-name').textContent = tripDetails.city || 'Select a city';
}

async function renderWeatherWidget() {
    const container = document.getElementById('weather-widget');

    if (!tripDetails.city) {
        container.innerHTML = `
            <div class="p-4 bg-white border border-light-subtle rounded-4 text-center small text-muted shadow-sm">
                Select a destination to see weather.
            </div>`;
        return;
    }

    try {
        // STEP 1: Get coordinates from city name
        const geoResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${tripDetails.city}&count=1&language=en&format=json`
        );
        const geoData = await geoResponse.json();

        if (!geoData.results) throw new Error("City not found");

        const { latitude, longitude, name } = geoData.results[0];

        // STEP 2: Get current weather
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();

        const temp = weatherData.current_weather.temperature;
        const wind = weatherData.current_weather.windspeed;

        // STEP 3: Simple eco suggestion
        let advice = "";
        if (temp >= 28) advice = "☀️ Great for outdoor exploration!";
        else if (temp >= 20) advice = "🚲 Perfect for cycling!";
        else advice = "🚶 Ideal for walking tours!";

        // STEP 4: Render UI (your style)
        container.innerHTML = `
            <div class="weather-card-new shadow-sm">
                <div class="me-auto">
                    <div class="d-flex align-items-center">
                        <h2 class="display-5 fw-bold mb-0">${temp}°C</h2>
                        <div class="ms-3 text-start">
                            <div class="fw-bold">Wind ${wind} km/h</div>
                            <div class="small text-muted">${name}</div>
                            <div class="small text-success">${advice}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        container.innerHTML = `
            <div class="p-4 bg-white border border-danger-subtle rounded-4 text-center small text-danger shadow-sm">
                Failed to load weather data.
            </div>`;
        console.error(error);
    }
}

function renderTimeline() {
    const container = document.getElementById('itinerary-timeline');
    const items = getItineraryItems().filter(item => item.cityId == tripDetails.cityId);

    if (items.length === 0) {
        container.innerHTML = `
            <div class="timeline-placeholder shadow-sm">
                <p class="text-muted italic mb-4">No activities added for ${tripDetails.city || 'your destination'} yet. Browse destinations to add activities!</p>
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
                <span class="badge bg-success me-2 py-2 px-3 rounded-pill">Day ${idx + 1}</span>
                <span class="text-muted small fw-bold">${date}</span>
            </div>
            <div class="ms-1">
                ${dayItems.length > 0 ? dayItems.map(item => `
                    <div class="card p-3 border-0 shadow-sm rounded-4 mb-2">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center gap-3">
                                <span class="fs-4">${item.emoji}</span>
                                <h6 class="fw-bold mb-0">${item.name}</h6>
                            </div>
                            <button class="btn btn-sm text-danger" onclick="removeActivity(${item.id})">✕</button>
                        </div>
                    </div>
                `).join('') : `<p class="text-muted small italic ms-2">No activities planned.</p>`}
            </div>
        </div>`;
    }).join('');
}

function renderSidebar() {
    const items = getItineraryItems().filter(item => item.cityId == tripDetails.cityId);
    const totalCO2 = items.reduce((sum, i) => sum + i.co2, 0);
    const totalCost = items.reduce((sum, i) => sum + i.price, 0);

    document.getElementById('total-co2').textContent = totalCO2.toFixed(1);
    document.getElementById('total-budget').textContent = `RM ${totalCost.toLocaleString()}`;
    document.getElementById('activity-count').textContent = `${items.length} activities`;

    const breakdown = document.getElementById('budget-breakdown');
    breakdown.innerHTML = items.length === 0 ? 'Add activities to see your budget breakdown.' : 
        [...new Set(items.map(i => i.tags[0]))].map(cat => {
            const sum = items.filter(i => i.tags[0] === cat).reduce((s, i) => s + i.price, 0);
            return `<div class="d-flex justify-content-between small mb-1">
                <span class="text-muted text-capitalize">${cat}</span>
                <span>RM ${sum}</span>
            </div>`;
        }).join('');
}

function removeActivity(id) {
    removeFromItinerary(id);
    renderAll();
}

function handleResetTrip() {
    if (confirm("Reset everything?")) {
        setItineraryItems([]);
        setTripDetails({ city: '', cityId: null, startDate: '', endDate: '' });
        location.reload();
    }
}

function handleSave() { alert("Itinerary saved locally!"); }
function handleOffset() { alert("Buy offsets clicked!"); }