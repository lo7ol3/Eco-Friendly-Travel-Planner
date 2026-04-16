// ============================================
// DATA
// ============================================

const cities = [
  { id: 1, name: 'Cameron Highlands', country: 'Malaysia', emoji: '🌿', tags: ['eco', 'hiking', 'food'], transport: ['bus', 'train'], co2: 18, price: 250, duration: 'weekend', imgBg: '#c8e6d8' },
  { id: 2, name: 'Tioman Island', country: 'Malaysia', emoji: '🏖️', tags: ['beach', 'wildlife', 'eco'], transport: ['bus', 'flight'], co2: 42, price: 400, duration: 'short', imgBg: '#b2dfdb' },
  { id: 3, name: 'Penang', country: 'Malaysia', emoji: '🏛️', tags: ['culture', 'food', 'eco'], transport: ['train', 'bus'], co2: 15, price: 300, duration: 'weekend', imgBg: '#ffe0b2' },
  { id: 4, name: 'Belum Rainforest', country: 'Malaysia', emoji: '🦋', tags: ['wildlife', 'eco', 'hiking'], transport: ['bus'], co2: 22, price: 350, duration: 'short', imgBg: '#dcedc8' },
  { id: 5, name: 'Yogyakarta', country: 'Indonesia', emoji: '🏛️', tags: ['culture', 'food', 'eco'], transport: ['flight', 'train'], co2: 95, price: 600, duration: 'short', imgBg: '#f8bbd0' },
  { id: 6, name: 'Chiang Mai', country: 'Thailand', emoji: '🧘', tags: ['wellness', 'culture', 'eco'], transport: ['flight'], co2: 120, price: 700, duration: 'medium', imgBg: '#e1bee7' },
  { id: 7, name: 'Koh Lanta', country: 'Thailand', emoji: '🏖️', tags: ['beach', 'eco', 'wellness'], transport: ['flight', 'bus'], co2: 140, price: 850, duration: 'short', imgBg: '#b3e5fc' },
  { id: 8, name: 'Pai', country: 'Thailand', emoji: '🌄', tags: ['hiking', 'wellness', 'eco'], transport: ['bus'], co2: 30, price: 450, duration: 'weekend', imgBg: '#f9e4b7' },
  { id: 9, name: 'Ubud', country: 'Indonesia', emoji: '🌿', tags: ['wellness', 'food', 'eco', 'culture'], transport: ['flight'], co2: 110, price: 780, duration: 'medium', imgBg: '#c5e1a5' },
  { id: 10, name: 'Perhentian Islands', country: 'Malaysia', emoji: '🐠', tags: ['beach', 'wildlife'], transport: ['bus'], co2: 28, price: 500, duration: 'short', imgBg: '#80deea' },
  { id: 11, name: 'Singapore', country: 'Singapore', emoji: '🌆', tags: ['culture', 'food'], transport: ['train', 'bus'], co2: 12, price: 900, duration: 'weekend', imgBg: '#cfd8dc' },
  { id: 12, name: 'Kinabalu Park', country: 'Malaysia', emoji: '🏔️', tags: ['hiking', 'wildlife', 'eco'], transport: ['flight', 'bus'], co2: 80, price: 650, duration: 'short', imgBg: '#d7ccc8' },
];

const activities = [
  // Cameron Highlands
  { id: 101, cityId: 1, name: 'BOH Tea Plantation Tour', emoji: '🍵', tags: ['eco', 'food'], price: 30, co2: 2, duration: '2 hours', description: 'Explore the lush tea plantations and learn about sustainable tea production.' },
  { id: 102, cityId: 1, name: 'Mossy Forest Trek', emoji: '🌲', tags: ['hiking', 'eco'], price: 50, co2: 1, duration: '4 hours', description: 'Hike through the mystical mossy cloud forest with a local guide.' },
  { id: 103, cityId: 1, name: 'Strawberry Farm Visit', emoji: '🍓', tags: ['food', 'eco'], price: 20, co2: 1, duration: '1 hour', description: 'Pick fresh strawberries at an organic farm.' },
  { id: 104, cityId: 1, name: 'Butterfly Garden', emoji: '🦋', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '1 hour', description: 'See hundreds of butterfly species in a natural habitat.' },

  // Tioman Island
  { id: 201, cityId: 2, name: 'Coral Reef Snorkeling', emoji: '🤿', tags: ['beach', 'wildlife'], price: 80, co2: 5, duration: '3 hours', description: 'Snorkel in crystal clear waters among vibrant coral reefs.' },
  { id: 202, cityId: 2, name: 'Jungle Waterfall Hike', emoji: '💦', tags: ['hiking', 'eco'], price: 40, co2: 1, duration: '4 hours', description: 'Trek through the jungle to discover hidden waterfalls.' },
  { id: 203, cityId: 2, name: 'Beach Cleanup Volunteer', emoji: '🏖️', tags: ['eco', 'beach'], price: 0, co2: 0, duration: '2 hours', description: 'Join the community in keeping beaches clean.' },
  { id: 204, cityId: 2, name: 'Sea Turtle Conservation', emoji: '🐢', tags: ['wildlife', 'eco'], price: 60, co2: 2, duration: '3 hours', description: 'Learn about and help protect endangered sea turtles.' },

  // Penang
  { id: 301, cityId: 3, name: 'Georgetown Heritage Walk', emoji: '🏛️', tags: ['culture'], price: 25, co2: 0, duration: '3 hours', description: 'Explore the UNESCO World Heritage streets and street art.' },
  { id: 302, cityId: 3, name: 'Penang Hill Funicular', emoji: '🚡', tags: ['eco', 'hiking'], price: 35, co2: 3, duration: '2 hours', description: 'Ride the historic funicular railway to panoramic views.' },
  { id: 303, cityId: 3, name: 'Hawker Food Tour', emoji: '🍜', tags: ['food', 'culture'], price: 50, co2: 2, duration: '3 hours', description: 'Taste authentic local dishes at famous hawker centers.' },
  { id: 304, cityId: 3, name: 'Tropical Spice Garden', emoji: '🌶️', tags: ['eco', 'food'], price: 20, co2: 1, duration: '2 hours', description: 'Discover exotic spices and herbs in a lush garden setting.' },

  // Belum Rainforest
  { id: 401, cityId: 4, name: 'Rainforest Night Safari', emoji: '🦉', tags: ['wildlife', 'eco'], price: 90, co2: 5, duration: '3 hours', description: "Spot nocturnal wildlife in one of the world's oldest rainforests." },
  { id: 402, cityId: 4, name: 'Rafflesia Trek', emoji: '🌺', tags: ['hiking', 'eco'], price: 70, co2: 2, duration: '5 hours', description: "Search for the world's largest flower in its natural habitat." },
  { id: 403, cityId: 4, name: 'Indigenous Village Visit', emoji: '🏘️', tags: ['culture', 'eco'], price: 40, co2: 3, duration: '3 hours', description: 'Learn traditional practices from the Orang Asli community.' },
  { id: 404, cityId: 4, name: 'Lake Cruise', emoji: '🚤', tags: ['eco', 'wildlife'], price: 55, co2: 8, duration: '2 hours', description: 'Cruise the serene lake and spot hornbills and monkeys.' },

  // Yogyakarta
  { id: 501, cityId: 5, name: 'Borobudur Sunrise', emoji: '🌅', tags: ['culture', 'eco'], price: 45, co2: 5, duration: '4 hours', description: 'Watch sunrise over the magnificent ancient Buddhist temple.' },
  { id: 502, cityId: 5, name: 'Batik Workshop', emoji: '🎨', tags: ['culture'], price: 35, co2: 0, duration: '3 hours', description: 'Learn the traditional art of batik fabric making.' },
  { id: 503, cityId: 5, name: 'Prambanan Temple Tour', emoji: '🏛️', tags: ['culture'], price: 30, co2: 3, duration: '3 hours', description: 'Explore the stunning Hindu temple complex.' },
  { id: 504, cityId: 5, name: 'Jomblang Cave Adventure', emoji: '🕳️', tags: ['hiking', 'eco'], price: 80, co2: 6, duration: '4 hours', description: 'Descend into a cave with spectacular light rays.' },

  // Chiang Mai
  { id: 601, cityId: 6, name: 'Elephant Sanctuary Visit', emoji: '🐘', tags: ['wildlife', 'eco'], price: 120, co2: 8, duration: '6 hours', description: 'Ethically interact with rescued elephants in a sanctuary.' },
  { id: 602, cityId: 6, name: 'Doi Suthep Temple', emoji: '⛩️', tags: ['culture'], price: 25, co2: 4, duration: '3 hours', description: 'Visit the sacred temple on the mountain overlooking the city.' },
  { id: 603, cityId: 6, name: 'Thai Cooking Class', emoji: '🍲', tags: ['food', 'culture'], price: 50, co2: 2, duration: '4 hours', description: 'Learn to cook authentic Thai dishes with local ingredients.' },
  { id: 604, cityId: 6, name: 'Meditation Retreat', emoji: '🧘', tags: ['wellness'], price: 60, co2: 0, duration: '1 day', description: 'Experience mindfulness at a peaceful Buddhist monastery.' },

  // Koh Lanta
  { id: 701, cityId: 7, name: 'Kayaking Mangroves', emoji: '🛶', tags: ['eco', 'beach'], price: 45, co2: 0, duration: '3 hours', description: 'Paddle through pristine mangrove forests.' },
  { id: 702, cityId: 7, name: 'Four Islands Tour', emoji: '🏝️', tags: ['beach', 'wildlife'], price: 70, co2: 15, duration: '6 hours', description: 'Visit four stunning islands with snorkeling stops.' },
  { id: 703, cityId: 7, name: 'Beach Yoga Session', emoji: '🧘‍♀️', tags: ['wellness', 'beach'], price: 20, co2: 0, duration: '1 hour', description: 'Practice yoga on the beach at sunset.' },
  { id: 704, cityId: 7, name: 'Old Town Cultural Walk', emoji: '🏘️', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'Explore the charming old fishing village.' },

  // Pai
  { id: 801, cityId: 8, name: 'Pai Canyon Sunset', emoji: '🌄', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Watch sunset from the stunning narrow canyon ridges.' },
  { id: 802, cityId: 8, name: 'Hot Springs Soak', emoji: '♨️', tags: ['wellness'], price: 10, co2: 1, duration: '2 hours', description: 'Relax in natural hot springs surrounded by jungle.' },
  { id: 803, cityId: 8, name: 'Bamboo Rafting', emoji: '🎋', tags: ['eco'], price: 30, co2: 0, duration: '2 hours', description: 'Float down the river on traditional bamboo rafts.' },
  { id: 804, cityId: 8, name: 'Organic Farm Visit', emoji: '🥬', tags: ['food', 'eco'], price: 25, co2: 1, duration: '3 hours', description: 'Tour a sustainable organic farm and enjoy farm-to-table lunch.' },

  // Ubud
  { id: 901, cityId: 9, name: 'Tegallalang Rice Terraces', emoji: '🌾', tags: ['eco', 'culture'], price: 20, co2: 3, duration: '3 hours', description: 'Walk among the iconic cascading rice paddies.' },
  { id: 902, cityId: 9, name: 'Sacred Monkey Forest', emoji: '🐒', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Wander through ancient temples with playful macaques.' },
  { id: 903, cityId: 9, name: 'Balinese Spa Treatment', emoji: '💆', tags: ['wellness'], price: 80, co2: 0, duration: '2 hours', description: 'Indulge in traditional Balinese healing treatments.' },
  { id: 904, cityId: 9, name: 'Traditional Dance Show', emoji: '💃', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: 'Watch mesmerizing Legong and Barong dance performances.' },

  // Perhentian Islands
  { id: 1001, cityId: 10, name: 'Scuba Diving Course', emoji: '🤿', tags: ['beach', 'wildlife'], price: 250, co2: 5, duration: '2 days', description: 'Get certified in crystal clear tropical waters.' },
  { id: 1002, cityId: 10, name: 'Shark Point Snorkeling', emoji: '🦈', tags: ['beach', 'wildlife'], price: 40, co2: 5, duration: '3 hours', description: 'Snorkel with blacktip reef sharks in shallow waters.' },
  { id: 1003, cityId: 10, name: 'Bioluminescent Plankton', emoji: '✨', tags: ['eco', 'beach'], price: 30, co2: 2, duration: '2 hours', description: 'Night swim among glowing plankton.' },
  { id: 1004, cityId: 10, name: 'Island Jungle Trek', emoji: '🌴', tags: ['hiking', 'eco'], price: 25, co2: 0, duration: '3 hours', description: 'Hike across the island through lush jungle trails.' },

  // Singapore
  { id: 1101, cityId: 11, name: 'Gardens by the Bay', emoji: '🌳', tags: ['eco', 'culture'], price: 35, co2: 0, duration: '3 hours', description: 'Explore the futuristic gardens and Supertree Grove.' },
  { id: 1102, cityId: 11, name: 'Hawker Center Food Tour', emoji: '🍜', tags: ['food', 'culture'], price: 60, co2: 2, duration: '3 hours', description: "Taste your way through Singapore's famous hawker stalls." },
  { id: 1103, cityId: 11, name: 'Pulau Ubin Cycling', emoji: '🚴', tags: ['eco'], price: 20, co2: 0, duration: '4 hours', description: 'Cycle through the last kampung village in Singapore.' },
  { id: 1104, cityId: 11, name: 'Chinatown Heritage Tour', emoji: '🏮', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: "Discover the rich history of Singapore's Chinatown." },

  // Kinabalu Park
  { id: 1201, cityId: 12, name: 'Mount Kinabalu Climb', emoji: '🏔️', tags: ['hiking', 'eco'], price: 400, co2: 10, duration: '2 days', description: "Summit Southeast Asia's highest peak." },
  { id: 1202, cityId: 12, name: 'Canopy Walkway', emoji: '🌲', tags: ['eco', 'wildlife'], price: 30, co2: 2, duration: '2 hours', description: 'Walk among the treetops on suspended bridges.' },
  { id: 1203, cityId: 12, name: 'Poring Hot Springs', emoji: '♨️', tags: ['wellness'], price: 25, co2: 3, duration: '2 hours', description: 'Soak in natural hot springs at the foot of the mountain.' },
  { id: 1204, cityId: 12, name: 'Mountain Garden Tour', emoji: '🌸', tags: ['eco'], price: 20, co2: 1, duration: '2 hours', description: 'See rare orchids and pitcher plants in the botanical garden.' },
];

const tagLabels = {
  eco: '🌿 Eco',
  food: '🍃 Food',
  hiking: '🥾 Hiking',
  beach: '🏖️ Beach',
  culture: '🏛️ Culture',
  wildlife: '🦋 Wildlife',
  cycle: '🚴 Cycling',
  wellness: '🧘 Wellness',
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
  FAVORITES: 'ecotravel-favorites'
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

function addToItinerary(activity, cityName, cityId) {
  const items = getItineraryItems();
  const tripDetails = getTripDetails();
  
  // Check if already added
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

// Call on page load
document.addEventListener('DOMContentLoaded', updateNavbarBadge);