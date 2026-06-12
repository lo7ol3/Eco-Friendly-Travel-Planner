const activities = [
  { id: 101, cityId: 1, name: 'BOH Tea Plantation Tour', emoji: '🍵', tags: ['eco', 'food'], price: 30, co2: 2, duration: '2 hours', description: 'Explore the lush tea plantations and learn about sustainable tea production.' },
  { id: 102, cityId: 1, name: 'Mossy Forest Trek', emoji: '🌲', tags: ['hiking', 'eco'], price: 50, co2: 1, duration: '4 hours', description: 'Hike through the mystical mossy cloud forest with a local guide.' },
  { id: 103, cityId: 1, name: 'Strawberry Farm Visit', emoji: '🍓', tags: ['food', 'eco'], price: 20, co2: 1, duration: '1 hour', description: 'Pick fresh strawberries at an organic farm.' },
  { id: 104, cityId: 1, name: 'Butterfly Garden', emoji: '🦋', tags: ['wildlife', 'eco'], price: 15, co2: 0, duration: '1 hour', description: 'See hundreds of butterfly species in a natural habitat.' },

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

  //Langkawi
  { id: 1301, cityId: 13, name: 'Sky Bridge Walk', emoji: '🌉', tags: ['eco', 'culture'], price: 40, co2: 2, duration: '2 hours', description: 'Walk across the iconic curved sky bridge with panoramic views.' },
  { id: 1302, cityId: 13, name: 'Island Hopping Tour', emoji: '🚤', tags: ['beach'], price: 70, co2: 8, duration: '4 hours', description: 'Explore nearby islands with crystal clear waters.' },
  { id: 1303, cityId: 13, name: 'Mangrove Safari', emoji: '🦅', tags: ['eco', 'wildlife'], price: 55, co2: 3, duration: '3 hours', description: 'Cruise through mangroves and spot eagles and wildlife.' },
  { id: 1304, cityId: 13, name: 'Cable Car Ride', emoji: '🚡', tags: ['eco'], price: 35, co2: 3, duration: '1 hour', description: 'Ride up Gunung Mat Cincang for stunning views.' },

  //Redang Island
  { id: 1401, cityId: 14, name: 'Snorkeling Coral Reef', emoji: '🤿', tags: ['beach', 'wildlife'], price: 80, co2: 5, duration: '3 hours', description: 'Swim among vibrant coral reefs and tropical fish.' },
  { id: 1402, cityId: 14, name: 'Beach Relaxation Day', emoji: '🏖️', tags: ['beach'], price: 0, co2: 0, duration: 'full day', description: 'Relax on white sandy beaches with crystal clear water.' },
  { id: 1403, cityId: 14, name: 'Marine Conservation Talk', emoji: '🐢', tags: ['eco', 'wildlife'], price: 20, co2: 1, duration: '2 hours', description: 'Learn about sea turtle protection efforts.' },
  { id: 1404, cityId: 14, name: 'Island Kayaking', emoji: '🛶', tags: ['eco'], price: 60, co2: 2, duration: '2 hours', description: 'Paddle around calm turquoise waters.' },

  //Taman Negara
  { id: 1501, cityId: 15, name: 'Canopy Walk', emoji: '🌉', tags: ['eco', 'hiking'], price: 40, co2: 2, duration: '2 hours', description: 'Walk above the rainforest on suspended bridges.' },
  { id: 1502, cityId: 15, name: 'Jungle Trekking', emoji: '🥾', tags: ['hiking', 'wildlife'], price: 60, co2: 3, duration: '4 hours', description: 'Explore one of the world’s oldest rainforests.' },
  { id: 1503, cityId: 15, name: 'River Cruise Safari', emoji: '🚤', tags: ['eco', 'wildlife'], price: 50, co2: 4, duration: '3 hours', description: 'Spot wildlife along the river at night.' },
  { id: 1504, cityId: 15, name: 'Orang Asli Village Visit', emoji: '🏘️', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'Learn about indigenous rainforest communities.' },
  
  //Genting Highlands
  { id: 1601, cityId: 16, name: 'Theme Park Adventure', emoji: '🎢', tags: ['culture'], price: 80, co2: 5, duration: 'full day', description: 'Enjoy indoor and outdoor amusement parks.' },
{ id: 1602, cityId: 16, name: 'Cable Car Ride', emoji: '🚡', tags: ['eco'], price: 25, co2: 3, duration: '1 hour', description: 'Ride above the rainforest mountains.' },
{ id: 1603, cityId: 16, name: 'Casino Experience', emoji: '🎰', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Experience Malaysia’s only legal casino environment.' },
{ id: 1604, cityId: 16, name: 'SkyAvenue Shopping', emoji: '🛍️', tags: ['culture'], price: 0, co2: 1, duration: '2 hours', description: 'Shop and dine in a cool mountain resort.' },

//Kundasang
{ id: 1701, cityId: 17, name: 'Desa Dairy Farm Tour', emoji: '🐄', tags: ['eco', 'food'], price: 25, co2: 2, duration: '2 hours', description: 'Visit Malaysia’s “Little New Zealand” farm.' },
{ id: 1702, cityId: 17, name: 'Mount Kinabalu Viewpoint', emoji: '🏔️', tags: ['hiking', 'eco'], price: 0, co2: 0, duration: '1 hour', description: 'Scenic views of Mount Kinabalu.' },
{ id: 1703, cityId: 17, name: 'Hot Spring Relaxation', emoji: '♨️', tags: ['wellness'], price: 15, co2: 1, duration: '2 hours', description: 'Relax in natural hot springs.' },
{ id: 1704, cityId: 17, name: 'Vegetable Farm Visit', emoji: '🥬', tags: ['eco'], price: 10, co2: 1, duration: '1 hour', description: 'Tour local organic vegetable farms.' },

//Semporna
{ id: 1801, cityId: 18, name: 'Island Hopping Tour', emoji: '🏝️', tags: ['beach'], price: 120, co2: 10, duration: 'full day', description: 'Visit stunning islands like Bohey Dulang.' },
{ id: 1802, cityId: 18, name: 'Scuba Diving Sipadan', emoji: '🤿', tags: ['wildlife', 'beach'], price: 300, co2: 15, duration: 'full day', description: 'Dive in one of the world’s top diving spots.' },
{ id: 1803, cityId: 18, name: 'Sea Gypsy Village Visit', emoji: '🏘️', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'Learn about the Bajau Laut community.' },
{ id: 1804, cityId: 18, name: 'Sunset Boat Cruise', emoji: '🌅', tags: ['eco'], price: 60, co2: 5, duration: '2 hours', description: 'Relax on a sunset cruise over turquoise waters.' },

//Bako National Park
{ id: 1901, cityId: 19, name: 'Proboscis Monkey Trek', emoji: '🐒', tags: ['wildlife'], price: 50, co2: 3, duration: '3 hours', description: 'Spot rare proboscis monkeys in the wild.' },
{ id: 1902, cityId: 19, name: 'Jungle Hiking Trail', emoji: '🥾', tags: ['hiking', 'eco'], price: 40, co2: 2, duration: '4 hours', description: 'Explore rainforest trails and waterfalls.' },
{ id: 1903, cityId: 19, name: 'Beach Walk', emoji: '🏖️', tags: ['beach'], price: 0, co2: 0, duration: '1 hour', description: 'Walk along untouched coastal beaches.' },
{ id: 1904, cityId: 19, name: 'Wildlife Photography Tour', emoji: '📸', tags: ['wildlife'], price: 60, co2: 2, duration: '3 hours', description: 'Capture rare rainforest wildlife.' },

//Sipadan Island
{ id: 2001, cityId: 20, name: 'Deep Sea Diving', emoji: '🤿', tags: ['beach', 'wildlife'], price: 400, co2: 20, duration: 'full day', description: 'World-famous diving with turtles and sharks.' },
{ id: 2002, cityId: 20, name: 'Snorkeling Coral Garden', emoji: '🐠', tags: ['beach'], price: 120, co2: 8, duration: '3 hours', description: 'Explore vibrant coral reefs.' },
{ id: 2003, cityId: 20, name: 'Marine Photography Tour', emoji: '📸', tags: ['wildlife'], price: 150, co2: 5, duration: '2 hours', description: 'Capture underwater marine life.' },
{ id: 2004, cityId: 20, name: 'Boat Island Cruise', emoji: '🚤', tags: ['eco'], price: 90, co2: 6, duration: '2 hours', description: 'Cruise around pristine islands.' },

//Krabi
{ id: 2101, cityId: 21, name: 'Railay Beach Climbing', emoji: '🧗', tags: ['beach', 'hiking'], price: 80, co2: 5, duration: '3 hours', description: 'Rock climbing on limestone cliffs.' },
{ id: 2102, cityId: 21, name: 'Island Hopping Tour', emoji: '🏝️', tags: ['beach'], price: 100, co2: 10, duration: 'full day', description: 'Visit Phi Phi and nearby islands.' },
{ id: 2103, cityId: 21, name: 'Hot Springs Pool', emoji: '♨️', tags: ['wellness'], price: 20, co2: 2, duration: '2 hours', description: 'Relax in natural jungle hot springs.' },
{ id: 2104, cityId: 21, name: 'Night Market Food Tour', emoji: '🍜', tags: ['food'], price: 30, co2: 2, duration: '2 hours', description: 'Taste Thai street food.' },

//Bangkok
{ id: 2201, cityId: 22, name: 'Grand Palace Tour', emoji: '🏛️', tags: ['culture'], price: 40, co2: 3, duration: '3 hours', description: 'Visit Thailand’s most iconic palace.' },
{ id: 2202, cityId: 22, name: 'Floating Market Visit', emoji: '🛶', tags: ['food', 'culture'], price: 50, co2: 5, duration: '3 hours', description: 'Shop and eat on boats.' },
{ id: 2203, cityId: 22, name: 'Street Food Walk', emoji: '🍜', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Explore Bangkok street food.' },
{ id: 2204, cityId: 22, name: 'Temple Night Tour', emoji: '🌙', tags: ['culture'], price: 30, co2: 2, duration: '2 hours', description: 'See temples beautifully lit at night.' },

//Jakarta
{ id: 2301, cityId: 23, name: 'Old Town Tour', emoji: '🏛️', tags: ['culture'], price: 20, co2: 2, duration: '2 hours', description: 'Explore Kota Tua heritage area.' },
{ id: 2302, cityId: 23, name: 'Street Food Tour', emoji: '🍢', tags: ['food'], price: 30, co2: 3, duration: '3 hours', description: 'Taste Indonesian street food.' },
{ id: 2303, cityId: 23, name: 'Monas Tower Visit', emoji: '🗼', tags: ['culture'], price: 10, co2: 1, duration: '1 hour', description: 'Visit national monument.' },
{ id: 2304, cityId: 23, name: 'Harbor Cruise', emoji: '🚢', tags: ['eco'], price: 40, co2: 4, duration: '2 hours', description: 'Boat tour around Jakarta harbor.' },

//Bali North
{ id: 2401, cityId: 24, name: 'Rice Terrace Walk', emoji: '🌾', tags: ['eco'], price: 20, co2: 2, duration: '2 hours', description: 'Walk through green rice fields.' },
{ id: 2402, cityId: 24, name: 'Waterfall Trek', emoji: '💦', tags: ['hiking'], price: 30, co2: 2, duration: '3 hours', description: 'Discover hidden waterfalls.' },
{ id: 2403, cityId: 24, name: 'Yoga Retreat', emoji: '🧘', tags: ['wellness'], price: 60, co2: 1, duration: 'half day', description: 'Relax with yoga and meditation.' },
{ id: 2404, cityId: 24, name: 'Coffee Plantation Tour', emoji: '☕', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Learn coffee making process.' },

//Hanoi
{ id: 2501, cityId: 25, name: 'Old Quarter Walk', emoji: '🏮', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Explore historic streets.' },
{ id: 2502, cityId: 25, name: 'Street Food Tour', emoji: '🍜', tags: ['food'], price: 35, co2: 2, duration: '3 hours', description: 'Try Vietnamese dishes.' },
{ id: 2503, cityId: 25, name: 'Temple of Literature', emoji: '🏛️', tags: ['culture'], price: 15, co2: 1, duration: '2 hours', description: 'Visit ancient university.' },
{ id: 2504, cityId: 25, name: 'Lake Cycling Tour', emoji: '🚴', tags: ['eco'], price: 25, co2: 1, duration: '2 hours', description: 'Cycle around Hoan Kiem Lake.' },

//Ha Long Bay
{ id: 2601, cityId: 26, name: 'Cruise Tour', emoji: '🛳️', tags: ['eco'], price: 120, co2: 10, duration: 'full day', description: 'Sail through limestone cliffs.' },
{ id: 2602, cityId: 26, name: 'Kayaking Caves', emoji: '🛶', tags: ['eco'], price: 60, co2: 5, duration: '3 hours', description: 'Paddle through caves.' },
{ id: 2603, cityId: 26, name: 'Island Hiking', emoji: '🥾', tags: ['hiking'], price: 50, co2: 4, duration: '3 hours', description: 'Hike limestone islands.' },
{ id: 2604, cityId: 26, name: 'Sunset Deck Dinner', emoji: '🌅', tags: ['food'], price: 80, co2: 6, duration: '2 hours', description: 'Dinner on cruise deck.' },

//Luang Prabang
{ id: 2701, cityId: 27, name: 'Waterfall Tour', emoji: '💦', tags: ['eco'], price: 30, co2: 2, duration: '3 hours', description: 'Visit Kuang Si waterfalls.' },
{ id: 2702, cityId: 27, name: 'Temple Tour', emoji: '🏯', tags: ['culture'], price: 20, co2: 1, duration: '2 hours', description: 'Explore golden temples.' },
{ id: 2703, cityId: 27, name: 'Morning Alms Ceremony', emoji: '🙏', tags: ['culture'], price: 10, co2: 0, duration: '1 hour', description: 'Watch monks collecting alms.' },
{ id: 2704, cityId: 27, name: 'River Boat Ride', emoji: '🚤', tags: ['eco'], price: 40, co2: 3, duration: '2 hours', description: 'Cruise Mekong River.' },

//Siem Reap
{ id: 2801, cityId: 28, name: 'Angkor Wat Sunrise', emoji: '🌅', tags: ['culture'], price: 50, co2: 4, duration: '3 hours', description: 'Watch sunrise at Angkor Wat.' },
{ id: 2802, cityId: 28, name: 'Temple Exploration', emoji: '🏛️', tags: ['culture'], price: 60, co2: 5, duration: 'full day', description: 'Explore ancient temples.' },
{ id: 2803, cityId: 28, name: 'Floating Village Tour', emoji: '🛶', tags: ['eco'], price: 40, co2: 3, duration: '3 hours', description: 'Visit Tonle Sap lake villages.' },
{ id: 2804, cityId: 28, name: 'Night Market Food Walk', emoji: '🍢', tags: ['food'], price: 25, co2: 2, duration: '2 hours', description: 'Taste Cambodian street food.' },

//Mount Fuji Area
{ id: 2901, cityId: 29, name: 'Fuji Five Lakes Tour', emoji: '🏞️', tags: ['eco'], price: 100, co2: 8, duration: 'full day', description: 'Scenic lakes around Mount Fuji.' },
{ id: 2902, cityId: 29, name: 'Mountain Hiking', emoji: '🥾', tags: ['hiking'], price: 150, co2: 10, duration: 'full day', description: 'Hike near Mount Fuji trails.' },
{ id: 2903, cityId: 29, name: 'Hot Spring Onsen', emoji: '♨️', tags: ['wellness'], price: 60, co2: 3, duration: '2 hours', description: 'Relax in Japanese hot springs.' },
{ id: 2904, cityId: 29, name: 'Cultural Village Visit', emoji: '🏡', tags: ['culture'], price: 40, co2: 2, duration: '2 hours', description: 'Traditional Japanese village experience.' },

//Kyoto
{ id: 3001, cityId: 30, name: 'Fushimi Inari Shrine Walk', emoji: '⛩️', tags: ['culture'], price: 0, co2: 0, duration: '2 hours', description: 'Walk through thousands of torii gates.' },
{ id: 3002, cityId: 30, name: 'Tea Ceremony Experience', emoji: '🍵', tags: ['culture'], price: 50, co2: 1, duration: '1 hour', description: 'Traditional Japanese tea ceremony.' },
{ id: 3003, cityId: 30, name: 'Arashiyama Bamboo Forest', emoji: '🎋', tags: ['eco'], price: 20, co2: 1, duration: '2 hours', description: 'Walk through bamboo forest.' },
{ id: 3004, cityId: 30, name: 'Geisha District Tour', emoji: '🎎', tags: ['culture'], price: 70, co2: 2, duration: '3 hours', description: 'Explore historic Gion district.' },

];

export default activities;