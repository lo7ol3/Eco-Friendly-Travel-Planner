// ============================================
// DATA & EMISSION FACTORS (Config)
// ============================================
const EMISSION_FACTORS = {
    flight: { economy: 0.255, premium: 0.382, business: 0.739, first: 1.019 },
    transport: { walking: 0, train: 0.03, bus: 0.05, electric: 0.053, car: 0.21 },
    accommodation: { eco: 8.2, hostel: 5.1, budget: 10.2, standard: 20.6, luxury: 33.4 }
};

const SAVED_TRIP_KEY = "ecotravel-trip";
const SAVED_ITINERARY_KEY = "ecotravel-itinerary";

// Prototype State
let selectedStart = { name: "Kuala Lumpur, Malaysia", lat: 3.1390, lon: 101.6869 };
let locationCache = [];
window.autoTravelDistance = 0;
let currentLoadedPlanId = null;
let pendingPlanId = null;
let activeTripDetails = null;
let activeItineraryItems = [];

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Load saved itinerary data and show the plan to the user
    let tripDetails = getPrototypeTripData();
    let itineraryItems = getSavedItineraryItems();
    activeTripDetails = { ...tripDetails };
    activeItineraryItems = [...itineraryItems];

    populateSavedPlanSection(tripDetails);
    renderSavedPlanOptions(tripDetails);

    // 2. Setup Start Location Search UI
    const startInput = document.getElementById("startLocationInput");
    if (startInput) {
        startInput.value = selectedStart.name;
        startInput.addEventListener("input", (e) => searchLocation(e.target.value));
    }

    const savedPlanSelect = document.getElementById("savedPlanSelect");
    const confirmPlanBtn = document.getElementById("confirmSavedPlanBtn");

    if (savedPlanSelect) {
        savedPlanSelect.addEventListener("change", () => {
            pendingPlanId = savedPlanSelect.value;
            if (!pendingPlanId || pendingPlanId === String(currentLoadedPlanId)) {
                confirmPlanBtn.disabled = true;
                document.getElementById('savedPlanInfo').textContent = 'Selected plan is already loaded or no plan selected.';
                return;
            }
            confirmPlanBtn.disabled = false;
            document.getElementById('savedPlanInfo').innerHTML = 'You have selected a different saved itinerary. Click <strong>Confirm Change</strong> to recalculate distance.';
        });
    }

    if (confirmPlanBtn) {
        confirmPlanBtn.addEventListener("click", async () => {
            const selectedId = savedPlanSelect?.value;
            if (!selectedId) {
                alert('Please select a saved itinerary first.');
                return;
            }

            const plan = getSavedPlanById(selectedId);
            if (!plan) return;

            if (!confirm(`Confirm change to saved itinerary "${plan.title || plan.tripDetails.city}" and recalculate distance?`)) {
                return;
            }

            tripDetails = { ...plan.tripDetails };
            itineraryItems = plan.items || [];
            activeTripDetails = { ...plan.tripDetails };
            activeItineraryItems = [...itineraryItems];
            currentLoadedPlanId = plan.id;
            pendingPlanId = null;

            await syncDistance(plan.tripDetails.city);
            populateSavedPlanSection(plan.tripDetails);
            renderSavedPlanOptions(plan.tripDetails);
            updateCalculations(tripDetails, itineraryItems);
        });
    }

    // 3. Auto-Sync Distance based on the Plan
    if (tripDetails.city) {
        await syncDistance(tripDetails.city);
    }

    // 4. Sync Nights from Plan
    if (tripDetails.startDate && tripDetails.endDate) {
        const start = new Date(tripDetails.startDate);
        const end = new Date(tripDetails.endDate);
        const nights = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
        document.getElementById("nights").value = nights || 1;
    }

    // 5. Attach Listeners for real-time manual updates
    const inputIds = ["travelMode", "flightClass", "roundTrip", "localTransport", "localDistance", "accommodationType", "nights"];
    inputIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", () => updateCalculations(tripDetails, itineraryItems));
            el.addEventListener("input", () => updateCalculations(tripDetails, itineraryItems));
        }
    });

    updateCalculations(tripDetails, itineraryItems);
});

// ============================================
// PROTOTYPE MOCK HELPER
// ============================================
function getSavedTripDetails() {
    try {
        const saved = JSON.parse(localStorage.getItem(SAVED_TRIP_KEY));
        return saved && saved.city ? saved : null;
    } catch {
        return null;
    }
}

function getSavedPlans() {
    try {
        const saved = JSON.parse(localStorage.getItem('ecotravel-saved-plans'));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function getSavedItineraryItems() {
    try {
        const saved = JSON.parse(localStorage.getItem(SAVED_ITINERARY_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function getPrototypeTripData() {
    const saved = getSavedTripDetails();
    if (saved && saved.city) return saved;

    const plans = getSavedPlans();
    return plans[0]?.tripDetails || { city: '', cityId: null, startDate: '', endDate: '' };
}

function renderSavedPlanOptions(activePlan) {
    const select = document.getElementById('savedPlanSelect');
    const info = document.getElementById('savedPlanInfo');
    const confirmButton = document.getElementById('confirmSavedPlanBtn');
    if (!select || !info || !confirmButton) return;

    const plans = getSavedPlans();
    if (plans.length === 0) {
        select.innerHTML = `<option value="">No saved plans</option>`;
        select.disabled = true;
        confirmButton.disabled = true;
        info.textContent = 'No saved itinerary plan found. Save one from the Itinerary page first.';
        return;
    }

    select.disabled = false;
    select.innerHTML = plans.map(plan => {
        const title = plan.title || plan.tripDetails.city || 'Untitled plan';
        return `<option value="${plan.id}">${title} — ${plan.tripDetails.city}</option>`;
    }).join('');

    let selectedPlan = plans[0];

    if (activePlan && activePlan.city) {
        const activePlanMatch = plans.find(plan => plan.tripDetails.city === activePlan.city && plan.tripDetails.startDate === activePlan.startDate);
        if (activePlanMatch) {
            selectedPlan = activePlanMatch;
            select.value = activePlanMatch.id;
            currentLoadedPlanId = activePlanMatch.id;
            confirmButton.disabled = true;
        }
    }

    info.innerHTML = `Saved itinerary ready: <strong>${selectedPlan.title || selectedPlan.tripDetails.city}</strong>`;
}

function getSavedPlanById(planId) {
    const plans = getSavedPlans();
    const plan = plans.find(item => item.id === Number(planId));
    if (!plan) {
        alert('Could not load the selected itinerary plan.');
        return null;
    }

    return plan;
}

// ============================================
// SEARCH & DISTANCE LOGIC
// ============================================
async function searchLocation(query) {
    const box = document.getElementById("locationSuggestions");
    if (!query || query.length < 2) { box.innerHTML = ""; return; }

    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&format=json`);
        const data = await res.json();
        locationCache = data.results || [];

        box.innerHTML = locationCache.map((loc, i) => `
            <button class="list-group-item list-group-item-action" onclick="selectStartLocation(${i})">
                📍 ${loc.name}, ${loc.country}
            </button>`).join("");
    } catch (e) { console.error("Search error:", e); }
}

function selectStartLocation(index) {
    const loc = locationCache[index];
    selectedStart = { name: `${loc.name}, ${loc.country}`, lat: loc.latitude, lon: loc.longitude };
    document.getElementById("startLocationInput").value = selectedStart.name;
    document.getElementById("locationSuggestions").innerHTML = "";

    const tripDetails = activeTripDetails || getPrototypeTripData();
    if (tripDetails.city) syncDistance(tripDetails.city);
}

async function syncDistance(cityName) {
    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&format=json`);
        const data = await res.json();
        
        if (data.results && data.results[0]) {
            const dest = data.results[0];
            const km = haversine(selectedStart.lat, selectedStart.lon, dest.latitude, dest.longitude);
            window.autoTravelDistance = km;
            
            document.getElementById("distanceDisplay").innerHTML = 
                `<i class="bi bi-geo-alt-fill me-2"></i>Destination Plan: <strong>${cityName}</strong> (${km.toFixed(1)} km)`;
            
            const tripDetails = activeTripDetails || getPrototypeTripData();
            const itineraryItems = activeItineraryItems.length ? activeItineraryItems : getSavedItineraryItems();
            updateCalculations(tripDetails, itineraryItems);
        }
    } catch (e) { 
        document.getElementById("distanceDisplay").innerHTML = "Error syncing distance.";
    }
}

// ============================================
// CALCULATIONS
// ============================================
// ============================================
// MAIN CALCULATION ENGINE
// ============================================
function updateCalculations(trip, items) {
    const travelModeEl = document.getElementById("travelMode");
    const mode = travelModeEl.value;
    const flightClassEl = document.getElementById("flightClass");
    
    // 🔥 NEW: Toggle Flight Class based on mode
    if (mode !== "flight") {
        flightClassEl.disabled = true;
        flightClassEl.classList.add("opacity-50"); // Visual cue that it's disabled
    } else {
        flightClassEl.disabled = false;
        flightClassEl.classList.remove("opacity-50");
    }

    const dist = window.autoTravelDistance || 0;
    
    // 1. Trip Transport Calculation
    let transportCO2 = 0;
    if (mode === "flight") {
        const fClass = flightClassEl.value;
        transportCO2 = dist * (EMISSION_FACTORS.flight[fClass] || 0.255);
        if (document.getElementById("roundTrip").checked) transportCO2 *= 2;
    } else {
        // Use standard transport factors for car/train/bus
        transportCO2 = dist * (EMISSION_FACTORS.transport[mode] || 0.21);
    }

    // 2. Local Transport
    const localDist = Number(document.getElementById("localDistance").value) || 0;
    const localMode = document.getElementById("localTransport").value;
    const localCO2 = localDist * (EMISSION_FACTORS.transport[localMode] || 0);

    // 3. Accommodation
    const nights = Number(document.getElementById("nights").value) || 0;
    const accType = document.getElementById("accommodationType").value;
    const accCO2 = nights * (EMISSION_FACTORS.accommodation[accType] || 0);

    // 4. Activity Emissions
    const activityCO2 = items
        .filter(i => i.cityId == trip.cityId)
        .reduce((sum, i) => sum + (Number(i.co2) || 0), 0);

    const total = transportCO2 + localCO2 + accCO2 + activityCO2;

    // UI Updates
    document.getElementById("totalEmissions").textContent = `${total.toFixed(1)} kg CO₂`;
    
    // Updated Breakdown HTML to match the table-style rows
    document.getElementById("carbonBreakdown").innerHTML = `
        <div class="breakdown-row">
            <span class="breakdown-label">Transport Mode</span>
            <span class="breakdown-value">${transportCO2.toFixed(1)} kg</span>
        </div>
        <div class="breakdown-row">
            <span class="breakdown-label">Accommodation</span>
            <span class="breakdown-value">${accCO2.toFixed(1)} kg</span>
        </div>
        <div class="breakdown-row">
            <span class="breakdown-label">Local Transport/Activities</span>
            <span class="breakdown-value">${(localCO2 + activityCO2).toFixed(1)} kg</span>
        </div>
    `;

    localStorage.setItem("carbonEmissions", total.toFixed(1));
}

function populateSavedPlanSection(tripDetails) {
    const info = document.getElementById("savedPlanInfo");
    const confirmBtn = document.getElementById("confirmSavedPlanBtn");

    if (!info || !confirmBtn) return;

    if (tripDetails && tripDetails.city) {
        const startText = tripDetails.startDate ? ` · ${tripDetails.startDate}` : '';
        const endText = tripDetails.endDate ? ` to ${tripDetails.endDate}` : '';
        info.innerHTML = `Saved plan: <strong>${tripDetails.city}</strong>${startText}${endText}`;
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Confirm Change";
    } else {
        info.textContent = "No saved itinerary found. Please save a trip plan from the Itinerary page first.";
        confirmBtn.disabled = true;
        confirmBtn.textContent = "Confirm Change";
        document.getElementById("distanceDisplay").innerHTML = `<i class="bi bi-exclamation-circle me-2"></i>No destination plan selected.`;
    }
}

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)));
}

// ============================================
// NAVIGATION & PERSISTENCE
// ============================================

// Ensure the "Offset This Trip" button works as a trigger
document.addEventListener("DOMContentLoaded", () => {
    const offsetBtn = document.getElementById("calculateBtn");

    if (offsetBtn) {
        offsetBtn.addEventListener("click", function (e) {
            // 1. Prevent default if it's a button, though we changed it to <a>
            // 2. The latest emissions are already being saved to localStorage 
            //    by the updateCalculations() function via your listeners.
            
            // 3. Double check the value exists before leaving
            const currentTotal = document.getElementById("totalEmissions").textContent;
            if (!currentTotal || currentTotal === "0.0 kg") {
                // If for some reason it's 0, run one last calculation
                const tripDetails = getPrototypeTripData();
                const itineraryItems = getSavedItineraryItems();
                updateCalculations(tripDetails, itineraryItems);
            }

            // 4. Navigate (If the HTML is still a <button> and not an <a>)
            window.location.href = "offset-options.html";
        });
    }
});