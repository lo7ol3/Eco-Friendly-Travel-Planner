const cities = [
  { id: 1, name: 'Cameron Highland', country: 'Malaysia', emoji: '🌿', tags: ['eco', 'hiking', 'food'], transport: ['bus', 'train'], co2: 18, price: 250, duration: 'weekend', imgBg: '#c8e6d8' },
  { id: 2, name: 'Tioman Island', country: 'Malaysia', emoji: '🏖️', tags: ['beach', 'wildlife', 'eco'], transport: ['bus', 'flight'], co2: 42, price: 400, duration: 'short', imgBg: '#b2dfdb' },
  { id: 3, name: 'Penang', country: 'Malaysia', emoji: '🏛️', tags: ['culture', 'food', 'eco'], transport: ['train', 'bus'], co2: 15, price: 300, duration: 'weekend', imgBg: '#ffe0b2' },
  { id: 4, name: 'Belum Rainforest', country: 'Malaysia', emoji: '🦋', tags: ['wildlife', 'eco', 'hiking'], transport: ['bus'], co2: 22, price: 350, duration: 'short', imgBg: '#dcedc8' },

  { id: 5, name: 'Yogyakarta', country: 'Indonesia', emoji: '🏛️', tags: ['culture', 'food', 'eco'], transport: ['flight', 'train'], co2: 95, price: 600, duration: 'short', imgBg: '#f8bbd0' },
  { id: 6, name: 'Chiang Mai', country: 'Thailand', emoji: '🧘', tags: ['wellness', 'culture', 'eco'], transport: ['flight'], co2: 120, price: 700, duration: 'medium', imgBg: '#e1bee7' },
  { id: 7, name: 'Koh Lanta', country: 'Thailand', emoji: '🏖️', tags: ['beach', 'eco', 'wellness'], transport: ['flight', 'bus'], co2: 140, price: 850, duration: 'short', imgBg: '#b3e5fc' },
  { id: 8, name: 'Pai', country: 'Thailand', emoji: '🌄', tags: ['hiking', 'wellness', 'eco'], transport: ['bus'], co2: 30, price: 450, duration: 'weekend', imgBg: '#f9e4b7' },

  { id: 9, name: 'Ubud', country: 'Indonesia', emoji: '🌿', tags: ['wellness', 'food', 'eco', 'culture'], transport: ['flight'], co2: 110, price: 780, duration: 'medium', imgBg: '#c5e1a5' },

  { id: 10, name: 'Perhentian Island', country: 'Malaysia', emoji: '🐠', tags: ['beach', 'wildlife'], transport: ['bus'], co2: 28, price: 500, duration: 'short', imgBg: '#80deea' },
  { id: 11, name: 'Singapore', country: 'Singapore', emoji: '🌆', tags: ['culture', 'food'], transport: ['train', 'bus'], co2: 12, price: 900, duration: 'weekend', imgBg: '#cfd8dc' },
  { id: 12, name: 'Kinabalu Park', country: 'Malaysia', emoji: '🏔️', tags: ['hiking', 'wildlife', 'eco'], transport: ['flight', 'bus'], co2: 80, price: 650, duration: 'short', imgBg: '#d7ccc8' },
  { id: 13, name: 'Langkawi', country: 'Malaysia', emoji: '🏝️', tags: ['beach', 'eco', 'culture'], transport: ['flight', 'ferry'], co2: 60, price: 550, duration: 'short', imgBg: '#b2ebf2' },
{ id: 14, name: 'Redang Island', country: 'Malaysia', emoji: '🐠', tags: ['beach', 'wildlife'], transport: ['flight', 'boat'], co2: 70, price: 650, duration: 'short', imgBg: '#80deea' },
{ id: 15, name: 'Taman Negara', country: 'Malaysia', emoji: '🌳', tags: ['wildlife', 'eco', 'hiking'], transport: ['bus'], co2: 35, price: 300, duration: 'medium', imgBg: '#c5e1a5' },
{ id: 16, name: 'Genting Highlands', country: 'Malaysia', emoji: '🎡', tags: ['culture', 'wellness'], transport: ['bus'], co2: 25, price: 200, duration: 'weekend', imgBg: '#d1c4e9' },
{ id: 17, name: 'Kundasang', country: 'Malaysia', emoji: '🏔️', tags: ['hiking', 'eco'], transport: ['flight', 'bus'], co2: 85, price: 500, duration: 'short', imgBg: '#d7ccc8' },

{ id: 18, name: 'Semporna', country: 'Malaysia', emoji: '🌊', tags: ['beach', 'wildlife'], transport: ['flight'], co2: 90, price: 800, duration: 'short', imgBg: '#4dd0e1' },
{ id: 19, name: 'Bako National Park', country: 'Malaysia', emoji: '🦧', tags: ['wildlife', 'eco', 'hiking'], transport: ['flight', 'boat'], co2: 75, price: 450, duration: 'short', imgBg: '#aed581' },
{ id: 20, name: 'Sipadan Island', country: 'Malaysia', emoji: '🤿', tags: ['beach', 'wildlife'], transport: ['flight'], co2: 95, price: 1200, duration: 'short', imgBg: '#00bcd4' },

{ id: 21, name: 'Krabi', country: 'Thailand', emoji: '⛰️', tags: ['beach', 'eco'], transport: ['flight'], co2: 130, price: 700, duration: 'short', imgBg: '#b3e5fc' },
{ id: 22, name: 'Bangkok', country: 'Thailand', emoji: '🏙️', tags: ['culture', 'food'], transport: ['flight'], co2: 150, price: 600, duration: 'short', imgBg: '#cfd8dc' },

{ id: 23, name: 'Jakarta', country: 'Indonesia', emoji: '🌆', tags: ['culture', 'food'], transport: ['flight'], co2: 140, price: 650, duration: 'short', imgBg: '#ffccbc' },
{ id: 24, name: 'Bali (North)', country: 'Indonesia', emoji: '🌿', tags: ['eco', 'wellness'], transport: ['flight'], co2: 100, price: 800, duration: 'medium', imgBg: '#c8e6c9' },

{ id: 25, name: 'Hanoi', country: 'Vietnam', emoji: '🏮', tags: ['culture', 'food'], transport: ['flight'], co2: 120, price: 650, duration: 'short', imgBg: '#ffe0b2' },
{ id: 26, name: 'Ha Long Bay', country: 'Vietnam', emoji: '🛶', tags: ['eco', 'beach'], transport: ['flight', 'boat'], co2: 110, price: 900, duration: 'short', imgBg: '#81d4fa' },

{ id: 27, name: 'Luang Prabang', country: 'Laos', emoji: '🏯', tags: ['culture', 'eco'], transport: ['flight'], co2: 90, price: 700, duration: 'short', imgBg: '#d7ccc8' },
{ id: 28, name: 'Siem Reap', country: 'Cambodia', emoji: '🏛️', tags: ['culture', 'eco'], transport: ['flight'], co2: 95, price: 750, duration: 'short', imgBg: '#ffe082' },

{ id: 29, name: 'Mount Fuji Area', country: 'Japan', emoji: '🗻', tags: ['hiking', 'culture'], transport: ['flight', 'train'], co2: 200, price: 1500, duration: 'medium', imgBg: '#e0e0e0' },
{ id: 30, name: 'Kyoto', country: 'Japan', emoji: '⛩️', tags: ['culture', 'eco'], transport: ['flight', 'train'], co2: 180, price: 1400, duration: 'medium', imgBg: '#f8bbd0' },
];

export default cities;