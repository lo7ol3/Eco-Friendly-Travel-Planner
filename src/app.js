// ============================================
// DATA
// ============================================

const cities = [
  { id: 1, name: 'Cameron Highland', country: 'Malaysia', tags: ['eco', 'hiking', 'food'], transport: ['bus', 'train'], co2: 18, price: 250, duration: 'weekend', img_url: 'https://i.pinimg.com/736x/f4/d5/f9/f4d5f9b876c8a167ab65490baec57859.jpg' },
];

const activities = [
  // Cameron Highlands
  { id: 101, cityId: 1, name: 'BOH Tea Plantation Tour', emoji: '🍵', tags: ['eco', 'food'], price: 30, co2: 2, duration: '2 hours', description: 'Explore the lush tea plantations and learn about sustainable tea production.' },
  { id: 102, cityId: 1, name: 'Mossy Forest Trek', emoji: '🌲', tags: ['hiking', 'eco'], price: 50, co2: 1, duration: '4 hours', description: 'Hike through the mystical mossy cloud forest with a local guide.' },
  { id: 103, cityId: 1, name: 'Strawberry Farm Visit', emoji: '🍓', tags: ['food', 'eco'], price: 20, co2: 1, duration: '1 hour', description: 'Pick fresh strawberries at an organic farm.' },
  { id: 104, cityId: 1, name: 'Butterfly Garden', emoji: '🦋', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '1 hour', description: 'See hundreds of butterfly species in a natural habitat.' },

];

const tagLabels = {
  eco: 'Eco',
  food: 'Food',
  hiking: 'Hiking',
  beach: 'Beach',
  culture: 'Culture',
  wildlife: 'Wildlife',
  cycle: 'Cycling',
  wellness: 'Wellness',
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function getCityById(id) {
  return cities.find(city => city.id === id);
}

function getActivitiesByCity(cityId) {
  return activities.filter(activity => activity.cityId === cityId);
}

function getTagLabel(tag) {
  return tagLabels[tag] || tag;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

function formatDateShort(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDayNumber(startDate, itemDate) {
  const start = new Date(startDate);
  const item = new Date(itemDate);
  const diff = Math.floor((item.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

function getDatesInRange(startDate, endDate) {
  const dates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0]);
  }
  
  return dates;
}

function getCO2Label(co2) {
  if (co2 < 50) return '🟢';
  if (co2 < 150) return '🟡';
  return '🔴';
}

// ============================================
// STATE MANAGEMENT (localStorage)
// ============================================

const STORAGE_KEYS = {
  ITINERARY: 'ecotravel-itinerary',
  TRIP: 'ecotravel-trip',
  FAVORITES: 'ecotravel-favorites',
  SAVED_ACTIVITIES: 'ecotravel-saved-activities',
  SAVED_PLANS: 'ecotravel-saved-plans'
};

function getItineraryItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ITINERARY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setItineraryItems(items) {
  localStorage.setItem(STORAGE_KEYS.ITINERARY, JSON.stringify(items));
}

function getTripDetails() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRIP);
    return stored ? JSON.parse(stored) : {
      city: '',
      cityId: null,
      startDate: '2026-05-10',
      endDate: '2026-05-12'
    };
  } catch {
    return {
      city: '',
      cityId: null,
      lat: null,
      lon: null,
      startDate: '2026-05-10',
      endDate: '2026-05-12'
    };
  }
}

function setTripDetails(details) {
  localStorage.setItem(STORAGE_KEYS.TRIP, JSON.stringify(details));
}

function getFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setFavorites(favorites) {
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
}

function getSavedPlans() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_PLANS);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setSavedPlans(plans) {
  localStorage.setItem(STORAGE_KEYS.SAVED_PLANS, JSON.stringify(plans));
}

function getSavedActivities() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SAVED_ACTIVITIES);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setSavedActivities(items) {
  localStorage.setItem(STORAGE_KEYS.SAVED_ACTIVITIES, JSON.stringify(items));
}

function saveActivity(activity, cityName, cityId) {
  const saved = getSavedActivities();

  if (saved.some(item => item.id === activity.id)) {
    return false;
  }

  saved.push({
    id: activity.id,
    name: activity.name,
    city: cityName,
    cityId: cityId,
    emoji: activity.emoji,
    price: activity.price,
    co2: activity.co2,
    tags: activity.tags
  });

  setSavedActivities(saved);
  return true;
}

function removeSavedActivity(activityId) {
  const saved = getSavedActivities().filter(item => item.id !== activityId);
  setSavedActivities(saved);
}

function isSavedActivity(activityId) {
  return getSavedActivities().some(item => item.id === activityId);
}
function addToItinerary(activity, cityName, cityId) {
  const items = getItineraryItems();
  const tripDetails = getTripDetails();
  
  if (items.some(item => item.id === activity.id)) {
    return false;
  }
  
  const newItem = {
    id: activity.id,
    name: activity.name,
    city: cityName,
    cityId: cityId,
    emoji: activity.emoji,
    price: activity.price,
    co2: activity.co2,
    tags: activity.tags,
    date: tripDetails.startDate
  };
  
  items.push(newItem);
  setItineraryItems(items);
  return true;
}

function removeFromItinerary(activityId) {
  const items = getItineraryItems();
  const filtered = items.filter(item => item.id !== activityId);
  setItineraryItems(filtered);
}

function updateItemDate(activityId, newDate) {
  const items = getItineraryItems();
  const updated = items.map(item => 
    item.id === activityId ? { ...item, date: newDate } : item
  );
  setItineraryItems(updated);
}

function isInItinerary(activityId) {
  const items = getItineraryItems();
  return items.some(item => item.id === activityId);
}

function toggleFavorite(cityId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(cityId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(cityId);
  }
  
  setFavorites(favorites);
  return favorites.includes(cityId);
}

function isFavorite(cityId) {
  const favorites = getFavorites();
  return favorites.includes(cityId);
}

// ============================================
// WEATHER (Simulated)
// ============================================

function getWeatherForDate(dateStr) {
  const date = new Date(dateStr);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayOfMonth = date.getDate();
  
  const weatherPatterns = [
    { icon: 'sun', temp: 28, condition: 'Sunny' },
    { icon: 'cloud-sun', temp: 27, condition: 'Partly Cloudy' },
    { icon: 'cloud', temp: 26, condition: 'Cloudy' },
    { icon: 'cloud-rain', temp: 25, condition: 'Light Rain' },
  ];
  
  const pattern = weatherPatterns[dayOfMonth % weatherPatterns.length];
  return { ...pattern, day: dayOfWeek, date: dateStr };
}

function getWeatherIcon(type) {
  const icons = {
    'sun': '<svg class="icon icon-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    'cloud-sun': '<svg class="icon icon-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg>',
    'cloud': '<svg class="icon icon-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    'cloud-rain': '<svg class="icon icon-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>'
  };
  return icons[type] || icons['sun'];
}

// ============================================
// NAVBAR UPDATE
// ============================================

function updateNavbarBadge() {
  const items = getItineraryItems();
  const badge = document.getElementById('itinerary-badge');
  if (badge) {
    if (items.length > 0) {
      badge.textContent = items.length;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }
}

async function getCityCoordinates(cityName) {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&format=json`
    );
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }

    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
        name: data.results[0].name
    };
}

document.addEventListener('DOMContentLoaded', updateNavbarBadge);

// ============================================
// IMPORT DATA FROM /data FOLDER
// ============================================

// import { cities } from './data/cities.js';
// import { activities } from './data/activities.js';
// import { tagLabels } from './data/tagLabels.js';


// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// function getCityById(id) {
//   return cities.find(city => city.id === id);
// }

// function getActivitiesByCity(cityId) {
//   return activities.filter(activity => activity.cityId === cityId);
// }

// function getTagLabel(tag) {
//   return tagLabels[tag] || tag;
// }

// function formatDate(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('en-US', {
//     weekday: 'long',
//     month: 'long',
//     day: 'numeric',
//     year: 'numeric'
//   });
// }

// function formatDateShort(dateStr) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric'
//   });
// }

// function getDayNumber(startDate, itemDate) {
//   const start = new Date(startDate);
//   const item = new Date(itemDate);
//   return Math.floor((item - start) / (1000 * 60 * 60 * 24)) + 1;
// }

// function getDatesInRange(startDate, endDate) {
//   const dates = [];
//   const start = new Date(startDate);
//   const end = new Date(endDate);

//   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     dates.push(d.toISOString().split('T')[0]);
//   }

//   return dates;
// }

// function getCO2Label(co2) {
//   if (co2 < 50) return '🟢';
//   if (co2 < 150) return '🟡';
//   return '🔴';
// }


// // ============================================
// // STATE MANAGEMENT (localStorage)
// // ============================================

// const STORAGE_KEYS = {
//   ITINERARY: 'ecotravel-itinerary',
//   TRIP: 'ecotravel-trip',
//   FAVORITES: 'ecotravel-favorites',
//   SAVED_ACTIVITIES: 'ecotravel-saved-activities',
//   SAVED_PLANS: 'ecotravel-saved-plans'
// };

// // --- (all your storage functions stay EXACTLY the same) ---
// // I did NOT rewrite them to keep your logic safe


// // ============================================
// // WEATHER (Simulated)
// // ============================================

// function getWeatherForDate(dateStr) {
//   const date = new Date(dateStr);
//   const dayOfMonth = date.getDate();

//   const weatherPatterns = [
//     { icon: 'sun', temp: 28, condition: 'Sunny' },
//     { icon: 'cloud-sun', temp: 27, condition: 'Partly Cloudy' },
//     { icon: 'cloud', temp: 26, condition: 'Cloudy' },
//     { icon: 'cloud-rain', temp: 25, condition: 'Light Rain' },
//   ];

//   const pattern = weatherPatterns[dayOfMonth % weatherPatterns.length];

//   return {
//     ...pattern,
//     day: date.toLocaleDateString('en-US', { weekday: 'short' }),
//     date: dateStr
//   };
// }

// function getWeatherIcon(type) {
//   const icons = {
//     sun: '☀️',
//     'cloud-sun': '⛅',
//     cloud: '☁️',
//     'cloud-rain': '🌧️'
//   };

//   return icons[type] || '☀️';
// }


// // ============================================
// // NAVBAR UPDATE
// // ============================================

// function updateNavbarBadge() {
//   const items = getItineraryItems();
//   const badge = document.getElementById('itinerary-badge');

//   if (!badge) return;

//   badge.textContent = items.length;

//   if (items.length > 0) {
//     badge.classList.remove('hidden');
//   } else {
//     badge.classList.add('hidden');
//   }
// }

// document.addEventListener('DOMContentLoaded', updateNavbarBadge);


// // ============================================
// // API (unchanged)
// // ============================================

// export async function getCityCoordinates(cityName) {
//   const res = await fetch(
//     `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&format=json`
//   );

//   const data = await res.json();

//   if (!data.results?.length) {
//     throw new Error("City not found");
//   }

//   return {
//     lat: data.results[0].latitude,
//     lon: data.results[0].longitude,
//     name: data.results[0].name
//   };
// }