const activities = [
  { id: 101, cityId: 1, name: 'BOH Tea Plantation Tour', emoji: '🍵', tags: ['eco', 'food'], price: 30, co2: 2, duration: '2 hours', description: 'Explore the lush tea plantations and learn about sustainable tea production.' },
  { id: 102, cityId: 1, name: 'Mossy Forest Trek', emoji: '🌲', tags: ['hiking', 'eco'], price: 50, co2: 1, duration: '4 hours', description: 'Hike through the mystical mossy cloud forest with a local guide.' },
  { id: 103, cityId: 1, name: 'Strawberry Farm Visit', emoji: '🍓', tags: ['food', 'eco'], price: 20, co2: 1, duration: '1 hour', description: 'Pick fresh strawberries at an organic farm.' },
  { id: 104, cityId: 1, name: 'Butterfly Garden', emoji: '🦋', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '1 hour', description: 'See hundreds of butterfly species in a natural habitat.' },

//   { id: 201, cityId: 2, name: 'Coral Reef Snorkeling', emoji: '🤿', tags: ['beach', 'wildlife'], price: 80, co2: 5, duration: '3 hours', description: 'Snorkel in crystal clear waters among vibrant coral reefs.' },
//   { id: 202, cityId: 2, name: 'Jungle Waterfall Hike', emoji: '💦', tags: ['hiking', 'eco'], price: 40, co2: 1, duration: '4 hours', description: 'Trek through the jungle to discover hidden waterfalls.' },
//   { id: 203, cityId: 2, name: 'Beach Cleanup Volunteer', emoji: '🏖️', tags: ['eco', 'beach'], price: 0, co2: 0, duration: '2 hours', description: 'Join the community in keeping beaches clean.' },
//   { id: 204, cityId: 2, name: 'Sea Turtle Conservation', emoji: '🐢', tags: ['wildlife', 'eco'], price: 60, co2: 2, duration: '3 hours', description: 'Learn about and help protect endangered sea turtles.' },

//   // Penang
//   { id: 301, cityId: 3, name: 'Georgetown Heritage Walk', emoji: '🏛️', tags: ['culture'], price: 25, co2: 0, duration: '3 hours', description: 'Explore the UNESCO World Heritage streets and street art.' },
//   { id: 302, cityId: 3, name: 'Penang Hill Funicular', emoji: '🚡', tags: ['eco', 'hiking'], price: 35, co2: 3, duration: '2 hours', description: 'Ride the historic funicular railway to panoramic views.' },
//   { id: 303, cityId: 3, name: 'Hawker Food Tour', emoji: '🍜', tags: ['food', 'culture'], price: 50, co2: 2, duration: '3 hours', description: 'Taste authentic local dishes at famous hawker centers.' },
//   { id: 304, cityId: 3, name: 'Tropical Spice Garden', emoji: '🌶️', tags: ['eco', 'food'], price: 20, co2: 1, duration: '2 hours', description: 'Discover exotic spices and herbs in a lush garden setting.' },

//   // Belum Rainforest
//   { id: 401, cityId: 4, name: 'Rainforest Night Safari', emoji: '🦉', tags: ['wildlife', 'eco'], price: 90, co2: 5, duration: '3 hours', description: "Spot nocturnal wildlife in one of the world's oldest rainforests." },
//   { id: 402, cityId: 4, name: 'Rafflesia Trek', emoji: '🌺', tags: ['hiking', 'eco'], price: 70, co2: 2, duration: '5 hours', description: "Search for the world's largest flower in its natural habitat." },
//   { id: 403, cityId: 4, name: 'Indigenous Village Visit', emoji: '🏘️', tags: ['culture', 'eco'], price: 40, co2: 3, duration: '3 hours', description: 'Learn traditional practices from the Orang Asli community.' },
//   { id: 404, cityId: 4, name: 'Lake Cruise', emoji: '🚤', tags: ['eco', 'wildlife'], price: 55, co2: 8, duration: '2 hours', description: 'Cruise the serene lake and spot hornbills and monkeys.' },

//   // Yogyakarta
//   { id: 501, cityId: 5, name: 'Borobudur Sunrise', emoji: '🌅', tags: ['culture', 'eco'], price: 45, co2: 5, duration: '4 hours', description: 'Watch sunrise over the magnificent ancient Buddhist temple.' },
//   { id: 502, cityId: 5, name: 'Batik Workshop', emoji: '🎨', tags: ['culture'], price: 35, co2: 0, duration: '3 hours', description: 'Learn the traditional art of batik fabric making.' },
//   { id: 503, cityId: 5, name: 'Prambanan Temple Tour', emoji: '🏛️', tags: ['culture'], price: 30, co2: 3, duration: '3 hours', description: 'Explore the stunning Hindu temple complex.' },
//   { id: 504, cityId: 5, name: 'Jomblang Cave Adventure', emoji: '🕳️', tags: ['hiking', 'eco'], price: 80, co2: 6, duration: '4 hours', description: 'Descend into a cave with spectacular light rays.' },

//   // Chiang Mai
//   { id: 601, cityId: 6, name: 'Elephant Sanctuary Visit', emoji: '🐘', tags: ['wildlife', 'eco'], price: 120, co2: 8, duration: '6 hours', description: 'Ethically interact with rescued elephants in a sanctuary.' },
//   { id: 602, cityId: 6, name: 'Doi Suthep Temple', emoji: '⛩️', tags: ['culture'], price: 25, co2: 4, duration: '3 hours', description: 'Visit the sacred temple on the mountain overlooking the city.' },
//   { id: 603, cityId: 6, name: 'Thai Cooking Class', emoji: '🍲', tags: ['food', 'culture'], price: 50, co2: 2, duration: '4 hours', description: 'Learn to cook authentic Thai dishes with local ingredients.' },
//   { id: 604, cityId: 6, name: 'Meditation Retreat', emoji: '🧘', tags: ['wellness'], price: 60, co2: 0, duration: '1 day', description: 'Experience mindfulness at a peaceful Buddhist monastery.' },

//   // Koh Lanta
//   { id: 701, cityId: 7, name: 'Kayaking Mangroves', emoji: '🛶', tags: ['eco', 'beach'], price: 45, co2: 0, duration: '3 hours', description: 'Paddle through pristine mangrove forests.' },
//   { id: 702, cityId: 7, name: 'Four Islands Tour', emoji: '🏝️', tags: ['beach', 'wildlife'], price: 70, co2: 15, duration: '6 hours', description: 'Visit four stunning islands with snorkeling stops.' },
//   { id: 703, cityId: 7, name: 'Beach Yoga Session', emoji: '🧘‍♀️', tags: ['wellness', 'beach'], price: 20, co2: 0, duration: '1 hour', description: 'Practice yoga on the beach at sunset.' },
//   { id: 704, cityId: 7, name: 'Old Town Cultural Walk', emoji: '🏘️', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'Explore the charming old fishing village.' },

//   // Pai
//   { id: 801, cityId: 8, name: 'Pai Canyon Sunset', emoji: '🌄', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Watch sunset from the stunning narrow canyon ridges.' },
//   { id: 802, cityId: 8, name: 'Hot Springs Soak', emoji: '♨️', tags: ['wellness'], price: 10, co2: 1, duration: '2 hours', description: 'Relax in natural hot springs surrounded by jungle.' },
//   { id: 803, cityId: 8, name: 'Bamboo Rafting', emoji: '🎋', tags: ['eco'], price: 30, co2: 0, duration: '2 hours', description: 'Float down the river on traditional bamboo rafts.' },
//   { id: 804, cityId: 8, name: 'Organic Farm Visit', emoji: '🥬', tags: ['food', 'eco'], price: 25, co2: 1, duration: '3 hours', description: 'Tour a sustainable organic farm and enjoy farm-to-table lunch.' },

//   // Ubud
//   { id: 901, cityId: 9, name: 'Tegallalang Rice Terraces', emoji: '🌾', tags: ['eco', 'culture'], price: 20, co2: 3, duration: '3 hours', description: 'Walk among the iconic cascading rice paddies.' },
//   { id: 902, cityId: 9, name: 'Sacred Monkey Forest', emoji: '🐒', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Wander through ancient temples with playful macaques.' },
//   { id: 903, cityId: 9, name: 'Balinese Spa Treatment', emoji: '💆', tags: ['wellness'], price: 80, co2: 0, duration: '2 hours', description: 'Indulge in traditional Balinese healing treatments.' },
//   { id: 904, cityId: 9, name: 'Traditional Dance Show', emoji: '💃', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: 'Watch mesmerizing Legong and Barong dance performances.' },

//   // Perhentian Islands
//   { id: 1001, cityId: 10, name: 'Scuba Diving Course', emoji: '🤿', tags: ['beach', 'wildlife'], price: 250, co2: 5, duration: '2 days', description: 'Get certified in crystal clear tropical waters.' },
//   { id: 1002, cityId: 10, name: 'Shark Point Snorkeling', emoji: '🦈', tags: ['beach', 'wildlife'], price: 40, co2: 5, duration: '3 hours', description: 'Snorkel with blacktip reef sharks in shallow waters.' },
//   { id: 1003, cityId: 10, name: 'Bioluminescent Plankton', emoji: '✨', tags: ['eco', 'beach'], price: 30, co2: 2, duration: '2 hours', description: 'Night swim among glowing plankton.' },
//   { id: 1004, cityId: 10, name: 'Island Jungle Trek', emoji: '🌴', tags: ['hiking', 'eco'], price: 25, co2: 0, duration: '3 hours', description: 'Hike across the island through lush jungle trails.' },

//   // Singapore
//   { id: 1101, cityId: 11, name: 'Gardens by the Bay', emoji: '🌳', tags: ['eco', 'culture'], price: 35, co2: 0, duration: '3 hours', description: 'Explore the futuristic gardens and Supertree Grove.' },
//   { id: 1102, cityId: 11, name: 'Hawker Center Food Tour', emoji: '🍜', tags: ['food', 'culture'], price: 60, co2: 2, duration: '3 hours', description: "Taste your way through Singapore's famous hawker stalls." },
//   { id: 1103, cityId: 11, name: 'Pulau Ubin Cycling', emoji: '🚴', tags: ['eco'], price: 20, co2: 0, duration: '4 hours', description: 'Cycle through the last kampung village in Singapore.' },
//   { id: 1104, cityId: 11, name: 'Chinatown Heritage Tour', emoji: '🏮', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: "Discover the rich history of Singapore's Chinatown." },

//   // Kinabalu Park
//   { id: 1201, cityId: 12, name: 'Mount Kinabalu Climb', emoji: '🏔️', tags: ['hiking', 'eco'], price: 400, co2: 10, duration: '2 days', description: "Summit Southeast Asia's highest peak." },
//   { id: 1202, cityId: 12, name: 'Canopy Walkway', emoji: '🌲', tags: ['eco', 'wildlife'], price: 30, co2: 2, duration: '2 hours', description: 'Walk among the treetops on suspended bridges.' },
//   { id: 1203, cityId: 12, name: 'Poring Hot Springs', emoji: '♨️', tags: ['wellness'], price: 25, co2: 3, duration: '2 hours', description: 'Soak in natural hot springs at the foot of the mountain.' },
//   { id: 1204, cityId: 12, name: 'Mountain Garden Tour', emoji: '🌸', tags: ['eco'], price: 20, co2: 1, duration: '2 hours', description: 'See rare orchids and pitcher plants in the botanical garden.' },

//   //Langkawi
//   { id: 1301, cityId: 13, name: 'Sky Bridge Walk', emoji: '🌉', tags: ['eco', 'culture'], price: 40, co2: 2, duration: '2 hours', description: 'Walk across the iconic curved sky bridge with panoramic views.' },
//   { id: 1302, cityId: 13, name: 'Island Hopping Tour', emoji: '🚤', tags: ['beach'], price: 70, co2: 8, duration: '4 hours', description: 'Explore nearby islands with crystal clear waters.' },
//   { id: 1303, cityId: 13, name: 'Mangrove Safari', emoji: '🦅', tags: ['eco', 'wildlife'], price: 55, co2: 3, duration: '3 hours', description: 'Cruise through mangroves and spot eagles and wildlife.' },
//   { id: 1304, cityId: 13, name: 'Cable Car Ride', emoji: '🚡', tags: ['eco'], price: 35, co2: 3, duration: '1 hour', description: 'Ride up Gunung Mat Cincang for stunning views.' },

//   //Redang Island
//   { id: 1401, cityId: 14, name: 'Snorkeling Coral Reef', emoji: '🤿', tags: ['beach', 'wildlife'], price: 80, co2: 5, duration: '3 hours', description: 'Swim among vibrant coral reefs and tropical fish.' },
//   { id: 1402, cityId: 14, name: 'Beach Relaxation Day', emoji: '🏖️', tags: ['beach'], price: 0, co2: 0, duration: 'full day', description: 'Relax on white sandy beaches with crystal clear water.' },
//   { id: 1403, cityId: 14, name: 'Marine Conservation Talk', emoji: '🐢', tags: ['eco', 'wildlife'], price: 20, co2: 1, duration: '2 hours', description: 'Learn about sea turtle protection efforts.' },
//   { id: 1404, cityId: 14, name: 'Island Kayaking', emoji: '🛶', tags: ['eco'], price: 60, co2: 2, duration: '2 hours', description: 'Paddle around calm turquoise waters.' },

//   //Taman Negara
//   { id: 1501, cityId: 15, name: 'Canopy Walk', emoji: '🌉', tags: ['eco', 'hiking'], price: 40, co2: 2, duration: '2 hours', description: 'Walk above the rainforest on suspended bridges.' },
//   { id: 1502, cityId: 15, name: 'Jungle Trekking', emoji: '🥾', tags: ['hiking', 'wildlife'], price: 60, co2: 3, duration: '4 hours', description: 'Explore one of the world’s oldest rainforests.' },
//   { id: 1503, cityId: 15, name: 'River Cruise Safari', emoji: '🚤', tags: ['eco', 'wildlife'], price: 50, co2: 4, duration: '3 hours', description: 'Spot wildlife along the river at night.' },
//   { id: 1504, cityId: 15, name: 'Orang Asli Village Visit', emoji: '🏘️', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'Learn about indigenous rainforest communities.' },
  
//   //Genting Highlands
//   { id: 1601, cityId: 16, name: 'Theme Park Adventure', emoji: '🎢', tags: ['culture'], price: 80, co2: 5, duration: 'full day', description: 'Enjoy indoor and outdoor amusement parks.' },
// { id: 1602, cityId: 16, name: 'Cable Car Ride', emoji: '🚡', tags: ['eco'], price: 25, co2: 3, duration: '1 hour', description: 'Ride above the rainforest mountains.' },
// { id: 1603, cityId: 16, name: 'Casino Experience', emoji: '🎰', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Experience Malaysia’s only legal casino environment.' },
// { id: 1604, cityId: 16, name: 'SkyAvenue Shopping', emoji: '🛍️', tags: ['culture'], price: 0, co2: 1, duration: '2 hours', description: 'Shop and dine in a cool mountain resort.' },

// //Kundasang
// { id: 1701, cityId: 17, name: 'Desa Dairy Farm Tour', emoji: '🐄', tags: ['eco', 'food'], price: 25, co2: 2, duration: '2 hours', description: 'Visit Malaysia’s “Little New Zealand” farm.' },
// { id: 1702, cityId: 17, name: 'Mount Kinabalu Viewpoint', emoji: '🏔️', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '1 hour', description: 'Scenic views of Mount Kinabalu.' },
// { id: 1703, cityId: 17, name: 'Hot Spring Relaxation', emoji: '♨️', tags: ['wellness'], price: 15, co2: 1, duration: '2 hours', description: 'Relax in natural hot springs.' },
// { id: 1704, cityId: 17, name: 'Vegetable Farm Visit', emoji: '🥬', tags: ['eco'], price: 10, co2: 1, duration: '1 hour', description: 'Tour local organic vegetable farms.' },

// //Semporna
// { id: 1801, cityId: 18, name: 'Island Hopping Tour', emoji: '🏝️', tags: ['beach'], price: 120, co2: 10, duration: 'full day', description: 'Visit stunning islands like Bohey Dulang.' },
// { id: 1802, cityId: 18, name: 'Scuba Diving Sipadan', emoji: '🤿', tags: ['wildlife', 'beach'], price: 300, co2: 15, duration: 'full day', description: 'Dive in one of the world’s top diving spots.' },
// { id: 1803, cityId: 18, name: 'Sea Gypsy Village Visit', emoji: '🏘️', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'Learn about the Bajau Laut community.' },
// { id: 1804, cityId: 18, name: 'Sunset Boat Cruise', emoji: '🌅', tags: ['eco'], price: 60, co2: 5, duration: '2 hours', description: 'Relax on a sunset cruise over turquoise waters.' },

// //Bako National Park
// { id: 1901, cityId: 19, name: 'Proboscis Monkey Trek', emoji: '🐒', tags: ['wildlife'], price: 50, co2: 3, duration: '3 hours', description: 'Spot rare proboscis monkeys in the wild.' },
// { id: 1902, cityId: 19, name: 'Jungle Hiking Trail', emoji: '🥾', tags: ['hiking', 'eco'], price: 40, co2: 2, duration: '4 hours', description: 'Explore rainforest trails and waterfalls.' },
// { id: 1903, cityId: 19, name: 'Beach Walk', emoji: '🏖️', tags: ['beach'], price: 0, co2: 0, duration: '1 hour', description: 'Walk along untouched coastal beaches.' },
// { id: 1904, cityId: 19, name: 'Wildlife Photography Tour', emoji: '📸', tags: ['wildlife'], price: 60, co2: 2, duration: '3 hours', description: 'Capture rare rainforest wildlife.' },

// //Sipadan Island
// { id: 2001, cityId: 20, name: 'Deep Sea Diving', emoji: '🤿', tags: ['beach', 'wildlife'], price: 400, co2: 20, duration: 'full day', description: 'World-famous diving with turtles and sharks.' },
// { id: 2002, cityId: 20, name: 'Snorkeling Coral Garden', emoji: '🐠', tags: ['beach'], price: 120, co2: 8, duration: '3 hours', description: 'Explore vibrant coral reefs.' },
// { id: 2003, cityId: 20, name: 'Marine Photography Tour', emoji: '📸', tags: ['wildlife'], price: 150, co2: 5, duration: '2 hours', description: 'Capture underwater marine life.' },
// { id: 2004, cityId: 20, name: 'Boat Island Cruise', emoji: '🚤', tags: ['eco'], price: 90, co2: 6, duration: '2 hours', description: 'Cruise around pristine islands.' },

// //Krabi
// { id: 2101, cityId: 21, name: 'Railay Beach Climbing', emoji: '🧗', tags: ['beach', 'hiking'], price: 80, co2: 5, duration: '3 hours', description: 'Rock climbing on limestone cliffs.' },
// { id: 2102, cityId: 21, name: 'Island Hopping Tour', emoji: '🏝️', tags: ['beach'], price: 100, co2: 10, duration: 'full day', description: 'Visit Phi Phi and nearby islands.' },
// { id: 2103, cityId: 21, name: 'Hot Springs Pool', emoji: '♨️', tags: ['wellness'], price: 20, co2: 2, duration: '2 hours', description: 'Relax in natural jungle hot springs.' },
// { id: 2104, cityId: 21, name: 'Night Market Food Tour', emoji: '🍜', tags: ['food'], price: 30, co2: 2, duration: '2 hours', description: 'Taste Thai street food.' },

// //Bangkok
// { id: 2201, cityId: 22, name: 'Grand Palace Tour', emoji: '🏛️', tags: ['culture'], price: 40, co2: 3, duration: '3 hours', description: 'Visit Thailand’s most iconic palace.' },
// { id: 2202, cityId: 22, name: 'Floating Market Visit', emoji: '🛶', tags: ['food', 'culture'], price: 50, co2: 5, duration: '3 hours', description: 'Shop and eat on boats.' },
// { id: 2203, cityId: 22, name: 'Street Food Walk', emoji: '🍜', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Explore Bangkok street food.' },
// { id: 2204, cityId: 22, name: 'Temple Night Tour', emoji: '🌙', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'See temples beautifully lit at night.' },

// //Jakarta
// { id: 2301, cityId: 23, name: 'Old Town Tour', emoji: '🏛️', tags: ['culture'], price: 20, co2: 2, duration: '2 hours', description: 'Explore Kota Tua heritage area.' },
// { id: 2302, cityId: 23, name: 'Street Food Tour', emoji: '🍢', tags: ['food'], price: 30, co2: 3, duration: '3 hours', description: 'Taste Indonesian street food.' },
// { id: 2303, cityId: 23, name: 'Monas Tower Visit', emoji: '🗼', tags: ['culture'], price: 10, co2: 1, duration: '1 hour', description: 'Visit national monument.' },
// { id: 2304, cityId: 23, name: 'Harbor Cruise', emoji: '🚢', tags: ['eco'], price: 40, co2: 4, duration: '2 hours', description: 'Boat tour around Jakarta harbor.' },

// //Bali North
// { id: 2401, cityId: 24, name: 'Rice Terrace Walk', emoji: '🌾', tags: ['eco'], price: 20, co2: 2, duration: '2 hours', description: 'Walk through green rice fields.' },
// { id: 2402, cityId: 24, name: 'Waterfall Trek', emoji: '💦', tags: ['hiking'], price: 30, co2: 2, duration: '3 hours', description: 'Discover hidden waterfalls.' },
// { id: 2403, cityId: 24, name: 'Yoga Retreat', emoji: '🧘', tags: ['wellness'], price: 60, co2: 1, duration: 'half day', description: 'Relax with yoga and meditation.' },
// { id: 2404, cityId: 24, name: 'Coffee Plantation Tour', emoji: '☕', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Learn coffee making process.' },

// //Hanoi
// { id: 2501, cityId: 25, name: 'Old Quarter Walk', emoji: '🏮', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Explore historic streets.' },
// { id: 2502, cityId: 25, name: 'Street Food Tour', emoji: '🍜', tags: ['food'], price: 35, co2: 2, duration: '3 hours', description: 'Try Vietnamese dishes.' },
// { id: 2503, cityId: 25, name: 'Temple of Literature', emoji: '🏛️', tags: ['culture'], price: 15, co2: 1, duration: '2 hours', description: 'Visit ancient university.' },
// { id: 2504, cityId: 25, name: 'Lake Cycling Tour', emoji: '🚴', tags: ['eco'], price: 25, co2: 1, duration: '2 hours', description: 'Cycle around Hoan Kiem Lake.' },

// //Ha Long Bay
// { id: 2601, cityId: 26, name: 'Cruise Tour', emoji: '🛳️', tags: ['eco'], price: 120, co2: 10, duration: 'full day', description: 'Sail through limestone cliffs.' },
// { id: 2602, cityId: 26, name: 'Kayaking Caves', emoji: '🛶', tags: ['eco'], price: 60, co2: 5, duration: '3 hours', description: 'Paddle through caves.' },
// { id: 2603, cityId: 26, name: 'Island Hiking', emoji: '🥾', tags: ['hiking'], price: 50, co2: 4, duration: '3 hours', description: 'Hike limestone islands.' },
// { id: 2604, cityId: 26, name: 'Sunset Deck Dinner', emoji: '🌅', tags: ['food'], price: 80, co2: 6, duration: '2 hours', description: 'Dinner on cruise deck.' },

// //Luang Prabang
// { id: 2701, cityId: 27, name: 'Waterfall Tour', emoji: '💦', tags: ['eco'], price: 30, co2: 2, duration: '3 hours', description: 'Visit Kuang Si waterfalls.' },
// { id: 2702, cityId: 27, name: 'Temple Tour', emoji: '🏯', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Explore golden temples.' },
// { id: 2703, cityId: 27, name: 'Morning Alms Ceremony', emoji: '🙏', tags: ['culture'], price: 10, co2: 0, duration: '1 hour', description: 'Watch monks collecting alms.' },
// { id: 2704, cityId: 27, name: 'River Boat Ride', emoji: '🚤', tags: ['eco'], price: 40, co2: 3, duration: '2 hours', description: 'Cruise Mekong River.' },

// //Siem Reap
// { id: 2801, cityId: 28, name: 'Angkor Wat Sunrise', emoji: '🌅', tags: ['culture'], price: 50, co2: 4, duration: '3 hours', description: 'Watch sunrise at Angkor Wat.' },
// { id: 2802, cityId: 28, name: 'Temple Exploration', emoji: '🏛️', tags: ['culture'], price: 60, co2: 5, duration: 'full day', description: 'Explore ancient temples.' },
// { id: 2803, cityId: 28, name: 'Floating Village Tour', emoji: '🛶', tags: ['eco'], price: 40, co2: 3, duration: '3 hours', description: 'Visit Tonle Sap lake villages.' },
// { id: 2804, cityId: 28, name: 'Night Market Food Walk', emoji: '🍢', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Taste Cambodian street food.' },

// //Mount Fuji Area
// { id: 2901, cityId: 29, name: 'Fuji Five Lakes Tour', emoji: '🏞️', tags: ['eco'], price: 100, co2: 8, duration: 'full day', description: 'Scenic lakes around Mount Fuji.' },
// { id: 2902, cityId: 29, name: 'Mountain Hiking', emoji: '🥾', tags: ['hiking'], price: 150, co2: 10, duration: 'full day', description: 'Hike near Mount Fuji trails.' },
// { id: 2903, cityId: 29, name: 'Hot Spring Onsen', emoji: '♨️', tags: ['wellness'], price: 60, co2: 3, duration: '2 hours', description: 'Relax in Japanese hot springs.' },
// { id: 2904, cityId: 29, name: 'Cultural Village Visit', emoji: '🏡', tags: ['culture'], price: 40, co2: 2, duration: '2 hours', description: 'Traditional Japanese village experience.' },

// //Kyoto
// { id: 3001, cityId: 30, name: 'Fushimi Inari Shrine Walk', emoji: '⛩️', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Walk through thousands of torii gates.' },
// { id: 3002, cityId: 30, name: 'Tea Ceremony Experience', emoji: '🍵', tags: ['culture'], price: 50, co2: 1, duration: '1 hour', description: 'Traditional Japanese tea ceremony.' },
// { id: 3003, cityId: 30, name: 'Arashiyama Bamboo Forest', emoji: '🎋', tags: ['eco'], price: 20, co2: 1, duration: '2 hours', description: 'Walk through bamboo forest.' },
// { id: 3004, cityId: 30, name: 'Geisha District Tour', emoji: '🎎', tags: ['culture'], price: 70, co2: 2, duration: '3 hours', description: 'Explore historic Gion district.' },

// // Sapporo (cityId: 31)
//   { id: 3101, cityId: 31, name: 'Ramen Alley Tasting Tour', emoji: '🍜', tags: ['food'], price: 45, co2: 1, duration: '2 hours', description: 'Sample historic miso ramen variants in Ganso Ramen Yokocho.' },
//   { id: 3102, cityId: 31, name: 'Jozankei Onsen Relaxation', emoji: '♨️', tags: ['wellness'], price: 55, co2: 2, duration: '4 hours', description: 'Soak in serene, mineral-rich thermal hot springs framed by forest scenery.' },
//   { id: 3103, cityId: 31, name: 'Historic Beer Museum Walk', emoji: '🍺', tags: ['culture', 'food'], price: 20, co2: 1, duration: '2 hours', description: 'Discover Japan beer brewing history housed inside a landmark brick structure.' },
//   { id: 3104, cityId: 31, name: 'Mount Moiwa Ropeway Ride', emoji: '🚠', tags: ['culture'], price: 30, co2: 3, duration: '2 hours', description: 'Ascend the cable car to capture panoramic city night lights.' },

//   // Nara (cityId: 32)
//   { id: 3201, cityId: 32, name: 'Nara Park Deer Interaction', emoji: '🦌', tags: ['wildlife', 'eco'], price: 10, co2: 0, duration: '2 hours', description: 'Meet and feed bowing sika deer roaming freely around park grounds.' },
//   { id: 3202, cityId: 32, name: 'Todai-ji Giant Buddha Tour', emoji: '🏛️', tags: ['culture'], price: 25, co2: 0, duration: '2 hours', description: 'Marvel at one of the largest bronze Buddha statues inside massive wooden architecture.' },
//   { id: 3203, cityId: 32, name: 'Kasuga Taisha Lantern Trail', emoji: '🏮', tags: ['culture', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Walk through forest paths lined with thousands of stone and bronze lanterns.' },
//   { id: 3204, cityId: 32, name: 'Traditional Nakatanidou Mochi View', emoji: '🍡', tags: ['food', 'culture'], price: 12, co2: 1, duration: '1 hour', description: 'Watch high-speed, dramatic pounding of green mugwort rice cakes.' },

//   // Osaka (cityId: 33)
//   { id: 3301, cityId: 33, name: 'Dotonbori Street Food Hunt', emoji: '🐙', tags: ['food'], price: 40, co2: 2, duration: '3 hours', description: 'Savor iconic takoyaki and okonomiyaki beneath giant neon billboards.' },
//   { id: 3302, cityId: 33, name: 'Osaka Castle Grounds Walk', emoji: '🏯', tags: ['culture'], price: 25, co2: 1, duration: '3 hours', description: 'Explore vast historic citadels, massive stone walls, and scenic gardens.' },
//   { id: 3303, cityId: 33, name: 'Kuromon Ichiba Market Walk', emoji: '🐟', tags: ['food', 'culture'], price: 50, co2: 2, duration: '2 hours', description: 'Browse bustling seafood alleyways offering fresh scallops and local delicacies.' },
//   { id: 3304, cityId: 33, name: 'Shinsekai Retro Heritage Tour', emoji: '🗼', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Immerse in nostalgic post-war vibes around Tsutenkaku Tower.' },

//   // Seoul (cityId: 34)
//   { id: 3401, cityId: 34, name: 'Gyeongbokgung Palace Heritage Walk', emoji: '🏯', tags: ['culture'], price: 15, co2: 1, duration: '3 hours', description: 'Walk grand royal courtyards while dressed in traditional Hanbok attire.' },
//   { id: 3402, cityId: 34, name: 'Insadong Traditional Tea Experience', emoji: '🍵', tags: ['culture', 'food'], price: 30, co2: 1, duration: '2 hours', description: 'Relax in hidden wooden teahouses serving ancient herbal blends.' },
//   { id: 3403, cityId: 34, name: 'Gwangjang Market Culinary Walk', emoji: '🥞', tags: ['food'], price: 35, co2: 2, duration: '2 hours', description: 'Feast on authentic mung bean pancakes, tteokbokki, and street treats.' },
//   { id: 3404, cityId: 34, name: 'Namsan Mountain Eco Trail', emoji: '⛰️', tags: ['hiking', 'eco'], price: 10, co2: 0, duration: '2 hours', description: 'Hike green park pathways winding up toward N Seoul Tower.' },

//   // Jeju Island (cityId: 35)
//   { id: 3501, cityId: 35, name: 'Seongsan Ilchulbong Tuff Cone Climb', emoji: '🌋', tags: ['hiking', 'eco'], price: 20, co2: 1, duration: '2 hours', description: 'Hike up an iconic volcanic crater rising dramatically above ocean waters.' },
//   { id: 3502, cityId: 35, name: 'Manjanggul Lava Tube Exploration', emoji: '🕳️', tags: ['eco'], price: 25, co2: 2, duration: '2 hours', description: 'Descend into one of the longest, coolest natural subterranean volcanic tunnels.' },
//   { id: 3503, cityId: 35, name: 'Jeju Haenyeo Diver Culture Show', emoji: '🐚', tags: ['culture', 'wildlife'], price: 30, co2: 0, duration: '2 hours', description: 'Meet legendary elderly female free-divers keeping ancient traditions alive.' },
//   { id: 3504, cityId: 35, name: 'Hyeopjae Beach Coastal Clean', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Help preserve pristine white sand coastlines and clear turquoise waters.' },

//   // Busan (cityId: 36)
//   { id: 3601, cityId: 36, name: 'Gamcheon Culture Village Wander', emoji: '🏡', tags: ['culture'], price: 10, co2: 1, duration: '2 hours', description: 'Explore brightly painted hillside alleyways, murals, and quirky art spaces.' },
//   { id: 3602, cityId: 36, name: 'Jagalchi Seafood Market Experience', emoji: '🦀', tags: ['food', 'culture'], price: 60, co2: 3, duration: '2 hours', description: 'Select fresh catches downstairs to be prepared instantly on market upper floors.' },
//   { id: 3603, cityId: 36, name: 'Haeundae Coastal Sky Capsule', emoji: '🚡', tags: ['beach'], price: 40, co2: 2, duration: '1 hour', description: 'Ride colorful miniature aerial rail units right along rugged shorelines.' },
//   { id: 3604, cityId: 36, name: 'Haedong Yonggungsa Ocean Temple', emoji: '⛩️', tags: ['culture', 'beach'], price: 15, co2: 2, duration: '2 hours', description: 'Visit a rare, gorgeous Buddhist temple overlooking crashing sea waves.' },

//   // Taipei (cityId: 37)
//   { id: 3701, cityId: 37, name: 'Shilin Night Market Food Walk', emoji: '🧋', tags: ['food'], price: 30, co2: 2, duration: '3 hours', description: 'Graze on legendary stinky tofu, pepper buns, and iconic milk tea.' },
//   { id: 3702, cityId: 37, name: 'Elephant Mountain Skyline Trail', emoji: '🐘', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Climb stone step trails for classic, unobstructed views of Taipei 101.' },
//   { id: 3703, cityId: 37, name: 'Dadaocheng Heritage Walk', emoji: '🧱', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'Stroll historic brick shop-houses specializing in medicine and tea trade.' },
//   { id: 3704, cityId: 37, name: 'Beitou Thermal Valley Soak', emoji: '♨️', tags: ['wellness', 'eco'], price: 45, co2: 1, duration: '3 hours', description: 'Unwind inside volcanic sulfur hot spring baths near steaming valleys.' },

//   // Hualien (cityId: 38)
//   { id: 3801, cityId: 38, name: 'Taroko Gorge Eco Trail', emoji: '⛰️', tags: ['hiking', 'eco'], price: 70, co2: 3, duration: '5 hours', description: 'Trek inside jaw-dropping marble canyons and massive deep rock ravines.' },
//   { id: 3802, cityId: 38, name: 'Qixingtan Pebble Beach Walk', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 1, duration: '2 hours', description: 'Stroll sweeping crescent shores shaped by smooth, ocean-washed marble stones.' },
//   { id: 3803, cityId: 38, name: 'Whale and Dolphin Eco Cruise', emoji: '🐬', tags: ['wildlife', 'eco'], price: 85, co2: 12, duration: '3 hours', description: 'Sail out to encounter wild oceanic cetaceans in conservation zones.' },
//   { id: 3804, cityId: 38, name: 'Indigenous Amis Culinary Workshop', emoji: '🥬', tags: ['culture', 'food'], price: 50, co2: 2, duration: '3 hours', description: 'Prepare traditional wild herb dishes over open wood fires with tribe elders.' },

//   // Kaohsiung (cityId: 39)
//   { id: 3901, cityId: 39, name: 'Pier-2 Art Center Cycle', emoji: '🚴', tags: ['cycle', 'culture'], price: 20, co2: 0, duration: '3 hours', description: 'Pedal around converted abandoned port warehouses showcasing modern installations.' },
//   { id: 3902, cityId: 39, name: 'Lotus Pond Pavilions Exploration', emoji: '🐉', tags: ['culture'], price: 10, co2: 1, duration: '2 hours', description: 'Enter lucky Dragon and Tiger pagodas directly over scenic waters.' },
//   { id: 3903, cityId: 39, name: 'Cijin Island Seafood Ferry Ride', emoji: '🚢', tags: ['beach', 'food'], price: 30, co2: 4, duration: '3 hours', description: 'Take short boat hops to narrow sand strips rich with street stalls.' },
//   { id: 3904, cityId: 39, name: 'Fo Guang Shan Monastery Walk', emoji: '🛕', tags: ['culture'], price: 25, co2: 3, duration: '4 hours', description: 'Walk through expansive peaceful pathways flanked by giant towering golden Buddhas.' },

//   // Manila (cityId: 40)
//   { id: 4001, cityId: 40, name: 'Intramuros Walled City Walk', emoji: '🏛️', tags: ['culture'], price: 20, co2: 0, duration: '3 hours', description: 'Trace old Spanish colonial fortresses, stone ramparts, and historic plazas.' },
//   { id: 4002, cityId: 40, name: 'Binondo Oldest Chinatown Food Hunt', emoji: '🥟', tags: ['food', 'culture'], price: 45, co2: 1, duration: '3 hours', description: 'Savor unique Filipino-Chinese cuisine hybrids along historical culinary lanes.' },
//   { id: 4003, cityId: 40, name: 'Rizal Park Heritage Walk', emoji: '🌳', tags: ['culture', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Stroll beautiful city park lawns celebrating national history.' },
//   { id: 4004, cityId: 40, name: 'Jeepney Culture Commuter Route', emoji: '🛺', tags: ['culture'], price: 10, co2: 4, duration: '1 hour', description: 'Ride iconic, vibrantly painted vintage utility passenger vehicles.' },

//   // El Nido (cityId: 41)
//   { id: 4101, cityId: 41, name: 'Bacuit Bay Lagoon Kayaking', emoji: '🛶', tags: ['eco', 'beach'], price: 75, co2: 0, duration: '4 hours', description: 'Glide silently across pristine limestone lagoons with emerald depths.' },
//   { id: 4102, cityId: 41, name: 'Secret Beach Coral Snorkel', emoji: '🤿', tags: ['beach', 'wildlife'], price: 85, co2: 8, duration: '4 hours', description: 'Swim through underwater rocky gaps into hidden white beach sanctuaries.' },
//   { id: 4103, cityId: 41, name: 'Taroko Cliff Canopy Trek', emoji: '🧗', tags: ['hiking', 'eco'], price: 40, co2: 1, duration: '2 hours', description: 'Climb sharp karst peaks safely on secured pathways for ocean outlooks.' },
//   { id: 4104, cityId: 41, name: 'Marine Life Sanctuary Presentation', emoji: '🐢', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Engage with researchers preserving delicate Palawan eco-networks.' },

//   // Boracay (cityId: 42)
//   { id: 4201, cityId: 42, name: 'White Beach Sunset Sail', emoji: '⛵', tags: ['beach'], price: 50, co2: 0, duration: '2 hours', description: 'Board traditional outrigger boats propelled gently by evening ocean wind.' },
//   { id: 4202, cityId: 42, name: 'Coral Garden Reef Dive', emoji: '🐠', tags: ['wildlife', 'beach'], price: 110, co2: 6, duration: '3 hours', description: 'Explore diverse shallow marine colonies and anemone nurseries.' },
//   { id: 4203, cityId: 42, name: 'Puka Shell Beach Eco Walk', emoji: '🐚', tags: ['beach', 'eco'], price: 15, co2: 2, duration: '2 hours', description: 'Roam quieter northern shorelines composed of coarse crushed coral shells.' },
//   { id: 4204, cityId: 42, name: 'Island Mandala Spa Relaxation', emoji: '🧘‍♀️', tags: ['wellness'], price: 90, co2: 0, duration: '2 hours', description: 'Indulge organic botanical oil massage therapies inside quiet forest villas.' },

//   // Ho Chi Minh City (cityId: 43)
//   { id: 4301, cityId: 43, name: 'Ben Thanh Night Food Market', emoji: '🍲', tags: ['food'], price: 30, co2: 1, duration: '2 hours', description: 'Sample steaming noodle broths and crispy sizzling pancakes.' },
//   { id: 4302, cityId: 43, name: 'Cu Chi Eco Tunnel Trail', emoji: '🕳️', tags: ['culture'], price: 45, co2: 6, duration: '4 hours', description: 'Explore subterranean historical tunnel networks inside rural woodland.' },
//   { id: 4303, cityId: 43, name: 'French Quarter Architecture Trail', emoji: '🏛️', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'See iconic post office facades and historic cathedrals on foot.' },
//   { id: 4304, cityId: 43, name: 'Saigon River Sunset Cruise', emoji: '🚢', tags: ['eco'], price: 55, co2: 5, duration: '2 hours', description: 'Watch the modern metropolis skyline ignite from serene water currents.' },

//   // Da Nang (cityId: 44)
//   { id: 4401, cityId: 44, name: 'Marble Mountains Cave Hike', emoji: '⛰️', tags: ['hiking', 'culture'], price: 25, co2: 1, duration: '3 hours', description: 'Climb stone hillsides into deep, atmospheric limestone sanctuaries.' },
//   { id: 4402, cityId: 44, name: 'Dragon Bridge Weekend Show', emoji: '🐉', tags: ['culture'], price: 0, co2: 2, duration: '1 hour', description: 'Witness the iconic bridge spout massive fire and water displays.' },
//   { id: 4403, cityId: 44, name: 'My Khe Beach Eco Jog', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '1 hour', description: 'Enjoy sunrise activities along vast, wide sandy coastal stretches.' },
//   { id: 4404, cityId: 44, name: 'Son Tra Peninsula Monkey Trek', emoji: '🐒', tags: ['wildlife', 'eco'], price: 35, co2: 3, duration: '3 hours', description: 'Spot critically endangered red-shanked douc langurs in native trees.' },

//   // Hoi An (cityId: 45)
//   { id: 4501, cityId: 45, name: 'Ancient Town Lantern Cycle', emoji: '🚴', tags: ['cycle', 'culture'], price: 20, co2: 0, duration: '3 hours', description: 'Ride slow historic streets free from motorized vehicular traffic.' },
//   { id: 4502, cityId: 45, name: 'Thu Bon River Lantern Release', emoji: '🏮', tags: ['culture'], price: 15, co2: 1, duration: '1 hour', description: 'Float handmade biodegradable paper lanterns along glowing waters.' },
//   { id: 4503, cityId: 45, name: 'Organic Tra Que Vegetable Farm', emoji: '🥬', tags: ['food', 'eco'], price: 40, co2: 1, duration: '3 hours', description: 'Learn chemical-free fertilizing techniques using native pond seaweed.' },
//   { id: 4504, cityId: 45, name: 'Central Market Cooking Class', emoji: '🥗', tags: ['food'], price: 55, co2: 2, duration: '4 hours', description: 'Select fresh ingredients inside local wet stalls to create regional spring rolls.' },

//   // Phnom Penh (cityId: 46)
//   { id: 4601, cityId: 46, name: 'Royal Palace Complex Tour', emoji: '🏰', tags: ['culture'], price: 35, co2: 2, duration: '2 hours', description: 'Admire magnificent Khmer architecture and the glistening Silver Pagoda.' },
//   { id: 4602, cityId: 46, name: 'Mekong River Dolphin Cruise', emoji: '🚤', tags: ['wildlife', 'eco'], price: 50, co2: 6, duration: '3 hours', description: 'Search river currents for remaining protected freshwater Irrawaddy populations.' },
//   { id: 4603, cityId: 46, name: 'Tuol Sleng History Memorial', emoji: '🏛️', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Reflect on profound, moving national history inside preserved museum halls.' },
//   { id: 4604, cityId: 46, name: 'Central Market Architecture Walk', emoji: '🟡', tags: ['culture', 'food'], price: 10, co2: 1, duration: '2 hours', description: 'Explore a unique, historic Art Deco domed covered bazaar hub.' },

//   // Vang Vieng (cityId: 47)
//   { id: 4701, cityId: 47, name: 'Nam Song River Kayaking', emoji: '🛶', tags: ['eco'], price: 35, co2: 0, duration: '3 hours', description: 'Paddle down gentle currents cutting through towering karst mountain peaks.' },
//   { id: 4702, cityId: 47, name: 'Tham Chang Cave Exploration', emoji: '🕳️', tags: ['hiking', 'culture'], price: 20, co2: 1, duration: '2 hours', description: 'Cross orange suspension bridges to view deep, cool historical cavern layouts.' },
//   { id: 4703, cityId: 47, name: 'Nam Xay Viewpoint Ridge Climb', emoji: '🧗', tags: ['hiking', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Scramble steep forest paths up to a famous mountaintop motorcycle prop.' },
//   { id: 4704, cityId: 47, name: 'Organic Mulberry Farm Visit', emoji: '🍃', tags: ['eco', 'food'], price: 25, co2: 1, duration: '2 hours', description: 'See silk production processes and taste refreshing natural leaf teas.' },

//   // Phuket (cityId: 48)
//   { id: 4801, cityId: 48, name: 'Old Town Baba Heritage Walk', emoji: '🏛️', tags: ['culture', 'food'], price: 20, co2: 1, duration: '3 hours', description: 'Stroll past pastel Sino-Portuguese shophouses filled with artisanal shops.' },
//   { id: 4802, cityId: 48, name: 'Phang Nga Bay Sea Canoe', emoji: '🛶', tags: ['eco', 'beach'], price: 90, co2: 7, duration: '5 hours', description: 'Navigate enclosed lagoon chambers accessible only via narrow marine caves.' },
//   { id: 4803, cityId: 48, name: 'Gibbon Rehabilitation Center', emoji: '🐒', tags: ['wildlife', 'eco'], price: 30, co2: 2, duration: '2 hours', description: 'Observe rescued primates recovering within secondary rainforest zones.' },
//   { id: 4804, cityId: 48, name: 'Kata Beach Surf Yoga Session', emoji: '🧘‍♀️', tags: ['wellness', 'beach'], price: 40, co2: 0, duration: '2 hours', description: 'Combine ocean-facing breathing routines with light sand balance stretching.' },

//   // Bandung (cityId: 49)
//   { id: 4901, cityId: 49, name: 'Tangkuban Perahu Crater View', emoji: '🌋', tags: ['eco', 'hiking'], price: 45, co2: 4, duration: '3 hours', description: 'Peer into a vast, active volcanic sulfur bowl framed by mist.' },
//   { id: 4902, cityId: 49, name: 'Kawah Putih Crater Lake Trek', emoji: '🧪', tags: ['hiking', 'eco'], price: 35, co2: 3, duration: '2 hours', description: 'Walk around a surreal, highly acidic white-turquoise mountain reservoir.' },
//   { id: 4903, cityId: 49, name: 'Saung Angklung Udjo Performance', emoji: '🎋', tags: ['culture'], price: 30, co2: 1, duration: '2 hours', description: 'Listen to harmonious live bamboo hand-shaken musical orchestra pieces.' },
//   { id: 4904, cityId: 49, name: ' Braga Street Heritage Coffee', emoji: '☕', tags: ['food', 'culture'], price: 20, co2: 1, duration: '2 hours', description: 'Walk historic European-style cobblestone strip lanes hosting roasting hubs.' },

//   // Lombok (cityId: 50)
//   { id: 5001, cityId: 50, name: 'Mount Rinjani Footbridge Trek', emoji: '🥾', tags: ['hiking', 'eco'], price: 65, co2: 2, duration: '4 hours', description: 'Hike lower evergreen slopes toward towering epic volcanic ridge panoramas.' },
//   { id: 5002, cityId: 50, name: 'Gili Meno Sea Turtle Snorkel', emoji: '🐢', tags: ['beach', 'wildlife'], price: 55, co2: 5, duration: '3 hours', description: 'Swim over shallow seagrass meadows hosting wild nesting ocean turtles.' },
//   { id: 5003, cityId: 50, name: 'Sade Traditional Sasak Village', emoji: '🛖', tags: ['culture'], price: 25, co2: 1, duration: '2 hours', description: 'Observe indigenous clay-and-straw thatched house architecture and hand-weaving.' },
//   { id: 5004, cityId: 50, name: 'Tanjung Aan Sand Beach Clean', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Gather plastic debris alongside local coast wardens to secure coral health.' },

//   // Tokyo (cityId: 51)
//   { id: 5101, cityId: 51, name: 'Shibuya Crossing Walk', emoji: '🚶‍♂️', tags: ['culture'], price: 0, co2: 0, duration: '1 hour', description: 'Experience the kinetic energy of the world\'s busiest pedestrian intersection.' },
//   { id: 5102, cityId: 51, name: 'Tsukiji Outer Market Tasting', emoji: '🍣', tags: ['food'], price: 55, co2: 1, duration: '2 hours', description: 'Sample historic fresh street rolls, tamagoyaki, and local ocean catches.' },
//   { id: 5103, cityId: 51, name: 'Shinjuku Gyoen National Garden', emoji: '🌸', tags: ['eco'], price: 15, co2: 0, duration: '2 hours', description: 'Stroll pristine landscapes bridging traditional French, English, and Japanese architecture.' },
//   { id: 5104, cityId: 51, name: 'Akihabara Pop Culture Tour', emoji: '🎮', tags: ['culture'], price: 25, co2: 1, duration: '3 hours', description: 'Explore iconic electronics towers, arcade zones, and anime subculture landmarks.' },

//   // Sydney (cityId: 52)
//   { id: 5201, cityId: 52, name: 'Sydney Opera House Architecture Tour', emoji: '🎭', tags: ['culture'], price: 45, co2: 1, duration: '2 hours', description: 'Go behind the scenes of Jørn Utzon\'s world-famous architectural sails.' },
//   { id: 5202, cityId: 52, name: 'Bondi to Bronte Coastal Trek', emoji: '🏖️', tags: ['beach', 'hiking'], price: 0, co2: 0, duration: '3 hours', description: 'Walk rugged sandstone cliffs alongside sweeping ocean waves and ocean pools.' },
//   { id: 5203, cityId: 52, name: 'Sydney Harbour Bridge Climb', emoji: '🌉', tags: ['hiking'], price: 220, co2: 2, duration: '3 hours', description: 'Ascend the structural framework of the "Coat hanger" bridge for skyline panoramas.' },
//   { id: 5204, cityId: 52, name: 'Taronga Zoo Ferry Ride & Eco Visit', emoji: '🐨', tags: ['wildlife', 'eco'], price: 65, co2: 4, duration: '4 hours', description: 'Cross harbor channels to interact with native kangaroos and koalas in conservation sanctuaries.' },

//   // Melbourne (cityId: 53)
//   { id: 5301, cityId: 53, name: 'Laneway Coffee & Graffiti Stroll', emoji: '☕', tags: ['food', 'culture'], price: 35, co2: 1, duration: '2 hours', description: 'Uncover artisanal espresso bars buried down vibrant, dynamic graffiti alleyways.' },
//   { id: 5302, cityId: 53, name: 'Royal Botanic Gardens Path Walk', emoji: '🌳', tags: ['eco'], price: 0, co2: 0, duration: '2 hours', description: 'Wander deep lakeside flora arrays showcasing over 8,500 distinct global species.' },
//   { id: 5303, cityId: 53, name: 'Queen Victoria Market Market Run', emoji: '🍏', tags: ['food'], price: 20, co2: 1, duration: '2 hours', description: 'Browse open-air heritage sheds loaded with cheese collections and hot jam donuts.' },
//   { id: 5304, cityId: 53, name: 'Yarra River Ecosystem Cycling', emoji: '🚴', tags: ['cycle', 'eco'], price: 30, co2: 0, duration: '3 hours', description: 'Pedal down continuous city trails tracing river currents through urban green parks.' },

//   // Auckland (cityId: 54)
//   { id: 5401, cityId: 54, name: 'Sky Tower Glass Lookout', emoji: '🏙️', tags: ['culture'], price: 40, co2: 2, duration: '2 hours', description: 'Peer over glass platform floors 220 meters above bustling harbors.' },
//   { id: 5402, cityId: 54, name: 'Waiheke Island Eco Vineyard Walk', emoji: '🍷', tags: ['food', 'eco'], price: 95, co2: 6, duration: '5 hours', description: 'Cruise out to rolling coastal vineyards specializing in premium red varieties.' },
//   { id: 5403, cityId: 54, name: 'Mount Eden Volcanic Crater Hike', emoji: '🌋', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Scale a sacred dormant volcanic bowl blanketed in native structural turf.' },
//   { id: 5404, cityId: 54, name: 'Rangitoto Island Sea Kayaking', emoji: '🛶', tags: ['eco', 'hiking'], price: 110, co2: 0, duration: '4 hours', description: 'Paddle across open volcanic waters to explore raw black lava fields on foot.' },

//   // Queenstown (cityId: 55)
//   { id: 5501, cityId: 55, name: 'Milford Sound Wilderness Cruise', emoji: '🛳️', tags: ['eco', 'wildlife'], price: 160, co2: 18, duration: 'full day', description: 'Navigate deep glacial fjords under plunging cascading waterfalls and lazy seals.' },
//   { id: 5502, cityId: 55, name: 'Skyline Bob\'s Peak Gondola', emoji: '🚡', tags: ['culture'], price: 45, co2: 3, duration: '2 hours', description: 'Ascend steep mountain cables to access swift gravity-fueled concrete luge tracks.' },
//   { id: 5503, cityId: 55, name: 'Ben Lomond Ridge Line Track', emoji: '🥾', tags: ['hiking'], price: 0, co2: 0, duration: '6 hours', description: 'Conquer testing alpine slopes offering 360-degree views of Remarkables mountain chain.' },
//   { id: 5504, cityId: 55, name: 'Onsen Hot Pools Mountain Soak', emoji: '♨️', tags: ['wellness'], price: 85, co2: 1, duration: '2 hours', description: 'Unwind in private cedar tubs elevated over the dramatic Shotover River Canyon.' },

//   // Paris (cityId: 56)
//   { id: 5601, cityId: 56, name: 'Eiffel Tower Summit Climb', emoji: '🗼', tags: ['culture'], price: 30, co2: 2, duration: '3 hours', description: 'Ascend architectural iron platforms for unobstructed visions across historic avenues.' },
//   { id: 5602, cityId: 56, name: 'Louvre Art Collection Tour', emoji: '🖼️', tags: ['culture'], price: 25, co2: 1, duration: '3 hours', description: 'Decode classic royal relics, ancient antiquities, and the cryptic Mona Lisa.' },
//   { id: 5603, cityId: 56, name: 'Seine River Sunset Cruise', emoji: '🚢', tags: ['culture'], price: 20, co2: 4, duration: '1 hour', description: 'Glide under historic stone masonry bridges while iconic cathedrals ignite with illumination.' },
//   { id: 5604, cityId: 56, name: 'Artisanal Croissant Baking Academy', emoji: '🥐', tags: ['food'], price: 75, co2: 1, duration: '3 hours', description: 'Master traditional lamination and folding styles alongside professional French patissiers.' },

//   // Rome (cityId: 57)
//   { id: 5701, cityId: 57, name: 'Colosseum & Roman Forum Excavation', emoji: '🏛️', tags: ['culture'], price: 35, co2: 0, duration: '3 hours', description: 'Walk the blood-soaked sands of ancient gladiatorial rings and political complexes.' },
//   { id: 5702, cityId: 57, name: 'Vatican Museums & Sistine Chapel', emoji: '⛪', tags: ['culture'], price: 40, co2: 1, duration: '4 hours', description: 'Marvel at Michelangelo\'s fresco vaults and papal Renaissance treasures.' },
//   { id: 5703, cityId: 57, name: 'Authentic Pasta Making Masterclass', emoji: '🍝', tags: ['food'], price: 60, co2: 1, duration: '3 hours', description: 'Roll fresh egg dough out to form classic shapes paired with Roman sauces.' },
//   { id: 5704, cityId: 57, name: 'Trevi Fountain Historic Gelato Trail', emoji: '🍦', tags: ['food', 'culture'], price: 15, co2: 0, duration: '2 hours', description: 'Toss iconic wishing coins into baroque stone pools before sampling local treats.' },

//   // London (cityId: 58)
//   { id: 5801, cityId: 58, name: 'Tower of London Armoury Walk', emoji: '🏰', tags: ['culture'], price: 38, co2: 1, duration: '3 hours', description: 'Inspect guarded crown jewels inside fortress structures dating back to 1066.' },
//   { id: 5802, cityId: 58, name: 'British Museum Antiquities Search', emoji: '🏛️', tags: ['culture'], price: 0, co2: 0, duration: '3 hours', description: 'Stand before iconic history markers like the Rosetta Stone and Parthenon Marbles.' },
//   { id: 5803, cityId: 58, name: 'Hyde Park Royal Eco Bike Circuit', emoji: '🚴', tags: ['cycle', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Pedal clean pathways flanking Kensington Palace and Serpentine lakes.' },
//   { id: 5804, cityId: 58, name: 'Traditional Afternoon Tea Ritual', emoji: '🫖', tags: ['food', 'culture'], price: 65, co2: 2, duration: '2 hours', description: 'Savor tier plates of baked scones, finger sandwiches, and rare herbal blends.' },

//   // Barcelona (cityId: 59)
//   { id: 5901, cityId: 59, name: 'Sagrada Familia Architectural Decoding', emoji: '⛪', tags: ['culture'], price: 35, co2: 1, duration: '2 hours', description: 'Explore Antoni Gaudí\'s towering, organic temple forest and stained-glass views.' },
//   { id: 5902, cityId: 59, name: 'Park Guell Mosaic Wonderland Walk', emoji: '🦎', tags: ['culture', 'eco'], price: 15, co2: 0, duration: '2 hours', description: 'Wander whimsical tile installations integrated into elevated Mediterranean landscapes.' },
//   { id: 5903, cityId: 59, name: 'Barceloneta Beach Cleanup & Relax', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Engage with green neighborhood advocates to filter sand of modern waste.' },
//   { id: 5904, cityId: 59, name: 'Gothic Quarter Tapas Crawl', emoji: '🍢', tags: ['food'], price: 55, co2: 2, duration: '3 hours', description: 'Sample Iberian ham, patatas bravas, and regional wines inside ancient stone rooms.' },

//   // Amsterdam (cityId: 60)
//   { id: 6001, cityId: 60, name: 'Historic Canal Electric Boat Cruise', emoji: '🚢', tags: ['culture', 'eco'], price: 25, co2: 0, duration: '1.5 hours', description: 'Float past lean golden-age gabled warehouses using zero-emission solar craft.' },
//   { id: 6002, cityId: 60, name: 'Van Gogh Museum Heritage Search', emoji: '🎨', tags: ['culture'], price: 22, co2: 0, duration: '2 hours', description: 'Analyze the largest concentration of masterworks produced by Vincent van Gogh.' },
//   { id: 6003, cityId: 60, name: 'Countryside Windmill Cycle Run', emoji: '🚴', tags: ['cycle', 'eco'], price: 45, co2: 0, duration: '4 hours', description: 'Leave urban networks to cycle polder pathways out toward working structural windmills.' },
//   { id: 6004, cityId: 60, name: 'Jordaan District Pastry Walk', emoji: '🥞', tags: ['food'], price: 35, co2: 1, duration: '2 hours', description: 'Savor deep-dish Dutch apple pies and traditional spiced stroopwafels.' },

//   // Berlin (cityId: 61)
//   { id: 6101, cityId: 61, name: 'East Side Gallery History Walk', emoji: '🧱', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Trace cold war friction along a preserved segment of the concrete Berlin Wall.' },
//   { id: 6102, cityId: 61, name: 'Brandenburg Gate Evening Circuit', emoji: '🏛️', tags: ['culture'], price: 0, co2: 0, duration: '1 hour', description: 'Stand beneath iconic neoclassical columns signifying modern European unity.' },
//   { id: 6103, cityId: 61, name: 'Tiergarten Park Wilderness Cycle', emoji: '🚴', tags: ['cycle', 'eco'], price: 20, co2: 0, duration: '2.5 hours', description: 'Navigate deep forested hunting fields converted to urban conservation paths.' },
//   { id: 6104, cityId: 61, name: 'Currywurst & Urban Brew Exploration', emoji: '🌭', tags: ['food'], price: 30, co2: 2, duration: '2 hours', description: 'Sample local post-war street food specialities alongside underground craft ales.' },

//   // Reykjavik (cityId: 62)
//   { id: 6201, cityId: 62, name: 'Golden Circle Geothermal Trail', emoji: '💦', tags: ['eco', 'hiking'], price: 85, co2: 8, duration: 'full day', description: 'Track massive tectonic fissures, erupting hot springs, and plunging glacial falls.' },
//   { id: 6202, cityId: 62, name: 'Blue Lagoon Mineral Pool Soak', emoji: '♨️', tags: ['wellness'], price: 90, co2: 2, duration: '3 hours', description: 'Float inside superheated, silica-rich blue volcanic basins framed by black lava.' },
//   { id: 6203, cityId: 62, name: 'Northern Lights Eco Hunting Trek', emoji: '🌌', tags: ['eco'], price: 65, co2: 5, duration: '4 hours', description: 'Venture deep into zero-light wilderness zones chasing active solar plasma displays.' },
//   { id: 6204, cityId: 62, name: 'Sólheimajökull Glacier Ice Trek', emoji: '🥾', tags: ['hiking', 'eco'], price: 130, co2: 4, duration: '4 hours', description: 'Don professional steel crampons to climb vanishing ancient blue ice valleys.' },

//   // New York City (cityId: 63)
//   { id: 6301, cityId: 63, name: 'Statue of Liberty Liberty Island Ferry', emoji: '🗽', tags: ['culture'], price: 30, co2: 6, duration: '3 hours', description: 'Cruise across harbor networks to view the historic threshold of global migration.' },
//   { id: 6302, cityId: 63, name: 'Central Park Woodlands Walk', emoji: '🌳', tags: ['eco'], price: 0, co2: 0, duration: '2 hours', description: 'Explore hidden Ramble paths inside Frederick Law Olmsted\'s master parkwork.' },
//   { id: 6303, cityId: 63, name: 'Broadway Theater Evening Performance', emoji: '🎭', tags: ['culture'], price: 110, co2: 1, duration: '3 hours', description: 'Experience top-tier global theater inside historic Manhattan entertainment corridors.' },
//   { id: 6304, cityId: 63, name: 'Chelsea Market Food Hall Crawl', emoji: '🍕', tags: ['food'], price: 45, co2: 1, duration: '2 hours', description: 'Savor classic coal-fired pizza crusts and fresh street tacos inside converted biscuit structures.' },

//   // San Francisco (cityId: 64)
//   { id: 6401, cityId: 64, name: 'Golden Gate Bridge Coastal Cycle', emoji: '🚴', tags: ['cycle'], price: 35, co2: 0, duration: '3 hours', description: 'Ride the historic suspension span high above swirling Pacific bay channels.' },
//   { id: 6402, cityId: 64, name: 'Alcatraz Island Penitentiary Tour', emoji: '⛓️', tags: ['culture'], price: 49, co2: 5, duration: '3 hours', description: 'Step into legendary maximum-security cell blocks sitting out on a lonely rocky isle.' },
//   { id: 6403, cityId: 64, name: 'Muir Woods Redwood Eco Hike', emoji: '🌲', tags: ['eco', 'hiking'], price: 25, co2: 4, duration: '4 hours', description: 'Stand amidst thousand-year-old coastal trees rising into foggy marine canopies.' },
//   { id: 6404, cityId: 64, name: 'Fisherman\'s Wharf Sourdough Tasting', emoji: '🥣', tags: ['food'], price: 20, co2: 1, duration: '1.5 hours', description: 'Sample fresh crab chowder Ladled into tangy, slow-fermented bakery bread bowls.' },

//   // Los Angeles (cityId: 65)
//   { id: 6501, cityId: 65, name: 'Hollywood Walk of Fame History Track', emoji: '⭐', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Uncover cinema history footprints tracing beneath historic theater facades.' },
//   { id: 6502, cityId: 65, name: 'Griffith Observatory Foothill Hike', emoji: '🔭', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '2.5 hours', description: 'Trek native chaparral brush lines leading up toward iconic art deco stargazing decks.' },
//   { id: 6503, cityId: 65, name: 'Santa Monica Boardwalk Bike Run', emoji: '🎡', tags: ['beach', 'cycle'], price: 25, co2: 0, duration: '2 hours', description: 'Pedal sand paths sweeping past historic overwater wooden amusement parks.' },
//   { id: 6504, cityId: 65, name: 'Venice Beach Skate Park Stroll', emoji: '🏄', tags: ['beach'], price: 0, co2: 0, duration: '2 hours', description: 'Observe subculture surf styles and expressive street performers on concrete lines.' },

//   // Vancouver (cityId: 66)
//   { id: 6601, cityId: 66, name: 'Stanley Park Marine Seawall Cycle', emoji: '🚴', tags: ['cycle', 'eco'], price: 20, co2: 0, duration: '2.5 hours', description: 'Loop ancient coastal cedar groves right along ocean-sprayed granite barriers.' },
//   { id: 6602, cityId: 66, name: 'Capilano Suspension Bridge Walk', emoji: '🌲', tags: ['eco'], price: 55, co2: 2, duration: '2 hours', description: 'Cross swaying suspension spans dangling 70 meters above roaring river pools.' },
//   { id: 6603, cityId: 66, name: 'Granville Island Market Food Hunt', emoji: '🥐', tags: ['food'], price: 35, co2: 1, duration: '2 hours', description: 'Sample locally smoked salmon belly and wild berry pastries in old factory sheds.' },
//   { id: 6604, cityId: 66, name: 'Grouse Mountain Alpine Elevation Trail', emoji: '🥾', tags: ['hiking'], price: 15, co2: 1, duration: '3 hours', description: 'Conquer "Nature\'s Staircase," a steep stone route climbing directly into clouds.' },

//   // Toronto (cityId: 67)
//   { id: 6701, cityId: 67, name: 'CN Tower EdgeWalk Challenge', emoji: '🏙️', tags: ['culture'], price: 195, co2: 1, duration: '2 hours', description: 'Walk hands-free along an open-air mesh rim 356 meters above city streets.' },
//   { id: 6702, cityId: 67, name: 'Toronto Islands Eco Kayak Run', emoji: '🛶', tags: ['eco'], price: 45, co2: 0, duration: '3 hours', description: 'Paddle tranquil wetland bird reserves looking back onto modern concrete city horizons.' },
//   { id: 6703, cityId: 67, name: 'St. Lawrence Heritage Market Tasting', emoji: '🥓', tags: ['food'], price: 30, co2: 1, duration: '2 hours', description: 'Savor classic peameal bacon sandwiches inside a massive 1803 market brick building.' },
//   { id: 6704, cityId: 67, name: 'Royal Ontario Museum Historic Exploration', emoji: '🏛️', tags: ['culture'], price: 28, co2: 1, duration: '3 hours', description: 'Trace vast galleries highlighting dinosaur fossil relics and ancient textile crafts.' },

//   // Mexico City (cityId: 68)
//   { id: 6801, cityId: 68, name: 'Teotihuacan Pyramids Archaeology Walk', emoji: '🛕', tags: ['culture'], price: 45, co2: 6, duration: '5 hours', description: 'Walk the Avenue of the Dead to inspect massive pre-Aztec structural stone complexes.' },
//   { id: 6802, cityId: 68, name: 'Xochimilco Floating Garden Boat Ride', emoji: '🛶', tags: ['culture', 'eco'], price: 30, co2: 2, duration: '3 hours', description: 'Float down ancient Aztec chinampa farm channels aboard wooden trajinera boats.' },
//   { id: 6803, cityId: 68, name: 'Street Taco & Mezcal Culinary Crawl', emoji: '🌮', tags: ['food'], price: 40, co2: 1, duration: '3 hours', description: 'Graze on slow-cooked pastor pork shaved onto corn tortillas at neighborhood stalls.' },
//   { id: 6804, cityId: 68, name: 'Frida Kahlo Blue House Museum', emoji: '🎨', tags: ['culture'], price: 15, co2: 0, duration: '2 hours', description: 'Immerse in intimate personal art studios located inside her colorful Coyoacán estate.' },

//   // Cancun (cityId: 69)
//   { id: 6901, cityId: 69, name: 'Chichen Itza Mayan Capital Tour', emoji: '🏛️', tags: ['culture'], price: 75, co2: 9, duration: '6 hours', description: 'Decode advanced astrological calendars at the iconic El Castillo stone pyramid.' },
//   { id: 6902, cityId: 69, name: 'Cenote Ik Kil Geothermal Swim', emoji: '💦', tags: ['eco'], price: 20, co2: 3, duration: '2 hours', description: 'Plunge into limestone sinkholes framed by trailing jungle roots and clear groundwater.' },
//   { id: 6903, cityId: 69, name: 'Musa Underwater Museum Snorkel', emoji: '🤿', tags: ['beach', 'wildlife'], price: 60, co2: 4, duration: '3 hours', description: 'Swim over submersed life-sized eco-sculptures acting as foundational coral nurseries.' },
//   { id: 6904, cityId: 69, name: 'Isla Mujeres Wind-Powered Catamaran', emoji: '⛵', tags: ['beach'], price: 80, co2: 0, duration: '5 hours', description: 'Utilize ocean wind streams to sail out toward protected sandbars.' },

//   // Rio de Janeiro (cityId: 70)
//   { id: 7001, cityId: 70, name: 'Christ the Redeemer Mountain Train', emoji: '✝️', tags: ['culture'], price: 30, co2: 3, duration: '3 hours', description: 'Ascend steep jungle-clad Corcovado peak tracks to view the massive art deco monument.' },
//   { id: 7002, cityId: 70, name: 'Sugarloaf Mountain Aerial Cable Ride', emoji: '🚡', tags: ['eco'], price: 35, co2: 4, duration: '2 hours', description: 'Glider across granite peaks flanking the turquoise entry of Guanabara Bay.' },
//   { id: 7003, cityId: 70, name: 'Copacabana Beach Eco Preservation Stroll', emoji: '🏖️', tags: ['beach', 'eco'], price: 0, co2: 0, duration: '2 hours', description: 'Walk mosaic sea promenades while assisting coastal cleanups.' },
//   { id: 7004, cityId: 70, name: 'Rio Lapa Samba Heritage Session', emoji: '💃', tags: ['culture'], price: 25, co2: 1, duration: '3 hours', description: 'Learn complex rhythmic percussion footwork steps inside century-old music halls.' },

//   // Buenos Aires (cityId: 71)
//   { id: 7101, cityId: 71, name: 'San Telmo Cobblestone Market Hunt', emoji: '🏮', tags: ['culture'], price: 0, co2: 0, duration: '3 hours', description: 'Browse antique brass stalls and street tango performers in historical plazas.' },
//   { id: 7102, cityId: 71, name: 'Parrilla Grass-Fed Steakhouse Trail', emoji: '🥩', tags: ['food'], price: 65, co2: 2, duration: '3 hours', description: 'Taste premium wood-fired cuts cooked traditionally over cast iron grates.' },
//   { id: 7103, cityId: 71, name: 'La Boca Caminito Corrugated Walk', emoji: '🎨', tags: ['culture'], price: 10, co2: 1, duration: '2 hours', description: 'Explore brightly painted corrugated sheet-iron tenements built by early maritime dockworkers.' },
//   { id: 7104, cityId: 71, name: 'Traditional Tango Academy Workshop', emoji: '💃', tags: ['culture'], price: 30, co2: 0, duration: '2 hours', description: 'Master intense improvisational posture methods inside old salon academies.' },

//   // Cape Town (cityId: 72)
//   { id: 7201, cityId: 72, name: 'Table Mountain Sandstone Crag Hike', emoji: '🥾', tags: ['hiking'], price: 0, co2: 0, duration: '4 hours', description: 'Scramble the steep Platteklip Gorge stone chute up onto flat cloud plateau surfaces.' },
//   { id: 7202, cityId: 72, name: 'Boulders Beach African Penguin Colony', emoji: '🐧', tags: ['wildlife', 'beach'], price: 22, co2: 3, duration: '2 hours', description: 'Observe rare nesting wild penguins navigating large smoothly polished sea boulders.' },
//   { id: 7203, cityId: 72, name: 'Cape Peninsula Eco Coastal Run', emoji: '🌊', tags: ['eco'], price: 40, co2: 5, duration: 'full day', description: 'Trace mountain toll roads dropping down into wild marine reserve boundary lines.' },
//   { id: 7204, cityId: 72, name: 'Kirstenbosch Canopy Walkway Stroll', emoji: '🌸', tags: ['eco'], price: 15, co2: 0, duration: '2 hours', description: 'Walk steel mesh bridges snaking right over the tree canopies of protected fynbos gardens.' },

//   // Cairo (cityId: 73)
//   { id: 7301, cityId: 73, name: 'Giza Pyramids & Sphinx Camel Trek', emoji: '🐫', tags: ['culture'], price: 50, co2: 1, duration: '4 hours', description: 'Ride across desert sands to explore limestone tombs dating to 2500 BC.' },
//   { id: 7302, cityId: 73, name: 'Grand Egyptian Museum Antiquities Search', emoji: '🏛️', tags: ['culture'], price: 35, co2: 1, duration: '3 hours', description: 'Examine complete gold funerary masks and nested sarcophagi of King Tutankhamun.' },
//   { id: 7303, cityId: 73, name: 'Khan El Khalili Vaulted Bazaar Walk', emoji: '🛍️', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Navigate medieval spice alleyways dense with copper smith lamps and incense smoke.' },
//   { id: 7304, cityId: 73, name: 'Nile River Traditional Wind-Felucca', emoji: '⛵', tags: ['eco'], price: 25, co2: 0, duration: '2 hours', description: 'Catch river currents on lateen-sailed wooden boats utilized since antiquity.' },

//   // Dubai (cityId: 74)
//   { id: 7401, cityId: 74, name: 'Burj Khalifa Observation Deck Flight', emoji: '🏙️', tags: ['culture'], price: 55, co2: 3, duration: '2 hours', description: 'Ascend high-speed elevators to the level 148 outdoor deck looking out at artificial islands.' },
//   { id: 7402, cityId: 74, name: 'Desert Conservation Oryx Safari', emoji: '🏜️', tags: ['wildlife', 'eco'], price: 95, co2: 8, duration: '5 hours', description: 'Tour protected rolling red sand plains to document wild Arabian Oryx populations.' },
//   { id: 7403, cityId: 74, name: 'Dubai Fountain Solar Boardwalk', emoji: '⛲', tags: ['culture'], price: 10, co2: 0, duration: '1 hour', description: 'Walk floating structural paths tracking choreographed water shoots pulsing 150 meters high.' },
//   { id: 7404, cityId: 74, name: 'Dubai Creek Heritage Abra Crossing', emoji: '🛶', tags: ['culture'], price: 2, co2: 1, duration: '0.5 hours', description: 'Commute on vintage wooden utility craft connecting traditional gold and spice markets.' },

//   // Istanbul (cityId: 75)
//   { id: 7501, cityId: 75, name: 'Hagia Sophia Byzantine Architectural Tour', emoji: '🕌', tags: ['culture'], price: 30, co2: 0, duration: '2 hours', description: 'Inspect massive floating brick domes and Christian gold mosaics framing Islamic calligraphy.' },
//   { id: 7502, cityId: 75, name: 'Bosphorus Intercontinental Ferry Cruise', emoji: '🚢', tags: ['eco'], price: 15, co2: 3, duration: '2 hours', description: 'Sail ocean channels separating Europe and Asia past Ottoman wooden palaces.' },
//   { id: 7503, cityId: 75, name: 'Grand Bazaar Culinary Spice Run', emoji: '☕', tags: ['food'], price: 25, co2: 0, duration: '2 hours', description: 'Sample slow-steeped sand-boiled coffee, pomegranate Turkish delight, and saffron varieties.' },
//   { id: 7504, cityId: 75, name: 'Historic Ottoman Hamam Bath Soak', emoji: '♨️', tags: ['wellness'], price: 65, co2: 1, duration: '2 hours', description: 'Relax inside marble structures built by Mimar Sinan featuring heated stone platforms.' },

//   // Marrakech (cityId: 76)
//   { id: 7601, cityId: 76, name: 'Jemaa el-Fnaa Open-Air Food Crawl', emoji: '🍲', tags: ['food'], price: 25, co2: 1, duration: '2 hours', description: 'Dine at midnight benches on charcoal-roasted lamb and spiced herbal tea blends.' },
//   { id: 7602, cityId: 76, name: 'Majorelle Garden Cobalt Botanical Walk', emoji: '🌵', tags: ['eco'], price: 15, co2: 0, duration: '2 hours', description: 'Stroll cactus arrays surrounded by striking cobalt blue Cubist villa walls.' },
//   { id: 7603, cityId: 76, name: 'Bahia Palace Intricate Cedar Tour', emoji: '🏛️', tags: ['culture'], price: 10, co2: 0, duration: '2 hours', description: 'Examine masterful floor tilings and carved cedar ceilings within 19th-century harem rooms.' },
//   { id: 7604, cityId: 76, name: 'High Atlas Mountain Foothill Trek', emoji: '🥾', tags: ['hiking'], price: 55, co2: 4, duration: 'full day', description: 'Hike rocky mountain passes bridging mud-brick Amazigh villages.' },

//   // Mumbai (cityId: 77)
//   { id: 7701, cityId: 77, name: 'Gateway of India Basalt Arch Walk', emoji: '🏛️', tags: ['culture'], price: 0, co2: 0, duration: '1 hour', description: 'Stroll the massive 1924 waterfront monument framing the edge of the Arabian Sea.' },
//   { id: 7702, cityId: 77, name: 'Elephanta Island Rock-Cut Temple Ferry', emoji: '🕳️', tags: ['culture'], price: 12, co2: 2, duration: '4 hours', description: 'Cross bay waters to inspect 5th-century cave shrines carved inside solid basalt rock.' },
//   { id: 7703, cityId: 77, name: 'Chowpatty Beach Street Food Chaat Run', emoji: '🍲', tags: ['food'], price: 15, co2: 1, duration: '2 hours', description: 'Sample spicy puffed rice bhel puri and buttery pav bhaji at sandy shoreline stalls.' },
//   { id: 7704, cityId: 77, name: 'Marine Drive Art Deco Sunset Path', emoji: '🌅', tags: ['eco'], price: 0, co2: 0, duration: '2 hours', description: 'Walk the continuous concrete crescent wall linking the largest cluster of Art Deco blocks outside Miami.' },

//   // New Delhi (cityId: 78)
//   { id: 7801, cityId: 78, name: 'Red Fort Mughal Palace Walk', emoji: '🏛️', tags: ['culture'], price: 10, co2: 1, duration: '3 hours', description: 'Tour massive red sandstone defensive walls built by Emperor Shah Jahan.' },
//   { id: 7802, cityId: 78, name: 'Chandni Chowk Old Rickshaw Food Hunt', emoji: '🍛', tags: ['food'], price: 25, co2: 1, duration: '3 hours', description: 'Navigate tight medieval markets to try clarified-butter deep-fried flatbreads.' },
//   { id: 7803, cityId: 78, name: 'Humayun\'s Tomb Symmetry Garden Walk', emoji: '🕌', tags: ['culture'], price: 12, co2: 0, duration: '2 hours', description: 'Wander manicured four-quadrant lawns celebrating early Persian architectural lines.' },
//   { id: 7804, cityId: 78, name: 'Lotus Temple Silent Mindfulness Session', emoji: '🧘', tags: ['wellness'], price: 0, co2: 0, duration: '1.5 hours', description: 'Meditate inside a magnificent lotus-shaped marble hall designed for universal prayer.' },

//   // Shanghai (cityId: 79)
//   { id: 7901, cityId: 79, name: 'The Bund Architecture Waterfront Stroll', emoji: '🏙️', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Walk waterfront granite routes framing 52 distinct European neoclassical facades.' },
//   { id: 7902, cityId: 79, name: 'Yu Garden Ming Dynasty Tea Ritual', emoji: '🍵', tags: ['food', 'culture'], price: 35, co2: 0, duration: '2 hours', description: 'Sip premium green leaf selections inside an original 1559 classic walled pavilion.' },
//   { id: 7903, cityId: 79, name: 'Shanghai Tower Mega Elevator Experience', emoji: '🗼', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'Shoot up 118 floors inside a structural spiral spire looking across river bends.' },
//   { id: 7904, cityId: 79, name: 'Nanjing Road Zero-Emission Tram Ride', emoji: '🚃', tags: ['culture'], price: 5, co2: 0, duration: '1 hour', description: 'Glide past old flagship retail centers utilizing electric city tram units.' },

//   // Beijing (cityId: 80)
//   { id: 8001, cityId: 80, name: 'Mutianyu Great Wall Ridge Line Trek', emoji: '🧗', tags: ['hiking', 'eco'], price: 45, co2: 5, duration: '5 hours', description: 'Climb steep granite ramparts snaking down forested mountain peaks.' },
//   { id: 8002, cityId: 80, name: 'Forbidden City Courtyard Tour', emoji: '🏰', tags: ['culture'], price: 15, co2: 1, duration: '4 hours', description: 'Explore the world\'s largest ancient wood structural palace layout spanning 9,999 bays.' },
//   { id: 8003, cityId: 80, name: 'Peking Duck Heritage Masterclass', emoji: '🦆', tags: ['food'], price: 65, co2: 2, duration: '3 hours', description: 'Observe wood-fired oven carving methods to create crisp, thin skin pancake pairings.' },
//   { id: 8004, cityId: 80, name: 'Summer Palace Imperial Lake Cruise', emoji: '🛶', tags: ['eco'], price: 20, co2: 1, duration: '2.5 hours', description: 'Float across vast Kunming lake waters in traditional hand-paddled wooden longboats.' },

//   // Hong Kong (cityId: 81)
//   { id: 8101, cityId: 81, name: 'Victoria Peak Historic Funicular Ride', emoji: '🚡', tags: ['culture'], price: 20, co2: 2, duration: '2 hours', description: 'Ascend incredibly steep mountain rail tracks tracing beneath dense high-rises.' },
//   { id: 8102, cityId: 81, name: 'Dim Sum Masterclass & Tasting', emoji: '🥟', tags: ['food'], price: 50, co2: 1, duration: '3 hours', description: 'Learn dough-crimping shapes to wrap fresh shrimp dumplings cooked in bamboo steamers.' },
//   { id: 8103, cityId: 81, name: 'Lantau Peak Stone Stairway Hiking', emoji: '🏔️', tags: ['hiking'], price: 0, co2: 0, duration: '4 hours', description: 'Scale stone ridge paths terminating at a colossal outdoor bronze Buddha statue.' },
//   { id: 8104, cityId: 81, name: 'Star Ferry Victoria Harbour Run', emoji: '🚢', tags: ['eco'], price: 1, co2: 1, duration: '0.5 hours', description: 'Cross central harbor channels on double-deck vintage passenger vessels operating since 1888.' },

//   // Macau (cityId: 82)
//   { id: 8201, cityId: 82, name: 'Ruins of St. Paul\'s Masonry Walk', emoji: '🏛️', tags: ['culture'], price: 0, co2: 0, duration: '1.5 hours', description: 'Inspect an iconic 17th-century stone church facade blending European and Asian relief carvings.' },
//   { id: 8202, cityId: 82, name: 'Lord Stow\'s Custard Tart Run', emoji: '🥮', tags: ['food'], price: 12, co2: 1, duration: '1 hour', description: 'Sample blistering, hot Portuguese egg tarts featuring flaky puff pastry rims.' },
//   { id: 8203, cityId: 82, name: 'Macau Tower Outer Rim Skywalk', emoji: '🧗', tags: ['culture'], price: 95, co2: 1, duration: '2 hours', description: 'Walk tethered over open iron safety grates 233 meters in the air with no handrails.' },
//   { id: 8204, cityId: 82, name: 'Taipa Village Pastel Alleyway Walk', emoji: '🏡', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Stroll past old Mediterranean-style villas converted into traditional almond cookie bakeries.' },

//   // Male (cityId: 83)
//   { id: 8301, cityId: 83, name: 'Coral Island Atoll Propagation Snorkel', emoji: '🤿', tags: ['beach', 'wildlife'], price: 75, co2: 2, duration: '3 hours', description: 'Swim deep drop-offs alongside conservation marine biologists reinforcing reef systems.' },
//   { id: 8302, cityId: 83, name: 'Sandbank Twilight Breathwork Session', emoji: '🧘‍♀️', tags: ['wellness', 'beach'], price: 40, co2: 0, duration: '1.5 hours', description: 'Practice traditional deep pranayama routines on a lonely isolated white sand strip.' },
//   { id: 8303, cityId: 83, name: 'Whale Shark Conservation Cruise', emoji: '🦈', tags: ['wildlife', 'eco'], price: 140, co2: 10, duration: '5 hours', description: 'Track wild filter-feeding ocean giants using zero-harassment distance practices.' },
//   { id: 8304, cityId: 83, name: 'Local Island Coral Stone Mosque Tour', emoji: '🏘️', tags: ['culture'], price: 15, co2: 1, duration: '2 hours', description: 'Examine ancient structural mosque blockings chiseled completely out of sea coral.' },

//   // Colombo (cityId: 84)
//   { id: 8401, cityId: 84, name: 'Galle Face Green Spicy Kottu Hunt', emoji: '🍛', tags: ['food'], price: 12, co2: 1, duration: '2 hours', description: 'Sample chopped flatbread street mixtures mixed with hot curry over iron plates.' },
//   { id: 8402, cityId: 84, name: 'Gangaramaya Floating Lake Temple', emoji: '🛕', tags: ['culture'], price: 5, co2: 0, duration: '2 hours', description: 'Explore a complex housing thousands of miniature brass Buddha statues and temple relics.' },
//   { id: 8403, cityId: 84, name: 'Colombo Open-Air Tuk-Tuk Safari', emoji: '🛺', tags: ['culture'], price: 25, co2: 3, duration: '2.5 hours', description: 'Weave past old Dutch colonial hospitals and Victorian administrative compounds.' },
//   { id: 8404, cityId: 84, name: 'Kelaniya Wetland Avian Sanctuary Cruise', emoji: '🦅', tags: ['wildlife', 'eco'], price: 40, co2: 2, duration: '3 hours', description: 'Navigate secondary marsh canals to catalog migratory kingfishers and herons.' },

//   // Kathmandu (cityId: 85)
//   { id: 8501, cityId: 85, name: 'Boudhanath Stupa Mandala Circuithon', emoji: '🛕', tags: ['culture', 'wellness'], price: 5, co2: 0, duration: '2 hours', description: 'Walk clockwise alongside chanting monks tracking a colossal ancient hemispherical dome.' },
//   { id: 8502, cityId: 85, name: 'Durbar Square Timber Architecture Walk', emoji: '🏛️', tags: ['culture'], price: 12, co2: 0, duration: '3 hours', description: 'Analyze complex multi-tiered wood structures showcasing advanced Newari carvings.' },
//   { id: 8503, cityId: 85, name: 'Shivapuri Oak Forest Ridge Climb', emoji: '🥾', tags: ['hiking', 'eco'], price: 20, co2: 2, duration: '5 hours', description: 'Hike through protected watershed valleys framing vistas of distant Himalayan spikes.' },
//   { id: 8504, cityId: 85, name: 'Authentic Buffalo Momo Folding Studio', emoji: '🥟', tags: ['food'], price: 30, co2: 1, duration: '3 hours', description: 'Master complex pleated dough pouches filled with local herbs and rich chili sauce.' },

//   // Honolulu (cityId: 86)
//   { id: 8601, cityId: 86, name: 'Waikiki Break Reef Surf Session', emoji: '🏄', tags: ['beach'], price: 80, co2: 0, duration: '2 hours', description: 'Learn longboarding fundamentals over smooth, rolling turquoise coral reef waves.' },
//   { id: 8602, cityId: 86, name: 'Diamond Head Tuff Crater Trail', emoji: '🌋', tags: ['hiking'], price: 10, co2: 1, duration: '2 hours', description: 'Hike military switchback routes scaling up the rims of an extinct coastal volcano.' },
//   { id: 8603, cityId: 86, name: 'Pearl Harbor Battleship Arizona Tour', emoji: '⚓', tags: ['culture'], price: 5, co2: 2, duration: '3 hours', description: 'Board harbor shuttle tenders to access floating shrines spanning sunken war structures.' },
//   { id: 8604, cityId: 86, name: 'Traditional Hawaiian Poi & Luau Feast', emoji: '🌺', tags: ['culture', 'food'], price: 130, co2: 3, duration: '4 hours', description: 'Observe underground earth-oven roasting methods paired with traditional Polynesian dance storytelling.' },

//   // Venice (cityId: 87)
//   { id: 8701, cityId: 87, name: 'Traditional Hand-Carved Gondola Ride', emoji: '🚣', tags: ['culture'], price: 90, co2: 0, duration: '1 hour', description: 'Navigate deep structural residential water loops using standard pole-pushed boats.' },
//   { id: 8702, cityId: 87, name: 'St. Mark\'s Basilica Byzantine Mosaic Tour', emoji: '⛪', tags: ['culture'], price: 20, co2: 0, duration: '2 hours', description: 'Examine thousands of square meters of masterfully laid ancient gold-leaf glass tiles.' },
//   { id: 8703, cityId: 87, name: 'Murano Island Silica Glassblowing Academy', emoji: '🔮', tags: ['culture'], price: 15, co2: 1, duration: '1.5 hours', description: 'Observe master artisans shaping molten crystal tubes into chandeliers over open kilns.' },
//   { id: 8704, cityId: 87, name: 'Venetian Cicchetti Wine Back-Alley Crawl', emoji: '🍷', tags: ['food'], price: 45, co2: 0, duration: '2 hours', description: 'Sample micro-bites of creamed codfish skewers inside standing-only neighborhood taverns.' },

//   // Florence (cityId: 88)
//   { id: 8801, cityId: 88, name: 'Uffizi Gallery Renaissance Masterworks', emoji: '🖼️', tags: ['culture'], price: 30, co2: 0, duration: '3 hours', description: 'Analyze monumental oil works drafted by master painters Botticelli, Da Vinci, and Michelangelo.' },
//   { id: 8802, cityId: 88, name: 'Brunelleschi\'s Brick Duomo Dome Climb', emoji: '⛪', tags: ['culture'], price: 35, co2: 0, duration: '2.5 hours', description: 'Ascend narrow inner architectural masonry walls to access massive structural observation platforms.' },
//   { id: 8803, cityId: 88, name: 'Chianti Estate Organic Oil Pressing Tour', emoji: '🍾', tags: ['food'], price: 75, co2: 4, duration: '4 hours', description: 'Journey out to historical stone estates to taste cold-pressed oil samples and aged red blends.' },
//   { id: 8804, cityId: 88, name: 'Scuola del Cuoio Traditional Leather Studio', emoji: '👜', tags: ['culture'], price: 0, co2: 0, duration: '1.5 hours', description: 'Watch expert bookbinders stamp gold gilding into full-grain raw leather goods.' },

//   // Madrid (cityId: 89)
//   { id: 8901, cityId: 89, name: 'Royal Palace of Madrid Velázquez Tour', emoji: '🏰', tags: ['culture'], price: 16, co2: 1, duration: '2.5 hours', description: 'Wander 3,000 royal rooms housing rare Stradivarius string collections and armor sets.' },
//   { id: 8902, cityId: 89, name: 'El Retiro Park Eco Wooden Rowing', emoji: '🚣', tags: ['eco'], price: 10, co2: 0, duration: '1.5 hours', description: 'Row classic wooden boats inside central park reservoirs tracking monument architecture.' },
//   { id: 8903, cityId: 89, name: 'Prado Museum Master Canvas Exploration', emoji: '🖼️', tags: ['culture'], price: 18, co2: 0, duration: '3 hours', description: 'Inspect court works by Goya and Hieronymus Bosch\'s dense multi-panel oil sets.' },
//   { id: 8904, cityId: 89, name: 'Mercado de San Miguel Tapas Run', emoji: '🍤', tags: ['food'], price: 40, co2: 1, duration: '2 hours', description: 'Graze on dynamic iron structures loaded with stuffed olives and ocean sea urchin toastings.' },

//   // Lisbon (cityId: 90)
//   { id: 9001, cityId: 90, name: 'Vintage Tram 28 Alfama Incline Ride', emoji: '🪟', tags: ['culture'], price: 5, co2: 1, duration: '1 hour', description: 'Squeeze up steep 1930s iron rail lines clearing tight stone building corners.' },
//   { id: 9002, cityId: 90, name: 'Pastel de Nata Puff Pastry Academy', emoji: '🥮', tags: ['food'], price: 50, co2: 1, duration: '2.5 hours', description: 'Master intense custard egg filling methods to bake flaky, caramelized dessert tarts.' },
//   { id: 9003, cityId: 90, name: 'Belem Tower Limestone Defensive Crawl', emoji: '🏰', tags: ['culture'], price: 12, co2: 1, duration: '2 hours', description: 'Explore manueline stone fortifications built to guard historical sea expeditions.' },
//   { id: 9004, cityId: 90, name: 'Alfama District Fado Lyric Stroll', emoji: '🎵', tags: ['culture'], price: 35, co2: 0, duration: '3 hours', description: 'Listen to melancholic classical acoustic guitar metrics inside hidden historic alley venues.' },

//   // Prague (cityId: 91)
//   { id: 9101, cityId: 91, name: 'Prague Castle Complex Gothic Tour', emoji: '🏰', tags: ['culture'], price: 16, co2: 0, duration: '3 hours', description: 'Walk the world\'s largest continuous fortress area including St. Vitus Cathedral.' },
//   { id: 9102, cityId: 91, name: 'Charles Bridge Dawn Photographic Session', emoji: '🌉', tags: ['culture'], price: 0, co2: 0, duration: '1.5 hours', description: 'Document thirty baroque saint figures framing empty morning stone spans.' },
//   { id: 9103, cityId: 91, name: 'Astronomical Clock Mechanical Performance', emoji: '🕰️', tags: ['culture'], price: 0, co2: 0, duration: '1 hour', description: 'Observe automated wooden apostles emerge from 1410 astronomical gear layouts.' },
//   { id: 9104, cityId: 91, name: 'Bohemian Cellar Craft Beer Tasting', emoji: '🍺', tags: ['food'], price: 28, co2: 1, duration: '2 hours', description: 'Sample original unpasteurized pilsner types inside old vaulted stone basements.' },

//   // Vienna (cityId: 92)
//   { id: 9201, cityId: 92, name: 'Schonbrunn Palace Baroque Hothouse Walk', emoji: '🏰', tags: ['culture', 'eco'], price: 26, co2: 1, duration: '3 hours', description: 'Tour massive classical summer palaces alongside towering 1882 iron palm glasshouses.' },
//   { id: 9202, cityId: 92, name: 'St. Stephen\'s Roof Tile Inspection', emoji: '⛪', tags: ['culture'], price: 10, co2: 0, duration: '1.5 hours', description: 'Scale stone tower steps to inspect intricate geometric patterns composed of 230,000 glazed tiles.' },
//   { id: 9203, cityId: 92, name: 'Historic Ringstrasse Coffee House Crawl', emoji: '☕', tags: ['food'], price: 22, co2: 1, duration: '2 hours', description: 'Savor rich chocolate sachertorte cake on velvet couches frequented by early Freud scholars.' },
//   { id: 9204, cityId: 92, name: 'Vienna State Opera Acoustic Performance', emoji: '🎼', tags: ['culture'], price: 60, co2: 1, duration: '3 hours', description: 'Experience professional symphonic ensembles inside premier global neo-renaissance halls.' },

//   // Budapest (cityId: 93)
//   { id: 9301, cityId: 93, name: 'Szechenyi Thermal Baths Mineral Pool Soak', emoji: '♨️', tags: ['wellness'], price: 38, co2: 2, duration: '3 hours', description: 'Relax inside outdoor neo-baroque geothermally heated artesian wellness basins.' },
//   { id: 9302, cityId: 93, name: 'Hungarian Parliament Gothic Revival Walk', emoji: '🏛️', tags: ['culture'], price: 24, co2: 1, duration: '2 hours', description: 'Explore massive scale gold stairwells and structural halls displaying the Holy Crown.' },
//   { id: 9303, cityId: 93, name: 'Danube River Low-Emission Evening Cruise', emoji: '🛳️', tags: ['eco'], price: 22, co2: 2, duration: '1.5 hours', description: 'Float central river tracks to see illuminated parliament wings and historic bridges.' },
//   { id: 9304, cityId: 93, name: 'Jewish Quarter Ruin Bar Cultural Crawl', emoji: '🍷', tags: ['culture'], price: 30, co2: 1, duration: '3 hours', description: 'Explore eclectic artistic bars established inside abandoned pre-war apartment blocks.' },

//   // Athens (cityId: 94)
//   { id: 9401, cityId: 94, name: 'Acropolis & Parthenon Pentelic Marble Tour', emoji: '🏛️', tags: ['culture'], price: 30, co2: 0, duration: '3 hours', description: 'Scale historic fortress cliffs to study legendary 5th-century BC column architectures.' },
//   { id: 9402, cityId: 94, name: 'Plaka Alleyway Olive Oil & Mezze Crawl', emoji: '🍢', tags: ['food'], price: 40, co2: 1, duration: '2 hours', description: 'Taste wild herb feta bakes and local olive varietals inside historic pedestrian lanes.' },
//   { id: 9403, cityId: 94, name: 'Mount Lycabettus Sunset Eco Funicular', emoji: '🌅', tags: ['eco'], price: 10, co2: 1, duration: '1.5 hours', description: 'Ride underground electric rail spurs up to city viewpoints framing the Aegean coast.' },
//   { id: 9404, cityId: 94, name: 'National Archaeological Sculpture Search', emoji: '🏺', tags: ['culture'], price: 15, co2: 0, duration: '2.5 hours', description: 'Analyze rare bronze relics pulled from deep ancient Mediterranean shipwrecks.' },

//   // Santorini (cityId: 95)
//   { id: 9501, cityId: 95, name: 'Oia Volcano Whitewashed Cliff Walk', emoji: '🌅', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Navigate deep cliff paths framing blue-domed church shapes and marine drop-offs.' },
//   { id: 9502, cityId: 95, name: 'Caldera Basin Wind-Sailing Catamaran', emoji: '⛵', tags: ['beach', 'eco'], price: 110, co2: 0, duration: '5 hours', description: 'Utilize wind patterns to sail inside submerged volcanic craters and iron warm springs.' },
//   { id: 9503, cityId: 95, name: 'Akrotiri Ash-Preserved Minoan City', emoji: '🌋', tags: ['culture'], price: 15, co2: 2, duration: '2 hours', description: 'Explore multi-story structural ruins entombed by bronze age volcanic blast lines.' },
//   { id: 9504, cityId: 95, name: 'Volcanic Soil Assyrtiko Estate Tasting', emoji: '🍷', tags: ['food'], price: 60, co2: 3, duration: '2 hours', description: 'Sample crisp white varieties cultivated using unique low-to-ground nest weaving methods.' },

//   // Dublin (cityId: 96)
//   { id: 9601, cityId: 96, name: 'Trinity College Long Room Library Walk', emoji: '📚', tags: ['culture'], price: 18, co2: 0, duration: '1.5 hours', description: 'Wander oak barrel-vaulted galleries housing the 9th-century Book of Kells manuscript.' },
//   { id: 9602, cityId: 96, name: 'Guinness Storehouse Nitrogen Gravity Tour', emoji: '🍺', tags: ['food', 'culture'], price: 30, co2: 2, duration: '2 hours', description: 'Trace historic barley roasting processes leading to top panoramic sky-bars.' },
//   { id: 9603, cityId: 96, name: 'Temple Bar Traditional Fiddle Crawl', emoji: '🎻', tags: ['culture'], price: 40, co2: 1, duration: '3 hours', description: 'Listen to lively continuous traditional ensemble loops inside cobblestone street pubs.' },
//   { id: 9604, cityId: 96, name: 'Phoenix Park Fallow Deer Sanctuary Walk', emoji: '🦌', tags: ['wildlife', 'eco'], price: 0, co2: 0, duration: '2.5 hours', description: 'Walk protected wild meadows populated by herds descending from 1660 royal stocks.' },

//   // Edinburgh (cityId: 97)
//   { id: 9701, cityId: 97, name: 'Edinburgh Castle Volcanic Plug Fortress', emoji: '🏰', tags: ['culture'], price: 25, co2: 1, duration: '3 hours', description: 'Tour historical crown crown-rooms built over massive black basalt volcanic ridges.' },
//   { id: 9702, cityId: 97, name: 'Arthur\'s Seat Ancient Basalt Climb', emoji: '🌋', tags: ['hiking'], price: 0, co2: 0, duration: '2.5 hours', description: 'Hike grassy volcanic crags offering views across the Firth of Forth estuary channels.' },
//   { id: 9703, cityId: 97, name: 'Royal Mile Plague Vaults History Walk', emoji: '👻', tags: ['culture'], price: 22, co2: 0, duration: '2 hours', description: 'Descend under modern street layers into bricked-over 17th-century subterranean residential rows.' },
//   { id: 9704, cityId: 97, name: 'Scotch Whisky Single Malt Masterclass', emoji: '🥃', tags: ['food'], price: 35, co2: 1, duration: '2 hours', description: 'Decode regional single-malt profiles across peated Islay and smooth Speyside versions.' },

//   // Stockholm (cityId: 98)
//   { id: 9801, cityId: 98, name: 'Gamla Stan Medieval Alleyway Stroll', emoji: '🏰', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Walk tightly packed 13th-century lanes bordered by golden stucco merchant blocks.' },
//   { id: 9802, cityId: 98, name: 'Vasa Museum Intact Warship Search', emoji: '🚢', tags: ['culture'], price: 22, co2: 1, duration: '2 hours', description: 'Examine an authentic, intricately carved 1628 royal flagship salvaged from harbor beds.' },
//   { id: 9803, cityId: 98, name: 'Stockholm Archipelago Baltic Eco Kayak', emoji: '🛶', tags: ['eco'], price: 55, co2: 0, duration: '4 hours', description: 'Paddle clear ocean brackish channels surrounding pine forest islands.' },
//   { id: 9804, cityId: 98, name: 'Traditional Cardamom Fika Baking Crawl', emoji: '☕', tags: ['food'], price: 18, co2: 1, duration: '1.5 hours', description: 'Enjoy hand-twisted cardamom buns alongside premium sustainably-sourced specialty filter coffees.' },

//   // Oslo (cityId: 99)
//   { id: 9901, cityId: 99, name: 'Vigeland Granite Sculpture Park Walk', emoji: '🗿', tags: ['eco', 'culture'], price: 0, co2: 0, duration: '2 hours', description: 'Stroll lawns displaying 212 colossal granite and bronze human forms designed by Gustav Vigeland.' },
//   { id: 9902, cityId: 99, name: 'Fram Museum Oak Polar Vessel Tour', emoji: '❄️', tags: ['culture'], price: 15, co2: 1, duration: '2 hours', description: 'Board the historic, reinforced wooden exploration vessel that survived extreme Arctic drift ice lines.' },
//   { id: 9903, cityId: 99, name: 'Oslofjord Zero-Emission Electric Cruise', emoji: '🛳️', tags: ['eco'], price: 38, co2: 0, duration: '2 hours', description: 'Cruise serene fjord waters silently using high-capacity battery passenger hulls.' },
//   { id: 9904, cityId: 99, name: 'Nordmarka Spruce Forest Wilderness Hike', emoji: '🥾', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '4 hours', description: 'Trek dense evergreen pathways winding past clean freshwater bog lakes.' },

//   // Copenhagen (cityId: 100)
//   { id: 10001, cityId: 100, name: 'Nyhavn Maritime Colorful Canal Stroll', emoji: '⛵', tags: ['culture'], price: 0, co2: 0, duration: '1.5 hours', description: 'Walk dynamic waterfront lanes lined with brightly painted 17th-century wooden townhouses.' },
//   { id: 10002, cityId: 100, name: 'Tivoli Gardens Biomass Wind-Powered Park', emoji: '🎡', tags: ['culture', 'eco'], price: 22, co2: 0, duration: '3 hours', description: 'Explore one of the oldest operational amusement parks running fully on clean wind grid allocations.' },
//   { id: 10003, cityId: 100, name: 'Copenhagen Cargo Bicycle Explorer Tour', emoji: '🚴', tags: ['cycle'], price: 35, co2: 0, duration: '2.5 hours', description: 'Navigate hyper-advanced cycle infrastructure lanes on traditional Danish non-motorized variants.' },
//   { id: 10004, cityId: 100, name: 'New Nordic Organic Smørrebrød Crawl', emoji: '🍏', tags: ['food'], price: 50, co2: 1, duration: '2 hours', description: 'Sample premium rye-bread open sand-pairings created from low-carbon local farming collectives.' }
];

export default activities;