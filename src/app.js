const cities = [
  { id: 1, name: 'Cameron Highland', country: 'Malaysia', tags: ['eco', 'hiking', 'food'], transport: ['bus', 'train'], co2: 18, price: 250, duration: 'weekend', img_url: 'https://tse2.mm.bing.net/th/id/OIP.La-aCoA-6cNdoO2l4RYqDAHaE6?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 2, name: 'Tioman Island', country: 'Malaysia', tags: ['beach', 'wildlife', 'eco'], transport: ['bus', 'flight'], co2: 42, price: 400, duration: 'short', img_url: 'https://images.squarespace-cdn.com/content/v1/5c9c815e348cd94acf3b352e/6642ac10-961e-4086-a1c0-4c641230c505/Tioman+Panorama+RCM.jpg' },
  { id: 3, name: 'Penang', country: 'Malaysia', tags: ['culture', 'food', 'eco'], transport: ['train', 'bus'], co2: 15, price: 300, duration: 'weekend', img_url: 'https://media-cdn.tripadvisor.com/media/photo-c/1280x250/08/9f/b7/98/photo8jpg.jpg' },
  { id: 4, name: 'Belum Rainforest', country: 'Malaysia', tags: ['wildlife', 'eco', 'hiking'], transport: ['bus'], co2: 22, price: 350, duration: 'short', img_url: 'https://www.fakruljamil.com/wp-content/uploads/2016/07/MG_6272.jpg' },

  { id: 5, name: 'Yogyakarta', country: 'Indonesia', tags: ['culture', 'food', 'eco'], transport: ['flight', 'train'], co2: 95, price: 600, duration: 'short', img_url: 'https://wallpaperaccess.com/full/2043916.jpg' },
  { id: 6, name: 'Chiang Mai', country: 'Thailand', tags: ['wellness', 'culture', 'eco'], transport: ['flight'], co2: 120, price: 700, duration: 'medium', img_url: 'https://tse1.mm.bing.net/th/id/OIP.QJfAIuyYnj5wNLrzWvSGagHaEK?rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id: 7, name: 'Koh Lanta', country: 'Thailand', tags: ['beach', 'eco', 'wellness'], transport: ['flight', 'bus'], co2: 140, price: 850, duration: 'short', img_url: 'https://nemoguides.com/wp-content/uploads/2014/06/Ko-Lanta-marine-park.jpg' },
  { id: 8, name: 'Pai', country: 'Thailand', tags: ['hiking', 'wellness', 'eco'], transport: ['bus'], co2: 30, price: 450, duration: 'weekend', img_url: 'https://visitinghub.org/wp-content/uploads/2025/05/Kho-Ku-So-Bamboo-Bridge-pai-thailande.jpg' },

  { id: 9, name: 'Ubud', country: 'Indonesia', tags: ['wellness', 'food', 'eco', 'culture'], transport: ['flight'], co2: 110, price: 780, duration: 'medium', img_url: 'https://a.cdn-hotels.com/gdcs/production36/d607/83c09225-1a8b-4b82-a31a-4d8319138643.jpg' },

  { id: 10, name: 'Perhentian Island', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['bus'], co2: 28, price: 500, duration: 'short', img_url: 'https://cctravel.dk/wp-content/uploads/2000/01/HFb84c8fd8e14dc55825759e5edcd33c8fHF_1955_perhentian-island.jpg' },
  { id: 11, name: 'Singapore', country: 'Singapore', tags: ['culture', 'food'], transport: ['train', 'bus'], co2: 12, price: 900, duration: 'weekend', img_url: 'https://i.pinimg.com/originals/28/81/54/2881541cb262cfb7658f56697cae471d.jpg' },
  { id: 12, name: 'Kinabalu Park', country: 'Malaysia', tags: ['hiking', 'wildlife', 'eco'], transport: ['flight', 'bus'], co2: 80, price: 650, duration: 'short', img_url: 'https://borneoadventure.com/v3/wp-content/uploads/2016/01/Mt-Kinabalu-feature.jpg' },
  { id: 13, name: 'Langkawi', country: 'Malaysia', tags: ['beach', 'eco', 'culture'], transport: ['flight', 'ferry'], co2: 60, price: 550, duration: 'short', img_url: 'https://a.cdn-hotels.com/gdcs/production113/d1377/9042e2cb-9de0-4aee-8358-f04dedeef6e2.jpg' },
{ id: 14, name: 'Redang Island', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['flight', 'boat'], co2: 70, price: 650, duration: 'short', img_url: 'https://www.holidaygogogo.com/wp-content/uploads/2020/08/3.png' },
{ id: 15, name: 'Taman Negara', country: 'Malaysia', tags: ['wildlife', 'eco', 'hiking'], transport: ['bus'], co2: 35, price: 300, duration: 'medium', img_url: 'https://www.agoda.com/wp-content/uploads/2024/07/canopy-walkway-in-Taman-Negara-National-Park-Malaysia-1.jpg' },
{ id: 16, name: 'Genting Highlands', country: 'Malaysia', tags: ['culture', 'wellness'], transport: ['bus'], co2: 25, price: 200, duration: 'weekend', img_url: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/07/ae/ff/2b.jpg' },
{ id: 17, name: 'Kundasang', country: 'Malaysia', tags: ['hiking', 'eco'], transport: ['flight', 'bus'], co2: 85, price: 500, duration: 'short', img_url: 'https://media.istockphoto.com/id/1326118792/photo/aerial-view-of-kundasang-sabah-landscape-with-cabbage-farm-and-mount-kinabalu-at-far.jpg?s=170667a&w=0&k=20&c=vluhIf2h3g7ZNITWm0fIMmcNMVXb4QB48j2uW1LL3wU=' },

{ id: 18, name: 'Semporna', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['flight'], co2: 90, price: 800, duration: 'short', img_url: 'https://mediaim.expedia.com/destination/1/1fae69e907143c28cc0ea9771f67f041.jpg' },
{ id: 19, name: 'Bako National Park', country: 'Malaysia', tags: ['wildlife', 'eco', 'hiking'], transport: ['flight', 'boat'], co2: 75, price: 450, duration: 'short', img_url: 'https://borneoadventure.com/v3/wp-content/uploads/2012/01/STB-bako-sea-stack-01.jpg' },
{ id: 20, name: 'Sipadan Island', country: 'Malaysia', tags: ['beach', 'wildlife'], transport: ['flight'], co2: 95, price: 1200, duration: 'short', img_url: 'https://s3-cdn.tripfuser.com/blog/wp-content/uploads/2017/04/17201135/Sipadan1a.jpg' },

{ id: 21, name: 'Krabi', country: 'Thailand', tags: ['beach', 'eco'], transport: ['flight'], co2: 130, price: 700, duration: 'short', img_url: 'https://a.cdn-hotels.com/gdcs/production82/d183/f8382092-5689-463d-b693-42331d2eaa66.jpg?impolicy=fcrop&w=1600&h=1066&q=medium' },
{ id: 22, name: 'Bangkok', country: 'Thailand', tags: ['culture', 'food'], transport: ['flight'], co2: 150, price: 600, duration: 'short', img_url: 'https://www.fodors.com/wp-content/uploads/2019/04/HERO_BangkokTips_Hero_shutterstock_367503629.jpg' },

{ id: 23, name: 'Jakarta', country: 'Indonesia', tags: ['culture', 'food'], transport: ['flight'], co2: 140, price: 650, duration: 'short', img_url: 'https://th.bing.com/th/id/R.56bb7119a068c23ec98aab73937ed14a?rik=nOpKRS%2fpLBMVxQ&riu=http%3a%2f%2findonesiaexpat.biz%2fwp-content%2fuploads%2f2018%2f08%2f20208_Jakarta-Indonesia-ThinkstockPhotos-hanafichi.jpg&ehk=J6DXcgIuSUHC%2beyO%2fRCleBoVByoPxj8Kg72mgtOA8Og%3d&risl=&pid=ImgRaw&r=0' },
{ id: 24, name: 'Bali (North)', country: 'Indonesia', tags: ['eco', 'wellness'], transport: ['flight'], co2: 100, price: 800, duration: 'medium', img_url: 'https://tse3.mm.bing.net/th/id/OIP.jEHmJuBQemYfYBpprRE2jQHaEv?rs=1&pid=ImgDetMain&o=7&rm=3' },

{ id: 25, name: 'Hanoi', country: 'Vietnam', tags: ['culture', 'food'], transport: ['flight'], co2: 120, price: 650, duration: 'short', img_url: 'https://cdn.tourradar.com/s3/tour/1500x800/234283_631c9903c20ab.jpg' },
{ id: 26, name: 'Ha Long Bay', country: 'Vietnam', tags: ['eco', 'beach'], transport: ['flight', 'boat'], co2: 110, price: 900, duration: 'short', img_url: 'https://tse1.mm.bing.net/th/id/OIP.rnCR593zXedVAyb6rXy9IQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3' },

{ id: 27, name: 'Luang Prabang', country: 'Laos', tags: ['culture', 'eco'], transport: ['flight'], co2: 90, price: 700, duration: 'short', img_url: 'https://greendiscoverylaos.com/wp-content/uploads/2020/01/highlights-of-luang-prabang-12-1656x1080.jpg' },
{ id: 28, name: 'Siem Reap', country: 'Cambodia', emoji: '🏛️', tags: ['culture', 'eco'], transport: ['flight'], co2: 95, price: 750, duration: 'short', img_url: 'https://www.tripsavvy.com/thmb/74SaLzydFMxwf_uDPZn6TFuRERM=/4856x3237/filters:no_upscale():max_bytes(150000):strip_icc()/sunset-at-angkor-wat--siem-reap--cambodia-640432454-5c327edf46e0fb00016ccb6c.jpg' },

{ id: 29, name: 'Mount Fuji Area', country: 'Japan', emoji: '🗻', tags: ['hiking', 'culture'], transport: ['flight', 'train'], co2: 200, price: 1500, duration: 'medium', imgBg: '#e0e0e0' },
{ id: 30, name: 'Kyoto', country: 'Japan', emoji: '⛩️', tags: ['culture', 'eco'], transport: ['flight', 'train'], co2: 180, price: 1400, duration: 'medium', imgBg: '#f8bbd0' },
{ id: 31, name: 'Sapporo', country: 'Japan', emoji: '❄️', tags: ['food', 'culture', 'wellness'], transport: ['flight', 'train'], co2: 210, price: 1600, duration: 'medium', imgBg: '#e3f2fd' },
  { id: 32, name: 'Nara', country: 'Japan', emoji: '🦌', tags: ['wildlife', 'culture', 'eco'], transport: ['train'], co2: 15, price: 350, duration: 'weekend', imgBg: '#f1f8e9' },
  { id: 33, name: 'Osaka', country: 'Japan', emoji: '🏯', tags: ['food', 'culture'], transport: ['flight', 'train'], co2: 190, price: 1300, duration: 'medium', imgBg: '#fce4ec' },
  { id: 34, name: 'Seoul', country: 'South Korea', emoji: '🇰🇷', tags: ['culture', 'food'], transport: ['flight'], co2: 240, price: 1400, duration: 'medium', imgBg: '#ede7f6' },
  { id: 35, name: 'Jeju Island', country: 'South Korea', emoji: '🌋', tags: ['eco', 'hiking', 'beach'], transport: ['flight'], co2: 260, price: 1200, duration: 'medium', imgBg: '#e0f2f1' },
  { id: 36, name: 'Busan', country: 'South Korea', emoji: '⚓', tags: ['beach', 'food', 'culture'], transport: ['flight', 'train'], co2: 250, price: 1100, duration: 'short', imgBg: '#e0f7fa' },
  { id: 37, name: 'Taipei', country: 'Taiwan', emoji: '🧋', tags: ['food', 'culture', 'hiking'], transport: ['flight'], co2: 160, price: 950, duration: 'short', imgBg: '#fff3e0' },
  { id: 38, name: 'Hualien', country: 'Taiwan', emoji: '⛰️', tags: ['eco', 'hiking', 'wildlife'], transport: ['flight', 'train'], co2: 175, price: 850, duration: 'short', imgBg: '#e8f5e9' },
  { id: 39, name: 'Kaohsiung', country: 'Taiwan', emoji: '🚢', tags: ['culture', 'cycle'], transport: ['flight', 'train'], co2: 180, price: 800, duration: 'weekend', imgBg: '#f9f1f0' },
  { id: 40, name: 'Manila', country: 'Philippines', emoji: '🇵🇭', tags: ['culture', 'food'], transport: ['flight'], co2: 145, price: 700, duration: 'short', imgBg: '#efebe9' },
  { id: 41, name: 'El Nido', country: 'Philippines', emoji: '🏝️', tags: ['beach', 'eco', 'wildlife'], transport: ['flight', 'boat'], co2: 185, price: 1100, duration: 'medium', imgBg: '#b2dfdb' },
  { id: 42, name: 'Boracay', country: 'Philippines', emoji: '🏖️', tags: ['beach', 'wellness'], transport: ['flight', 'boat'], co2: 170, price: 1050, duration: 'short', imgBg: '#e0f7fa' },
  { id: 43, name: 'Ho Chi Minh City', country: 'Vietnam', emoji: '🛵', tags: ['culture', 'food'], transport: ['flight'], co2: 115, price: 580, duration: 'short', imgBg: '#fbe9e7' },
  { id: 44, name: 'Da Nang', country: 'Vietnam', emoji: '🌉', tags: ['beach', 'culture', 'eco'], transport: ['flight'], co2: 125, price: 680, duration: 'short', imgBg: '#e1f5fe' },
  { id: 45, name: 'Hoi An', country: 'Vietnam', emoji: '🏮', tags: ['culture', 'food', 'cycle'], transport: ['flight', 'bus'], co2: 130, price: 600, duration: 'weekend', imgBg: '#fffde7' },
  { id: 46, name: 'Phnom Penh', country: 'Cambodia', emoji: '🛕', tags: ['culture', 'food'], transport: ['flight'], co2: 100, price: 550, duration: 'weekend', imgBg: '#fff9c4' },
  { id: 47, name: 'Vang Vieng', country: 'Laos', emoji: '🧗', tags: ['eco', 'hiking'], transport: ['flight', 'bus'], co2: 105, price: 480, duration: 'short', imgBg: '#f1f8e9' },
  { id: 48, name: 'Phuket', country: 'Thailand', emoji: '🏝️', tags: ['beach', 'food', 'wellness'], transport: ['flight'], co2: 135, price: 850, duration: 'short', imgBg: '#e0f7fa' },
  { id: 49, name: 'Bandung', country: 'Indonesia', emoji: '🌋', tags: ['eco', 'food', 'hiking'], transport: ['flight', 'train'], co2: 125, price: 500, duration: 'weekend', imgBg: '#e8f5e9' },
  { id: 50, name: 'Lombok', country: 'Indonesia', emoji: '🌊', tags: ['beach', 'hiking', 'eco'], transport: ['flight'], co2: 135, price: 820, duration: 'short', imgBg: '#e0f2f1' }



];

const activities = [
  // Cameron Highlands
  { id: 101, cityId: 1, name: 'BOH Tea Plantation Tour', emoji: '🍵', tags: ['eco', 'food'], price: 30, co2: 2, duration: '2 hours', description: 'Explore the lush tea plantations and learn about sustainable tea production.' },
  { id: 102, cityId: 1, name: 'Mossy Forest Trek', emoji: '🌲', tags: ['hiking', 'eco'], price: 50, co2: 1, duration: '4 hours', description: 'Hike through the mystical mossy cloud forest with a local guide.' },
  { id: 103, cityId: 1, name: 'Strawberry Farm Visit', emoji: '🍓', tags: ['food', 'eco'], price: 20, co2: 1, duration: '1 hour', description: 'Pick fresh strawberries at an organic farm.' },
  { id: 104, cityId: 1, name: 'Butterfly Garden', emoji: '🦋', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '1 hour', description: 'See hundreds of butterfly species in a natural habitat.' },
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