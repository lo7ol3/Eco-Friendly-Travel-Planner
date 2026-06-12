const cities = [
  { id: 1, name: 'Cameron Highland', country: 'Malaysia', emoji: '🌿', tags: ['eco', 'hiking', 'food'], transport: ['bus', 'train'], co2: 18, price: 250, duration: 'weekend', imgBg: 'https://www.bing.com/images/search?view=detailV2&ccid=La%2baCoA%2b&id=81A961A7FCB8B425D79A83CD9C5ADE1B3E45CBB2&thid=OIP.La-aCoA-6cNdoO2l4RYqDAHaE6&mediaurl=https%3a%2f%2fwww.roadaffair.com%2fwp-content%2fuploads%2f2018%2f09%2ftea-plantation-cameron-highlands-malaysia-shutterstock_75001801.jpg&exph=996&expw=1500&q=cameron+highlands&FORM=IRPRST&ck=078A8422EEFF5E101FD2B5995F258D71&selectedIndex=1&itb=0' },
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

export default cities;